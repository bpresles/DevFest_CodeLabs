export interface CardPeopleProps{
    Firstname: string,
    Lastname: string,
    Picture: string
}

function PeopleCard({Firstname, Lastname, Picture}: CardPeopleProps){
    const fullname = Lastname + " " + Firstname;
    return (
        <div style={{ padding: 15 }}>
            <div>
                <h4>{fullname}</h4>
                <img src={Picture} alt="card" height='400' width='400'/>
            </div>
        </div>
    )
}

export default PeopleCard;
