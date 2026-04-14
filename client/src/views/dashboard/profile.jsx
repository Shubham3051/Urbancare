import  { useState} from "react";
import profileImg from "@/assets/images/dummy-profile-img-2.jpg";
import profileImgBg from "@/assets/images/userProfileBg.png";
import { useSelector } from "react-redux";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FaRegUserCircle } from "react-icons/fa";

import EditProfile from "@/components/editProfile";


const Profile = () => {
  const user = useSelector((state) => state?.auth?.user);
  const [profileImage, setProfileImage] = useState(
    localStorage.getItem("profileImage") || user?.profileImage || profileImg
  );
  const [profileData, setProfileData] = useState(() => {
    const savedProfileData = JSON.parse(localStorage.getItem("profileData"));
    return savedProfileData || {
      username: user?.username || "",
      email: user?.email || "",
      mobile: user?.mobile || "",
      role: user?.role || "",
      location: user?.location || "",
      languages: user?.languages || "",
    };
  });


  return (
    <div className="w-full px-4 pb-8">
      <h1 className="text-lg font-medium">View Profile</h1>
      <div className="flex w-full gap-[20px] my-4">
        {/* Profile Info Section */}
        <div className="w-4/12 h-min flex flex-col items-center justify-center bg-white rounded-2xl shadow-lg border overflow-hidden">
          <img src={profileImgBg} alt="Profile Background" className="w-full h-[120px]" />
          <div className="w-[150px] h-[150px] mt-[-80px] rounded-full p-1 bg-white">
            <img src={profileImage} alt="Profile" className="w-full h-full rounded-full" />
          </div>
          <h1 className="text-xl font-medium mt-4">{profileData.username}</h1>
          <p className="text-base text-gray-600 mb-4">{profileData.email}</p>
          <div className="w-full p-3 px-6 pb-6 border border-s-0 border-e-0 border-b-0">
            <h1 className="text-xl font-medium">Personal Info</h1>
            {Object.entries(profileData).map(([key, value]) => (
              <div key={key} className="flex w-full gap-[10px] my-2">
                <div className="w-3/12">
                  <p className="font-medium">{key.charAt(0).toUpperCase() + key.slice(1)}</p>
                </div>
                <div className="w-9/12">
                  <p className="text-gray-600">: {value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs Section */}
        <div className="w-8/12 bg-white rounded-2xl shadow-lg border p-5">
          <Tabs defaultValue="editProfile" className="w-full">
            <TabsList>
              <TabsTrigger value="editProfile" className="flex gap-[5px]">
                <FaRegUserCircle />
                <p>Edit Profile</p>
              </TabsTrigger>

            </TabsList>

            <TabsContent value="editProfile" className="w-full">
              <EditProfile setProfileData={setProfileData} setProfileImage={setProfileImage} />
            </TabsContent>


          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Profile;
