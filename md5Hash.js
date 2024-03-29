const crypto = require("crypto"),
      config = require("./config.json");

module.exports = {
  encrypt: function (plainText) {
    let workingKey = config.md5Hash.key;
    var m = crypto.createHash("md5");
    m.update(workingKey);
    var key = m.digest("buffer");
    var iv = "\x00\x01\x02\x03\x04\x05\x06\x07\x08\x09\x0a\x0b\x0c\x0d\x0e\x0f";
    var cipher = crypto.createCipheriv("aes-128-cbc", key, iv);
    var encoded = cipher.update(plainText, "utf8", "hex");
    encoded += cipher.final("hex");
    return encoded;
  },
  decrypt: function (encText) {
    let workingKey = config.md5Hash.key;
    var m = crypto.createHash("md5");
    m.update(workingKey);
    var key = m.digest("buffer");
    var iv = "\x00\x01\x02\x03\x04\x05\x06\x07\x08\x09\x0a\x0b\x0c\x0d\x0e\x0f";
    var decipher = crypto.createDecipheriv("aes-128-cbc", key, iv);
    var decoded = decipher.update(encText, "hex", "utf8");
    decoded += decipher.final("utf8");
    return decoded;
  },
};
