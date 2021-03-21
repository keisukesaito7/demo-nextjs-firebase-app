import { NextRouter, useRouter } from 'next/router'

const UserShow: React.FC = () => {
  const router: NextRouter = useRouter()
  return <div>{router.query.uid}</div>
}

export default UserShow
