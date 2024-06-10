import styles from "./PageFooter.module.css";

const PageFooter = () => {
    return (
        <footer className={styles.frameParent}>
          <div className={styles.siteNameParent}>
            <div className={styles.siteName}>Crafity</div>
          </div>
        </footer>
    );
};

export default PageFooter