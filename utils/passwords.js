const crypto = require('crypto');

function generateSalt(rounds) {
	if (rounds == null) rounds = 12;
	return crypto
		.randomBytes(Math.ceil(rounds / 2))
		.toString('hex')
		.slice(0, rounds);
}

function hash(password, salt) {
	let hash = crypto.createHmac('sha512', salt);
	hash.update(password);
	let value = hash.digest('hex');
	return {
		salt: salt,
		hashedpassword: value
	};
}

function compare(password, hashData) {
	let passwordData = hash(password, hashData.salt);
	if (passwordData.hashedpassword === hashData.hashedpassword) {
		return true;
	}
	return false;
}

module.exports = {
  generateSalt: generateSalt,
  hash: hash,
  compare: compare
}
