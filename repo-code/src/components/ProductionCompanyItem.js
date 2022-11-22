import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import PropTypes from "prop-types";

import Assets from "../definitions/Assets";

const ProductionCompanyItem = ({ companyData: { logo_path, name } }) => {
  const getCompanyLogo = () => {
    if (logo_path) {
      return (
        <Image
          style={styles.companyLogo}
          source={{ uri: `https://image.tmdb.org/t/p/w500/${logo_path}` }}
        />
      );
    }
    return (
      <Image style={styles.companyLogo} source={Assets.icons.missingIMG} />
    );
  };

  return (
    <View style={styles.container}>
      {getCompanyLogo()}
      <Text style={styles.textContent}> {name}</Text>
    </View>
  );
};

ProductionCompanyItem.propTypes = {
  companyData: PropTypes.shape({
    logo_path: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
};

export default ProductionCompanyItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: 4,
    alignItems: "center",
  },
  companyLogo: {
    width: 32,
    height: 32,
    resizeMode: "contain",
    borderRadius: 4,
    marginRight: 8,
  },
  textContent: {
    fontSize: 14,
  },
});
