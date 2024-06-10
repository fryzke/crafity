import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const LogOut = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const id = sessionStorage.getItem('id');
    const pwd = sessionStorage.getItem('pwd');
    const auth = sessionStorage.getItem('token');

    axios.get('http://154.12.55.105:8081/user/identity/logout',
      {
        headers: {"Content-Type": "application/x-www-form-urlencoded",
                  "Authorization": auth,
        }
      }).then(response => {
        if(response.data.code === 200){
          sessionStorage.removeItem('id');
          sessionStorage.removeItem('pwd');
          sessionStorage.removeItem('user');
          sessionStorage.removeItem('token');
          console.log("logout success. id:"+id+" pwd:"+pwd);
          alert("성공적으로 로그아웃 되었습니다.");
          navigate("/");
        }
      })
      .catch(error => {
        console.error('Error logout:', error);
        setLoginCheck(true);
        navigate(0);
      });
  });
  return (
    <div>
    </div>
  );
};

export default LogOut;