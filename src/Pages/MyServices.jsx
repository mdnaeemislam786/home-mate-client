import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, MapPin, Clock, Edit, Trash2, Eye, Plus } from "lucide-react";
import { Link } from "react-router";
import Loading from "../Components/Loading";
import { AuthContext } from "../Context/AuthContext";

const MyServices = () => {
  const { user } = useContext(AuthContext);
  const email = user.email;
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingService, setEditingService] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  // Fetch services from your JSON file
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("http://localhost:3000/my-booking", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });

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
  }, [email]);

  // Handle Update Service
  const handleUpdateService = async (serviceId, updatedData) => {
    try {
      const response = await fetch(
        `http://localhost:3000/services/${serviceId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update service");
      }

      // Update local state
      setServices((prev) =>
        prev.map((service) =>
          service._id === serviceId ? { ...service, ...updatedData } : service
        )
      );

      setEditingService(null);
      alert("Service updated successfully!");
    } catch (err) {
      alert("Error updating service: " + err.message);
    }
  };
  // Handle Delete Service
  const handleDeleteService = async (serviceId) => {
    //   console.log(serviceId);
    try {
      const response = await fetch(
        `http://localhost:3000/services/${serviceId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete service");
      }

      // Remove from local state
      setServices((prev) =>
        prev.filter((service) => service._id !== serviceId)
      );
      setShowDeleteConfirm(null);
      alert("Service deleted successfully!");
    } catch (err) {
      alert("Error deleting service: " + err.message);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const rowVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
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

//   console.log(editingService);
  return (
    <div className="min-h-screen bg-light py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            My Services
          </h1>
          <p className="text-xl text-secondary max-w-2xl mx-auto">
            Manage your service listings and track performance
          </p>
        </motion.div>

        {/* Add Service Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-between items-center mb-8"
        >
          <div className="text-lg text-secondary">
            Total Services:{" "}
            <span className="font-bold text-primary">{services.length}</span>
          </div>
          <Link
            to="/add-service"
            className="btn-custom flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add New Service
          </Link>
        </motion.div>

        {/* Services Table */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-3xl shadow-lg border border-muted overflow-hidden"
        >
          {/* Table Header - Hidden on mobile */}
          <div className="hidden md:grid grid-cols-12 gap-4 p-6 bg-primary text-light font-semibold rounded-t-3xl">
            <div className="col-span-5">Service Info</div>
            <div className="col-span-2">Category</div>
            <div className="col-span-1 text-center">Price</div>
            <div className="col-span-2 text-center">Rating</div>
            <div className="col-span-2 text-center">Actions</div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-muted">
            {services.map((service, index) => (
              <motion.div key={service._id} variants={rowVariants}>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 md:p-6 items-center hover:bg-light/50 transition-colors">
                  {/* Service Info - Full width on mobile */}
                  <div className="md:col-span-5">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0">
                        <img
                          src={service.image}
                          alt={service.serviceName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-primary text-lg truncate">
                          {service.serviceName}
                        </h3>

                        {/* Mobile-only info */}
                        <div className="md:hidden flex flex-wrap gap-2 mt-3">
                          <span className="bg-secondary text-primary px-3 py-1 rounded-full text-sm font-semibold">
                            {service.category}
                          </span>
                          <span className="bg-primary text-light px-3 py-1 rounded-full text-sm font-semibold">
                            ${service.price}
                          </span>
                          <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-full">
                            <Star className="w-3 h-3 text-yellow-400 fill-current" />
                            <span className="text-sm font-semibold text-gray-700">
                              {service.rating}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Category - Hidden on mobile */}
                  <div className="hidden md:block md:col-span-2">
                    <span className="bg-secondary text-primary px-3 py-1 rounded-full text-sm font-semibold">
                      {service.category}
                    </span>
                  </div>

                  {/* Price - Hidden on mobile */}
                  <div className="hidden md:block md:col-span-1 text-center">
                    <span className="text-primary font-bold text-lg">
                      ${service.price}
                    </span>
                  </div>

                  {/* Rating - Hidden on mobile */}
                  <div className="hidden md:block md:col-span-2 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-primary font-semibold">
                        {service.rating}
                      </span>
                      <span className="text-secondary text-sm">/5</span>
                    </div>
                  </div>

                  {/* Actions - Full width on mobile */}
                  <div className="md:col-span-2">
                    <div className=" md:hidden pb-3">
                      <span className=" text-secondary font-bold">
                        Description
                      </span>
                      <p className="text-secondary font-semibold text-sm mt-1 line-clamp-6">
                        {service.description}
                      </p>
                    </div>
                    <div className="flex justify-center gap-2">
                      {/* Edit Button */}
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setEditingService(service)}
                        className="p-2 bg-blue-100 text-blue-600 rounded-xl hover:bg-blue-200 transition-colors flex-1 md:flex-none"
                        title="Edit Service"
                      >
                        <Edit className="w-4 h-4 mx-auto" />
                        <span className="text-xs mt-1 md:hidden">Update</span>
                      </motion.button>

                      {/* Delete Button */}
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setShowDeleteConfirm(service._id)}
                        className="p-2 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition-colors flex-1 md:flex-none"
                        title="Delete Service"
                      >
                        <Trash2 className="w-4 h-4 mx-auto" />
                        <span className="text-xs mt-1 md:hidden">Delete</span>
                      </motion.button>
                    </div>
                  </div>
                </div>
                <div className=" hidden md:block px-6 pb-6 -mt-4 items-center">
                  <h1 className="font-bold text-secondary">Description</h1>
                  <p className="text-secondary text-sm mt-1 line-clamp-5">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Edit Service Modal */}
        {editingService && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <h3 className="text-2xl font-bold text-primary mb-6">
                Edit Service
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-primary font-semibold mb-2">
                    Service Name
                  </label>
                  <input
                    type="text"
                    defaultValue={editingService.serviceName}
                    className="w-full bg-light border border-muted rounded-2xl px-4 py-3 text-primary focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-primary font-semibold mb-2">
                    Image URL
                  </label>
                  <input
                    type="text"
                    defaultValue={editingService.image}
                    className="w-full bg-light border border-muted rounded-2xl px-4 py-3 text-primary focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-primary font-semibold mb-2">
                    Description
                  </label>
                  <textarea
                    defaultValue={editingService.description}
                    rows="3"
                    className="w-full bg-light border border-muted rounded-2xl px-4 py-3 text-primary focus:outline-none focus:border-primary resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-primary font-semibold mb-2">
                      Price
                    </label>
                    <input
                      type="number"
                      defaultValue={editingService.price}
                      className="w-full bg-light border border-muted rounded-2xl px-4 py-3 text-primary focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-primary font-semibold mb-2">
                      Category
                    </label>
                    <input
                      type="text"
                      defaultValue={editingService.category}
                      className="w-full bg-light border border-muted rounded-2xl px-4 py-3 text-primary focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <button
                  onClick={() => setEditingService(null)}
                  className="flex-1 bg-secondary text-primary font-semibold py-3 rounded-2xl hover:bg-secondary/80 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() =>
                    handleUpdateService(editingService._id, {
                      serviceName:
                        document.querySelector('input[type="text"]').value,
                      description: document.querySelector("textarea").value,
                      price: parseFloat(
                        document.querySelector('input[type="number"]').value
                      ),
                      rating: parseFloat(
                        document.querySelector(
                          'input[type="number"]:last-child'
                        ).value
                      ),
                    })
                  }
                  className="flex-1 btn-custom"
                >
                  Update Service
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full text-center"
            >
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-8 h-8 text-red-600" />
              </div>

              <h3 className="text-2xl font-bold text-primary mb-2">
                Delete Service
              </h3>
              <p className="text-secondary mb-6">
                Are you sure you want to delete this service? This action cannot
                be undone.
              </p>

              <div className="flex gap-4">
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="flex-1 bg-secondary text-primary font-semibold py-3 rounded-2xl hover:bg-secondary/80 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteService(showDeleteConfirm)}
                  className="flex-1 bg-red-600 text-white font-semibold py-3 rounded-2xl hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Empty State */}
        {services.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 bg-white rounded-3xl shadow-lg border border-muted"
          >
            <div className="text-6xl mb-4">🏠</div>
            <h3 className="text-2xl font-bold text-primary mb-2">
              No Services Found
            </h3>
            <p className="text-secondary mb-6">
              You haven't added any services yet. Start by adding your first
              service!
            </p>
            <Link
              to="/add-service"
              className="btn-custom inline-flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add Your First Service
            </Link>
          </motion.div>
        )}

        {/* Back to All Services */}
        {services.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-12"
          >
            <Link
              to="/services"
              className="btn-custom inline-flex items-center gap-2"
            >
              <Eye className="w-5 h-5" />
              View All Public Services
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MyServices;
