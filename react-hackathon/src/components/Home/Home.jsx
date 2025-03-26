import './Home.css';
function Home(){
    return(
        <main>
        <section class="hero">
            <div class="hero-text">
                <h1>Discover the Best Lovely Places</h1>
                <p>On our website and plan accordingly as well as earn points for the same.</p>
                <div class="search-box">
                    <input type="text" placeholder="Where"/>
                    <input type="date" placeholder="Date"/>
                    <button>🔍</button>
                </div>
            </div>
            
        </section>
    </main>
    )
}
export default Home;