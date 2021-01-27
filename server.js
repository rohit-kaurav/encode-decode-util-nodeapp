const express = require('express'),
  app = express(),
  env = require('dotenv').config(),
  PORT = process.env.PORT || 8888,
  helmet = require('helmet'),
  bodyParser = require('body-parser'),
  xmlParserAndEncrypter = require('./xmlConvertorAndEncrypter'),
  rsaEncrypter = require('./rsaEncryption'),
  aesEncrypter = require('./aesEncryption');

if(process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'simulation') {
  app.use(cors());
}
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json({ limit: '50mb' }));

//express middleware common response header
app.use((req, res, next) => {
  res.set('X-Frame-Options', 'DENY');
  next();
});

app.use(helmet());
app.disable('x-powered-by');

app.get('/', (req, res) => {
  res.send('Congrats! The test get request worked');
});

app.post('/convertToXMLAndEncrypt', (req, res) => {
  if (!req.body) {
    return res.json({
      status: 'FAIL',
      code: '111',
      message: 'Bad Request'
    });
  } else {
    let encryptedData = xmlParserAndEncrypter.getEncryptedString(req);
    return res.json(encryptedData);
  }
});

app.post('/decryptAndConvertToJSON', (req, res) => {
  if (!req.body) {
    return res.json({
      status: 'FAIL',
      code: '111',
      message: 'Bad Request'
    });
  } else {
    xmlParserAndEncrypter.getDecryptedJSON(req, result => {
      return res.json(result)
    });
  }
});

app.post('/encryptWithRSA', (req, res) => {
  if (!req.body) {
    return res.json({
      status: 'FAIL',
      code: '111',
      message: 'Bad Request'
    });
  } else {
    rsaEncrypter.getEncryptedData(req, result => {
      return res.json(result)
    });
  }
});

app.post('/decryptWithRSA', (req, res) => {
  if (!req.body) {
    return res.json({
      status: 'FAIL',
      code: '111',
      message: 'Bad Request'
    });
  } else {
    rsaEncrypter.getDecryptedDataWithPrivateKey(req, result => {
      return res.json(result)
    });
  }
});

app.post('/encryptWithAES', (req, res) => {
  if (!req.body) {
    return res.json({
      status: 'FAIL',
      code: '111',
      message: 'Bad Request'
    });
  } else {
    aesEncrypter.getEncryptedData(req, result => {
      return res.json(result);
    });
  }
});

