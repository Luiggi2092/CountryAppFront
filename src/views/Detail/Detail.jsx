import style from './Detail.module.css';
import { useParams,Link} from "react-router-dom";
import { getCountryxId,getCountries } from '../../redux/action';
import { useDispatch,useSelector } from 'react-redux';
import { useEffect,useState } from 'react';
 
const Detail=()=>{

    
    const {id} = useParams();

    let fill = useSelector(state=>state.Fill);
    let DetalleCountries = useSelector(state=>state.Countriexid.data);  
    const [fil,setFil]=useState(fill);
   
    
   
    let obj="";


    let dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getCountryxId(id));
        
    },[dispatch,id])

    if(DetalleCountries!==undefined){
       obj={
        id :DetalleCountries.id,
        name: DetalleCountries.name,
        image: DetalleCountries.img,
        continent: DetalleCountries.continent,
        capital: DetalleCountries.capital,
        subregion: DetalleCountries.subregion,
        area: DetalleCountries.area,
        population: DetalleCountries.population,
        activities: DetalleCountries.activities.map(e=> e.name + " ")
       }
    }



    const HandlerReg=()=>{
        dispatch(getCountries);
        setFil(false);

    }


    return (
        <div className={style.Card}>
        <div className={style.Det}>
            
             <p>{obj.name}</p>
             <img src={obj.image} alt="bandera" className={style.img}/>
             <p> ID : {obj.id}</p>
             <p>Continent: {obj.continent}</p>
             <p>Capital : {obj.capital}</p>
             <p>Subregion : {obj.subregion}</p>
             <p>Area : {obj.area}</p>
             <p>Poblacion : {obj.population}</p>
             <p>Actividades : {obj.activities}</p>
        </div>
        <br/>
        <br/>
        <Link to="/home" onClick={HandlerReg}>
        <button className={style.button}>Volver</button>
        </Link> 
        </div>
    )


}


export default Detail;