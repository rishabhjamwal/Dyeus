async function main() {
    [signer1, signer2] = await ethers.getSigners();
  
    const Bank = await ethers.getContractFactory("Bank", signer1);
    const bankContract = await Bank.deploy();
  
    const Matic = await ethers.getContractFactory("Matic", signer1);
    const matic = await Matic.deploy();
    const Usdt = await ethers.getContractFactory("Usdt", signer1);
    const usdt = await Usdt.deploy();
    const Bomb = await ethers.getContractFactory("Bomb", signer1);
    const bomb = await Bomb.deploy();
    
    // const Matic = await ethers.getContractFactory("Matic", signer2);
    // const matic = await Matic.deploy();
    // const Bomb = await ethers.getContractFactory("Bomb", signer2);
    // const bomb = await bomb.deploy();
    // const Usdt = await ethers.getContractFactory("Usdt", signer2);
    // const usdt = await Usdt.deploy();
  
    await bankContract.whitelistToken(
      ethers.utils.formatBytes32String('Matic'),
      matic.address
    );
    await bankContract.whitelistToken(
      ethers.utils.formatBytes32String('bomb'),
      bomb.address
    );
    await bankContract.whitelistToken(
      ethers.utils.formatBytes32String('Usdt'),
      usdt.address
    );
    await bankContract.whitelistToken(
      ethers.utils.formatBytes32String('Eth'),
      '0x09B5DC75789389d1627879bA194874F459364859'
    );
  
    console.log("Bank deployed to:", bankContract.address, "by", signer1.address);
    console.log("Matic deployed to:", matic.address, "by", signer2.address);
    console.log("bomb deployed to:", bomb.address, "by", signer2.address);
    console.log("Tether deployed to:", usdt.address, "by", signer2.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });