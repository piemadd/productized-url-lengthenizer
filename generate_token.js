const random = require('@shuaninfo/random').default
const crypto = require('crypto')

console.log("Welcome to the token generator! This tool will create a token to use with your client and a hashed version of it to use as the secret which is named \"token_hashed\". This ensures that your API is only used by applications authenticated to do so. It is highly reccomended to not put the token on the frontend of an application, but instead of the backend as to not, well, leak it. \n\nDo note, if you had to take the aforementioed advice I would be scared for the security of your application (*cough cough* cobb county schools *cough cough*). Below are your tokens: ")

let public = crypto.createHash('sha512').update(random({length: 69, type: 'base64'})).digest('hex');
let private = crypto.createHash('sha512').update(public).digest('hex');

console.log("Public Token: " + public);
console.log("Private Token: " + private);