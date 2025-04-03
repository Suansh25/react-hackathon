import './User.css'
function User(){
    return(
        <section class="user">
    <div class="user-text">
        <div className='loginForm'>
      
        <form action="">
        <h2>Your Experience</h2><br />
            <input type="text" id='name' placeholder='Enter Your Name' /><br />
            <input type="email" id= "email"placeholder='Enter your Email' /><br />
            <input type="date"  id='dob'/>
        </form>
        </div> 
    </div>
    <div class="user-image">
        <img src="./UserImages/User.png" alt="Traveler"/>
    </div>
</section>

    )
}
export default User;