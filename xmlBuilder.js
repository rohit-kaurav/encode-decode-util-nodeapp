const xml = require('xml2js');


module.exports = {
  buildXml: (rawData, rootName) => {
    let builder = new xml.Builder({
      rootName: rootName
    });

    let rawXml = builder.buildObject(rawData);
    return rawXml;
  },

  parseXml: (XMLString, callback) => {
    let parser = xml.parseString;

    parser(
      XMLString,
      {
        explicitArray: false
      }, (err, responseJSON) => {
        return callback(err, responseJSON);
      }
    );
  }
}