const Web3 = require('web3');

const MyContract = require('../build/contracts/Escrow.json');

const init = async () => {
    let web3 = new Web3('ws://localhost:7545');
    const networkId = await web3.eth.net.getId();
    console.log(networkId)
    var accounts=await web3.eth.getAccounts();
    console.log(accounts)
    const myContract = new web3.eth.Contract(
      MyContract.abi,
      MyContract.networks[networkId].address,
      {from:accounts[0],gas:"4712388"}
    );
   
    web3.eth.getBlock("latest").then(results=>{
        //console.log(results)
    })
    var lineReader = require('readline').createInterface({
        input: require('fs').createReadStream('inputs.txt')
      });
     await lineReader.on('line',async function (line) {
        //console.log('Line from file:', line);        
        var instruction=line.split('|').map(item=>item.trim())
      if(instruction[1]=="Credit"){
            var buyer;
            if(instruction[0]=="Buyer 1"){
                buyer=accounts[1]
            }else if(instruction[0]=="Buyer 2"){
                buyer=accounts[2]
            }
            console.log('Executing the credit for buyer'+buyer+"and amount :"+Number(instruction[2])*100);   
            
            await myContract.methods.credit(buyer,Number(instruction[2])*100).send({from:accounts[0],gas: "4712388"})  ;
            
        }else  if(instruction[1]=="Offer"){
            var params=instruction[2].split(',').map(item=>item.trim())
            if(instruction[0]=="Seller 1"){
                seller=accounts[3]
            }else if(instruction[0]=="Seller 2"){
                seller=accounts[4]
            }
            //console.log('Adding inventory for the '+instruction[0]+' for items and prize :'+params[0]+":"+params[1]);   
            
            await myContract.methods.offer(seller,Web3.utils.fromAscii(params[0]),Number(params[1])*100).send({from:accounts[0],gas: "4712388"})  ;
            console.log("Created inventory for the :"+instruction[0]);
           
        }else  if(instruction[1]=="Order"){
            if(instruction[0]=="Buyer 1"){
                buyer=accounts[1]
            }else if(instruction[0]=="Buyer 2"){
                buyer=accounts[2]
            }
            //console.log('Creating an order for '+instruction[0]+' for items :'+instruction[2]);                
            await myContract.methods.order(buyer,Web3.utils.fromAscii(instruction[2])).send({from:accounts[0],gas: "4712388"})  ;
            console.log("Created an order for "+instruction[0]); 
           
        }else if(instruction[1]=="Deposit"){
            if(instruction[0]=="Buyer 1"){
                buyer=accounts[1]
            }else if(instruction[0]=="Buyer 2"){
                buyer=accounts[2]
            }   
            //console.log('Depositing money from  '+instruction[0]+' for amount :'+Number(instruction[2])*100);               
            await myContract.methods.deposit(buyer,Number(instruction[2])*100).send({from:accounts[0],gas: "4712388"})  ;
            console.log("Deposited money from  "+instruction[0]);        
                         
             
        }else  if(instruction[1]=="Complete"){
            if(instruction[0]=="Buyer 1"){
                buyer=accounts[1]
            }else if(instruction[0]=="Buyer 2"){
                buyer=accounts[2]
            }
             
            //console.log('Completing order for  '+instruction[0]+' for amount :'+instruction[2]);               
            await myContract.methods.complete(buyer,Web3.utils.fromAscii(instruction[2])).send({from:accounts[0],gas: "4712388"})  ;
            console.log("Completed order for   "+instruction[0]);     
                       
        }else if(instruction[1]=="Complain"){
            if(instruction[0]=="Buyer 1"){
                buyer=accounts[1]
            }else if(instruction[0]=="Buyer 2"){
                buyer=accounts[2]
            }   
            //console.log('Complain by  '+instruction[0]+' for item :'+ instruction[2] );               
            await myContract.methods.complain(buyer, Web3.utils.fromAscii(instruction[2])).send({from:accounts[0],gas: "4712388"})  ;
            console.log("Complain by  "+instruction[0]+" for item registered "+instruction[2]+" and money refunded." );            
        }
        
                   
    });
    
  }


  
const displayResult = async () => {
    let web3 = new Web3('ws://localhost:7545');
const networkId = await web3.eth.net.getId();

const myContract = new web3.eth.Contract(
  MyContract.abi,
  MyContract.networks[networkId].address
);

var accounts=await web3.eth.getAccounts();

    const result = await myContract.methods.getBalance(accounts[1]).call();            
    console.log("The Balance of Buyer1 is :"+result);   
    const result1 = await myContract.methods.getBalance(accounts[4]).call();            
    console.log("The Balance of seller 2 is :"+result1);  
    const result2 = await myContract.methods.getEscrowBalanceTotal().call();            
    console.log("The Total Amount held in Escrow  is :"+result2); 
    
    
  }
  init().then(async ()=>{
    console.log("Init done")
    
  await displayResult();
  });