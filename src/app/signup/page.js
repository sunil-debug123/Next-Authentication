"use client";

import React, { useState } from 'react';
import { UserIcon, MailIcon, LockClosedIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { SIGNUP_API } from '@/helpers/constant';


export default function Signup() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    email: '',
    password: '',
    username: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Email validation using regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(user?.email)) {
      toast.error('Please Enter Valid Email Address');
      return;
    }
  
    // Username validation to ensure it's not empty
    if (!user?.username || user.username.trim().length === 0) {
      toast.error('Please Enter a Username');
      return;
    }
  
    // Password validation to ensure it's not too short
    if (!user?.password || user.password.length < 6) {
      toast.error('Password should be at least 6 characters long');
      return;
    }
  
    try {
      setLoading(true);
      // Sending POST request to /api/signup
      const response = await axios.post(SIGNUP_API, user);
      
      // Assuming the API responds with a status code that reflects the outcome
      // Check for success response status or message
      if (response.data.success) {
        toast.success(response.data.message);
        setUser({
          username: '',
          email: '',
          password: ''
        });
      } else {
        // This will handle other cases, including user already exists, but the API should send a specific message/error for it
        toast.error(response.data.error || 'An error occurred. Please try again.');
      }
  
    } catch (error) {
      // If the error is from the server response and contains the expected message
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error);
      } else {
        // Generic error message for other types of errors (e.g., network issues)
        toast.error('An error occurred. Please check your internet connection and try again.');
      }
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900">
        <ToastContainer theme="dark"/>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create an account
              </h1>
              <form className="space-y-4 md:space-y-6" method="post" onSubmit={handleSubmit}>
                <div className="flex flex-col">
                  <label
                    htmlFor="fullname"
                    className="mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Full Name
                  </label>
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <UserIcon className="h-5 w-5 ml-2 mr-2 text-gray-500" />
                    <input
                      type="text"
                      name="userName"
                      id="userName"
                      value={user?.username}
                      onChange={(e) => {setUser({...user, username: e.target.value})}}
                      className="text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full py-2 px-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="email"
                    className="mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <MailIcon className="h-5 w-5 ml-2 mr-2 text-gray-500" />
                    <input
                      type="email"
                      name="email"
                      id="email"
                      onChange={(e) => {setUser({...user, email: e.target.value})}}
                      value={user?.email}
                      className="text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full py-2 px-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="example@mail.com"
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="password"
                    className="mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <LockClosedIcon className="h-5 w-5 ml-2 mr-2 text-gray-500" />
                    <input
                      type="password"
                      name="password"
                      id="password"
                      onChange={(e) => {setUser({...user, password: e.target.value})}}
                      value={user?.password}
                      placeholder="••••••••"
                      className="text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full py-2 px-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                    />
                  </div>
                </div>
                <button
                type='submit'
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm py-2 px-4 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  {loading ? "Creating....." : "Sign up" }
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{' '}
                  <Link
                    href="/login"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    target='_blank'
                  >
                    Sign in
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
