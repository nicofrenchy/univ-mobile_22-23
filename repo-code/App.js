import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { RootSiblingParent } from "react-native-root-siblings";

import Navigation from "./src/navigation/Navigation";
import { store } from "./src/store/config";

export default function App() {
  return (
    <RootSiblingParent>
      <Provider store={store}>
        <NavigationContainer>
          <Navigation />
          <StatusBar style="auto" />
        </NavigationContainer>
      </Provider>
    </RootSiblingParent>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
