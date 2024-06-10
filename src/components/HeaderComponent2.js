import { useState } from "react";
import styles from "./HeaderComponent2.module.css";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const HeaderComponent2 = () => {
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState("");

    const handleControl= (e) => {
      setKeyword(e.target.value);
    };
    const handleSubmit = () => {
      navigate("/search/"+keyword);
      console.log(keyword);
    };
    const submit = (e)=> {
      if(e.key === "Enter") {
        handleSubmit();
      }
    };

    return (
        <section className={styles.mainChild}>
        <div className={styles.fieldParent}>
          <Form className={styles.field} id="search">
            <Form.Control
              type="text"
              placeholder="keyword"
              onChange={handleControl}
              onKeyDown={(e) => submit(e)}
            />
          </Form>
          <div className={styles.buttonNew}>
            <Button className={styles.buttonNew1} variant="dark" size="lg" type="submit" form="search" onClick={handleSubmit}>SEARCH</Button>
          </div>
        </div>
      </section>
    );
};

export default HeaderComponent2