

'use client'

import React from 'react';
import { useState } from 'react'
import './ani-text.css'
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../auth/auth';

const links = [
  { name: 'Open roles', href: '#' },
  { name: 'Internship program', href: '#' },
  { name: 'Our values', href: '#' },
  { name: 'Meet our leadership', href: '#' },
]

const stats = [
  { name: 'Offices worldwide', value: '12' },
  { name: 'Full-time colleagues', value: '300+' },
  { name: 'Hours per week', value: '40' },
  { name: 'Paid time off', value: 'Unlimited' },
]

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  

  const { hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const targetElement = document.getElementById(hash.substring(1));
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [hash]);

  return (
    <div id='main-section' class="overflow-auto scrollbar-hide">
    <div className="bg-contain bg-center h-screen bg-gradient-to-br to-[#11b2e4] from-[#dcdad1] bg-gradient-animation bg-blend-screen">
      <div className="relative isolate px-6 pt-14 lg:px-8 ">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-70 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem] bg-blend-darken"
          />
        </div>
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-balance text-3xl font-semibold text-transparent bg-clip-text sm:text-7xl drop-shadow-2xl" style={{
      background: 'linear-gradient(135deg, #3B86C5 0%, #784BA0 57%,#FF3CAC 100%)',
      '-webkit-background-clip': 'text',
      'background-clip': 'text ',
    }}>
            Plan Your Project with Ease
            </h1>
            <p className="mt-9 text-pretty text-lg font-medium text-gray-700 sm:text-xl/8">
            Our AI <b className='text-purple-700 bg-gradient-animation"'>ScopeBot</b> helps you gather requirements, define scope, choose the right tech stack, and estimate budgets and deadlines—all in one place.
                    Simplify planning, save time, and bring your ideas to life effortlessly.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="/chatbot"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 hover:drop-shadow-2xl backdrop-blur-md"
              >
                Get started
              </a>
            </div>
          </div>
        </div>
        <div
          aria-hidden="true"
          className=" absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
        </div>
      </div>
      <div id="features-section" className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-center text-base/7 font-semibold text-indigo-600">Deploy faster</h2>
          <p className="mx-auto mt-2 max-w-lg text-balance text-center text-4xl font-semibold tracking-tight text-gray-950 sm:text-5xl">
            Everything you need to deploy your app
          </p>
          <div className="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2">
            <div className="relative lg:row-span-2">
              <div className="absolute inset-px rounded-lg bg-white lg:rounded-l-[2rem]"></div>
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] lg:rounded-l-[calc(2rem+1px)]">
                <div className="px-8 pb-3 pt-8 sm:px-10 sm:pb-0 sm:pt-10">
                  <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">
                    Mobile friendly
                  </p>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                  An AI-powered, mobile-friendly app for seamless project planning and smarter team collaboration.
                  </p>
                </div>
                <div className="relative min-h-[30rem] w-full grow [container-type:inline-size] max-lg:mx-auto max-lg:max-w-sm">
                  <div className="absolute inset-x-10 bottom-0 top-10 overflow-hidden rounded-t-[12cqw] border-x-[3cqw] border-t-[3cqw] border-gray-700 bg-gray-900 shadow-2xl">
                    <img
                      className="size-full object-cover object-top"
                      src="https://tailwindui.com/plus/img/component-images/bento-03-mobile-friendly.png"
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 lg:rounded-l-[2rem]"></div>
            </div>
            <div className="relative max-lg:row-start-1">
              <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-t-[2rem]"></div>
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]">
                <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                  <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">Performance</p>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                  An app optimized for high performance, ensuring swift and reliable project planning.
                  </p>
                </div>
                <div className="flex flex-1 items-center justify-center px-8 max-lg:pb-12 max-lg:pt-10 sm:px-10 lg:pb-2">
                  <img
                    className="w-full max-lg:max-w-xs"
                    src="https://tailwindui.com/plus/img/component-images/bento-03-performance.png"
                    alt=""
                  />
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-t-[2rem]"></div>
            </div>
            <div className="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2">
              <div className="absolute inset-px rounded-lg bg-white"></div>
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)]">
                <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                  <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">Security</p>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                  Seamless performance meets uncompromising security, safeguarding your project data every step of the way.
                  </p>
                </div>
                <div className="flex flex-1 items-center [container-type:inline-size] max-lg:py-6 lg:pb-2">
                  <img
                    className="h-[min(152px,40cqw)] object-cover"
                    src="https://tailwindui.com/plus/img/component-images/bento-03-security.png"
                    alt=""
                  />
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5"></div>
            </div>
            <div className="relative lg:row-span-2">
              <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]"></div>
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-r-[calc(2rem+1px)]">
                <div className="px-8 pb-3 pt-8 sm:px-10 sm:pb-0 sm:pt-10">
                  <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">
                    Powerful APIs
                  </p>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                  Powerful APIs designed to integrate seamlessly and enhance functionality with ease.
                  </p>
                </div>
                <div className="relative min-h-[30rem] w-full grow">
                  <div className="absolute bottom-0 left-10 right-0 top-10 overflow-hidden rounded-tl-xl bg-gray-900 shadow-2xl">
                    <div className="flex bg-gray-800/40 ring-1 ring-white/5">
                      <div className="-mb-px flex text-sm/6 font-medium text-gray-400">
                        <div className="border-b border-r border-b-white/20 border-r-white/10 bg-white/5 px-4 py-2 text-white">
                          NotificationSetting.jsx
                        </div>
                        <div className="border-r border-gray-600/10 px-4 py-2">App.jsx</div>
                      </div>
                    </div>
                    <div className="px-6 pb-14 pt-6">{/* Your code example */}</div>
                  </div>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="team">
        <div className="py-24 sm:py-32  ">
          <div className="mx-auto grid max-w-7xl gap-20 px-6 lg:px-8 xl:grid-cols-2 " >
            <div className="max-w-xl">
              <h2 className="text-pretty text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
                Meet our Developers!
              </h2>
              <p className="mt-6 text-lg/8 text-gray-600">
                We're a team of four passionate individuals driven by creativity and dedication, working together to
                deliver exceptional results and make your vision a reality.
              </p>
            </div>

            <ul role="list" className="grid gap-x-9 gap-y-12  sm:grid-cols-4 max-sm:grid-cols-1 sm:gap-y-16 xl:col-span-4 hover:backdrop-blur-md ">
            <li className="flex items-center gap-x-3">
            <div className="relative group w-24 h-24">
            {/* Glow Effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition duration-300 blur-md scale-110"></div>
             {/* Profile Image */}
             <img
             className="relative z-10 rounded-full w-24 h-24 object-cover max-w-24"
             src="/vinay.png"
             alt="Vinay Tilada" />
