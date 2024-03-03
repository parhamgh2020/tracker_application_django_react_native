import { View, StyleSheet } from "react-native";
import React, { useContext, useState } from "react";
import { Input, Button, Text } from "@rneui/base";
import { Context as AuthContext } from "../../context/AuthContext";
import LinkNav from "../../components/LinkNav";

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const { state, signUp, cleanUpError } = useContext(AuthContext);

  const onPressLink = () => {
    navigation.navigate("SignInScreen");
    cleanUpError();
  };

  const onPressButton = () => {
    signUp({ email, password });
  };

  return (
    <View style={styles.container}>
      <Text h3>Sign up</Text>
      <Input placeholder="Email" onChangeText={setEmail} value={email} />
      <Input
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={setPassword}
        value={password}
      />
      <View style={styles.containerButtonAndText}>
        {state.errMessage ? (
          <Text style={{ color: "red" }}>{state.errMessage}</Text>
        ) : null}
        <Button
          color="green"
          containerStyle={styles.buttonContainerStyle}
          title="Sign up"
          onPress={onPressButton}
        />
      </View>
      <LinkNav
        text="go to Sign in"
        pageStack="SignInScreen"
        onPress={onPressLink}
      />
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    paddingHorizontal: 32,
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingBottom: 32,
  },
  inputStyle: {},
  buttonContainerStyle: {
    width: "80%",
    marginHorizontal: 50,
    marginVertical: 10,
  },
  containerButtonAndText: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
