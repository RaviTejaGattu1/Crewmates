import './Home.css';

const Home = () => (
  <div className="home">
    <h1 className="home-title">Welcome to the Crewmate Creator!</h1>
    <p className="home-text">
      Here is where you can create your very own set of crewmates before
      sending them off into space!
    </p>
    <img
      src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExZTB3NmNvMm5vZGloaTlkYjhxNmxjdjk1a2syNGl3MnViazVtbWZoMiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ZrlYxeVZ0zqkU/giphy.gif"
      alt="Crewmates"
      className="home-img"
    />
  </div>
);

export default Home;