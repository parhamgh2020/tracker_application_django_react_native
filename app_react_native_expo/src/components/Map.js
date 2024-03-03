import { View, StyleSheet, ActivityIndicator, Text } from "react-native";
import React, { useContext } from "react";
import MapView, { Polyline, Circle } from "react-native-maps";
import { Context as LocationContext } from "../context/LocationContext";

const Map = () => {
  const {
    state: { currentLocation, locations },
  } = useContext(LocationContext);

  return (
    <View style={styles.container}>
      {currentLocation ? (
        <MapView
          style={styles.map}
          region={{
            ...currentLocation.coords,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        >
          <Circle
            center={currentLocation.coords}
            radius={550}
            strokeColor="rgba(158,25,255, 1)"
            fillColor="rgba(158,25,255, 0.3)"
          />
          <Polyline
            coordinates={locations.map((loc) => loc.coords)}
            fillColor="red"
            strokeWidth={5}
            strokeColor="green"
          />
        </MapView>
      ) : (
        <ActivityIndicator size="large" />
      )}
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "60%",
    borderWidth: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
