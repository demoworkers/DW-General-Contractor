import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Navbar = ({ projectInfo = { name: 'Sky Scrapper', status: '' } }) => {
  return (
    <nav className="mb-1 bg-white shadow">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex items-center flex-shrink-0">
              <h2 className="font-bold">{projectInfo.name}</h2>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
