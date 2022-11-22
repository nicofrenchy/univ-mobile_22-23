import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  ScrollView,
  Image,
} from "react-native";

import DisplayError from "../components/DisplayError";
import ProductionCompanyItem from "../components/ProductionCompanyItem";

import { detailsMovie } from "../api/TMDB";

import Colors from "../definitions/Colors";
import Assets from "../definitions/Assets";

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

  const displayFilmBackdrop = () => {
    if (film.backdrop_path) {
      return (
        <Image
          style={styles.filmBackdrop}
          source={{
            uri: `https://image.tmdb.org/t/p/w500/${film.backdrop_path}`,
          }}
        />
      );
    }
    return (
      <View style={styles.containerNoFilmBackdrop}>
        <Image source={Assets.icons.missingIMG} />
      </View>
    );
  };

  const displayProductionCompanies = () => {
    let companiesJSX = [];
    film.production_companies.forEach((company, index) => {
      companiesJSX.push(
        <ProductionCompanyItem key={index} companyData={company} />
      );
    });
    return <View>{companiesJSX}</View>;
  };

  const getGenres = () => {
    let genres = "";
    if (film.genres) {
      film.genres.forEach((genre) => {
        genres += genre.name + " - ";
      });
      genres = genres.slice(0, -3);
    }
    return genres;
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
        <ScrollView style={styles.containerScroll}>
          {displayFilmBackdrop()}
          <View style={styles.containerCardTop}>
            <View style={styles.containerHeaderMovie}>
              <Text style={styles.textOriginalTitle}>
                {film.original_title}
              </Text>
              <Text style={styles.textContent}>{film.tagline}</Text>
            </View>
            <View style={styles.containerVotes}>
              <View style={styles.containerVoteAverage}>
                <Text style={styles.textVoteAverage}>{film.vote_average}</Text>
                <Text style={styles.textMaxVote}>/10</Text>
              </View>
              <Text style={styles.textVotesCount}>{film.vote_count} votes</Text>
            </View>
          </View>
          <View style={styles.containerCardBottom}>
            <Text style={[styles.textInfoName, { marginTop: 0 }]}>
              Release Date
            </Text>
            <Text style={styles.textContent}>{film.release_date}</Text>
            <Text style={styles.textInfoName}>Genres</Text>
            <Text style={styles.textContent}>{getGenres()}</Text>
            <Text style={styles.textInfoName}>Revenue</Text>
            <Text style={styles.textContent}>{film.revenue + " $"}</Text>
            <Text style={styles.textInfoName}>Production Companies</Text>
            {displayProductionCompanies()}
          </View>
        </ScrollView>
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
  containerScroll: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 16,
  },
  containerCardTop: {
    elevation: 1,
    borderRadius: 3,
    padding: 12,
    flexDirection: "row",
    backgroundColor: "white",
  },
  containerCardBottom: {
    elevation: 1,
    marginTop: 16,
    borderRadius: 3,
    padding: 12,
    backgroundColor: "white",
  },
  containerHeaderMovie: {
    flex: 4,
    marginRight: 8,
  },
  containerVotes: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  containerVoteAverage: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: Colors.primary_blue,
    borderRadius: 3,
    flexDirection: "row",
    alignItems: "flex-end",
  },
  containerNoFilmBackdrop: {
    height: 128,
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    backgroundColor: "white",
  },
  filmBackdrop: {
    height: 180,
    backgroundColor: Colors.primary_blue,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },
  textOriginalTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  textContent: {
    fontSize: 16,
  },
  textInfoName: {
    fontWeight: "bold",
    color: Colors.primary_blue,
    fontSize: 16,
    marginTop: 16,
  },
  textVoteAverage: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  textMaxVote: {
    fontSize: 12,
    marginLeft: 3,
    color: "white",
  },
  textVotesCount: {
    fontStyle: "italic",
    fontSize: 12,
  },
});
