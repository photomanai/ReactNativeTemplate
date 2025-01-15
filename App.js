import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Provider } from "react-redux";
import { store } from "./store/store";
import TemplateScreen from "./screen/TemplateScreen";

const App = () => {
  return (
    <Provider store={store}>
      <TemplateScreen />
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
