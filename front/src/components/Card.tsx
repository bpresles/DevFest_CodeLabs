import {Link} from "react-router-dom";

interface CardProps {
    type: string,
    url: string
}

function Card({type, url}: CardProps){
    const route = "/" + type;
    return (
        <div style={{ display: 'block', textAlign: 'center', padding: 15}}>
            <h3>Compétition du meilleur {type}</h3>
            <Link to={route}>
                <img src={url} alt={type} height='auto' width='500' />
            </Link>
        </div>
    )
}

export default Card
