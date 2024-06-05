import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import OAuth from '../components/OAuth'


const SignUp = () => {


    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()



    const handleSubmit = async (e) => {
        e.preventDefault()

        const data = { username, email, password }
        try {
            setLoading(true);
            const save = await axios.post('http://localhost:5555/api/auth/signup', data)
            toast.success('Account Created Successfully');
            console.log('Account Created Successfully')
            setLoading(false)

            navigate('/sign-in')
        } catch (error) {
            setLoading(false)
            setError(true)
            console.log(error);
            // Extracting the error message
            const errorMessage = error.response && error.response.data && error.response.data.message
                ? error.response.data.message
                : 'An error occurred';
            toast.error(errorMessage);

        }
    }
    return (
        <div className='p-3 max-w-lg mx-auto'>
            <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
            <div className='flex flex-col gap-4 '>
                <input type='text' placeholder='Username' id='username' className='bg-slate-100 p-3 rounded-lg' onChange={(e) => setUsername(e.target.value)} />
                <input type='email' placeholder='Email' id='email' className='bg-slate-100 p-3 rounded-lg' onChange={(e) => setEmail(e.target.value)} />
                <input type='password' placeholder='Password' id='password' className='bg-slate-100 p-3 rounded-lg' onChange={(e) => setPassword(e.target.value)} />
                <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80' onClick={handleSubmit}>{loading ? 'Loading..' : 'Sign Up'}</button>
                <OAuth />
            </div>
            <div className='flex gap-2 mt-5'>
                <p>Have an account?</p>
                <Link to='/sign-in'>
                    <span className='text-blue-400'>Sign in</span>
                </Link>

            </div>
        </div>

    )
}

export default SignUp