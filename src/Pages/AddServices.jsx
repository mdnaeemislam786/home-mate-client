import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { Upload, Plus, X } from "lucide-react";
import { AuthContext } from "../Context/AuthContext";
import { toast } from "react-toastify";

const AddServices = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    serviceName: "",
    category: "",
    price: "",
    description: "",
    image: "",
    providerName: user.displayName,
    email: user.email,
    rating: 0,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState("");

  const categories = [
    "Cleaning",
    "Electrical",
    "Plumbing",
    "Carpentry",
    "Painting",
    "Gardening",
    "Moving",
    "Repair",
    "Maintenance",
    "Other",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    // Handle image preview
    if (name === "image" && value) {
      setImagePreview(value);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.serviceName.trim()) {
      newErrors.serviceName = "Service name is required";
    }

    if (!formData.category) {
      newErrors.category = "Please select a category";
    }

    if (!formData.price || formData.price <= 0) {
      newErrors.price = "Please enter a valid price";
    }

    if (!formData.description.trim() || formData.description.length < 10) {
      newErrors.description = "Description must be at least 10 characters";
    }

    if (!formData.image.trim()) {
      newErrors.image = "Image URL is required";
    }

    if (!formData.providerName.trim()) {
      newErrors.providerName = "Provider name is required";
    }

    if (
      !formData.email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      fetch("http://localhost:3000/services", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then(() => {
          toast.success("Service added successfully!");
        })
        .catch((err) => {
          toast.error(err.message);
        });
      // Here you would typically send the data to your backend
      console.log("Service data:", formData);

      // Reset form
      setFormData({
        serviceName: "",
        category: "",
        price: "",
        description: "",
        image: "",
        providerName: "",
        email: "",
      });
      setImagePreview("");
      setErrors({});
    } catch (error) {
      alert("Error adding service. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const clearImagePreview = () => {
    setImagePreview("");
    setFormData((prev) => ({ ...prev, image: "" }));
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
    <div className="min-h-screen bg-light py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Add New Service
          </h1>
          <p className="text-xl text-secondary max-w-2xl mx-auto">
            List your service and reach thousands of potential customers
          </p>
        </motion.div>

        <motion.form
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl shadow-2xl border border-muted p-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Service Name */}
              <motion.div variants={itemVariants}>
                <label className="block text-primary font-semibold mb-3 text-lg">
                  Service Name *
                </label>
                <input
                  type="text"
                  name="serviceName"
                  value={formData.serviceName}
                  onChange={handleInputChange}
                  placeholder="e.g., Professional Home Cleaning"
                  className={`w-full bg-light border-2 rounded-2xl px-4 py-4 text-primary focus:outline-none focus:border-primary transition-colors ${
                    errors.serviceName ? "border-red-500" : "border-muted"
                  }`}
                />
                {errors.serviceName && (
                  <p className="text-red-500 text-sm mt-2 ml-2">
                    {errors.serviceName}
                  </p>
                )}
              </motion.div>

              {/* Category */}
              <motion.div variants={itemVariants}>
                <label className="block text-primary font-semibold mb-3 text-lg">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className={`w-full bg-light border-2 rounded-2xl px-4 py-4 text-primary focus:outline-none focus:border-primary transition-colors ${
                    errors.category ? "border-red-500" : "border-muted"
                  }`}
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="text-red-500 text-sm mt-2 ml-2">
                    {errors.category}
                  </p>
                )}
              </motion.div>

              {/* Price */}
              <motion.div variants={itemVariants}>
                <label className="block text-primary font-semibold mb-3 text-lg">
                  Price ($) *
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary font-bold">
                    $
                  </span>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    className={`w-full bg-light border-2 rounded-2xl pl-10 pr-4 py-4 text-primary focus:outline-none focus:border-primary transition-colors ${
                      errors.price ? "border-red-500" : "border-muted"
                    }`}
                  />
                </div>
                {errors.price && (
                  <p className="text-red-500 text-sm mt-2 ml-2">
                    {errors.price}
                  </p>
                )}
              </motion.div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Image URL */}
              <motion.div variants={itemVariants}>
                <label className="block text-primary font-semibold mb-3 text-lg">
                  Service Image URL *
                </label>
                <div className="space-y-4">
                  <input
                    type="url"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    placeholder="https://example.com/image.jpg"
                    className={`w-full bg-light border-2 rounded-2xl px-4 py-4 text-primary focus:outline-none focus:border-primary transition-colors ${
                      errors.image ? "border-red-500" : "border-muted"
                    }`}
                  />

                  {/* Image Preview */}
                  {imagePreview && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="relative"
                    >
                      <div className="bg-light border-2 border-muted rounded-2xl p-4">
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-primaryfont-semibold">
                            Image Preview:
                          </span>
                          <button
                            type="button"
                            onClick={clearImagePreview}
                            className="text-red-500 hover:text-red-700 transition-colors"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                        <img
                          src={imagePreview}
                          alt="Service preview"
                          className="w-full h-48 object-cover rounded-xl"
                          onError={(e) => {
                            e.target.style.display = "none";
                          }}
                        />
                      </div>
                    </motion.div>
                  )}
                </div>
                {errors.image && (
                  <p className="text-red-500 text-sm mt-2 ml-2">
                    {errors.image}
                  </p>
                )}
              </motion.div>

              {/* Description */}
              <motion.div variants={itemVariants} className="lg:col-span-2">
                <label className="block text-primary font-semibold mb-3 text-lg">
                  Service Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe your service in detail. Include what makes it special, what's included, and any important information for customers..."
                  rows="6"
                  className={`w-full bg-light border-2 rounded-2xl px-4 py-4 text-primary focus:outline-none focus:border-primary transition-colors resize-none ${
                    errors.description ? "border-red-500" : "border-muted"
                  }`}
                />
                <div className="flex justify-between items-center mt-2">
                  {errors.description ? (
                    <p className="text-red-500 text-sm ml-2">
                      {errors.description}
                    </p>
                  ) : (
                    <p className="text-secondary text-sm ml-2">
                      Minimum 10 characters
                    </p>
                  )}
                  <span
                    className={`text-sm ${
                      formData.description.length < 10
                        ? "text-secondary"
                        : "text-green-500"
                    }`}
                  >
                    {formData.description.length}/10
                  </span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Submit Button */}
          <motion.div
            variants={itemVariants}
            className="mt-8 flex flex-col sm:flex-row gap-4 justify-between items-center pt-6 border-t border-muted"
          >
            <div className="text-secondary text-sm">* Required fields</div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
              className={`btn-custom flex items-center justify-center gap-3 min-w-[200px] ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Adding Service...
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5" />
                  Add Service
                </>
              )}
            </motion.button>
          </motion.div>
        </motion.form>
      </div>
    </div>
  );
};

export default AddServices;
