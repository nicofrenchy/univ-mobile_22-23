import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, FlatList } from "react-native";

import FilmListItem from "../components/FilmListItem";

import Colors from "../definitions/Colors";
import { searchMovie } from "../api/TMDB";

const Search = () => {
  const [films, setFilms] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isMorePages, setIsMorePages] = useState(true);

  const searchFilms = async (currentFilms, pageToRequest) => {
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
    } catch (error) {}
  };

  const newSearchFilms = () => {
    searchFilms([], 1);
  };

  const loadMoreFilms = () => {
    if (isMorePages) {
      searchFilms(films, currentPage + 1);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Terme à chercher"
          style={styles.inputSearchTerm}
          onChangeText={(text) => setSearchTerm(text)}
        />
        <Button
          title="Rechercher"
          color={Colors.primary_blue}
          onPress={newSearchFilms}
        />
      </View>
      <FlatList
        data={films}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <FilmListItem filmData={item} />}
        onEndReached={loadMoreFilms}
        onEndReachedThreshold={0.5}
      />
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
