import express from 'express';
import { configureRoutes } from './routes/routes';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import expressSession  from 'express-session';
import passport from 'passport';
import { configurePassport } from './passport/passport';
import mongoose from 'mongoose';
import cors from 'cors';

import multer from 'multer';

const app = express();
const port = 3000;
const dbUrl = 'mongodb+srv://kunreka2001:nmsjmnDu2VfcuAn4@cluster0.zzhutso.mongodb.net/';



mongoose.connect(dbUrl).then(_ => {
    console.log('Successfully connected to MongoDB');
}).catch(error => {
    console.log(error);
});

// bodyParser
app.use(bodyParser.urlencoded({extended: true}));



// cookieParser
app.use(cookieParser());





const whitelist = ['*', 'http://localhost:4200']
const corsOptions = {
    origin: (origin: string | undefined, callback: (err: Error | null, allowed?: boolean) => void) => {
        if (whitelist.indexOf(origin!) !== -1 || whitelist.includes('*')) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS.'));
        }
    },
    credentials: true
};

// cors
app.use(cors(corsOptions));

// session
const sessionOptions: expressSession.SessionOptions = {
    secret: 'testsecret',
    resave: false,
    saveUninitialized: false
};
app.use(expressSession(sessionOptions));

app.use(passport.initialize());
app.use(passport.session());

configurePassport(passport);

app.use('/app', configureRoutes(passport, express.Router()));

app.listen(port, () => {
    console.log('Server is listening on port ' + port.toString());
});

