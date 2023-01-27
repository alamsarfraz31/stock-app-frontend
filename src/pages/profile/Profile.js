import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import useRedirectLoggedOutUser from '../../customHook/useRedirectLoggedOutUser'
import "./Profile.css"
import { SET_NAME, SET_USER } from '../../redux/feetures/auth/authSlice'
import { getUser } from '../../services/authService'
import { SpinnerImg } from '../../components/loader/Loader'
import Card from '../../components/card/Card'
import { Link } from 'react-router-dom'

const Profile = () => {
    useRedirectLoggedOutUser("/")
    const dispatch = useDispatch()

    const [profile, setProfile] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    
    useEffect(() =>{
        console.log("Geting User");
        setIsLoading(true)
        async function getUserData() {
        const data = await getUser()
        console.log(data);

        setProfile(data)
        setIsLoading(false)
        await dispatch(SET_USER(data))
        await dispatch(SET_NAME(data.name))
    }
    getUserData();
    }, [dispatch])

  return (
    <div className="profile --my2">
      {isLoading && <SpinnerImg />}
      <>
        {!isLoading && profile === null ? (
            <p>Somthin went wrong, Please reload page..</p>
        ) : (
            <Card CardClass={"card --flex-dir-column"}>
                <span className="profile-photo">
                    <img src={profile?.photo} alt="profilepic" />
                </span>
                <span className="profile-data">
                    <p> <b> Name : {profile?.name}</b></p>
                    <hr /> 
                </span>
                <span className="profile-data">
                    <p> <b> Email  : {profile?.email}</b></p>
                    <hr />  
                </span>
                <span className="profile-data">
                    <p> <b> Phone  : {profile?.phone}</b></p>
                    <hr />  
                </span>
                <span className="profile-data">
                    <p> <b> Bio  : {profile?.bio}</b></p> 
                    <hr /> 
                    <div>
                        <Link to="/edit-profile"><button className="--btn --btn-primary">Edit Profile</button>
                        </Link>
                    </div>
                </span>
            </Card>
        )}
      </>
    </div>
  )
}

export default Profile
