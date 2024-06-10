import React, {useRef, useState } from "react";
import styles from "./SideBar.module.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { RiCloseFill } from "react-icons/ri";
import {FaHandHoldingHeart } from "react-icons/fa"
import { FaRegEnvelope } from "react-icons/fa6";
import { FiHome } from "react-icons/fi";
import { MdOutlineSpaceDashboard, MdLogout } from "react-icons/md";
import { SiGotomeeting } from "react-icons/si";
import { VscAccount } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';

const SideBar = ({ width=250, isLogined}) => {
  const [isOpen, setOpen] = useState(false);
  const [xPosition, setX] = useState(width);
  const side = useRef();
  
  const toggleMenu = () => {
    if (xPosition > 0) {
      setX(0);
      setOpen(true);
    } else {
      setX(width);
      setOpen(false);
    }
  };
  
    return (
      <div className={styles.container}>
        <div ref={side}  className={styles.sidebar} style={{ width: `${width}px`, height: '100%',  transform: `translatex(${-xPosition}px)`}}>
        <button onClick={() => toggleMenu()} className={styles.button} >
            {isOpen 
            ? null
            : <GiHamburgerMenu size="30"/>
            }
        </button>
          <div className={styles.content}>
          <Sidebar>
          <Menu>
            <MenuItem rootStyles={styles.menu}><div className={styles.btn}>MENU<RiCloseFill size="30" onClick={() => toggleMenu()}/></div></MenuItem>
            <MenuItem rootStyles={styles.menuLabel}>Category</MenuItem>
            <MenuItem icon={<FiHome />} component={<Link to='/home/' />} alt="메인 홈"> Home </MenuItem>
            <SubMenu icon={<MdOutlineSpaceDashboard />} label="Board">
              <MenuItem rootStyles={styles.submenu} component={<Link to='/dash-board/knitt' />} alt="뜨개 게시판"> Knitt </MenuItem>
              <MenuItem rootStyles={styles.submenu} component={<Link to='/dash-board/resin' />} alt="레진 게시판"> resin </MenuItem>
              <MenuItem rootStyles={styles.submenu} component={<Link to='/dash-board/beads' />} alt="비즈 게시판"> beads </MenuItem>
              <MenuItem rootStyles={styles.submenu} component={<Link to='/dash-board/paper' />} alt="페이퍼 아트 게시판"> paper </MenuItem>
              <MenuItem rootStyles={styles.submenu} component={<Link to='/dash-boardt/other' />} alt="기타 게시판"> other </MenuItem>
            </SubMenu>
            <MenuItem icon={<SiGotomeeting />} component={<Link to='/group-board' />} alt="모임 구하기"> Group </MenuItem>
            {isLogined
              ? <div><MenuItem rootStyles={styles.menuLabel}>Account</MenuItem>
              <MenuItem icon={<VscAccount />} component={<Link to='/my-page' />} alt="마이페이지"> My profile </MenuItem>
              <MenuItem icon={<FaHandHoldingHeart />} component={<Link to='/my-pick' />} alt="마이픽"> My-pick </MenuItem>
              <MenuItem icon={<FaRegEnvelope />} component={<Link to='/dm' />} alt="다이렉트 메시지"> Direct Massage </MenuItem></div>
              : null
            }
          </Menu>
        </Sidebar>
          </div>
        </div>
      </div>
    );
  };
  

export default SideBar;