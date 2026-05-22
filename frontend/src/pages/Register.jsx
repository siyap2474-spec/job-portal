import React, {useState} from 'react';
import { useNavigate, Link} from 'react-router-dom';

import { registerUser } from '../features/auth/authAPI';

import registrationImg from '../assets/registrationImg.png';


function Register() {
   const navigate = useNavigate();

   const [formData, setFormData] = useState({
    name: "",
    email: "",
    password:"",
    role:"CANDIDATE"
   });

   const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
   };

   const handleSubmit = async (e) => {
    e.preventDefault();

    try{
       await registerUser(formData);

       alert("Registration successful");
       navigate("/login");
    }
    catch(error){
       alert(error.response?.data?.message || "Register failed");
    }
   };

  return (
    <div className='min-h-screen grid grid-cols-2 bg-white'>

      <div className='flex justify-center items-center'>
        <img src={registrationImg} alt='register' 
        className='w-[481px]' />
      </div>

      <div className='flex justify-center items-center'>
        <form onSubmit={handleSubmit} className='w-[371px]'>

        <h1 className='text-4xl font-bold text-blue-500 mb-10'>
          Create Account
        </h1>
    
    <input
      type='text'
      name='name'
      placeholder='Full Name'
      value={formData.name}
      onChange={handleChange}
      className='w-full border p-3 mb-4 rounded'
    />

    <input
     type='email'
     name='email'
     placeholder='Email Address'
     value={formData.email}
     onChange={handleChange}
    className='w-full border p-3 mb-4 rounded'
    />

     <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border p-3 mb-4 rounded"
          />

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full border p-3 mb-6 rounded">
        <option value="CANDIDATE">Candidate</option>
        <option value="RECRUITER">Recruiter</option>
         </select>

         <button
          type='submit'
          className='w-full bg-blue-600 text-white py-3 rounded'
         >
          Sing Up
         </button>

         <p className='mt-8 text-center'>
          Already have an account?{' '}
          <Link to='/login' className='text-blue-600'>
             Login
          </Link>
         </p>

        </form>
      </div>
    </div>
  )
}

export default Register
