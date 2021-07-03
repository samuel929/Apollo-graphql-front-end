import React,{useState} from 'react';
import {useQuery} from 'graphql-hooks';
import {Link} from 'react-router-dom';
import './index.css';
const Home_Query=`
query($page:Int!) {
    getPerson(page:$page) {
     name
     height
     mass
     gender
     homeworld
    }
  }

`

const HomePage=()=>{
    const [prevOrNextPage,setPrevOrNextPage]=useState(1);
    const {loading,error,data}=useQuery(Home_Query,{ 
        variables:{
            page:prevOrNextPage
        }
    })
     
    if(loading) return(
        <div className="background">
             <div className="mar">
               <h1 className="color text-center">Loading....</h1>
            </div>
        </div>
    ) 
    if(error) return(
        <div className="background">
             <div className="mar">
             <div className="p-3">
                 </div>
               <h1 className="color text-center">Something went wrong</h1>
               <button className="btn btn-warning btn-sm" onClick={()=>handlePrevOrNextPage("prev")}>Previous Page</button>

            </div>
        </div>
    ) 
    console.log(data)

    const handlePrevOrNextPage=(name)=>{
       if(name==="prev"){
          if(prevOrNextPage>0){
              setPrevOrNextPage(prevOrNextPage - 1)
          }
       }else{
           if(data.getPerson){
            setPrevOrNextPage(prevOrNextPage + 1)
            console.log("hello")
           }
       }

    }
    return(
        <div className="background">
            <div className="p-5 justify-content-md-center" >
            {
           data.getPerson &&  data.getPerson.map(({name,height,mass,gender,homeworld})=>(
                    <div>
                        <ul className="name-flex">
                        <div class="card">
                        <Link to={`/details/${name}`}><li>{name}</li></Link>
                        </div>
                        </ul>
                    </div>
                ))
            }
            <div className="flex-container">
                <button className="btn btn-warning btn-sm" onClick={()=>handlePrevOrNextPage("prev")}>Previous Page</button>
                
                  <p className="page-num">{prevOrNextPage}</p>
                
                <button className="btn btn-warning btn-sm"  onClick={()=>handlePrevOrNextPage("next")}>Next Pager</button>
            </div>
            </div>
           
            
        </div>
    )
}

export default HomePage;