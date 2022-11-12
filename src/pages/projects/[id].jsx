import { useRouter } from 'next/router'
import Breadcrumbs from '../../components/Breadcrumbs'

import MainLayout from '../../components/MainLayout'
import Navbar from '../../components/Navbar'

const Project = ({ isAdmin }) => {
  const router = useRouter()
  const { id: projectId } = router.query
  return (
    <MainLayout>
      <Navbar />
      <Breadcrumbs />
    </MainLayout>
  )
}

export default Project
