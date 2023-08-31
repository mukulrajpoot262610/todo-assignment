import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { register } from '../services/api';
import { useDispatch } from 'react-redux';
import { setAuth } from '../redux/authSlice';
import { toast } from 'react-hot-toast';

const Register = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await register({ username, password, email });
            dispatch(setAuth(data))
            toast.success(data.msg);
            navigate('/dashboard')
        } catch (err) {
            toast.error(err?.response?.data?.msg || err?.message);
            console.log(err)
        }
    }

    return (
        <div className='min-h-screen w-full flex flex-col justify-center items-center'>
            <div className='max-w-lg border rounded-lg p-6 w-full'>
                <h1 className='text-2xl font-bold mb-4'>Register</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-control w-full max-w-lg">
                        <label className="label">
                            <span className="label-text">What is your username?</span>
                        </label>
                        <input type="text" placeholder="Type here" onChange={(e) => setUsername(e.target.value)} value={username} className="input input-bordered w-full" required />
                    </div>
                    <div className="form-control w-full max-w-lg">
                        <label className="label">
                            <span className="label-text">What is your Email?</span>
                        </label>
                        <input type="email" placeholder="Type here" onChange={(e) => setEmail(e.target.value)} value={email} className="input input-bordered w-full" required />
                    </div>
                    <div className="form-control w-full max-w-lg">
                        <label className="label">
                            <span className="label-text">Choose your Password</span>
                        </label>
                        <input type="password" placeholder="Type here" onChange={(e) => setPassword(e.target.value)} value={password} className="input input-bordered w-full" required />
                    </div>
                    <div>
                        <button className='btn w-full mt-4'>Register</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register