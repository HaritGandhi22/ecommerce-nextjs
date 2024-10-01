'use client';

import { useState } from 'react';
import Cookies from 'js-cookie'; // For browser cookies

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
  
    const response = await fetch('https://fakestoreapi.com/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
  
    const data = await response.json();
  
    if (data.token) {
      Cookies.set('authToken', data.token);
      setMessage('Login Successful!');
    } else {
      setMessage('Login failed.');
    }
  
    setLoading(false);
  };

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const response = await fetch('https://fakestoreapi.com/users', {
      method: 'POST',
      body: JSON.stringify({
        email: email,
        username: username,
        password: password,
        name: {
          firstname: 'John',
          lastname: 'Doe',
        },
        address: {
          city: 'kilcoole',
          street: '7835 new road',
          number: 3,
          zipcode: '12926-3874',
          geolocation: {
            lat: '-37.3159',
            long: '81.1496',
          },
        },
        phone: '1-570-236-7033',
      }),
    });

    const data = await response.json();
    if (data.id) {
      setMessage('Account created successfully!');
    } else {
      setMessage('Account creation failed.');
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Login Section */}
        <div className="border p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-center">{isLogin ? 'Login' : 'Create Account'}</h2>

          {/* Form */}
          <form onSubmit={isLogin ? handleLogin : handleCreateAccount} className="space-y-4">
            {!isLogin && (
              <div>
                <label htmlFor="email" className="block font-medium">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border rounded px-3 py-2 mt-1"
                  required={!isLogin}
                />
              </div>
            )}

            <div>
              <label htmlFor="username" className="block font-medium">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border rounded px-3 py-2 mt-1"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block font-medium">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border rounded px-3 py-2 mt-1"
                required
              />
            </div>

            <button
              type="submit"
              className={`w-full py-2 text-white rounded ${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'}`}
              disabled={loading}
            >
              {loading ? 'Processing...' : isLogin ? 'Login' : 'Create Account'}
            </button>
          </form>

          <p className="mt-4 text-center text-green-500">{message}</p>

          <div className="mt-4 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-500 underline"
            >
              {isLogin ? 'Create an account' : 'Already have an account? Login'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
