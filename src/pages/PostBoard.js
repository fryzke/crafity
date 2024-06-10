import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form } from "react-bootstrap";
import HeaderComponent1 from "../components/HeaderComponent1";
import HeaderComponent2 from "../components/HeaderComponent2";
import DashBoardPost from "../components/DashBoardPost";
import PageFooter from "../components/PageFooter";
import styles from "./PostBoard.module.css";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import axios from "axios";

const PostBoard = () => {
  const [isLogined, setIsLogined] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem('id') === null) {
      setIsLogined(false);
    } else {
      setIsLogined(true);
    }
  }, []);

  const { category } = useParams();
  const [pageNum, setPageNum] = useState(1);
  const [nextPage, setNextPage] = useState(true);
  const [prevPage, setPrevPage] = useState(false);
  const [list, setList] = useState([]);
  const auth = sessionStorage.getItem('token');

  const fetchPosts = async (pageNum) => {
    setLoading(true);
    setError(null);
    const data = {
      title: null,
      status: "publish",
      category: category,
      userId: null,
      page: pageNum,
      limit: 10
    };

    try {
      const response = await axios.post('http://154.12.55.105:8081/post/reviewPage', data, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Authorization": auth,
        }
      });
      const result = response.data.data;
      setList(result.list);
      setPageNum(result.pageNum);
      setNextPage(result.hasNextPage);
      setPrevPage(result.hasPreviousPage);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setError('Error fetching posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(pageNum);
  }, [pageNum, category]);

  const moveForward = () => {
    if (nextPage) {
      setPageNum(pageNum + 1);
    }
  };

  const moveBackward = () => {
    if (prevPage) {
      setPageNum(pageNum - 1);
    }
  };

  return (
    <div className={styles.postBoard}>
      <main className={styles.productDetailPage}>
        <header className={styles.header}>
          <HeaderComponent1 isLogined={isLogined} />
          <HeaderComponent2 />
        </header>
        <div className={styles.BodyContents}>
          <section className={styles.frameParent}>
            <div className={styles.wrapper}>
              <h1 className={styles.h1}>{`게시판>`}{category}</h1>
            </div>
            <div className={styles.parent}>
              <Form.Select className={styles.div} aria-label="order">
                <option value="recent">최신순</option>
                <option value="hot">인기순</option>
              </Form.Select>
            </div>
            <div className={styles.frameGroup}>
              {loading ? (
                <div>Loading...</div>
              ) : error ? (
                <div>{error}</div>
              ) : (
                list.map((data) => (
                  <DashBoardPost
                    id={data.id}
                    image="/image-11@2x.png"
                    title={data.title}
                    author={data.username}
                    view={123}
                    up={45}
                    comment={3}
                    date={data.createTime}
                    width={"300"}
                    height={"180"}
                    key={data.id}
                  />
                ))
              )}
            </div>
            <div className={styles.frameWrapper}>
              <div className={styles.frameDiv}>
                <IoIosArrowBack size="50" className={styles.GroupIcon} onClick={moveBackward} />
                <b className={styles.b1}>{pageNum}</b>
                <IoIosArrowForward size="50" className={styles.GroupIcon} onClick={moveForward} />
              </div>
            </div>
            <div className={styles.btn}>
              <Button variant="dark" size="lg" onClick={() => navigate("/new-post")}>게시글 작성</Button>
            </div>
          </section>
        </div>
      </main>
      <PageFooter />
    </div>
  );
};

export default PostBoard;
