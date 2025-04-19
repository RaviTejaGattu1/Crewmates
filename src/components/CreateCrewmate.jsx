import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateCrewmate.css';

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

const CreateCrewmate = ({ addCrewmate }) => {
  const [category, setCategory] = useState('None');
  const [name, setName] = useState('');
  const [speed, setSpeed] = useState('');
  const [color, setColor] = useState('');
  const navigate = useNavigate();

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && speed && color) {
      addCrewmate({ name, speed: parseFloat(speed), color, category });
      navigate('/gallery');
    }
  };

  return (
    <div className="create-crewmate">
      <h1 className="create-title">Create a New Crewmate</h1>
      <div className="create-form">
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
            placeholder="Enter crewmate's name"
            className="form-input"
          />
        </div>
        <div className="form-section">
          <label className="form-label">Speed (mph):</label>
          <input
            type="number"
            value={speed}
            onChange={handleSpeedChange}
            placeholder="Enter speed in mph"
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
      <button onClick={handleSubmit} className="create-button">
        Create Crewmate
      </button>
    </div>
  );
};

export default CreateCrewmate;