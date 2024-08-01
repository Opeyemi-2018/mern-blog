
import { Button } from 'flowbite-react';
import { AiFillGoogleCircle } from 'react-icons/ai'
import {GithubAuthProvider, signInWithPopup, getAuth, GoogleAuthProvider} from 'firebase/auth'
import {app} from '../firebase'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';


export default function OAuth() {
    let dispatch = useDispatch()
    let navigate = useNavigate()
    let auth = getAuth(app)
    const handleGoogleClick = async () => {
        let provider = new GoogleAuthProvider()
        provider.setCustomParameters({prompt: 'select_account'})
        try {
           let resultsFromGoogle = await signInWithPopup(auth, provider)
           console.log(resultsFromGoogle);
           let res = await fetch('/api/auth/google', {
            method: 'POST', headers: {'content-Type': 'application/json'},
            body: JSON.stringify({
                name: resultsFromGoogle.user.displayName,
                email: resultsFromGoogle.user.email,
                googlePhotoUrl: resultsFromGoogle.user.photoURL
            })
           })
           let data = await res.json()
           if(res.ok){
            dispatch(signInSuccess(data))
            navigate('/')
           }
        } catch (error) {
            console.log(error);
        }
    } 
  return (
    <Button type='button' gradientDuoTone='pinkToOrange' outline onClick={handleGoogleClick}>
        <AiFillGoogleCircle className='w-6 h-6 mr-2'/>
        Continue with Google
    </Button>
  )
}