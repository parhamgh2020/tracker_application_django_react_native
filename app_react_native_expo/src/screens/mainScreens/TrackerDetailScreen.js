import { StyleSheet, View} from "react-native";
import React, { memo } from "react";
import MapView, { Polyline } from "react-native-maps";

const TrackerDetailScreen = ({ route }) => {
  const location = route.params.item;
  const track_points = location.track_points;

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={{
          ...track_points[track_points.length - 1].coords,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        <Polyline
          coordinates={track_points.map((loc) => loc.coords)}
          fillColor="red"
          strokeWidth={5}
          strokeColor="green"
        />
      </MapView>
    </View>
  );
};

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

export default memo(TrackerDetailScreen);
