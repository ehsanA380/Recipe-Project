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
            `http://localhost:3001/recipes/savedRecipes/${userID}`);
          setSavedRecipes(response.data);

          // console.log(response.data);
        } catch (err) {
          console.error(err);
        }
      } 

     
      fetchSavedRecipe();
    },[])
    
   
  return (
    <div>
      <h2 className="heading">Saved Recipes</h2>
      <ul >
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
