import { DataType } from "@/utils/fetchData";
import { SongData } from "@/utils/songs";

export type Status = "publicDomain" | "uccj" | "jasrac" | "other" | "waiting";

export type SongDataWithInfo = SongData & { data: DataType };
