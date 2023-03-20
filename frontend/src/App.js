import './App.css';
import Header from './components/Header';
import NotesListPage from './pages/NotesListPage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from './components/NotFound';
import NotePage from "./pages/NotePage"

function App() {
  return (
    <Router>
      <div className="container">
        <div className="App">
          <Header />
          <Routes>
            <Route path='/' exact element={<NotesListPage />} />
            <Route path='/note/:id' element={<NotePage />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
