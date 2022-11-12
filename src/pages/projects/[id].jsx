import { useRouter } from 'next/router'

import MainLayout from '../../components/MainLayout'
import Navbar from '../../components/Navbar'
import Breadcrumbs from '../../components/Breadcrumbs'
import Stage1 from '../../components/Stage1'

const Project = ({ isAdmin }) => {
  const router = useRouter()
  const { id: projectId } = router.query
  const state = 'BIDDING'
  return (
    <MainLayout>
      <Navbar />
      <Breadcrumbs />
      {state === 'BIDDING' ? <Stage1 /> : null}
    </MainLayout>
  )
}

export default Project
