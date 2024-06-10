import Post from "./Post";
import styles from "./MainArticleList.module.css";
import { useEffect, useState } from "react";
import axios from "axios";

const MainArticleList = ({ list_type }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPost = async (type) => {
    const auth = sessionStorage.getItem('token');
    const dataNew = { newNum: 3, category: "a" };
    const dataHot = { hotNum: 3, category: "a" };

    try {
      const url = type === "new"
        ? "http://154.12.55.105:8081/static/newPosts"
        : "http://154.12.55.105:8081/static/hotPosts";
      const data = type === "new" ? dataNew : dataHot;
      
      const response = await axios.post(url, data, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Authorization": auth,
        },
      });

      if (response.data.code === 200) {
        setList(type === "new" ? response.data.data.new : response.data.data.hot);
        console.log(response.data.data);
      } else {
        throw new Error('Failed to fetch posts');
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
      setError('Error fetching posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    setError(null);
    if (list_type === "인기 게시글") {
      fetchPost("hot");
    } else {
      fetchPost("new");
    }
  }, [list_type]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={styles.trendingPostsParent}>
      <div className={styles.trendingPosts}>
        <h1 className={styles.h1}>{list_type}</h1>
      </div>
      <div className={styles.cardGrid}>
        {list.map((data) => (
          <Post
            image={`http://154.12.55.105:8081/${data.cover}`}
            title={data.title}
            author={data.username}
            href={`/post/${data.id}`}
            key={data.id}
          />
        ))}
      </div>
    </div>
  );
};

export default MainArticleList;
