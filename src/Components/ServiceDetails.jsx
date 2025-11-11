import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { Star, User, Mail, ArrowLeft } from "lucide-react";
import { Link, Navigate, useLoaderData, useNavigate } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import { h1 } from "framer-motion/client";
import { FaBookOpen, FaMailchimp } from "react-icons/fa";
import { toast } from "react-toastify";

const ServiceDetails = () => {
  const { user } = useContext(AuthContext);
    const navigate = useNavigate();
  const data = useLoaderData();

  // console.log(data);

  // Options for formatting
  const now = new Date();
  const options = {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };
  const formatted = now.toLocaleString("en-US", options);
  // console.log(formatted); // Output: "11 November 2025, 8:52 PM"

  const bookingdata = {
    email: user.email,
    category: data.category,
    description: data.description,
    providerEmail: data.email,
    image: data.image,
    price: data.price,
    providerName: data.providerName,
    rating: data.rating,
    serviceName: data.serviceName,
    bookingTime: formatted,
  };

  // console.log(bookingdata);

  const service = {
    _id: data._id,
    serviceName: data.serviceName,
    category: data.category,
    price: data.price,
    description: data.description,
    image: data.image,
    providerName: data.providerName,
    email: data.email,
    rating: data.rating,
    userName: user.displayName,
    userEmail: user.email,
  };
  const [showAllReviews, setShowAllReviews] = useState(false);
 
//============
    const handleSubmit = () => {
      // Simulate API call
      try {
        fetch("http://localhost:3000/booking", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookingdata),
        })
          .then(() => {
            toast.success("Service added successfully!");
            navigate('/my-bookings')
          })
          .catch((err) => {
            toast.error(err.message);
          });
        console.log("Service data:", bookingdata);
      } catch {
        alert("Error adding service. Please try again.");
      }
    };

