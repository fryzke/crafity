import styles from "./Notice.module.css";
import { Link } from "react-router-dom";

const Notice = () => {
  return (
    <div className={styles.notificationArea}>
      <h1 className={styles.h1}>공지사항</h1>
      <div className={styles.rectangleParent}>
        <div>공지사항이 없습니다.</div>  
      <div className={styles.divider} />
        
      </div>
    </div>
  );
};

export default Notice;
