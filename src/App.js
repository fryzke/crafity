import React, { useEffect } from "react";
import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
  Navigate
} from "react-router-dom";
import Main from "./pages/Main";
import LogIn from "./pages/LogIn";
import LogOut from "./pages/LogOut";
import SignUp from "./pages/SignUp";
import MyPage from "./pages/MyPage";
import PostBoard from "./pages/PostBoard";
import GroupBoard from "./pages/GroupBoard";
import MyPick from "./pages/MyPick";
import Post from "./pages/Post";
import NewPost from "./pages/NewPost";
import DM from "./pages/DM";
import Search from "./pages/Search";

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;
  
 useEffect(() => {
  if (action !== "POP") {
    window.scrollTo(0, 0);
  }
}, [action, pathname]);

  useEffect(() => {
    let title = "crafity";
    let metaDescription = "";

    switch (pathname) {
      case "/homw":
        title = "Home";
        metaDescription = "";
        break;
      case "/log-in":
        title = "Login";
        metaDescription = "";
        break;
      case "/log-out":
        title="Logout"
        metaDescription = ""
        break;
      case "/sign-up":
        title = "Signup";
        metaDescription = "";
        break;
      case "/my-page":
        title = "Mypage";
        metaDescription = "";
        break;
      case "/dash-board":
        title = "Dashboard";
        metaDescription = "";
        break;
      case "/group-board":
        title = "Groupboard";
        metaDescription = "";
        break;
      case "/my-pick":
        title = "MyPick"
        metaDescription = "can see posts you interested in"
      case "/new-post":
        title = "newPost";
        metaDescription = "";
        break;
      case "/post":
        title = "Post";
        metaDescription = "";
        break;
      case "/search":
        title = "search";
        metaDescription = "search result";
        break;
      case "/dm":
        title = "DM";
        metaDescription = "";
        break;
    }

    
    document.title = title;

    if (metaDescription) {
      const metaDescriptionTag = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  return (
        <Routes key={pathname} location={location}>
          <Route exact path="/" element={<Navigate to="/log-in"/>}/>
          <Route path="/home" element={<Main />} />
          <Route path="/log-in" element={<LogIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/my-page" element={<MyPage />} />
          <Route path="/log-out" element={<LogOut />} />
          <Route path="/dash-board/:category" element={<PostBoard />} />
          <Route path="/group-board" element={<GroupBoard />}/>
          <Route path="/my-pick" element={<MyPick />} />
          <Route path="/search/:keyword" element={<Search />} />
          <Route path="/new-post" element={<NewPost />} />
          <Route path="/new-post/:isEdit/:id" element={<NewPost />} />
          <Route path="/post/:postId" element={<Post />} />
          <Route path="/dm" element={<DM />} />
        </Routes>
  );
}
export default App;
