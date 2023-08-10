import PeopleCard from "../components/peoples/PeopleCard.tsx";
import {useEffect, useState} from "react";
import contractsInterface from "../contracts/contracts.ts";
import {fetchPeople} from "../services/PeopleService.service.ts";

const Acteur = () => {
    const [actors, setActors]: any = useState([]);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        fetchPeople("ActorMinted", contractsInterface.contracts.Actors.address, contractsInterface.contracts.Actors.abi, setLoading)
            .then((peoples) => {
                setActors(peoples);
            });
    }, []);

    /*const acteurs = [
        {
            id: 1,
            name: 'Heard',
            lastname: 'Amber',
            url: 'amber_heard.png',
        },
        {
            id: 2,
            name: 'Jolie',
            lastname: 'Angelina',
            url: 'angelina_jolie.png',
        },
        {
            id: 3,
            name: 'Pitt',
            lastname: 'Brad',
            url: 'brad_pitt.png',
        },
        {
            id: 4,
            name: 'Johnson',
            lastname: 'Dwayne',
            url: 'dwayne_johnson.png',
        },
        {
            id: 5,
            name: 'Blunt',
            lastname: 'Emily',
            url: 'emily_blunt.png',
        },
        {
            id: 6,
            name: 'Watson',
            lastname: 'Emma',
            url: 'emma_watson.png',
        },
        {
            id: 7,
            name: 'Gadot',
            lastname: 'Gal',
            url: 'gal_gadot.png',
        },
        {
            id: 8,
            name: 'Momoa',
            lastname: 'Jason',
            url: 'jason_momoa.png',
        },
        {
            id: 9,
            name: 'Statham',
            lastname: 'Jason',
            url: 'jason_statham.png',
        },
        {
            id: 10,
            name: 'Lawrence',
            lastname: 'Jennifer',
            url: 'jennifer_lawrence.png',
        },
        {
            id: 11,
            name: 'Depp',
            lastname: 'Johnny',
            url: 'johnny_depp.png',
        },
        {
            id: 12,
            name: 'Dicaprio',
            lastname: 'Leonardo',
            url: 'leonardo_dicaprio.png',
        },
        {
            id: 13,
            name: 'Robbie',
            lastname: 'Margot',
            url: 'margot_robbie.png',
        },
        {
            id: 14,
            name: 'Portman',
            lastname: 'Natalie',
            url: 'natalie_portman.png',
        },
        {
            id: 15,
            name: 'Johansson',
            lastname: 'Scarlett',
            url: 'scarlett_johansson.png',
        },
        {
            id: 16,
            name: 'Cruise',
            lastname: 'Tom',
            url: 'tom_cruise.png',
        },
        {
            id: 17,
            name: 'Hanks',
            lastname: 'Tom',
            url: 'tom_hanks.png',
        },
        {
            id: 18,
            name: 'Smith',
            lastname: 'Will',
            url: 'will_smith.png',
        },
    ]*/

    return (
        <article>
            <h2>Les Acteurs en compétition du devfest 2023</h2>

            <section style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}}>
                {!isLoading && actors && actors.length > 0 && actors.map((actor: any, index: number) => (
                    <PeopleCard
                        key={`${actor.id}-${index}`}
                        Firstname={actor.Firstname}
                        Lastname={actor.Lastname}
                        Picture={actor.Picture}
                    />
                ))}
            </section>
        </article>
    )
}
export default Acteur;
