import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";

import Assets from "../definitions/Assets";
import Colors from "../definitions/Colors";

const FilmListItem = () => (
  <View style={styles.container}>
    <Image style={styles.poster} />
    <View style={styles.informationContainer}>
      <Text style={styles.title}>The Batman</Text>
      <Text style={styles.overview} numberOfLines={4}>
        In his second year of fighting crime, Batman uncovers corruption in
        Gotham City that connects to his own family while facing a serial killer
        known as the Riddler.
      </Text>
      <View style={styles.statsContainer}>
        <View style={styles.statContainer}>
          <Image style={styles.icon} source={Assets.icons.voteAverage} />
          <Text style={styles.voteAverage}>9.12</Text>
        </View>
        <View style={styles.statContainer}>
          <Text style={styles.voteCount}>1876 votes</Text>
        </View>
      </View>
    </View>
  </View>
);

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
