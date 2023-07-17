# Blockchain & Société CodeLabs

## Table des matières
- [Projet](#blockchain--société-codelabs)
  - [Table des matières](#table-des-matières)
  - [Présentation](#presentation)
  - [Structure](#structure)
  - [Installation](#installation)
    - [Outils](#outils)
    - [Front](#front)
    - [Hardhat](#hardhat)

<a name="presentation"></a>
## Présentation
Ce projet à été créer dans le but d'une démonstration d'un cas d'usage de la blockchain,
dans le cadre d'un atelier codeLabs du DevFest Nantes 2023.

Le projet à pour but de récompenser en NFT les gagnants des compétitions à l'issue d'un vote, 
pour chaque compétition une liste de jury sont selectionné, un jury est unique et est identifié 
par un SBT.

### Synopsis
Le Festival du Cinéma du DevFest a une renommée internationale et récompense les meilleures œuvres cinématographiques de la communauté des développeurs.
Les organisateurs du festival ont émis le souhait de moderniser le processus de récompense en utilisant la technologie des NFT. Votre mission,
si vous l'acceptez, est de réaliser cette application en permettant aux organisateurs de sélectionner les films nominés,
de définir les membres du jury, d'organiser des votes par le jury et de remettre les prix aux lauréats.

<a name="structure"></a>
## Structure
```
front (Front UI)
|
+-- public (static files)
|
+-- src (React sources)

hardhat (Smart Contract)
|
+-- contracts (Solidity source file of the smart contract)
|
+-- deploy (Deployment script)
|
+-- test (Unit tests)
```

<a name="installation"></a>
## Installation
Cloner le projet :
```bash 
$ git clone https://github.com/BlockchainEtSociete/DevFest_CodeLabs.git
```

<a name="outils"></a>
### Outils
- [Node.js](https://nodejs.org/fr/download)
- [Ganache](https://trufflesuite.com/ganache/)
- [IPFS Desktop](https://docs.ipfs.tech/install/ipfs-desktop/)
une petite config sera peu etre necessaire :
```json
{
  "API": {
    "HTTPHeaders": {
      "Access-Control-Allow-Credentials": [
        "true"
      ],
      "Access-Control-Allow-Methods": [
        "PUT",
        "POST"
      ],
      "Access-Control-Allow-Origin": [
        "*",
        "https://webui.ipfs.io",
        "http://webui.ipfs.io.ipns.localhost:8081"
      ]
    }
  },
  "Addresses": {
    "API": "/ip4/0.0.0.0/tcp/5001",
    "Announce": [],
    "AppendAnnounce": [],
    "Gateway": "/ip4/0.0.0.0/tcp/8081",
    "NoAnnounce": [],
    "Swarm": [
      "/ip4/0.0.0.0/tcp/4001",
      "/ip6/::/tcp/4001",
      "/ip4/0.0.0.0/udp/4001/quic",
      "/ip4/0.0.0.0/udp/4001/quic-v1",
      "/ip4/0.0.0.0/udp/4001/quic-v1/webtransport",
      "/ip6/::/udp/4001/quic",
      "/ip6/::/udp/4001/quic-v1",
      "/ip6/::/udp/4001/quic-v1/webtransport"
    ]
  }
}
```

<a name="front"></a>
### Front
```bash 
$ cd front
$ npm install
```
Modifier le fichier .env avec vos configurations :
```bash
REACT_APP_IPFS_SCHEME="http"
REACT_APP_IPFS_HOST="localhost"
REACT_APP_IPFS_PORT="5001"
```
Pour lancer l'app:
```bash 
$ npm run dev
```

<a name="hardhat"></a>
### Hardhat

Modifier le fichier .env avec vos configurations :
```bash
MNEMONIC="YOUR_MNEMONIC"
INFURA_ID="AN_INFURA_ID"
ALCHEMY_ID="AN_ALCHEMY_ID"
```

#### Compile smart contrat
```bash
$ cd hardhat
$ npm run build
```

#### Deploy smart contrat with Ganache
```bash
$ npm run deploy:ganache
```

### Run tests
```bash
$ npm run test
```
