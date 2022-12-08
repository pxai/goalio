import { GetServerSideProps } from 'next';
import styles from '../styles/Home.module.css'
import Layout from './components/layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useSession } from 'next-auth/react';
import { useTranslation } from 'next-i18next';

export default function Profile() {
  const { t } = useTranslation()
  const { data: session, status } = useSession();

  return (
    <Layout>
      <main className={styles.main}>
        <h1 className={styles.title}>
          {t`profile`}
        </h1>
        <div>
         <h3>{session?.user.name}</h3> 
         <img src={session?.user.image} alt="" />
        </div>
      </main>
      </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: { 
      ...(await serverSideTranslations(locale!, ['common']))
    }
  };
};