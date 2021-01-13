pragma solidity >=0.4.25 <0.7.5;

contract Escrow {
    struct Item {
        bytes32 name;
        address seller;
        int256 rate;
    }
    struct Order {
        Item item;
        Status status;
    }

    int256 escrowTotal;
    mapping(bytes32 => Item) inventory;
    mapping(address => int256) balances;
    mapping(address => int256) public escrowBalances;
    mapping(address => Order[]) orders;
    mapping(address => bool) buyers;
    mapping(address => bool) sellers;
    address admn;
    enum Status {
        PAYMENT_PENDING,
        ORDER_PROCESSING,
        PAYMENT_PAID,
        ORDER_COMPLETE,
        ORDER_CANCELLED
    }
    enum Action {DEDUCT, CREDIT}

    // constructor() public {}
 

    constructor() public{ 
        admn = msg.sender;
    }

     modifier onlyBuyer() {
        require(msg.sender == admn || buyers[msg.sender]==true, "Only buyer can call this method");
        _;
    }

    modifier onlySeller() {
        require(msg.sender == admn || sellers[msg.sender]==true, "Only seller can call this method");
        _;
    }

    modifier onlyAdmin() {
        require(msg.sender == admn, "Only Admin can call this method");
        _;
    }

    function addBuyer(address buyer)  onlyAdmin external{
        buyers[buyer] = true;
    }
    
    function addSeller(address seller)  onlyAdmin external{
        sellers[seller] = true;
    }

    function credit(address buyer, int256 amount)  onlyBuyer external{
        balances[buyer] += amount;
    }

    function getBalance(address buyer) public view returns (int256 amount) {
        return balances[buyer];
    }

    function offer(
        address seller,
        bytes32 item,
        int256 amount
    ) onlySeller external {
        Item memory stock = Item(item, seller, amount);
        inventory[item] = stock;
    }

    function order(address buyer, bytes32 item) onlyBuyer external {
        if (escrowBalances[buyer] >= inventory[item].rate) {
            orders[buyer].push(Order(inventory[item], Status.ORDER_PROCESSING));
            //setEscrowBalance(buyer,inventory[item].rate,Action.DEDUCT);
            //escrowBalances[buyer] -= inventory[item].rate;
        } else {
            orders[buyer].push(Order(inventory[item], Status.PAYMENT_PENDING));
        }
    }

    function deposit(address buyer, int256 amount) onlyBuyer external {
        if (balances[buyer] > 0 && getBalance(buyer) >= amount) {
            balances[buyer] -= amount;
            setEscrowBalance(buyer, amount, Action.CREDIT);
            processOrder(buyer, Status.ORDER_PROCESSING);
        } else {
            revert("Insufficient Balance for the Buyer");
        }
    }

    function processOrder(address buyer, Status status) private{
        Order[] memory orderList = orders[buyer];
        for (uint256 i = 0; i < orderList.length; i++) {
            if (status == Status.ORDER_PROCESSING) {
                if (orderList[i].item.rate <= getBalance(buyer)) {
                    orderList[i].status = Status.ORDER_PROCESSING;
                }
            }
        }
    }

    function complete(address buyer, bytes32 item) onlyBuyer external {
        // change order status to Complete
        Order[] memory orderList = orders[buyer];
        for (uint256 i = 0; i < orderList.length; i++) {
            if (orderList[i].item.name == item) {
                if (orderList[i].status != Status.ORDER_COMPLETE) {
                    orderList[i].status = Status.ORDER_COMPLETE;
                    balances[orderList[i].item.seller] += orderList[i]
                        .item
                        .rate;
                    setEscrowBalance(
                        buyer,
                        orderList[i].item.rate,
                        Action.DEDUCT
                    );
                } else {
                    revert("Order Completed Already");
                }
            }
        }
    }

    function complain(address buyer, bytes32 item) onlyBuyer external {
        Order[] memory orderList = orders[buyer];
        for (uint256 i = 0; i < orderList.length; i++) {
            if (orderList[i].item.name == item) {
                if (orderList[i].status == Status.PAYMENT_PENDING) {
                    revert(
                        "Payment not yet done for the item or Insufficient amount to place Order"
                    );
                } else if (orderList[i].status == Status.ORDER_COMPLETE) {
                    revert("Order Completed Already");
                } else {
                    orderList[i].status = Status.ORDER_CANCELLED;
                    balances[buyer] += escrowBalances[buyer];
                    setEscrowBalance(
                        buyer,
                        escrowBalances[buyer],
                        Action.DEDUCT
                    );
                }
            }
        }
    }

    function setEscrowBalance(
        address party,
        int256 amount,
        Action action
    ) private {
        if (action == Action.DEDUCT) {
            if (
                escrowTotal - amount >= 0 && escrowBalances[party] - amount >= 0
            ) {
                escrowBalances[party] -= amount;
                escrowTotal -= amount;
            } else {
                revert("Insufficient Amount in the escrow to deduct");
            }
        } else if (action == Action.CREDIT) {
            escrowBalances[party] += amount;
            escrowTotal += amount;
        }
    }

    function getEscrowBalanceTotal() public returns (int256 amount) {
        return escrowTotal;
    }
}
