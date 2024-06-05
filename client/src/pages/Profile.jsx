import { useSelector } from "react-redux"
import { useRef, useState, useEffect } from 'react'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { app } from "../firebase"
import toast from "react-hot-toast"


const Profile = () => {
    const { currentUser } = useSelector((state) => state.user)
    const fileRef = useRef(null);
    const [image, setImage] = useState(undefined);
    const [imgLoading, setImgLoading] = useState(0);
    const [formData, setFormData] = useState({});
    const [imageError, setImageError] = useState(undefined);
    console.log(formData)


    useEffect(() => {
        if (image) {
            handleFileUpload(image)
        }
    }, [image])

    const handleFileUpload = async (image) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + image.name;
        const storageRef = ref(storage, fileName)
        const uploadTask = uploadBytesResumable(storageRef, image)
        toast.promise(
            new Promise((resolve, reject) => {
                uploadTask.on(
                    'state_changed',
                    (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        setImgLoading(Math.round(progress));
                    },
                    (error) => {
                        setImageError(error);
                        reject(error);

                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                            setFormData({ ...formData, profilePicture: downloadURL });
                        })
                        resolve();
                    }
                );
            }),
            {
                loading: 'Uploading...',
                success: <b>Profile Photo Uploaded!</b>,
                error: <b>Could not save.</b>,
            }
        );
    }


    return (
        <div className='p-3 max-w-lg mx-auto'>
            <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
            <form className='flex flex-col gap-4'>
                <input type='file' ref={fileRef} hidden accept='image/*'
                    onChange={(e) => setImage(e.target.files[0])} />

                <img src={formData.profilePicture || currentUser.profilePicture} alt='profile-picture'
                    className='h-24 w-24 self-center rounded-full cursor-pointer object-cover'
                    onClick={() => fileRef.current.click()} />

                <p className='text-sm self-center'>{imageError ?
                    (<span className='text-red-700'>Error Uploading Image (file size must be less than 5 MB)</span>)
                    : imgLoading > 0 && imgLoading < 100 ? (
                        <span className='text-slate-700'>{`Uploading Image... ${imgLoading}%`}</span>
                    ) : imgLoading === 100 ? '' : ''}</p>

                <input defaultValue={currentUser.username} type='text' id='username' placeholder='Username'
                    className='bg-slate-100 rounded-lg p-3' />

                <input defaultValue={currentUser.email} type='email' id='email' placeholder='Email'
                    className='bg-slate-100 rounded-lg p-3' />

                <input type='password' id='password' placeholder='Password'
                    className='bg-slate-100 rounded-lg p-3' />

                <button className='bg-green-600 text-white rounded-lg p-3 uppercase hover:opacity-85 disabled:opacity-50'>Update</button>
            </form>
            <div className='flex justify-between py-2'>
                <span className='text-red-600 cursor-pointer'>Delete Account?</span>
                <span className='cursor-pointer'>Sign Out</span>
            </div>
        </div>

    )
}

export default Profile