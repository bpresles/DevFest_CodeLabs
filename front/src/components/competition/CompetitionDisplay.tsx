import { useEffect, useState } from "react"
import { toString as uint8ArrayToString } from 'uint8arrays/to-string'
import {ethers} from "ethers";
import contractsInterface from "../../contracts/contracts.ts";
import {provider} from "../../provider/providers.ts";
import {ipfsGetContent} from "../common/ipfs.ts";

interface CompetitionDisplayProps {
    tokenId: number
}

const CompetitionDisplay = ({tokenId}: CompetitionDisplayProps) => {
    const [competitionImage, setCompetitionImage] = useState('');
    const [metadata, setMetadata]: any = useState();

    useEffect( () => {
        if (tokenId) {
            const fetchData = async () => {
                let competition: any;

                let contract = new ethers.Contract(contractsInterface.contracts.Competitions.address, contractsInterface.contracts.Competitions.abi, provider);
                try {
                    competition = await contract.getCompetition(tokenId);
                } catch (e) {
                    console.log(e);
                }

                if (competition) {
                    const metadataString = await ipfsGetContent(competition.tokenURI)
                    const data = JSON.parse(uint8ArrayToString(metadataString, 'utf8'))
                    setMetadata(data);

                    if (data.image) {
                        const imageContent = await ipfsGetContent(data.attributes[1].value)
                        setCompetitionImage(uint8ArrayToString(imageContent, 'base64'))
                    }
                }
            }
            fetchData().catch(console.error);

        }
    }, [competitionImage, setCompetitionImage, tokenId])

    return (
        <div style={{margin: 'auto', width: 200}}>
            {tokenId > 0 && competitionImage &&
                <div>
                    <h3>Apercu :</h3>
                    <img src={`data:image/*;base64,${competitionImage}`} alt="card" style={{height: '200px'}}/>
                    <p>{metadata.attributes[0].value}</p>
                </div>
            }
        </div>
    )
}
export default CompetitionDisplay;
