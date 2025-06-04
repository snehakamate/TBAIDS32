import express from 'express';
import { fetchNumbersById } from './services/numberService';
import helper from './utils/helper';
const { maintainSlidingWindow } = helper;

const app = express();
const PORT = 9876;
const MAX_WINDOW_SIZE = 10;

let recentNumbers = [];

app.get('/numbers/:id', async (req, res) => {
  const startTime = Date.now();
  const id = req.params.id;
  const previousState = [...recentNumbers];

  try {
    const receivedNumbers = await fetchNumbersById(id);
    if (!receivedNumbers) {
      return res.status(400).json({ error: 'Invalid number ID provided.' });
    }

    recentNumbers = maintainSlidingWindow(recentNumbers, receivedNumbers, MAX_WINDOW_SIZE);
    const average = +(recentNumbers.reduce((sum, num) => sum + num, 0) / recentNumbers.length).toFixed(2);

    const responsePayload = {
      windowPrevState: previousState,
      windowCurrState: recentNumbers,
      numbers: receivedNumbers,
      avg: average
    };

    const elapsed = Date.now() - startTime;
    if (elapsed > 500) {
      console.warn('⚠️ Response time exceeded 500ms');
    }

    res.json(responsePayload);
  } catch (error) {
    console.error('Unexpected error:', error);
    res.status(500).json({ error: 'Internal server error occurred.' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Service is active at http://localhost:${PORT}`);
});
