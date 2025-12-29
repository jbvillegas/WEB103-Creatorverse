import './css/index.css';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import NavBar from './components/NavBar.jsx';
import ShowCreators from './pages/showCreators.jsx';
import AddCreator from './pages/addCreator';
import EditCreator from './pages/editCreator.jsx';
import ViewCreator from './pages/viewCreators.jsx';
import Footer from './components/Footer.jsx';

function App() {

  return (
    <>
      <div className="gradients-bg">
        <svg xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="goo">
              <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
              <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="goo" />
              <feBlend in="SourceGraphic" in2="goo" />
            </filter>
          </defs>
        </svg>
        <div className="gradients-container">
          <div className="g1"></div>
          <div className="g2"></div>
          <div className="g3"></div>
          <div className="g4"></div>
          <div className="g5"></div>
          <div className="interactive"></div>
        </div>
      </div>
      <div style={{ position: 'relative', zIndex: 1 }}>
        <NavBar />
        <Toaster position="top-center" toastOptions={{
          duration: 3000
        }} />
        <Routes>
          <Route path="/" element={<ShowCreators />} />
          <Route path="/add" element={<AddCreator />} />
          <Route path="/edit/:id" element={<EditCreator />} />
          <Route path="/view/:id" element={<ViewCreator />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
