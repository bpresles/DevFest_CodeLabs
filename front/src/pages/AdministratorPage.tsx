import {useEffect, useState} from "react";
import PeopleGenerator from "../components/peoples/PeopleGenerator.tsx";
import MovieGenerator from "../components/movies/MovieGenerator.tsx";
import CompetitionGenerator from "../components/competition/CompetitionGenerator.tsx";
import "../styles/account.css";

const AdministratorPage = () => {
    const [connectedUserAddress, setConnectedUserAddress] = useState('');
    const [addPeople, setAddPeople] = useState(false);
    const [addMovie, setAddMovie] = useState(false);
    const [addCompetition, setAddCompetition] = useState(false);

    useEffect( ()  => {
        const account = window.ethereum.request({method: 'eth_requestAccounts'});
        if(account) setConnectedUserAddress(account.address);
    }, []);

    if (connectedUserAddress !== '')
        return (
            <article>
                <h2>Administration</h2>
                <div>
                    <a className="choice_add" onClick={() => {setAddPeople(!addPeople); setAddMovie(false); setAddCompetition(false); }} >Ajout d'un acteurs ou réalisateurs</a>
                    <a className="choice_add" onClick={() => {setAddMovie(!addMovie); setAddPeople(false); setAddCompetition(false);} }>Ajout d'un nouveau film</a>
                    <a className="choice_add" onClick={() => {setAddCompetition(!addCompetition); setAddPeople(false); setAddMovie(false); } }>Nouvelle competition</a>
                </div>
                {
                    addPeople
                        ? <PeopleGenerator />
                        : null
                }
                {
                    addMovie
                        ? <MovieGenerator />
                        : null
                }
                {
                    addCompetition
                        ? <CompetitionGenerator />
                        : null
                }
                <p></p>
            </article>
        )
}
export default AdministratorPage;
