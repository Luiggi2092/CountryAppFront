import { useState, useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { getCountries,PostActivity } from "../../redux/action";
import style from "./Form.module.css";


const Form = ()=> {
    

    const [form,setForm]= useState({
   
        name:"",
        difficulty:1,
        duration:1,
        season:"",
        countries:[]

    })


    const [errors,setErrors] = useState({
       
        name:"",
        duration:"",
        

        
    })



   const dispatch = useDispatch();
   const CountryList = useSelector(state=>state.Countries);


    useEffect(()=>{
        dispatch(getCountries()); 
        
    },[dispatch])

    

    const validate=(value,property)=>{
        var ExRegSoloLetras=/\d/;

       if(property==="name"){ 
        if(ExRegSoloLetras.test(value)){
            setErrors({...errors,name : "El name solo puede contener letras"});
        }else if(value.length < 1){
            
            setErrors({...errors,name : "El name no puede estar vacio"});
        }else{
            setErrors({...errors,name : ""});
        }
      


       }

       if(property==="duration"){
         
          if(value > 20){
            setErrors({...errors,duration: "La duracion permitida es hasta 20 horas"});
          } else{
            setErrors({...errors,duration: ""});
          }
    
         }


    }



    const changeHandle=(event)=>{
       let property = event.target.name;
       let value = event.target.value;
     


       setForm({
        ...form,
        [property]: value
       })
   

       validate(value,property);
         
        
    }


    const changeHandleCombo=(event)=>{
      
        let property = event.target.name;
        let value = event.target.value;

        if(property !== "season" && value!=="0"){
            let arr=[];
            arr.push(...form.countries,value);
            setForm({...form,countries:[...arr]});
        }

        if(property === "season" && value!=="0"){
            setForm({...form,season: value}); 
        }


  
    }
   
    const handlerClean = (event)=>{
        event.preventDefault()
        document.getElementById("nam").value="";
        setForm({...form,duration: "1",difficulty:"1"});
        document.getElementById("sea").value="0";
        document.getElementById("miselect").value="0";
        document.getElementById("miselect1").value="0";
        document.getElementById("miselect2").value="0";
      
    }



      const sumbitHandler=(event)=>{
          event.preventDefault();
          if( form.name && 
              form.difficulty &&
              form.duration &&
              form.season &&
              form.countries ){
          dispatch(PostActivity(form));
          setForm({...form,
            difficulty:1,duration:1})
        
          setErrors({...errors,name:""});
              }else{
                alert("revisar hay un dato vacio del formulario");
                setForm({...form,
                    difficulty:1,duration:1})
                    document.getElementById("miselect").value="0";
                    document.getElementById("sea").value="0";
                    document.getElementById("sp").value="";
                    document.getElementById("miselect1").value="0";
                    document.getElementById("miselect2").value="0";
                    setErrors({...errors,name:""});
                        
              }
        
        

      }

    return (
        <form onSubmit={sumbitHandler} className={style.Card}>
            <h1 className={style.titulo}>Actividad Turística</h1>
            <div>
            <label>Name: </label>
            <br/>
            <input type="text" onChange={changeHandle} name="name" id="nam"></input>
            <br/>
            <span className={style.error} id="sp">{errors.name}</span>
            </div>
            <div>
            <label>Difficulty: {form.difficulty}</label>
            <br/>
            <input type="range" onChange={changeHandle} name="difficulty" min="1" max="5" value={form.difficulty} id="vamos" ></input>
            </div>
            <div>
             <label>Duration : {form.duration} hours</label>
             <br/>
             <input type="range" onChange={changeHandle} name="duration" step="1" min="1" max="24" value={form.duration} id="dur"></input>
             <br/>
            <span className={style.error}>{errors.duration}</span>
            </div>
            <div>
             <label>Season :</label> 
             <br/>  
            <select name="season" onChange={changeHandleCombo} id="sea">
                <option value="0">Seleccione:</option>
                <option>SUMMER</option>
                <option>SPRING</option>
                <option>WINTER</option>
                <option>AUTUMN</option>
            </select>
            </div>
            <div>
                <label>Country 1 : </label>
                <br/>
                <select onChange={changeHandleCombo} name="pai" id ="miselect">
                    <option value="0" id="co">
                          Seleccione Country
                    </option>
                    {CountryList?.map((pai,index)=>{

                        return <option key={pai.name} value={pai.id} >{pai.name}</option>
                    })}
                </select>
            </div>
            <div>
                <label>Country 2 : </label>
                
                <br/>
                <select onChange={changeHandleCombo} name="pai" id ="miselect1">
                    <option value="0" id="co">
                          Seleccione Country
                    </option>
                    {CountryList?.map((pai,index)=>{

                        return <option key={pai.name} value={pai.id} >{pai.name}</option>
                    })}
                </select>
            </div>
            <div>
                <label>Country 3 : </label>
                <br/>
                <select onChange={changeHandleCombo} name="pai" id ="miselect2">
                    <option value="0" id="co">
                          Seleccione Country
                    </option>
                    {CountryList?.map((pai,index)=>{

                        return <option key={pai.name} value={pai.id} >{pai.name}</option>
                    })}
                </select>
            </div>
            <div>
                <button type="submit" className={style.but}>
                    Create
                </button>
                <br></br>
                <br></br>
                <button className={style.clear} onClick={handlerClean}>Clear</button>
            </div>
        </form>
    )


}



export default Form;