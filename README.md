# Contract

The Solidity contract for the given scenarios is under contracts/Escrow.sol file.

***


### PreReq

1. Node.js & npm
2. Ganache on port 7545 & contract installed
3. web3
4. truffle

***

# Deploy the solidity contract

1. Bring up the Ganache GUI/ ganache-cli
2. deploy the contract using the truffle package
    - ```truffle deploy```
Once the contract is successfully deployed 

# API to run the inputs

A simple node.js script connected to local Ganache on port 7545 is written under api/app.js file

#### How to run the node.js script

1. goto the folder api in the CMD
2. run ```npm install```
3. Inputs file is also placed under the same directory ```inputs.txt```
4. To run the cases ```node app.js```

The last 3 lines of the output from the execution of the app.js should display the balances as shown below

```
The Balance of Buyer1 is :1000
The Balance of seller 2 is :500
The Total Amount held in Escrow  is :200
```

***
The Complete output

```
Executing the credit for buyer0x7743B49aFF7d71D868F865CFf0902B2E7b316A51and amount :2000
Executing the credit for buyer0x3e17fCd3A399bC51B958F736A5ACB99E5D71F514and amount :4000
Created inventory for the :Seller 1
Created inventory for the :Seller 2
Created inventory for the :Seller 1
Created inventory for the :Seller 1
Created inventory for the :Seller 2
Created inventory for the :Seller 2
Created an order for Buyer 1
Deposited money from  Buyer 1
Deposited money from  Buyer 2
Created an order for Buyer 2
Completed order for   Buyer 1
Created an order for Buyer 1
Created an order for Buyer 1
Complain by  Buyer 2 for item registered Hoody and money refunded.
Created an order for Buyer 2
Completed order for   Buyer 1
The Balance of Buyer1 is :1000
The Balance of seller 2 is :500
The Total Amount held in Escrow  is :200
```"# Escrow_Management" 
