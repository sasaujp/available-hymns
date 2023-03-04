import {
  Typography,
  Input,
  Space,
  Checkbox,
  Select,
  Radio,
  RadioChangeEvent,
} from "antd";
import styles from "./styles.module.css";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import { SongTable, Status } from "components/table";
import { DataType, fetchData } from "@/utils/fetchData";
import { useMediaQuery } from "react-responsive";
import { HymnBookType } from "@/utils/songs";

const { Title, Text } = Typography;
const { Search } = Input;

const options = [
  { label: "情報提供待ち", value: "waiting" },
  { label: "パブリック・ドメイン", value: "publicDomain" },
  { label: "UCCJ", value: "uccj" },
  { label: "JASRAC", value: "jasrac" },
  { label: "その他", value: "other" },
];

const NoSSR = dynamic(() => import("../app/layout"), {
  ssr: false,
  loading: (props) => {
    return <>loading...</>;
  },
});

export default function Home() {
  const [data, setData] = useState<{ [key: string]: DataType }>({});
  const [searchText, setSearchText] = useState("");
  const [filter, setFilter] = useState<CheckboxValueType[]>([]);
  const [hymnBookType, setHymnBookType] = useState<HymnBookType>("1954");

  const isMobile = useMediaQuery({ query: "(max-width: 500px)" });

  const onChangeSearchText = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchText(e.target.value);
    },
    []
  );

  const onChangeHymnType = useCallback((e: RadioChangeEvent) => {
    setHymnBookType(e.target.value);
  }, []);

  useEffect(() => {
    const fetch = async () => {
      const _data = await fetchData();
      setData(
        _data.reduce<{ [key: string]: DataType }>((prev, cur) => {
          prev[cur.key] = cur;
          return prev;
        }, {})
      );
    };
    fetch();
  }, []);

  const onFilter = useCallback((value: CheckboxValueType[]) => {
    setFilter(value);
  }, []);
  return (
    <NoSSR>
      <div className={styles.container}>
        <Space className={styles.titleWrapper} wrap align="center">
          <Title className={styles.title}>
            みんなで作る讃美歌権利表(開発版)
          </Title>
          <Radio.Group value={hymnBookType} onChange={onChangeHymnType}>
            <Radio.Button value="1954">讃美歌(1954年版)</Radio.Button>
            <Radio.Button value="nihen">讃美歌第二編</Radio.Button>
            <Radio.Button value="21">讃美歌21</Radio.Button>
          </Radio.Group>
        </Space>
        <Space wrap>
          <Search
            size="large"
            allowClear
            style={{ maxWidth: 300 }}
            onChange={onChangeSearchText}
            placeholder="番号・歌い出しで絞り込む"
          />
          {isMobile ? (
            <Select
              size="large"
              mode="multiple"
              allowClear
              style={{
                minWidth: "200px",
              }}
              onChange={onFilter}
              placeholder="絞り込み"
              options={options}
              showSearch={false}
            />
          ) : (
            <Space>
              <Text>絞り込み: </Text>
              <Checkbox.Group
                options={options}
                onChange={onFilter}
                value={filter}
              />
            </Space>
          )}
        </Space>

        <SongTable
          hymnBookType={hymnBookType}
          searchText={searchText}
          data={data}
          filter={filter as Status[]}
        />
      </div>
    </NoSSR>
  );
}
