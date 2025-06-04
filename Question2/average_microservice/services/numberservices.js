import { get } from 'axios';

// Mapping of identifier to respective API endpoint
const apiUrls = {
  p: 'http://20.244.56.144/evaluation-service/primes',
  f: 'http://20.244.56.144/evaluation-service/fibo',
  e: 'http://20.244.56.144/evaluation-service/even',
  r: 'http://20.244.56.144/evaluation-service/rand'
};

async function fetchNumbersById(identifier) {
  const targetUrl = apiUrls[identifier];
  if (!targetUrl) return null;

  try {
    const result = await get(targetUrl);
    return result.data.numbers || [];
  } catch (err) {
    console.error('Failed to retrieve data:', err.message);
    return [];
  }
}

export default { fetchNumbersById };
export { fetchNumbersById };
export function fetchNumbersById(identifier) {
  const targetUrl = apiUrls[identifier];
  if (!targetUrl) return null;

  return get(targetUrl)
    .then(result => result.data.numbers || [])
    .catch(err => {
      console.error('Failed to retrieve data:', err.message);
      return [];
    });
}