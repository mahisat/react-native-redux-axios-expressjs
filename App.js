import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import {rootReducer} from './src/reducers';
import MainNavigation from './src/navigations/MainNavigation';
import ReduxThunk from 'redux-thunk';

const store = createStore(rootReducer, {}, applyMiddleware(ReduxThunk));

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaView style={{flex: 1}}>
        <MainNavigation />
      </SafeAreaView>
    </Provider>
  );
};

export default App;
