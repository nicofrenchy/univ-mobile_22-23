import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, ActivityIndicator } from "react-native";

import DisplayError from "../components/DisplayError";

import { detailsMovie } from "../api/TMDB";

const Film = ({ route }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [film, setFilm] = useState(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    requestFilm();
  }, []); //Uniquement à l'initialisation

  //Pourrait être directement déclarée dans useEffect
  const requestFilm = async () => {
    try {
      const TMDBDetailsMovieResult = await detailsMovie(route.params.filmID);
      setFilm(TMDBDetailsMovieResult);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
    }
  };

  return (
    <View style={styles.container}>
      {isError ? (
        <DisplayError message="Impossible de récupérer les données du film" />
      ) : isLoading ? (
        <View style={styles.containerLoading}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <Text>{film.original_title}</Text>
      )}
    </View>
  );
};

export default Film;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerLoading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
