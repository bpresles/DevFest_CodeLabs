import {useState} from "react";
import {AlertColor} from "@mui/material";
import {fetchMovie} from "../../services/MovieService.service.ts";
import contractsInterface from "../../contracts/contracts.ts";
import {fetchPeople} from "../../services/PeopleService.service.ts";
import CardCompetitionSelect from "./CardCompetitionSelect.tsx";
import {ethers} from "ethers";
import SnackbarAlert from "../common/SnackbarAlert.tsx";

const CompetitionGenerator = () => {
    const [, setLoading] = useState(false);
    const [mitting, setMitting] = useState(false);

    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState('')
    const [severity, setSeverity] = useState<AlertColor | undefined>('success')

    const [directors, setDirectors]: any = useState([]);
    const [actors, setActors]: any = useState([]);
    const [movies, setMovies]: any = useState([]);

    const [title, setTitle]: any = useState('');
    let jurys: string[] = [];
    let idsOption: number[] = [];
    const [typeCompetition, setTypeCompetition]: any = useState(0);
    const [startDate, setStartDate]: any = useState(0);
    const [endDate, setEndDate]: any = useState(0);

    /**
     * Verification des données avant sauvegarde dans la blockchain
     */
    const verifyForm = async () => {
        console.log(endDate < startDate)
        // controle des champs
        if(!startDate || (new Date(startDate)).getTime() <= 0){
            setMitting(false);
            setMessage(`Invalide start date`)
            setSeverity('error')
            setOpen(true)
            return false
        }
        if(!endDate || (new Date(endDate)).getTime() <= 0 || endDate < startDate){
            setMitting(false);
            setMessage(`Invalide end date`)
            setSeverity('error')
            setOpen(true)
            return false
        }
        if(typeCompetition != 1 || typeCompetition != 2 || typeCompetition != 3){
            setMitting(false);
            setMessage(`Invalide type competition`)
            setSeverity('error')
            setOpen(true)
            return false
        }
    }

    /**
     * Permet en fonction du type de compétition de récupérer les données ipfs des nfts correspondant
     * @param type
     */
    function getTypeCompetition(type: any){
        setTypeCompetition(type)
        setTitle("");
        idsOption = [];
        setActors([]);
        setDirectors([]);
        setMovies([]);

        if(type == 1){
            setTitle("Les Acteurs en compétition pour le chevrons d'argent");
            fetchPeople("ActorMinted", contractsInterface.contracts.Actors.address, contractsInterface.contracts.Actors.abi, setLoading)
                .then((peoples) => {
                    setActors(peoples);
                });
        } else if(type == 2){
            setTitle("Les Réalisateurs en compétition pour la parenthèse de cristal");
            fetchPeople("DirectorMinted", contractsInterface.contracts.Directors.address, contractsInterface.contracts.Directors.abi, setLoading)
                .then((peoples) => {
                    setDirectors(peoples);
                });
        } else {
            setTitle("Les Films en compétition pour l'accolade d'or");
            fetchMovie("MovieMinted", contractsInterface.contracts.Movies.address, contractsInterface.contracts.Movies.abi, setLoading)
                .then((films) => {
                    setMovies(films);
                });
        }
    }

    /**
     * retourne le timestamp de la date selectionné
     * @param date
     */
    function getTimestamp(date: any){
        const timestamp = Date.parse(date.toString());
        return Number(timestamp.toString().substring(0, 10));
    }

    /**
     * Permet de verifier les ids ajouter à la liste et d'ajouter de nouveau selectionné ou de supprimé un existant
     * @param number
     */
    function addTokenIdOption(number: number){
        let contain = false;
        idsOption?.map((id: number) => {
            if(id == number){
                contain = true;
            }
        })
        if(!contain){
            idsOption.push(number);
        }else{
            idsOption.splice(idsOption.indexOf(number),1);
        }
    }

    /**
     * permet de verifier les addresses des jurys et de les ajouter ou supprimer a la liste
     * @param address
     */
    function addJuryAddress(address: string){
        if(ethers.isAddress(address)){
            let contain = false;
            jurys?.map((a: string) => {
                if(a == address){
                    contain = true;
                }
            })
            if(!contain){
                jurys.push(address);
            }else{
                jurys.splice(jurys.indexOf(address),1);
            }
        }else{
            setMessage(`Invalide Address wallet`)
            setSeverity('error')
            setOpen(true)
            return false;
        }
    }

    return (
        <div>
            <h2>Création d'une nouvelle compétition</h2>
            <div className="form-ligne">
                <p>Titre de la compétition : <b>{title}</b></p>
                <label> Type de compétition :
                    <select name="type" onChange={e => getTypeCompetition(e.target.value)}>
                        <option>Selectionnez le type de compétition</option>
                        <option value={1}>Acteur</option>
                        <option value={2}>Réalisateur</option>
                        <option value={3}>Film</option>
                    </select>
                </label>
            </div>
            <div className="form-ligne">
                <label> Debut de la compétition :
                    <input name="startDate" type="datetime-local" onChange={e => setStartDate(getTimestamp(e.target.value))} />
                </label>
            </div>
            <div className="form-ligne">
                <label> Fin de la competition :
                    <input name="endDate" type="datetime-local" onChange={e => setEndDate(getTimestamp(e.target.value))} />
                </label>
            </div>
            <div  className="form-ligne">
                <h5>Les Jurys : </h5>
                <label> Jury 1 :
                    <input name="jury" type="checkbox" onChange={e => addJuryAddress(e.target.value)}
                           value="0x2404C1f451B02c0760dC7C259a5EFc3210f872F9"/>
                </label>
                <label> Jury 2 :
                    <input name="jury" type="checkbox" onChange={e => addJuryAddress(e.target.value)}
                           value="0xdecdde28938EF97608369d29cee5F35Bcb084EAE"/>
                </label>
                <label> Jury 3 :
                    <input name="jury" type="checkbox" onChange={e => addJuryAddress(e.target.value)}
                           value="0x9b4ba2d540c315080209cCa116480304B3BB14d0"/>
                </label>
            </div>

            <section style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
                {actors && actors.length > 0 && actors.map((actor: any, index: number) => (
                        <div  key={`${actor.id}-${index}`}
                              onClick={() => addTokenIdOption(actor.id)}>
                            <CardCompetitionSelect
                                Info={actor.Firstname + " " + actor.Lastname}
                                Picture={actor.Picture}
                            />
                        </div>
                    ))
                }
                {directors && directors.length > 0 && directors.map((director: any, index: number) => (
                    <div  key={`${director.id}-${index}`}
                          onClick={() => addTokenIdOption(director.id)}>
                        <CardCompetitionSelect
                            Info={director.Firstname + " " + director.Lastname}
                            Picture={director.Picture}
                        />
                    </div>
                ))
                }
                {movies && movies.length > 0 && movies.map((movie: any, index: number) => (
                    <div  key={`${movie.id}-${index}`}
                          onClick={() => addTokenIdOption(movie.id)}>
                        <CardCompetitionSelect
                            Info={movie.Title}
                            Picture={movie.Picture}
                        />
                    </div>
                ))
                }
            </section>

            <button onClick={verifyForm} disabled={mitting}>Ajout d'une nouvelle compétition</button>

            <div>
                <SnackbarAlert open={open} setOpen={setOpen} message={message} severity={severity} />
            </div>
        </div>
    )
}
export default CompetitionGenerator;
