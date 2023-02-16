import { SONGS } from "@/utils/songs";
import { Typography, Input, Card, Col, Row, Button } from "antd";
import styles from "./styles.module.css";
import dynamic from "next/dynamic";
import { useCallback, useMemo, useState } from "react";

const { Title } = Typography;
const { Search } = Input;

const NoSSR = dynamic(() => import("../app/layout"), {
  ssr: false,
  loading: (props) => {
    return <>loading...</>;
  },
});

export default function Home() {
  const [searchText, setSearchText] = useState("");
  const songs = useMemo(() => {
    if (!searchText.length) {
      return SONGS;
    }

    const texts = searchText.split(" ");
    return SONGS.filter(([number, start]) => {
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
  }, [searchText]);

  const onChangeSearchText = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchText(e.target.value);
    },
    []
  );

  return (
    <NoSSR>
      <Title className={styles.title}>みんなで作る讃美歌権利表</Title>
      <Search
        size="large"
        allowClear
        style={{ maxWidth: 300 }}
        onChange={onChangeSearchText}
        placeholder="番号・歌い出しで絞り込む"
      />
      <Row className={styles.songs} gutter={[16, 24]}>
        {songs.map(([number, start]) => {
          return (
            <Col className={styles.card} span={6} key={number}>
              <Card title={`${number} ${start}`}>
                <>
                  <Button type="primary">Public Domain</Button>
                  <Button type="primary">教団</Button>
                  <Button>JASRAC</Button>
                  <Button danger>その他</Button>
                </>
              </Card>
            </Col>
          );
        })}
      </Row>
    </NoSSR>
  );
}
