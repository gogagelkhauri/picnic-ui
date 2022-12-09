import Home from './Home';
import Navbar from './Navbar';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import NotFound from './NotFound';
import QuestionDetails from './QuestionDetails';

function App() {
  return (
    <div className="App">
       <Router>
      <div className="App">
        <Navbar/>
        <div className="content">
          <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/questions/:title" element={<QuestionDetails/>} />
              <Route path="*" element={<NotFound/>} />
          </Routes>
        </div>
      </div>
    </Router>
    </div>
  );
}

export default App;
