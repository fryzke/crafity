import styles from "./SignUp.module.css";
import { Button, Form, Alert } from "react-bootstrap";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: ""
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSignUp = (e) => {
    e.preventDefault();

    const errors = {};
    if (!formData.username) {
      errors.username = '아이디를 입력하세요';
    }
    if (!formData.password) {
      errors.password = '비밀번호를 입력하세요';
    }
    if (formData.password !== confirmPassword) {
      errors.confirmPassword = '비밀번호가 일치하지 않습니다';
    }
    if (!formData.email) {
      errors.email = '이메일을 입력하세요';
    }
    if (formData.username.length < 5){
      errors.username = "아이디는 영문 숫자 조합 5글자 이상이어야 합니다";
    }
    if (formData.password.length < 8){
      errors.username = "비밀번호는 영문, 숫자 및 특수문자 조합 8자 이상이어야 합니다";
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
    } else {
      console.log('Form submitted:', formData);
      axios.post('http://154.12.55.105:8081/user/identity/normalUserRegister',formData,
        {
          headers: {"Content-Type": "application/x-www-form-urlencoded"}
        }
      ).then(response => {
        if(response.data.code === 200){
          alert("회원가입 성공");
          navigate("/log-in");
        }
      })
      .catch(error => {
        console.error('Error sign up:', error);
        setLoginCheck(true);
      });
    }
  };

  return (
    <div className={styles.signUp}>
      <main className={styles.signUpform}>
        <h1 className={styles.crafity}><Link to="/">CRAFITY</Link></h1>
        <div className={styles.fieldLabelWrapper}>
            <Form className={styles.fieldContainer} name="signUp" onSubmit={handleSignUp}>
              <Form.Group controlId="username" className={styles.groupWrapper}>
                <Form.Label className={styles.labels}>아이디</Form.Label>
                <Form.Control 
                  className={styles.field} 
                  type="text" 
                  name="username" 
                  placeholder="영문 숫자 조합 5글자 이상"
                  value={formData.username}
                  onChange={handleChange}
                  isInvalid={!!errors.username}
                />
                <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="password" className={styles.groupWrapper}>
                <Form.Label className={styles.labels}>비밀번호</Form.Label>
                <Form.Control 
                  className={styles.field} 
                  type="password" 
                  name="password" 
                  placeholder="영문, 숫자 및 특수문자 조합 8자 이상" 
                  value={formData.password}
                  onChange={handleChange}
                  isInvalid={!!errors.password}
                />
                <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="confirmPassword" className={styles.groupWrapper}>
                <Form.Label className={styles.labels}>비밀번호 재확인</Form.Label>
                <Form.Control 
                  className={styles.field} 
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={(e)=>setConfirmPassword(e.target.value)}
                  isInvalid={!!errors.confirmPassword} 
                />
                <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="email" className={styles.groupWrapper}>
                <Form.Label className={styles.labels}>이메일</Form.Label>
                <Form.Control 
                  className={styles.field} 
                  type="email"
                  name="email"
                  placeholder="example@domain.com"
                  value={formData.email}
                  onChange={handleChange}
                  isInvalid={!!errors.email}
                /> 
                <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
              </Form.Group>

              <Button variant="dark" className={styles.button} type="submit">
                회원가입
              </Button>
            </Form>
        </div>
      </main>
    </div>
  );
};

export default SignUp;
