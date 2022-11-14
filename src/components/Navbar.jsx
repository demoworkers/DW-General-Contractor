import ActionButton from './ActionButton'

const Navbar = ({ projectInfo = { name: '', status: '' } }) => {
  return (
    <nav className="mb-1 bg-white shadow">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex items-center justify-between flex-shrink-0">
              <h2 className="font-bold">{projectInfo.name}</h2>
            </div>
          </div>
          <div className="flex">
            <div className="flex items-center justify-between flex-shrink-0">
              <ActionButton type="edit" showIcon={false}>
                Save
              </ActionButton>
              <ActionButton type="edit" showIcon={false} className="mr-0">
                Next Stage
              </ActionButton>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
