/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
"use client"
import { useState } from "react"
import { useRouter } from 'next/navigation';
import { register } from './api';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('')
  const router = useRouter()
  
  const handleLogin = async () => {
    const response = await register(email, password)
    
    if (response) {
      router.push('/login')
    } else {
      setError('Invalid email or password')
    }
  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center h-screen px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=green&shade=400"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Register
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  onChange={(ev) => setEmail(ev.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#65B741] px-2 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  onChange={(ev) => setPassword(ev.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#65B741] px-2 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            {
              error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <div><strong className="font-bold">Holy smokes!</strong></div>
              <span className="block sm:inline">{error}</span>
            </div>
            }
            <div>
              <button
                type="button"
                onClick={handleLogin}
                className="flex w-full justify-center rounded-md bg-[#9BCF53] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#65B741] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#65B741]"
              >
                Sign in
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
