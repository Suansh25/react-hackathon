import './Nav.css';
function Nav(){
    return(
        <header>
        <nav>
            <div class="logo">Logo</div>
            <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">About us</a></li>
                <li><a href="#">Destinations</a></li>
                <li><a href="#">Plan your travel</a></li>
                
            </ul>
            <button class="book-now">Explore Now</button>
            <img src="/HomeImages/image.png" className='Nav-image'/>
        </nav>
        </header>
    )
}
export default Nav;