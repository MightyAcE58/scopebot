import React, { useState, useEffect } from "react"; // Ensure React and hooks are imported
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"; // Firebase auth functions
import { auth } from "../auth/auth"; // Correct import path for your Firebase auth setup
import { useNavigate } from "react-router-dom"; // For navigation to other routes

export default function Login() {
  const [email, setEmail] = useState(""); // State for email
  const [password, setPassword] = useState(""); // State for password
  const [error, setError] = useState(""); // State for error messages
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // State for password visibility
  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/"); // Redirect to homepage if user is already logged in
      }
    });
    return unsubscribe; // Cleanup the listener on unmount
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous errors
    try {
      await signInWithEmailAndPassword(auth, email, password); // Firebase login
      navigate("/"); // Redirect on successful login
    } catch (err) {
      setError("Incorrect Email or Password"); // Show error message if login fails
    }
  };

  return (
    <div className="flex min-h-screen flex-col justify-center items-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Your Company"
          src="/vite.svg"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-900"
            >
              Password
            </label>
            <div className="mt-2 relative">
              <input
                id="password"
                name="password"
                type={isPasswordVisible ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
              />
              <button
                type="button"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 text-sm hover:text-gray-700"
              >
                {isPasswordVisible ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>

        {error && <p className="mt-2 text-center text-sm text-red-600">{error}</p>} {/* Show error */}

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?{" "}
          <a href="/signup" className="font-semibold text-indigo-600 hover:text-indigo-500">
            Sign up now
          </a>
        </p>
      </div>
    </div>
  );
}





// import React, { useState } from "react"; // Ensure React is imported
// import { signInWithEmailAndPassword } from "firebase/auth"; // Firebase auth function
// import { auth } from "../auth/auth"; // Correct import path for your Firebase auth setup
// import { useNavigate } from "react-router-dom"; // For navigation to other routes

// export default function Login() {
//   const [email, setEmail] = useState(""); // State for email
//   const [password, setPassword] = useState(""); // State for password
//   const [error, setError] = useState(""); // State for error messages
//   const [isPasswordVisible, setIsPasswordVisible] = useState(false); // State for password visibility
//   const navigate = useNavigate(); // For navigation

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       await signInWithEmailAndPassword(auth, email, password); // Firebase login
//       navigate("/"); // Redirect on successful login
//     } catch (err) {
//       setError("Incorrect Email or Password"); // Show error message if login fails
//     }
//   };

//   return (
//     <div className="flex min-h-screen flex-col justify-center items-center px-6 py-12 lg:px-8">
//       <div className="sm:mx-auto sm:w-full sm:max-w-sm">
//         <img
//           alt="Your Company"
//           src="/vite.svg"
//           className="mx-auto h-10 w-auto"
//         />
//         <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
//           Sign in to your account
//         </h2>
//       </div>

//       <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
//         <form className="space-y-6" onSubmit={handleLogin}>
//           <div>
//             <label
//               htmlFor="email"
//               className="block text-sm font-medium text-gray-900"
//             >
//               Email address
//             </label>
//             <div className="mt-2">
//               <input
//                 id="email"
//                 name="email"
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//                 autoComplete="email"
//                 className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
//               />
//             </div>
//           </div>

//           <div>
//             <label
//               htmlFor="password"
//               className="block text-sm font-medium text-gray-900"
//             >
//               Password
//             </label>
//             <div className="mt-2 relative">
//               <input
//                 id="password"
//                 name="password"
//                 type={isPasswordVisible ? "text" : "password"}
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//                 autoComplete="current-password"
//                 className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
//               />
//               <button
//                 type="button"
//                 onClick={() => setIsPasswordVisible(!isPasswordVisible)}
//                 className="absolute inset-y-0 right-3 flex items-center text-gray-500 text-sm hover:text-gray-700"
//               >
//                 {isPasswordVisible ? "Hide" : "Show"}
//               </button>
//             </div>
//           </div>

//           <div>
//             <button
//               type="submit"
//               className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//             >
//               Sign in
//             </button>
//           </div>
//         </form>

//         {error && <p className="mt-2 text-center text-sm text-red-600">{error}</p>} {/* Show error */}

//         <p className="mt-10 text-center text-sm text-gray-500">
//           Not a member?{" "}
//           <a href="/signup" className="font-semibold text-indigo-600 hover:text-indigo-500">
//             Sign up now
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// }
