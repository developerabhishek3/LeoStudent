import React from 'react';
import {SafeAreaView} from 'react-native';
import Appcontainer from './src/router/index';
class App extends React.Component {
  render() {
    return (
      <SafeAreaView style={{ flex:1}}>
        <Appcontainer />
      </SafeAreaView>
    );
  }
}
export default App;