'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { onAuthStateChanged, signOut } from "firebase/auth"
import { auth } from '../auth/auth'

const navigation = [
  { name: 'Features', href: '/#features-section' }
]

export default function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [user, setUser] = useState(null)
  const navigate = useNavigate()
  
  // Get current route using useLocation
  const location = useLocation()

  // Check if we're on specific routes
  const isLoginPage = location.pathname === '/login'
  const isChatbotPage = location.pathname === '/chatbot'

  // Determine logo source based on current page
  const logoSrc = isChatbotPage ? '/vite-white.svg' : '/vite.svg'

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // User is signed in
        setUser(currentUser)
      } else {
        // User is signed out
        setUser(null)
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // Redirect to home page after logout
      navigate('/');
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  }

  return (
    <div>
      <header className={`
        ${isChatbotPage 
          ? 'absolute inset-x-0 top-0 z-50 bg-transparent backdrop-blur-md' 
          : 'absolute inset-x-0 top-0 z-50 backdrop-blur-md'}
      `}>
        <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
          <div className="flex lg:flex-1">
            <Link to="/" className={`-m-1.5 p-1.5 ${isChatbotPage ? 'text-white' : ''}`}>
              <span className="sr-only">Your Company</span>
              <img
                alt=""
                src={logoSrc}
                className="h-8 w-auto"
              />
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className={`-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 ${isChatbotPage ? 'text-white' : 'text-gray-700'}`}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <Link 
                key={item.name} 
                to={item.href} 
                className={`text-sm/6 font-semibold ${isChatbotPage ? 'text-white' : 'text-gray-900'}`}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            {user ? (
              <div 
                onClick={handleLogout} 
                className={`flex items-center gap-x-4 cursor-pointer hover:opacity-80 transition-opacity ${isChatbotPage ? 'text-white' : ''}`}
              >
                <span className={`text-sm/6 font-semibold ${isChatbotPage ? 'text-white' : 'text-gray-900'}`}>
                  {user.displayName || user.email}
                </span>
              </div>
            ) : (
              <Link 
                to={isLoginPage ? '/signup' : '/login'} 
                className={`text-sm/6 font-semibold ${isChatbotPage ? 'text-white' : 'text-gray-900'}`}
              >
                {isLoginPage ? 'Sign Up' : 'Login'}
                <span aria-hidden="true">&rarr;</span>
              </Link>
            )}
          </div>
        </nav>
        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
          <div className="fixed inset-0 z-50" />
          <DialogPanel className={`
            fixed inset-y-0 right-0 z-50 w-full overflow-y-auto px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10
            ${isChatbotPage 
              ? 'bg-transparent text-white backdrop-blur-md' 
              : 'bg-transparent backdrop-blur-md'}
          `}>
            <div className="flex items-center justify-between">
              <Link to="/" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img
                  alt=""
                  src={logoSrc === '/vite-white.svg' ? '/vite.svg' : logoSrc}
                  className="h-8 w-auto"
                />
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className={`-m-2.5 rounded-md p-2.5 ${isChatbotPage ? 'text-white' : 'text-gray-700'}`}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold ${isChatbotPage ? 'text-white hover:bg-white/10' : 'text-gray-900 hover:bg-gray-50'}`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div className="py-6">
                  {user ? (
                    <div 
                      onClick={handleLogout} 
                      className={`flex items-center gap-x-3 cursor-pointer hover:opacity-80 transition-opacity ${isChatbotPage ? 'text-white' : ''}`}
                    >
                      <img 
                        src={user.photoURL || '/default-avatar.png'} 
                        alt="User avatar" 
                        className="w-10 h-10 rounded-full"
                      />
                      <span className={`-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold ${isChatbotPage ? 'text-white' : 'text-gray-900'}`}>
                        {user.displayName || user.email}
                      </span>
                    </div>
                  ) : (
                    <Link
                      to={isLoginPage ? '/signup' : '/login'}
                      className={`-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold ${isChatbotPage ? 'text-white hover:bg-white/10' : 'text-gray-900 hover:bg-gray-50'}`}
                    >
                      {isLoginPage ? 'Sign Up' : 'Login'}
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>
    </div>
  )
}



// 'use client'

// import { useState, useEffect } from 'react'
// import { Dialog, DialogPanel } from '@headlessui/react'
// import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
// import { Link, useLocation, useNavigate } from 'react-router-dom'
// import { onAuthStateChanged, signOut } from "firebase/auth"
// import { auth } from '../auth/auth'

// const navigation = [
//   { name: 'Features', href: '/#features-section' }
// ]

// export default function NavBar() {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
//   const [user, setUser] = useState(null)
//   const navigate = useNavigate()
  
//   // Get current route using useLocation
//   const location = useLocation()

//   // Check if we're on specific routes
//   const isLoginPage = location.pathname === '/login'
//   const isChatbotPage = location.pathname === '/chatbot'

//   // Determine logo source based on current page
//   const logoSrc = isChatbotPage ? '/vite-white.svg' : '/vite.svg'

//   useEffect(() => {
//     // Listen for authentication state changes
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       if (currentUser) {
//         // User is signed in
//         setUser(currentUser)
//       } else {
//         // User is signed out
//         setUser(null)
//       }
//     });

//     // Cleanup subscription on unmount
//     return () => unsubscribe();
//   }, []);

//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//       // Redirect to home page after logout
//       navigate('/');
//     } catch (error) {
//       console.error("Error logging out: ", error);
//     }
//   }

//   return (
//     <div>
//       <header className={`
//         ${isChatbotPage 
//           ? 'absolute inset-x-0 top-0 z-50 bg-transparent backdrop-blur-md bg-opacity-30' 
//           : 'absolute inset-x-0 top-0 z-50 backdrop-blur-sm bg-white/70'
//         }
//       `}>
//         <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
//           <div className="flex lg:flex-1">
//             <Link to="/" className={`-m-1.5 p-1.5 ${isChatbotPage ? 'text-white' : ''}`}>
//               <span className="sr-only">Your Company</span>
//               <img
//                 alt=""
//                 src={logoSrc}
//                 className="h-8 w-auto"
//               />
//             </Link>
//           </div>
//           <div className="flex lg:hidden">
//             <button
//               type="button"
//               onClick={() => setMobileMenuOpen(true)}
//               className={`-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 ${isChatbotPage ? 'text-white' : 'text-gray-700'}`}
//             >
//               <span className="sr-only">Open main menu</span>
//               <Bars3Icon aria-hidden="true" className="size-6" />
//             </button>
//           </div>
//           <div className="hidden lg:flex lg:gap-x-12">
//             {navigation.map((item) => (
//               <Link 
//                 key={item.name} 
//                 to={item.href} 
//                 className={`text-sm/6 font-semibold ${isChatbotPage ? 'text-white' : 'text-gray-900'}`}
//               >
//                 {item.name}
//               </Link>
//             ))}
//           </div>
//           <div className="hidden lg:flex lg:flex-1 lg:justify-end">
//             {user ? (
//               <div 
//                 onClick={handleLogout} 
//                 className={`flex items-center gap-x-4 cursor-pointer hover:opacity-80 transition-opacity ${isChatbotPage ? 'text-white' : ''}`}
//               >
//                 <span className={`text-sm/6 font-semibold ${isChatbotPage ? 'text-white' : 'text-gray-900'}`}>
//                   {user.displayName || user.email}
//                 </span>
//               </div>
//             ) : (
//               <Link 
//                 to={isLoginPage ? '/signup' : '/login'} 
//                 className={`text-sm/6 font-semibold ${isChatbotPage ? 'text-white' : 'text-gray-900'}`}
//               >
//                 {isLoginPage ? 'Sign Up' : 'Login'}
//                 <span aria-hidden="true">&rarr;</span>
//               </Link>
//             )}
//           </div>
//         </nav>
//         <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
//           <div className="fixed inset-0 z-50" />
//           <DialogPanel className={`
//             fixed inset-y-0 right-0 z-50 w-full overflow-y-auto px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10
//             ${isChatbotPage 
//               ? 'bg-black/70 text-white backdrop-blur-md' 
//               : 'bg-white/70 backdrop-blur-md'}
//           `}>
//             <div className="flex items-center justify-between">
//               <Link to="/" className="-m-1.5 p-1.5">
//                 <span className="sr-only">Your Company</span>
//                 <img
//                   alt=""
//                   src={logoSrc === '/vite-white.svg' ? '/vite.svg' : logoSrc}
//                   className="h-8 w-auto"
//                 />
//               </Link>
//               <button
//                 type="button"
//                 onClick={() => setMobileMenuOpen(false)}
//                 className={`-m-2.5 rounded-md p-2.5 ${isChatbotPage ? 'text-white' : 'text-gray-700'}`}
//               >
//                 <span className="sr-only">Close menu</span>
//                 <XMarkIcon aria-hidden="true" className="size-6" />
//               </button>
//             </div>
//             <div className="mt-6 flow-root">
//               <div className="-my-6 divide-y divide-gray-500/10">
//                 <div className="space-y-2 py-6">
//                   {navigation.map((item) => (
//                     <Link
//                       key={item.name}
//                       to={item.href}
//                       className={`-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold ${isChatbotPage ? 'text-white hover:bg-gray-800' : 'text-gray-900 hover:bg-gray-50'}`}
//                     >
//                       {item.name}
//                     </Link>
//                   ))}
//                 </div>
//                 <div className="py-6">
//                   {user ? (
//                     <div 
//                       onClick={handleLogout} 
//                       className={`flex items-center gap-x-3 cursor-pointer hover:opacity-80 transition-opacity ${isChatbotPage ? 'text-white' : ''}`}
//                     >
//                       <img 
//                         src={user.photoURL || '/default-avatar.png'} 
//                         alt="User avatar" 
//                         className="w-10 h-10 rounded-full"
//                       />
//                       <span className={`-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold ${isChatbotPage ? 'text-white' : 'text-gray-900'}`}>
//                         {user.displayName || user.email}
//                       </span>
//                     </div>
//                   ) : (
//                     <Link
//                       to={isLoginPage ? '/signup' : '/login'}
//                       className={`-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold ${isChatbotPage ? 'text-white hover:bg-gray-800' : 'text-gray-900 hover:bg-gray-50'}`}
//                     >
//                       {isLoginPage ? 'Sign Up' : 'Login'}
//                     </Link>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </DialogPanel>
//         </Dialog>
//       </header>
//     </div>
//   )
// }




// 'use client'

// import { useState, useEffect } from 'react'
// import { Dialog, DialogPanel } from '@headlessui/react'
// import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
// import { Link, useLocation, useNavigate } from 'react-router-dom'
// import { onAuthStateChanged, signOut } from "firebase/auth"
// import { auth } from '../auth/auth'

// const navigation = [
//   { name: 'Features', href: '/#features-section' }
// ]

// export default function NavBar() {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
//   const [user, setUser] = useState(null)
//   const navigate = useNavigate()
  
//   // Get current route using useLocation
//   const location = useLocation()

//   // Check if we're on specific routes
//   const isLoginPage = location.pathname === '/login'
//   const isChatbotPage = location.pathname === '/chatbot'

//   // Determine logo source based on current page
//   const logoSrc = isChatbotPage ? '/vite-white.svg' : '/vite.svg'

//   useEffect(() => {
//     // Listen for authentication state changes
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       if (currentUser) {
//         // User is signed in
//         setUser(currentUser)
//       } else {
//         // User is signed out
//         setUser(null)
//       }
//     });

//     // Cleanup subscription on unmount
//     return () => unsubscribe();
//   }, []);

//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//       // Redirect to home page after logout
//       navigate('/');
//     } catch (error) {
//       console.error("Error logging out: ", error);
//     }
//   }

//   return (
//     <div>
//       <header className={`
//         ${isChatbotPage 
//           ? 'absolute inset-x-0 top-0 z-50 bg-transparent' 
//           : 'absolute inset-x-0 top-0 z-50'
//         }
//       `}>
//         <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
//           <div className="flex lg:flex-1">
//             <Link to="/" className={`-m-1.5 p-1.5 ${isChatbotPage ? 'text-white' : ''}`}>
//               <span className="sr-only">Your Company</span>
//               <img
//                 alt=""
//                 src={logoSrc}
//                 className="h-8 w-auto"
//               />
//             </Link>
//           </div>
//           <div className="flex lg:hidden">
//             <button
//               type="button"
//               onClick={() => setMobileMenuOpen(true)}
//               className={`-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 ${isChatbotPage ? 'text-white' : 'text-gray-700'}`}
//             >
//               <span className="sr-only">Open main menu</span>
//               <Bars3Icon aria-hidden="true" className="size-6" />
//             </button>
//           </div>
//           <div className="hidden lg:flex lg:gap-x-12">
//             {navigation.map((item) => (
//               <Link 
//                 key={item.name} 
//                 to={item.href} 
//                 className={`text-sm/6 font-semibold ${isChatbotPage ? 'text-white' : 'text-gray-900'}`}
//               >
//                 {item.name}
//               </Link>
//             ))}
//           </div>
//           <div className="hidden lg:flex lg:flex-1 lg:justify-end">
//             {user ? (
//               <div 
//                 onClick={handleLogout} 
//                 className={`flex items-center gap-x-4 cursor-pointer hover:opacity-80 transition-opacity ${isChatbotPage ? 'text-white' : ''}`}
//               >
//                 <span className={`text-sm/6 font-semibold ${isChatbotPage ? 'text-white' : 'text-gray-900'}`}>
//                   {user.displayName || user.email}
//                 </span>
//               </div>
//             ) : (
//               <Link 
//                 to={isLoginPage ? '/signup' : '/login'} 
//                 className={`text-sm/6 font-semibold ${isChatbotPage ? 'text-white' : 'text-gray-900'}`}
//               >
//                 {isLoginPage ? 'Sign Up' : 'Login'}
//                 <span aria-hidden="true">&rarr;</span>
//               </Link>
//             )}
//           </div>
//         </nav>
//         <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
//           <div className="fixed inset-0 z-50" />
//           <DialogPanel className={`
//             fixed inset-y-0 right-0 z-50 w-full overflow-y-auto px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10
//             ${isChatbotPage ? 'bg-black text-white' : 'bg-white'}
//           `}>
//             <div className="flex items-center justify-between">
//               <Link to="/" className="-m-1.5 p-1.5">
//                 <span className="sr-only">Your Company</span>
//                 <img
//                   alt=""
//                   src={logoSrc === '/vite-white.svg' ? '/vite.svg' : logoSrc}
//                   className="h-8 w-auto"
//                 />
//               </Link>
//               <button
//                 type="button"
//                 onClick={() => setMobileMenuOpen(false)}
//                 className={`-m-2.5 rounded-md p-2.5 ${isChatbotPage ? 'text-white' : 'text-gray-700'}`}
//               >
//                 <span className="sr-only">Close menu</span>
//                 <XMarkIcon aria-hidden="true" className="size-6" />
//               </button>
//             </div>
//             <div className="mt-6 flow-root">
//               <div className="-my-6 divide-y divide-gray-500/10">
//                 <div className="space-y-2 py-6">
//                   {navigation.map((item) => (
//                     <Link
//                       key={item.name}
//                       to={item.href}
//                       className={`-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold ${isChatbotPage ? 'text-white hover:bg-gray-800' : 'text-gray-900 hover:bg-gray-50'}`}
//                     >
//                       {item.name}
//                     </Link>
//                   ))}
//                 </div>
//                 <div className="py-6">
//                   {user ? (
//                     <div 
//                       onClick={handleLogout} 
//                       className={`flex items-center gap-x-3 cursor-pointer hover:opacity-80 transition-opacity ${isChatbotPage ? 'text-white' : ''}`}
//                     >
//                       <img 
//                         src={user.photoURL || '/default-avatar.png'} 
//                         alt="User avatar" 
//                         className="w-10 h-10 rounded-full"
//                       />
//                       <span className={`-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold ${isChatbotPage ? 'text-white' : 'text-gray-900'}`}>
//                         {user.displayName || user.email}
//                       </span>
//                     </div>
//                   ) : (
//                     <Link
//                       to={isLoginPage ? '/signup' : '/login'}
//                       className={`-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold ${isChatbotPage ? 'text-white hover:bg-gray-800' : 'text-gray-900 hover:bg-gray-50'}`}
//                     >
//                       {isLoginPage ? 'Sign Up' : 'Login'}
//                     </Link>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </DialogPanel>
//         </Dialog>
//       </header>
//     </div>
//   )
// }



// 'use client'

// import { useState, useEffect } from 'react'
// import { Dialog, DialogPanel } from '@headlessui/react'
// import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
// import { Link, useLocation, useNavigate } from 'react-router-dom'
// import { onAuthStateChanged, signOut } from "firebase/auth"
// import { auth } from '../auth/auth'

// const navigation = [
//   { name: 'Features', href: '/#features-section' }
// ]

// export default function NavBar() {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
//   const [user, setUser] = useState(null)
//   const navigate = useNavigate()
  
//   // Get current route using useLocation
//   const location = useLocation()

//   // Check if we're on specific routes
//   const isLoginPage = location.pathname === '/login'
//   const isChatbotPage = location.pathname === '/chatbot'

//   useEffect(() => {
//     // Listen for authentication state changes
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       if (currentUser) {
//         // User is signed in
//         setUser(currentUser)
//       } else {
//         // User is signed out
//         setUser(null)
//       }
//     });

//     // Cleanup subscription on unmount
//     return () => unsubscribe();
//   }, []);

//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//       // Redirect to home page after logout
//       navigate('/');
//     } catch (error) {
//       console.error("Error logging out: ", error);
//     }
//   }

//   return (
//     <div>
//       <header className={`
//         ${isChatbotPage 
//           ? 'absolute inset-x-0 top-0 z-50 bg-transparent' 
//           : 'absolute inset-x-0 top-0 z-50'
//         }
//       `}>
//         <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
//           <div className="flex lg:flex-1">
//             <Link to="/" className={`-m-1.5 p-1.5 ${isChatbotPage ? 'text-white' : ''}`}>
//               <span className="sr-only">Your Company</span>
//               <img
//                 alt=""
//                 src="/vite-white.svg"
//                 className="h-8 w-auto"
//               />
//             </Link>
//           </div>
//           <div className="flex lg:hidden">
//             <button
//               type="button"
//               onClick={() => setMobileMenuOpen(true)}
//               className={`-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 ${isChatbotPage ? 'text-white' : 'text-gray-700'}`}
//             >
//               <span className="sr-only">Open main menu</span>
//               <Bars3Icon aria-hidden="true" className="size-6" />
//             </button>
//           </div>
//           <div className="hidden lg:flex lg:gap-x-12">
//             {navigation.map((item) => (
//               <Link 
//                 key={item.name} 
//                 to={item.href} 
//                 className={`text-sm/6 font-semibold ${isChatbotPage ? 'text-white' : 'text-gray-900'}`}
//               >
//                 {item.name}
//               </Link>
//             ))}
//           </div>
//           <div className="hidden lg:flex lg:flex-1 lg:justify-end">
//             {user ? (
//               <div 
//                 onClick={handleLogout} 
//                 className={`flex items-center gap-x-4 cursor-pointer hover:opacity-80 transition-opacity ${isChatbotPage ? 'text-white' : ''}`}
//               >
//                 <span className={`text-sm/6 font-semibold ${isChatbotPage ? 'text-white' : 'text-gray-900'}`}>
//                   {user.displayName || user.email}
//                 </span>
//               </div>
//             ) : (
//               <Link 
//                 to={isLoginPage ? '/signup' : '/login'} 
//                 className={`text-sm/6 font-semibold ${isChatbotPage ? 'text-white' : 'text-gray-900'}`}
//               >
//                 {isLoginPage ? 'Sign Up' : 'Login'}
//                 <span aria-hidden="true">&rarr;</span>
//               </Link>
//             )}
//           </div>
//         </nav>
//         <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
//           <div className="fixed inset-0 z-50" />
//           <DialogPanel className={`
//             fixed inset-y-0 right-0 z-50 w-full overflow-y-auto px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10
//             ${isChatbotPage ? 'bg-black text-white' : 'bg-white'}
//           `}>
//             <div className="flex items-center justify-between">
//               <Link to="/" className="-m-1.5 p-1.5">
//                 <span className="sr-only">Your Company</span>
//                 <img
//                   alt=""
//                   src="/vite.svg"
//                   className="h-8 w-auto"
//                 />
//               </Link>
//               <button
//                 type="button"
//                 onClick={() => setMobileMenuOpen(false)}
//                 className={`-m-2.5 rounded-md p-2.5 ${isChatbotPage ? 'text-white' : 'text-gray-700'}`}
//               >
//                 <span className="sr-only">Close menu</span>
//                 <XMarkIcon aria-hidden="true" className="size-6" />
//               </button>
//             </div>
//             <div className="mt-6 flow-root">
//               <div className="-my-6 divide-y divide-gray-500/10">
//                 <div className="space-y-2 py-6">
//                   {navigation.map((item) => (
//                     <Link
//                       key={item.name}
//                       to={item.href}
//                       className={`-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold ${isChatbotPage ? 'text-white hover:bg-gray-800' : 'text-gray-900 hover:bg-gray-50'}`}
//                     >
//                       {item.name}
//                     </Link>
//                   ))}
//                 </div>
//                 <div className="py-6">
//                   {user ? (
//                     <div 
//                       onClick={handleLogout} 
//                       className={`flex items-center gap-x-3 cursor-pointer hover:opacity-80 transition-opacity ${isChatbotPage ? 'text-white' : ''}`}
//                     >
//                       <img 
//                         src={user.photoURL || '/default-avatar.png'} 
//                         alt="User avatar" 
//                         className="w-10 h-10 rounded-full"
//                       />
//                       <span className={`-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold ${isChatbotPage ? 'text-white' : 'text-gray-900'}`}>
//                         {user.displayName || user.email}
//                       </span>
//                     </div>
//                   ) : (
//                     <Link
//                       to={isLoginPage ? '/signup' : '/login'}
//                       className={`-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold ${isChatbotPage ? 'text-white hover:bg-gray-800' : 'text-gray-900 hover:bg-gray-50'}`}
//                     >
//                       {isLoginPage ? 'Sign Up' : 'Login'}
//                     </Link>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </DialogPanel>
//         </Dialog>
//       </header>
//     </div>
//   )
// }



// 'use client'

// import { useState, useEffect } from 'react'
// import { Dialog, DialogPanel } from '@headlessui/react'
// import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
// import { Link, useLocation, useNavigate } from 'react-router-dom'
// import { onAuthStateChanged, signOut } from "firebase/auth"
// import { auth } from '../auth/auth'

// const navigation = [
//   { name: 'Features', href: '/#features-section' }
// ]

// export default function NavBar() {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
//   const [user, setUser] = useState(null)
//   const navigate = useNavigate()
  
//   // Get current route using useLocation
//   const location = useLocation()

//   // Check if we're on specific routes
//   const isLoginPage = location.pathname === '/login'
//   const isChatbotPage = location.pathname === '/chatbot'

//   useEffect(() => {
//     // Listen for authentication state changes
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       if (currentUser) {
//         // User is signed in
//         setUser(currentUser)
//       } else {
//         // User is signed out
//         setUser(null)
//       }
//     });

//     // Cleanup subscription on unmount
//     return () => unsubscribe();
//   }, []);

//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//       // Redirect to home page after logout
//       navigate('/');
//     } catch (error) {
//       console.error("Error logging out: ", error);
//     }
//   }

//   return (
//     <div>
//       <header className={`
//         ${isChatbotPage 
//           ? 'bg-white shadow-sm' 
//           : 'absolute inset-x-0 top-0 z-50'
//         }
//       `}>
//         <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
//           <div className="flex lg:flex-1">
//             <Link to="/" className="-m-1.5 p-1.5">
//               <span className="sr-only">Your Company</span>
//               <img
//                 alt=""
//                 src="/vite.svg"
//                 className="h-8 w-auto"
//               />
//             </Link>
//           </div>
//           <div className="flex lg:hidden">
//             <button
//               type="button"
//               onClick={() => setMobileMenuOpen(true)}
//               className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
//             >
//               <span className="sr-only">Open main menu</span>
//               <Bars3Icon aria-hidden="true" className="size-6" />
//             </button>
//           </div>
//           <div className="hidden lg:flex lg:gap-x-12">
//             {navigation.map((item) => (
//               <Link key={item.name} to={item.href} className="text-sm/6 font-semibold text-gray-900">
//                 {item.name}
//               </Link>
//             ))}
//           </div>
//           <div className="hidden lg:flex lg:flex-1 lg:justify-end">
//             {user ? (
//               <div 
//                 onClick={handleLogout} 
//                 className="flex items-center gap-x-4 cursor-pointer hover:opacity-80 transition-opacity"
//               >
//                 <span className="text-sm/6 font-semibold text-gray-900">
//                   {user.displayName || user.email}
//                 </span>
//               </div>
//             ) : (
//               <Link 
//                 to={isLoginPage ? '/signup' : '/login'} 
//                 className="text-sm/6 font-semibold text-gray-900"
//               >
//                 {isLoginPage ? 'Sign Up' : 'Login'}
//                 <span aria-hidden="true">&rarr;</span>
//               </Link>
//             )}
//           </div>
//         </nav>
//         <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
//           <div className="fixed inset-0 z-50" />
//           <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
//             <div className="flex items-center justify-between">
//               <Link to="/" className="-m-1.5 p-1.5">
//                 <span className="sr-only">Your Company</span>
//                 <img
//                   alt=""
//                   src="/vite.svg"
//                   className="h-8 w-auto"
//                 />
//               </Link>
//               <button
//                 type="button"
//                 onClick={() => setMobileMenuOpen(false)}
//                 className="-m-2.5 rounded-md p-2.5 text-gray-700"
//               >
//                 <span className="sr-only">Close menu</span>
//                 <XMarkIcon aria-hidden="true" className="size-6" />
//               </button>
//             </div>
//             <div className="mt-6 flow-root">
//               <div className="-my-6 divide-y divide-gray-500/10">
//                 <div className="space-y-2 py-6">
//                   {navigation.map((item) => (
//                     <Link
//                       key={item.name}
//                       to={item.href}
//                       className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
//                     >
//                       {item.name}
//                     </Link>
//                   ))}
//                 </div>
//                 <div className="py-6">
//                   {user ? (
//                     <div 
//                       onClick={handleLogout} 
//                       className="flex items-center gap-x-3 cursor-pointer hover:opacity-80 transition-opacity"
//                     >
//                       <img 
//                         src={user.photoURL || '/default-avatar.png'} 
//                         alt="User avatar" 
//                         className="w-10 h-10 rounded-full"
//                       />
//                       <span className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900">
//                         {user.displayName || user.email}
//                       </span>
//                     </div>
//                   ) : (
//                     <Link
//                       to={isLoginPage ? '/signup' : '/login'}
//                       className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
//                     >
//                       {isLoginPage ? 'Sign Up' : 'Login'}
//                     </Link>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </DialogPanel>
//         </Dialog>
//       </header>
//     </div>
//   )
// }



// 'use client'

// import { useState, useEffect } from 'react'
// import { Dialog, DialogPanel } from '@headlessui/react'
// import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
// import { Link, useLocation, useNavigate } from 'react-router-dom'
// import { onAuthStateChanged, signOut } from "firebase/auth"
// import { auth } from '../auth/auth'

// const navigation = [
//   { name: 'Features', href: '/#features-section' }
// ]

// export default function NavBar() {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
//   const [user, setUser] = useState(null)
//   const navigate = useNavigate()
  
//   // Get current route using useLocation
//   const location = useLocation()

//   // Check if we're on the /login page
//   const isLoginPage = location.pathname === '/login'

//   useEffect(() => {
//     // Listen for authentication state changes
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       if (currentUser) {
//         // User is signed in
//         setUser(currentUser)
//       } else {
//         // User is signed out
//         setUser(null)
//       }
//     });

//     // Cleanup subscription on unmount
//     return () => unsubscribe();
//   }, []);

//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//       // Redirect to home page after logout
//       navigate('/');
//     } catch (error) {
//       console.error("Error logging out: ", error);
//     }
//   }

//   return (
//     <div>
//       <header className="absolute inset-x-0 top-0 z-50">
//         <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
//           <div className="flex lg:flex-1">
//             <Link to="/" className="-m-1.5 p-1.5">
//               <span className="sr-only">Your Company</span>
//               <img
//                 alt=""
//                 src="/vite.svg"
//                 className="h-8 w-auto"
//               />
//             </Link>
//           </div>
//           <div className="flex lg:hidden">
//             <button
//               type="button"
//               onClick={() => setMobileMenuOpen(true)}
//               className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
//             >
//               <span className="sr-only">Open main menu</span>
//               <Bars3Icon aria-hidden="true" className="size-6" />
//             </button>
//           </div>
//           <div className="hidden lg:flex lg:gap-x-12">
//             {navigation.map((item) => (
//               <Link key={item.name} to={item.href} className="text-sm/6 font-semibold text-gray-900">
//                 {item.name}
//               </Link>
//             ))}
//           </div>
//           <div className="hidden lg:flex lg:flex-1 lg:justify-end">
//             {user ? (
//               <div 
//                 onClick={handleLogout} 
//                 className="flex items-center gap-x-4 cursor-pointer hover:opacity-80 transition-opacity"
//               >
//                 <span className="text-sm/6 font-semibold text-gray-900">
//                   {user.displayName || user.email}
//                 </span>
//               </div>
//             ) : (
//               <Link 
//                 to={isLoginPage ? '/signup' : '/login'} 
//                 className="text-sm/6 font-semibold text-gray-900"
//               >
//                 {isLoginPage ? 'Sign Up' : 'Login'}
//                 <span aria-hidden="true">&rarr;</span>
//               </Link>
//             )}
//           </div>
//         </nav>
//         <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
//           <div className="fixed inset-0 z-50" />
//           <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
//             <div className="flex items-center justify-between">
//               <Link to="/" className="-m-1.5 p-1.5">
//                 <span className="sr-only">Your Company</span>
//                 <img
//                   alt=""
//                   src="/vite.svg"
//                   className="h-8 w-auto"
//                 />
//               </Link>
//               <button
//                 type="button"
//                 onClick={() => setMobileMenuOpen(false)}
//                 className="-m-2.5 rounded-md p-2.5 text-gray-700"
//               >
//                 <span className="sr-only">Close menu</span>
//                 <XMarkIcon aria-hidden="true" className="size-6" />
//               </button>
//             </div>
//             <div className="mt-6 flow-root">
//               <div className="-my-6 divide-y divide-gray-500/10">
//                 <div className="space-y-2 py-6">
//                   {navigation.map((item) => (
//                     <Link
//                       key={item.name}
//                       to={item.href}
//                       className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
//                     >
//                       {item.name}
//                     </Link>
//                   ))}
//                 </div>
//                 <div className="py-6">
//                   {user ? (
//                     <div 
//                       onClick={handleLogout} 
//                       className="flex items-center gap-x-3 cursor-pointer hover:opacity-80 transition-opacity"
//                     >
//                       <img 
//                         src={user.photoURL || '/default-avatar.png'} 
//                         alt="User avatar" 
//                         className="w-10 h-10 rounded-full"
//                       />
//                       <span className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900">
//                         {user.displayName || user.email}
//                       </span>
//                     </div>
//                   ) : (
//                     <Link
//                       to={isLoginPage ? '/signup' : '/login'}
//                       className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
//                     >
//                       {isLoginPage ? 'Sign Up' : 'Login'}
//                     </Link>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </DialogPanel>
//         </Dialog>
//       </header>
//     </div>
//   )
// }