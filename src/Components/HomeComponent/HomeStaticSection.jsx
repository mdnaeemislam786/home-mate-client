import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Clock, Star, Users, Award, Heart } from 'lucide-react';

const HomeStaticSection = () => {
    // Why Choose Us Data
    const features = [
        {
            icon: <Shield className="w-8 h-8" />,
            title: "Verified Professionals",
            description: "Every service provider is thoroughly vetted, background-checked, and certified for your peace of mind.",
            stats: "100% Verified"
        },
        {
            icon: <Clock className="w-8 h-8" />,
            title: "Quick Service",
            description: "Get connected with reliable professionals in minutes. Most services are completed within 24 hours.",
            stats: "24h Average"
        },
        {
            icon: <Star className="w-8 h-8" />,
            title: "Rated & Reviewed",
            description: "Read genuine reviews from thousands of satisfied customers before making your choice.",
            stats: "4.8/5 Rating"
        },
        {
            icon: <Award className="w-8 h-8" />,
            title: "Quality Guaranteed",
            description: "We stand behind every service with our satisfaction guarantee. Your happiness is our priority.",
            stats: "100% Guarantee"
        }
    ];

    // Testimonials Data
    const testimonials = [
        {
            id: 1,
            name: "Sarah Johnson",
            role: "Homeowner",
            location: "Dhaka",
            rating: 5,
            comment: "The cleaning service was exceptional! My house has never been this spotless. The team was professional and thorough.",
            service: "Cleaning Service",
            image: "👩‍💼"
        },
        {
            id: 2,
            name: "Michael Chen",
            role: "Business Owner",
            location: "Chittagong",
            rating: 5,
            comment: "Fast and reliable electrical services. Fixed my office wiring issues in no time. Highly recommended!",
            service: "Electrical Service",
            image: "👨‍💼"
        },
        {
            id: 3,
            name: "Ayesha Rahman",
            role: "Teacher",
            location: "Sylhet",
            rating: 4,
            comment: "The plumber arrived on time and solved our bathroom leakage problem efficiently. Great service!",
            service: "Plumbing Service",
            image: "👩‍🏫"
        }
    ];

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 12
            }
        }
    };

    const cardHoverVariants = {
        hover: {
            y: -8,
            scale: 1.02,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 25
            }
        }
    };

    return (
        <div className="bg-light py-20 px-4">
            <div className="max-w-7xl mx-auto">
                
                {/* Why Choose Us Section */}
                <section className="mb-28">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
                            Why Choose HomeMate?
                        </h2>
                        <p className="text-xl text-secondary max-w-3xl mx-auto">
                            We're committed to providing you with the best home service experience. 
                            Here's what sets us apart from the competition.
                        </p>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                    >
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                whileHover="hover"
                                variants={cardHoverVariants}
                                className="bg-white rounded-3xl p-8 shadow-lg border border-muted text-center group"
                            >
                                <motion.div
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    className="bg-primary w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 text-light group-hover:bg-secondary transition-colors duration-300"
                                >
                                    {feature.icon}
                                </motion.div>
                                
                                <h3 className="text-xl font-bold text-primary mb-3">
                                    {feature.title}
                                </h3>
                                
                                <p className="text-muted mb-4 leading-relaxed">
                                    {feature.description}
                                </p>
                                
                                <div className="bg-secondary text-primary px-4 py-2 rounded-full text-sm font-semibold inline-block">
                                    {feature.stats}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Stats Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        viewport={{ once: true }}
                        className="mt-16 bg-primary rounded-3xl p-8 text-light"
                    >
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                            <div>
                                <div className="text-3xl md:text-4xl font-bold mb-2">50K+</div>
                                <div className="text-secondary">Happy Customers</div>
                            </div>
                            <div>
                                <div className="text-3xl md:text-4xl font-bold mb-2">200+</div>
                                <div className="text-secondary">Service Providers</div>
                            </div>
                            <div>
                                <div className="text-3xl md:text-4xl font-bold mb-2">4.8/5</div>
                                <div className="text-secondary">Average Rating</div>
                            </div>
                            <div>
                                <div className="text-3xl md:text-4xl font-bold mb-2">24/7</div>
                                <div className="text-secondary">Support Available</div>
                            </div>
                        </div>
                    </motion.div>
                </section>

                {/* Customer Testimonials Section */}
                <section>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
                            What Our Customers Say
                        </h2>
                        <p className="text-xl text-secondary max-w-3xl mx-auto">
                            Don't just take our word for it. Here's what our satisfied customers 
                            have to say about their experience with HomeMate.
                        </p>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {testimonials.map((testimonial, index) => (
                            <motion.div
                                key={testimonial.id}
                                variants={itemVariants}
                                whileHover="hover"
                                variants={cardHoverVariants}
                                className="bg-white rounded-3xl p-8 shadow-lg border border-muted relative"
                            >
                                {/* Quote Icon */}
                                <div className="text-6xl text-secondary absolute -top-4 -left-2 opacity-20">
                                    "
                                </div>
                                
                                {/* Rating Stars */}
                                <div className="flex mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            whileHover={{ scale: 1.2 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <Star 
                                                className={`w-5 h-5 ${
                                                    i < testimonial.rating 
                                                        ? 'text-yellow-400 fill-current' 
                                                        : 'text-gray-300'
                                                }`} 
                                            />
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Testimonial Text */}
                                <p className="text-muted mb-6 leading-relaxed relative z-10">
                                    "{testimonial.comment}"
                                </p>

                                {/* Service Tag */}
                                <div className="bg-secondary text-primary px-3 py-1 rounded-full text-sm font-semibold inline-block mb-4">
                                    {testimonial.service}
                                </div>

                                {/* Customer Info */}
                                <div className="flex items-center">
                                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-light text-xl mr-4">
                                        {testimonial.image}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-primary">
                                            {testimonial.name}
                                        </h4>
                                        <p className="text-secondary text-sm">
                                            {testimonial.role} • {testimonial.location}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Trust Indicators */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        viewport={{ once: true }}
                        className="mt-16 text-center"
                    >
                        <div className="flex flex-col md:flex-row items-center justify-center gap-8 bg-secondary rounded-3xl p-8">
                            <div className="flex items-center text-primary">
                                <Users className="w-8 h-8 mr-3" />
                                <span className="text-lg font-semibold">Trusted by 50,000+ Families</span>
                            </div>
                            <div className="flex items-center text-primary">
                                <Award className="w-8 h-8 mr-3" />
                                <span className="text-lg font-semibold">Best Service Award 2024</span>
                            </div>
                            <div className="flex items-center text-primary">
                                <Heart className="w-8 h-8 mr-3" />
                                <span className="text-lg font-semibold">98% Customer Satisfaction</span>
                            </div>
                        </div>
                    </motion.div>
                </section>
            </div>
        </div>
    );
};

export default HomeStaticSection;