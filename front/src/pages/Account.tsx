import {useState} from "react";
import "../styles/account.css";
import PeopleGenerator from "../components/People/PeopleGenerator.tsx";
import BlockAddMovie from "../components/BlockAddMovie.tsx";

const Account = () => {
    const [connectedUserAddress, setConnectedUserAddress] = useState('');
    const [addPeople, setAddPeople] = useState(false);
    const [addMovie, setAddMovie] = useState(false);
    requestAccount();

    async function requestAccount() {
        const account = await window.ethereum.request({method: 'eth_requestAccounts'});
        if(account) setConnectedUserAddress(account.address);
    }

    if (connectedUserAddress !== '')
        return (
            <article>
                <h2>Account page</h2>
                <div>
                    <a className="choice_add" onClick={() => {setAddPeople(!addPeople); setAddMovie(false); }} >Add Acteurs / réalisateurs</a>
                    <a className="choice_add" onClick={() => {setAddMovie(!addMovie); setAddPeople(false);} }>Add movies</a>
                </div>
                {
                    addPeople
                    ? <PeopleGenerator />
                    : null
                }
                {
                    addMovie
                    ? <BlockAddMovie />
                    : null
                }
                <p></p>
            </article>
        )
    return <button onClick={requestAccount}>Connect Wallet</button>
}

export default Account;
