import { Link } from "react-router-dom";
import style from "./Landing.module.css"

const Landing=()=> {

    
    return (
        <div className={style.Landing}>
           <Link to="/home"> 
           <button className={style.button}>PLAY</button>
           </Link>
        </div>
    )

}


export default Landing;