import { useQuery } from "@tanstack/react-query"
import { axiosInstance } from "../lib/utils"

const usePopularMovies = () => {
    return useQuery({
        queryKey:["popular-movies"],
        queryFn:()=> axiosInstance.get("/movie/popular?language=en-US&page=1").then((res)=> res.data)
    })
}

export default usePopularMovies;