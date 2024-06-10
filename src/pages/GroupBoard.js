import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form } from "react-bootstrap";
import HeaderComponent1 from "../components/HeaderComponent1";
import HeaderComponent2 from "../components/HeaderComponent2";
import DashBoardPost from "../components/DashBoardPost";
import PageFooter from "../components/PageFooter";
import styles from "./GroupBoard.module.css";
import { useState, useEffect } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const PostBoard = () => {
  const [isLogined, setIsLogined] = useState(false);

  useEffect(()=> {
    if( sessionStorage.getItem('id') === null){
      setIsLogined(false);
    }else {
      setIsLogined(true);
    }
  }, []);

  const {category} = useParams();
  const [pageNum, setPageNum] = useState(1);
  const [nextPage, setNextPage] = useState(true);
  const [prevPage, setPrevPage] = useState(false);
  const [list, setList] = useState();
  const auth = sessionStorage.getItem('token');

  const fetchPosts = async (page) => {
    const data = {
      status: "publish",
      category: category,
      page: page,
      limit: 10
    };
    
    axios.post('/post/reviewPage',JSON.stringify(data), {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": auth,
    }).then(response => {
      const result = JSON.parse(response.data);
      setList(result.list);
      setPageNum(result.pageNum);
      setNextPage(result.hasNextPage);
      setPrevPage(result.hasPreviousPage);
    })
    .catch(error => {
      console.error('Error fetching posts:', error);
    });
  };

  useEffect(()=> {
    fetchPosts(pageNum);
  },[pageNum]);

  const moveFoward = () => {
    if(nextPage){
      setPageNum(pageNum+1);
    }
  };
  const moveBackward = () => {
    if(prevPage){
      setPageNum(pageNum-1);
    }
  };

  return (
    <div className={styles.postBoad}>
    <main className={styles.productDetailPage}>
      <header className={styles.header}>
        <HeaderComponent1 isLogined={isLogined}/>
        <HeaderComponent2 />
      </header>

      <div className={styles.card} />
      <div className={styles.BodyContents}>
      <section className={styles.frameParent}>
        <div className={styles.wrapper}>
          <h1 className={styles.h1}>모임 모집</h1>
        </div>
        <div className={styles.parent}>
          <Form.Select className={styles.div} aria-label="order">
            <option value="recent">최신순</option>
            <option value="hot">인기순</option>
          </ Form.Select>
        </div>
          <div className={styles.frameGroup}>
          {
              [1,2,3,4,5,6,7,8,9,10].map((data, i) =>{
                  return(
                    <div key={i}>
                    <DashBoardPost 
                    className={styles.groupPost} 
                    id={i}
                    image="/image-11@2x.png" title="xxx동 뜨개 모임" author="작성자" view={1234} up={45} comment={3} date="2000.00.00" width={"300"} height={"180"} 
                    />
                    </div>
                  )
              })
          }
          </div>
        <div className={styles.frameWrapper}>
            <div className={styles.frameDiv}>
            <IoIosArrowBack size="50" className={styles.GroupIcon} onClick={moveBackward}/>
              <b className={styles.b1}>{pageNum}</b>
            <IoIosArrowForward size="50" className={styles.GroupIcon} onClick={moveFoward}/>
            </div>
        </div>
        <div className={styles.btn}>
        <Button variant="dark" size="lg" onClick={()=>navigate("/new-post")}>게시글 작성</Button>
        </div>
      </section>
      </div>
    </main>
    <PageFooter />
  </div>
  );
};

export default PostBoard;
