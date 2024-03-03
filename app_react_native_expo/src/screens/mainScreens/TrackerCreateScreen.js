import { StyleSheet, View } from "react-native";
import React, { useContext } from "react";
import { Button, Text } from "@rneui/base";
import Map from "../../components/Map";
import { Context as LocationContext } from "../../context/LocationContext";
import { Context as SaveContext } from "../../context/SaveContext";
import useLocation from "../../hook/useLocation";
import { Input } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";

const TrackerCreateScreen = () => {
  // 
  const navigation= useNavigation()
  //  useContext
  const {
    addLocation,
    changeTrackName,
    startStopRecording,
    addCurrentLocation,
    reset,
    state: { locations, trackName, recordingStatus },
  } = useContext(LocationContext);
  const { saveTrack } = useContext(SaveContext);
  // costume hook
  const [err] = useLocation(recordingStatus, addLocation, addCurrentLocation);
  //
  const onPressSave = () => {
    if (locations.length > 0 && trackName) {
      saveTrack(locations, trackName);
      startStopRecording();
      reset();
      navigation.navigate("TrackRecords");
    }
  };

  //  return
  return (
    <View style={styles.container}>
      <Map />
      <View style={styles.containerErr}>
        {err ? <Text style={styles.textErr}>{err}</Text> : null}
      </View>
      <View style={styles.formStyle}>
        <Input
          placeholder="track name"
          inputContainerStyle={styles.inputContainerStyle}
          onChangeText={changeTrackName}
          value={trackName}
        />
        <Button
          type="outline"
          containerStyle={styles.buttonContainerStyle}
          buttonStyle={{ ...styles.buttonStyle, borderColor: "red" }}
          onPress={startStopRecording}
          icon={
            recordingStatus
              ? {
                  name: "stop-circle-o",
                  type: "font-awesome",
                  size: 20,
                  color: "red",
                }
              : {
                  name: "record",
                  type: "foundation",
                  size: 20,
                  color: "red",
                }
          }
        >
          <Text style={{ fontWeight: "bold", fontSize: 18, color: "red" }}>
            {recordingStatus ? "stop" : "start recording"}
          </Text>
        </Button>
        <Button
          containerStyle={styles.buttonContainerStyle}
          buttonStyle={styles.buttonStyle}
          disabled={!locations.length > 0 || !trackName}
          onPress={onPressSave}
          type="solid"
          title="save"
          icon={{
            name: "save",
            type: "font-awsome-5",
            size: 15,
            color: "white",
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 18, color: "white" }}>
            {trackName ? `save ${trackName} route` : "save"}
          </Text>
        </Button>
      </View>
    </View>
  );
};

export default TrackerCreateScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "50%",
  },
  formStyle: {
    flex: 1,
    justifyContent: "space-around",
  },
  inputContainerStyle: {
    width: "80%",
    marginHorizontal: 50,
  },
  buttonContainerStyle: {
    width: "80%",
    marginHorizontal: 50,
    marginVertical: 10,
    borderRadius: 30,
  },
  buttonStyle: {
    borderRadius: 30,
    borderWidth: 2,
  },
  containerErr: {
    width: "100%",
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  textErr: { color: "red", fontSize: 15 },
});
