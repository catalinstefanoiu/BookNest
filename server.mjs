import './load-env.mjs';
import { randomBytes } from 'crypto';
import express from 'express';
import pg from 'pg';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import logger from 'morgan';
import { hashPassword } from './utils.mjs';


const authKeys = JSON.parse(process.env.AUTH_KEYS);

const app = express();


const db = new pg.Client({
  user: process.env.DB_USR,
  host: process.env.DB_HOST,
  database: 'postgres',
  password: process.env.DB_PWD,
  port: 5432,
});

db.connect();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({
  limit: '3mb'
}));
app.use(cookieParser());
app.use(express.static('public'));
  app.use('/images', express.static('images'));
  app.use(logger('dev'));

app.get('/', (req, res) => {
  res.render('index.ejs');
});

app.get('/login', (req, res) => {
  res.render('login.ejs');
});

app.get('/register', (req, res) => {
  res.render('register.ejs');
});

app.get('/index', (req,res) => {
  res.render('index.ejs');
})
app.get('/main', auth, async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM hotel ORDER BY name ASC');
    if (!result.rows || !result.rows.length) {
      throw new Error('No hotels');
    }
    console.log(result.rows);
    res.render('main.ejs', {
      hotels: result.rows
    });
  } catch (error) {
    console.error(error);
    res.render('error.ejs', {
      msg: error.message
    });
  }
});

app.get('/reservation', auth, async (req, res) => {
  try {
    const hotelId = parseInt(req.query.hotel || '0', 10);
    const result = await db.query(`SELECT * FROM room WHERE hotel_id = $1 ORDER BY number ASC`, [hotelId]);
    if (!result.rows || !result.rows.length) {
      throw new Error('No rooms');
    }

    res.render('reservation.ejs', {
      guest: req.user.name,
      rooms: result.rows,
      error: ''
    });
  } catch (error) {
    console.error(error);
    res.render('error.ejs', {
      msg: error.message
    });
  }
});

/*app.get('/reservation-json', auth, async (req, res) => {
  try {
    const hotelId = parseInt(req.query.hotel || '0', 10);
    const result = await db.query(`SELECT * FROM room WHERE hotel_id = $1 ORDER BY number ASC`, [hotelId]);
    if (!result.rows || !result.rows.length) {
      throw new Error('No rooms');
    }

    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.render('error.ejs', {
      msg: error.message
    });
  }
});
*/
app.post('/reservation', auth, async (req, res) => {
  try {
    console.log(req.body);
    const userId = req.user.id;
    const roomId = req.body.room_id;
    const check_in = new Date(req.body.check_in);
    const check_out = new Date(req.body.check_out);

    const exists = await db.query(`SELECT * FROM reservation WHERE room_id = $1 AND ($2 BETWEEN check_in AND check_out OR $3 BETWEEN check_in AND check_out)`, [roomId, check_in, check_out]);
    if (exists.rowCount > 0) {
      const hotelId = parseInt(req.query.hotel || '0', 10);
      const result = await db.query(`SELECT * FROM room WHERE hotel_id = $1 ORDER BY number ASC`, [hotelId]);
      if (!result.rows || !result.rows.length) {
        throw new Error('No rooms');
      }

      res.render('reservation.ejs', {
        guest: req.user.name,
        rooms: result.rows,
        error: 'Room is already booked. Choose a different date interval'
      });
      return;
    }

    const result = await db.query(`INSERT INTO reservation (user_id, room_id, check_in, check_out) VALUES ($1, $2, $3, $4)`, [userId, roomId, check_in, check_out]);
    if (result.rowCount === 1) {
      res.redirect('main');
    } else {
      //TODO: handle DB error
    }
  } catch (ex) {
    console.error(ex);
  }
});

app.post('/register', async (req, res) => {
  try {
    console.log(req.body);
    const name = req.body.username;
    const email = req.body.email;

    // create a random salt to use for password encryption
    const salt = Buffer.from(randomBytes(16).toString('base64'), 'base64');
    // encrypt password
    const password = hashPassword(salt, req.body.password);

    const result = await db.query(`INSERT INTO users (email, name, password, salt) VALUES ($1, $2, $3, $4)`, [email, name, password, salt.toString('base64')]);
    if (result.rowCount === 1) {
      res.render('index.ejs');
    } else {
      //TODO: handle DB error
    }
  } catch (ex) {
    console.error(ex);
  }
});

app.post('/login', async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 1) {
      const user = result.rows[0];
      const salt = Buffer.from(user.salt, 'base64');
      const hashedPassword = hashPassword(salt, password);
      const storedPassword = user.password;

      if (hashedPassword === storedPassword) {
        const jwtBearerToken = jwt.sign({
          id: user.id,
          email: user.email,
          name: user.name
        }, authKeys.private, {
          algorithm: 'RS256',
          expiresIn: '1h'
        });

        res.cookie('auth_token', jwtBearerToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production', maxAge: 3600000 });
        res.redirect('/main');
      } else {
        res.send('Incorrect Password');
      }
    } else {
      res.send('User not found');
    }
  } catch (err) {
    console.log(err);
  }
});

app.get('/error', (req, res) => {
  res.render('error.ejs');
});

async function auth(req, res, next) {
  try {
    const cookies = req.cookies;
    if (!cookies) {
      throw new Error('No cookies');
    }
    const token = cookies.auth_token;
    if (!token) {
      throw new Error('No auth token');
    }
    const decoded = jwt.verify(token, authKeys.public);
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).redirect('/login');
  }
}

app.listen(3000, () => {
  console.log('Server running on port 3000');
});