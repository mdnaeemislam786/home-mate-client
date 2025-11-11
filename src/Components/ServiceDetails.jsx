import { motion } from "framer-motion";
import { Star, Phone, Mail, ArrowLeft } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { Link, useLoaderData, useParams } from "react-router";
import { toast } from "react-toastify";
import { AuthContext } from "../Context/AuthContext";

const ServiceDetails = () => {
  const data = useLoaderData()
  console.log(data);
  // const {user} = useContext(AuthContext)
  // const id  = user.id
  // const {data , setServices } = useState({})

  // // Fetch services from your JSON file
  // useEffect(() => {
  //   const fetchServices = async () => {
  //     try {
  //       const response = await fetch("http://localhost:3000/my-booking", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ email }),
  //       });

  //       if (!response.ok) {
  //         throw new Error("Failed to fetch services");
  //       }
  //       const data = await response.json();
  //       setServices(data);
  //     } catch (err) {
  //       alert.Error(err.message);
  //     } 
  //   };
  
    //   fetchServices();
    // }, []);

  // Mock service data - in real app, you'd fetch this by ID
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

  return (
    <div className="min-h-screen bg-light py-8 px-4">
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

        <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
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
                    <div className=" flex justify-between">
                      <button className="active mt-4">Book Now</button>
                      <button className="active mt-4">All Service</button>
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
                      <span className="text-secondary">{0} reviews</span>
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
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
