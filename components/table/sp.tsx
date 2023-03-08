import { DataType } from "@/utils/fetchData";
import { makeSongsData, HymnBookType } from "@/utils/songs";
import { zenkaku2Hankaku } from "@/utils/zenkaku";
import { Table, Typography, Modal, Space, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { useEffect, useMemo, useState } from "react";
import { SongDataWithInfo, Status } from "./defines";
import { RightExpansion, RightText, vote2Right } from "./Right";
import styles from "./table.module.css";
const { Text, Title } = Typography;

const columns: ColumnsType<SongDataWithInfo> = [
  { title: "番号", dataIndex: "number", key: "number", width: "25%" },
  {
    title: "歌い出し・権利状況",
    key: "right",
    dataIndex: "right",
    render: (_, { start, jasrac, data }) => {
      return (
        <>
          <Text>
            {start}
            <br />
            <RightText jasrac={jasrac} vote={data} />
          </Text>
        </>
      );
    },
  },
];

export const ModalContent: React.FC<{ data: SongDataWithInfo | null }> = ({
  data,
}) => {
  const [update, setUpdate] = useState(0);
  useEffect(() => {
    setUpdate((v) => v + 1);
  }, [data]);

  if (!data) {
    return null;
  }

  const { start, number, data: vote } = data;
  const hymnIdetifier = `＊讃美歌${zenkaku2Hankaku(number)}`;

  return (
    <>
      <RightExpansion jasrac={data.jasrac} vote={data.data} update={update} />
      <Title level={5}>調べる</Title>
      <Space wrap>
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
        <Button
          href="https://www2.jasrac.or.jp/eJwid/"
          target="_blank"
          type="primary"
          rel="noopener noreferrer"
        >
          作品検索サービスを開く
        </Button>
      </Space>
      <Title level={5}>情報提供</Title>
      <Space wrap>
        <Button>パブリック・ドメイン({vote.publicDomain})</Button>
        <Button>UCCJ({vote.uccj})</Button>
        <Button>JASRAC({vote.jasrac})</Button>
        <Button>その他({vote.other})</Button>
      </Space>
    </>
  );
};

export const SongTableSp: React.FC<{
  hymnBookType: HymnBookType;
  searchText: string;
  data: { [key: string]: DataType };
  filter: Status[];
}> = ({ hymnBookType, searchText, data, filter }) => {
  const [focusData, setFocusData] = useState<null | SongDataWithInfo>(null);
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
    <>
      <Table
        onRow={(data) => {
          return {
            onClick: () => {
              setFocusData(data);
            },
          };
        }}
        className={styles.songs}
        bordered
        dataSource={songs}
        columns={columns}
        scroll={{
          y: "max-content",
          x: "max-content",
        }}
        sticky
      />
      <Modal
        title={`${focusData?.number} ${focusData?.start}`}
        open={focusData !== null}
        onCancel={() => setFocusData(null)}
        footer={null}
        maskClosable={true}
      >
        <ModalContent data={focusData} />
      </Modal>
    </>
  );
};
