export const Home = () => {
    
  return (
    <>
           
      <div className="create-recipe" style={{display:"inline",textAlign:"center",fontWeight:"bold"}}>welcome <span style={{color:"red"}}>{ window.localStorage.getItem('name')} </span></div>

    </>
  );
};
