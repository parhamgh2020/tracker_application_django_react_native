import { NavigationContainer } from "@react-navigation/native";
//
import { Provider as AuthProvider } from "./src/context/AuthContext";
import { Provider as LocationProvider } from "./src/context/LocationContext";
import { Provider as SaveTrackProvider } from "./src/context/SaveContext";
//
import Route from "./src/Route";

export default function App() {
  return (
    <NavigationContainer>
      <SaveTrackProvider>
        <LocationProvider>
          <AuthProvider>
            <Route />
          </AuthProvider>
        </LocationProvider>
      </SaveTrackProvider>
    </NavigationContainer>
  );
}
