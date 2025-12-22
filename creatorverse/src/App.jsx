import './css/index.css';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar.jsx';
import ShowCreators from './pages/showCreators.jsx';
import AddCreator from './pages/addCreator';
import EditCreator from './pages/editCreator.jsx';
import ViewCreator from './pages/viewCreators.jsx';
import Footer from './components/Footer.jsx';

function App() {
  return (
    <div className="app-wrapper">
      <NavBar />
      <Routes>
        <Route path="/" element={<ShowCreators />} />
        <Route path="/add" element={<AddCreator />} />
        <Route path="/edit/:id" element={<EditCreator />} />
        <Route path="/view/:id" element={<ViewCreator />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
