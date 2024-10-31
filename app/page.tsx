import { Link } from '@mui/material'

const Home = () => {
  return (
    <div className="container m-auto">
      <div className="flex h-[100vh]">
        <Link className="m-auto" href="dashboard">
          Login
        </Link>
      </div>
    </div>
  )
}
export default Home
