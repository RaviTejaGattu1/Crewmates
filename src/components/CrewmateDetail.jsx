import { useParams, useNavigate } from 'react-router-dom';
import './CrewmateDetail.css';

const CrewmateDetail = ({ crewmates }) => {
  const { id } = useParams();
  const crewmate = crewmates.find((c) => c.id === parseInt(id));
  const navigate = useNavigate();

  if (!crewmate) return <div>Crewmate not found!</div>;

  return (
    <div className="detail">
      <h1 className="detail-title">Crewmate: {crewmate.name}</h1>
      <h2 className="detail-subtitle">Stats:</h2>
      <p>Color: {crewmate.color}</p>
      <p>Speed: {crewmate.speed} mph</p>
      <p className="detail-message">
        {crewmate.speed < 2.5
          ? `You may want to find a Crewmate with more speed, this one is kinda slow 😓`
          : `This Crewmate is speedy! 🚀`}
      </p>
      <button
        onClick={() => navigate(`/update/${crewmate.id}`)}
        className="detail-button"
      >
        Wanna edit this Crewmate?
      </button>
    </div>
  );
};

export default CrewmateDetail;