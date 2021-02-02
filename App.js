import React from 'react';
import {
  StyleSheet,
  StatusBar,
} from 'react-native';
import Main from './src/Main';

const App = () => {
  return (
    <>
      <StatusBar backgroundColor="transparent" translucent barStyle="light-content" />
      <Main />
    </>
  );
};

const styles = StyleSheet.create({
  
});

export default App;
