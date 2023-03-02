import type { NextResponse } from "next/server";

export const config = {
  runtime: "experimental-edge",
};

export default function handler(es: NextResponse) {
  return new Response(JSON.stringify({ name: "John Doe" }), {
    status: 200,
    headers: {
      "content-type": "application/json",
    },
  });
}
