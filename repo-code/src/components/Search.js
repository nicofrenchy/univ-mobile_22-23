import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
  Keyboard,
} from "react-native";

import FilmListItem from "../components/FilmListItem";
import DisplayError from "./DisplayError";

import Colors from "../definitions/Colors";
import { searchMovie } from "../api/TMDB";

const Search = ({ navigation }) => {
  const [films, setFilms] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isMorePages, setIsMorePages] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isError, setIsError] = useState(false);

  const searchFilms = async (currentFilms, pageToRequest) => {
    setIsRefreshing(true);
    setIsError(false);
    console.log(
      "Search Movies; previously " +
        currentFilms.length +
        " films and will request page n° " +
        pageToRequest
    );
    try {
      const TMDBSearchMovieResult = await searchMovie(
        searchTerm,
        pageToRequest
      );
      setFilms([...currentFilms, ...TMDBSearchMovieResult.results]);
      setCurrentPage(TMDBSearchMovieResult.page);
      TMDBSearchMovieResult.page == TMDBSearchMovieResult.total_pages
        ? setIsMorePages(false)
        : setIsMorePages(true);
    } catch (error) {
      setIsError(true);
      setFilms([]);
      setIsMorePages(true);
      setCurrentPage(1);
    }
    setIsRefreshing(false);
  };

  const newSearchFilms = () => {
    Keyboard.dismiss();
    searchFilms([], 1);
  };

  const loadMoreFilms = () => {
    if (isMorePages) {
      searchFilms(films, currentPage + 1);
    }
  };

  const navigateFilmDetails = (filmID) => {
    navigation.navigate("ViewFilm", { filmID });
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Terme à chercher"
          style={styles.inputSearchTerm}
          onChangeText={(text) => setSearchTerm(text)}
          onSubmitEditing={newSearchFilms}
        />
        <Button
          title="Rechercher"
          color={Colors.primary_blue}
          onPress={newSearchFilms}
        />
      </View>
      {isError ? (
        <DisplayError message="Impossible de récupérer les films" />
      ) : (
        <FlatList
          data={films}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <FilmListItem
              filmData={item}
              onClick={() => {
                navigateFilmDetails(item.id);
              }}
            />
          )}
          onEndReached={loadMoreFilms}
          onEndReachedThreshold={0.5}
          refreshing={isRefreshing}
          onRefresh={newSearchFilms}
        />
      )}
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    marginTop: 16,
  },
  searchContainer: {
    marginBottom: 16,
  },
  inputSearchTerm: {
    marginBottom: 16,
  },
});
