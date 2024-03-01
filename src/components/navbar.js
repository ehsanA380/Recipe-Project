import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const [cookies, setCookies] = useCookies("access_token");
  const navigate = useNavigate("/");

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.clear();
    navigate("/auth");
  };

  return (
    <div className="navbar">
      <Link to="/">Home</Link>
      {!window.localStorage.getItem("userID") ? (
          <Link to="/auth">Login/Register</Link>
          ) : (<>
              <Link to="/create-recipe" className="left">Create Recipe</Link>
              <Link to="/saved-recipes" className="left">Saved Recipes</Link>
              <button className="logout-btn"
        
          onClick={logout}
        >
          Logout
        </button></>
      )}
    </div>
  );
};
