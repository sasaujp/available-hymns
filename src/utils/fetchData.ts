export type DataType = {
  key: string;
  publicDomain: number;
  uccj: number;
  jasrac: number;
  other: number;
  searchWords: string[];
  comments: string[];
};

const generateRandomDataType = (key: string): DataType => {
  const randomString = () => Math.random().toString(36).substring(2, 15);
  const randomInt = () => Math.floor(Math.random() * 100);

  const dataType: DataType = {
    key,
    publicDomain: randomInt(),
    uccj: randomInt(),
    jasrac: randomInt(),
    other: randomInt(),
    searchWords: [randomString(), randomString(), randomString()],
    comments: [randomString(), randomString(), randomString()],
  };

  return dataType;
};

export const fetchData = async () => {
  return [
    generateRandomDataType("1"),
    generateRandomDataType("2"),
    generateRandomDataType("3"),
    generateRandomDataType("4"),
    generateRandomDataType("5"),
    generateRandomDataType("6"),
    generateRandomDataType("7"),
    generateRandomDataType("8"),
    generateRandomDataType("9"),
  ];
};
