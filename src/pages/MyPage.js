import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./MyPage.module.css";
import PageFooter from "../components/PageFooter";
import HeaderComponent1 from "../components/HeaderComponent1";
import { Button, Form, Modal, ModalBody } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoIosClose } from "react-icons/io";
import axios from "axios";

const MyPage = () => {
  const id = sessionStorage.getItem('id');
  const userData = sessionStorage.getItem('user'); 
  const listPost = useState([]);
  const listGroup = useState([]);
  const [followers, setFollowers] = useState([]);

  const [isLogined, setIsLogined] = useState(false);
  const [valid, setValid] = useState(true);
  const [charge, setCharge] =useState(0);
  const [isEdit, setIsEdit] = useState(false);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const [show4, setShow4] = useState(false);
  const [show5, setShow5] = useState(false);
  const [post, setPost] = useState(listPost);
  const [group, setGroup] = useState(listGroup);
  const [currentUserName, setCurrentUserName] = useState(userData.username);
  const [changeUserName, setChangeUserName] = useState(userData.username);
  const [currentEmail, setCurrentEmail] = useState(userData.email);
  const [currentPwd, setPwd] =useState(userData.password);
  const [changePwd, setChangePwd] =useState(currentPwd);
  const [coin, setCoin] = useState(userData.coinnum);
  const [checkPwd, setCheckPwd] =useState("");
  const [tags, setTags] = useState(userData.interest);
  const [tag, setTag] = useState("");
  const [changeTags, setChangeTags] = useState(tags);
  const[currentFollowers, setCurrentFollowers] = useState([]);
  const navigate = useNavigate();

  useEffect(()=> {
    if( id === null){
      setIsLogined(false);
    }else {
      setIsLogined(true);
    }
  }, []);

  useEffect(()=> {
    const data = {};
    axios.post('http://154.12.55.105:8081/post/attention', data, {headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": sessionStorage.getItem('token'),
    }}).then(response => {
      if(response.data.code === 200){
        setFollowers(response.data.data);
      }
    }).catch(error => {
      console.error('Error fetching followers:', error);
    });



  }, []);
  const handleClose1 = () => {
    setCharge(0);
    setShow1(false);
  };
  const handleClose2 = () => {
    setCharge(0);
    setShow2(false);
  };
  const handleClose3 = () => setShow3(false);
  const handleClose4 = () => {
    setChangeUserName(currentUserName);
    setChangeUserBio(currentUserBio);
    setChangeTags(tags);
    setShow4(false);
  };
  const handleClose5 = () => {
    setShow5(false);
  };
  const handleShow1 = () => setShow1(true);
  const handleShow2 = () => setShow2(true);
  const handleShow3 = () => setShow3(true);
  const handleShow4 = () => setShow4(true);
  const showFollower = () => setShow5(true);

  const handleCharge =(mode) => {
    let chargeresult = coin;
    switch(mode){
      case "charge":
        chargeresult += charge;
        setCoin(chargeresult);
        console.log("charge result:"+chargeresult);
        alert("성공적으로 충전 되었습니다.");
        handleClose1();
        break;
      case "withdraw":
        if(charge < 10000){
          alert("최소 출금금액을 충족하지 못하였습니다.");
          break;
        }
        chargeresult -= charge;
        setCoin(chargeresult);
        console.log("charge result:"+chargeresult);
        alert("성공적으로 출금 되었습니다.");
        handleClose2();
        break;
    }
  }

  const deleteTag = (i) => {
        const tagCopy = changeTags.slice();
        tagCopy.splice(i, 1);
        setChangeTags(tagCopy);
    };
    const addTag = (e) => {
        setTag(e.target.value);
    };
    const handleClick = () => {
        setChangeTags([...changeTags, tag]);
        setTag("");
    };
    const handleKeyPress = (e) => {
        if(e.key === "Enter") handleClick();
    }
  const handleChargeAmount = (e) => {
    let charge = parseInt(e.target.value);
    if(charge > 0){
      setCharge(charge);
      setValid(false);
    }else{
      setValid(true);
    }
  }
  const handleCheck = () => {
    if(checkPwd === currentPwd) {
      setIsEdit(true);
      handleClose3();
    }else{
      alert("비밀번호가 일치하지 않습니다.");
    }
  };
  const handleChange = () => {
    if(changePwd === ""){
      alert("공백은 입력할 수 없습니다.");
    }else{
    setPwd(changePwd);
    setIsEdit(false);
    }
  };
  const handleChangeProp = () => {
    if(changeUserName === ""){
      alert("닉네임은 비워둘 수 없습니다.");
    }else{
      setCurrentUserName(changeUserName);
      setTags(changeTags);
      handleClose4();
    }

  };
  const handleDelete = (key, list) => {
    if(list === "post"){
      setPost(post.filter(post=>post.id !== key));
    }else{
      setGroup(group.filter(group=>group.id !== key));
    }
    const data = {postId: key};
    axios.post('http://154.12.55.105:8081/post/deletePost', data, {headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": sessionStorage.getItem('token'),
    }}).then(response => {
      if(response.data.code === 200){
        console.log(response.data.msg);
      }
    }).catch(error => {
      console.error('Error deleting post:', error);
    });
  };

  const handleSubscribe = (userid, user)=>{
    const updateFollowers = followers.map(follower =>{
      if(follower.id === userid){
        if (follower.id === userid) {
          return { ...follower, subscribed: !follower.subscribed };
        }
        return follower;
    }});

    setFollowers(updateFollowers);

        const data = {
          postUserId: userid
        };

      axios.post('http://154.12.55.105:8081/post/attention', data, {headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": sessionStorage.getItem('token'),
      }}).then(response => {
        if(response.data.code === 200){
          setCurrentFollowers(prev => {
            new Set([...prev, userid]);
          });
        }
      }).catch(error => {
        console.error('Error subscribe:', error);
      });
  };

  return (
    <div>
    <div className={styles.main}>
      <HeaderComponent1 isLogined={isLogined}/>
      <div className={styles.BodyContents}>
        <section className={styles.mypageArea}>
          <div className={styles.cardGrid} >
          <section className={styles.headerWithImage}>
      <img
        className={styles.headerWithImageChild}
        loading="lazy"
        alt=""
        src="/ellipse-1@2x.png"
      />
      <div className={styles.parent}>
        <div className={styles.userProfile}>
          <p className={styles.h0}>{currentUserName}</p>
          <div className={styles.followersParent}>
            <div className={styles.followers}><div onClick={showFollower}>{userData.follower.length}{'followers'}</div></div>
            <Modal show={show5} onHide={handleClose5} size="sm" centered backdrop="static">
              <Modal.Header closeButton>
                <Modal.Title>팔로워 목록</Modal.Title>
              </Modal.Header>
              <ModalBody>
                {
                  followers.map((data, i)=>{
                    return(
                      <div key={i} className={styles.followList}>
                        <div ><img />{data}</div>
                        <div><Button variant="dark" size="sm" onClick={handleSubscribe(data.id, id)}>{currentFollowers.findIndex(user.id) != -1 ? '구독취소' : '구독'}</Button></div>
                      </div>
                    )
                  })
                }
              </ModalBody>
            </Modal>
            <div className={styles.frameWrapper}>
              <div className={styles.tagParent}>
                <p className={styles.tag1}>TAG</p>
                <div className={styles.frameParent}>
                  { tags.map((data, i)=>{
                    return(
                    <div className={styles.tag2} key={i}>{data}</div>
                    )
                    }
                  )
                  }
                </div>
              </div>
              <Button variant="dark" className={styles.b} onClick={handleShow4}>프로필 수정</Button>
              <Modal show={show4} onHide={handleClose4} size="lg" centered backdrop="static">
              <Modal.Header closeButton>
                <Modal.Title>프로필 수정</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form.Label>프로필 이미지</Form.Label>
                <Form.Control type="file" />
                <Form.Label>닉네임</Form.Label>
                <Form.Control type="text" value={changeUserName} onChange={(e)=>setChangeUserName(e.target.value)}/>
                <Form.Label>TAG</Form.Label>
                <Form.Control type="text" onChange={(e)=>addTag(e)} onKeyPress={(e)=> handleKeyPress(e)} value={tag} placeholder='입력 후 엔터를 눌러 태그를 추가하세요.' />
                <div className={styles.wrappers}>
                {
                    changeTags.map((data, i)=>{
                        return(  
                            <div className={styles.tagWrapper} key={i}>
                                <div className={styles.tag}>{data}</div>
                                <IoIosClose onClick={()=>deleteTag(i)} className={styles.tagBtn}/>
                            </div>
                        )
                    })
                }</div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="dark" onClick={handleChangeProp}>수정</Button>
              </Modal.Footer>
          </Modal>
            </div>
          </div>
        </div>
      </div>
    </section>
          <div className={styles.wrapper}>
            <h1 className={styles.h1}>포인트</h1>
            <hr className={styles.hr}/>
            <div className={styles.cardGrid1}>
              <p>{coin} 코인</p>
              <div className={styles.btnWrapper}>
              <Button variant="dark" onClick={handleShow1}>충천</Button>
              <Button variant="dark" onClick={handleShow2}>출금</Button>
              </div>
            </div>
          </div>
          <Modal show={show1} onHide={handleClose1} size="lg" centered backdrop="static">
              <Modal.Header closeButton>
                <Modal.Title>충전</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form.Label>충전금액</Form.Label>
                <Form.Check type="radio" name="charge" onClick={()=>setCharge(1000)} label="1000 코인"/>
                <Form.Check type="radio" name="charge" onClick={()=>setCharge(5000)} label="5000 코인"/>
                <Form.Check type="radio" name="charge" onClick={()=>setCharge(10000)} label="10000 코인"/>
                <Form.Check type="radio" name="charge" onClick={()=>setCharge(100000)} label="100000 코인"/>
                <Form.Check type="radio" name="charge" onClick={()=>setCharge(500000)} label="500000 코인"/>
                <Form.Label>직접입력</Form.Label>
                <Form.Control type="number" name="charge" onChange={handleChargeAmount}/>
                <Form.Text>예상 결제 금액 : {charge} 원</Form.Text>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="dark" onClick={()=>handleCharge("charge")} disabled={valid}>충전</Button>
              </Modal.Footer>
          </Modal>
          <Modal show={show2} onHide={handleClose2} size="lg" centered backdrop="static">
              <Modal.Header closeButton>
                <Modal.Title>출금</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form.Label>출금금액</Form.Label>
                <Form.Text>현재 금액: {coin}</Form.Text>
                <Form.Control type="number" id="chargeAmount" onChange={handleChargeAmount}/>
                <Form.Text>최소 출금금액 : 10000</Form.Text>
                <Form.Text>잔여 코인 : {coin - charge}</Form.Text>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="dark" onClick={()=>handleCharge("withdraw")} disabled={valid}>출금</Button>
              </Modal.Footer>
          </Modal>
          <div className={styles.wrapper}>
            <h1 className={styles.h1}>회원정보</h1>
            <hr className={styles.hr}/>
            <div className={styles.cardGrid2}>
            {isEdit
              ?<Form>
              <p>아이디: {userData.userid}</p>
              <p>비밀번호:<Form.Control value={changePwd} onChange={(e)=>setChangePwd(e.target.value)}/></p>
              <p>이메일: {currentEmail}</p>
              </Form>
              :<div>
              <p>아이디: {userData.userid}</p>
              <p>비밀번호: {currentPwd}</p>
              <p>이메일: {currentEmail}</p>
              </div>
            }
            </div>
            <div className={styles.buttonWrapper}>
            {isEdit
              ?<Button variant="dark" className={styles.button} onClick={handleChange}>수정</Button>
              :<Button variant="dark" className={styles.button} onClick={handleShow3}>회원정보수정</Button>
            }
            </div>
            <Modal show={show3} onHide={handleClose3} size="lg" centered backdrop="static">
              <Modal.Header closeButton>
                <Modal.Title>회원정보 수정</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form.Label>비밀번호 입력</Form.Label>
                <Form.Control type="password" id="password" onChange={(e)=>setCheckPwd(e.target.value)} />
              </Modal.Body>
              <Modal.Footer>
                <Button variant="dark" onClick={handleCheck}>확인</Button>
              </Modal.Footer>
            </Modal>
          </div>
          <div className={styles.wrapper}>
            <h1 className={styles.h1}>작성 게시글</h1>
            <hr className={styles.hr}/>
            <div className={styles.cardGrid2}>
              { post.map((data)=>{ //user post list should be here
                const location = "/new-post/edit/"+data.id;
                return(
                <div className={styles.link} key={data.id}>
                  <Link to="__link__" >게시글1</Link>
                  <div className={styles.btnWrapper}>
                   <Link to={location}><Button variant="secondary">수정</Button></Link>
                   <Button variant="secondary" onClick={()=>handleDelete(data.id, "post")}>삭제</Button>
                  </div>
                </div>
                )
                })
              }
            </div>
            <div className={styles.buttonWrapper}>
            <Button variant="dark" className={styles.button} onClick={()=>navigate("/new-post")}>게시글 작성</Button>
            </div>
            </div>
            <div className={styles.wrapper}>
            <h1 className={styles.h1}>내 모집글</h1>
            <hr className={styles.hr}/>
            <div className={styles.cardGrid2}>
              { group.map((data)=>{ //user group post list should be here
              const location = "/new-post/edit/"+data.id;
              return(
              <div className={styles.link} key={data.id}>
                <Link to="__link__">게시글1</Link>
                <div className={styles.btnWrapper}>
                 <Link to={location}><Button variant="secondary">수정</Button></Link>
                 <Button variant="secondary" onClick={()=>handleDelete(data.id, "group")}>삭제</Button>
                </div>
              </div>
              )
                })
              }
            </div>
            <div className={styles.buttonWrapper}>
             <Button variant="dark" className={styles.button} onClick={()=>navigate("/new-post")}>게시글 작성</Button>
            </div>
          </div>
          </div>
        </section>
      </div>
    </div>
    <PageFooter />
    </div>
  );
};

export default MyPage;