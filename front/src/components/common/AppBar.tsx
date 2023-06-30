import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import PersonPinIcon from "@mui/icons-material/PersonPin";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {provider} from "../../provider/providers.ts";

function ResponsiveAppBar() {
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const navigate = useNavigate();
    const [connectedUserAddress, setConnectedUserAddress] = useState('');

    async function accountNavigate() {
        if(connectedUserAddress) navigate("/account");
    }
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const connect = () => {
        if (provider) {
            provider.send("eth_requestAccounts", []).then(async () => {
                const signer = await provider?.getSigner()

                if (signer) {
                    setConnectedUserAddress(await signer.getAddress())
                }
            })
        }
    }

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const disconnect = () => {
        setConnectedUserAddress('')
        navigate("/");
    }

    return (
        <AppBar>
            <Box sx={{ flexGrow: 0, position: 'absolute', top: '7px', right: '30px', display: 'flex', alignItems: 'center' }}>
                <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        {
                            connectedUserAddress !== ''
                                ? <p style={{display: 'flex', alignItems: 'center'}}><span>{connectedUserAddress.substring(0,5)}...{connectedUserAddress.substring(38,42)}</span>  <PersonPinIcon fontSize="large"/></p>
                                : <p style={{display: 'flex', alignItems: 'center'}}><span>Mon compte</span>  <PersonPinIcon fontSize="large"/></p>
                        }
                    </IconButton>
                </Tooltip>
                <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                >
                    <MenuItem onClick={() => {accountNavigate();}}>
                        <Typography textAlign="center">Mon Compte</Typography>
                    </MenuItem>
                    {
                        connectedUserAddress !== ''
                            ?  <MenuItem onClick={() => {handleCloseUserMenu(); disconnect();}}>
                                <Typography textAlign="center">Logout</Typography>
                            </MenuItem>
                            : <MenuItem onClick={() => {connect();}}>
                                <Typography textAlign="center">Connexion</Typography>
                            </MenuItem>
                    }
                </Menu>
            </Box>
        </AppBar>
    );
}
export default ResponsiveAppBar;
