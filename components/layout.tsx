import Footer from "./footer";
import HeaderComponent from "./header";
import styles from '../styles/Home.module.css'

export default function Layout({ children }) {
    return (
      <>
        <HeaderComponent />
        <div className={styles.container}>
            <main>{children}</main>
            <Footer />
        </div>
      </>
    )
  }