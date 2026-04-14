import { useState } from 'react';
function Home() {
  const [user, setUser] = useState('');
  const dashboardImg = 'https://media.gettyimages.com/id/2159222063/vector/online-senior-woman-doctor.jpg?s=612x612&w=0&k=20&c=HkSPYy0uvsXS8FQJ6mrC0ksci0VfwkU_8m6gf08lJuM='
  return (
    <div>
   <section className="text-center py-16">
       <div className="w-full flex flex-col items-center md:px-4 px-2 pb-8">
      {/* Header Section */}
      <div className="border relative rounded-3xl shadow-sm bg-white w-full p-5 flex justify-between items-center mb-4 md:mt-[60px] md:h-[200px]">
        <div>
          <h1 className="text-2xl font-semibold text-[#616161]">
            Hello,{" "}
            <span className="text-[#212181]">{user?.username || "Doctor"}</span>
          </h1>
          <p className="text-[#616161]">Have a nice day at work</p>
        </div>
        <img
          src={dashboardImg}
          alt="Dashboard"
          className="h-[300px] absolute right-[100px] top-[-100px] md:flex hidden"
        />
      </div>
      </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-12 px-6">
        <h2 className="text-2xl font-bold text-center mb-8">Monthly Patient Stats</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <StatCard title="Total Appointment" value="100"   color="text-red-500" />
          <StatCard title="Appointment Confirmed" value="80" percentage="80%" color="text-green-500" />
          <StatCard title="Appointment Canceled" value="20" percentage="20%" color="text-green-500" />
        </div>
      </section>
    </div>
  );
};

const StatCard = ({ title, value, percentage, color }) => {
  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center">
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-3xl font-bold mt-2">{value}</p>
      <p className={`mt-1 font-medium ${color}`}>{percentage}</p>
    </div>
  );
};

export default Home
