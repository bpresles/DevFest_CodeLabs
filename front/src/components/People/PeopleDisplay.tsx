import { useEffect, useState } from "react"
import { toString as uint8ArrayToString } from 'uint8arrays/to-string'
import {ethers} from "ethers";
import contractsInterface from "../../contracts/contracts.ts";
import {provider} from "../../provider/providers.ts";
import {ipfsGetContent} from "../common/ipfs.ts";

interface PeopleDisplayProps {
    tokenId: number,
    type: number
}

const PeopleDisplay = ({tokenId, type}: PeopleDisplayProps  ) => {
    const [actorImage, setActorImage] = useState('');
    const [metadata, setMetadata]: any = useState();

    useEffect(() => {
        if (tokenId ) {
            (async () => {
                let tokenUri: string = '';
                let contract;
                if(type === 1){
                    contract = new ethers.Contract(contractsInterface.contracts.Actors.address, contractsInterface.contracts.Actors.abi, provider);
                }else {
                    contract = new ethers.Contract(contractsInterface.contracts.Directors.address, contractsInterface.contracts.Directors.abi, provider);
                }

                try {
                    tokenUri = await contract.tokenURI(tokenId);
                }
                catch (e) {
                    console.log(e);
                }

                if (tokenUri) {
                    const metadataString = await ipfsGetContent(tokenUri)
                    const data = JSON.parse(uint8ArrayToString(metadataString, 'utf8'))
                    setMetadata(data);

                    if (data.image) {
                        const imageContent = await ipfsGetContent(data.attributes[2].value)
                        setActorImage(uint8ArrayToString(imageContent, 'base64'))
                    }
                }
            })()
        }
    }, [actorImage, setActorImage, tokenId])

    return (
        <div style={{margin: 'auto', width: 200}}>
            {tokenId && actorImage &&
                <div>
                    <img src={`data:image/*;base64,${actorImage}`} alt="card" style={{height: '200px'}}/>
                    <p>{metadata.attributes[0].value} {metadata.attributes[1].value}</p>
                </div>
            }
        </div>
    )
}
export default PeopleDisplay
