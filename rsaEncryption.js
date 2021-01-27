const { getEncryptedData } = require('./aesEncryption');

const crypto = require('crypto'),
  path = require('path'),
  fs = require('fs'),
  config = require('./config.json'),
  partner = config.partner,
  publicKeyLocation = config.rsaEncryption[partner].publicKeyLocation,
  privateKeyLocation = config.rsaEncryption[partner].privateKeyLocation;

module.exports = {
  getEncryptedData: (req, callback) => {
    return module.exports.getEncryptedDataGeneric(req, callback);
  },

  getEncryptedDataGeneric: (req, callback) => {
    const absolutePath = path.resolve(publicKeyLocation);
    const publicKey = fs.readFileSync(absolutePath);

    let data = Buffer.from(req.body.data);

    let encryptedData = crypto.publicEncrypt(
      {
        key: publicKey,
        padding: crypto.constants.RSA_PKCS1_PADDING
      },
      data
    );
    
    // return callback({
    //   result: encryptedData.toString('base64')
    // });
    return callback(encryptedData.toString('base64'));
  },

  getDecryptedDataWithPrivateKey: (req, callback) => {
    const absolutePath = path.resolve(privateKeyLocation);
    const privateKey = fs.readFileSync(absolutePath);

    let data = Buffer.from(req.body.data, 'base64');

    let decryptedData = crypto.privateDecrypt(
      {
        key: privateKey,
        padding: crypto.constants.RSA_PKCS1_PADDING
      },
      data
    );
    
    return callback({
      result: decryptedData.toString()
    });
  },
}