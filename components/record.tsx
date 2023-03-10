import { RecordType, RightType } from "@/utils/fetchData";
import { HymnBookType } from "@/utils/songs";
import { List } from "antd";
import { Typography } from "antd";
import { formatDistanceToNow } from "date-fns";
import ja from "date-fns/locale/ja";
const { Text } = Typography;

const bookType2Text = (bookType: HymnBookType) => {
  switch (bookType) {
    case "1954":
      return "讃美歌(1954年版)";
    case "21":
      return "讃美歌21";
    case "nihen":
      return "讃美歌第二編";
  }
};
const rightType2Text = (rightType: RightType) => {
  switch (rightType) {
    case "publicDomain":
      return "パブリック・ドメイン";
    case "uccj":
      return "UCCJ";
    case "jasrac":
      return "JASRAC";
    case "other":
      return "その他";
  }
};

export const dateString = (unixTime: number) => {
  const date = new Date(unixTime * 1000);
  return formatDistanceToNow(date, {
    addSuffix: true,
    locale: ja,
  });
};

export const RecordContent: React.FC<{ record: RecordType }> = ({ record }) => {
  return (
    <div>
      {bookType2Text(record.hymnBookType)}の{record.hymnNumber}番に「
      <Text strong>{rightType2Text(record.rightType)}</Text>」
      と入力されました。
      <Text disabled>{dateString(record.votedAt)}</Text>
    </div>
  );
};

export const RecordList: React.FC<{ records: RecordType[] }> = ({
  records,
}) => {
  return (
    <List<RecordType>
      dataSource={records}
      renderItem={(item) => {
        return (
          <List.Item
            style={{
              display: "block",
            }}
          >
            <RecordContent record={item} />
          </List.Item>
        );
      }}
    />
  );
};
