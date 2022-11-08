import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, FlatList } from "react-native";

import FilmListItem from "../components/FilmListItem";

import Colors from "../definitions/Colors";
import filmsData from "../helpers/filmsData";

const Search = () => {
  const [films, setFilms] = useState(filmsData.results);

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Terme à chercher"
          style={styles.inputSearchTerm}
        />
        <Button
          title="Rechercher"
          color={Colors.primary_blue}
          onPress={() => {
            console.log(films.length);
          }}
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
