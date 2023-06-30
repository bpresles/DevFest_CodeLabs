import {useEffect, useState} from "react";
import {provider} from "../provider/providers.ts";
import {ethers} from "ethers";
import contractsInterface from "../contracts/contracts.ts";

const BlockAddMovie = () => {
    const [transactionSuccess, setTransactionSuccess] = useState(false);
    const [transactionError, setTransactionError] = useState(false);
    const [directors, setDirectors]: any = useState([]);
    const [title, setTitle]: any = useState('');
    const [description, setDescription]: any = useState('');
    const [ipfsURI, setIpfsURI]: any = useState('');
    const [idDirector, setIdDirector]: any = useState('');

    useEffect(() => {
        fetchDirectors();
    }, []);

    async function fetchDirectors(){
        if(provider){
            const contract = new ethers.Contract(contractsInterface.contracts.Peoples.address, contractsInterface.contracts.Peoples.abi, provider);
            try{
                const data = await contract.getAllDirectors();
                setDirectors(data);
                console.log(data)
            }catch (err) {
                console.log(err);
            }
        }
    }

    async function createMovie() {}

    return (
        <div>
            <h3>Ajout d'un nouveau film</h3>
            {
                transactionSuccess
                    ? <p style={{color: 'green'}}>Ajout avec success !</p>
                    : null
            }
            {
                transactionError
                    ? <p style={{color: 'red'}}>L'ajout a échoué !</p>
                    : null
            }

            <div>
                <div className="form-ligne">
                    <label>
                        Title :
                        <input onChange={e => setTitle(e.target.value)} value={title} placeholder="set title"/>
                    </label>
                </div>
                <div className="form-ligne form-description">
                    <label>
                        Description :
                    </label>
                    <textarea rows={5} cols={25} value={description} onChange={e => setDescription(e.target.value)} placeholder="set description" />
                </div>
                <div className="form-ligne">
                    <label>
                        IPFS uri:
                        <input onChange={e => setIpfsURI(e.target.value)} value={ipfsURI} placeholder="set ipfs uri"/>
                    </label>
                </div>
                <div className="form-ligne">
                    <label htmlFor="type">Director :
                        <select id="type" onChange={e => setIdDirector(e.target.value)}>
                            {directors.map((director, index) => {
                                const idNumber = ethers.toNumber(director.id);
                                return (
                                    <option key={`${idNumber}-${index}`} value={idNumber} >{director.firstName} {director.lastName}</option>
                                )
                            })
                            }
                        </select>
                    </label>
                </div>
            </div>

            <button onClick={createMovie}>Ajout</button>

        </div>
    )
}

export default BlockAddMovie;
