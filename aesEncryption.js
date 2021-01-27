const crypto = require('crypto'),
  config = require('./config.json'),
  partner = config.partner,
  algorithm = config.aesEncryption[partner].algorithm,
  // secretKey = Buffer.from(config.aesEncryption[partner].key), // icici
  // iv = Buffer.from('1111222233334444'); // icici
  secretKey = Buffer.from(config.aesEncryption[partner].key, 'base64'), // fullerton
  iv = crypto.randomBytes(0); // fullerton

module.exports = {
  getEncryptedData: (req, callback) => {
    // for icici
    // let data = Buffer.from(iv + JSON.stringify(req.body.data), 'utf8');

    // for fullerton
    let data = Buffer.from(JSON.stringify(req.body.data), 'utf8');
    
    // let cipher = crypto.createCipheriv(algorithm, secretKey, iv);
    // let crypted = cipher.update(data, 'utf8', 'base64');
    // crypted += cipher.final('base64');

    // for fullerton
    let cipher = null;
    try {
      cipher = crypto.createCipheriv(algorithm, secretKey, iv);
    } catch (e) {
      console.error(e);
      return callback({
        data: e
      });
    }
    let crypted = cipher.update(data, 'utf8', 'base64');
    crypted += cipher.final('base64');
    
    let base64EncodedData = crypted;
    
    // return callback({
    //   data: base64EncodedData
    // });
    return callback(base64EncodedData);
  },

  getDecryptedData: (req, callback) => {
    let data = req.body.encryptedData;

    let decipher = crypto.createDecipheriv(algorithm, secretKey, iv);
    let decrypted = decipher.update(data, 'base64', 'utf8');
    decrypted += decipher.final('utf8');

    console.log(decrypted);
    if (typeof decrypted === 'string' && config.aesEncryption[partner].jsonify) {
      // for icici, iv has to be separated
      // let index = 16;
      // while (decrypted[index] !== '{') {
      //   index--;
      // }
      // decrypted = decrypted.slice(index);
      
      decrypted = JSON.parse(decrypted);
    }
    
    return callback(decrypted);
  }
}