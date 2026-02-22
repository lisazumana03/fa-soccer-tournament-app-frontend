# React Component Architecture

## File Structure
```
soccer-tournament-app-frontend/
├── src/
│   ├── components/
│   │   ├── CurrenciesPage.jsx      ← Main component (UI + Logic)
│   │   └── CurrenciesPage.css      ← Styling
│   ├── data/
│   │   └── currenciesData.js       ← Data layer (140 currencies + helpers)
│   ├── App.jsx                      ← Routes to CurrenciesPage
│   └── main.jsx
├── HTML_TO_REACT_CONVERSION.md      ← Full conversion details
└── REACT_COMPARISON.md              ← Code examples
```

## Component Flow Diagram

```
App.jsx
  │
  └─→ CurrenciesPage.jsx
        │
        ├─→ imports from currenciesData.js
        │     └─ CURRENCIES array (70+ currencies)
        │     └─ convertCurrency() function
        │     └─ getCurrenciesByRegion() function
        │     └─ getRegions() function
        │
        └─→ renders UI sections:
              ├─ currencies-header
              ├─ intro-card
              ├─ stats
              ├─ converter-section
              │   ├─ convertAmount input
              │   ├─ fromCurrency select
              │   ├─ toCurrency select
              │   ├─ Convert button
              │   └─ result-box (conditional)
              ├─ currencies-table
              │   ├─ searchCurrency input
              │   ├─ filterRegion select
              │   └─ table with filteredCurrencies
              └─ app-footer
```

## State Management

```
CurrenciesPage Component State:

┌─────────────────────────────────────────────────┐
│        Converter Form State                      │
├─────────────────────────────────────────────────┤
│ convertAmount    : number  (default: 10000)    │
│ fromCurrency     : string  (default: 'USD')    │
│ toCurrency       : string  (default: 'EUR')    │
│ conversionResult : object  (null until converted)
│ showResult       : boolean (false until converted)
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│        Filter & Search State                    │
├─────────────────────────────────────────────────┤
│ searchCurrency   : string  (default: '')       │
│ filterRegion     : string  (default: '')       │
│ filteredCurrencies : array (updated by useEffect)
└─────────────────────────────────────────────────┘
```

## Data Flow

```
User Input
    ↓
Event Handler (onChange, onClick, onKeyPress)
    ↓
setState() call
    ↓
React re-renders component
    ↓
useEffect hook runs (if dependencies changed)
    ↓
DOM updates (React Virtual DOM)
    ↓
Browser renders updated UI
    ↓
User sees changes
```

## Example: Currency Conversion Flow

```
User enters amount "5000"
    ↓
onChange event → setConvertAmount(5000)
    ↓
convertAmount state updates
    ↓
Component re-renders
    ↓
User selects "EUR" from dropdown
    ↓
onChange event → setToCurrency('EUR')
    ↓
toCurrency state updates
    ↓
Component re-renders
    ↓
User clicks "Convert" button
    ↓
onClick event → handleConvert()
    ↓
convertCurrency(5000, 'USD', 'EUR') called
    ↓
setConversionResult({...})
    ↓
setShowResult(true)
    ↓
Component re-renders
    ↓
Result box appears with "5435.00"
```

## Example: Filter Flow

```
User types "euro" in search box
    ↓
onChange event → setSearchCurrency('euro')
    ↓
searchCurrency state updates
    ↓
useEffect dependency [searchCurrency] triggered
    ↓
filterCurrencies() called
    ↓
CURRENCIES.filter() applied
    ↓
setFilteredCurrencies() called
    ↓
Component re-renders with 1 result: "Euro"
```

## Hooks Used

### useState
```jsx
const [state, setState] = useState(initialValue);
// Returns: [currentValue, functionToUpdateValue]
```
Used for: convertAmount, fromCurrency, toCurrency, etc.

