import toast from 'react-hot-toast'
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth'
import { app } from '../firebase.js';
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice.js';

const OAuth = () => {
    const dispatch = useDispatch();
    const handleGoogle = async () => {

        // remember to add this config to axios because otherwise you will not see access_token in you localstorage in browser
        const config = {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        };
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            const result = await signInWithPopup(auth, provider)
            const data = {
                name: result.user.displayName,
                email: result.user.email,
                photo: result.user.photoURL,
            }
            const res = await axios.post('http://localhost:5555/api/auth/google', data, config)
            console.log(res.data);
            dispatch(signInSuccess(res.data))

        } catch (error) {
            console.log("Could not connect to Google", error);
            // Extracting the error message
            const errorMessage = error.response && error.response.data && error.response.data.message
                ? error.response.data.message
                : 'An error occurred';
            toast.error(errorMessage);



        }

    }
    return (
        <button className='bg-red-700 text-white rounded-lg p-3 uppercase hover:opacity-95' onClick={handleGoogle}>Continue with Google</button>
    )
}

export default OAuth