app.post('/decryptWithAES', (req, res) => {
  if (!req.body) {
    return res.json({
      status: 'FAIL',
      code: '111',
      message: 'Bad Request'
    });
  } else {
    aesEncrypter.getDecryptedData(req, result => {
      return res.json(result);
    });
  }
});
app.get('/fino/getBillersList', (req, res) => {
  let billerString = "[{\"PartnerId\":44,\"ClientID\":7,\"ClientName\":\"OLA CAB\",\"IsVerify\":1,\"CoolOff\":0,\"PerCustomerMinTxnLimit\":100,\"PerCustomerMaxTxnLimit\":49999,\"TxnMinLimit\":100,\"TxnMaxLimit\":49999,\"PartPayment\":0,\"OverPayment\":0,\"PanRequired\":0,\"PanThreshold\":0,\"Category\":\"\",\"APIThreshold\":0,\"MultiVerify\":0,\"SpclVerifyFields\":\"\",\"ReturnMulti\":0,\"OTPParam1\":\"\",\"OTPParam2\":\"\",\"OTPParam3\":\"\",\"OTPParam4\":\"\",\"OTPParam5\":\"\",\"OTPParam6\":\"\",\"OTPParam7\":\"\",\"OTPParam8\":\"\",\"OTPAuthRequired\":false,\"CutOffTime\":\"\"},{\"PartnerId\":44,\"ClientID\":30,\"ClientName\":\"Shriram Transport\",\"IsVerify\":1,\"CoolOff\":0,\"PerCustomerMinTxnLimit\":1,\"PerCustomerMaxTxnLimit\":5000,\"TxnMinLimit\":1,\"TxnMaxLimit\":5000,\"PartPayment\":0,\"OverPayment\":0,\"PanRequired\":0,\"PanThreshold\":0,\"Category\":\"External\",\"APIThreshold\":0,\"MultiVerify\":0,\"SpclVerifyFields\":\"\",\"ReturnMulti\":0,\"OTPParam1\":\"\",\"OTPParam2\":\"\",\"OTPParam3\":\"\",\"OTPParam4\":\"\",\"OTPParam5\":\"\",\"OTPParam6\":\"\",\"OTPParam7\":\"\",\"OTPParam8\":\"Field6\",\"OTPAuthRequired\":false,\"CutOffTime\":\"\"},{\"PartnerId\":44,\"ClientID\":39,\"ClientName\":\"Mahindra Rural Housing Finance Limited\",\"IsVerify\":1,\"CoolOff\":0,\"PerCustomerMinTxnLimit\":100,\"PerCustomerMaxTxnLimit\":49999,\"TxnMinLimit\":100,\"TxnMaxLimit\":49999,\"PartPayment\":1,\"OverPayment\":1,\"PanRequired\":0,\"PanThreshold\":0,\"Category\":\"External\",\"APIThreshold\":0,\"MultiVerify\":1,\"SpclVerifyFields\":\"Field1|Field2\",\"ReturnMulti\":0,\"OTPParam1\":\"\",\"OTPParam2\":\"\",\"OTPParam3\":\"\",\"OTPParam4\":\"\",\"OTPParam5\":\"\",\"OTPParam6\":\"\",\"OTPParam7\":\"\",\"OTPParam8\":\"Field6\",\"OTPAuthRequired\":false,\"CutOffTime\":\"\"},{\"PartnerId\":44,\"ClientID\":41,\"ClientName\":\"Mahindra and Mahindra Financial Services Limited\",\"IsVerify\":1,\"CoolOff\":0,\"PerCustomerMinTxnLimit\":100,\"PerCustomerMaxTxnLimit\":50000,\"TxnMinLimit\":100,\"TxnMaxLimit\":50000,\"PartPayment\":1,\"OverPayment\":1,\"PanRequired\":0,\"PanThreshold\":0,\"Category\":\"External\",\"APIThreshold\":0,\"MultiVerify\":1,\"SpclVerifyFields\":\"Field1|Field2\",\"ReturnMulti\":0,\"OTPParam1\":\"\",\"OTPParam2\":\"\",\"OTPParam3\":\"\",\"OTPParam4\":\"\",\"OTPParam5\":\"\",\"OTPParam6\":\"\",\"OTPParam7\":\"\",\"OTPParam8\":\"Field6\",\"OTPAuthRequired\":false,\"CutOffTime\":\"\"},{\"PartnerId\":44,\"ClientID\":42,\"ClientName\":\"Hero FinCorp Customer\",\"IsVerify\":1,\"CoolOff\":0,\"PerCustomerMinTxnLimit\":1,\"PerCustomerMaxTxnLimit\":49999,\"TxnMinLimit\":1,\"TxnMaxLimit\":49999,\"PartPayment\":0,\"OverPayment\":0,\"PanRequired\":0,\"PanThreshold\":0,\"Category\":\"External\",\"APIThreshold\":0,\"MultiVerify\":1,\"SpclVerifyFields\":\"Field1|Field2\",\"ReturnMulti\":0,\"OTPParam1\":\"\",\"OTPParam2\":\"\",\"OTPParam3\":\"\",\"OTPParam4\":\"\",\"OTPParam5\":\"\",\"OTPParam6\":\"\",\"OTPParam7\":\"\",\"OTPParam8\":\"Field6\",\"OTPAuthRequired\":false,\"CutOffTime\":\"02:00|19:55\"},{\"PartnerId\":44,\"ClientID\":60,\"ClientName\":\"Reliance Retail\",\"IsVerify\":1,\"CoolOff\":2,\"PerCustomerMinTxnLimit\":100,\"PerCustomerMaxTxnLimit\":49999,\"TxnMinLimit\":100,\"TxnMaxLimit\":49999,\"PartPayment\":1,\"OverPayment\":1,\"PanRequired\":0,\"PanThreshold\":100000,\"Category\":\"Agent\",\"APIThreshold\":2,\"MultiVerify\":0,\"SpclVerifyFields\":\"\",\"ReturnMulti\":0,\"OTPParam1\":\"Field1\",\"OTPParam2\":\"Field25\",\"OTPParam3\":\"Field23\",\"OTPParam4\":\"Field6\",\"OTPParam5\":\"\",\"OTPParam6\":\"\",\"OTPParam7\":\"\",\"OTPParam8\":\"Field6\",\"OTPAuthRequired\":false,\"CutOffTime\":\"\"},{\"PartnerId\":44,\"ClientID\":62,\"ClientName\":\"Satin\",\"IsVerify\":1,\"CoolOff\":5,\"PerCustomerMinTxnLimit\":100,\"PerCustomerMaxTxnLimit\":49999,\"TxnMinLimit\":100,\"TxnMaxLimit\":49999,\"PartPayment\":1,\"OverPayment\":1,\"PanRequired\":0,\"PanThreshold\":49999,\"Category\":\"Agent\",\"APIThreshold\":2,\"MultiVerify\":0,\"SpclVerifyFields\":\"\",\"ReturnMulti\":0,\"OTPParam1\":\"Field1\",\"OTPParam2\":\"Field5\",\"OTPParam3\":\"Field23\",\"OTPParam4\":\"\",\"OTPParam5\":\"\",\"OTPParam6\":\"\",\"OTPParam7\":\"\",\"OTPParam8\":\"Field6\",\"OTPAuthRequired\":true,\"CutOffTime\":\"\"},{\"PartnerId\":44,\"ClientID\":63,\"ClientName\":\"Asirvad Microfinance\",\"IsVerify\":1,\"CoolOff\":5,\"PerCustomerMinTxnLimit\":100,\"PerCustomerMaxTxnLimit\":49999,\"TxnMinLimit\":100,\"TxnMaxLimit\":49999,\"PartPayment\":1,\"OverPayment\":1,\"PanRequired\":0,\"PanThreshold\":49999,\"Category\":\"Agent\",\"APIThreshold\":2,\"MultiVerify\":0,\"SpclVerifyFields\":\"\",\"ReturnMulti\":0,\"OTPParam1\":\"Field1\",\"OTPParam2\":\"Field11\",\"OTPParam3\":\"Field23\",\"OTPParam4\":\"\",\"OTPParam5\":\"\",\"OTPParam6\":\"\",\"OTPParam7\":\"\",\"OTPParam8\":\"Field6\",\"OTPAuthRequired\":false,\"CutOffTime\":\"\"},{\"PartnerId\":44,\"ClientID\":64,\"ClientName\":\"Svatantra MFI\",\"IsVerify\":1,\"CoolOff\":5,\"PerCustomerMinTxnLimit\":100,\"PerCustomerMaxTxnLimit\":49999,\"TxnMinLimit\":100,\"TxnMaxLimit\":49999,\"PartPayment\":1,\"OverPayment\":1,\"PanRequired\":0,\"PanThreshold\":49999,\"Category\":\"Agent\",\"APIThreshold\":2,\"MultiVerify\":0,\"SpclVerifyFields\":\"\",\"ReturnMulti\":0,\"OTPParam1\":\"Field1\",\"OTPParam2\":\"Field11\",\"OTPParam3\":\"Field23\",\"OTPParam4\":\"\",\"OTPParam5\":\"\",\"OTPParam6\":\"\",\"OTPParam7\":\"\",\"OTPParam8\":\"Field6\",\"OTPAuthRequired\":false,\"CutOffTime\":\"\"},{\"PartnerId\":44,\"ClientID\":65,\"ClientName\":\"Lok Suvidha\",\"IsVerify\":1,\"CoolOff\":5,\"PerCustomerMinTxnLimit\":100,\"PerCustomerMaxTxnLimit\":49999,\"TxnMinLimit\":100,\"TxnMaxLimit\":49999,\"PartPayment\":1,\"OverPayment\":1,\"PanRequired\":0,\"PanThreshold\":49999,\"Category\":\"Agent\",\"APIThreshold\":2,\"MultiVerify\":0,\"SpclVerifyFields\":\"\",\"ReturnMulti\":0,\"OTPParam1\":\"\",\"OTPParam2\":\"\",\"OTPParam3\":\"\",\"OTPParam4\":\"\",\"OTPParam5\":\"\",\"OTPParam6\":\"\",\"OTPParam7\":\"\",\"OTPParam8\":\"Field6\",\"OTPAuthRequired\":false,\"CutOffTime\":\"\"},{\"PartnerId\":44,\"ClientID\":66,\"ClientName\":\"Svatantra MFI Customer\",\"IsVerify\":1,\"CoolOff\":5,\"PerCustomerMinTxnLimit\":100,\"PerCustomerMaxTxnLimit\":49999,\"TxnMinLimit\":100,\"TxnMaxLimit\":49999,\"PartPayment\":1,\"OverPayment\":1,\"PanRequired\":0,\"PanThreshold\":49999,\"Category\":\"Agent\",\"APIThreshold\":2,\"MultiVerify\":0,\"SpclVerifyFields\":\"\",\"ReturnMulti\":0,\"OTPParam1\":\"Field1\",\"OTPParam2\":\"\",\"OTPParam3\":\"Field23\",\"OTPParam4\":\"\",\"OTPParam5\":\"\",\"OTPParam6\":\"\",\"OTPParam7\":\"\",\"OTPParam8\":\"Field6\",\"OTPAuthRequired\":false,\"CutOffTime\":\"\"},{\"PartnerId\":44,\"ClientID\":70,\"ClientName\":\"Fusion Microfinance\",\"IsVerify\":1,\"CoolOff\":5,\"PerCustomerMinTxnLimit\":100,\"PerCustomerMaxTxnLimit\":49999,\"TxnMinLimit\":100,\"TxnMaxLimit\":49999,\"PartPayment\":1,\"OverPayment\":1,\"PanRequired\":0,\"PanThreshold\":49999,\"Category\":\"Agent\",\"APIThreshold\":2,\"MultiVerify\":0,\"SpclVerifyFields\":\"\",\"ReturnMulti\":0,\"OTPParam1\":\"\",\"OTPParam2\":\"\",\"OTPParam3\":\"\",\"OTPParam4\":\"\",\"OTPParam5\":\"\",\"OTPParam6\":\"\",\"OTPParam7\":\"\",\"OTPParam8\":\"Field6\",\"OTPAuthRequired\":false,\"CutOffTime\":\"\"},{\"PartnerId\":44,\"ClientID\":71,\"ClientName\":\"Samasta\",\"IsVerify\":1,\"CoolOff\":5,\"PerCustomerMinTxnLimit\":100,\"PerCustomerMaxTxnLimit\":49999,\"TxnMinLimit\":100,\"TxnMaxLimit\":49999,\"PartPayment\":1,\"OverPayment\":1,\"PanRequired\":0,\"PanThreshold\":49999,\"Category\":\"Agent\",\"APIThreshold\":2,\"MultiVerify\":0,\"SpclVerifyFields\":\"\",\"ReturnMulti\":0,\"OTPParam1\":\"\",\"OTPParam2\":\"\",\"OTPParam3\":\"\",\"OTPParam4\":\"\",\"OTPParam5\":\"\",\"OTPParam6\":\"\",\"OTPParam7\":\"\",\"OTPParam8\":\"Field6\",\"OTPAuthRequired\":false,\"CutOffTime\":\"\"},{\"PartnerId\":44,\"ClientID\":72,\"ClientName\":\"Agora MFI Agent\",\"IsVerify\":1,\"CoolOff\":5,\"PerCustomerMinTxnLimit\":100,\"PerCustomerMaxTxnLimit\":49999,\"TxnMinLimit\":100,\"TxnMaxLimit\":49999,\"PartPayment\":1,\"OverPayment\":1,\"PanRequired\":0,\"PanThreshold\":49999,\"Category\":\"Agent\",\"APIThreshold\":2,\"MultiVerify\":0,\"SpclVerifyFields\":\"\",\"ReturnMulti\":0,\"OTPParam1\":\"\",\"OTPParam2\":\"\",\"OTPParam3\":\"\",\"OTPParam4\":\"\",\"OTPParam5\":\"\",\"OTPParam6\":\"\",\"OTPParam7\":\"\",\"OTPParam8\":\"Field6\",\"OTPAuthRequired\":false,\"CutOffTime\":\"\"},{\"PartnerId\":44,\"ClientID\":73,\"ClientName\":\"Agora MFI Customer\",\"IsVerify\":1,\"CoolOff\":5,\"PerCustomerMinTxnLimit\":100,\"PerCustomerMaxTxnLimit\":49999,\"TxnMinLimit\":100,\"TxnMaxLimit\":49999,\"PartPayment\":0,\"OverPayment\":1,\"PanRequired\":0,\"PanThreshold\":49999,\"Category\":\"MFI\",\"APIThreshold\":2,\"MultiVerify\":0,\"SpclVerifyFields\":\"\",\"ReturnMulti\":0,\"OTPParam1\":\"\",\"OTPParam2\":\"\",\"OTPParam3\":\"\",\"OTPParam4\":\"\",\"OTPParam5\":\"\",\"OTPParam6\":\"\",\"OTPParam7\":\"\",\"OTPParam8\":\"Field6\",\"OTPAuthRequired\":false,\"CutOffTime\":\"\"},{\"PartnerId\":44,\"ClientID\":74,\"ClientName\":\"FFPL Deposit\",\"IsVerify\":1,\"CoolOff\":5,\"PerCustomerMinTxnLimit\":100,\"PerCustomerMaxTxnLimit\":49999,\"TxnMinLimit\":100,\"TxnMaxLimit\":49999,\"PartPayment\":1,\"OverPayment\":1,\"PanRequired\":0,\"PanThreshold\":49999,\"Category\":\"Agent\",\"APIThreshold\":2,\"MultiVerify\":0,\"SpclVerifyFields\":\"\",\"ReturnMulti\":0,\"OTPParam1\":\"\",\"OTPParam2\":\"\",\"OTPParam3\":\"\",\"OTPParam4\":\"\",\"OTPParam5\":\"\",\"OTPParam6\":\"\",\"OTPParam7\":\"\",\"OTPParam8\":\"Field6\",\"OTPAuthRequired\":false,\"CutOffTime\":\"\"},{\"PartnerId\":44,\"ClientID\":75,\"ClientName\":\"Adani Finance Customer\",\"IsVerify\":1,\"CoolOff\":5,\"PerCustomerMinTxnLimit\":1,\"PerCustomerMaxTxnLimit\":49999,\"TxnMinLimit\":1,\"TxnMaxLimit\":49999,\"PartPayment\":1,\"OverPayment\":1,\"PanRequired\":0,\"PanThreshold\":49999,\"Category\":\"Agent\",\"APIThreshold\":2,\"MultiVerify\":0,\"SpclVerifyFields\":\"\",\"ReturnMulti\":0,\"OTPParam1\":\"\",\"OTPParam2\":\"\",\"OTPParam3\":\"\",\"OTPParam4\":\"\",\"OTPParam5\":\"\",\"OTPParam6\":\"\",\"OTPParam7\":\"\",\"OTPParam8\":\"Field6\",\"OTPAuthRequired\":false,\"CutOffTime\":\"\"},{\"PartnerId\":44,\"ClientID\":76,\"ClientName\":\"Lok Suvidha Customer\",\"IsVerify\":1,\"CoolOff\":5,\"PerCustomerMinTxnLimit\":100,\"PerCustomerMaxTxnLimit\":49999,\"TxnMinLimit\":100,\"TxnMaxLimit\":49999,\"PartPayment\":1,\"OverPayment\":1,\"PanRequired\":0,\"PanThreshold\":49999,\"Category\":\"Agent\",\"APIThreshold\":2,\"MultiVerify\":0,\"SpclVerifyFields\":\"\",\"ReturnMulti\":0,\"OTPParam1\":\"\",\"OTPParam2\":\"\",\"OTPParam3\":\"\",\"OTPParam4\":\"\",\"OTPParam5\":\"\",\"OTPParam6\":\"\",\"OTPParam7\":\"\",\"OTPParam8\":\"Field6\",\"OTPAuthRequired\":false,\"CutOffTime\":\"\"},{\"PartnerId\":44,\"ClientID\":79,\"ClientName\":\"LnT - Microfinance\",\"IsVerify\":1,\"CoolOff\":5,\"PerCustomerMinTxnLimit\":100,\"PerCustomerMaxTxnLimit\":49999,\"TxnMinLimit\":100,\"TxnMaxLimit\":49999,\"PartPayment\":1,\"OverPayment\":1,\"PanRequired\":0,\"PanThreshold\":49999,\"Category\":\"Agent\",\"APIThreshold\":2,\"MultiVerify\":0,\"SpclVerifyFields\":\"\",\"ReturnMulti\":0,\"OTPParam1\":\"Field9\",\"OTPParam2\":\"Field1\",\"OTPParam3\":\"Field23\",\"OTPParam4\":\"Field6\",\"OTPParam5\":\"\",\"OTPParam6\":\"\",\"OTPParam7\":\"\",\"OTPParam8\":\"Field6\",\"OTPAuthRequired\":false,\"CutOffTime\":\"\"},{\"PartnerId\":44,\"ClientID\":80,\"ClientName\":\"Mitrata\",\"IsVerify\":1,\"CoolOff\":5,\"PerCustomerMinTxnLimit\":100,\"PerCustomerMaxTxnLimit\":49999,\"TxnMinLimit\":100,\"TxnMaxLimit\":49999,\"PartPayment\":1,\"OverPayment\":1,\"PanRequired\":0,\"PanThreshold\":49999,\"Category\":\"Agent\",\"APIThreshold\":2,\"MultiVerify\":0,\"SpclVerifyFields\":\"\",\"ReturnMulti\":0,\"OTPParam1\":\"Field11\",\"OTPParam2\":\"Field1\",\"OTPParam3\":\"Field23\",\"OTPParam4\":\"Field6\",\"OTPParam5\":\"\",\"OTPParam6\":\"\",\"OTPParam7\":\"\",\"OTPParam8\":\"Field6\",\"OTPAuthRequired\":false,\"CutOffTime\":\"\"},{\"PartnerId\":44,\"ClientID\":82,\"ClientName\":\"Bajaj Finserv Agent\",\"IsVerify\":1,\"CoolOff\":5,\"PerCustomerMinTxnLimit\":1,\"PerCustomerMaxTxnLimit\":49999,\"TxnMinLimit\":1,\"TxnMaxLimit\":49999,\"PartPayment\":1,\"OverPayment\":1,\"PanRequired\":0,\"PanThreshold\":0,\"Category\":\"External\",\"APIThreshold\":0,\"MultiVerify\":0,\"SpclVerifyFields\":\"\",\"ReturnMulti\":0,\"OTPParam1\":\"Field11\",\"OTPParam2\":\"Field1\",\"OTPParam3\":\"Field23\",\"OTPParam4\":\"\",\"OTPParam5\":\"\",\"OTPParam6\":\"\",\"OTPParam7\":\"\",\"OTPParam8\":\"Field6\",\"OTPAuthRequired\":true,\"CutOffTime\":\"\"},{\"PartnerId\":44,\"ClientID\":83,\"ClientName\":\"Bajaj Finserv Customer\",\"IsVerify\":1,\"CoolOff\":5,\"PerCustomerMinTxnLimit\":1,\"PerCustomerMaxTxnLimit\":49999,\"TxnMinLimit\":1,\"TxnMaxLimit\":49999,\"PartPayment\":1,\"OverPayment\":1,\"PanRequired\":0,\"PanThreshold\":0,\"Category\":\"External\",\"APIThreshold\":0,\"MultiVerify\":0,\"SpclVerifyFields\":\"\",\"ReturnMulti\":0,\"OTPParam1\":\"Field11\",\"OTPParam2\":\"Field1\",\"OTPParam3\":\"Field23\",\"OTPParam4\":\"\",\"OTPParam5\":\"\",\"OTPParam6\":\"\",\"OTPParam7\":\"\",\"OTPParam8\":\"Field6\",\"OTPAuthRequired\":true,\"CutOffTime\":\"\"},{\"PartnerId\":44,\"ClientID\":84,\"ClientName\":\"Swadhaar\",\"IsVerify\":1,\"CoolOff\":5,\"PerCustomerMinTxnLimit\":100,\"PerCustomerMaxTxnLimit\":49999,\"TxnMinLimit\":100,\"TxnMaxLimit\":49999,\"PartPayment\":1,\"OverPayment\":1,\"PanRequired\":0,\"PanThreshold\":49999,\"Category\":\"Agent\",\"APIThreshold\":2,\"MultiVerify\":0,\"SpclVerifyFields\":\"\",\"ReturnMulti\":0,\"OTPParam1\":\"Field11\",\"OTPParam2\":\"Field1\",\"OTPParam3\":\"Field23\",\"OTPParam4\":\"\",\"OTPParam5\":\"\",\"OTPParam6\":\"\",\"OTPParam7\":\"\",\"OTPParam8\":\"Field6\",\"OTPAuthRequired\":false,\"CutOffTime\":\"\"},{\"PartnerId\":44,\"ClientID\":91,\"ClientName\":\"Muthoot MiroFin Ltd\",\"IsVerify\":1,\"CoolOff\":5,\"PerCustomerMinTxnLimit\":100,\"PerCustomerMaxTxnLimit\":49999,\"TxnMinLimit\":100,\"TxnMaxLimit\":49999,\"PartPayment\":1,\"OverPayment\":1,\"PanRequired\":0,\"PanThreshold\":49999,\"Category\":\"Agent\",\"APIThreshold\":2,\"MultiVerify\":0,\"SpclVerifyFields\":\"\",\"ReturnMulti\":0,\"OTPParam1\":\"Field11\",\"OTPParam2\":\"Field1\",\"OTPParam3\":\"Field23\",\"OTPParam4\":\"\",\"OTPParam5\":\"Field18\",\"OTPParam6\":\"\",\"OTPParam7\":\"\",\"OTPParam8\":\"Field6\",\"OTPAuthRequired\":false,\"CutOffTime\":\"\"},{\"PartnerId\":44,\"ClientID\":94,\"ClientName\":\"Annapurna\",\"IsVerify\":1,\"CoolOff\":5,\"PerCustomerMinTxnLimit\":100,\"PerCustomerMaxTxnLimit\":49999,\"TxnMinLimit\":100,\"TxnMaxLimit\":49999,\"PartPayment\":1,\"OverPayment\":1,\"PanRequired\":0,\"PanThreshold\":49999,\"Category\":\"Agent\",\"APIThreshold\":2,\"MultiVerify\":0,\"SpclVerifyFields\":\"\",\"ReturnMulti\":0,\"OTPParam1\":\"NomineeName=UserName\",\"OTPParam2\":\"BRANCHCODE=UniqueID\",\"OTPParam3\":\"Amount=Amount\",\"OTPParam4\":\"\",\"OTPParam5\":\"\",\"OTPParam6\":\"\",\"OTPParam7\":\"\",\"OTPParam8\":\"1291|NomineeName=UserName|BRANCHCODE=UniqueID|Amount=Amount\",\"OTPAuthRequired\":false,\"CutOffTime\":\"\"},{\"PartnerId\":44,\"ClientID\":95,\"ClientName\":\"Altura[Centrum]\",\"IsVerify\":1,\"CoolOff\":5,\"PerCustomerMinTxnLimit\":100,\"PerCustomerMaxTxnLimit\":49999,\"TxnMinLimit\":100,\"TxnMaxLimit\":49999,\"PartPayment\":1,\"OverPayment\":1,\"PanRequired\":0,\"PanThreshold\":49999,\"Category\":\"Agent\",\"APIThreshold\":2,\"MultiVerify\":0,\"SpclVerifyFields\":\"\",\"ReturnMulti\":0,\"OTPParam1\":\"NomineeName=UserName\",\"OTPParam2\":\"BRANCHCODE=UniqueID\",\"OTPParam3\":\"Amount=Amount\",\"OTPParam4\":\"\",\"OTPParam5\":\"\",\"OTPParam6\":\"\",\"OTPParam7\":\"\",\"OTPParam8\":\"1299|NomineeName=UserName|BRANCHCODE=UniqueID|Amount=Amount\",\"OTPAuthRequired\":false,\"CutOffTime\":\"\"},{\"PartnerId\":44,\"ClientID\":96,\"ClientName\":\"Udaan Cash Collection\",\"IsVerify\":1,\"CoolOff\":5,\"PerCustomerMinTxnLimit\":100,\"PerCustomerMaxTxnLimit\":49999,\"TxnMinLimit\":100,\"TxnMaxLimit\":49999,\"PartPayment\":1,\"OverPayment\":1,\"PanRequired\":0,\"PanThreshold\":49999,\"Category\":\"Agent\",\"APIThreshold\":2,\"MultiVerify\":0,\"SpclVerifyFields\":\"\",\"ReturnMulti\":0,\"OTPParam1\":\"NomineeName=UserName\",\"OTPParam2\":\"BRANCHCODE=Instruction2\",\"OTPParam3\":\"Amount=Amount\",\"OTPParam4\":\"\",\"OTPParam5\":\"\",\"OTPParam6\":\"\",\"OTPParam7\":\"\",\"OTPParam8\":\"1301|NomineeName=UserName|BRANCHCODE=Instruction2|Amount=Amount\",\"OTPAuthRequired\":false,\"CutOffTime\":\"\"},{\"PartnerId\":44,\"ClientID\":97,\"ClientName\":\"Midland\",\"IsVerify\":1,\"CoolOff\":5,\"PerCustomerMinTxnLimit\":100,\"PerCustomerMaxTxnLimit\":49999,\"TxnMinLimit\":100,\"TxnMaxLimit\":49999,\"PartPayment\":1,\"OverPayment\":1,\"PanRequired\":0,\"PanThreshold\":49999,\"Category\":\"Agent\",\"APIThreshold\":2,\"MultiVerify\":0,\"SpclVerifyFields\":\"\",\"ReturnMulti\":0,\"OTPParam1\":\"NomineeName=UserName\",\"OTPParam2\":\"BRANCHCODE=UniqueID\",\"OTPParam3\":\"Amount=Amount\",\"OTPParam4\":\"\",\"OTPParam5\":\"\",\"OTPParam6\":\"\",\"OTPParam7\":\"\",\"OTPParam8\":\"1302|NomineeName=UserName|BRANCHCODE=UniqueID|Amount=Amount\",\"OTPAuthRequired\":false,\"CutOffTime\":\"\"}]"
  let parsedBillers = JSON.parse(billerString);
  
  return res.json(parsedBillers);
});

process.on('uncaughtException', error => {
  console.error('uncaught error here ', error);
  process.exit(0);
});

app.listen(PORT, () => console.log(`Retail node gateway server is listening on port ${PORT}!`));
