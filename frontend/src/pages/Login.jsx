import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { toast } from 'react-toastify';
import { api } from '../services/api';
import { ShopContext } from '../context/ShopContext';

const Login = ({ initialState = 'Login' }) => {
  const [currentState, setCurrentState] = useState(initialState);
  const { setToken, navigate, token } = useContext(ShopContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Redirect if already logged in
  React.useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (currentState === 'Login') {
        const res = await api.post('/api/users/login', { email, password });
        if (res.data.success) {
          setToken(res.data.token);
          localStorage.setItem('token', res.data.token);
          toast.success('Logged in successfully');
          navigate('/');
        } else {
          toast.error(res.data.message);
        }
      } else {
        const res = await api.post('/api/users/register', { name, email, password });
        if (res.data.success) {
          setToken(res.data.token);
          localStorage.setItem('token', res.data.token);
          toast.success('Registration successful');
          navigate('/');
        } else {
          toast.error(res.data.message);
        }
      }
    } catch (e) {
      console.log(e);
      toast.error(e.response?.data?.message || 'Authentication failed');
    }
  };

  return (
    <div className="w-full min-h-[80vh] flex items-center justify-center">
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col items-center w-[90%] sm:max-w-[450px] m-auto mt-14 gap-4 text-gray-800"
      >
        <div className="inline-flex items-center gap-2 mb-2 mt-10">
          <p className="prata-regular text-3xl">{currentState}</p>
          <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
        </div>

        {currentState === 'Login' ? null : (
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-800 rounded"
            placeholder="Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}

        <input
          type="email"
          className="w-full px-3 py-2 border border-gray-800 rounded"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full px-3 py-2 border border-gray-800 rounded"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="w-full flex justify-between text-sm mt-[-8px]">
          <p className="cursor-pointer">Forgot your password?</p>
          {currentState === 'Login' ? (
            <p onClick={() => setCurrentState('Sign Up')} className="cursor-pointer">
              Create account
            </p>
          ) : (
            <p onClick={() => setCurrentState('Login')} className="cursor-pointer">
              Login Here
            </p>
          )}
        </div>

        <button className="bg-black text-white font-light px-8 py-2 mt-4 rounded active:bg-gray-700 transition">
          {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
};

export default Login;
