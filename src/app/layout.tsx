import Head from "next/head";
import "./global.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Head>
        <title>みんなで作る讃美歌権利表</title>
        <meta
          name="description"
          content="讃美歌の著作権に関しての情報を集約するためのWebアプリケーションです。"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="152x152" href="/logo.png" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      {children}
    </>
  );
}
