import { Form } from '@/components/Form'
import { Link } from '@mui/material'

const Home = () => {
  return (
    <div className="w-full h-full">
      <div className="w-[100vw] h-[100vh] flex">
        <Link className="m-auto" href="dashboard">
          Login
        </Link>
      </div>
    </div>
  )
}
export default Home
