const hre = require("hardhat");
 const gasLimit = ethers.utils.hexlify(500000);
async function main() {

  console.log("Connected to network:", hre.network.name);
  const bridgeAddress = "0xF9bc4a80464E48369303196645e876c8C7D972de"; //address for bridge
  const deployedAddress = "0x632b2c14ACF7172Bf68b6e2f76dc1C8babCCf482"; //address of deployed contract

  const nft = await hre.ethers.getContractFactory("siva");
  const contract = await nft.attach(deployedAddress);
  console.log("Contract address:", contract.address);

  // Token IDs of the NFTs you want to send
  const tokenIds = [0,1,2,3,4];
  const wallet = "0x330c75B827643Bd2D2b0A61e3fD39f80222Ae05B"; //Wallet address
 

  // Approve and deposit each token to the FxPortal Bridge for sending
  for (let i = 0; i < tokenIds.length; i++) {
    const tokenId = tokenIds[i];
    console.log(`Confirm token with token ID ${tokenId} for transfer`);
    await contract.approve(bridgeAddress, tokenId);

    console.log(`Store token with token ID ${tokenId} on the Bridge`);  //Fx portal Bridge
    await contract["safeTransferFrom(address,address,uint256)"](wallet, bridgeAddress, tokenId);

 
  }
  console.log("Transfer of token executed completely");
  


  // Print the balance of the wallet
  const walletBalance = await hre.ethers.provider.getBalance(wallet);
  console.log("Balance of is:", walletBalance.toString());
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
