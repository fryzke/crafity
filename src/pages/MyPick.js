import "bootstrap/dist/css/bootstrap.min.css";
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import HeaderComponent1 from "../components/HeaderComponent1";
import HeaderComponent2 from "../components/HeaderComponent2";
import DashBoardPost from "../components/DashBoardPost";
import PageFooter from "../components/PageFooter";
import styles from "./MyPick.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import axios from "axios";

const MyPick = () => {
  const [isLogined, setIsLogined] = useState(false);
  const [currentPost, setCurrentPost] = useState(0);
  const [activeMenu, setActiveMenu] = useState(0);
  const navigate = useNavigate();

  useEffect(()=> {
    if( sessionStorage.getItem('id') === null){
      setIsLogined(false);
    }else {
      setIsLogined(true);
    }
  }, []);

  const followerList = [{id:0, username: "user1"},{id:1, username: "user2"},{id:2, username: "user3"}]; //post 통해서 list 받아옴.
  const [pageNum, setPageNum] = useState(1);
  const [nextPage, setNextPage] = useState(true);
  const [prevPage, setPrevPage] = useState(false);
  const [list, setList] = useState();
  const auth = sessionStorage.getItem('auth');

  const fetchPosts = async (page) => {
    const data = {
      status: "publish",
      userId: currentPost,
      page: page,
      limit: 5
    };
    
    axios.post('/post/reviewPage',data, {headers:{
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": auth,
    }}).then(response => {
      const result = response.data.data;
      setList(result.list);
      setPageNum(result.pageNum);
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
            <h1 className={styles.h1}>MY PICK</h1>
          </div>
            <div className={styles.frameGroup}>
            <div className={styles.sidebarContainer}>
            <Sidebar rootStyles={styles.sidebar}>
                <Menu>
                    <MenuItem disabled={true}>followers</MenuItem>
                    {
                      followerList.map((follow) =>(
                        <MenuItem 
                          key={follow.id}
                          onClick={()=>{setCurrentPost(follow.id); setActiveMenu(follow.id)}}
                          className={activeMenu === follow.id ? styles.MenuItemActive : ''} 
                        >
                            {follow.username}
                        </MenuItem>
                      ))
                    }
                </Menu>
            </Sidebar>
            </div>
            <div className={styles.postContainer}>
              {list.map((data) => (
                <div key={data.id} className={styles.groupPost} >
                 <DashBoardPost 
                  image="/image-11@2x.png" title="게시글 제목" author="작성자"  view={1234} up={45} comment={3} date="2000.00.00" width={"240"} height={"180px"}
                  onClick={()=>navigate({location})}
                 />
                 </div>
              ))}
              {/*loading posts*/}
              <div className={styles.frameWrapper}>
              <div className={styles.frameDiv}>
              <IoIosArrowBack size="50" className={styles.GroupIcon} onClick={moveBackward}/>
                <b className={styles.b1}>{pageNum}</b>
              <IoIosArrowForward size="50" className={styles.GroupIcon} onClick={moveFoward}/>
              </div>
          </div>
            </div>
            </div>
        </section>
        </div>
      </main>
      <PageFooter />
    </div>
  );
};

export default MyPick;
