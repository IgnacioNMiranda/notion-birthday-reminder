import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Birthday Reminder</title>
        <meta name="description" content="Birthday Reminder App" />
      </Head>

      <main className={styles.main}>
        <h1 className="title">Birthday Reminder App 🎉</h1>
      </main>
    </div>
  )
}

export default Home
