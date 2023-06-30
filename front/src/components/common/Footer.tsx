import {Box} from "@mui/material";

const Footer = () => {
    return (
        <Box sx={{textAlign: 'center', margin: '20px', clear: 'both'}}>
            <p>Copyright &copy; 2023 - <a href="https://blockchainsociete.org/" target="_blank">Blockchain & Société</a></p>
            <p>By <a href="https://www.linkedin.com/in/bpresles/" target="_blank">Bertrand PRESLES</a>, <a href="https://www.linkedin.com/in/colas-vincent/" target="_blank">Vincent COLAS</a> et <a href="https://www.linkedin.com/in/adrien-l-59b697261/" target="_blank">Adrien LASSELLE</a></p>
            <p>En collaboration avec <a href="https://www.younup.fr/" target="_blank">Younup</a> et <a href="https://www.sfeir.com/fr/" target="_blank">[SFΞIR]</a></p>
        </Box>
    )
}
export default Footer;
