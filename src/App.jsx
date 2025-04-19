import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import CreateCrewmate from './components/CreateCrewmate';
import CrewmateGallery from './components/CrewmateGallery';
import CrewmateDetail from './components/CrewmateDetail';
import UpdateCrewmate from './components/UpdateCrewmate';
import './App.css';

const App = () => {
  const [crewmates, setCrewmates] = useState([]);

  const addCrewmate = (crewmate) => {
    setCrewmates([
      { ...crewmate, id: Date.now(), createdAt: new Date() },
      ...crewmates,
    ]);
  };

  const updateCrewmate = (id, updatedCrewmate) => {
    console.log('updateCrewmate called with id:', id, 'updatedCrewmate:', updatedCrewmate);
    setCrewmates(
      crewmates.map((c) => {
        console.log('Comparing:', c.id, 'with', id, 'match:', c.id === id);
        return c.id === id ? { ...c, ...updatedCrewmate } : c;
      })
    );
  };
  
  const deleteCrewmate = (id) => {
    console.log('deleteCrewmate called with id:', id);
    setCrewmates(crewmates.filter((c) => {
      console.log('Comparing:', c.id, 'with', id, 'match:', c.id !== id);
      return c.id !== id;
    }));
  };

  return (
    <BrowserRouter>
      <div className="app-container">
        {/* Sidebar */}
        <div className="sidebar">
          <nav className="sidebar-nav">
            <Link to="/" className="sidebar-link">
              Home
            </Link>
            <Link to="/create" className="sidebar-link">
              Create a Crewmate!
            </Link>
            <Link to="/gallery" className="sidebar-link">
              Crewmate Gallery
            </Link>
          </nav>
          <div className="sidebar-icon">
            <img
              src="/assets/crewmate-icon.png"
              alt="Crewmate Icon"
              className="sidebar-icon-img"
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/create"
              element={<CreateCrewmate addCrewmate={addCrewmate} />}
            />
            <Route
              path="/gallery"
              element={<CrewmateGallery crewmates={crewmates} />}
            />
            <Route
              path="/crewmate/:id"
              element={<CrewmateDetail crewmates={crewmates} />}
            />
            <Route
              path="/update/:id"
              element={
                <UpdateCrewmate
                  crewmates={crewmates}
                  updateCrewmate={updateCrewmate}
                  deleteCrewmate={deleteCrewmate}
                />
              }
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;