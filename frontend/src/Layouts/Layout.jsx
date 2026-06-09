import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import Particles from "../Particles";
function Layout() {
  return (
    <>

      <Header />

      <main className="pt-20 sm:pt-28 lg:pt-20 mb-0">
        <Outlet />
      </main>
      <div className="">
        <Footer />
      </div>
    </>
  );
}

export default Layout;
