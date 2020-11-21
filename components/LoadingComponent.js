import { ActivityIndicator, Text, View } from "react-native";

import React from "react";
import { STYLES } from "../shared/styles";

//
export const Loading = () => {
  return (
    <View style={STYLES.loadingView}>
      <ActivityIndicator size="large" color="#512da8" />
      <Text style={STYLES.loadingText}>Loading...</Text>
    </View>
  );
};
