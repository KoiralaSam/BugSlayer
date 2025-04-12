<<<<<<< HEAD
import NavBar from "../components/NavBar"
import Books from "../../asset/bookbg.avif"

=======
import book from "../../asset/bookbg.avif";
import { Outlet } from "react-router";
import NavBar from "../components/NavBar";
>>>>>>> master
function LandingPage() {
  return (
    <div
      className="flex flex-col w-full min-h-screen bg-cover bg-center"
<<<<<<< HEAD
      style={{ backgroundImage: `url(${Books})` }}
=======
      style={{ backgroundImage: `url(${book})` }}
>>>>>>> master
    >
      <NavBar />
      <section className="box-border w-full overflow-hidden relative">
        <div className="relative pt-[200px] pl-10">
          <h1 className="text-[60px] font-semibold">
            Give Books a <br />
            Second Life
          </h1>
<<<<<<< HEAD
          <p className="w-[600px] mt-20">
=======
          <p className="w-[600px] mt-50">
>>>>>>> master
            Our platform connects book lovers who want to recycle, donate, or
            exchange their pre-loved books. Whether you’re clearing your shelf
            or hunting for your next great read, we make it easy to give books a
            new home. Save the planet, one book at a time.
          </p>
        </div>
      </section>
    </div>
<<<<<<< HEAD
  )
}

export default LandingPage
=======
  );
}

export default LandingPage;
>>>>>>> master
