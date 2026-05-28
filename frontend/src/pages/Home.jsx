import backgroundImg from "../assets/hero1.png";

function Home() {

  return (

    <div
      className="
        min-h-screen
        bg-cover
        bg-center
        bg-no-repeat
        flex
        items-center
        justify-center
        px-4
      "
      style={{
        backgroundImage: `url(${backgroundImg})`,
      }}
    >

      {/* OPTIONAL OVERLAY CONTENT */}
      <div className="text-center text-white">

        <h1 className="text-4xl md:text-6xl font-bold drop-shadow-lg">
          Find Your Dream Job
        </h1>

        <p className="mt-4 text-lg md:text-2xl drop-shadow-md">
          Connect recruiters and candidates easily
        </p>

      </div>

    </div>

  );
}

export default Home;