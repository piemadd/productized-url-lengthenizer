function encryptStringWithRsaPublicKey(toEncrypt, publicKey) {
        var buffer = Buffer.from(toEncrypt);
        var encrypted = bCrypto.publicEncrypt(publicKey, buffer);
        return encrypted.toString("base64");
};

function decryptStringWithRsaPrivateKey(toDecrypt, privateKey) {
        var buffer = Buffer.from(toDecrypt, "base64");
        var decrypted = bCrypto.privateDecrypt(privateKey, buffer);
        return decrypted.toString("utf8");
};

function generateKeys() {
        var prime_length = 60;
        var diffHell = bCrypto.createDiffieHellman(prime_length);

        diffHell.generateKeys('base64');
        return diffHell;
}