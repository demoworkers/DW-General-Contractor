import Head from 'next/head'

const Home = () => {
  return (
    <>
      <Head>
        <title>The General Contractor</title>
        <meta name="description" content="The General Contractor" />
      </Head>
      <main>{/* <Dashboard isAdmin={isAdmin} /> */}</main>
    </>
  )
}

export function getServerSideProps() {
  return {
    redirect: {
      destination: '/dashboard',
      permanent: false,
    },
  }
}

export default Home
