interface realisateurProps {
    name: string,
    lastname: string
}
interface CardFilmProps{
    title: string,
    description: string,
    url: string,
    director: realisateurProps,
    actors: actorProps[]
}
interface actorProps {
    name: string,
    lastname: string
}
function CardFilm({title, description, url, director, actors}: CardFilmProps){
    const route = "/films/" + url;
    const realisateur = director.name + ' ' + director.lastname;
    return (
        <div style={{ display: 'flex', padding: 15, justifyContent: 'space-around'}}>
            <div>
                <img src={route} alt={title} height='400' width='400' />
            </div>
            <div style={{ width:'40%', textAlign: 'justify'}}>
                <h4>{title}</h4>
                <p>{description}</p>
                <div style={{display: 'flex'}}>
                    <p style={{fontWeight: 'bold', marginRight: '5px'}}>Réalisateur :</p>
                    <p>{realisateur}</p>
                </div>
                <div>
                    <p style={{fontWeight: 'bold'}}>Acteurs :</p>
                    {actors.map((actor, index) => (
                        <p key={index}>{actor.lastname} {actor.name}</p>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CardFilm
