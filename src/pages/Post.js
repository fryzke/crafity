import HeaderComponent1 from "../components/HeaderComponent1";
import CommentBoard from "../components/CommentBoard";
import Support from "../components/Support";
import { IoMdShare } from "react-icons/io";
import { BiSolidComment, BiComment } from "react-icons/bi";
import { IoHeartOutline, IoHeart  } from "react-icons/io5";
import PageFooter from "../components/PageFooter";
import styles from "./Post.module.css";
import { Button } from "react-bootstrap";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams} from "react-router-dom";
import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { FaRegEnvelope } from "react-icons/fa6";

const Post = () => {
  const [isLogined, setIsLogined] = useState(false);
  const editorRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const {postid} = useParams();
  useEffect(()=> {
    if( sessionStorage.getItem('id') === null){
      setIsLogined(false);
    }else {
      setIsLogined(true);
    }
  }, []);
  const currentUser = sessionStorage.getItem('id');
  const auth = sessionStorage.getItem('token');
  const [like, setLike] = useState("");
  const [view, setView] = useState("");
  const [coinnum, setCoinnum] = useState("");
  const [userData, setUserData] = useState();
  useEffect(()=>{
    setUserData(sessionStorage.getItem('user'));
    if(userData === null) {
      setCoinnum(0);
    }else{
    setCoinnum(userData.coinnum);
    }

    }, []);
  const [isAuthor, setIsAuthor] = useState(false);
  const [isGroup, setIsGroup] = useState(false);
  const [postContent, setPostContent] = useState();
  useEffect(()=>{
    const data = {postId: postid};
    axios.post('http://154.12.55.105:8081/post/getPost', data, {headers:{
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": auth,
      }})
      .then(response => {
        setPostContent(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching post:', error);
      });
    setLike(postContent.likenum);
    setView(postContent.view);
  }, []);  //get post content from db using id
  
  const [isFollow, setIsFollow]  = useState(false);//if user followed this author change it true
  const [isLiked, setIsLiked] = useState(false);//if user liked this post change it true

  useEffect(()=> {
    setView(view+1);
    axios.post('http://154.12.55.105:8081/post/lookPost', data, {headers:{
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": auth,
    }})
    .then(response => {
      setPostContent(response.data.data);
    })
    .catch(error => {
      console.error('Error fetching post:', error);
    });
    if(currentUser === postContent.userid){
      setIsAuthor(true);
    }else {
      setIsAuthor(false);
    }
    if(postContent.category === "모임 모집"){
      setIsGroup(true);
    }
  }, []);

  const handleSub=()=> {
    if(isFollow){
      setIsFollow(false);
    }else{
      setIsFollow(true);
    }
    axios.post('http://154.12.55.105:8081/post/attention', {postId: postContent.id}, {headers:{
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": auth,
    }}).then(response=>{
      if(response.data.code === 200){
        console.log(response.data.msg);
      }

    }).catch(error => {
      console.error('Error look post:', error);
    });
  }
  const clickHeart=()=> {
      if(isLiked){
        setIsLiked(false);
        setLike(like-1);
      }else{
        setIsLiked(true);
        setLike(like+1);
      }
      axios.post('http://154.12.55.105:8081/post/upPost', {postId: postContent.id}, {headers:{
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": auth,
      }}).then(response=>{
        if(response.data.code === 200){
          console.log(response.data.msg);
        }

      }).catch(error => {
        console.error('Error look post:', error);
      });
  }
  const handleComment= ()=>{
    if(isOpen){
      setIsOpen(false);
    } else{
      setIsOpen(true);
    } 
  };
  const handleShare = async () => {
    const link = `https://localhost:3000/post/${postContent.id}`;
    try {
      await navigator.clipboard.writeText(link);
      alert('링크가 클립보드에 복사되었습니다!');
    } catch (err) {
      console.error('링크 복사 실패:', err);
    }
  };

  return (
    <div className={styles.main}>
      <header className={styles.HeaderComponents1}>
        <HeaderComponent1 isLogined={isLogined}/>
      </header>
      <main className={styles.BodyContents}>
        <section className={styles.topicHeader}>
        <div className={styles.titleArea}>
          <div className={styles.titlesParent}>
        <div className={styles.titles}>
          <h1 className={styles.h1}>{`게시판>`}{postContent.category}</h1>
          <h1 className={styles.h11}>{postContent.title}</h1>
            </div>
            <div className={styles.meta}>
              <div className={styles.profile}>
                <div className={styles.userInfo}>
                   <div className={styles.user}>
                      <h1 className={styles.h12}>{postContent.userid}</h1>
                    </div>
                    <div className={styles.div}>조회수 {view} ♡ {like} {postContent.date}</div>
                </div>
              </div>
              <div className={styles.subscribe}>
                { isAuthor
                        ?<Button variant="dark" className={styles.b} onClikc={()=>navigate(`/new-post/edit/${postid}`)}>수정</Button>
                        :<div className={styles.buttonWrapper}><Button variant="dark" className={styles.b} onClick={handleSub}>{isFollow?"구독취소":"구독"}</Button>
                        <Button variant="dark" className={styles.b} onClick={()=>navigate("/dm", {state: [{user: {
        id: postContent.userId,
        username: postContent.username,
        pic: "",
        status: "available"
      },
      lastMessage: ""}]})}><FaRegEnvelope color="white" size="20" /></Button></div>
                }   
                </div>
              </div>
            </div>
          </div>
          <div className={styles.description}>
            <div className={styles.aboutContent}>
              {/*post content is here*/}
              <Viewer 
                ref={editorRef}
                initialValue={postContent.content} 
              />
            </div>
          </div>
          { isAuthor
            ?null
            : isGroup ?<div></div>:<Support coin={coinnum} isLogined={isLogined}/>
          }
          <div className={styles.tags}>
            <h3 className={styles.tag1Tag2Tag3}>{
              postContent.tags &&postContent.tags.map((tag, i) => {
                return(
                <p key={i} className={styles.tag1Tag2Tag3}>#{tag}</p>
                )
              })
            }</h3>
          </div>
          <div className={styles.interaction}>
      <div className={styles.engagement}>
        <div className={styles.likeShapeWrapper}>
          { isOpen
            ? <BiSolidComment onClick={handleComment} size="50"/>
            : <BiComment onClick={handleComment} size="50"/>
          }
        </div>
        <div className={styles.heartIcon}>
        <div>
          {isLiked
              ?<IoHeart  onClick={clickHeart} size="50" />
              :<IoHeartOutline  onClick={clickHeart} size="50"/>
          }
        </div>
          <div className={styles.likesCount}>
            <div className={styles.likes}>{like} Likes</div>
          </div>
          <div className={styles.share}>
              <IoMdShare size="50" onClick={handleShare}/>
          </div>
        </div>
      </div>
    </div>
    {
      isOpen
      ? <CommentBoard postId={postid}/>
      : null
    }
        </section>
      </main>
      <PageFooter />
    </div>
  );
};

export default Post;

