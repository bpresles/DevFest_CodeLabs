export interface PeopleMetadata {
    "description": string;
    "external_url": string;
    "image": string;
    "name": string;
    "attributes": [
        {
            "trait_type": "Firstname",
            "value": string;
        },
        {
            "trait_type": "Lastname",
            "value": string;
        },
        {
            "trait_type": "Picture",
            "value": string;
        },
        {
            "trait_type": "Address",
            "value": string;
        }
    ]
}
