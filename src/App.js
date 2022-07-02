import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { MainPage } from './modules/MainPage';
import { Profile } from './modules/Profile';

function App() {
  const defaultState = {
    input: '',
    loadedUsers: [],
  };

  const reducer = (state = defaultState, action) => {
    switch (action.type) {
      case 'INPUT_VALUE':
        return { ...state, input: action.payload };
      case 'LOADED_USERS':
        return { ...state, loadedUsers: action.payload };
      default:
        return state;
    }
  };

  const store = createStore(reducer);

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route exact path='/' element={<MainPage />} />
          <Route exact path='/profile' element={<Profile />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
