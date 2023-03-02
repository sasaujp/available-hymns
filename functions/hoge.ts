import type { PagesFunction, KVNamespace } from "@cloudflare/workers-types";
import { Response } from "@cloudflare/workers-types";

interface Env {
  KV: KVNamespace;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const value = await context.env.KV.get("example");
  return new Response(value);
};