//===========
  // reviews data
  const reviews = [
    {
      id: 1,
      userName: "Rahim Ahmed",
      rating: Math.ceil(service.rating),
      comment:
        "Excellent service! The electrician was professional and fixed our wiring issue quickly. Highly recommended!",
      date: "2024-01-15",
      serviceUsed: "Wiring Repair",
    },
  ];

  const displayedReviews = showAllReviews ? reviews : reviews.slice(0, 6);

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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const calculateAverageRating = () => {
    const average =
      reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
    return average.toFixed(1);
  };

  const getRatingCount = (rating) => {
    return reviews.filter((review) => review.rating === rating).length;
  };

  return (
    <div className="min-h-screen bg-light py-8 px-4">
      {/* The button to open modal */}

      {/* Modal */}
      <input type="checkbox" id="booking_modal" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box bg-white rounded-3xl shadow-2xl border border-muted max-w-2xl p-0 overflow-hidden">
          {/* Modal Header */}
          <div className="flex justify-between items-center p-6 border-b border-muted">
            <h3 className="text-2xl font-bold text-primary">Confirm Booking</h3>
            <label
              htmlFor="booking_modal"
              className="btn btn-sm btn-circle bg-secondary text-primary border-none hover:bg-secondary/80"
            >
              ✕
            </label>
          </div>

          <div className="p-6 max-h-[70vh] overflow-y-auto">
            {/* Service Information */}
            <div className="space-y-6">
              {/* Service Details */}
              <div className="bg-light rounded-2xl p-4 border border-muted">
                <h4 className="text-lg font-bold text-primary mb-3">
                  Service Details
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-secondary">Service Name:</span>
                      <span className="text-primary font-semibold">
                        {service.serviceName}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-secondary">Category:</span>
                      <span className="bg-secondary text-primary px-2 py-1 rounded-full text-sm font-semibold">
                        {service.category}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-secondary">Provider:</span>
                      <span className="text-primary font-semibold">
                        {service.providerName}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-secondary">Price:</span>
                      <span className="text-primary font-bold text-xl">
                        ${service.price}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-secondary">Rating:</span>
                      <div className="flex items-center gap-1">
                        <svg
                          className="w-4 h-4 text-yellow-400 fill-current"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-primary font-semibold">
                          {service.rating}
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-secondary">Provider Email:</span>
                      <span className="text-primary text-sm">
                        {service.email}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* User Information */}
              <div className="bg-light rounded-2xl p-4 border border-muted">
                <h4 className="text-lg font-bold text-primary mb-3">
                  Your Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-secondary">Name:</span>
                      <span className="text-primary font-semibold">
                        {service.userName}
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center">
                      <span className="text-secondary">Email:</span>
                      <span className="text-primary text-sm">
                        {service.userEmail}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Modal Actions */}
          <div className="modal-action p-6 border-t border-muted flex flex-col sm:flex-row gap-3">
            <label
              htmlFor="booking_modal"
              className="btn-cancel flex-1 text-center order-2 sm:order-1"
            >
              Cancel
            </label>
            <button onClick={handleSubmit} className="btn-custom flex-1 order-1 sm:order-2">
              Confirm Booking
            </button>
          </div>
        </div>

        <label className="modal-backdrop" htmlFor="booking_modal">
          Close
        </label>
      </div>
      {/* ==================== */}
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-primary hover:text-secondary transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold">Back to Services</span>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Service Details */}
          <div className="lg:col-span-2">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-8"
            >
              {/* Service Header */}
              <motion.div
                variants={itemVariants}
                className="bg-white rounded-3xl p-8 shadow-lg border border-muted"
              >
                <div className="flex flex-col lg:flex-row gap-8">
                  {/* Service Image */}
                  <div className="flex-shrink-0">
                    <div className="w-full lg:w-80 h-64 rounded-2xl overflow-hidden">
                      <img
                        src={service.image}
                        alt={service.serviceName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Service Info */}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                      <div>
                        <span className="bg-secondary text-primary px-4 py-2 rounded-full text-sm font-semibold mb-3 inline-block">
                          {service.category}
                        </span>
                        <h1 className="text-3xl lg:text-4xl font-bold text-primary mb-2">
                          {service.serviceName}
                        </h1>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-primary mb-1">
                          ${service.price}
                        </div>
                        <div className="text-secondary">per service</div>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-5 h-5 text-yellow-400 fill-current" />
                        <span className="text-xl font-bold text-primary">
                          {service.rating}
                        </span>
                        <span className="text-secondary">/5</span>
                      </div>
                      <span className="text-secondary">•</span>
                      <span className="text-secondary">
                        {reviews.length} reviews
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-muted text-lg leading-relaxed mb-6">
                      {service.description}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Provider Information */}
              <motion.div
                variants={itemVariants}
                className="bg-white rounded-3xl p-8 shadow-lg border border-muted"
              >
                <h2 className="text-2xl font-bold text-primary mb-6">
                  Service Provider
                </h2>
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center">
                    <span className="text-light text-2xl font-bold">
                      {service.providerName.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-primary mb-2">
                      {service.providerName}
                    </h3>
                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center gap-2 text-primary">
                        <Mail className="w-4 h-4" />
                        <span className="font-semibold">{service.email}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/*Booking & Reviews  */}
          <div className="space-y-8">
            {/* Booking Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-3xl p-8 shadow-lg border border-muted sticky top-8"
            >
              <h3 className="text-2xl font-bold text-primary mb-6">
                Book This Service
              </h3>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">
                    ${service.price}
                  </div>
                  <div className="text-secondary">One-time service fee</div>
                </div>

                <button className="w-full font-semibold">
                  <label
                    htmlFor="booking_modal"
                    className="btn-custom cursor-pointer flex w-full justify-center"
                  >
                    Book Now
                  </label>
                </button>
                <Link to="/services">
                  <button className="w-full bg-secondary text-primary font-semibold py-4 rounded-2xl hover:bg-secondary/80 transition-colors">
                    All Services
                  </button>
                </Link>

                <div className="text-center text-secondary text-sm">
                  ✓ Free cancellation within 24 hours
                </div>
              </div>
            </motion.div>

            {/* Reviews Summary */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-3xl p-8 shadow-lg border border-muted"
            >
              <h3 className="text-2xl font-bold text-primary mb-6">
                Customer Rating
              </h3>

              {/* Average Rating */}
              <div className="text-center mb-6">
                <div className="text-5xl font-bold text-primary mb-2">
                  {calculateAverageRating()}
                </div>
                <div className="flex justify-center mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-6 h-6 ${
                        star <= Math.round(calculateAverageRating())
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <div className="text-secondary">
                  Based on {reviews.length} reviews
                </div>
              </div>

              {/* Rating Breakdown */}
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <div key={rating} className="flex items-center gap-3">
                    <div className="flex items-center gap-1 w-16">
                      <span className="text-primary font-semibold">
                        {rating}
                      </span>
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    </div>
                    <div className="flex-1 bg-muted rounded-full h-2">
                      <div
                        className="bg-yellow-400 h-2 rounded-full"
                        style={{
                          width: `${
                            (getRatingCount(rating) / reviews.length) * 100
                          }%`,
                        }}
                      ></div>
                    </div>
                    <span className="text-secondary text-sm w-8">
                      {getRatingCount(rating)}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Reviews Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12"
        >
          <div className="bg-white rounded-3xl p-8 shadow-lg border border-muted">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <h2 className="text-3xl font-bold text-primary">
                Customer Reviews ({reviews.length})
              </h2>
              {reviews.length > 6 && (
                <button
                  onClick={() => setShowAllReviews(!showAllReviews)}
                  className="btn-custom whitespace-nowrap"
                >
                  {showAllReviews ? "Show Less" : "Show All Reviews"}
                </button>
              )}
            </div>
            {reviews.length === 0 ? (
              <div className=" flex flex-col justify-center items-center text-center p-5">
                <span className=" text-5xl text-secondary">
                  <FaBookOpen></FaBookOpen>
                </span>
                <h1 className="text-2xl font-bold">No reviews available</h1>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {displayedReviews.map((review, index) => (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-light rounded-2xl p-6 border border-muted"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-light" />
                        </div>
                        <div>
                          <h4 className="font-bold text-primary">
                            {review.userName}
                          </h4>
                          <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`w-4 h-4 ${
                                  star <= review.rating
                                    ? "text-yellow-400 fill-current"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-secondary text-sm">
                          {new Date(review.date).toLocaleDateString()}
                        </div>
                        <div className="text-primary text-sm font-semibold">
                          {review.serviceUsed}
                        </div>
                      </div>
                    </div>
                    <p className="text-muted leading-relaxed">
                      {review.comment}
                    </p>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ServiceDetails;
