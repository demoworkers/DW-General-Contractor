import { useSWRConfig } from 'swr'

import toast from 'react-hot-toast'

import { useTeam } from '../../lib/hooks'
import { titleCase } from '../../utils/formattedString'

import fetcher from '../../lib/fetcher'
import serverProps from '../../lib/serverProps'

import MainLayout from '../components/MainLayout'
import LoadingTable from '../components/LoadingTable'
import ActionButton from '../components/ActionButton'
import Dropdown from '../components/Dropdown'

const Team = ({ userRole }, props) => {
  const { data: users, mutate: mutateAll, isLoading, isError } = useTeam()

  const handleAction = async (type, userId) => {
    const response = await fetcher('team/manage', { type, userId })

    // error
    if (!response.success) {
      toast.error(response.message)
      return
    }
    // success
    toast.success(response.message)
    // refetch
    mutateAll()
  }

  const updateUserRole = async (userId, role) => {
    const response = await fetcher('team/updateRole', {
      userId,
      role,
    })

    // error
    if (!response.success) {
      toast.error(response.message)
      return
    }
    // success
    toast.success(response.message)
    // refetch
    mutateAll()
  }

  const renderUsersOrEmpty = (renderUsers) => {
    if (renderUsers.length !== 0) {
      return renderUsers.map((user) => (
        <tr key={user.email}>
          <td className="py-4 pl-4 pr-3 text-sm whitespace-nowrap sm:pl-6">
            <div className="flex items-center">
              <div>
                <div className="font-medium text-gray-900">{user.name}</div>
                <div className="text-gray-500">{user.email}</div>
              </div>
            </div>
          </td>

          <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
            {user.approved ? (
              <span className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 capitalize bg-green-100 rounded-sm">
                Active
              </span>
            ) : (
              <span className="inline-flex px-2 text-xs font-semibold leading-5 text-orange-800 bg-orange-100 rounded-sm">
                Inactive
              </span>
            )}
          </td>
          <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
            {userRole.isAdmin || userRole.isManager ? (
              <Dropdown
                selected={user.role}
                list={['Admin', 'Manager', 'Designer', 'Trades', 'User']}
                onChange={(listItem) => updateUserRole(user.id, listItem)}
              />
            ) : (
              titleCase(user.role)
            )}
          </td>
          <td className="relative py-4 pl-3 pr-4 text-sm font-medium text-right whitespace-nowrap sm:pr-6">
            {(userRole.isAdmin || userRole.isManager) && (
              <>
                {user.approved ? (
                  <ActionButton
                    type="deactivate"
                    onClick={() => handleAction('deactivate', user.id)}
                  />
                ) : (
                  <ActionButton
                    type="activate"
                    onClick={() => handleAction('activate', user.id)}
                  />
                )}
                <ActionButton
                  type="delete"
                  onClick={() => handleAction('delete', user.id)}
                />
              </>
            )}
          </td>
        </tr>
      ))
    }

    return (
      <tr>
        <td className="p-8 text-center" colSpan="4">
          <div className="justify-center sm:flex">
            <h6 className="text-sm font-medium leading-6 text-gray-900">
              No members exist
            </h6>
          </div>
        </td>
      </tr>
    )
  }

  return (
    <MainLayout userRole={userRole}>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">
              Team members
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all the team members including their name, email,
              status, and role
            </p>
          </div>
        </div>
        <div className="flex flex-col mt-8">
          <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="shadow ring-1 ring-black ring-opacity-5 md:rounded-sm">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Name
                      </th>

                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Role
                      </th>
                      <th
                        scope="col"
                        className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                      >
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {isLoading ? (
                      <tr>
                        <td className="px-8 py-2" colSpan="4">
                          <LoadingTable />
                        </td>
                      </tr>
                    ) : (
                      renderUsersOrEmpty(users)
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
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

  const props = {
    ...globalProps.props,
  }

  return { props }
}

export default Team
