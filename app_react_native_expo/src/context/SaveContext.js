import trackerAPI from "../api/trackerApi";
import createDataContext from "./createDataContext";

const saveReducer = (state, action) => {
  switch (action.type) {
    case "fetch_track":
      return action.payload;
    default:
      return state;
  }
};

const fetchTrack = (dispatch) => {
  return async () => {
    const response = await trackerAPI.get("tracks/user-track-list/");
    dispatch({ type: "fetch_track", payload: response.data });
  };
};

const saveTrack = (dispatch) => {
  return async (locations, trackName) => {
    dispatch({ type: "save_track", payload: locations });
    data = {
      track_points: locations,
      track_name: trackName,
    };
    await trackerAPI.post("tracks/user-track-list/", data);
  };
};

export const { Context, Provider } = createDataContext(
  saveReducer,
  { fetchTrack, saveTrack },
  []
);
