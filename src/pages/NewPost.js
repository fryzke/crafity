import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Button, Form } from "react-bootstrap";
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import HeaderCompoent1 from "../components/HeaderComponent1";
import styles from "./NewPost.module.css";
import { IoIosClose } from "react-icons/io";

const NewPost = () => {
    const [isLogined, setIsLogined] = useState(false);
    const [postCategory, setPostCategory] = useState("knitt");
    const [postTilte, setPostTitle] = useState("");
    const navigate = useNavigate();
    const editorRef = useRef();
    const {isEdit, id} = useParams();
    const [tags, setTags] = useState([]);
    const [tag, setTag] = useState("");
    
    useEffect(()=> {
        if( sessionStorage.getItem('id') === null){
        setIsLogined(false);
        //alert("로그인 후 이용해주세요.");
        //navigate("/log-in");
        }else {
        setIsLogined(true);
        }
    }, []);


    if(isEdit ==="edit"){
    useEffect(() => {
    //get Post content from DB(using id to edit it)
        setPostCategory ('category'); //post category should be here
        setPostTitle ('title'); //post title should be here
        const htmlString = 'content'; //HTML content should be here

    //put it into the Editor
        editorRef.current?.getInstance().setHTML(htmlString);
    }, []);
    }
    const handleCategory = (e)=> {
        setPostCategory(e.target.value);
    };
    const handleTitle = (e)=> {
        setPostTitle(e.target.value);
    };
    //handle tags
    const deleteTag = (i) => {
        const tagCopy = tags.slice();
        tagCopy.splice(i, 1);
        setTags(tagCopy);
    };
    const addTag = (e) => {
        setTag(e.target.value);
    };
    const handleClick = () => {
        setTags([...tags, tag]);
        setTag("");
    };
    const handleKeyPress = (e) => {
        if(e.key === "Enter") handleClick();
    }
    //handle post upload
    const handleImage = async (blob, callback) => {
        let formData = new FormData();
        formData.append("file", blob);
    }
    const handleUpload= () => {
        let Content = editorRef.current?.getInstance().getMarkdown();
        const data = {title: postTilte, content: Content, cover: null, videoUrl: null, tags: tags, category: postCategory, attachmentUrls: null};
    }
    return(
        <div className={styles.main}>
            <header>
            <HeaderCompoent1 isLogined={isLogined}/>
            </header>
            <div className={styles.BodyContents}>
            <section className={styles.editorArea}>
            <Form>
                <Form.Label>카테고리</Form.Label>
                <Form.Select onChange={handleCategory}>
                    <option value="knitt">뜨개</option>
                    <option value="resin">레진</option>
                    <option value="beads">비즈</option>
                    <option value="paper">페이퍼 아트</option>
                    <option value="other">기타</option>
                    <option value="모임모집">모임 모집</option>
                </Form.Select>
                <Form.Label>제목</Form.Label>
                <Form.Control onChange={handleTitle} />
                <Editor 
                    height="400px"
                    initialEditType='wysiwyg'
                    hideModeSwitch
                    ref={editorRef}
                    toolbarItems={[
                        ["heading", "bold", "italic", "strike"],
                        ["hr", "quote"],
                        ["ul", "ol", "task", "indent", "outdent"],
                        ["table", "image", "link"],
                        ["code", "codeblock"],
                      ]}
                    usageStatistics={false}
                   
                />
                <Form.Label>태그</Form.Label>
                <Form.Control type="text" onChange={(e)=>addTag(e)} onKeyPress={(e)=> handleKeyPress(e)} value={tag} placeholder='입력 후 엔터를 눌러 태그를 추가하세요.' />
                <div className={styles.wrapper}>
                {
                    tags.map((data, i)=>{
                        return(  
                            <div className={styles.tagWrapper} key={i}>
                                <div className={styles.tag}>{data}</div>
                                <IoIosClose onClick={()=>deleteTag(i)} className={styles.tagBtn}/>
                            </div>
                        )
                    })
                }
                </div>
            </Form>
            <Button variant='dark' size="20" onClick={handleUpload}>업로드</Button>
            </section>
            </div>
        </div>
    );
};

export default NewPost;