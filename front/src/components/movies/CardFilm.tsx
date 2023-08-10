interface CardFilmProps{
    Title: string,
    Description: string,
    Picture: string,
    Director: {
        Firstname: string,
        Lastname: string
    },
}
function CardFilm({Title, Description, Picture, Director}: CardFilmProps){

    return (
        <div style={{ display: 'flex', padding: 15, justifyContent: 'space-around'}}>
            <div>
                <img src={Picture} alt="card" height='400' width='400'/>
            </div>
            <div style={{ width:'40%', textAlign: 'justify'}}>
                <h4>{Title}</h4>
                <p>{Description}</p>
                <div style={{display: 'flex'}}>
                    <p style={{fontWeight: 'bold', marginRight: '5px'}}>Réalisateur :</p>
                    <p>{Director.Firstname} {Director.Lastname}</p>
                </div>
            </div>
        </div>
    )
}

export default CardFilm
