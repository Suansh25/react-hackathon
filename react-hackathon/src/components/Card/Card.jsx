import './Card.css';

function Card({ data, onVisit, visited }) {
    const handleVerify = () => {
        if (!visited) {
            onVisit(data.title, data.points); // title is used to track which place
        }
    };

    return (
        <div className="product-card">
            <div className="product-image">
                <img src={data.image} className="product-thumb" alt="Images of local place" />
                <a href={data.a}><button className="card-btn">Press to learn more</button></a>
            </div>
            <div className="product-info">
                <h2 className="product-brand">{data.title}</h2>
                <p className="product-short-description">{data.desc}</p>
                <button
                    className="verify-btn"
                    onClick={handleVerify}
                    disabled={visited}
                >
                    {visited ? "Done !" : "Click here if visited!"}
                </button>
            </div>
        </div>
    );
}

export default Card;
