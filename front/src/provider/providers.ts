import {ethers} from "ethers";

export const provider = window.ethereum ? new ethers.BrowserProvider(window.ethereum) : null;
