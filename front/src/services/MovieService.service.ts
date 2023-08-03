import {provider} from "../provider/providers.ts";
import {ethers, EventLog} from "ethers";
import {ipfsGetContent} from "../components/common/ipfs.ts";
import {toString as uint8ArrayToString} from "uint8arrays/to-string";

export async function fetchMovie(eventType: string, contractAddress: string, contractAbi: any, setLoading: Function) {
    setLoading(true);
    if (provider) {
        // initialisation du contract
        const contract = new ethers.Contract(contractAddress, contractAbi, provider);
        // création du filtre
        const filter = contract.filters[eventType];
        // récupération des evenements en fonction du filtre
        const events = await contract.queryFilter(filter, 0);
        const movies: any = [];
        try{
            for (const event of events) {
                let tokenUri: string = '';
                // récupération de l'id du token parsé car initialement on le recoit en bigNumber
                const id = ethers.toNumber((event as EventLog).args[0]);
                // récupération du tokenURI, url des metadonnée du token
                tokenUri = await contract.tokenURI(id);

                if(tokenUri) {
                    // parse des données récupérées en object
                    const metadataString = await ipfsGetContent(tokenUri)
                    const data = JSON.parse(uint8ArrayToString(metadataString, 'utf8'))

                    const movie = {
                        id: id,
                        Title: data.attributes[0].value,
                        Description: data.attributes[1].value,
                        Picture: data.attributes[2].value.replace('ipfs://', 'https://ipfs.io/ipfs/'),
                        TokenIdDirector: data.attributes[3].value
                    }
                    movies.push(movie);
                }
            }
        } catch (err) {
            console.log(err);
            setLoading(false);
            return false;
        }
        setLoading(false);
        return movies;
    }
}
