import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";

import Search from "./src/components/Search";
import FilmListItem from "./src/components/FilmListItem";

import Test from "./src/components/Test";
import Test2 from "./src/components/Test2";

export default function App() {
  return (
    <View style={styles.container}>
      <FilmListItem />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 24, // correction barre d'état
  },
});
