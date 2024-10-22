import React, { FC } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Grid,
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
  CardMedia,
} from "@material-ui/core";

import Header, { HeaderProps } from "../components/common/Header";
import PageContainer from "../components/common/Container";

import styles from "../scss/pages/home.scss";

import SumahoImage from "../images/sumaho_image.png";
import SenseiImage from "../images/sensei_image.png";
import SeitoImage from "../images/seito_image.png";
import DownladImage from "../images/download_image.png";

type menuContentsType = {
  title: string;
  contents: string;
  linkText: string;
  link: string;
  image: string;
};

const headerProps: HeaderProps = {
  buttonText: "About",
  href: "/about",
};

const menuContents: menuContentsType[] = [
  {
    title: "2.5次元黒板について",
    contents:
      "ARのマーカーを黒板に貼り付けて、カメラを通して見ることで資料を映しだすことができます。",
    linkText: "詳しく見る",
    link: "/about",
    image: SumahoImage,
  },
  {
    title: "教師の方",
    contents: "授業を作成しましょう。",
    linkText: "始める",
    link: "/teacher",
    image: SenseiImage,
  },
  {
    title: "生徒の方",
    contents: "授業コードを入力して始めましょう。",
    linkText: "始める",
    link: "/student/join",
    image: SeitoImage,
  },
  {
    title: "マーカーの入手",
    contents: "ここから必要なマーカーをダウンロードできます。",
    linkText: "見に行く",
    link: "/download",
    image: DownladImage,
  },
];

const HomeCard: FC<menuContentsType> = (menu) => (
  <Card className={styles.homeMenu}>
    <CardMedia component="img" image={menu.image} title={`${menu.title}のイメージ`} />
    <CardContent>
      <Typography gutterBottom variant="h5" component="h2" className={styles.homeTitle}>
        {menu.title}
      </Typography>
      <Typography variant="body2" color="textSecondary" component="p">
        {menu.contents}
      </Typography>
    </CardContent>
    <CardActions className={styles.homeContentsButton}>
      <Button component={Link} to={menu.link} color="primary">
        {menu.linkText}
      </Button>
    </CardActions>
  </Card>
);

const Home: FC = () => (
  <>
    <Header {...headerProps} />
    <PageContainer>
      <h1 className={styles.homeTitle}>2.5次元黒板</h1>
      <Container maxWidth="md">
        <Grid container spacing={4}>
          {menuContents.map((menu, key) => (
            <Grid item xs={12} sm={6} md={4} key={key}>
              <HomeCard {...menu} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </PageContainer>
  </>
);

export default Home;
