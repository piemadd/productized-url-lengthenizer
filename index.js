const express = require('express');

const app = express();

const site_url = 'https://example.com'; // Put the beginning url of the site this is being hosted on here without the slash at the end
const private_token = process.env['token_hashed']

//These are some sample tokens I made for this demo. DO NOT USE THESE, instead use generate_token.js to generate a pair of your own.
//private: a9511d70dd0eed3e7961273948de9135f9fc4c9d15499dfa42c8c0065155efa8018563dcc5891911033e6660fb394caf1fece00e99384758469540e06be68795
//public: 59f4d719c050539b5834dc376d87d2d6c90af3a50767041cae9d24a10f42c2fe2471125bb1b9d7e4ec964437ec395a9a506f26ef1e35073d82518de9eb1f916c

app.get('/', (req, res) => {
	res.redirect('https://demo.aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.com/')
});

app.get('/a', (req, res) => {
	let public = req.query['token'];
	let private = crypto.createHash('sha512').update(public).digest('hex');

	if (private_token != private) {
		res.send("INVALID_TOKEN");
	}

	let before_url = req.query['url'];
	try {
		res.send(urlLengthener.lengthenAsPath(before_url));
	} catch (e) {
		res.send('INVALID_URL')
	}
});

app.get('/:id', (req, res) => {
	let code = decodeURIComponent(req.params['id'])
	//console.log(code)
	res.redirect('https://aaa.aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.com/a?' + code)
});

app.listen(3000, () => {
	console.log('server started');
});