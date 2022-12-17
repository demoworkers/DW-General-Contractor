import { prisma } from '../../lib/prisma'
import MainLayout from '../components/MainLayout'

import serverProps from '../../lib/serverProps'

const Dashboard = ({ userRole, stats }) => {
  return (
    <MainLayout userRole={userRole}>
      <div>
        <h3 className="text-lg font-medium leading-6 text-gray-900">Stats</h3>
        <dl className="grid grid-cols-1 gap-5 mt-5 sm:grid-cols-3">
          {stats.map((item) => (
            <div
              key={item.name}
              className="px-4 py-5 overflow-hidden bg-white rounded-lg shadow sm:p-6"
            >
              <dt className="text-sm font-medium text-gray-500 truncate">
                {item.name}
              </dt>
              <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                {item.stat}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </MainLayout>
  )
}

export async function getServerSideProps(ctx) {
  const globalProps = await serverProps(ctx)

  const { isAdmin, isManager } = globalProps.props.userRole

  if (!isAdmin && !isManager) {
    return {
      redirect: {
        destination: '/projects',
        permanent: false,
      },
    }
  }

  const stats = []

  try {
    const projects = await prisma.projects.findMany({})

    if (projects) {
      stats.push({
        name: 'Total Projects',
        stat: projects.length,
      })

      stats.push({
        name: 'Open Projects',
        stat: projects.filter((project) => project.status === 'OPEN').length,
      })
    }
  } catch (e) {
    console.log(e)
  }

  const props = {
    ...globalProps.props,
  }

  return { props }
}

export default Dashboard
