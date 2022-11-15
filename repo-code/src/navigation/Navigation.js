import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Search from "../components/Search";
import Film from "../components/Film";

const SearchNavigation = createStackNavigator();

function RootStack() {
  return (
    <SearchNavigation.Navigator initialRouteName="ViewSearch">
      <SearchNavigation.Screen
        name="ViewSearch"
        component={Search}
        options={{ title: "Recherche" }}
      />
      <SearchNavigation.Screen
        name="ViewFilm"
        component={Film}
        options={{ title: "Film" }}
      />
    </SearchNavigation.Navigator>
  );
}

export default RootStack;
