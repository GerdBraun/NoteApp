import { Outlet } from "react-router-dom";
import Header from "./partials/Header";
import Footer from "./partials/Footer";
import NotesContextProvider from "../context/NotesContextProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = () => {
  return (
    <NotesContextProvider>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <ToastContainer position="top-center" />
    </NotesContextProvider>
  );
};

export default Layout;
