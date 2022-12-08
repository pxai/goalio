import Nav from "./nav";
import Footer from "./footer";
import Header from "./header";
import styles from '../../styles/Home.module.css'

export default function Layout({ children }) {
    return (
      <>
        <Header />
        <div className={styles.container}>
            <Nav />
            <main>{children}</main>
            <Footer />
        </div>
      </>
    )
  }