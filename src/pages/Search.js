import "bootstrap/dist/css/bootstrap.min.css";
import { Form } from "react-bootstrap";
import HeaderComponent1 from "../components/HeaderComponent1";
import HeaderComponent2 from "../components/HeaderComponent2";
import DashBoardPost from "../components/DashBoardPost";
import PageFooter from "../components/PageFooter";
import styles from "./Search.module.css";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import axios from "axios";

const Search = () => {
  const [isLogined, setIsLogined] = useState(false);
  const navigate = useNavigate();

  useEffect(()=> {
    if( sessionStorage.getItem('id') === null){
      setIsLogined(false);
    }else {
      setIsLogined(true);
    }
  }, []);

  const {keyword} = useParams();
  const [pageNum, setPageNum] = useState(1);
  const [nextPage, setNextPage] = useState(true);
  const [prevPage, setPrevPage] = useState(false);
  const [list, setList] = useState([]);
  
  const fetchPosts = async (page) => {
    const data = {
      title: {keyword},
      status: "publish",
      page: page,
      limit: 10
    };
    
    axios.post('http://154.12.55.105:8081/post/reviewPage',data, {headers:{
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": sessionStorage.getItem('token'),
    }}).then(response => {
      const result = response.data.data;
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
        <div className={styles.BodyContents}>
        <section className={styles.frameParent}>
          <div className={styles.wrapper}>
            <h1 className={styles.h1}>{'검색결과 : '}{keyword}</h1>
          </div>
          <div className={styles.parent}>
            <Form.Select className={styles.div} aria-label="order">
              <option value="recent">최신순</option>
              <option value="hot">인기순</option>
            </ Form.Select>
          </div>
            <div className={styles.frameGroup}>
            {
              list.map((data) =>{
                  return(
                    <div key={data.id}>
                    <DashBoardPost 
                    className={styles.groupPost} 
                    id={data.id}
                    image="" title={data.title} author={data.username}  view={1234} up={45} comment={3} date={data.createTime}
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
        </section>
        </div>
      </main>
      <PageFooter />
    </div>
  );
};

export default Search;
