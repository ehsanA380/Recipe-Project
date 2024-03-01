import  axios from "axios";
import {useEffect, useState} from "react";
import './home.css'
import { useGetUserID } from "../hoooks/useGetUserID";

export const SavedRecipes = () => {
    const [savedRecipes ,setSavedRecipes]= useState([]);
    const userID = useGetUserID();

    useEffect(()=>{
     
      const fetchSavedRecipe = async () =>{
        try {
          const response = await axios.get(
            `https://recipe-project-1.onrender.com/recipes/savedRecipes/${userID}`);
          setSavedRecipes(response.data);
          console.log(response.data);

          // console.log(response.data);
        } catch (err) {
          console.error(err);
        }
      } 

     
      fetchSavedRecipe();
    },[userID]) // <== userID nahi bhi daloge to koyi effect nahi padega
    
   
  return (
    <div>
      <h2 className="heading">Saved Recipes</h2>
      <ul >
        {(savedRecipes.length===0)?<><img src="https://th.bing.com/th/id/OIP.zNSushECF2RtBNW0mGGfqgHaF7?rs=1&pid=ImgDetMain"/>
        </>:<></>}
        {savedRecipes.map((recipe)=>(
          <li key={recipe._id}className="recipe-container">
           
            <div>
              <h2 className="recipe-heading">{recipe.name}</h2>
            </div>
            <div className="instructions">
              <p>{recipe.instructions}</p>
            </div>
            <img src={recipe.imageURL} alt={recipe.name} className="recipe-img"/>
            <p>Cooking Time: {recipe.cookingTime} (minutes)</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
