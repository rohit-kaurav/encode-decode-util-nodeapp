const md5hash = require('./md5Hash'),
      xmlParser = require('./xmlBuilder');

module.exports = {
  getEncryptedString: (req) => {
    let data = req.body.data;
    let rootName = req.body.rootName;

    let rawXML = xmlParser.buildXml(data, rootName);
    let encryptedXML = md5hash.encrypt(rawXML);

    return encryptedXML;
  },

  getDecryptedJSON: (req, callback) => {
    let data = req.body.encryptedXML;

    let decryptedXML = md5hash.decrypt(data);
    xmlParser.parseXml(decryptedXML, (error, result) => {
      if (result) {
        return callback(result);
      } else {
        return callback({
          status: 'FAIL',
          code: '112',
          message: 'Something went wrong while parsing xml'
        });
      }
    });
  }
}