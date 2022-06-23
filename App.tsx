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
