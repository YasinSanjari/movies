import { createBrowserRouter } from "react-router";
import App from "./App";
import MovieModal from "./components/movie/MovieModal";

function AppWithModal() {
  return (
    <>
      <App />
      <MovieModal />
    </>
  );
}

const router = createBrowserRouter([
  { path: "/", Component: App },
  { path: "/movie/:id", Component: AppWithModal },
]);

export default router;
