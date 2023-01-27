import React, { useState } from 'react'
import { MdPassword} from "react-icons/md";
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Card from '../../components/card/Card';
import { resetPassword } from '../../services/authService';

const initialState = {
  password: "",
  password2: "",
}

function Reset() {

  const [formData, setformData] = useState(initialState)
  const {password, password2} = formData;

  const {resetToken} = useParams();
  
  const handelInputChange = (e)=> {
    const {name, value} = e.target;
    setformData({ ...formData, [name]: value});
  };

  const reset = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      return toast.error("Password must be up to 6 Character")

    }

    if (password !== password2) {
    return toast.error("Password do not match")

    }
    
    const userData = {
      password, password2
    };

    try {
      const data = await resetPassword(userData, resetToken)
      toast.success(data.message)
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className='container login' /*className={`container ${style.auth}`}*/ >
      <Card>
        <div className='form' /*className={style.form}*/ >
            <div className="--flex-center">
                <MdPassword size={35} color="#999" className="Biologin" />
            </div>
            <h2>Reset Password</h2>
                <form onSubmit={reset}>
                    <input type="password" placeholder="New Password" required name="password" className="inputI" value={password} onChange={handelInputChange} />
                    <input type="password" placeholder="Confirm New Password" required name="password2" className="inputI" value={password2} onChange={handelInputChange} />
                    <button type="submit" className="--btn --btn-primary --btn-block">Reset password</button>
                    <div /*className={styles.links}*/ className="inline forblock">
                      <p>
                    <Link to="/" className="text-dec" >-Home</Link>
                      </p>
                      <p>
                    <Link to="/login" className="text-dec">-Login</Link>
                      </p>
                </div>
                </form>
                
        </div>
      </Card>
    </div>
  )
}

export default Reset
