import React, { FC } from "react";
import FeatureList, { Feature } from "../components/common/list";
import styles from "../scss/pages/about.scss";
import PageContainer from "../components/common/Container";

const About: FC = () => {
  const Features: Feature[] = [
    {
      id: 1,
      title: "導入の負担が少ない",
      image: "../image/sample.png",
      explanation:
        "2.5次元黒板はスマホとARマーカーで完結するため、新たに機材の導入の必要がありません。",
    },
    {
      id: 2,
      title: "かさばらない",
      image: "../image/sample.png",
      explanation: "大きな資料を保管する必要がありません。ARマーカーは同じものを使用できます。",
    },
    {
      id: 3,
      title: "サンプル",
      image: "../image/sample.png",
      explanation: "にゃーん（もうひとつぐらい書きたい。考えときます）",
    },
  ];

  return (
    <>
      <PageContainer>
        <FeatureList Features={Features} />
      </PageContainer>
    </>
  );
};

export default About;
