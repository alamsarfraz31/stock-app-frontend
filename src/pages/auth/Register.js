import React, { useState } from 'react'
import { TiUserAddOutline} from "react-icons/ti";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {registerUser, validateEmail} from "../../services/authService"
import Card from '../../components/card/Card';
import { useDispatch } from "react-redux";
import { SET_LOGIN, SET_NAME } from '../../redux/feetures/auth/authSlice';
import Loader from '../../components/loader/Loader';


const initialState = {
  name: "",
  email: "",
  password: "",
  password2: "",
}

function Register () {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [ isLoading, setIsLoading ] = useState(false)
  const [formData, setformData] = useState(initialState)
  const {name, email, password, password2} = formData

  const handelInputChange = (e)=> {
    const {name, value} = e.target;
    setformData({ ...formData, [name]: value});
  };

  const register = async (e) => {
    e.preventDefault()

    if (!name || !email || !password) {
      return toast.error("All Ple are required")

    }
    if (password.length < 6) {
      return toast.error("Password must be up to 6 Character")

    }
    if (!validateEmail(email)) {
      return toast.error("Please Enter a Validate Email")

    }
    if (password !== password2) {
      return toast.error("Password do not match")

    }

    const userData = {
      name, email, password
    }
    setIsLoading(true)
    try {
      const data = await registerUser(userData)
      //console.log(data)
      await dispatch(SET_LOGIN(true))
      await dispatch(SET_NAME(data.name))
      navigate("/dashboard")
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.log(error.message)
    }
  };
  return (
    <div className='container login' /*className={`container ${style.auth}`}*/ >
      {isLoading && <Loader />}
      <Card>
        <div className='form' /*className={style.form}*/ >
            <div className="--flex-center">
                <TiUserAddOutline size={35} color="#999" className="Biologin" />
            </div>
            <h2>Resgister</h2>
                <form onSubmit={register}>
                    <input type="text" placeholder="Name" required name="name" className="inputI" value={name} onChange={handelInputChange} />
                    <input type="text" placeholder="Email" required name="email" className="inputI"  value={email} onChange={handelInputChange}/>
                    <input type="password" placeholder="Password" required name="password" value={password} onChange={handelInputChange} />
                    <input type="password" placeholder="Confirm Password" required name="password2" value={password2} onChange={handelInputChange} />
                    <button type="submit" className="--btn --btn-primary --btn-block">Register</button>
                </form>

                <span /*className={styles.register}*/ className="inline">
                    <Link to="/" className="text-dec" >Home</Link>
                    <p>&nbsp; Already have an Account? &nbsp;</p>
                    <Link to="/login" className="text-dec">Login</Link>
                </span>
        </div>
      </Card>
    </div>
  )
}

export default Register;
