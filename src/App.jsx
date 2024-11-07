import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from "./components/Layout";
import NotesList from "./components/pages/NotesList";
import CategoryList from "./components/pages/CategoryList";
import FilterComponent from "./components/partials/FilterComponent";
import AddNote from "./components/pages/AddNote";
import LogIn from "./components/pages/LogIn";
import Logout from "./components/pages/Logout";
import SignUp from "./components/pages/SignUp";
import NoteSingle from "./components/pages/NoteSingle";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route
        index
        element={
          <>
            {/* <DataFetchingUseReducer /> */}
            {/* <AddNote /> */}
            <FilterComponent />
            <NotesList />
          </>
        }
      />
      <Route path="/notes/:id" element={<NoteSingle />} />
      <Route path="/notes/add" element={<AddNote />} />
      <Route path="/notes/edit/:id" element={<AddNote />} />
      <Route path="/notes/delete/:id" element={<></>} />
      <Route path="/categories" element={<CategoryList />} />
      <Route path="/login" element={<LogIn />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/signup" element={<SignUp/>} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
