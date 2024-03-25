
/*This JavaScript code defines functions for generating integrated addresses for Monero (XMR) wallets. Integrated addresses combine a standard XMR wallet address with a payment ID, allowing for easier tracking of transactions. The `generateIntegratedAddress` function takes a wallet address as input and returns an integrated address along with a randomly generated payment ID. The `toPublicAddr` function is used internally to generate the integrated address based on the provided parameters. Overall, this code facilitates the creation of integrated addresses for XMR transactions. 

modified by eric_maina.
/*

keywords 
*adress58*-- adress of the wallet

*pubspend*-- address receiving funds

*address hex*--- address of my wallet
*pubview* -- address of monitoring incoming transctions 

*publicAddressHex*- the address of your wallet!!

*pubview*-- monitoring incoming transactions 

*publicaddress hash*-- encrypted public address of a transaction 

*publicaddress checksum *-- used for checking address errors when transacting to avoid making or transmitting erraneous addresses.

*/ 
generateIntegratedAddress = function (walletAddress) {
	var addr58 = walletAddress;  //adress length
	var pubSpend2 = {};//address used to receive funds
	var pubView2 = {};//monitoring incoming transactions
	var pubAddrHex = {}; //address of your wallet
	var pubAddrChksum = {}; //checking for errors
	var pubAddrForHash = {}; //hashed address 
	var pubAddrHash = {};//hashed address
	var pubAddrChksum2 = {};
	var xmrAddr = {};//monero address


  // checking the length of the address to see whether it matches the needed length
  //adress length should be either 95/97/51/106
  if (addr58.length !== 95 && addr58.length !== 97 && addr58.length !== 51 && addr58.length !== 106){
    throw "Invalid Address Length!";
  }

  //Get the netbyte

  
  var addrHex = cnBase58.decode(addr58);
  if (addrHex.length === 140){
    var netbyte = addrHex.slice(0,4);
  } else {
    var netbyte = addrHex.slice(0,2);
  }


  //viewkey + pID
  if (netbyte === "13"){
    throw "Invalid Address (netbyte 13): you must use a standard XMR address (netbyte 12)";
  }
  if (netbyte === "11"){
    throw "Invalid Address (netbyte 11): please use a standard XMR address (netbyte 12)";
  } else if (addrHex.length === 140){
    pubView2.value = addrHex.slice(68,132);
  } else {
    pubView2.value = addrHex.slice(66,130);
  }
  if ((netbyte !== "11" && netbyte !== "13") && addrHex.length !== 138 && addrHex.length !== 140){
    throw "Invalid Address Length!";
  }
  var addrHash = cn_fast_hash(addrHex.slice(0,-8));
  pubAddrHex.value = addrHex;
  if (addrHex.length === 140){
    pubSpend2.value = addrHex.slice(4,68);
  } else {
    pubSpend2.value = addrHex.slice(2,66);
  }
  pubAddrChksum.value = addrHex.slice(-8);
  pubAddrForHash.value = addrHex.slice(0,-8);
  pubAddrHash.value = addrHash;
  pubAddrChksum2.value = addrHash.slice(0,8);

  if (addrHex.slice(-8) != addrHash.slice(0,8)) {
    throw "checksum invalid!"
  }

  //code to generate  random payment id
  // *** Generate random payment ID
  var pID = rand_32().slice(0,16);
  xmrAddr.value = toPublicAddr("13", pubSpend2.value, pubView2.value, pID);
  return {
    // "publicViewKey": pubView2.value,
    // "publicSpendKey": pubSpend2.value,
    "integratedAddress": xmrAddr.value,
    "paymentId": pID
  }
};

function toPublicAddr(netbyte, pubsk, pubvk, pid){
  if (pubvk === undefined){pubk = "";}
  if (pid === undefined){pid = "";}
  if ((netbyte !== "13" && pid !== "") || (netbyte === "13" && pid === "")){throw "pid or no pid with wrong address type";}
  if (netbyte === "11"){pubvk = "";}


  //combinig the three addresses into crypto-graphic id to be stored on the network!!

  //cobines the three addresses and then hashes them to form 
  var preAddr = netbyte + pubsk + pubvk + pid;
  var hash = cn_fast_hash(preAddr);
  var addrHex = preAddr + hash.slice(0,8);
  return cnBase58.encode(addrHex);
}
/*This JavaScript code defines functions for generating integrated addresses for Monero (XMR) wallets. Integrated addresses combine a standard XMR wallet address with a payment ID, allowing for easier tracking of transactions. The `generateIntegratedAddress` function takes a wallet address as input and returns an integrated address along with a randomly generated payment ID. The `toPublicAddr` function is used internally to generate the integrated address based on the provided parameters. Overall, this code facilitates the creation of integrated addresses for XMR transactions. */