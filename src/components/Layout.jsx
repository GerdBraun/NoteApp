import { Outlet } from "react-router-dom";
import Header from "./partials/Header";
import Footer from "./partials/Footer";
import NotesContextProvider from "../context/NotesContextProvider";

const Layout = () => {
  return (
    <NotesContextProvider>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </NotesContextProvider>
  );
};

export default Layout;
