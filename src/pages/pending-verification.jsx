import Link from 'next/link'

import LogoutButton from '../components/LogoutButton'

const PendingVerfication = () => {
  return (
    <div className="flex flex-col min-h-full pt-16 pb-12 bg-white">
      <main className="flex flex-col justify-center flex-grow w-full px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex justify-center flex-shrink-0">
          <img
            className="w-auto h-12"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt=""
          />
        </div>
        <div className="py-16">
          <div className="text-center">
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Pending approval
            </h1>
            <p className="mt-2 text-base text-gray-500">
              Your account is pending approval. Please contact admin and then,{' '}
              <Link href="/login" className="font-bold text-indigo-600">
                login
              </Link>
            </p>
          </div>
        </div>
        <div className="flex flex-shrink-0 p-4">
          <LogoutButton />
        </div>
      </main>
    </div>
  )
}

export default PendingVerfication
