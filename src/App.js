import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import './App.css';
import { MainPage } from './modules/MainPage';
import { Profile } from './modules/Profile';

function App() {
  return (
    <>
     <Router>
        <Routes>
          <Route exact path="/" element={<MainPage/>} />
          <Route exact path="/profile" element={<Profile/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
