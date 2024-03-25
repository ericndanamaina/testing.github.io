//** implementation of big numbers

// implementation of big intergers 
// used to represent arbitrary big numbers 

/*
--coinUnitplaces --the number of decimal places for the cryptocurrency 
--txminconfirms -- represents the minimum number of confirmations required  for a transaction to be considered finalized!!

--coinsymbol-- symbol used to represent the currency!!
-- open alias prefix : prefix used for crypto URIs
--intergrated address prefix -- prefix used for intergrated addresses

--dust threshold-- specifies the minimum amount crypto that can be sent in a transcation without being considered dust 
--defaultMixin: Default mixin value used for transactions.

--idleTimeout: Timeout duration for idle state.

--idleWarningDuration: Duration for displaying an idle warning.

--maxBlockNumber: Maximum block number.

--avgBlockTime: Average block time.

--debugMode: Boolean flag indicating whether debug mode is enabled or not.



*/

var config = {
    
    coinUnitPlaces: 12,//decimal places for crypto
    txMinConfirms: 10,//minimun transacton confirmations
    coinSymbol: 'XMR',
    openAliasPrefix: "xmr",
    coinName: 'Monero',
    coinUriPrefix: 'monero:',
    addressPrefix: 18,
    integratedAddressPrefix: 19,
    feePerKB: new JSBigInt('10000000000'),
    dustThreshold: new JSBigInt('1000000'),//minimum crypto required to perform a transaction.
    txChargeRatio: 0.5,
    defaultMixin: 3,
   txChargeAddress: '49VNLa9K5ecJo13bwKYt5HCmA8GkgLwpyFjgGKG6qmp8dqoXww8TKPU2PJaLfAAtoZGgtHfJ1nYY8G2YaewycB4f72yFT9u',
    idleTimeout: 10,
    idleWarningDuration: 20,
    maxBlockNumber: 500000000,
    avgBlockTime: 60,
    debugMode: false
};
