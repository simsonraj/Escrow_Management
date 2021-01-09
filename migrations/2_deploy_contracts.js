//const ConvertLib = artifacts.require("ConvertLib");
//const MetaCoin = artifacts.require("MetaCoin");
const Escrow = artifacts.require("Escrow");
module.exports = function(deployer) {
  //deployer.deploy(ConvertLib);
  //deployer.link(ConvertLib, MetaCoin);
  //deployer.link(ConvertLib, Escrow);
  //deployer.deploy(MetaCoin);
  deployer.deploy(Escrow);
};
