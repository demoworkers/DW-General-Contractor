import { HomeIcon } from '@heroicons/react/20/solid'

const stages = [
  { name: 'Bidding', href: '#', current: false },
  { name: 'Material Selection', href: '#', current: true },
  { name: 'Reconstruction', href: '#', current: false },
  { name: 'Construction', href: '#', current: false },
  { name: 'Punch List', href: '#', current: false },
]

const Breadcrumbs = () => {
  return (
    <nav
      className="flex bg-white border-b border-gray-200"
      aria-label="Breadcrumb"
    >
      <ol className="flex w-full max-w-screen-xl px-4 mx-auto space-x-4 sm:px-6 lg:px-8">
        {/* <li className="flex">
          <div className="flex items-center">
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <HomeIcon className="flex-shrink-0 w-5 h-5" aria-hidden="true" />
              <span className="sr-only">Home</span>
            </a>
          </div>
        </li> */}
        {stages.map((stage, index) => {
          const isLast = index === stages.length - 1
          return (
            <li key={stage.name} className="flex">
              <div className="flex items-center">
                <a
                  href={stage.href}
                  className="mr-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                  aria-current={stage.current ? 'page' : undefined}
                >
                  {stage.name}
                </a>
                {!isLast && (
                  <svg
                    className="flex-shrink-0 w-6 h-full text-gray-200"
                    viewBox="0 0 24 44"
                    preserveAspectRatio="none"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
                  </svg>
                )}
              </div>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export default Breadcrumbs
