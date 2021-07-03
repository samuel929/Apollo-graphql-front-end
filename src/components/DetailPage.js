import React from 'react'
import {useQuery} from 'graphql-hooks';
import {Link,useParams} from 'react-router-dom';
import './index.css'
const Search_Query=`
query($search:String!) {
    fetchPerson(search:$search) {
     name
     height
     mass
     gender
     homeworld
    }
  }


`

const DetailPage=()=>{
    const {name}=useParams()
const {loading,error,data}=useQuery(Search_Query,{
    variables:{
        search:name
    }
})

     if(loading)  return(
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
                 <Link to="/">Home</Link>
                 </div>
               <h1 className="color text-center">Something went wrong</h1>
            </div>
        </div>
    ) 
     console.log(data)
    return(
        <div class="background">
            <div class="p-3">
            <Link to="/">Home</Link>
             <ul className="name-flex">
                         <li className="name">Name: {data.fetchPerson.name}</li>
                         <li className="name">Height: {data.fetchPerson.height}</li>
                         <li className="name">Home World: <Link >{data.fetchPerson.homeworld}</Link></li>
                         <li className="name">Mass:{data.fetchPerson.mass}</li>
             </ul>
             </div>
        </div>
    )
}

export default DetailPage;