


// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts v4.4.1 (utils/Context.sol)
pragma solidity >=0.7.0 <0.9.0;
 
 
 
 
 
contract vlibrary{
    uint bal;
   
    uint number_of_accounts = 0;
   
    struct KYC{
            uint customer_ID;
            string full_name;
            string profession;
            string Date_of_Birth;  
        // 2 mapping    
        }
 
    mapping(address => uint256) public account_balances;
 
    mapping(address => KYC) public account_info;    
 
    modifier onlyRegistered(address sAddress){
        require (account_info[sAddress].customer_ID > 0, "Not a registered account");
        _;
       
 
    }
   
   modifier CheckBalance(address sAddress, uint amt){
       require(account_balances[sAddress] > amt, "Not have enough money");
        _;
   }
 
 
    function registerAccount( string memory _full_name,string memory _profession,string memory _Date_of_Birth) public
     {  
        KYC memory newcustmer;
 
       
        newcustmer.full_name = _full_name;
        newcustmer.profession = _profession;
        newcustmer.Date_of_Birth = _Date_of_Birth;
        number_of_accounts +=1;
        newcustmer.customer_ID = number_of_accounts;
        account_info[msg.sender] = newcustmer;
 
    }
    //function addCustomer(string memory userName, string memory dataHash) public payable returns(uint)
 
    function getAccountInfo(address _addr) public view onlyRegistered(_addr) returns (KYC memory)
    {
        return account_info[_addr];
    }
 
    function getBalance(address _addr) public view returns (uint) {
        // Mapping always returns a value.
        // If the value was never set, it will return the default value.
        return account_balances[_addr];
    }
 
    receive()  external payable onlyRegistered(msg.sender){
                 
        // Update the value at this address
        //account_balances[_addr] = msg.sender +  msg.value;
        account_balances[msg.sender] = account_balances[msg.sender]+  msg.value;
       
    }
 
    function withdraw(uint _amt) public onlyRegistered(msg.sender) CheckBalance(msg.sender, _amt){
        // Reset the value to the default value.
        //require(account_balances[msg.sender] > _amt);
        account_balances[msg.sender]= account_balances[msg.sender] - _amt;
        payable(msg.sender).transfer(_amt);
 
    }
        //msg.sender, token_count * (10**18)
    function transfer(address _recipient, uint _amt) public onlyRegistered(_recipient) CheckBalance(msg.sender, _amt){
        //require(account_balances[msg.sender] > _amt); // You must have some tokens.
        account_balances[msg.sender] -= _amt;
        account_balances[_recipient] += _amt;    
    }
 
    function numberofusers() public view returns (uint) {
        return number_of_accounts;
    }
 
}
 

