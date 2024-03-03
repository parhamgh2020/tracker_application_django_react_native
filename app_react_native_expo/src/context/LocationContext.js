import createDataContext from "./createDataContext";

const LocationReducer = (state, action) => {
  switch (action.type) {
    case "add_location":
      return {
        ...state,
        locations: [...state.locations, action.payload],
      };
    case "add_current_location":
      return {
        ...state,
        currentLocation: action.payload,
      };
    case "start_stop_recording":
      return { ...state, recordingStatus: !state.recordingStatus };
    case "change_track_name":
      return { ...state, trackName: action.payload };
    case "reset":
      return { ...state, locations: [], trackName: null };
    default:
      return state;
  }
};

const addLocation = (dispatch) => {
  return (location) => {
    dispatch({ type: "add_location", payload: location });
  };
};

const addCurrentLocation = (dispatch) => {
  return (location) => {
    dispatch({ type: "add_current_location", payload: location });
  };
};

const startStopRecording = (dispatch) => {
  return () => {
    dispatch({ type: "start_stop_recording" });
  };
};

const changeTrackName = (dispatch) => {
  return (trackName) => {
    dispatch({ type: "change_track_name", payload: trackName });
  };
};

const reset = (dispatch) => {
  return () => {
    dispatch({ type: "reset" });
  };
};

export const { Context, Provider } = createDataContext(
  LocationReducer,
  {
    changeTrackName,
    startStopRecording,
    addLocation,
    addCurrentLocation,
    reset,
  },
  {
    locations: [],
    trackName: null,
    recordingStatus: false,
    currentLocation: null,
  }
);
