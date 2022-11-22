import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { useSelector } from "react-redux";

import FilmListItem from "./FilmListItem";
import DisplayError from "./DisplayError";

import { detailsMovie } from "../api/TMDB";

const FilmsFaved = ({ navigation }) => {
  const [films, setFilms] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isError, setIsError] = useState(false);
  const favFilmIDs = useSelector((state) => state.favFilms.favFilmIDs);

  useEffect(() => {
    refreshFavedFilms();
  }, [favFilmIDs]); // A chaque fois que les films favoris changent

  /**
   *
   * Utilisation de FilmListItem fonctionne avec detailsMovie() comme avec searchMovie()
   * car les deux retourne un objet contenant au moins les données qui nous intéressent
   *
   * Assure de toujours avoir des données à jour mais beaucoup de calls API inutiles
   * Amélioration possible pour stocker les données des films localement et ne refresh que à des moments clés
   *
   **/
  const refreshFavedFilms = async () => {
    setIsRefreshing(true);
    setIsError(false);
    let refreshedFavedFilms = [];
    try {
      for (const id of favFilmIDs) {
        const TMDBDetailsMovieResult = await detailsMovie(id);
        refreshedFavedFilms.push(TMDBDetailsMovieResult);
      }
      setFilms(refreshedFavedFilms);
    } catch (error) {
      setIsError(true);
      setFilms([]);
    }
    setIsRefreshing(false);
  };

  const navigateFilmDetails = (filmID) => {
    navigation.navigate("ViewFilm", { filmID });
  };

  return (
    <View style={styles.container}>
      {isError ? (
        <DisplayError message="Impossible de récupérer les films favoris" />
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
              isHighlighted={true}
            />
          )}
          refreshing={isRefreshing}
          onRefresh={refreshFavedFilms}
        />
      )}
    </View>
  );
};

export default FilmsFaved;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    marginTop: 16,
  },
});
