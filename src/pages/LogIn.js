import styles from "./LogIn.module.css";
import { Button, Form} from "react-bootstrap";
import {useEffect, useState} from "react"
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const LogIn = () => {
  const [id, setId] = useState("");
  const [pwd, setPwd] =useState("");
  const [code, setCode] = useState("");
  const [capcha, setCapcha] = useState("");
  const [key, setKey] = useState("");
  const [loginCheck, setLoginCheck] = useState(false);
  const navigate = useNavigate();

  const handleId = (e) => {
    setId(e.target.value);
  };
  const handlePwd = (e) => {
    setPwd(e.target.value);
  };
  const handleCode = (e) => {
    setCode(e.target.value);
  };

  useEffect(()=> {
    axios.get('http://154.12.55.105:8081/user/identity/captcha').then(response =>{
      console.log(response.data);
      setCapcha(response.data.img);
      setKey(response.data.key);

    }).catch(error => {
      console.error('Error fetching capcha:', error);
    });

  },[]);

  const handleLogin = (event) => {
    event.preventDefault();
    const data = {
      username: id,
      password: pwd,
      code: code,
      key: key,
    };
    console.log(data);

    axios.post('http://154.12.55.105:8081/user/identity/login',data,
    {
      headers: {"Content-Type": "application/x-www-form-urlencoded"}
    }).then(response => {
      const result = response.data.data;
      console.log(response.data);
      sessionStorage.setItem("user", result.user);
      sessionStorage.setItem("id",result.user.username);
      sessionStorage.setItem("pwd",result.user.password);
      sessionStorage.setItem("token", result.token);
      console.log("login success. id:"+result.user.username +" pwd:"+result.user.password);
      navigate("/home");
    })
    .catch(error => {
      console.error('Error login:', error);
      setLoginCheck(true);
      navigate(0);
    });
  };

  return (
    <div className={styles.logIn}>
      <main className={styles.loginform}>
        <h1 className={styles.crafity}><Link to="/">CRAFITY</Link></h1>
        <div className={styles.fieldLabelWrapper}>
          <div className={styles.fieldLabel}>
            <Form className={styles.fieldContainer} name="login" onSubmit={handleLogin}>
              <Form.Control className={styles.field} 
                type="text" 
                name="id" 
                placeholder="ID" 
                onChange={handleId} />
              <Form.Control className={styles.field} 
                type="password" 
                name="pwd" 
                placeholder="password"
                onChange={handlePwd} />
                {
                  loginCheck && (
                    <label style={{color: "red"}}>아이디 혹은 비밀번호가 올바르지 않습니다.</label>
                  )
                }
              <Button variant="dark" className={styles.button} type="submit">
                LOG IN
              </Button>
              <Form.Group><img src={capcha}/><Form.Control name="code" onChange={(handleCode)} /></Form.Group>
            </Form>
            <div className={styles.goToSingUp}>
              <div className={styles.div}>
                <Button variant="light" className={styles.link} onClick={()=>navigate("/sign-up")} >회원가입</Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LogIn;
