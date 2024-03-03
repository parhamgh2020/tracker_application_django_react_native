import { View, StyleSheet } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Text, Input, Button } from "@rneui/base";
import { Context as AuthContext } from "../../context/AuthContext";
import LinkNav from "../../components/LinkNav";

const SignInScreen = ({ navigation, route }) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const { state, signIn, cleanUpError } = useContext(AuthContext);

  const onPressButton = ({ email, password }) => {
    signIn({ email, password });
  };

  const onPressLink = () => {
    navigation.navigate("SignUpScreen");
    cleanUpError();
  };

  useEffect(() => {
    if (route.params) {
      setEmail(route.params.email);
      setPassword(route.params.password);
      setTimeout(() => {
        onPressButton({
          email: route.params.email,
          password: route.params.password,
        });
      }, 1000);
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text h3>Sign In</Text>
      <Input placeholder="Email" onChangeText={setEmail} value={email} />
      <Input
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={setPassword}
        value={password}
      />
      <View style={styles.containerButtonText}>
        {state.errMessage ? (
          <Text style={{ color: "red" }}>{state.errMessage}</Text>
        ) : null}
        <Button
          color="blue"
          containerStyle={styles.buttonContainerStyle}
          title="Sign in"
          onPress={() => onPressButton({ email, password })}
        />
      </View>
      <LinkNav
        text="go to Sign up"
        pageStack="SignUpScreen"
        onPress={onPressLink}
      />
    </View>
  );
};

export default SignInScreen;

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
  containerButtonText: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
