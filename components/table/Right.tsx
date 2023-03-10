import { FileSearchOutlined } from "@ant-design/icons";
import { Button, Popover, Space, Typography } from "antd";
import { Jasrac, Other, PublicDomain, Uccj } from "components/descriptions";
import React, { useCallback, useEffect, useState } from "react";
import { Status } from "./defines";

const { Text, Title } = Typography;
export const vote2Right = (
  jasrac: boolean,
  vote: {
    publicDomain: number;
    uccj: number;
    jasrac: number;
    other: number;
  }
) => {
  const right = {
    publicDomain: false,
    uccj: false,
    jasrac: false,
    other: false,
    waiting: false,
  };
  if (jasrac) {
    right.jasrac = true;
  } else {
    const { uccj, publicDomain, jasrac, other } = vote;
    if (Math.max(uccj, publicDomain, jasrac, other) === 0) {
      right.waiting = true;
    } else {
      if (Math.max(uccj, publicDomain, jasrac, other) === publicDomain) {
        right.publicDomain = true;
      }
      if (Math.max(uccj, publicDomain, jasrac, other) === uccj) {
        right.uccj = true;
      }
      if (Math.max(uccj, publicDomain, jasrac, other) === jasrac) {
        right.jasrac = true;
      }
      if (Math.max(uccj, publicDomain, jasrac, other) === other) {
        right.other = true;
      }
    }
  }
  return right;
};

export const RightPopover: React.FC<{
  jasrac: boolean;
  vote: {
    publicDomain: number;
    uccj: number;
    jasrac: number;
    other: number;
  };
}> = ({ jasrac, vote }) => {
  const right = vote2Right(jasrac, vote);
  return (
    <Space wrap>
      {right.waiting && <Text>情報提供待ち </Text>}
      {right.publicDomain && (
        <Popover
          content={<PublicDomain />}
          trigger="click"
          title="配信での利用について"
        >
          <Button type="text">
            <Text strong type="success">
              パブリック・ドメイン
              <FileSearchOutlined />{" "}
            </Text>
          </Button>
        </Popover>
      )}
      {right.uccj && (
        <Popover
          content={<Uccj />}
          trigger="click"
          title="配信での利用について"
        >
          <Button type="text">
            <Text strong type="success">
              UCCJ
              <FileSearchOutlined />{" "}
            </Text>
          </Button>
        </Popover>
      )}
      {right.jasrac && (
        <Popover
          trigger="click"
          content={<Jasrac />}
          title="配信での利用について"
        >
          <Button type="text">
            <Text strong type="warning">
              JASRAC
              <FileSearchOutlined />{" "}
            </Text>
          </Button>
        </Popover>
      )}
      {right.other && (
        <Popover
          trigger="click"
          content={<Other />}
          title="配信での利用について"
        >
          <Button type="text">
            <Text strong type="danger">
              その他
              <FileSearchOutlined />{" "}
            </Text>
          </Button>
        </Popover>
      )}
    </Space>
  );
};

export const RightExpansion: React.FC<{
  jasrac: boolean;
  vote: {
    publicDomain: number;
    uccj: number;
    jasrac: number;
    other: number;
  };
  update: number;
}> = ({ jasrac, vote, update }) => {
  const [expansion, setExpansion] = useState<Status | null>(null);
  const right = vote2Right(jasrac, vote);

  useEffect(() => {
    setExpansion(null);
  }, [update]);

  const onClick = useCallback(
    (
      e:
        | React.MouseEvent<HTMLButtonElement, MouseEvent>
        | React.MouseEvent<HTMLAnchorElement, MouseEvent>
    ) => {
      const newValue = e.currentTarget.name as Status;
      setExpansion((val) => (val !== newValue ? newValue : null));
    },
    []
  );
  return (
    <>
      {right.waiting && <Text>情報提供待ち </Text>}
      {right.publicDomain && (
        <Button type="text" name="publicDomain" onClick={onClick}>
          <Text strong type="success">
            パブリック・ドメイン
            <FileSearchOutlined />
          </Text>
        </Button>
      )}
      {right.uccj && (
        <Button type="text" name="uccj" onClick={onClick}>
          <Text strong type="success">
            UCCJ
            <FileSearchOutlined />
          </Text>
        </Button>
      )}
      {right.jasrac && (
        <Button type="text" name="jasrac" onClick={onClick}>
          <Text strong type="warning">
            JASRAC
            <FileSearchOutlined />
          </Text>
        </Button>
      )}
      {right.other && (
        <Button type="text" name="other" onClick={onClick}>
          <Text strong type="danger">
            その他
            <FileSearchOutlined />
          </Text>
        </Button>
      )}
      {(() => {
        if (!expansion) {
          return null;
        }
        let components: React.ReactNode = null;
        switch (expansion) {
          case "jasrac":
            components = <Jasrac />;
            break;
          case "other":
            components = <Other />;
            break;
          case "publicDomain":
            components = <PublicDomain />;
            break;
          case "uccj":
            components = <Uccj />;
            break;
          default:
            return null;
        }
        return (
          <>
            <Title level={5}>配信での利用について</Title>
            {components}
          </>
        );
        components;
      })()}
    </>
  );
};

export const RightText: React.FC<{
  jasrac: boolean;
  vote: {
    publicDomain: number;
    uccj: number;
    jasrac: number;
    other: number;
  };
}> = ({ jasrac, vote }) => {
  const right = vote2Right(jasrac, vote);
  return (
    <>
      {right.waiting && <Text>情報提供待ち </Text>}
      {right.publicDomain && (
        <Text strong type="success">
          パブリック・ドメイン
        </Text>
      )}
      {right.uccj && (
        <Text strong type="success">
          UCCJ
        </Text>
      )}
      {right.jasrac && (
        <Text strong type="warning">
          JASRAC
        </Text>
      )}
      {right.other && (
        <Text strong type="danger">
          その他
        </Text>
      )}
    </>
  );
};
