/** @type {import('next').NextConfig} */

module.exports = {
    reactStrictMode: true,
    env: {
        ETH_NET: "ropsten",
        INFURA_PROJECT_ID: "087d97ae8541468cb3306b504ac29290",
        INFURA_PROJECT_SECRET: "fe90ca6932eb40299222210d134b5f6b",
    },
    compiler: {
        // Enables the styled-components SWC transform
        styledComponents: true,
    },
};
