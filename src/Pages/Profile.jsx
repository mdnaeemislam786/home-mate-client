import React, { useContext, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { FaEdit, FaCheck, FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Profile = () => {
    const { user , updateNamePhoto , logoutUser} = useContext(AuthContext);
    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState({
        displayName: user?.displayName || '',
        photoURL: user?.photoURL || '',
    });

    // console.log(user);

    const handleEditToggle = () => {
        if (isEditing) {
            // Save changes logic would go here
            updateNamePhoto(editedUser)
            .then(() => {
                toast.success('Your Name and Photo update successfull')
            })
            .catch((err) => {
                toast.error(err)
            })
            // console.log('Saving changes:', editedUser);
        }
        setIsEditing(!isEditing);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedUser(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const formatDate = (timestamp) => {
        if (!timestamp) return 'N/A';
        const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };
    const handleLogout = () => {
        logoutUser()
        .then(() => {
            toast.success(user.displayName +" LogOut successfull")
        })
        .catch((err) => {
            toast.error(err.message)
        })
    }

    return (
        <div className='min-h-screen bg-light p-4'>
            <div className='max-w-7xl mx-auto'>
                <div className='grid grid-cols-1 lg:grid-cols-5 bg-white border border-muted rounded-3xl shadow-lg overflow-hidden'>
                    {/* Left Side - Profile Info */}
                    <div className='lg:col-span-2 bg-secondary p-6 lg:p-8'>
                        <div className='mb-8 flex justify-between items-center'>
                            <h1 className='text-2xl md:text-3xl xl:text-4xl font-bold text-primary mb-0'>Profile</h1>
                            <button 
                                onClick={handleEditToggle}
                                className={`p-3 rounded-full transition-all duration-300 ${
                                    isEditing ? 'bg-green-500 text-white' : 'bg-primary text-light hover:bg-primary/90'
                                }`}
                            >
                                {isEditing ? <FaCheck /> : <FaEdit />}
                            </button>
                        </div>
                        
                        <div className='flex flex-col items-center justify-center space-y-6'>
                            <div className="relative">
                                <div className="w-48 h-48 bg-muted overflow-hidden rounded-full border-4 border-light shadow-lg">
                                    <img
                                        src={user?.photoURL || '/default-avatar.png'}
                                        alt="profile photo"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                {isEditing && (
                                    <div className="absolute -bottom-20 right-2">
                                        <input
                                        type="text"
                                        name="displayName"
                                        value={editedUser.photoURL}
                                        onChange={handleInputChange}
                                        className="w-full max-w-xs text-2xl font-bold text-primary text-center bg-light border border-muted rounded-xl px-4 py-2 focus:outline-none focus:border-primary"
                                      />
                                    </div>
                                )}
                            </div>
                            
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="displayName"
                                    value={editedUser.displayName}
                                    onChange={handleInputChange}
                                    className="w-full max-w-xs text-2xl font-bold text-primary text-center bg-light border border-muted rounded-xl mt-15 px-4 py-2 focus:outline-none focus:border-primary"
                                />
                            ) : (
                                <h1 className='text-2xl font-bold text-primary text-center'>{user?.displayName || 'No Name'}</h1>
                            )}
                            
                            <span className='text-light bg-primary py-2 px-6 rounded-full text-sm font-semibold shadow-md'>
                                Premium User
                            </span>
                        </div>

                        {/* Action Buttons */}
                        <div className='mt-8 lg:mt-12 flex flex-wrap gap-4'>
                            <button onClick={handleLogout} className='btn-custom flex-1 min-w-[120px] bg-red-500 hover:bg-secondary'>
                                LogOut
                            </button>
                        </div>
                    </div>

                    {/* Right Side - Profile Details */}
                    <div className='lg:col-span-3 p-6 lg:p-8 border-t lg:border-t-0 lg:border-l border-muted'>
                        <h1 className='text-2xl md:text-3xl xl:text-4xl font-bold text-primary mb-8 lg:mb-12'>
                            Profile Details
                        </h1>
                        
                        <div className='space-y-6 lg:space-y-8'>
                            {/* Email */}
                            <div className='bg-light rounded-2xl p-4 lg:p-6 shadow-sm'>
                                <span className='text-lg lg:text-xl text-secondary font-semibold block mb-2'>Email Address</span>
                                <p className='text-xl lg:text-2xl text-primary font-bold break-all'>{user?.email}</p>
                            </div>

                            {/* Email Verification Status */}
                            <div className='bg-light rounded-2xl p-4 lg:p-6 shadow-sm'>
                                <span className='text-lg lg:text-xl text-secondary font-semibold block mb-2'>Email Status</span>
                                <div className='flex items-center gap-3'>
                                    <span className={`inline-block w-3 h-3 rounded-full ${
                                        user?.emailVerified ? 'bg-green-500' : 'bg-red-500'
                                    }`}></span>
                                    <p className='text-xl lg:text-2xl text-primary font-bold'>
                                        {user?.emailVerified ? 'Verified' : 'Not Verified'}
                                    </p>
                                    {!user?.emailVerified && (
                                        <button className='text-sm bg-primary text-light px-3 py-1 rounded-lg hover:bg-primary/90 transition-colors'>
                                            Verify Now
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* User ID */}
                            <div className='bg-light rounded-2xl p-4 lg:p-6 shadow-sm'>
                                <span className='text-lg lg:text-xl text-secondary font-semibold block mb-2'>User ID</span>
                                <p className='text-sm lg:text-base text-primary font-mono break-all bg-muted/30 p-2 rounded-lg'>
                                    {user?.uid}
                                </p>
                            </div>

                            {/* Last Sign-in */}
                            <div className='bg-light rounded-2xl p-4 lg:p-6 shadow-sm'>
                                <span className='text-lg lg:text-xl text-secondary font-semibold block mb-2'>Last Sign-in</span>
                                <p className='text-xl lg:text-2xl text-primary font-bold'>
                                    {user?.metadata?.lastSignInTime ? formatDate(user.metadata.lastSignInTime) : 'N/A'}
                                </p>
                            </div>

                            {/* Account Created */}
                            <div className='bg-light rounded-2xl p-4 lg:p-6 shadow-sm'>
                                <span className='text-lg lg:text-xl text-secondary font-semibold block mb-2'>Member Since</span>
                                <p className='text-xl lg:text-2xl text-primary font-bold'>
                                    {user?.metadata?.creationTime ? formatDate(user.metadata.creationTime) : 'N/A'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
    );
};

export default Profile;