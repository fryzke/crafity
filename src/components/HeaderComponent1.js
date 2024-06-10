import styles from "./HeaderComponent1.module.css";
import { Button } from "react-bootstrap";
import { MdLogout } from "react-icons/md";
import SideBar from "./SideBar";
import { Link, useNavigate } from "react-router-dom";

const HeaderComponent1 = ({isLogined}) => {
    const navigate = useNavigate();

     return (
        <section className={styles.mainInner}>
          <header className={styles.frameParent}>
          <div className={styles.listWrapper}>
          <SideBar isLogined={isLogined}/>
          </div>
          <Link to="/home" className={styles.crafity}>CRAFITY</Link>
          {isLogined
              ? <div className={styles.div}>
                  <MdLogout onClick={()=>navigate("/log-out")}/>
                </div> 
              
              : <Button className={styles.button} variant="dark" href="/log-in">LOGIN</Button> 
          
            
          }
          </header>
      </section>
    );
};

export default HeaderComponent1