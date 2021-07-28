const express = require('express');
const Database = require('@replit/database');
const fs = require('fs');
const ejs = require('ejs');
const uuid = require("uuid");
const ogs = require('open-graph-scraper');
const bent = require('bent')
const log = require('fancy-log');
const urlLengthener = require("url-lengthener");
const { Crypto } = require("@peculiar/webcrypto");
const crypto = new Crypto();

const app = express();
const db = new Database();

const siteName = " \\ (•◡•) / "; //Put the name of your site here, or you can just leave it lel
const siteURL = "https://dmo.aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.com";

const regex = new RegExp('^https:\/\/replit.com\/@([^\/#\?]+?)(?:\/([^\/#\?]+?))[\/#\?]?$');
const getJSON = bent('json')

app.use(express.urlencoded({
	extended: true
}))
app.use('/static', express.static('public'))
var expressWs = require('express-ws')(app);

const users = [] //Put the IDS of users here who are not you
const repl_author = process.env['REPL_OWNER']

app.get('/', async (req, res) => {
	try {
		let user_id = req.headers['x-replit-user-id']
		let user_name = req.headers['x-replit-user-name']
		if (users.includes(parseInt(req.headers['x-replit-user-id'])) || req.headers['x-replit-user-name'] == repl_author) {
			let matches = await db.list("user_id");
			if (matches.indexOf(`user_id_${user_id}`) == -1) {
				await db.set(`user_id_${user_id}`, {});
			};
			let urls = await db.get(`user_id_${user_id}`);
			let out_list = {};
			for (let i in urls) {
				let value = await db.get('resulting_url_' + urls[i]);
				out_list[urls[i]] = value;
			}

			console.log(urls)
			console.log(out_list)

			let view_name = 'dashboard.html'
			let json = {
				siteName: siteName,
				user_id: user_id,
				user_name: user_name,
				siteUrl: siteURL,
				user_urls: urls,
				urls_with_keys: out_list,
				error: ""
			}
			log(`Dashboard - Returned ${view_name}`)
			fs.readFile(`views/${view_name}`, 'utf8', async (err, data) => res.end(ejs.render(data, json)));
		}
		let view_name = 'index.html'
		let json = {
			siteName: siteName,
			user_id: user_id,
			user_name: user_name,
			siteUrl: siteURL,
			error: ""
		}
		log(`Login - Returned ${view_name}`)
		fs.readFile(`views/${view_name}`, 'utf8', async (err, data) => res.end(ejs.render(data, json)));
	} catch (err) {
		let view_name = 'error.html'
		let json = {
			siteName: siteName,
			siteUrl: siteURL,
			code: '401',
			message: "You aren't an allowed user, sorry!"
		};
		log.error("Error! Sent 401")
		fs.readFile(`views/${view_name}`, 'utf8', async (err, data) => res.end(ejs.render(data, json)));
	}
});

app.get('/new', async (req, res) => {
	try {
		let user_id = req.headers['x-replit-user-id']
		let user_name = req.headers['x-replit-user-name']
		if (users.includes(parseInt(req.headers['x-replit-user-id'])) || req.headers['x-replit-user-name'] == repl_author) {
			let view_name = 'submit.html'
			let json = {
				siteName: siteName,
				user_id: user_id,
				user_name: user_name,
				siteUrl: siteURL,
				error: ""
			}
			log(`New URL - Returned ${view_name}`)
			fs.readFile(`views/${view_name}`, 'utf8', async (err, data) => res.end(ejs.render(data, json)));
		} else {
			res.redirect('/');
		}
	} catch (err) {
		let view_name = 'error.html'
		let json = {
			siteName: siteName,
			siteUrl: siteURL,
			code: '401',
			message: "You aren't an allowed user, sorry!"
		};
		log.error("Error! Sent 401")
		fs.readFile(`views/${view_name}`, 'utf8', async (err, data) => res.end(ejs.render(data, json)));
	}
});
app.post('/new', async (req, res) => {
	try {
		let user_id = req.headers['x-replit-user-id']
		let user_name = req.headers['x-replit-user-name']
		if (users.includes(parseInt(req.headers['x-replit-user-id'])) || req.headers['x-replit-user-name'] == repl_author) {
			var id = "";
			id = uuid.v4().substring(0, 8);
			db.list("resulting_url_").then(matches => {
				while (matches.includes("resulting_url_" + id)) {
					id = uuid.v4().substring(0, 8);
				}
			});
			await db.set("resulting_url_" + id, req.body.url).then(async () => {
				console.log("resulting saved")
				db.get(`user_id_${user_id}`).then(user_urls => {
					console.log("grabbing db of user")
					user_urls[id] = id;
					console.log("setting user backl")
					db.set(`user_id_${user_id}`, user_urls);
				});
			});
			let view_name = 'done.html'
			let json = {
				siteName: siteName,
				user_id: user_id,
				user_name: user_name,
				siteUrl: siteURL,
				newUrl: siteURL + '/' + id,
				error: ""
			}
			log(`New URL Created - Returned ${view_name}`)
			fs.readFile(`views/${view_name}`, 'utf8', async (err, data) => res.end(ejs.render(data, json)));
		} else {
			res.redirect('/');
		}
	} catch (err) {
		let view_name = 'error.html'
		let json = {
			siteName: siteName,
			siteUrl: siteURL,
			code: '401',
			message: "You aren't an allowed user, sorry!"
		};
		log.error("Error! Sent 401")
		fs.readFile(`views/${view_name}`, 'utf8', async (err, data) => res.end(ejs.render(data, json)));
	}
});

