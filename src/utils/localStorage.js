// Test localStorage functionality
// This file demonstrates the localStorage integration

// Default splits
const defaultSplits = [
  { name: "50-50", value: [50, 50], isCustom: false },
  { name: "50-40-10", value: [50, 40, 10], isCustom: false }
];

// Function to save splits to localStorage
const saveSplitsToStorage = (splits) => {
  try {
    localStorage.setItem('splittingCalculatorSplits', JSON.stringify(splits));
    console.log('Splits saved to localStorage:', splits);
    return true;
  } catch (error) {
    console.error('Error saving to localStorage:', error);
    return false;
  }
};

// Function to load splits from localStorage
const loadSplitsFromStorage = () => {
  try {
    const saved = localStorage.getItem('splittingCalculatorSplits');
    if (saved) {
      const parsed = JSON.parse(saved);
      console.log('Splits loaded from localStorage:', parsed);
      return parsed;
    }
  } catch (error) {
    console.error('Error loading from localStorage:', error);
  }
  console.log('Using default splits');
  return defaultSplits;
};

// Example usage:
// const splits = loadSplitsFromStorage();
// saveSplitsToStorage([...splits, { name: "33-33-34", value: [33, 33, 34], isCustom: true }]);

export { saveSplitsToStorage, loadSplitsFromStorage, defaultSplits };
