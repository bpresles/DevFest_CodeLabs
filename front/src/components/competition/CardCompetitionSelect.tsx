interface CardCompetitionSelectProps{
    Info: string,
    Picture: string
}

function CardCompetitionSelect({ Info, Picture }: CardCompetitionSelectProps){

    return (
            <div style={{position: 'relative', height: '100px', width: '400px', margin: '1rem'}} >
                <div style={{position: 'absolute', zIndex: 1}}>
                    <img src={Picture} alt="card" height='100' width='400'/>
                </div>
                <div style={{position: 'absolute', top: '20px', width: '400px', height: '100px', zIndex: 2, fontSize: '200%', color: 'white'}}>
                    <center><b>{Info}</b></center>
                </div>
            </div>
    )
}
export default CardCompetitionSelect;
