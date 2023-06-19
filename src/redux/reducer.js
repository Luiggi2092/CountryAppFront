import {GET_COUNTRIES, 
        GET_COUNTRIESXID,
        POST_ACTIVITY,
        FILTERS,
        GET_ACTIVITIES,
        GET_COUNTRIESXNAME,
        FILTERPOPU,
        FILTERACT,
      } from "./action";

const initialState = {
    Countries : [],
    Countriexid:[],
    NewActivity:[],
    CountriesFill:[],
    Activities : [],
    Fill:false,
    FillAct:false,
   
}

const rootReducer=(state = initialState,action)=>{

   switch(action.type){
    case GET_COUNTRIES:
        return {...state, Countries : action.payload};
    case GET_COUNTRIESXID:
         return {...state, Countriexid: action.payload};
    case POST_ACTIVITY:        
            return {...state, NewActivity: action.payload}; 
         
    case GET_COUNTRIESXNAME:
          return {...state,Fill:true,CountriesFill: action.payload}; 
    case FILTERPOPU:
        if(action.payload === "ascp"){
      return {...state,Fill:true,CountriesFill: state.Countries.sort((a,b)=>{
        return a.population - b.population;
      }) }
        }
        else if(action.payload === "desp"){
          return {...state,Fill:true,CountriesFill: state.Countries.sort((a,b)=>{
            return b.population - a.population;
          }) } 
        }else if(action.payload === "ascpSearch"){
          return {...state,Fill:true,CountriesFill: state.CountriesFill.sort((a,b)=>{
             return a.population-b.population;
          })}
           
        }else if(action.payload === "despSearch"){
          return {...state,Fill:true,CountriesFill: state.CountriesFill.sort((a,b)=>{
              return b.population- a.population;
          }) }
        }else if(action.payload === "ascpContinent"){
          return {...state,Fill:true, CountriesFill: state.CountriesFill.sort((a,b)=>{
              return a.population-b.population;
          }) }
        }else if(action.payload === "despContinent"){
          return {...state,Fill:true, CountriesFill: state.CountriesFill.sort((a,b)=>{
              return b.population-a.population;
          }) }
        }
        else if(action.payload === "ascActivity"){
           return {...state,Fill:true,CountriesFill: state.CountriesFill.sort((a,b)=>{
              return a.population-b.population;
           })}
        }
        else if(action.payload === "desActivity"){
           return {...state,Fill:true,CountriesFill: state.CountriesFill.sort((a,b)=>{
            return b.population-a.population; 
        })}
      }
           
     break;       
    case FILTERS:
       if(action.payload === "asc"){
           return {...state,Fill:true,CountriesFill: state.Countries.sort((prev,next)=>{
                  if(prev.name>next.name) return -1;
                  if(prev.name<next.name) return 1;
                  return 0;
           }) } 
          
          }else if(action.payload ==="des"){
          return {...state,Fill:true,CountriesFill: state.Countries.sort((prev,next)=>{
               if(prev.name>next.name) return 1 ;
               if(prev.name<next.name) return -1;
               return 0;
        })  }
           

       }else if(action.payload === "ascSearch"){
        const fillco =  state.CountriesFill.sort((a,b)=> a.name.localeCompare(b.name))

        return {
          ...state,
          Fill:true,
          CountriesFill: fillco } 
  


       }else if(action.payload === "descSearch"){
        
        return {...state,Fill:true,CountriesFill:state.CountriesFill.sort((a,b)=> b.name.localeCompare(a.name)) } 
    
       }else if(action.payload === "ascContinent"){
        return {...state,Fill:true,CountriesFill: state.CountriesFill.sort((a,b)=> b.name.localeCompare(a.name))}   
       }else if(action.payload === "desContinent"){
         return {...state,Fill:true,CountriesFill: state.CountriesFill.sort((a,b)=>a.name.localeCompare(b.name))}
       }else if(action.payload === "ascActivity"){
         return {...state,Fill:true,CountriesFill: state.CountriesFill.sort((a,b)=>b.name.localeCompare(a.name))}
       }else if(action.payload === "descActivity"){
         return {...state,Fill:true,CountriesFill: state.CountriesFill.sort((a,b)=>a.name.localeCompare(b.name))}
       }
       else if(action.payload==="Africa" || 
                action.payload==="Asia"   ||
                action.payload==="South America" ||
                action.payload==="North America" ||
                action.payload==="Europe" ||
                action.payload==="Oceania"){

               return {...state,Fill:true,CountriesFill: state.Countries.filter((pai)=> pai.continent===action.payload)
               }
                     

       }
       break;
    case GET_ACTIVITIES:
          return {...state, Activities : action.payload};
    case FILTERACT:
      if(state.Countries.find(e=> e.activities.length!==0 && e.activities.includes(action.payload))){
        let array=[]; 
        for(let id of state.Activities){
               if(id.name === action.payload){
                array.push(id.name);
               }
        }
        let fi;
          fi = state.Countries.filter( e=> e.activities.length>0 && e.activities.includes(array[0]));
        
        return {...state,FillAct:false,Fill:false,CountriesFill: fi  }
        

        
    }
   
    break;
     
    default:
    
        return {...state};
   }

    
}



export default rootReducer;