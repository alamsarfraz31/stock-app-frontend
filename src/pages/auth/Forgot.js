import React, { useState } from 'react'
import { AiOutlineMail} from "react-icons/ai";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Card from '../../components/card/Card';
import { forgotPassword, validateEmail } from '../../services/authService';

function Forgot() {
  const [email, setEmail] = useState("")

  const forgot = async (e) => {
    e.preventDefault();
    if (!email) {
      return toast.error("Please Enter an Email")

    }

    if (!validateEmail(email)) {
      return toast.error("Please Enter a Validate Email")

    }

    const userData = {
      email,
    };

    await forgotPassword(userData)
    setEmail("")

  };

  return (
    <div className='container login' /*className={`container ${style.auth}`}*/ >
      <Card>
        <div className='form' /*className={style.form}*/ >
            <div className="--flex-center">
                <AiOutlineMail size={35} color="#999" className="Biologin" />
            </div>
            <h2>Forgot Password</h2>
                <form onSubmit={forgot}>
                    <input type="email" placeholder="Email" required name="email" className="inputI" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <button type="submit" className="--btn --btn-primary --btn-block">Get Reset Email</button>
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

export default Forgot
