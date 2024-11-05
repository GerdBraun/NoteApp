import { Outlet } from "react-router-dom";
import Header from "./partials/Header";
import Footer from "./partials/Footer";
import NotesContextProvider from "../context/NotesContextProvider";

const Layout = () => {
  return (
    <NotesContextProvider>
      <Header />
      <main className="p-4 mx-auto max-w-screen-xl">
        <Outlet />
      </main>
      <Footer />
    </NotesContextProvider>
  );
};

export default Layout;