### useEffect
```jsx
useEffect(() => {
  // This code runs when component mounts or dependencies change
}, [dependency1, dependency2]);
```
Used for: Updating filteredCurrencies when search/filter changes

## Component Lifecycle

```
Component Mount
    ↓
useState hooks initialize with default values
    ↓
useEffect runs (because component just mounted)
    ↓
filterCurrencies() called
    ↓
setFilteredCurrencies() called
    ↓
Component renders
    ↓
Component Rendered (interactive)
    ↓
User interacts (click, type, etc.)
    ↓
Event handler fires
    ↓
setState() updates state
    ↓
Re-render triggered
    ↓
useEffect runs again (if dependencies changed)
    ↓
Updated component rendered
    ↓ (repeat until user leaves page)
Component Unmount
```

## Why React Instead of HTML?

### Problem with HTML/Vanilla JS:
```javascript
// Messy global state
let convertAmount = 10000;
let fromCurrency = 'USD';
let toCurrency = 'EUR';

// Error-prone DOM manipulation
document.getElementById('result').style.display = 'block';
document.getElementById('resultValue').textContent = '5435.00';

// Hard to track where changes happen
function updateFilter() {
  const searchTerm = document.getElementById('search').value;
  const filtered = CURRENCIES.filter(c => 
    c.name.toLowerCase().includes(searchTerm)
  );
  renderTable(filtered);
}
```

### Solution with React:
```jsx
// Clear state management
const [convertAmount, setConvertAmount] = useState(10000);
const [fromCurrency, setFromCurrency] = useState('USD');
const [toCurrency, setToCurrency] = useState('EUR');

// Declarative rendering
{showResult && <div className="result-box">{result}</div>}

// Automatic sync with useEffect
useEffect(() => {
  filterCurrencies();
}, [searchCurrency, filterRegion]);
```

Benefits:
✅ Less code
✅ Easier to debug
✅ Automatic re-renders
✅ Better performance (Virtual DOM)
✅ Composable components
✅ Testable logic

## Reusability

This component can be easily reused in other projects:

```jsx
// In a different React app:
import CurrenciesPage from './CurrenciesPage';

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <CurrenciesPage />
    </div>
  );
}
```

The component is self-contained and doesn't depend on external state or global variables.

## Extension Points

To extend this component:

### 1. Add Redux for global state
```jsx
import { useDispatch, useSelector } from 'react-redux';

const dispatch = useDispatch();
const currencies = useSelector(state => state.currencies);
```

### 2. Add Context API for theme
```jsx
import { useContext } from 'react';
import { ThemeContext } from './ThemeProvider';

const theme = useContext(ThemeContext);
```

### 3. Add custom hooks
```jsx
function useCurrencyConverter() {
  // Encapsulate conversion logic
  return { convertCurrency, result };
}
```

### 4. Add TypeScript
```typescript
interface Currency {
  code: string;
  symbol: string;
  name: string;
  rate: number;
  region: string;
}

const handleConvert = (amount: number, from: string, to: string): void => {
  // Logic here
};
```

---

## Quick Checklist: Is Your Component Rendering?

- [ ] Files created successfully?
  - [ ] `src/data/currenciesData.js`
  - [ ] `src/components/CurrenciesPage.jsx`
  - [ ] `src/components/CurrenciesPage.css`

- [ ] Imports working?
  - [ ] `import { useState, useEffect } from 'react'`
  - [ ] `import { CURRENCIES, ... } from '../data/currenciesData'`
  - [ ] `import './CurrenciesPage.css'`

- [ ] Component exported?
  - [ ] `export default function CurrenciesPage()`

- [ ] Route registered?
  - [ ] Check `App.jsx` has route to `/currency`

- [ ] Dev server running?
  - [ ] `npm run dev`

- [ ] No console errors?
  - [ ] Open browser DevTools (F12)
  - [ ] Check Console tab

If all checks pass, your component should be fully functional! 🎉

