import {ChangeEvent, useState} from "react";
import {provider} from "../../provider/providers.ts";
import {ethers} from "ethers";
import contractsInterface from "../../contracts/contracts.ts";
import "../../styles/formBlock.css";
import ipfs from "../common/ipfs.ts";
import {PeopleMetadata} from "../../types/Metadata.ts";
import PeopleDisplay from "./PeopleDisplay.tsx";

const PeopleGenerator = () => {
    const [transactionSuccess, setTransactionSuccess] = useState(false);
    const [transactionError, setTransactionError] = useState(false);

    const [type, setType]: any = useState(0);
    const [Lastname, setLastname]: any = useState('');
    const [Firstname, setFirstname]: any = useState('');
    const [Picture, setPicture]: any = useState('');
    const [, setFile] = useState(null);
    const [Address, setAddress]: any = useState('');

    const [tokenId, setTokenId]: any = useState(0);

    /**
     * fonction qui Mint le token uri dans la blockchain
     * @param tokenURI
     */
    async function mintPeople(tokenURI: string) {
        const signer = await provider?.getSigner();
        let transaction;
        let contract;

        // création de l'appel du mint
        if (type === 1) {
            contract = new ethers.Contract(contractsInterface.contracts.Actors.address, contractsInterface.contracts.Actors.abi, signer);
            transaction = await contract.mint(tokenURI);
        } else {
            contract = new ethers.Contract(contractsInterface.contracts.Directors.address, contractsInterface.contracts.Directors.abi, signer);
            transaction = await contract.mint(tokenURI);
        }

        // récuperation de l'id du token minté
        contract.on('*', (event) => {
            if(event.eventName === 'ActorMinted' || event.eventName === 'DirectorMinted'){
                const id = ethers.toNumber(event.args[0]);
                setTokenId(id);
            }
        });

        // récupération des informations du mint
        await transaction.wait().then(async (receipt: any) => {
            if (receipt && receipt.status == 1) {
                setFirstname('');
                setLastname('');
                setPicture('');
                setAddress('');
                setType(0);
                setTransactionSuccess(true);
                setTimeout(
                    function () {
                        setTransactionSuccess(false)
                    }, 5000);
            }
        }).catch((err: any) => {
            if (err) {
                setTransactionError(true);
                setTimeout(
                    function () {
                        setTransactionError(false)
                    }, 5000);
            }
        })
    }

    /**
     * Choix de la photo
     * @param event
     */
    const selectedPhoto = (event: ChangeEvent<HTMLInputElement>) => {
        const filesUploaded = event.currentTarget.files;
        if (filesUploaded && filesUploaded.length > 0) {
            setPictureBase64(filesUploaded[0]);
        }
    };

    /**
     * Set l'url de la photo
     * @param file
     */
    const setPictureBase64 = (file: any) => {
        setFile(file);
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            setPicture(reader.result as string);
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    };

    /**
     * Verification du formulaire avant procédure du mint NFT
     * */
    const verifyForm = async () => {
        // Controle des champs
        if (!Firstname || Firstname.length === 0) {
            return false
        }
        if (!Lastname || Lastname.length === 0) {
            return false;
        }
        if (!Picture) {
            return false;
        }
        if (!Address || Address.length === 0 || !ethers.isAddress(Address)) {
            return false;
        }

        // Création de l'acteur
        const newActorInfo = {
            Firstname,
            Lastname,
            Picture,
            Address
        }

        // Upload de l'image sur ipfs
        const PictureFile = await dataUrlToFile(`data:image/*;${newActorInfo.Picture}`)
        const ipfsPictureUploadResult = await ipfs.add(PictureFile, {pin: true}).catch((err: Error) => {
            console.log(err.message);
        });

        // création de l'uri - addresse de l'image uploadé
        if (ipfsPictureUploadResult) {
            const PictureUri = `ipfs://${ipfsPictureUploadResult.cid}`
            await generateNFTMetadataAndUploadToIpfs(PictureUri, newActorInfo);
        }
    }

    /**
     * Génération des meta données du nft avec enregistrement sur ipfs
     * @param PictureUri
     * @param newActorInfo
     */
    const generateNFTMetadataAndUploadToIpfs = async (PictureUri: string, newActorInfo: any,) => {
        const NFTMetaData: PeopleMetadata = {
            "description": "Actor generated NFT metadata",
            "external_url": "",
            "image": PictureUri,
            "name": "Actors DevFest",
            "attributes": [
                {
                    "trait_type": "Firstname",
                    "value": newActorInfo.Firstname
                },
                {
                    "trait_type": "Lastname",
                    "value": newActorInfo.Lastname
                },
                {
                    "trait_type": "Picture",
                    "value": PictureUri
                },
                {
                    "trait_type": "Address",
                    "value": newActorInfo.Address
                }
            ]
        }

        const metadataString = JSON.stringify(NFTMetaData);

        // enregistrement des meta donné sur ipfs
        const ipfsResponse = await ipfs.add(metadataString, {pin: true}).catch((err: Error) => {
            console.log(err.message);
        });
        // création de l'addresse des meta donnée
        if (ipfsResponse) {
            const tokenURI = 'ipfs://' + ipfsResponse.cid;
            await mintPeople(tokenURI);
        }
    }

    /**
     * création d'un fichier a partir d'une url base 64
     * @param src
     */
    const dataUrlToFile = async (src: string) => {
        return (fetch(src)
            .then(function (res) {
                return res.arrayBuffer();
            }))
            .then(function (buf) {
                return new File([buf], 'people.jpg', {type: 'image/*'});
            })
    };

    return (
        <section>
            <h3>Ajout d'un acteur ou réalisateur</h3>
            <div>
                <div className="form-ligne">
                    <label>
                        Prénom :
                        <input name="Firstname" onChange={e => setFirstname(e.target.value)} value={Firstname}/>
                    </label>
                </div>
                <div className="form-ligne">
                    <label>
                        Nom :
                        <input name="Lastname" onChange={e => setLastname(e.target.value)} value={Lastname}/>
                    </label>
                </div>
                <div className="form-ligne">
                    <label>
                        Photo :
                        <div>
                            <img src={Picture} style={{width: '200px'}}/>
                        </div>
                        <input name="Picture" type="file" onChange={selectedPhoto}/>
                    </label>
                </div>
                <div className="form-ligne">
                    <label>
                        Addresse wallet :
                        <input name="Address" onChange={e => setAddress(e.target.value)}
                               value={Address}/>
                    </label>
                </div>
                <div className="form-ligne">
                    <label htmlFor="type">Type :
                        <select id="type" onChange={e => setType(e.target.value)} defaultValue={1}>
                            <option value={1}>Acteur</option>
                            <option value={2}>Réalisateur</option>
                        </select>
                    </label>
                </div>
            </div>

            <button onClick={verifyForm}>Ajout</button>

            <div>
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
                <PeopleDisplay tokenId={tokenId} type={type} />
            </div>
        </section>
    )
}
export default PeopleGenerator;
