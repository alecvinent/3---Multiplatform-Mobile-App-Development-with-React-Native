import { StyleSheet } from "react-native";

//
export const STYLES = StyleSheet.create({
  image: {
    width: "100%",
    height: 50,
    padding: 0,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  leader_image: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  container: {
    flex: 1,
  },
  drawerHeader: {
    backgroundColor: "#512da8",
    height: 140,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
  },
  drawerImage: {
    margin: 10,
    width: 80,
    height: 60,
  },
  drawerHeaderText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  }
});
