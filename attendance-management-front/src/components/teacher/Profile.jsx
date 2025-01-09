import React, { useState } from 'react';

const Profile = () => {
  const [profile, setProfile] = useState({
    name: 'Teacher Name',
    email: 'teacher@example.com',
    image: 'https://via.placeholder.com/150', // Placeholder image URL
  });
  const [isEditing, setIsEditing] = useState(false); // To toggle between edit mode and view mode
  const [newImage, setNewImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImage(URL.createObjectURL(file)); // Preview the image
    }
  };

  const handleSave = () => {
    if (newImage) {
      setProfile((prevProfile) => ({
        ...prevProfile,
        image: newImage,
      }));
    }
    setIsEditing(false); // Close the modal after saving
  };

  return (
    <div className="min-h-screen bg-maroon-700 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Profile</h2>

        {/* Profile Info Section */}
        {!isEditing ? (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-center mb-4">
              {/* Profile Image */}
              <img
                src={profile.image}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover"
              />
            </div>
            <div className="text-center mb-4">
              <h3 className="text-2xl font-semibold text-maroon-700">{profile.name}</h3>
              <p className="text-maroon-700">{profile.email}</p>
            </div>
            <div className="text-center">
              <button
                onClick={() => setIsEditing(true)}
                className="text-lg text-maroon-700 font-medium rounded-md p-3"
              >
                Edit Profile
              </button>
            </div>
          </div>
        ) : (
          // Modal for editing profile
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-maroon-700 mb-4 text-center">Edit Profile</h3>

            <div className="flex justify-center mb-4">
              {/* Preview New Profile Image */}
              <img
                src={newImage || profile.image}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover"
              />
            </div>
            <div className="mb-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full p-3 border border-maroon-700 rounded-md focus:outline-none focus:ring-2 focus:ring-maroon-700"
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                placeholder="Name"
                className="w-full p-3 border border-maroon-700 rounded-md focus:outline-none focus:ring-2 focus:ring-maroon-700"
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                placeholder="Email"
                className="w-full p-3 border border-maroon-700 rounded-md focus:outline-none focus:ring-2 focus:ring-maroon-700"
              />
            </div>
            <div className="text-center">
              <button
                onClick={handleSave}
                className="bg-maroon-700 text-white p-3 rounded-md hover:bg-maroon-600"
              >
                Save
              </button>
            </div>
            <div className="text-center mt-4">
              <button
                onClick={() => setIsEditing(false)} // Close the edit modal without saving
                className="bg-gray-500 text-white p-3 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
