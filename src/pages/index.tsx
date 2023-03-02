import { Typography, Input, Space, Checkbox } from "antd";
import styles from "./styles.module.css";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import { SongTable, Status } from "components/table";
import { DataType, fetchData } from "@/utils/fetchData";

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

  const onChangeSearchText = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchText(e.target.value);
    },
    []
  );

  useEffect(() => {
    const fetch = async () => {
      const _data = await fetchData();
      console.log(_data);
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
  console.log(filter);
  return (
    <NoSSR>
      <div className={styles.container}>
        <Title className={styles.title}>みんなで作る讃美歌権利表</Title>
        <Space>
          <Search
            size="large"
            allowClear
            style={{ maxWidth: 300 }}
            onChange={onChangeSearchText}
            placeholder="番号・歌い出しで絞り込む"
          />
          <Text>絞り込み: </Text>
          <Checkbox.Group
            options={options}
            onChange={onFilter}
            value={filter}
          />
        </Space>
        <SongTable
          searchText={searchText}
          data={data}
          filter={filter as Status[]}
        />
      </div>
    </NoSSR>
  );
}
