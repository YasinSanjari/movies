// import MovieCard from "./components/MovieCard";
import usePopularMovies from "./hooks/use-popular-movies";

function App() {
  const {data:movies} = usePopularMovies();
  console.log(movies);
  return (
    <div className="flex flex-col min-h-screen w-full">
      hello world
      {/* <MovieCard /> */}
    </div>
  );
}

export default App;
