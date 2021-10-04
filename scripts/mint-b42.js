const { BigNumber } = require("@ethersproject/bignumber");

async function main() {
    const [signer] = await ethers.getSigners();

    console.log("Minting the token with the account:", signer.address);

    const intial_balance = await signer.getBalance();
    console.log("Signer balance:", intial_balance.toString());
  
    const abi = [
        // Read-Only Functions
        "function balanceOf(address owner) view returns (uint256)",
        "function decimals() view returns (uint8)",
        "function symbol() view returns (string)",
    
        // Mint Functions
        "function mint(address to, uint amount)",

        // Authenticated Functions
        "function transfer(address to, uint amount) returns (bool)",
    
        // Events
        "event Transfer(address indexed from, address indexed to, uint amount)"
    ];
    const address = "0xED06A746CCd14374E13D61Fa241A7EBA3F3D49EB";

    const token = new ethers.Contract(address, abi, signer);
    console.log("Token address:", token.address);
    console.log("Signer balance: %s", await token.balanceOf(signer.address));
    await token.mint(signer.address, ethers.utils.parseEther("1000.0"));
    console.log("Gas cost = %s", (await signer.getBalance()).sub(intial_balance).toString());

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });