// import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { Link, useLocation } from 'react-router';
import { AuthContext } from '../../Context/AuthContext';
import { toast } from 'react-toastify';

    const Navbar = () => {
      const {user, logoutUser} = useContext(AuthContext)

      console.log(user);

      // const user = false
      const location = useLocation();
      const links = <>
      <li><Link to="/" >Home</Link></li>
      <li><Link to="/services" className=''>Services</Link></li>
      
      {user && (
          <>
          <li><Link to="/my-services" className="">My Services</Link></li>
          <li><Link to="/add-service" className="">Add Service</Link></li>
          <li><Link to="/my-bookings" className="">My Bookings</Link></li>
          </>
      )}
      </>



    const handleLogout = () => {
    logoutUser()
    .then(() => {
      toast.success('SignOut successfull')
    })
    .catch((err) => {
      toast.error(err);
    })
    };

  return (
    <div className='bg-base-100 shadow-lg'>
      <div className="navbar bg-base-100  max-w-[1920px] m-auto sticky top-0 z-50 ">
        {/* Logo Section */}
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}

            </ul>
          </div>
          <Link to="/" className="btn btn-ghost text-xl">
            <img 
              src="/logo.png" 
              alt="Logo" 
              className="w-8 h-8 mr-2"
            />
            HomeMate
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li><Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link></li>
            <li><Link to="/services" className={location.pathname === '/services' ? 'active' : ''}>Services</Link></li>
            
            {user && (
              <>
                <li><Link to="/my-services" className={location.pathname === '/my-services' ? 'active' : ''}>My Services</Link></li>
                <li><Link to="/add-service" className={location.pathname === '/add-service' ? 'active' : ''}>Add Service</Link></li>
                <li><Link to="/my-bookings" className={location.pathname === '/my-bookings' ? 'active' : ''}>My Bookings</Link></li>
              </>
            )}
          </ul>
        </div>

        {/* User Section */}
        <div className="navbar-end">
          {user ? (
            // User is logged in - Show profile dropdown
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 border border-blue-500 rounded-full">
                  <img
                    alt="Profile"
                    src={user.photoURL || '/default-avatar.png'}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link to="/profile" className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </Link>
                </li>
                <li><a>Settings</a></li>
                <li><button onClick={handleLogout}>Logout</button></li>
              </ul>
            </div>
          ) : (
            // User is not logged in - Show login/register buttons
            <div className="flex gap-2">
              <Link to="/auth" className="btn btn-primary btn-sm">
                Login
              </Link>
              <Link to="/auth/register" className="btn btn-outline btn-sm">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;