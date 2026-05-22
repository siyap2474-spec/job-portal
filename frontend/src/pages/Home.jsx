import backgroundImg from "../assets/hero1.png";

function Home() {
  return (
    <div
      className="h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
    </div>
  );
}

export default Home;