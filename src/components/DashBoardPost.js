import styles from "./DashBoardPost.module.css";
import { Link } from "react-router-dom";

const DashBoardPost = ({id, image, title, author, view, up, comment, date, width, height}) => {
  const link = "/post/"+id;
  return (
    <Link to={link}>
    <div className={styles.imageParent}>
      <img className={styles.imageIcon} loading="lazy" alt="" src={image} width={width} height={height}/>
      <div className={styles.frameParent}>
        <div className={styles.frameGroup}>
          <div className={styles.parent}>
            <h2 className={styles.h2}>{title}</h2>
            <div className={styles.div}>{author}</div>
          </div>
        </div>
        <div className={styles.div2}>조회수 {view} ♡ {up} 댓글 {comment} {date}</div>
      </div>
    </div>
    </Link>
  );
};

export default DashBoardPost;
