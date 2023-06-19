import style from "./Home.module.css";
import Cards from "../../components/Cards/Cards"
import Page from "../../components/Page/Page";
import { useDispatch,useSelector } from "react-redux";
import { getCountries,filters,getActivities,CountryxName,fillPopular,fillActivity} from "../../redux/action";
import { useEffect, useState } from "react";

const Home=()=>{

    const Countries = useSelector(state=> state.Countries);
    const Activities = useSelector(state=>state.Activities);
    let totalCountries = Countries && Countries.length !==0 ? Countries.length:0;
    const [CurrentPage,setCurrentPage]= useState(0);
    const [CountryPage]= useState(10);    
    const [maxPageNumberLimit,setMaxpageNumberLimit] = useState(5);
    const [minPageNumberLimit,setMinPageNumberLimit] = useState(0);
    const lastIndex= CurrentPage * CountryPage //10
    const firstIndex= lastIndex - CountryPage //0
    const FillName = useSelector(state=>state.CountriesFill);
    const [items,SetItems] = useState({
        item:FillName,
        search: "",
    });

    
    const [fil,setFil]=useState(false);
     
    const [Search,setSearch]= useState({
         name:"",
        population:"",

     });

     const [Continents,setContinents]=useState({
        continent:"",
         pop:""
        })

    
     const [Activity,setActivity]=useState({
         name: "",
         popu:"",

     })
        
    const dispatch = useDispatch();

    useEffect(()=>{
        setCurrentPage(1)
        dispatch(getCountries());
        dispatch(getActivities());  
           
    },[])

   


    const handleHandler=(event)=> {
        
  
        if(event.target.value!==""){
            setSearch({...Search,name:event.target.value,population:event.target.value})
            setFil(true); 
            dispatch(CountryxName(event.target.value)); 
            SetItems({...items,item:[]})
            
        
         }else{
            setSearch({...Search,name:"",population:""})
            SetItems({...items,item:[]})
            setFil(false);
            AllCountries();
            
        }
          
    }

    const Ordasc=(event)=>{
         
        if(Search.name){
            setFil(true)
            SetItems({...items,item:FillName}); 
            dispatch(filters("ascSearch"));
            SetItems({...items,item:[]})
        }else if(Continents.continent){
            setFil(true)
            dispatch(filters("ascContinent"));
            SetItems({...items,item:FillName});
            SetItems({...items,item:[]})

        }else if(Activity.name){
            setFil(true)
            dispatch(filters("ascActivity"));
            SetItems({...items,item:FillName});
            SetItems({...items,item:[]})

        }
        else{
            
            setSearch({...Search,name:"",population:""})
            SetItems({...items,item:FillName});
            setFil(true);
            dispatch(filters(event.target.name));
            SetItems({...items,item:[]})
           
        }       
    }

    const Orddes=(event)=>{
        if(Search.name){
            dispatch(filters("descSearch"))
            setFil(true);
            SetItems({...items,item:FillName});
            SetItems({...items,item:[]})
            
           
        }else if(Continents.continent){
            dispatch(filters("desContinent"))
            setFil(true);
            SetItems({...items,item:FillName});
            SetItems({...items,item:[]})
             

        }else if(Activity.name){
            setFil(true)
            dispatch(filters("descActivity"));
            SetItems({...items,item:FillName});
            SetItems({...items,item:[]})
        }
        else{
        setFil(true);
        SetItems({...items,item:FillName});
        setSearch({...Search,name:"",population:""})
        dispatch(filters(event.target.name));
        SetItems({...items,item:[]})
           
        
        }
    } 

    const OrdAscPop=(event)=>{
    
        
        if(Search.population){
         dispatch(fillPopular("ascpSearch"))
         setFil(true)
         SetItems({...items,item:FillName});
         SetItems({...items,item:[]})

           
        }else if(Continents.pop){
            dispatch(fillPopular("ascpContinent"))
            setFil(true)
            SetItems({...items,item:FillName});
            SetItems({...items,item:[]})
 
            
         }else if(Activity.popu){
            setFil(true)
            dispatch(fillPopular("ascActivity"));
            SetItems({...items,item:FillName});
            SetItems({...items,item:[]})
 
        
        }
        
        else{
        dispatch(getCountries());
        setFil(true);
        setSearch({...Search,name:"",population:""})
        SetItems({...items,item:FillName});
        SetItems({...items,item:[]})
        dispatch(fillPopular(event.target.name))

        }
    }

    const OrdDesPop=(event)=>{
          
        
        if(Search.population){
         dispatch(fillPopular("despSearch"))
         setFil(true)
         SetItems({...items,item:FillName});
         SetItems({...items,item:[]})
           
           
        }else if(Continents.pop) {
            setFil(true)
            dispatch(fillPopular("despContinent"))
            SetItems({...items,item:FillName});
            SetItems({...items,item:[]})
           
             
        }else if(Activity.popu){
            setFil(true)
            dispatch(fillPopular("desActivity"));
            SetItems({...items,item:FillName});
            SetItems({...items,item:[]})
 
        }
        else{  
        dispatch(getCountries()); 
        setFil(true);
        dispatch(fillPopular(event.target.name))
        SetItems({...items,item:FillName});
        SetItems({...items,item:[]})
        setSearch({...Search,name:"",population:""})
        
        
        
        }
    }

    const AllCountries = ()=>{
        dispatch(getCountries());
        setCurrentPage(1);
        setMaxpageNumberLimit(5);
        setMinPageNumberLimit(0);
        document.getElementById("Search").value="";
        document.getElementById("cont").value="0";
        document.getElementById("act").value="0";
        setFil(false);
        SetItems({...items,item:Countries});
        SetItems({...items,item:[]})
        setSearch({...Search,name:"",population:""})
        setContinents({...Continents,continent:""})
        setContinents({...Continents,pop:""}) 
        
    }

    const onChangeCombo=(event)=>{
        if(isNaN(event.target.value)){
            dispatch(getCountries());
            setCurrentPage(1)
            setFil(true);
            dispatch(filters(event.target.value));
            SetItems({...items,item:FillName});
            SetItems({...items,item:[]})
            setMaxpageNumberLimit(5);
            setMinPageNumberLimit(0);
       
            
            setContinents({...Continents,continent:event.target.value,pop:event.target.value})

         }
         else{
        setContinents({...Continents,pop:"",continent:""})
        setActivity({...Activity,name: "",popu: ""})  
        AllCountries();      
    }
}

   const onChangeActivity=(event)=>{
      
    if(event.target.value!=="0"){
   
    setFil(true);
    setCurrentPage(1)
    dispatch(fillActivity(event.target.value));
    SetItems({...items,item:FillName});
    SetItems({...items,item:[]})
    setActivity({...Activity,name: event.target.value,popu: event.target.value})
    }else{
         AllCountries();
         
    setActivity({...Activity,name: "",popu: ""})   
        
    }

   }
    return(
        <div className={style.Home}>
         <div className={style.subnav}>
            <div className={style.act}>
            <label>Activity : </label>
            <select name="actividad" onChange={onChangeActivity} id="act">       
                <option value="0">Seleccion :</option>
                {Activities?.map((activity,index)=>{
                    return <option key={index} value={activity.name}>{activity.name}</option>
                })}
            </select>
            </div>
            <div className={style.buq}>
           <button onClick={Ordasc} name="asc" >ASC</button> 
           <input type="search" name="Search" onChange={handleHandler} placeholder="Search Country..." id="Search" /> 
           <button onClick={Orddes} name="des">DES</button>
           </div>
           <div className={style.cont}>
           <label>Continent : </label>
           <select name="continent" onChange={onChangeCombo} id="cont">
            <option value="0">Seleccione :</option>
            <option value="Africa">Africa</option>
            <option value="Asia">Asia</option>
            <option value="South America">South America</option>
            <option value="North America">North America</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
           </select>
           </div>
           <br/>
           <br/>
           <div>
            <button name="ascp" onClick={OrdAscPop}>+ poblacion</button>
            <button onClick={AllCountries}>All Countrys</button>
            <button name="desp" onClick={OrdDesPop}>- poblacion</button>
           </div>
         </div>
        {fil ? <Cards Countries={items.item.length == 0 ? FillName : items.item } firstIndex={firstIndex} lastIndex={lastIndex}/>:
               <Cards Countries={Countries} firstIndex={firstIndex} lastIndex={lastIndex}/>}
        <br/>
        <div>
         <Page CountryPorPage={CountryPage} 
               CurrentPage={CurrentPage}
               Countries={FillName}
               setCurrentPage={setCurrentPage}
               totalCountries={totalCountries}
               fil={fil}
               maxPageNumberLimit={maxPageNumberLimit}
               setMaxpageNumberLimit={setMaxpageNumberLimit}
               minPageNumberLimit={minPageNumberLimit}
               setMinPageNumberLimit={setMinPageNumberLimit}
                              />  
        </div>  
        </div>
    )
    
}


export default Home;