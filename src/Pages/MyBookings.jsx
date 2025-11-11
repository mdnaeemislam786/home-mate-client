import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Trash2, MessageCircle } from 'lucide-react';

const MyBookings = () => {
    const [booked, setBooked] = useState([]);
    const [showReview, setShowReview] = useState(null);
    const [review, setReview] = useState({ rating: 5, comment: '' });
    const email = "aaa@aa.aa"; // From context or props

    // Fetch bookings
    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await fetch("http://localhost:3000/my-booked", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email }),
                });

                if (!response.ok) throw new Error("Failed to fetch services");
                const data = await response.json();
                setBooked(data);
            } catch (err) {
                console.error(err.message);
            }
        };
        fetchServices();
    }, [email]);

    // Delete booking
    const handleDelete = async (id) => {
        if (!window.confirm("Delete this booking?")) return;
        
        try {
            await fetch(`http://localhost:3000/bookings/${id}`, { 
                method: "DELETE" 
            });
            setBooked(booked.filter(item => item._id !== id));
        } catch (err) {
            console.error("Delete failed:", err);
        }
    };

    // Submit review
    const handleReview = async (id) => {
        if (review.comment.length < 10 || review.comment.length > 100) {
            alert("Review must be 10-100 characters");
            return;
        }

        try {
            await fetch(`http://localhost:3000/bookings/${id}/review`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(review),
            });
            setShowReview(null);
            setReview({ rating: 5, comment: '' });
            alert("Review submitted!");
        } catch (err) {
            console.error("Review failed:", err);
        }
    };

    return (
        <div className="min-h-screen bg-light py-8 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl md:text-4xl font-bold text-primary text-center mb-8"
                >
                    My Bookings ({booked.length})
                </motion.h1>

                {/* Table */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-white rounded-3xl shadow-lg border border-muted overflow-hidden"
                >
                    {/* Table Header */}
                    <div className="hidden md:grid grid-cols-12 gap-4 p-6 bg-primary text-light font-semibold">
                        <div className="col-span-3">Service</div>
                        <div className="col-span-3">Provider</div>
                        <div className="col-span-3">Booking Time</div>
                        <div className="col-span-1">Price</div>
                        <div className="col-span-2 text-center">Actions</div>
                    </div>

                    {/* Table Body */}
                    <div className="divide-y divide-muted">
                        {booked.map((booking, index) => (
                            <motion.div
                                key={booking._id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 md:p-6 items-center hover:bg-light/50"
                            >
                                {/* Service Info */}
                                <div className="md:col-span-3">
                                    <div className="flex items-center gap-3">
                                        <img 
                                            src={booking.image} 
                                            alt={booking.serviceName}
                                            className="w-12 h-12 rounded-xl object-cover"
                                        />
                                        <div>
                                            <h3 className="font-bold text-primary">{booking.serviceName}</h3>
                                            <p className="text-secondary text-sm">{booking.category}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Provider */}
                                <div className="md:col-span-3">
                                    <p className="text-primary font-semibold">{booking.providerName}</p>
                                    <p className="text-secondary text-sm">{booking.providerEmail}</p>
                                </div>

                                {/* Booking Time */}
                                <div className="md:col-span-3">
                                    <p className="text-primary">{booking.bookingTime}</p>
                                </div>

                                {/* Price */}
                                <div className="md:col-span-1">
                                    <p className="text-primary font-bold text-xl">${booking.price}</p>
                                </div>

                                {/* Actions */}
                                <div className="md:col-span-2">
                                    <div className="flex gap-2 justify-center">
                                        {/* Review Button */}
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => setShowReview(booking._id)}
                                            className="bg-secondary text-primary p-2 rounded-xl hover:bg-secondary/80 transition-colors"
                                            title="Add Review"
                                        >
                                            <MessageCircle className="w-4 h-4" />
                                        </motion.button>

                                        {/* Delete Button */}
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => handleDelete(booking._id)}
                                            className="bg-red-100 text-red-600 p-2 rounded-xl hover:bg-red-200 transition-colors"
                                            title="Delete Booking"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </motion.button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Empty State */}
                {booked.length === 0 && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-12"
                    >
                        <p className="text-secondary text-lg">No bookings found</p>
                    </motion.div>
                )}
            </div>

            {/* Review Modal */}
            {showReview && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-3xl p-6 max-w-md w-full"
                    >
                        <h3 className="text-xl font-bold text-primary mb-4">Add Review</h3>
                        
                        {/* Star Rating */}
                        <div className="flex justify-center gap-1 mb-4">
                            {[1,2,3,4,5].map(star => (
                                <motion.button
                                    key={star}
                                    whileHover={{ scale: 1.2 }}
                                    onClick={() => setReview(prev => ({ ...prev, rating: star }))}
                                >
                                    <Star className={`w-6 h-6 ${
                                        star <= review.rating 
                                            ? 'text-yellow-400 fill-current' 
                                            : 'text-gray-300'
                                    }`} />
                                </motion.button>
                            ))}
                        </div>

                        {/* Review Text */}
                        <textarea
                            value={review.comment}
                            onChange={(e) => setReview(prev => ({ ...prev, comment: e.target.value }))}
                            placeholder="Write your review (10-100 characters)"
                            rows="4"
                            className="w-full bg-light border border-muted rounded-2xl p-3 text-primary focus:outline-none focus:border-primary resize-none"
                        />
                        
                        {/* Character Count */}
                        <div className={`text-sm mt-2 text-right ${
                            review.comment.length > 100 ? 'text-red-500' : 'text-secondary'
                        }`}>
                            {review.comment.length}/100
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={() => setShowReview(null)}
                                className="flex-1 bg-secondary text-primary py-2 rounded-xl font-semibold hover:bg-secondary/80 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleReview(showReview)}
                                disabled={review.comment.length < 10 || review.comment.length > 100}
                                className={`flex-1 py-2 rounded-xl font-semibold transition-colors ${
                                    review.comment.length >= 10 && review.comment.length <= 100
                                        ? 'btn-custom'
                                        : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                                }`}
                            >
                                Submit
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default MyBookings;