export const config = {
  runtime: "edge",
};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB: D1Database;
    }
  }
}

const hello = async (a: any, b: any, c: any) => {
  const { results } = await process.env.DB.prepare(
    "SELECT * FROM HymnData"
  ).all();
  console.log(results);
  return "hogehgoe";
};

export default hello;
