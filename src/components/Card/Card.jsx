import { Link } from "react-router-dom";
import style from "./Cards.module.css"


const Card=({id,name,img,continent})=> {
    return (
        <div>
        <div className={style.card}>
        <Link to={`/detail/${id}`} className={style.ca}>    
        <p>{name}</p>
        <img src={img} alt="bandera"/>
        <p>{continent}</p>
        </Link>
        </div>
        </div>
    )
} 


export default Card;