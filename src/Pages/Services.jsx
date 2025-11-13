import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, MapPin, Clock } from "lucide-react";
import { FaBookOpen, FaSearch } from "react-icons/fa";
import Loading from "../Components/Loading";
import { Link } from "react-router";
import { FaFilter } from "react-icons/fa6";

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch services from your JSON file
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("http://localhost:3000/services");
        if (!response.ok) {
          throw new Error("Failed to fetch services");
        }
        const data = await response.json();
        setServices(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const handleSearchResults = async (event) => {
    // event.preventDefault();
    const query = event.target.search.value;
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/services/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) throw new Error("Search failed");

      const data = await response.json();
      setServices(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


const handlePriceFilter = async (min, max) => {
  setLoading(true);
  try {
    const response = await fetch("http://localhost:3000/services/filter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ min, max }),
    });

    if (!response.ok) throw new Error("Filter failed");

    const data = await response.json();
    setServices(data); // ✅ filtered result set করো
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};






  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
    hover: {
      y: -10,
      scale: 1.02,
      boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
      },
    },
  };

  const starVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.2,
      rotate: [0, -10, 10, 0],
      transition: { duration: 0.3 },
    },
  };

  if (loading) {
    return <Loading></Loading>;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-light flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-xl">Error: {error}</p>
          <p className="text-muted mt-2">
            Please check if the server is running
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 flex flex-col items-center justify-between "
        >
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Our All Services
          </h1>
          <p className="text-xl text-secondary max-w-2xl mx-auto">
            Discover professional home services from trusted providers in your
            area
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-center mt-5">
            {/* Search Input with Icon */}
            <div className="flex-1 w-full sm:max-w-md">
              <form onSubmit={handleSearchResults} className="relative">
                <FaSearch className=" absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary"></FaSearch>
                <input 
                  name="search"
                  type="text" 
                  placeholder="Search for services..."
                  className="w-full bg-light border border-muted rounded-2xl pl-12 pr-24 py-3 text-primary focus:outline-none focus:border-primary transition-colors"
                />
                <button 
                 className="btn-custom absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-2 text-sm">
                  Search
                </button>
              </form>
            </div>

            {/* Filter Dropdown with Icon */}
            <div className="w-full sm:w-auto">
              <details className="dropdown">
                <summary className="bg-secondary text-primary font-semibold py-3 px-6 rounded-2xl hover:bg-secondary/80 transition-colors cursor-pointer list-none flex items-center gap-2">
                <FaFilter></FaFilter>
                  Filter
                </summary>
                  <ul
                      tabIndex="-1"
                      className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                      <li className="text-primary font-semibold underline">Filter by price</li>
                      <li>
                        <button onClick={() => handlePriceFilter(0, 50)}>
                          Filter $0–$50
                        </button>
                        <button onClick={() => handlePriceFilter(50, 100)}>
                          Filter $50–$100
                        </button>
                        <button onClick={() => handlePriceFilter(100, 500)}>
                          Filter $100–$500
                        </button>
                        <button onClick={() => handlePriceFilter(500, 10000)}>
                          Filter $500–$10000
                        </button>
                      </li>
                  </ul>
              </details>
            </div>
          </div>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={service._id}
              variants={cardVariants}
              whileHover="hover"
              className="bg-white rounded-3xl overflow-hidden shadow-lg border border-muted"
            >
              {/* Service Image */}
              <div className="relative h-48 overflow-hidden">
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                  src={service.image}
                  alt={service.serviceName}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4">
                  <motion.span
                    whileHover={{ scale: 1.1 }}
                    className="bg-primary text-light px-3 py-1 rounded-full text-sm font-semibold"
                  >
                    ${service.price}
                  </motion.span>
                </div>
                <div className="absolute top-4 left-4">
                  <span className="bg-secondary text-primary px-3 py-1 rounded-full text-sm font-semibold">
                    {service.category}
                  </span>
                </div>
              </div>

              {/* Service Content */}
              <div className="p-6">
                {/* Service Header */}
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-primary">
                    {service.serviceName}
                  </h3>
                  <motion.div
                    variants={starVariants}
                    whileHover="hover"
                    className="flex items-center bg-yellow-50 px-2 py-1 rounded-full"
                  >
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-semibold text-gray-700 ml-1">
                      {service.rating}
                    </span>
                  </motion.div>
                </div>

                {/* Provider Info */}
                <div className="flex items-center mb-4">
                  <div>
                    <p className="text-primary font-bold">
                      {service.providerName}
                    </p>
                    <p className="text-secondary text-sm">{service.email}</p>
                  </div>
                </div>
                {/* Features */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="flex items-center text-sm text-secondary">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>Available</span>
                  </div>
                  <div className="flex items-center text-sm text-secondary">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>Quick Service</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <Link to={`/services/${service._id}`}>
                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="btn-custom flex-1 text-center"
                    >
                      Details
                    </motion.button>
                  </div>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {services.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">🏠</div>
            <h3 className="text-2xl font-bold text-primary mb-2">
              No Services Available
            </h3>
            <p className="text-secondary">
              Check back later for new service offerings
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Services;
