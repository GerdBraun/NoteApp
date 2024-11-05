import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from "./components/Layout";
import NotesList from "./components/partials/NotesList";
import CategoryList from "./components/partials/CategoryList";
import Welcome from "./components/partials/Welcome";
import FilterComponent from "./components/FilterComponent";
import AddNote from "./components/AddNote";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Welcome />} />
      <Route
        path="/notes"
        element={
          <>
            <AddNote />
            <FilterComponent />
            <NotesList />
          </>
        }
      />
      <Route path="/categories" element={<CategoryList />} />
      <Route path="/login" element={<></>} />
      <Route path="/signup" element={<></>} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
