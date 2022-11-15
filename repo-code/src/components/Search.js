import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, FlatList } from "react-native";

import FilmListItem from "../components/FilmListItem";

import Colors from "../definitions/Colors";
import filmsData from "../helpers/filmsData";
import { searchMovie } from "../api/TMDB";

const Search = () => {
  const [films, setFilms] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const searchFilms = async () => {
    console.log("Search Movies");
    try {
      const TMDBSearchMovieResult = await searchMovie(searchTerm);
      setFilms(TMDBSearchMovieResult.results);
    } catch (error) {}
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
          onPress={searchFilms}
        />
      </View>
      <FlatList
        data={films}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <FilmListItem filmData={item} />}
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
