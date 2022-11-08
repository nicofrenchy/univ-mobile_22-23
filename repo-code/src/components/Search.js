import React from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";

import Colors from "../definitions/Colors";

const Search = () => {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Terme à chercher"
        style={styles.inputSearchTerm}
      />
      <Button
        title="Rechercher"
        color={Colors.primary_blue}
        onPress={() => {
          console.log("Coucou");
        }}
      />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    marginTop: 16,
  },
  inputSearchTerm: {
    marginBottom: 16,
  },
});
