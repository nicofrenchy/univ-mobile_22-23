import { API_Bearer } from "./config";
export async function searchMovie(searchTerm = "", page = 1) {
  try {
    const myHeaders = new Headers({
      Authorization: API_Bearer,
    });
    const url = `https://api.themoviedb.org/3/search/movie?query=${searchTerm}&page=${page}`;
    const response = await fetch(url, { headers: myHeaders });
    const json = await response.json();
    return json;
  } catch (error) {
    console.log(`Error with function TMBD/searchMovie: ${error.message}`);
    throw error;
  }
}
