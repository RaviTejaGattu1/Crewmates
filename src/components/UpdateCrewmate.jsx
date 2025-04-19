import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './UpdateCrewmate.css';

const COLORS = [
  'Red',
  'Green',
  'Blue',
  'Purple',
  'Yellow',
  'Orange',
  'Pink',
  'Rainbow',
];

const CATEGORIES = ['None', 'Engineer', 'Pilot'];

const UpdateCrewmate = ({ crewmates, updateCrewmate, deleteCrewmate }) => {
  const { id } = useParams();
  const crewmate = crewmates.find((c) => c.id === parseInt(id));
  const [category, setCategory] = useState(crewmate?.category || 'None');
  const [name, setName] = useState(crewmate?.name || '');
  const [speed, setSpeed] = useState(crewmate?.speed || '');
  const [color, setColor] = useState(crewmate?.color || '');
  const navigate = useNavigate();

  useEffect(() => {
    if (crewmate) {
      setCategory(crewmate.category || 'None');
      setName(crewmate.name);
      setSpeed(crewmate.speed);
      setColor(crewmate.color);
    }
  }, [crewmate]);

  if (!crewmate) return <div>Crewmate not found!</div>;

  const handleSpeedChange = (e) => {
    const value = e.target.value;
    if (category === 'Engineer' && value > 3) {
      alert('Engineers cannot have a speed greater than 3 mph!');
      return;
    }
    if (category === 'Pilot' && value < 2) {
      alert('Pilots must have a speed of at least 2 mph!');
      return;
    }
    setSpeed(value);
  };

  const handleUpdate = () => {
    console.log('Updating crewmate with id:', crewmate.id, {
      name,
      speed: parseFloat(speed),
      color,
      category,
    });
    updateCrewmate(crewmate.id, {
      name,
      speed: parseFloat(speed),
      color,
      category,
    });
    navigate('/gallery');
  };
  
  const handleDelete = () => {
    console.log('Deleting crewmate with id:', crewmate.id);
    deleteCrewmate(crewmate.id);
    navigate('/gallery');
  };

  return (
    <div className="update-crewmate">
      <h1 className="update-title">Update Your Crewmate :)</h1>
      <p className="update-info">
        Current Crewmate Info: Name: {crewmate.name}, Speed: {crewmate.speed}, Color: {crewmate.color}, Category: {crewmate.category || 'None'}
      </p>
      <div className="update-form">
        <div className="form-section">
          <label className="form-label">Category:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="form-input"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div className="form-section">
          <label className="form-label">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-input"
          />
        </div>
        <div className="form-section">
          <label className="form-label">Speed (mph):</label>
          <input
            type="number"
            value={speed}
            onChange={handleSpeedChange}
            className="form-input"
          />
        </div>
        <div className="form-section">
          <label className="form-label">Color:</label>
          <div className="color-options">
            {COLORS.map((c) => (
              <label key={c} className="color-option">
                <input
                  type="radio"
                  name="color"
                  value={c}
                  checked={color === c}
                  onChange={(e) => setColor(e.target.value)}
                  className="color-radio"
                />
                {c}
              </label>
            ))}
          </div>
        </div>
      </div>
      <div className="update-actions">
        <button onClick={handleUpdate} className="update-button">
          Update Crewmate
        </button>
        <button onClick={handleDelete} className="delete-button">
          Delete Crewmate
        </button>
      </div>
    </div>
  );
};

export default UpdateCrewmate;