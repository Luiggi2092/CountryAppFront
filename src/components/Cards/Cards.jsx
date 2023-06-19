import Card from "../Card/Card";
import style from "./Cards.module.css";



const Cards =({Countries,firstIndex,lastIndex})=> {
    
    console.log(Countries);
 

    return (
        <div className={style.container}>
          {Countries?.map((pai,index)=>{
            return <Card key={index}
            id={pai.id}
            name={pai.name}
            img={pai.img}
            continent={pai.continent}/>
         }).slice(firstIndex,lastIndex)}   
        </div>
    )

} 


export default Cards;