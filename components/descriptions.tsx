import React from "react";
import { Typography } from "antd";

const { Paragraph, Text, Link } = Typography;

export const PublicDomain: React.FC = () => {
  return (
    <Paragraph>
      <Text type="success" strong>
        パブリック・ドメインの作品
      </Text>
      は知的財産権が消滅、又は放棄されているので、制約なく利用することができます。
      <br /> 従って、礼拝配信等での利用は問題ありません。
      <br />
      パブリック・ドメインについての詳細は
      <Link
        href="https://creativecommons.org/publicdomain/mark/1.0/deed.ja"
        target="_blank"
        rel="noopener noreferrer"
      >
        クリエイティブ・コモンズ
      </Link>
      をご参照ください。
    </Paragraph>
  );
};

export const Uccj: React.FC = () => {
  return (
    <Paragraph>
      <Text type="success" strong>
        日本基督教団が管理している楽曲
      </Text>
      については以下のように公布されています。
      <blockquote>
        日本キリスト教団出版局発行の賛美歌集より賛美歌を複写、インターネット配信される際、以下に該当する場合には申請不要といたします。
        <br />
        1. 日本キリスト教団出版局に著作権が帰属している作品であること。
        <br />
        2.各個教会の礼拝・集会（結婚式を除く）、キリスト教主義学校等（幼保こども園を含む）の礼拝での使用であること。
        <br />
        3. 複写物配布、動画配信で収益を得ていないこと。
        <br />
        4.2023年9月30日配布・配信開始分まで。
      </blockquote>
      従って、当面の間は礼拝配信等での使用は問題ありません。
      <br />
      参考:{" "}
      <Link
        href="https://bp-uccj.jp/company/cc2096.html"
        target="_blank"
        rel="noopener noreferrer"
      >
        賛美歌の複写および礼拝のインターネット配信（新型コロナウイルス感染症対策）についてのお知らせ
      </Link>
    </Paragraph>
  );
};

export const Jasrac: React.FC = () => {
  return (
    <Paragraph>
      <Text type="warning" strong>
        JASRACが管理している楽曲
      </Text>
      については以下の手続きとなっています。
      <br />→
      <Link
        href="https://www.jasrac.or.jp/info/network/pickup/movie.html"
        target="_blank"
        rel="noopener noreferrer"
      >
        動画投稿（共有）サービスでの音楽利用
      </Link>
      <br />
      従って、YoutubeやFacebookを含む
      <Link
        href="https://www.jasrac.or.jp/news/20/ugc.html"
        target="_blank"
        rel="noopener noreferrer"
      >
        利用許諾契約を締結しているUGCサービスの一覧
      </Link>
      に掲載されている動画投稿サービスで配信を行う場合は、無許諾で使用できます。
      <br />
      ただし、
      <Text strong>アーカイブ機能(後から配信を視聴できるようにする機能)</Text>
      を使用する場合は、
      <Text strong>団体名義のアカウントではなく個人名義のアカウント</Text>
      上で行う必要があります。
      <br />
      また、動画を教会ホームページなど、
      <Text strong>外部サイトに埋め込んで表示する</Text>
      場合には別の手続きが必要になる場合があります。
      <br />
      <br />
      参考:
      <Link
        href="https://uccj.org/news/36446.html"
        target="_blank"
        rel="noopener noreferrer"
      >
        日本キリスト教団出版局発行の賛美歌集を使った礼拝の配信について
      </Link>
    </Paragraph>
  );
};

export const Other: React.FC = () => {
  return (
    <Paragraph>
      <Text type="danger" strong>
        その他
      </Text>
      の場合は以下の状況が考えられます
      <br />
      ・権利を個人で管理している。
      <br />
      ・JASRAC以外の著作権管理団体に委託されている。
      <br />
      <br />「
      <Link
        href="https://uccj.org/news/36446.html"
        target="_blank"
        rel="noopener noreferrer"
      >
        日本キリスト教団出版局発行の賛美歌集を使った礼拝の配信について
      </Link>
      」 で
      <blockquote>
        ①(注: 日本基督教団が管理している)②(注:
        JASRACが管理している)以外の場合には、選曲の再検討をお勧めします。
      </blockquote>
      と記載されている通り、無許諾での動画配信・投稿での利用はできません。
    </Paragraph>
  );
};
