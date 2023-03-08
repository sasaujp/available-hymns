import { DataType } from "@/utils/fetchData";
import { makeSongsData, HymnBookType } from "@/utils/songs";
import { zenkaku2Hankaku } from "@/utils/zenkaku";
import { Button, List, Popover, Space, Table, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { useMemo } from "react";
import { SongDataWithInfo } from "./defines";
import { Status } from "./defines";
import { RightPopover, vote2Right } from "./Right";
import styles from "./table.module.css";
const { Text, Link } = Typography;

const CommentList: React.FC<{ comments: string[] }> = ({ comments }) => {
  return (
    <List
      dataSource={comments}
      renderItem={(item) => {
        return <List.Item>{item}</List.Item>;
      }}
    />
  );
};

const columns: ColumnsType<SongDataWithInfo> = [
  { title: "番号", dataIndex: "number", key: "number" },
  {
    title: "歌い出し",
    dataIndex: "start",
    key: "start",
  },
  {
    title: "権利状況",
    key: "right",
    dataIndex: "right",
    render: (_, { number, start, jasrac, data }) => {
      return (
        <>
          <Text>
            権利状況: <RightPopover jasrac={jasrac} vote={data} />
            <br />
            {data.comments.length ? (
              <Popover
                trigger="click"
                content={<CommentList comments={data.comments} />}
                title={`${number}「${start}」に関する備考`}
              >
                <Button className={styles.commentButton} type="link">
                  提供された備考を見る
                </Button>
              </Popover>
            ) : null}
          </Text>
        </>
      );
    },
  },
  {
    title: "調べる",
    key: "copy",
    render: (_, { number, start }) => {
      const hymnIdetifier = `＊讃美歌${zenkaku2Hankaku(number)}`;
      return (
        <Space>
          <Button
            onClick={() => {
              navigator.clipboard.writeText(hymnIdetifier);
            }}
          >
            「{hymnIdetifier}」をコピー
          </Button>
          <Button
            onClick={() => {
              navigator.clipboard.writeText(start);
            }}
          >
            歌い出しをコピー
          </Button>
        </Space>
      );
    },
  },
  {
    title: "情報提供",
    key: "provisionOfInformation",
    dataIndex: "provisionOfInformation",
    render: (_, { jasrac, data }) => {
      if (jasrac) {
        return (
          <Text>
            JASRAC管理讃美歌です。
            <br />
            <Link
              href="https://bp-uccj.jp/files/h-c.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              『讃美歌』（1954年版）日本キリスト教団出版局外
              著作権管理リスト（PDF）
            </Link>
          </Text>
        );
      }
      return (
        <Space wrap>
          <Button>パブリック・ドメイン({data.publicDomain})</Button>
          <Button>UCCJ({data.uccj})</Button>
          <Button>JASRAC({data.jasrac})</Button>
          <Button>その他({data.other})</Button>
        </Space>
      );
    },
  },
];

export const SongTable: React.FC<{
  hymnBookType: HymnBookType;
  searchText: string;
  data: { [key: string]: DataType };
  filter: Status[];
}> = ({ hymnBookType, searchText, data, filter }) => {
  const rawSongs = useMemo(() => {
    const songs = makeSongsData(hymnBookType);
    return songs.map<SongDataWithInfo>((song) => {
      return {
        ...song,
        ...{
          data: data[song.key] ?? {
            key: song.key,
            publicDomain: 0,
            uccj: 0,
            jasrac: 0,
            other: 0,
            searchWords: [],
            comments: [],
          },
        },
      };
    });
  }, [data, hymnBookType]);

  const songs: SongDataWithInfo[] = useMemo(() => {
    if (!searchText.length && !filter.length) {
      return rawSongs;
    }

    const texts = searchText.split(" ");
    return rawSongs.filter(({ number, start, jasrac, data }) => {
      const right = vote2Right(jasrac, data);

      if (filter.length) {
        if (!filter.map((f) => right[f]).some((val) => val)) {
          return false;
        }
      }
      for (const t of texts) {
        if (number.includes(t)) {
          return true;
        }
        if (start.includes(t)) {
          return true;
        }
      }

      return false;
    });
  }, [rawSongs, searchText, filter]);

  return (
    <Table
      className={styles.songs}
      bordered
      dataSource={songs}
      columns={columns}
      scroll={{
        y: "max-content",
        x: "max-content",
      }}
      summary={() => (
        <Table.Summary fixed="top">
          <Table.Summary.Row>
            <Table.Summary.Cell index={0} colSpan={2}></Table.Summary.Cell>
            <Table.Summary.Cell index={0} colSpan={1}>
              提供情報から表示しています。
            </Table.Summary.Cell>
            <Table.Summary.Cell index={10}>
              <Button
                href="https://www2.jasrac.or.jp/eJwid/"
                target="_blank"
                type="primary"
                rel="noopener noreferrer"
              >
                作品検索サービスを開く
              </Button>
            </Table.Summary.Cell>
            <Table.Summary.Cell index={0} colSpan={1}>
              他の利用者の型のために情報提供のご協力をお願いしております。
              <br />
              該当した権利状況を選択、またはコメントの投稿ができます。
            </Table.Summary.Cell>
          </Table.Summary.Row>
        </Table.Summary>
      )}
      sticky
    />
  );
};
