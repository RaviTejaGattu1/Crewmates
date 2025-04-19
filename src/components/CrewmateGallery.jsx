import { Link } from 'react-router-dom';
import './CrewmateGallery.css';

const CrewmateGallery = ({ crewmates }) => {
  const colorMap = {
    Red: 'red',
    Green: 'green',
    Blue: 'blue',
    Purple: 'purple',
    Yellow: 'yellow',
    Orange: 'orange',
    Pink: 'pink',
    Rainbow: 'linear-gradient(90deg, red, orange, yellow, green, blue, purple)',
  };

  // Calculate statistics
  const totalCrewmates = crewmates.length;
  const colorStats = {};
  const categoryStats = {};

  crewmates.forEach((crewmate) => {
    colorStats[crewmate.color] = (colorStats[crewmate.color] || 0) + 1;
    const category = crewmate.category || 'None';
    categoryStats[category] = (categoryStats[category] || 0) + 1;
  });

  const colorPercentages = Object.keys(colorStats).map((color) => ({
    color,
    percentage: ((colorStats[color] / totalCrewmates) * 100).toFixed(1),
  }));

  const categoryPercentages = Object.keys(categoryStats).map((category) => ({
    category,
    percentage: ((categoryStats[category] / totalCrewmates) * 100).toFixed(1),
  }));

  // Calculate success metric: average speed
  const averageSpeed =
    totalCrewmates > 0
      ? crewmates.reduce((sum, c) => sum + c.speed, 0) / totalCrewmates
      : 0;
  const isSuccessful = averageSpeed > 2.5;

  return (
    <div className="gallery">
      <h1 className="gallery-title">Your Crewmate Gallery!</h1>
      {crewmates.length === 0 ? (
        <div>
          <p className="gallery-empty">You haven't made a crewmate yet!</p>
          <Link to="/create" className="gallery-create-link">
            Create one here!
          </Link>
        </div>
      ) : (
        <>
          <div className="gallery-stats">
            <h2 className="stats-title">Crew Statistics</h2>
            <h3>Percentage by Color:</h3>
            {colorPercentages.map(({ color, percentage }) => (
              <p key={color}>
                {color}: {percentage}%
              </p>
            ))}
            <h3>Percentage by Category:</h3>
            {categoryPercentages.map(({ category, percentage }) => (
              <p key={category}>
                {category}: {percentage}%
              </p>
            ))}
            <h3>Success Metric:</h3>
            <p>
              Average Speed: {averageSpeed.toFixed(1)} mph -{' '}
              {isSuccessful
                ? 'Your crew is speedy and ready for action! 🚀'
                : 'Your crew might need more speed training! 🐢'}
            </p>
          </div>
          <div
            className="gallery-grid"
            style={{
              boxShadow: isSuccessful
                ? '0 0 10px 5px green'
                : '0 0 10px 5px red',
            }}
          >
            {crewmates
              .sort((a, b) => b.createdAt - a.createdAt)
              .map((crewmate) => (
                <div
                  key={crewmate.id}
                  className="gallery-item"
                  style={{
                    border: `2px solid`,
                    borderImage: crewmate.color === 'Rainbow' ? colorMap[crewmate.color] + ' 1' : undefined,
                    borderColor: crewmate.color !== 'Rainbow' ? colorMap[crewmate.color] : undefined,
                  }}
                >
                  <img
                    src="/assets/crewmate-icon.png"
                    alt="Crewmate"
                    className="gallery-item-img"
                  />
                  <p>Name of Crewmate: {crewmate.name}</p>
                  <p>Speed of Crewmate: {crewmate.speed} mph</p>
                  <p>Color of Crewmate: {crewmate.color}</p>
                  <p>Category: {crewmate.category || 'None'}</p>
                  <Link
                    to={`/crewmate/${crewmate.id}`}
                    className="gallery-item-button"
                  >
                    Edit Crewmate
                  </Link>
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CrewmateGallery;