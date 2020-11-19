import * as React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <MapView style={styles.mapStyle}
      initialRegion={{
        latitude:43.4643,
        longitude:-80.5204,      
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }} 
  />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
