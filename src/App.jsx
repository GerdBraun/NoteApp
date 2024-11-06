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
      <Route path="/notes/:id" element={<AddNote />} />
      <Route path="/notes/add" element={<AddNote />} />
      <Route path="/categories" element={<CategoryList />} />
      <Route path="/login" element={<LogIn />} />
      <Route path="/signup" element={<></>} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
