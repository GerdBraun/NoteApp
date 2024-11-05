import { Outlet } from "react-router-dom";
import Header from "./partials/Header";
import Footer from "./partials/Footer";

const Layout = () => {
  return (
    <>
    <Header />
    <main className='p-4 mx-auto max-w-screen-xl'>
        <Outlet />
    </main>
    <Footer />
    </>
  )
}

export default Layout