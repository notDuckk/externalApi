// Daylen F
// using external api app
// importing nessasary modules
import express from 'express';
import axios from 'axios';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.static(path.join(__dirname, 'public')));


const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));




app.get('/ticker', async (req, res) => {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ message: 'Ticker ID is required' });
  }

  try {
    console.log("hit Search");
    const response = await axios.get(`https://api.coinlore.net/api/ticker/?id=${id}`);
    console.log('searched');
    const ticker = response.data[0];

    if (ticker) {
      const tickerDeets = {
        symbol: ticker.symbol,
        name: ticker.name,
        price_usd: ticker.price_usd,
        percent_change_1h: ticker.percent_change_1h
      };
      res.json(tickerDeets);
    } else {
      res.status(404).json({ message: 'Ticker not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error fetching data' });
  }
});