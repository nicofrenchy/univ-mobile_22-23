import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from "react-native";

import Search from "../components/Search";
import Film from "../components/Film";
import FilmsFaved from "../components/FilmsFaved";

import Colors from "../definitions/Colors";
import Assets from "../definitions/Assets";

const SearchNavigation = createStackNavigator();
const FavedNavigation = createStackNavigator();
const TabNavigation = createBottomTabNavigator();

function SearchStack() {
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

function FavedStack() {
  return (
    <FavedNavigation.Navigator initialRouteName="ViewFaved">
      <FavedNavigation.Screen
        name="ViewFaved"
        component={FilmsFaved}
        options={{ title: "Favoris" }}
      />
      <FavedNavigation.Screen
        name="ViewFilm"
        component={Film}
        options={{ title: "Film" }}
      />
    </FavedNavigation.Navigator>
  );
}

function RootStack() {
  return (
    <TabNavigation.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors.primary_blue,
        headerShown: false,
      }}>
      <TabNavigation.Screen
        name="Recherche"
        component={SearchStack}
        options={() => ({
          tabBarIcon: ({ color }) => {
            return (
              <Image
                source={Assets.icons.search}
                style={{ tintColor: color }}
              />
            );
          },
        })}
      />
      <TabNavigation.Screen
        name="Favoris"
        component={FavedStack}
        options={() => ({
          tabBarIcon: ({ color }) => {
            return (
              <Image source={Assets.icons.fav} style={{ tintColor: color }} />
            );
          },
        })}
      />
    </TabNavigation.Navigator>
  );
}

export default RootStack;
