/* eslint-disable no-nested-ternary */
import { CheckIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'

let steps = [
  {
    name: 'Bidding',
    val: 'BIDDING',
  },
  {
    name: 'Material Selection',
    val: 'MATERIAL_SELECTION',
  },
  {
    name: 'Reconstruction',
    val: 'RECONSTRUCTION',
  },
  {
    name: 'Construction',
    val: 'CONSTRUCTION',
  },
  {
    name: 'Punch List',
    val: 'PUNCH_LIST',
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const NavbarTabs = ({ projectId, currentStage }) => {
  let isStageSet = false
  steps = steps.map((step) => {
    // Step is completed by default
    step.status = 'complete'

    if (isStageSet) {
      step.status = 'upcoming'
    }

    if (step.val === currentStage) {
      step.status = 'current'
      isStageSet = true
    }

    return step
  })

  const getLink = (link) => {
    return `/projects/${projectId}?stage=${link}`
  }

  const renderTabs = (tab, tabIdx) => {
    if (tab.status === 'complete') {
      return (
        <Link href={getLink(tab.val)} className="group">
          <span
            className="absolute top-0 left-0 w-1 h-full bg-transparent group-hover:bg-gray-200 lg:bottom-0 lg:top-auto lg:h-1 lg:w-full"
            aria-hidden="true"
          />
          <span
            className={classNames(
              tabIdx !== 0 ? 'lg:pl-9' : '',
              'flex items-start px-6 py-5 text-sm font-medium'
            )}
          >
            <span className="flex-shrink-0">
              <span className="flex items-center justify-center w-8 h-8 bg-indigo-600 rounded-full">
                <CheckIcon className="w-5 h-5 text-white" aria-hidden="true" />
              </span>
            </span>
            <span className="mt-0.5 ml-4 flex min-w-0 flex-col">
              <span className="text-sm font-medium">{tab.name}</span>
            </span>
          </span>
        </Link>
      )
    }

    if (tab.status === 'current') {
      return (
        <Link href={getLink(tab.val)} aria-current="step">
          <span
            className="absolute top-0 left-0 w-1 h-full bg-indigo-600 lg:bottom-0 lg:top-auto lg:h-1 lg:w-full"
            aria-hidden="true"
          />
          <span
            className={classNames(
              tabIdx !== 0 ? 'lg:pl-9' : '',
              'flex items-start px-6 py-5 text-sm font-medium'
            )}
          >
            <span className="flex-shrink-0">
              <span className="flex items-center justify-center w-8 h-8 border-2 border-indigo-600 rounded-full">
                <span className="text-indigo-600">{tabIdx + 1}</span>
              </span>
            </span>
            <span className="mt-0.5 ml-4 flex min-w-0 flex-col">
              <span className="text-sm font-medium text-indigo-600">
                {tab.name}
              </span>
            </span>
          </span>
        </Link>
      )
    }

    return (
      <Link href={getLink(tab.val)} className="group">
        <span
          className="absolute top-0 left-0 w-1 h-full bg-transparent group-hover:bg-gray-200 lg:bottom-0 lg:top-auto lg:h-1 lg:w-full"
          aria-hidden="true"
        />
        <span
          className={classNames(
            tabIdx !== 0 ? 'lg:pl-9' : '',
            'flex items-start px-6 py-5 text-sm font-medium'
          )}
        >
          <span className="flex-shrink-0">
            <span className="flex items-center justify-center w-8 h-8 border-2 border-gray-300 rounded-full">
              <span className="text-gray-500">{tabIdx + 1}</span>
            </span>
          </span>
          <span className="mt-0.5 ml-4 flex min-w-0 flex-col">
            <span className="text-sm font-medium text-gray-500">
              {tab.name}
            </span>
          </span>
        </span>
      </Link>
    )
  }

  return (
    <div className="mt-8 bg-white rounded-md lg:border-t lg:border-b lg:border-gray-200">
      <nav className="mx-auto max-w-7xl " aria-label="Progress">
        <ol className="overflow-hidden rounded-md lg:flex lg:rounded-none lg:border-l lg:border-r lg:border-gray-200">
          {steps.map((step, stepIdx) => (
            <li key={step.val} className="relative overflow-hidden lg:flex-1">
              <div
                className={classNames(
                  stepIdx === 0 ? 'rounded-t-md border-b-0' : '',
                  stepIdx === steps.length - 1 ? 'rounded-b-md border-t-0' : '',
                  'overflow-hidden border border-gray-200 lg:border-0'
                )}
              >
                {renderTabs(step, stepIdx)}
                {stepIdx !== 0 ? (
                  <>
                    {/* Separator */}
                    <div
                      className="absolute inset-0 top-0 left-0 hidden w-3 lg:block"
                      aria-hidden="true"
                    >
                      <svg
                        className="w-full h-full text-gray-300"
                        viewBox="0 0 12 82"
                        fill="none"
                        preserveAspectRatio="none"
                      >
                        <path
                          d="M0.5 0V31L10.5 41L0.5 51V82"
                          stroke="currentcolor"
                          vectorEffect="non-scaling-stroke"
                        />
                      </svg>
                    </div>
                  </>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  )
}

export default NavbarTabs
