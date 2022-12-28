import { GetServerSideProps } from 'next';
import styles from '../styles/Home.module.css'
import Layout from './components/layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'

export default function NotFound () {
  const { t } = useTranslation()

  return (
    <Layout>
      <main className={styles.main}>
        <h1 className={styles.title}>
          OOPS
        </h1>
        <div>
         <h3>PAGE NOT FOUND</h3> 
        </div>
      </main>
      </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
    },
  }
}