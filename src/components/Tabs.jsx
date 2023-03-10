import Link from 'next/link'

let tabs = [
  { name: 'Primary Menu', href: 'primary', current: true },
  { name: 'Secondary Menu', href: 'secondary', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Tabs = ({ selectedTab = 'primary' }) => {
  tabs = tabs.map((tab) => {
    tab.current = tab.href === selectedTab
    return tab
  })

  return (
    <div className="mb-4">
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
        <select
          id="tabs"
          name="tabs"
          className="block w-full border-gray-300 rounded-md focus:border-indigo-500 focus:ring-indigo-500"
          defaultValue={tabs.find((tab) => tab.current).name}
        >
          {tabs.map((tab) => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <nav
          className="flex divide-x divide-gray-200 rounded-lg shadow isolate"
          aria-label="Tabs"
        >
          {tabs.map((tab, tabIdx) => (
            <Link
              key={tab.name}
              href={`/?tab=${tab.href}`}
              type="button"
              className={classNames(
                tab.current
                  ? 'text-gray-900'
                  : 'text-gray-500 hover:text-gray-700',
                tabIdx === 0 ? 'rounded-l-lg' : '',
                tabIdx === tabs.length - 1 ? 'rounded-r-lg' : '',
                'group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-center text-sm font-medium hover:bg-gray-50 focus:z-10'
              )}
              aria-current={tab.current ? 'page' : undefined}
            >
              <span>{tab.name}</span>
              <span
                aria-hidden="true"
                className={classNames(
                  tab.current ? 'bg-indigo-500' : 'bg-transparent',
                  'absolute inset-x-0 bottom-0 h-0.5'
                )}
              />
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}

export default Tabs
