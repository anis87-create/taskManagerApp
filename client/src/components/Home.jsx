import { Outlet } from "react-router-dom";


const Home = () => {
  return (
    <div className="p-4">
      <>
        <Outlet />
      </>
    </div>
  );
};

export default Home;
