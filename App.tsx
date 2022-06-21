import 'react-native-gesture-handler';
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
//  import android.os.Bundle;
import React from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import {PersistGate} from 'redux-persist/integration/react';
import {Store, persistor} from './src/redux/store';
import {Provider} from 'react-redux';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Root from './src/Navigator/Root';
import {SafeAreaView} from 'react-native-safe-area-context';
const App = () => {
  const latitude = 33.5344737;
  const longitude = 73.0525821;
  const handleRestaurantSearch = () => {
    console.log('here');
    const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?';
    const location = `location=${latitude},${longitude}`;
    const radius = '&radius=2000';
    const type = '&keyword=restaurant';
    const key = '&key=AIzaSyDtkp4KHqYIYddiYheGVMPqO9ko5ZtwYAU';
    const restaurantSearchUrl = url + location + radius + type + key;
    fetch(restaurantSearchUrl)
      .then(response => response.json())
      .then(result => console.log('result', result))
      // .then(result => this.setState({restaurantList: result}))
      .catch(e => console.log(e));
  };
  return (
    // <SafeAreaView style={{flex: 1}}>
    <Provider store={Store}>
      <PersistGate loading={null} persistor={persistor}>
        <Root />
      </PersistGate>
    </Provider>
  );
};

export default App;
