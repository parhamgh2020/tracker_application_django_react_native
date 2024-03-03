import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";

const LinkNav = ({ onPress, text }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

export default LinkNav;

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    color: "blue",
  },
});
