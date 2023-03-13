export interface HymnData {
  hymnBookType: string;
  hymnNumber: string;
  rightType: string;
  numberOfVote: number;
}

export interface HymnVoteRecord {
  id: string;
  hymnBookType: string;
  hymnNumber: string;
  rightType: string;
  votedAt: number;
}

export interface DB {
  HymnData: HymnData;
  HymnVoteRecord: HymnVoteRecord;
}
