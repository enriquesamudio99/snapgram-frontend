import { useAuth } from "../../common/hooks";

const Home = () => {

  const { user } = useAuth();

  return (
    <div>Welcome: { user.name.split(" ")[0] }</div>
  )
}

export default Home