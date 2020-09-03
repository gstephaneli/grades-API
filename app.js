import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { db } from './models/index.js';
import dotenv from 'dotenv'
import {gradeRouter} from './routes/gradeRouter.js'
dotenv.config()


const connectToDB = async () => {
  try {
    await db.mongoose.connect(db.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false

    });

    console.log('Connected to DB')
  } catch (error) {
    console.log('Failed to connect in DB', error)
    process.exit();
  }
};

connectToDB()

const app = express();

//define o dominio de origem para consumo do servico
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTURL,
  })
  );
  
app.use(gradeRouter)
app.get('/', (req, res) => {
  res.send('API em execucao');
});

app.listen(process.env.PORT || 8081, () => {
  console.log('API listen') 
  console.log(process.env.PORT || 8081)});
