import PeopleCard from "../components/peoples/PeopleCard.tsx";

const Jury = () => {

    const jurys = [
        {
            id: 1,
            name: 'Dupont',
            lastname: 'Jean-Luc',
            url: 'default-profil.png',
        },
        {
            id: 2,
            name: 'Leclerc',
            lastname: 'Marie',
            url: 'default-profil.png',
        },
        {
            id: 3,
            name: 'Martin',
            lastname: 'Patrick',
            url: 'default-profil.png',
        },
        {
            id: 4,
            name: 'Dubois',
            lastname: 'Sophie',
            url: 'default-profil.png',
        },
        {
            id: 5,
            name: 'Lefevre',
            lastname: 'Pierre',
            url: 'default-profil.png',
        },
        {
            id: 6,
            name: 'Girard',
            lastname: 'Isabelle',
            url: 'default-profil.png',
        },
        {
            id: 7,
            name: 'Tremblay',
            lastname: 'Nicolas',
            url: 'default-profil.png',
        },
        {
            id: 8,
            name: 'Gagnon',
            lastname: 'Sandrine',
            url: 'default-profil.png',
        },
        {
            id: 9,
            name: 'Roy',
            lastname: 'Phillipe',
            url: 'default-profil.png',
        },
        {
            id: 10,
            name: 'Pelletier',
            lastname: 'Emilie',
            url: 'default-profil.png',
        }
    ]

    return (
        <div>
            <h2>Les Jurys des compétitions du devfest 2023</h2>

            <section style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}}>
                {jurys.map((jury, index) => (
                    <PeopleCard
                        key={`${jury.id}-${index}`}
                        Firstname={jury.name}
                        Lastname={jury.lastname}
                        Picture={`/peoples/${jury.url}`}
                    />
                ))}
            </section>
        </div>
    )
}
export default Jury;
