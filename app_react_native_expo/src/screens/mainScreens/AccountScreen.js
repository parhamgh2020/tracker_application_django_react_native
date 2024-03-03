import { View, Text, StyleSheet } from "react-native";
import { Button } from "@rneui/base";
import React, { useContext } from "react";
import { Context as AuthContext } from "../../context/AuthContext";

const AccountScreen = () => {
  const {signOut} = useContext(AuthContext)
  return (
    <View style={styles.container}>
      <Button
        color="red"
        title="sign out"
        containerStyle={styles.buttonContainerStyle}
        onPress={signOut}
      />
    </View>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonContainerStyle: {
    width: "80%",
    marginHorizontal: 50,
    marginVertical: 10,
  },
});
