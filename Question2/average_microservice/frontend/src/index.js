import express from 'express';
import cors from 'cors';
import { fetchNumbers } from './services/numberService';

const app = express();
const PORT = 9876;

// Enable CORS for React frontend
app.use(cors());

// In-memory sliding window of unique numbers (last 10)
let windowCurrState = [];

// API route to get numbers of a specific type
app.get('/numbers/:type', async (req, res) => {
  const type = req.params.type;

  try {
    const newNumbers = await fetchNumbers(type);

    const windowPrevState = [...windowCurrState];

    // Add new unique numbers to the window
    newNumbers.forEach((num) => {
      if (!windowCurrState.includes(num)) {
        windowCurrState.push(num);
        if (windowCurrState.length > 10) {
          windowCurrState.shift(); // maintain sliding window of max 10
        }
      }
    });

    const avg =
      windowCurrState.reduce((sum, val) => sum + val, 0) / windowCurrState.length || 0;

    res.json({
      windowPrevState,
      windowCurrState,
      numbers: newNumbers,
      avg: parseFloat(avg.toFixed(2)),
    });
  } catch (err) {
    console.error('Error fetching numbers:', err.message);
    res.status(500).json({ error: 'Failed to fetch numbers from third-party API' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
