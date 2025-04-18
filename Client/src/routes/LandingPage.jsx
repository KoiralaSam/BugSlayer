import book from "../../asset/image.jpg";
import { Outlet } from "react-router";
import NavBar from "../components/NavBar";
function LandingPage() {
  return (
    <div
      className="flex flex-col w-full min-h-screen bg-left"
      style={{ backgroundImage: `url(${book})` }}
    >
      <NavBar />
      <section className="box-border w-full overflow-hidden relative">
        <div className="relative pt-[150px] pl-10">
          <h1 className="text-[70px] font-bold">
            Give Books a <br />
            Second Life
          </h1>
          <p className="w-[600px] mt-5">
            Our platform connects book lovers who want to recycle, donate, or
            exchange their pre-loved books. Whether you’re clearing your shelf
            or hunting for your next great read, we make it easy to give books a
            new home. Save the planet, one book at a time.
          </p>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
