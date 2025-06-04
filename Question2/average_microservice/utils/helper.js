function maintainSlidingWindow(currentWindow, incomingNumbers, maxSize) {
  const freshEntries = incomingNumbers.filter(n => !currentWindow.includes(n));
  const combinedWindow = [...currentWindow, ...freshEntries];

  if (combinedWindow.length > maxSize) {
    return combinedWindow.slice(combinedWindow.length - maxSize);
  }

  return combinedWindow;
}

export default { maintainSlidingWindow };
export function maintainSlidingWindow(currentWindow, incomingNumbers, maxSize) {
  const freshEntries = incomingNumbers.filter(n => !currentWindow.includes(n));
  const combinedWindow = [...currentWindow, ...freshEntries];

  if (combinedWindow.length > maxSize) {
    return combinedWindow.slice(combinedWindow.length - maxSize);
  }

  return combinedWindow;
}