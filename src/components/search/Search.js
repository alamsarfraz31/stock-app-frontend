import React from 'react'
/*import styles from "./Search.module.css"*/
import { BiSearch } from "react-icons/bi";
import "./Search.css"

const Search = ({value, onChange}) => {
  return (
    <div /*className={style.search}*/ className="search" >
        <BiSearch size={50} /*className={style.icon}*/ className="icon" />
        <input type="text" placeholder='Search Product' value={value} onChange={onChange} />

      
    </div>
  )
}

export default Search
