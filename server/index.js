import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import axios from 'axios';
import https from 'https';

import Database from './src/config/database.js';
import mainRouter from './router.js';

dotenv.config();
const app = express();
const { PORT = 3001, MONGO_URL, ELASTIC_USER, ELASTIC_PASSWORD} = process.env;
const httpsAgent = new https.Agent({ rejectUnauthorized: false });
const authString = Buffer.from(`${ELASTIC_USER}:${ELASTIC_PASSWORD}`).toString('base64');

const db = new Database(MONGO_URL);
db.open();

app.use(express.json());
app.use(cors());
app.use('/api', mainRouter);

app.get('/get-elasticsearch-data', async (req, res) => {
  try {
    const response = await axios.get('https://localhost:9200/type_search/_search', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${authString}`
      },
      httpsAgent
    });

    res.status(response.status).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching data from Elasticsearch' });
  }
});

app.listen(PORT, () => console.log(`server running on port: `, PORT));