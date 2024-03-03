import React, { useContext, useEffect, memo } from "react";
import { StyleSheet, View, FlatList, TouchableOpacity } from "react-native";
import { ListItem, Text } from "@rneui/base";
import { Context as SaveContext } from "../../context/SaveContext";
import { useIsFocused } from "@react-navigation/native";

const TrackerListScreen = ({ navigation }) => {
  const { state, fetchTrack } = useContext(SaveContext);

  const keyExtractor = (item) => item.id;

  const renderItem = ({ item }) => {
    const handleNavigate = () => {
      navigation.navigate("TrackerDetailScreen", { item: item });
    };

    return (
      <TouchableOpacity
        onPress={handleNavigate}
        style={styles.listItemContainer}
      >
        <ListItem>
          <ListItem.Content>
            <ListItem.Title>{item.track_name}</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      </TouchableOpacity>
    );
  };

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      fetchTrack();
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        data={state}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  listItemContainer: {
    marginVertical: 10,
    marginHorizontal: 10,
  },
});

export default memo(TrackerListScreen);
