# Splitting Calculator 🧮

A modern, responsive React-based bill splitting calculator that makes dividing expenses fair and simple. Whether you're splitting restaurant bills, shared purchases, or group expenses, this tool provides accurate calculations with real-time validation.

## ✨ Features

- **Fully Customizable Split Ratios**: Create, edit, and delete any split ratios including defaults
- **Flexible Input Format**: Enter percentages separated by commas, spaces, hyphens, or any combination
- **Real-time Validation**: Live feedback showing current sum and remaining amount to reach 100%
- **Smart Error Prevention**: Visual indicators and detailed error messages prevent invalid splits
- **Complete Data Persistence**: All splits (including modified defaults) are saved to localStorage
- **Real-time Calculations**: Instant updates as you enter amounts
- **Currency Formatting**: Professional USD currency display
- **Precision Validation**: Shows both rounded and exact calculations with difference indicators
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Interactive UI**: Animated typing effects and intuitive Bootstrap-based interface
- **Visual Feedback**: Color-coded indicators for calculation accuracy and validation status

## 🚀 Quick Start

### Prerequisites

- Node.js (version 18.0.0 or higher) - Required for Vercel deployment
- npm (version 8.0.0 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Perezented/spliting_calculator.git
   cd SplittingCalculator
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

## 🔧 Available Scripts

### `npm start`
Runs the app in development mode with hot reloading enabled.

### `npm test`
Launches the test runner in interactive watch mode.

### `npm run build`
Builds the app for production to the `build` folder with optimized performance.

### `npm run eject`
**⚠️ Note: This is a one-way operation!**

Removes the single build dependency and copies all configuration files for full customization control.

## 🎯 How to Use

1. **Select Split Ratio**: Choose from existing splits or create your own custom ratios
2. **Manage Custom Splits**: Click the "Manage" button to add, edit, or delete split ratios
3. **Enter Total Amount**: Input the bill amount (supports up to 2 decimal places)
4. **View Results**: See both clean currency formatting and precise calculations
5. **Validation Check**: Green indicators show when numbers match perfectly

### Creating Custom Splits

1. Click the **"Manage Split Ratios"** button next to the split ratio buttons
2. In the modal, you can:
   - **Edit any existing split** (including the defaults like 50-50)
   - **Delete any split** by clicking the trash icon
   - **Add new splits** using the form at the bottom

#### Adding/Editing Splits:
- **Name**: Enter a descriptive name (e.g., "60-30-10", "Equal 4-way")
- **Percentages**: Enter values separated by:
  - Commas: `60, 30, 10`
  - Spaces: `60 30 10`
  - Hyphens: `60-30-10`
  - Mixed: `60, 30-10` (any combination works)

#### Live Validation:
- ✅ **Real-time feedback** shows current sum and remaining amount
- 🎯 **Must sum to exactly 100%** - you'll see how much is remaining
- ⚡ **Instant validation** with color-coded indicators
- 🔒 **Save protection** - invalid splits can't be saved

**Example valid formats:**
- `50 50` (two-way split)
- `33.33, 33.33, 33.34` (precise three-way)
- `25-25-25-25` (four-way equal)
- `60 20 15 5` (weighted split)

All splits are automatically saved and persist between sessions.

## 🛠️ Technology Stack

- **React 18.2.0** - Modern React with hooks
- **Bootstrap 5.1.3** - Responsive UI framework
- **React Bootstrap 2.4.0** - Bootstrap components for React
- **FontAwesome** - Professional icons
- **Typed.js** - Animated typing effects
- **React Compare Slider** - Interactive comparison components

## 📁 Project Structure

```
src/
├── components/
│   ├── CompareSlider.jsx      # Visual comparison component
│   ├── NumbersDoNotMatch.jsx  # Validation warning display
│   ├── NumbersMatch.jsx       # Success validation display
│   ├── SplitManager.jsx       # Custom split ratio management
│   └── SplitTable.jsx         # Main calculation table
├── images/                    # Application images
├── App.js                     # Main application component
└── App.css                    # Styling
```

## 🎨 Key Components

- **SplitTable**: Displays percentage splits with clean and precise calculations
- **SplitManager**: Modal interface for creating, editing, and managing custom split ratios
- **NumbersMatch/NumbersDoNotMatch**: Visual feedback for calculation accuracy
- **CompareSlider**: Interactive comparison visualization
- **Dynamic Typing**: Engaging animated text effects
- **localStorage Integration**: Persistent storage for custom split configurations

## 🔍 Development Features

- **Hot Reloading**: Instant updates during development
- **ESLint Integration**: Code quality enforcement
- **Responsive Design**: Mobile-first approach
- **Accessibility**: WCAG-compliant interface elements

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the terms specified in the [LICENSE](LICENSE) file.

## 🙋‍♀️ About the splitting calculator

This calculator is designed to make bill splitting fair, fast, and stress-free. Perfect for:
- Restaurant bills with friends
- Shared household expenses
- Group purchases
- Travel cost splitting
- Any scenario requiring proportional expense division

---

*Built with ❤️ using Create React App*
