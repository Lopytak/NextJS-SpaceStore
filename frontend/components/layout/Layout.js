import Header from "./Header";
import Footer from "./Footer";
import styles from "../../styles/Layout.module.css";

const Layout = ({ Body }) => {
    return (
        <div className={ styles.flexColumn }>
            <Header/>
            { Body }
            <Footer/>
        </div>
    );
};

export default Layout;
