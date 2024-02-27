import { Link } from "react-router-dom"
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom"


export const Navbar = () =>{
    const [cookies,setCookies] = useCookies ("access_token");
    const navigate = useNavigate('/');

   const logout =()=>{
    setCookies("access_token","")
    window.localStorage.clear();
    navigate('/auth')
   }
    

    return (
        <div className="navbar">
            <Link to="/">Home</Link>
            <Link to="/create-recipe">Create Recipe</Link>
            <Link to="/saved-recipes">Saved Recipes</Link>
            {!window.localStorage.getItem('userID')?<Link to = "/auth">Login/Register</Link>:<button style={{background:"red",borderRadius:"5px",fontSize:"20px",fontWeight:"600",padding:"4px 10px",marginLeft:"10px" ,cursor:"pointer",outline:"none",border:"none",color:"white"}} onClick={logout}>Logout</button>} 
        </div>
    );
}
 