app.get('/edit/:id', async (req, res) => {
	try {
		let user_id = req.headers['x-replit-user-id']
		let user_name = req.headers['x-replit-user-name']
		if (users.includes(parseInt(req.headers['x-replit-user-id'])) || req.headers['x-replit-user-name'] == repl_author) {
			let view_name = 'edit.html'
			let json = {
				siteName: siteName,
				user_id: user_id,
				user_name: user_name,
				siteUrl: siteURL,
				current_url: await db.get('resulting_url_' + req.params.id),
				current_key: req.params.id,
				error: ""
			}
			log(`New URL Created - Returned ${view_name}`)
			fs.readFile(`views/${view_name}`, 'utf8', async (err, data) => res.end(ejs.render(data, json)));
		} else {
			
			res.redirect('/');
		}
	} catch (err) {
		let view_name = 'error.html'
		let json = {
			siteName: siteName,
			siteUrl: siteURL,
			code: '400',
			message: "That URL id doesn't exist, sorry!"
		};
		log.error("Error! Sent 400")
		fs.readFile(`views/${view_name}`, 'utf8', async (err, data) => res.end(ejs.render(data, json)));
	}
});

app.post('/edit', async (req, res) => {
	try {
		let user_id = req.headers['x-replit-user-id']
		let user_name = req.headers['x-replit-user-name']
		if (users.includes(parseInt(req.headers['x-replit-user-id'])) || req.headers['x-replit-user-name'] == repl_author) {
			id = req.body.key;
			await db.list("resulting_url_").then(matches => {
				if (matches.includes("resulting_url_" + id)) {
					db.get(`user_id_${user_id}`).then(user_urls => {
						if (Object.keys(user_urls).includes(id)) {
							db.set("resulting_url_" + id, req.body.url).then(() => {
								db.get(`user_id_${user_id}`).then(user_urls => {
									user_urls[id] = req.body.url;
									db.set(`user_id_${user_id}`, user_urls);
									let view_name = 'done.html'
								let json = {
									siteName: siteName,
									user_id: user_id,
									user_name: user_name,
									siteUrl: siteURL,
									newUrl: siteURL + '/' + id,
									error: ""
								}
								log(`Returned ${view_name}`)
								fs.readFile(`views/${view_name}`, 'utf8', async (err, data) => res.end(ejs.render(data, json)));
								});
							});
						} else {
							let view_name = 'error.html'
							let json = {
								siteName: siteName,
								siteUrl: siteURL,
								code: '400',
								message: "That URL isn't urs >:("
							};
							log(`Returned ${view_name}`)
							fs.readFile(`views/${view_name}`, 'utf8', async (err, data) => res.end(ejs.render(data, json)));
						}
					})
				} else {
					let view_name = 'error.html'
					let json = {
						siteName: siteName,
						siteUrl: siteURL,
						code: '400',
						message: "That URL doesn't exist"
					};
					log(`Returned ${view_name}`)
					fs.readFile(`views/${view_name}`, 'utf8', async (err, data) => res.end(ejs.render(data, json)));
				}
			})
		} else {
			res.redirect('/');
		}
	} catch (err) {
		let view_name = 'error.html'
		let json = {
			siteName: siteName,
			siteUrl: siteURL,
			code: '401',
			message: "You aren't an allowed user, sorry!"
		};
		log.error("Error! Sent 401")
		fs.readFile(`views/${view_name}`, 'utf8', async (err, data) => res.end(ejs.render(data, json)));
	}
});

