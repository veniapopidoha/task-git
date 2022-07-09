import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { MainPage } from './modules/MainPage';
import { Profile } from './modules/Profile';

function App() {
  const initialState = {
    input: '',
    loadedUsers: [],
    loadedRepos: [],
    allData: [],
  };

  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_INPUT_VALUE':
        return { ...state, input: action.payload };
      case 'ON_LOAD_USERS':
        return { ...state, loadedUsers: action.payload };
      case 'RESET_REPO':
        return { ...state, allData: action.payload };
      case 'LOADED_REPO':
        return {
          ...state,
          loadedRepos: Array.from(state.allData).push.apply(
            state.allData,
            action.payload
          ),
        };
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
