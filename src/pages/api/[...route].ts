import { Hono } from "hono";
import type { DB } from "kysely-codegen";
import { Kysely } from "kysely";
import { D1Dialect } from "kysely-d1";
import { v4 } from "uuid";
import { cors } from "hono/cors";
import { handle } from "hono/nextjs";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      HYMNS: D1Database;
      DB: D1Database;
    }
  }
}

type Bindings = {
  DB: D1Database;
};

export const config = {
  runtime: "edge",
};

const api = new Hono();

api.use("/*", cors());

api.get("/votes/:bookType", async (c) => {
  console.log(c);
  const client = new Kysely<DB>({
    dialect: new D1Dialect({ database: process.env.DB }),
  });
  const bookType = c.req.param("bookType");
  const hymns = await client
    .selectFrom("HymnData")
    .where("HymnData.hymnBookType", "==", bookType)
    .selectAll()
    .execute();
  return c.json(
    {
      hymns,
    },
    200
  );
});

api
  .get("/records", async (c) => {
    const client = new Kysely<DB>({
      dialect: new D1Dialect({ database: process.env.HYMNS }),
    });
    const records = await client
      .selectFrom("HymnVoteRecord")
      .orderBy("HymnVoteRecord.votedAt", "desc")
      .selectAll()
      .limit(6)
      .execute();
    return c.json(
      {
        records,
      },
      200
    );
  })
  .options("/records", (c) => {
    return new Response("success", {
      status: 200,
    });
  })
  .post("/records", async (c) => {
    console.log(c.env);
    const { hymnBookType, hymnNumber, rightType } = await c.req.json<{
      hymnBookType: string;
      hymnNumber: string;
      rightType: string;
    }>();
    const client = new Kysely<DB>({
      dialect: new D1Dialect({ database: process.env.HYMNS }),
    });
    await client
      .insertInto("HymnVoteRecord")
      .values({
        id: v4(),
        hymnBookType,
        hymnNumber,
        rightType,
        votedAt: Math.floor(new Date().getTime() / 1000),
      })
      .execute();
    const isExistData = await client
      .selectFrom("HymnData")
      .select("HymnData.numberOfVote")
      .where("HymnData.hymnBookType", "==", hymnBookType)
      .where("HymnData.hymnNumber", "==", hymnNumber)
      .where("HymnData.rightType", "==", rightType)
      .limit(1)
      .execute();
    if (isExistData.length) {
      await client
        .updateTable("HymnData")
        .set({
          numberOfVote: isExistData[0].numberOfVote + 1,
        })
        .where("HymnData.hymnBookType", "==", hymnBookType)
        .where("HymnData.hymnNumber", "==", hymnNumber)
        .where("HymnData.rightType", "==", rightType)
        .execute();
    } else {
      await client
        .insertInto("HymnData")
        .values({
          hymnBookType,
          hymnNumber,
          rightType,
          numberOfVote: 1,
        })
        .execute();
    }
    return c.json(
      {
        ok: true,
      },
      201
    );
  });

export default handle(api, "/api");
