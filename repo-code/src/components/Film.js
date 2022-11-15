import React from "react";
import { View, StyleSheet, Text } from "react-native";

const Film = () => {
  return (
    <View style={styles.container}>
      <Text>Component Film</Text>
    </View>
  );
};

export default Film;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
