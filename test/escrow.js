const Escrow = artifacts.require("Escrow");
contract('Escrow',async (accounts) => {
    console.log('Starting');        
    var lineReader = require('readline').createInterface({
        input: require('fs').createReadStream('inputs.txt')
      });
      console.log('Starting2');   
      console.log('Starting3'); 
     await lineReader.on('line',async function (line) {
        //console.log('Line from file:', line);        
        var instruction=line.split('|').map(item=>item.trim())
        if(instruction[1]=="Credit"){
            var buyer;
            if(instruction[0]=="Buyer 1"){
                buyer=accounts[0]
            }else if(instruction[0]=="Buyer 2"){
                buyer=accounts[1]
            }
            console.log('Executing the credit for buyer'+buyer+"and amount :"+Number(instruction[2])*100);   
            const escrowInstance = await Escrow.deployed();
            await escrowInstance.credit(buyer,Number(instruction[2])*100);
            const result = await escrowInstance.getBalance.call(buyer1);
            assert.equal(result, 2000, "The balance of the buyer1 isnt 20");
            console.log("The Balance of Buyer is");
        }
      });
      console.log('Starting4');   
const buyer1 = accounts[0];
const buyer2 = accounts[1];
const seller1 = accounts[3];
const seller2 = accounts[4];

    it('should credit amount to the buyer1', async () => {
        const escrowInstance = await Escrow.deployed();       
        const result = await escrowInstance.getBalance.call(buyer1);
        assert.equal(result, 2000, "The balance of the buyer1 isnt 20");
      });
  /* it('should credit amount to the buyer2', async () => {
        const escrowInstance = await Escrow.deployed();
        const result = (await escrowInstance.getBalance.call(buyer2)).toNumber();;
        assert.equal(result, 4000, "The balance of the buyer2 isnt 40");
    });
/*
   it('should add items to the stock', async () => {
        const escrowInstance = await Escrow.deployed();
        await escrowInstance.offer(seller1,web3.utils.fromAscii("Coffee"),300);
        const result = (await escrowInstance.getOfferPrice.call(web3.utils.fromAscii("Coffee"))).toNumber();;
        assert.equal(result.valueOf(), 300, "The price of coffee isnt stored as 3");
    });
    it('should add items to the stock', async () => {
        const escrowInstance = await Escrow.deployed();
        await escrowInstance.offer(seller2,web3.utils.fromAscii("T-Shirt"),500);
        const result = (await escrowInstance.getOfferPrice.call(web3.utils.fromAscii("T-Shirt"))).toNumber();;
        assert.equal(result.valueOf(), 500, "The price of T-Shirt isnt stored as 3");
    });
    it('should add items to the stock', async () => {
        const escrowInstance = await Escrow.deployed();
        await escrowInstance.offer(seller2,web3.utils.fromAscii("T-Shirt"),500);
        const result = (await escrowInstance.getOfferPrice.call(web3.utils.fromAscii("T-Shirt"))).toNumber();;
        assert.equal(result.valueOf(), 500, "The price of T-Shirt isnt stored as 3");
    });
    it('should Order a T-shirt', async () => {
        const escrowInstance = await Escrow.deployed();
        await escrowInstance.order(buyer1,web3.utils.fromAscii("T-Shirt"));
        //const result = (await escrowInstance.getOfferPrice.call(web3.utils.fromAscii("T-Shirt"))).toNumber();;
        assert.equal(true, true, "Couldnt place order for T-shirt");
    });
    /*it('should add items to the stock', async () => {
        const escrowInstance = await Escrow.deployed();
        await escrowInstance.offer(seller1,"Tea",250);
        const result = (await escrowInstance.getOfferPrice.call("Tea")).toNumber();;
        assert.equal(result.valueOf(), 250, "The price of Tea isnt stored as 3");
    });
    it('should add items to the stock', async () => {
        const escrowInstance = await Escrow.deployed();
        await escrowInstance.offer(seller1,"Cake",350);
        const result = (await escrowInstance.getOfferPrice.call("Cake")).toNumber();;
        assert.equal(result.valueOf(), 350, "The price of Cake isnt stored as 3");
    });*/
 /* it('should call a function that depends on a linked library', async () => {
    const metaCoinInstance = await MetaCoin.deployed();
    const metaCoinBalance = (await metaCoinInstance.getBalance.call(accounts[0])).toNumber();
    const metaCoinEthBalance = (await metaCoinInstance.getBalanceInEth.call(accounts[0])).toNumber();

    assert.equal(metaCoinEthBalance, 2 * metaCoinBalance, 'Library function returned unexpected function, linkage may be broken');
  });
  it('should send coin correctly', async () => {
    const metaCoinInstance = await MetaCoin.deployed();

    // Setup 2 accounts.
    const accountOne = accounts[0];
    const accountTwo = accounts[1];

    // Get initial balances of first and second account.
    const accountOneStartingBalance = (await metaCoinInstance.getBalance.call(accountOne)).toNumber();
    const accountTwoStartingBalance = (await metaCoinInstance.getBalance.call(accountTwo)).toNumber();

    // Make transaction from first account to second.
    const amount = 10;
    await metaCoinInstance.sendCoin(accountTwo, amount, { from: accountOne });

    // Get balances of first and second account after the transactions.
    const accountOneEndingBalance = (await metaCoinInstance.getBalance.call(accountOne)).toNumber();
    const accountTwoEndingBalance = (await metaCoinInstance.getBalance.call(accountTwo)).toNumber();


    assert.equal(accountOneEndingBalance, accountOneStartingBalance - amount, "Amount wasn't correctly taken from the sender");
    assert.equal(accountTwoEndingBalance, accountTwoStartingBalance + amount, "Amount wasn't correctly sent to the receiver");
  });*/
});
