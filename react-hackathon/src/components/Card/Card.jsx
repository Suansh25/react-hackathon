import './Card.css'
// import './Card.js'
function Card({data}) {
    // console.log(data);
    return (    
                <div class="product-card">
                    <div class="product-image">
                        <img src={data.image} class="product-thumb" alt="local dance" />
                        <a href="https://w.wiki/AT8w"><button class="card-btn">Press to learn more</button></a>
                    </div>
                    <div class="product-info">
                        <h2 class="product-brand">{data.title}</h2>
                        <p class="product-short-description">{data.desc} </p>

                    </div>
                </div>
        
    )
}
export default Card;