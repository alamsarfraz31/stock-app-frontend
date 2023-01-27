import React from 'react'
import {SiStopstalk} from "react-icons/si"
import {Link} from "react-router-dom"
import "./home.css"
import heroImg from "../../assets/stockimage.jpg";
import { ShowOnLogout, ShowOnLogin } from '../../components/protect/HiddenLink';


function Home() {
  return (
    <div className="home">
      <nav className="container --flex-between">
        <div className="logo">
            <SiStopstalk size={35} />
        </div>
        <ul className="home-links">
            <ShowOnLogout>
            <li>
                <Link to="/register" className='btnc reg'>Register</Link>
            </li>
            </ShowOnLogout>
            <ShowOnLogout>
            <li>
                <button className="--btn --btn-primary">
                <Link to="/login" className='btnc'>Login</Link>
                </button>
            </li>
            </ShowOnLogout>
            <ShowOnLogin>
            <li>
                <button className="--btn --btn-primary">
                <Link to="/dashboard" className='btnc'>Dashboard</Link>
                </button>
            </li>
            </ShowOnLogin>
        </ul>
      </nav>
      {/* Hero Section*/}
      <section className="container hero">
        <div className="hero-text">
            <h1> Inventory & Stock <br></br>
                Management<br></br>
                Solution
            </h1>
            <p>Inventory System to control and manage products in the<br></br>
                warehouse in real timeand integrated to make it easier to<br></br>
                develop your business.</p>
                <div className="hero-buttons">
                <button className="--btn --btn-secondary">
                <Link to="/dashboard" className='free'>Free Trail 1 Months</Link>
                </button>
                </div>
                <div className="--flex-start">
                    <NumberText num="14K" text="Brand Owners" />
                    <NumberText num="23K" text="Active User" />
                    <NumberText num="500+" text="Partners"/>
                </div>
        </div>

        <div className="hero-image">
            <img src={heroImg} alt="Stoc" className='herostoc'/>
        </div>
      </section>
    </div>
  );
};

const NumberText = ({num, text}) => {
    return (
        <div className="--mr">
            <h3 className='--color-white'>{num}</h3>
            <p className='--color-white'>{text}</p>
        </div>
    )
}

export default Home
