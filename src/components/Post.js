import styles from "./Post.module.css";
import { Link } from "react-router-dom";

const Post = ({ image, title, author, href }) => {
  return (
    <Link to={href}>
    <div className={styles.post}>
        <img className={styles.imageIcon} loading="lazy" alt="" src={image} />
        <div className={styles.copy}>
          <div className={styles.title}>{title}</div>
          <div className={styles.div}>{author}</div>
        </div>
    </div>
    </Link>
  );
};

export default Post;
