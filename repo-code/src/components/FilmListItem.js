import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import PropTypes from "prop-types";

import Assets from "../definitions/Assets";
import Colors from "../definitions/Colors";

const FilmListItem = ({
  filmData: { original_title, overview, vote_average, vote_count },
}) => (
  <View style={styles.container}>
    <Image style={styles.poster} />
    <View style={styles.informationContainer}>
      <Text style={styles.title}>{original_title}</Text>
      <Text style={styles.overview} numberOfLines={4}>
        {overview}
      </Text>
      <View style={styles.statsContainer}>
        <View style={styles.statContainer}>
          <Image style={styles.icon} source={Assets.icons.voteAverage} />
          <Text style={styles.voteAverage}>{vote_average}</Text>
        </View>
        <View style={styles.statContainer}>
          <Text style={styles.voteCount}>{vote_count}</Text>
        </View>
      </View>
    </View>
  </View>
);

FilmListItem.propTypes = {
  filmData: PropTypes.shape({
    original_title: PropTypes.string,
    overview: PropTypes.string,
    vote_average: PropTypes.number,
    vote_count: PropTypes.number,
  }).isRequired,
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
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
});
