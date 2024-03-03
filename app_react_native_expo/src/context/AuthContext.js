import createDataContext from "./createDataContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import httpRequest from "../api/trackerApi";
import { useNavigation } from "@react-navigation/native";

const authReducer = (state, action) => {
  switch (action.type) {
    case "sign_in":
      return { ...state, token: action.payload, errMessage: null };
    case "sign_out":
      return { ...state, token: null };
    case "add_error":
      return { ...state, errMessage: action.payload };
    case "clear_error":
      return { ...state, errMessage: null };
    default:
      return state;
  }
};

const signIn = (dispatch) => {
  const navigation = useNavigation();
  return async ({ email, password }) => {
    console.log("try to sign in...");
    try {
      res = await httpRequest.post("api/token/", { username: email, password });
      await AsyncStorage.setItem("token", res.data.access);
      dispatch({ type: "sign_in", payload: res.data.access });
      navigation.navigate("MainScreens");
    } catch (err) {
      console.log("🚀 ~ onPressButton ~ err:", err);
      dispatch({ type: "add_error", payload: "error in sign ip" });
    }
  };
};

const signUp = (dispatch) => {
  const navigation = useNavigation();
  return async ({ email, password }) => {
    try {
      res = await httpRequest.post("client/user/create", {
        username: email,
        password,
      });
      navigation.navigate("SignInScreen", { email, password });
    } catch (err) {
      console.log("🚀 ~ onPressButton ~ err:", err);
      dispatch({ type: "add_error", payload: "error in sign up" });
    }
  };
};

const signOut = (dispatch) => {
  const navigation = useNavigation();
  return () => {
    dispatch({ type: "sign_out" });
    navigation.navigate("AuthScreens");
  };
};

const cleanUpError = (dispatch) => {
  return () => {
    dispatch({ type: "clear_error" });
  };
};

const tryLocalSignIn = (dispatch) => {
  return async () => {
    token = await AsyncStorage.getItem("token");
    if (token) {
      dispatch({ type: "sign_in", payload: token });
    }
  };
};

export const { Context, Provider } = createDataContext(
  authReducer,
  { signIn, signOut, signUp, cleanUpError, tryLocalSignIn },
  { token: null, errMessage: null }
);
