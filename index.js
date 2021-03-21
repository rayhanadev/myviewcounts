const express = require('express');
const app = express();

const fs = require('fs');
const crypto = require('crypto');

const { generateSalt, hash, compare } = require('./utils/passwords');

app.use(express.static('views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
	res.sendFile(__dirname + 'views/index.html');
});

app.post('/create', (req, res) => {
	let countername = req.body.name;
	let password = req.body.password;
	let stroke = req.body.stroke == undefined ? '000' : String(req.body.stroke);
	let fill = req.body.fill == undefined ? 'FFF' : String(req.body.fill);
	let message = req.body.message == undefined ? 'Total Views' : String(req.body.message);

	let database = JSON.parse(
		fs.readFileSync('database.json', { encoding: 'utf8' })
	);

	let conditions = [countername, password, stroke, fill, message];
	if (!database[countername]) {
		if (!conditions.includes("")) {
			database[countername] = { counts: 0, stroke: stroke, fill: fill, message: message};
			fs.writeFileSync('database.json', JSON.stringify(database), {
				encoding: 'utf8'
			});

			let salt = generateSalt(12);
			let hashedpass = hash(password, salt);
			let passwordDB = JSON.parse(
				fs.readFileSync('passwords.json', { encoding: 'utf8' })
			);
			passwordDB[countername] = hashedpass;

			fs.writeFileSync('passwords.json', JSON.stringify(passwordDB), {
				encoding: 'utf8'
			});
			if (!req.body.stroke) console.log(`New Basic Counter ${countername}`);
			if (req.body.stroke) console.log(`New Advanced Counter ${countername}`);
			res.end(`Successful.\nVisit your counter at:\nhttps://myviewcounts.rayhanadev.repl.co/viewcount/${countername}.svg`);
		} else {
			res.end('Missing a field. Unsuccessful.');
		}
	} else {
		res.end('Counter already exists. Unsuccessful.');
	}
});

app.post('/delete', (req, res) => {
	let countername = req.body.name;
	let password = req.body.password;

	let passwordDB = JSON.parse(
		fs.readFileSync('passwords.json', { encoding: 'utf8' })
	);
	let database = JSON.parse(
		fs.readFileSync('database.json', { encoding: 'utf8' })
	);

	let hashData = passwordDB[countername];
	let result = compare(password, hashData);
	if (result === true) {
		delete passwordDB[countername];
		delete database[countername];

		fs.writeFileSync('passwords.json', JSON.stringify(passwordDB), {
			encoding: 'utf8'
		});
		fs.writeFileSync('database.json', JSON.stringify(database), {
			encoding: 'utf8'
		});
		console.log(`Deleted Counter ${countername}`);
		res.end('Successful');
	} else {
		res.end('Incorrect password. Unsuccessful.');
	}
});

app.get('/viewcount/:countername', (req, res) => {
	let countername = String(req.params.countername).split('.')[0];

	let database = JSON.parse(
		fs.readFileSync('database.json', { encoding: 'utf8' })
	);
	if (!database[countername]) {
		res.setHeader('Content-Type', 'image/svg+xml');
		res.send(`
  	<svg xmlns="http://www.w3.org/2000/svg" height="50" width="510">
  	   <style>
        text {
          font-family: Trebuchet MS, Helvetica;
          font-size: 50px;
          stroke-width: 1.5px;
          fill: #FFFFFF;
          stroke: #000000;
          background-color: transparent;
        }
      </style>
      <text x="5" y="48">No Counters Here o-O!</text>
    </svg>`);
		return;
	}

	let counts = database[countername].counts;
	let newCounts = (counts += 1);
	database[countername].counts = newCounts;

	fs.writeFileSync('database.json', JSON.stringify(database), {
		encoding: 'utf8'
	});

	res.setHeader('Content-Type', 'image/svg+xml');
	res.status(200);
	if (database[countername].fill && database[countername].stroke) {
		res.send(`
  <svg xmlns="http://www.w3.org/2000/svg" height="50" width="500">
    <style>
      text {
        font-family: Trebuchet MS, Helvetica;
        font-size: 50px;
        stroke-width: 1.5px;
        fill: #${database[countername].fill};
        stroke: #${database[countername].stroke};
        background-color: transparent;
      }
    </style>
    <text x="5" y="48">
      ${database[countername].message}: ${counts}
    </text>
  </svg>`);
	} else {
		res.send(`
  <svg xmlns="http://www.w3.org/2000/svg" height="50" width="500">
    <style>
      text {
        font-family: Trebuchet MS, Helvetica;
        font-size: 50px;
        stroke-width: 1.5px;
        fill: #FFFFFF;
        stroke: #000000;
        background-color: transparent;
      }
    </style>
    <text x="5" y="48">
      Total Views: ${counts}
    </text>
  </svg>`);
	}
	return;
});

app.listen(3000, () => {
	console.log('Listening on Port: 3000');
});
