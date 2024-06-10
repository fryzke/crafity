import "bootstrap/dist/css/bootstrap.min.css";
import HeaderWithImage from "../components/HeaderWithImage";
import MainArticleList from "../components/MainArticleList";
import Notice from "../components/Notice";
import styles from "./Main.module.css";
import PageFooter from "../components/PageFooter";
import HeaderComponent1 from "../components/HeaderComponent1";
import HeaderComponent2 from "../components/HeaderComponent2";
import { useState, useEffect } from "react";

const Main = () => {
  const [isLogined, setIsLogined] = useState(false);

  useEffect(()=> {
    if( sessionStorage.getItem('id') === null){
      setIsLogined(false);
    }else {
      setIsLogined(true);
    }
  }, []); //check_logined

  return (
    <div>
    <div className={styles.main}>
      <header>
      <HeaderComponent1 isLogined={isLogined}/>
      <HeaderComponent2 />
      <HeaderWithImage />
      </header>
      <div className={styles.BodyContents}>
        <section className={styles.postArea}>
          <div className={styles.cardGrid}>
            <MainArticleList list_type={"인기 게시글"} />
            <MainArticleList list_type={"추천 게시글"} />
            <Notice />
          </div>
        </section>
      </div>
    </div>
    <footer>
      <PageFooter className={styles.footer}/>
    </footer>
    </div>
  );
};

export default Main;
