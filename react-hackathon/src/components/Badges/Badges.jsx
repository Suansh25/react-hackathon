import './Badges.css'
function Badges({data}){
    return (   <>
   <div className="badges-container">
   
        <div class="badge-container">
            <center>
                
                <h3>{data.title}</h3>
            
            </center>

            <div class="badge-card">
                <div class="badge-image">
                <img src={data.image} class="badge-thumb" alt="local dance" />
            </div>
            </div>
        </div>
        </div>
    </> 
)
}
export default Badges;
                
            