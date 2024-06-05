import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { signInStart, signInSuccess, signInFail } from '../redux/user/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import OAuth from '../components/OAuth'


const SignIn = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { loading, error } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault()

        const data = { email, password }
        // remember to add this config to axios because otherwise you will not see access_token in you localstorage in browser
        const config = {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        };
        try {
            dispatch(signInStart())
            const response = await axios.post('http://localhost:5555/api/auth/signin', data, config)
            toast.success('Signed in successfully');
            console.log('Signed in successfully')


            if (response.data.success === false) {
                dispatch(signInFail(response.data.message));
                return;
            }
            dispatch(signInSuccess(response.data))

            navigate('/')
        } catch (error) {
            dispatch(signInFail(error.message));

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
            <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
            <div className='flex flex-col gap-4 '>

                <input type='email' placeholder='Email' id='email' className='bg-slate-100 p-3 rounded-lg' onChange={(e) => setEmail(e.target.value)} />
                <input type='password' placeholder='Password' id='password' className='bg-slate-100 p-3 rounded-lg' onChange={(e) => setPassword(e.target.value)} />
                <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80' onClick={handleSubmit}>{loading ? 'Loading..' : 'Sign In'}</button>
                <OAuth />
            </div>
            <div className='flex gap-2 mt-5'>
                <p>Don&apos;t Have an account?</p>
                <Link to='/sign-up'>
                    <span className='text-blue-400'>Sign Up</span>
                </Link>

            </div>
        </div>

    )
}

export default SignIn