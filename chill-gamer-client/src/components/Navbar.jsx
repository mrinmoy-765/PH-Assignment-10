import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider"; // adjust path as needed
import Swal from "sweetalert2";

const Navbar = () => {
  const { firebaseUser, mongoUser, logOut } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    logOut()
      .then(() => {
        Swal.fire("Logged out!", "", "success");
        navigate("/");
      })
      .catch((error) => console.error(error));
  };

  const navLinks = (
    <>
      <li>
        <NavLink to="/" className="hover:text-[#DBD8E3]">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/reviews" className="hover:text-[#DBD8E3]">
          All Reviews
        </NavLink>
      </li>
      {firebaseUser && (
        <>
          <li>
            <NavLink to="/addReview" className="hover:text-[#DBD8E3]">
              Add Review
            </NavLink>
          </li>
          <li>
            <NavLink to="/myReviews" className="hover:text-[#DBD8E3]">
              My Reviews
            </NavLink>
          </li>
          <li>
            <NavLink to="/watchlist" className="hover:text-[#DBD8E3]">
              Game WatchList
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="bg-[#2A2438] text-white">
      <div className="navbar max-w-7xl mx-auto flex justify-between items-center px-4 py-3">
        <div className="flex items-center gap-2">
          <Link to="/" className="text-xl font-bold text-[#DBD8E3]">
            🎮 Chill Gamer
          </Link>
        </div>

        <div className="hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-3">{navLinks}</ul>
        </div>

        <div className="flex items-center gap-3">
          {!firebaseUser ? (
            <>
              <Link
                to="/signIn"
                className="btn btn-sm bg-[#5C5470] border-none hover:bg-[#352F44] text-white"
              >
                Login
              </Link>
              <Link
                to="/signUp"
                className="btn btn-sm bg-[#5C5470] border-none hover:bg-[#352F44] text-white"
              >
                Register
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <div
                className="tooltip tooltip-bottom"
                data-tip={mongoUser?.name || firebaseUser.email || "User"}
                //data-tip={mongoUser.name || "User"}
              >
                <div className="avatar online">
                  <div className="w-10 rounded-full ring ring-offset-base-100 ring-offset-2">
                    <img
                      src={
                        mongoUser?.photoURL ||
                        "https://i.ibb.co/S32HNjD/default-avatar.png"
                      }
                      alt="User"
                    />
                  </div>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="btn btn-sm bg-[#5C5470] border-none hover:bg-[#352F44] text-white"
              >
                Log Out
              </button>
            </div>
          )}
        </div>

        {/* Mobile View Dropdown */}
        <div className="dropdown lg:hidden">
          <label tabIndex={0} className="btn btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#DBD8E3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu dropdown-content mt-3 z-[1] p-2 shadow bg-[#352F44] rounded-box w-52"
          >
            {navLinks}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
