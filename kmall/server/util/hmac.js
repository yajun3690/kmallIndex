const crypto = require('crypto');

// const hash = crypto.createHash('md5');
// const hash = crypto.createHash('sha256');
/*
const hash = crypto.createHash('sha512');

hash.update('test');

console.log(hash.digest('hex'));
*/
/*
const hmac = crypto.createHmac('sha256', 'sdjfkdsjfkdsfj2');
hmac.update('test');
console.log(hmac.digest('hex'));
*/

module.exports = (str)=>{
	const hmac = crypto.createHmac('sha256', 'sdjfkdsjfkdsfj2');
	hmac.update(str);
	return hmac.digest('hex');
}
