import React from 'react';

import { Provider } from 'react-redux';
import store from '../store';

import FormContainer from './FormContainer';
import TodoListContainer from './TodoListContainer';

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <FormContainer />     
        <TodoListContainer />
      </div>
    </Provider>
  )
}

export default App;