</div>


    <div>
      <h3 className="text-2xl font-semibold tracking-tight text-gray-900">
        <a href="https://www.linkedin.com/in/vinaytilada/">Vinay Tilada</a>
      </h3>
      <p className="text-sm font-semibold text-indigo-600">Backend / Deployment Developer</p>
    </div>
  </li>

  <li className="flex items-center gap-x-3">
    <div className="relative group w-24 h-24">
      {/* Glow Effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition duration-300 blur-md scale-110"></div>
      {/* Profile Image */}
      <img
        className="relative z-10 rounded-full w-24 h-24 object-cover max-w-24"
        src="/manas.png"
        alt="Manas Kolaskar"
      />
    </div>
    <div>
      <h3 className="text-2xl font-semibold tracking-tight text-gray-900">
        <a href="https://www.linkedin.com/in/manaskolaskar/">Manas Kolaskar</a>
      </h3>
      <p className="text-sm font-semibold text-indigo-600">Front End Developer</p>
    </div>
  </li>

  <li className="flex items-center gap-x-3">
    <div className="relative group w-24 h-24">
      {/* Glow Effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition duration-300 blur-md scale-110"></div>
      {/* Profile Image */}
      <img
        className="relative z-10 rounded-full w-24 h-24 object-cover max-w-24"
        src="/khushi.png"
        alt="Khushi Thakur"
      />
    </div>
    <div>
      <h3 className="text-2xl font-semibold tracking-tight text-gray-900">
        <a href="https://www.linkedin.com/in/khushi-thakur-259395300/">Khushi Thakur</a>
      </h3>
      <p className="text-sm font-semibold text-indigo-600">Front End Developer</p>
    </div>
  </li>

  <li className="flex items-center gap-x-3">
    <div className="relative group w-24 h-24">
      {/* Glow Effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition duration-300 blur-md scale-110"></div>
      {/* Profile Image */}
      <img
        className="relative z-10 rounded-full w-24 h-24 object-cover max-w-24"
        src="/vansh.png"
        alt="Vansh Jain"
      />
    </div>
    <div>
      <h3 className="text-2xl font-semibold tracking-tight text-gray-900">
        <a href="https://www.linkedin.com/in/codewithvansh-jain/">Vansh Jain</a>
      </h3>
      <p className="text-sm font-semibold text-indigo-600">Full Stack Developer</p>
    </div>
  </li>
</ul>
  
</div>
        </div>
      </div>
      <div className="tecStack">
        <div className="bg-white py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-center text-3xl/8 font-semibold text-gray-900">
            <b className='text-purple-700 text-gradient-animation'> Technology </b> used to make it Possible
            </h2>
            <div className="mx-auto mt-20 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-4 ">
              <img
                className="col-span-2 max-h-13 max-w-94 object-contain lg:col-span-1 "
                src="/fastapi-1.svg"
                alt="Fast API"
                width="158"
                height="48"
              />
              <img
                className="col-span-2 max-h-13 max-w-94 object-contain lg:col-span-1"
                src="/react-2.svg"
                alt="React"
                width="158"
                height="48"
              />
              <img
                className="col-span-2 max-h-13 max-w-94 object-contain lg:col-span-1"
                src="/google-ai-1.svg"
                alt="Google AI"
                width="158"
                height="48"
              />
              <img
                className="col-span-2 max-h-13 max-w-94 object-contain sm:col-start-1 lg:col-span-1"
                src="/mongodb-icon-2.svg"
                alt="Mongo DB"
                width="158"
                height="48"
              />
            </div>
          </div>
        </div>
      </div>
      <footer id='footer-section' class="bg-white shadow dark:bg-gray-900">
    <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div class="sm:flex sm:items-center sm:justify-between">
            <a href="/" class="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                <img src="/vite-white.svg" class="h-8" alt="Flowbite Logo" />
                <span class="self-center text-2xl font-semibold whitespace-nowrap text-white ">ScopeBot</span>
            </a>
            <ul class="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                <li>
                    <a href="#" class="hover:underline me-4 md:me-6">About</a>
                </li>

                <li>
                    <a href="https://github.com/MightyAcE58/code-storm/blob/main/LICENSE" class="hover:underline me-4 md:me-6">Licensing</a>
                </li>
                <li>
                    <a href="https://github.com/MightyAcE58/code-storm" class="hover:underline">Contact</a>
                </li>
            </ul>
        </div>
        <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <a href="#" class="hover:underline">ScopeBot™</a>. All Rights Reserved.</span>
    </div>
</footer>
    </div>
    </div>
  )
}