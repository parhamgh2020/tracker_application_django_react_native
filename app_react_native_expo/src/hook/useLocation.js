import { useState, useEffect } from "react";
import * as Location from "expo-location";

export default (recordingStatus, addLocation, addCurrentLocation) => {
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    try {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          return;
        }
        await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.BestForNavigation,
            timeInterval: 3000,
            distanceInterval: 1000,
          },
          (location) => {
            if (recordingStatus) {
              addLocation(location);
            }
            addCurrentLocation(location);
          }
        );
      })();
    } catch (e) {
      setErrorMsg(e);
    }
  }, [recordingStatus]);

  return [errorMsg];
};
