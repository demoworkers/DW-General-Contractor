import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline'

import { useRouter } from 'next/router'
import fetcher from '../../lib/fetcher'

const LogoutButton = () => {
  const router = useRouter()

  const handleLogout = async () => {
    await fetcher('auth/logout')
    router.push('/login')
  }

  return (
    <button
      type="button"
      className="inline-flex items-center px-3 py-2 text-sm font-medium leading-4 text-gray-400 border border-transparent rounded-md shadow-sm hover:bg-red-500 hover:text-slate-100 focus:outline-none"
      onClick={handleLogout}
    >
      <ArrowLeftOnRectangleIcon
        className="flex-shrink-0 w-6 h-6 mr-3"
        aria-hidden="true"
      />
      Log out
    </button>
  )
}

export default LogoutButton
