// const BASE_URL = "http://localhost:5000";

// export const signUpUser = async (data) => {
//   const res = await fetch(`${BASE_URL}/api/auth/signup`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data),
//   });

//   const result = await res.json();
//   if (!res.ok) throw new Error(result.message);
//   return result;
// };

// export const signInUser = async (role, formData) => {
//   const endpoints = {
//     doctor: "/api/doc/login",
//     patient: "/api/auth/signin",
//     admin: "/api/auth/signin",
//   };

//   const body =
//     role === "doctor"
//       ? { doctorname: formData.name, password: formData.password }
//       : { name: formData.name, password: formData.password };

//   const res = await fetch(`${BASE_URL}${endpoints[role]}`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(body),
//   });

//   const result = await res.json();
//   if (!res.ok) throw new Error(result.message);

//   return result;
// };