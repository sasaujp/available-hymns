import axios from "axios";
import { HymnBookType } from "./songs";

const API_ORIGIN =
  process.env.NEXT_PUBLIC_API_ORIGIN ?? "http://localhost:8787";

export type DataType = {
  key: string;
  publicDomain: number;
  uccj: number;
  jasrac: number;
  other: number;
  comments: string[];
};

export type RightType = "publicDomain" | "uccj" | "jasrac" | "other";

export const fetchData = async (hymnBookType: string): Promise<DataType[]> => {
  const result = await axios.get<{
    hymns: {
      hymnBookType: HymnBookType;
      hymnNumber: string;
      rightType: RightType;
      numberOfVote: number;
    }[];
  }>(`${API_ORIGIN}/api/votes/${hymnBookType}`);

  const data = result.data.hymns.reduce<{ [key: string]: DataType }>(
    (prev, { hymnNumber, rightType, numberOfVote }) => {
      if (!prev[hymnNumber]) {
        prev[hymnNumber] = {
          key: hymnNumber,
          publicDomain: 0,
          uccj: 0,
          jasrac: 0,
          other: 0,
          comments: [],
        };
      }
      prev[hymnNumber][rightType] = numberOfVote;
      return prev;
    },
    {}
  );
  return Object.values(data);
};

export type RecordType = {
  hymnBookType: HymnBookType;
  hymnNumber: string;
  rightType: RightType;
  votedAt: number;
};

export const fetchRecord = async (): Promise<RecordType[]> => {
  const result = await axios.get<{
    records: RecordType[];
  }>(`${API_ORIGIN}/api/records`);

  return result.data.records;
};

export const postRecord = async (
  hymnBookType: HymnBookType,
  hymnNumber: string,
  rightType: RightType
) => {
  await axios.post<{ ok: true }>(
    `${API_ORIGIN}/api/records`,
    JSON.stringify({
      hymnBookType,
      hymnNumber,
      rightType,
    }),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
