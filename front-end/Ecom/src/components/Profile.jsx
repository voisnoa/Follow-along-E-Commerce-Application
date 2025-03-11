import { useState, useEffect } from "react";
 import { useNavigate } from "react-router-dom";
 
 const Profile = () => {
   const [profile, setProfile] = useState(null);
   const [error, setError] = useState(null);
   const navigate = useNavigate();
   const userEmail = localStorage.getItem("userEmail");
 
   useEffect(() => {
     fetchProfile();
   }, []);
 
   const fetchProfile = async () => {
     try {
       console.log("Fetching profile for userEmail:", userEmail);
       const res = await fetch(
         `https://ecommerce-zof6.onrender.com/getUserByEmail?userEmail=${userEmail}`,
         {
           method: "GET",
           headers: { "Content-Type": "application/json" },
         }
       );
       console.log("Response Status:", res.status);
 
       const data = await res.json();
       console.log("Response Data:", data);
 
       if (res.ok) {
         setProfile({
           name: data.name,
           email: data.email,
         });
         setError(null);
       } else {
         console.error("Failed to fetch profile:", data.error || "Unknown error");
         setProfile(null);
         setError(data.error || "Failed to load profile. Please try again.");
       }
     } catch (error) {
       console.error("Error fetching profile:", error);
       setProfile(null);
       setError("An error occurred while loading your profile. Please try again later.");
     }
   };
 
   return (
     <div className="profile-container min-h-screen bg-gray-50 mt-20">
       <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
         {/* <h1 className="text-4xl font-bold text-gray-900 text-center mb-8">Profile</h1> */}
 
         {profile ? (
           <div className="bg-white rounded-xl shadow-lg p-6">
             {/* Profile Information Section */}
             <div className="profile-info flex flex-col items-center mb-8">
               <img
                 src={
                   "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?t=st%3D1740718796~exp%3D1740722396~hmac%3Dd1e981455ca74dbd2b655c7fb6182e3c27f5df6818093d5c565f9687fa9bf82e&w=740"
                 }
                 alt="Profile Avatar"
                 className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-blue-100 shadow-sm"
               />
               <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mt-4">
                 {profile.name}
               </h2>
               <p className="text-gray-600 mt-2 text-lg">{profile.email}</p>
             </div>
 
             {/* Address Section */}
             <div className="profile-address mb-6">
               <h3 className="text-xl font-semibold text-gray-800 mb-4">Shipping Address</h3>
               <p className="text-gray-500 mb-4 text-base">
                 No address data available. Please add an address to continue shopping.
               </p>
               <button
                 onClick={() => navigate("/add-address")}
                 className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out shadow-md hover:shadow-lg"
               >
                 Add Address
               </button>
             </div>
           </div>
         ) : error ? (
           <div className="bg-white rounded-xl shadow-lg p-6 text-center">
             <p className="text-red-600 text-lg font-medium">{error}</p>
             <button
               onClick={fetchProfile}
               className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300"
             >
               Retry
             </button>
           </div>
         ) : (
           <div className="bg-white rounded-xl shadow-lg p-6 text-center">
             <p className="text-gray-500 text-lg">Loading your profile...</p>
           </div>
         )}
       </div>
     </div>
   );
 };
 
 export default Profile;