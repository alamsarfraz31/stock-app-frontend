import React, { useState } from 'react'
import { BiLogIn} from "react-icons/bi";
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Card from '../../components/card/Card';
import Loader from '../../components/loader/Loader';
import { SET_LOGIN, SET_NAME } from '../../redux/feetures/auth/authSlice';
import { loginUser, validateEmail } from '../../services/authService';

  const initialState = {
    email: "",
    password: "",
  }
  
  const Login = ()=> {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [ isLoading, setIsLoading ] = useState(false)
  const [formData, setformData] = useState(initialState)
  const {email, password} = formData;

  const handelInputChange = (e)=> {
    const {name, value} = e.target;
    setformData({ ...formData, [name]: value});
  };

  const login = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return toast.error("All Ple are required")

    }

    if (!validateEmail(email)) {
      return toast.error("Please Enter a Validate Email")

    }

    const userData = {
      email, password
    };
    setIsLoading(true)
    try {
      const data = await loginUser(userData);
      console.log(data);
      await dispatch(SET_LOGIN(true));
      await dispatch(SET_NAME(data.name));
      navigate("/dashboard")
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false);
    }
  }
  

  return (
    <div className='container login' /*className={`container ${style.auth}`}*/ >
      {isLoading && <Loader />}
      <Card>
        <div className='form' /*className={style.form}*/ >
            <div className="--flex-center">
                <BiLogIn size={35} color="#999" className="Biologin" />
            </div>
            <h2>Login</h2>
                <form onSubmit={login}>
                    <input type="email" placeholder="Email" required name="email" className="inputI" value={email} onChange={handelInputChange}/>
                    <input type="password" placeholder="Password" required name="password" value={password} onChange={handelInputChange} />
                    <button type="submit" className="--btn --btn-primary --btn-block">Login</button>
                </form>
                <Link to="/forgot" className="forgot">Forgot Password</Link>
                <span /*className={styles.register}*/ className="inline">
                    <Link to="/" className="text-dec" >Home</Link>
                    <p>&nbsp; Don't have an Account? &nbsp;</p>
                    <Link to="/register" className="text-dec">Register</Link>
                </span>
        </div>
      </Card>
    </div>
  )
}

export default Login
