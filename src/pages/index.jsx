import Head from 'next/head'

// import getServerSideProps from '../../lib/serverProps'

import Dashboard from '../components/DashboardLayout'

const Home = ({ isAdmin }) => {
  return (
    <>
      <Head>
        <title>Widget Configurator</title>
        <meta name="description" content="Widget Configurator" />
      </Head>
      <main>
        <Dashboard isAdmin={isAdmin} />
      </main>
    </>
  )
}

// export { getServerSideProps }

export default Home
