# Quick Reference: HTML vs React Code Examples

## 1. Event Handling

### HTML (Old Way)
```html
<button onclick="convertAmount()">Convert</button>
```

### React (New Way)
```jsx
<button onClick={handleConvert}>Convert</button>
```

---

## 2. Form Inputs

### HTML (Old Way)
```html
<input type="text" id="searchCurrency" placeholder="Search..." onkeyup="filterCurrencies()">
```

### React (New Way)
```jsx
<input
  type="text"
  id="searchCurrency"
  placeholder="Search..."
  value={searchCurrency}
  onChange={(e) => setSearchCurrency(e.target.value)}
/>
```

---

## 3. State Management

### HTML (Old Way)
```javascript
// Global variables
let convertAmount = 10000;
let fromCurrency = 'USD';

// Direct DOM updates
document.getElementById('convertAmount').value = 10000;
document.getElementById('fromCurrency').value = 'USD';
```

### React (New Way)
```jsx
const [convertAmount, setConvertAmount] = useState(10000);
const [fromCurrency, setFromCurrency] = useState('USD');

// State updates trigger re-render automatically
setConvertAmount(newAmount);
setFromCurrency(newCode);
```

---

## 4. Conditional Rendering

### HTML (Old Way)
```html
<div id="conversionResult" class="result-box" style="display: none;">
  <!-- Hidden by default -->
</div>

<script>
  // JavaScript to show/hide
  document.getElementById('conversionResult').style.display = 'block';
</script>
```

### React (New Way)
```jsx
{showResult && conversionResult && (
  <div className="result-box">
    {/* Only renders when conditions are true */}
  </div>
)}
```

---

## 5. Dynamic Lists / Table Rows

### HTML (Old Way)
```javascript
function displayCurrencies(currencies) {
  const tbody = document.getElementById('currenciesTableBody');
  tbody.innerHTML = '';
  
  currencies.forEach(currency => {
    const row = tbody.insertRow();
    row.innerHTML = `
      <td>${currency.symbol}</td>
      <td>${currency.code}</td>
      ...
    `;
  });
}
```

### React (New Way)
```jsx
<tbody>
  {filteredCurrencies.map((currency) => (
    <tr key={currency.code}>
      <td className="currency-symbol">{currency.symbol}</td>
      <td className="currency-code">{currency.code}</td>
      ...
    </tr>
  ))}
</tbody>
```

---

## 6. Select Options

### HTML (Old Way)
```html
<select id="filterRegion" onchange="filterCurrencies()">
  <option value="">All Regions</option>
  <option value="Africa">Africa</option>
  <option value="Asia">Asia</option>
  <!-- More options... -->
</select>
```

### React (New Way)
```jsx
<select
  id="filterRegion"
  value={filterRegion}
  onChange={(e) => setFilterRegion(e.target.value)}
>
  <option value="">All Regions</option>
  {regions.map((region) => (
    <option key={region} value={region}>
      {region}
    </option>
  ))}
</select>
```

---

## 7. Side Effects / Initialization

### HTML (Old Way)
```javascript
document.addEventListener('DOMContentLoaded', function() {
  populateCurrencies('fromCurrency');
  populateCurrencies('toCurrency');
  displayCurrencies(CURRENCIES);
  document.querySelectorAll('.footer-year').forEach(el => {
    el.textContent = new Date().getFullYear();
  });
});
```

### React (New Way)
```jsx
useEffect(() => {
  filterCurrencies();
}, [searchCurrency, filterRegion]);

// Footer year is handled in JSX directly:
<footer className="app-footer">
  © 1994/95–{new Date().getFullYear()} Soccer Tournament Manager
</footer>
```

---

## 8. Styling

### HTML (Old Way)
```html
<style>
  button {
    padding: 12px 24px;
    background: linear-gradient(90deg, #00d4ff 0%, #0099ff 100%);
    ...
  }
</style>
```

### React (New Way)
```jsx
// Import CSS file at the top of component
import './CurrenciesPage.css';

// Use className instead of class
<button className="convert-btn">Convert</button>
```

---

## Key React Concepts Used

### useState
Manages local component state that can change over time.

```jsx
const [value, setValue] = useState(initialValue);
```

### useEffect
Runs side effects and handles component lifecycle.

```jsx
useEffect(() => {
  // Code runs when dependencies change
}, [dependency1, dependency2]);
```

### map()
Renders lists of elements dynamically.

```jsx
{items.map((item) => (
  <div key={item.id}>{item.name}</div>
))}
```

### Conditional Rendering
Shows/hides elements based on conditions.

```jsx
{condition && <Component />}
{condition ? <ComponentA /> : <ComponentB />}
```

---

## Performance Tips

1. **Use Keys in Lists**: Always add a unique `key` prop when rendering lists
2. **Dependency Arrays**: Only include dependencies that affect the effect
3. **Avoid Inline Objects**: Define objects outside JSX to prevent re-renders
4. **Use useCallback**: Memoize functions passed to child components

---

## Common Mistakes to Avoid

❌ **Don't use `id` selectors in React**
```jsx
// WRONG
document.getElementById('input').value = 'text';

// RIGHT
const [value, setValue] = useState('text');
<input value={value} onChange={(e) => setValue(e.target.value)} />
```

❌ **Don't directly manipulate the DOM**
```jsx
// WRONG
element.style.display = 'none';

// RIGHT
{condition && <Component />}
```

❌ **Don't forget keys in lists**
```jsx
// WRONG
{items.map((item) => <div>{item}</div>)}

// RIGHT
{items.map((item) => <div key={item.id}>{item}</div>)}
```

❌ **Don't use `class` instead of `className`**
```jsx
// WRONG
<div class="myclass"></div>

// RIGHT
<div className="myclass"></div>
```

---

## Testing the Component

Run the development server:
```bash
cd "C:\Users\zuman\OneDrive\Documents\Lisa Zumana Industries (LZ Inc) Software Projects\React.js projects\soccer-tournament-app-frontend"
npm run dev
```

Then navigate to the currency page in your browser. The component should:
- ✅ Display currency converter
- ✅ Allow currency conversion
- ✅ Show conversion results
- ✅ Display sortable currency table
- ✅ Filter by search and region
- ✅ Respond to all user interactions

