import styles from "./Support.module.css";
import { Button, Form, Modal } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Support = ({coin, isLogined}) => {
  const [show, setShow] =useState(false);
  const [donate, setDonate] =useState(0);
  const navigate = useNavigate();

  const handleShow = () => {
    if(isLogined){setShow(true);}
    else{alert("로그인 후 이용가능 합니다.");
      navigate("/log-in");
    }
  }
  const handleClose = () => {
    setShow(false);
  }
  const handleDonate = () => {
    handleClose();
  };
  return (
    <div className={styles.support}>
      <div className={styles.vectorParent}>
        <div className={styles.hopeImage}>
          <img
            className={styles.hopeIcon}
            loading="lazy"
            alt=""
            src="/hope.svg"
          />
        </div>
        <div className={styles.parent}>
          <h1 className={styles.h1}>
            이 게시글이 마음에 들었다면 후원을 통해 작가를 응원해주세요!
          </h1>
          <div className={styles.donateButton}>
            <div className={styles.donateArea}>
              <Button variant="light" onClick={handleShow}><b className={styles.btn}>후원하기</b></Button>
            </div>
            <Modal show={show} onHide={handleClose} size="lg" centered backdrop="static">
              <Modal.Header closeButton>
              <Modal.Title>후원하기</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>소지 코인: {coin} 코인</p>
                <Form>
                <Form.Control type="number" onChange={(e)=>setDonate(e.target.value)}/>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="dark" onClick={handleDonate}>후원</Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
