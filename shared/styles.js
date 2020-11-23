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
  },
  loadingView: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  loadingText: {
    color: "#512da8",
    fontSize: 14,
    fontWeight: "bold",
  },
  formRow: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
    margin: 20,
  },
  formLabel: {
    fontSize: 18,
    flex: 2,
  },
  formItem: {
    flex: 1,
  },
  formItemDatePicker: {
    flex: 2,
    marginRight: 20,
  },
  dateIcon: {
    position: "absolute",
    left: 0,
    top: 4,
    marginLeft: 0,
  },
  dateInput: {
    marginLeft: 36,
  },
  modal: {
    justifyContent: "center",
    margin: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    backgroundColor: "#512da8",
    textAlign: "center",
    color: "white",
    marginBottom: 20,
  },
  modalText: {
    fontSize: 18,
    margin: 10,
  },
});
