import { Link, matchPath, Route, Routes, useLocation } from 'react-router-dom';
import {Box, Tab, Tabs} from "@mui/material";
import Home from "../../pages/Home.tsx";
import AdministratorPage from "../../pages/AdministratorPage.tsx";
import Jury from "../../pages/Jury.tsx";
import Acteur from "../../pages/Acteur.tsx";
import Film from "../../pages/Film.tsx";
import Realisateur from "../../pages/Realisateur.tsx";

const useRouteMatch = (patterns: string[]) => {
    const { pathname } = useLocation();

    for (const element of patterns) {
        const pattern = element;
        const possibleMatch = matchPath(pattern, pathname);
        if (possibleMatch !== null) {
            return possibleMatch;
        }
    }
    return null;
}

const NavTab = () => {
    const routeMatch = useRouteMatch(['/', '/administrator', '/jury', '/acteur', '/film', '/realisateur']);
    const currentTab = routeMatch?.pattern?.path || '/';

    return (
        <>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', textAlign: 'center' }}>
                <Tabs
                    centered
                    value={currentTab}
                    TabIndicatorProps={{style: {background:'#f2c684'}}}>
                    <Tab label="Accueil" value='/' to='/' component={Link}/>
                    <Tab label="Films" value='/film' to='/film' component={Link} />
                    <Tab label="Acteurs" value='/acteur' to='/acteur' component={Link} />
                    <Tab label="Realisateurs" value='/realisateur' to='/realisateur' component={Link} />
                    <Tab label="Jurys" value='/jury' to='/jury' component={Link} />
                </Tabs>
                <Routes>
                    <Route path="/" element={<Box sx={{ paddingLeft: 3, paddingRight: 3, width: "100%" }}><Home /></Box>}></Route>
                    <Route path="/admin" element={<Box sx={{ paddingLeft: 3, paddingRight: 3, width: "100%" }}><AdministratorPage /></Box>}></Route>
                    <Route path="/jury" element={<Box sx={{ paddingLeft: 3, paddingRight: 3, width: "100%" }}><Jury /></Box>}></Route>
                    <Route path="/acteur" element={<Box sx={{ paddingLeft: 3, paddingRight: 3, width: "100%" }}><Acteur /></Box>}></Route>
                    <Route path="/realisateur" element={<Box sx={{ paddingLeft: 3, paddingRight: 3, width: "100%" }}><Realisateur /></Box>}></Route>
                    <Route path="/film" element={<Box sx={{ paddingLeft: 3, paddingRight: 3, width: "100%" }}><Film /></Box>}></Route>
                </Routes>
            </Box>
        </>
    )
}

export default NavTab;
