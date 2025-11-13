import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import { FaXTwitter } from 'react-icons/fa6';
import { FaFacebook, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-primary text-light py-12 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                    {/* Company Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                    >
                        <h3 className="text-2xl font-bold text-light">HomeMate</h3>
                        <p className="text-secondary leading-relaxed">
                            Connecting you with trusted service professionals for all your home needs. 
                            Quality service guaranteed.
                        </p>
                        <div className="flex gap-4">
                                <motion.a
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    className="w-10 h-10 bg-secondary text-primary rounded-full flex items-center justify-center hover:bg-light transition-colors"
                                    href="#"
                                > <FaXTwitter ></FaXTwitter>
                                </motion.a>
                                <motion.a
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    className="w-10 h-10 bg-secondary text-primary rounded-full flex items-center justify-center hover:bg-light transition-colors"
                                    href="#"
                                > <FaFacebook ></FaFacebook>
                                </motion.a>
                                <motion.a
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    className="w-10 h-10 bg-secondary text-primary rounded-full flex items-center justify-center hover:bg-light transition-colors"
                                    href="#"
                                > <FaLinkedin ></FaLinkedin>
                                </motion.a>
                        </div>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="space-y-4"
                    >
                        <h4 className="text-lg font-bold text-light">Quick Links</h4>
                        <nav className="space-y-2">
                            <motion.a href='/' whileHover={{ x: 5 }} className="block text-secondary hover:text-light transition-colors"> Home</motion.a>
                            <motion.a href='/services' whileHover={{ x: 5 }} className="block text-secondary hover:text-light transition-colors">Services</motion.a>
                            <motion.a href='/my-services' whileHover={{ x: 5 }} className="block text-secondary hover:text-light transition-colors">My Services</motion.a>
                            <motion.a href='/add-service' whileHover={{ x: 5 }} className="block text-secondary hover:text-light transition-colors"> Add Service</motion.a>
                            <motion.a href='/my-bookings' whileHover={{ x: 5 }} className="block text-secondary hover:text-light transition-colors"> My Bookings</motion.a>
                            <motion.a href='/profile' whileHover={{ x: 5 }} className="block text-secondary hover:text-light transition-colors">My Profile</motion.a>
                        </nav>
                    </motion.div>

                    {/* Services */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-4"
                    >
                        <h4 className="text-lg font-bold text-light">Our Services</h4>
                        <nav className="space-y-2">
                            {['Electrical', 'Plumbing', 'Cleaning', 'Carpentry', 'Painting'].map((service) => (
                                <motion.a
                                    key={service}
                                    whileHover={{ x: 5 }}
                                    className="block text-secondary hover:text-light transition-colors"
                                    href="/services"
                                >
                                    {service}
                                </motion.a>
                            ))}
                        </nav>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="space-y-4"
                    >
                        <h4 className="text-lg font-bold text-light">Contact Us</h4>
                        <div className="space-y-3 text-secondary">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-secondary text-primary rounded-full flex items-center justify-center">
                                    📧
                                </div>
                                <span>support@homemate.com</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-secondary text-primary rounded-full flex items-center justify-center">
                                    📞
                                </div>
                                <span>+880 1234-567890</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-secondary text-primary rounded-full flex items-center justify-center">
                                    📍
                                </div>
                                <span>Dhaka, Bangladesh</span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Bottom Bar */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="pt-8 border-t border-secondary/30"
                >
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-secondary text-center md:text-left">
                            © {new Date().getFullYear()} HomeMate. All rights reserved.
                        </p>
                        <div className="flex gap-6 text-secondary">
                            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
                                <motion.a
                                    key={item}
                                    whileHover={{ scale: 1.05 }}
                                    className="hover:text-light transition-colors text-sm"
                                    href="#"
                                >
                                    {item}
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
};

// Social Icon Component
const SocialIcon = ({ platform }) => {
    const icons = {
        Twitter: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
            </svg>
        ),
        YouTube: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
            </svg>
        ),
        Facebook: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
            </svg>
        )
    };

    return icons[platform] || null;
};

export default Footer;