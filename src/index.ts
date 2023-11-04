import express, { NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3000;

app.use(cors())
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

app.use('/api/users', require('./routes/users'));
app.use('/api/categories', require('./routes/categories'));

// Error handling middleware
app.use((err:Error, req:Request, res:Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

app.listen(port, () => {
    console.log('App is running on port 3000');
})