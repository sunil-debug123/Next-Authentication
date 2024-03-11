"use client";

import React, { useState } from 'react';
import { MailIcon, LockClosedIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import { LOGIN_API, LOGIN_PAGE } from '@/helpers/constant';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      // Here you would replace 'LOGIN_API_ENDPOINT' with your actual login API endpoint
      const response = await axios.post(LOGIN_API, user);

      // Assuming the API returns a success status and a token on successful login
      if (response.status === 200) {
        setUser({
          email: '',
          password: '',
        });
        // Redirect user or do additional actions upon successful login
        router.push('/dashboard');
      } else {
        // Handle cases where the API response status is not successful
        toast.error('Login failed. Please check your credentials.');
      }
    } catch (error) {
      // Handle error, such as network issues or server errors
      toast.error(error.message || 'An error occurred during login.');
    } finally {
      setLoading(false);
    }
  
  };

  return (
    <div>
      <ToastContainer theme="dark"/>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" method='post'>
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
                      required=""
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
                      required=""
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                        required=""
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="remember"
                        className="text-gray-500 dark:text-gray-300"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>
                  <a
                    href="#"
                    className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Forgot password?
                  </a>
                </div>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  {loading ? "Logging...." : "Sign in"}
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet?{' '}
                  <Link
                    href="/signup"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    target='_blank'
                  >
                    Sign up
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