app.get('/delete/:id', async (req, res) => {
	try {
		let id = req.params.id.replace('resulting_url_', '')
		let user_id = req.headers['x-replit-user-id']
		let user_name = req.headers['x-replit-user-name']
		if (users.includes(parseInt(req.headers['x-replit-user-id'])) || req.headers['x-replit-user-name'] == repl_author) {
			let view_name = 'delete.html'
			let json = {
				siteName: siteName,
				user_id: user_id,
				user_name: user_name,
				siteUrl: siteURL,
				current_url: await db.get('resulting_url_' + id),
				current_key: id,
				error: ""
			}
			log(`Returned ${view_name}`)
			fs.readFile(`views/${view_name}`, 'utf8', async (err, data) => res.end(ejs.render(data, json)));
		} else {
			res.redirect('/');
		}
	} catch (err) {
		let view_name = 'error.html'
		let json = {
			siteName: siteName,
			siteUrl: siteURL,
			code: '400',
			message: "That URL id doesn't exist, sorry!"
		};
		log.error("Error! Sent 400")
		fs.readFile(`views/${view_name}`, 'utf8', async (err, data) => res.end(ejs.render(data, json)));
	}
});

app.post('/delete', async (req, res) => {
	try {
		let user_id = req.headers['x-replit-user-id']
		let user_name = req.headers['x-replit-user-name']
		if (users.includes(parseInt(req.headers['x-replit-user-id'])) || req.headers['x-replit-user-name'] == repl_author) {
			id = req.body.key;
			await db.list("resulting_url_").then(matches => {
				if (matches.includes("resulting_url_" + id)) {
					db.get(`user_id_${user_id}`).then(user_urls => {
						if (Object.keys(user_urls).includes(id)) {
							db.delete("resulting_url_" + id).then(() => {
								db.get(`user_id_${user_id}`).then(user_urls => {
									delete user_urls[id];
									db.set(`user_id_${user_id}`, user_urls);
									res.redirect('/');
								});
							});
						} else {
							let view_name = 'error.html'
							let json = {
								siteName: siteName,
								siteUrl: siteURL,
								code: '400',
								message: "That URL isn't urs >:("
							};
							log(`Returned ${view_name}`)
							fs.readFile(`views/${view_name}`, 'utf8', async (err, data) => res.end(ejs.render(data, json)));
						}
					})
				} else {
					let view_name = 'error.html'
					let json = {
						siteName: siteName,
						siteUrl: siteURL,
						code: '400',
						message: "That URL doesn't exist"
					};
					log(`Returned ${view_name}`)
					fs.readFile(`views/${view_name}`, 'utf8', async (err, data) => res.end(ejs.render(data, json)));
				}
			})
		} else {
			res.redirect('/');
		}
	} catch (err) {
		let view_name = 'error.html'
		let json = {
			siteName: siteName,
			siteUrl: siteURL,
			code: '401',
			message: "You aren't an allowed user, sorry!"
		};
		log.error("Error! Sent 401")
		fs.readFile(`views/${view_name}`, 'utf8', async (err, data) => res.end(ejs.render(data, json)));
	}
});

app.get('/:id', async (req, res) => {
	//try {
		let actual_id = req.params.id;
		let view_name = 'auth.html'
		let json = {
			siteName: siteName,
			siteUrl: siteURL,
			code: '200',
			id: actual_id,
			message: ""
		};
		log(`Returned ${view_name}`)
		fs.readFile(`views/${view_name}`, 'utf8', async (err, data) => res.end(ejs.render(data, json)));
	/*} catch (err) {
		let view_name = 'error.html'
		let json = {
			siteName: siteName,
			siteUrl: siteURL,
			code: '400',
			message: "That URL doesn't exist or has already been used, sorry!"
		};
		log.error("Error! Sent 400")
		fs.readFile(`views/${view_name}`, 'utf8', async (err, data) => res.end(ejs.render(data, json)));
	}*/
});

app.ws('/decrypt', async function(ws, req) {
	ws.on('message', async function(msg) {
		let msg_decoded = JSON.parse(msg)
		let actual_id = msg_decoded['id'];
		let public_key = await urlLengthener.hex2str(urlLengthener.a2hex(msg_decoded['publicKey']));
		let public_key_parsed = await JSON.parse(public_key);

		console.log(public_key_parsed)
		let encoder = new TextEncoder();
		let resulting_url = await db.get("resulting_url_" + actual_id);
/*
		const public_key_object = await crypto.subtle.importKey(
			"jwk",
			public_key_parsed,
			{
			name:"RSA-OAEP",
			hash: {name: "SHA-256"}
			},
			true,
			["encrypt"]
		);

		//urlLengthener.hex2a(urlLengthener.str2hex())

		let encrypted_url = await crypto.subtle.encrypt("RSA-OAEP", public_key_object, Buffer.from(resulting_url));

		console.log(urlLengthener.hex2a(urlLengthener.str2hex(encrypted_url.toString())))

		ws.send(urlLengthener.hex2a(urlLengthener.str2hex(encrypted_url.toString())));*/
		let url_yeeted = urlLengthener.hex2a(urlLengthener.str2hex(resulting_url));
		ws.send(encoder.encode(url_yeeted));
	});
});

app.listen(8008, '0.0.0.0', () => {
	console.log("We are live on 8008");
})