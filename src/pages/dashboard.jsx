import { prisma } from '../../lib/prisma'
import MainLayout from '../components/MainLayout'

const Dashboard = ({ stats }) => {
  return (
    <MainLayout>
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

export async function getServerSideProps() {
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

  return {
    props: {
      stats,
    },
  }
}

export default Dashboard
