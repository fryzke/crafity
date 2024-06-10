import styles from "./HeaderWithImage.module.css";

const HeaderWithImage = () => {
  return (
    <section className={styles.headerWithImage}>
      <div className={styles.headerWithImageInner}/>
      <div className={styles.rectangleParent}>
        <div className={styles.frameChild} />
        <div className={styles.div1}>1/1</div>
      </div>
    </section>
  );
};

export default HeaderWithImage;
