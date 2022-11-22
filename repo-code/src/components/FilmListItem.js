import React from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";

import Assets from "../definitions/Assets";
import Colors from "../definitions/Colors";

const FilmListItem = ({
  filmData: { original_title, overview, vote_average, vote_count, poster_path },
  onClick,
  isHighlighted,
}) => {
  const getPoster = () => {
    if (poster_path) {
      return (
        <Image
          style={styles.poster}
          source={{ uri: `https://image.tmdb.org/t/p/w500/${poster_path}` }}
        />
      );
    }
    return (
      <View style={styles.noPoster}>
        <Image source={Assets.icons.missingIMG} />
      </View>
    );
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onClick}>
      {getPoster()}
      <View style={styles.informationContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{original_title}</Text>
          {isHighlighted ? (
            <Image style={styles.highlight} source={Assets.icons.fav} />
          ) : null}
        </View>
        <Text style={styles.overview} numberOfLines={4}>
          {overview}
        </Text>
        <View style={styles.statsContainer}>
          <View style={styles.statContainer}>
            <Image style={styles.icon} source={Assets.icons.voteAverage} />
            <Text style={styles.voteAverage}>{vote_average}</Text>
          </View>
          <View style={styles.statContainer}>
            <Text style={styles.voteCount}>{vote_count} votes</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

FilmListItem.propTypes = {
  filmData: PropTypes.shape({
    original_title: PropTypes.string,
    overview: PropTypes.string,
    vote_average: PropTypes.number,
    vote_count: PropTypes.number,
    poster_path: PropTypes.string,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
  isHighlighted: PropTypes.bool.isRequired,
};

export default FilmListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: 8,
  },
  informationContainer: {
    flex: 1,
    marginLeft: 12,
    marginTop: 8,
  },
  statsContainer: {
    flexDirection: "row",
    marginTop: 12,
  },
  titleContainer: {
    flexDirection: "row",
  },
  statContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  poster: {
    width: 120,
    height: 180,
    borderRadius: 8,
    backgroundColor: Colors.primary_blue,
  },
  noPoster: {
    width: 120,
    height: 180,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    flex: 1,
  },
  voteAverage: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.primary_blue,
  },
  voteCount: {
    fontSize: 14,
    alignSelf: "flex-end",
    fontStyle: "italic",
  },
  overview: {
    fontSize: 16,
  },
  icon: {
    tintColor: Colors.primary_blue,
    width: 20,
    height: 20,
    marginRight: 4,
  },
  highlight: {
    tintColor: Colors.primary_blue,
    width: 20,
    height: 20,
    marginHorizontal: 4,
    marginTop: 6,
  },
});
