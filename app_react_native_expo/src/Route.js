import React, { useContext, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Entypo from "@expo/vector-icons/Entypo";
//
import TrackerCreateScreen from "./screens/mainScreens/TrackerCreateScreen";
import TrackerListScreen from "./screens/mainScreens/TrackerListScreen";
import TrackerDetailScreen from "./screens/mainScreens/TrackerDetailScreen";
import SignInScreen from "./screens/authScreens/SignInScreen";
import SignUpScreen from "./screens/authScreens/SignUpScreen";
import AccountScreen from "./screens/mainScreens/AccountScreen";
//
import { Context as AuthContext } from "./context/AuthContext";

const Route = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  const { state, tryLocalSignIn } = useContext(AuthContext);

  useEffect(() => {
    tryLocalSignIn();
  }, []);

  const TrackRecords = () => {
    return (
      <Stack.Navigator screenOptions={{ headerShown: true }}>
        <Stack.Screen name="TrackerListScreen" component={TrackerListScreen} />
        <Stack.Screen
          name="TrackerDetailScreen"
          component={TrackerDetailScreen}
        />
      </Stack.Navigator>
    );
  };

  const MainScreens = () => {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarShowLabel: false,
          headerShown: false,
          tabBarHideOnKeyboard: true,
          style: {
            borderRadius: 15,
            height: 90,
          },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            switch (route.name) {
              case "TrackerCreateScreen":
                icon = <FontAwesome5 name={"route"} color={color} size={24} />;
                break;
              case "TrackRecords":
                icon = <Entypo name={"archive"} color={color} size={24} />;
                break;
              case "AccountScreen":
                icon = (
                  <MaterialCommunityIcons
                    name={"account"}
                    color={color}
                    size={24}
                  />
                );
                break;
              default:
                break;
            }
            return icon;
          },
        })}
      >
        <Stack.Screen
          name="TrackerCreateScreen"
          component={TrackerCreateScreen}
        />
        <Stack.Screen name="TrackRecords" component={TrackRecords} />
        <Stack.Screen name="AccountScreen" component={AccountScreen} />
      </Tab.Navigator>
    );
  };

  const AuthScreens = () => {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SignInScreen" component={SignInScreen} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      </Stack.Navigator>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {state.token ? (
          <Stack.Group>
            <Stack.Screen name="MainScreens" component={MainScreens} />
            <Stack.Screen name="AuthScreens" component={AuthScreens} />
          </Stack.Group>
        ) : (
          <Stack.Group>
            <Stack.Screen name="AuthScreens" component={AuthScreens} />
            <Stack.Screen name="MainScreens" component={MainScreens} />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </SafeAreaView>
  );
};

export default React.memo(Route);
