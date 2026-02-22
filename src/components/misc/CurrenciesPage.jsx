import { useEffect, useState } from 'react';
import {
  CURRENCIES,
  convertCurrency,
  getCurrenciesByRegion,
  getRegions
} from '../../data/currenciesData';
import './CurrenciesPage.css';
const EXCHANGE_API_URL = 'https://open.er-api.com/v6/latest/USD'; // Free public API

export default function CurrenciesPage() {
  const [convertAmount, setConvertAmount] = useState(10000);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [conversionResult, setConversionResult] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [searchCurrency, setSearchCurrency] = useState('');
  const [filterRegion, setFilterRegion] = useState('');
  const [filteredCurrencies, setFilteredCurrencies] = useState([]);
  const [liveRates, setLiveRates] = useState(null);
  const [ratesError, setRatesError] = useState(null);

  // Fetch daily exchange rates on mount
  useEffect(() => {
    fetch(EXCHANGE_API_URL)
      .then(res => res.json())
      .then(data => {
        if (data && data.rates) {
          setLiveRates(data.rates);
        } else {
          setRatesError('Failed to fetch live rates.');
        }
      })
      .catch(() => setRatesError('Failed to fetch live rates.'));
  }, []);

  // Initialize filtered currencies on mount and when filters change
  useEffect(() => {
    filterCurrencies();
  }, [searchCurrency, filterRegion, liveRates]);

  // Perform currency conversion using live rates if available
  const handleConvert = () => {
    if (!convertAmount || !fromCurrency || !toCurrency) {
      alert('Please fill in all fields');
      return;
    }

    let result = null;
    let exchangeRate = null;
    if (liveRates && liveRates[fromCurrency] && liveRates[toCurrency]) {
      // Convert fromCurrency to USD, then USD to toCurrency
      const amountInUSD = convertAmount / liveRates[fromCurrency];
      result = amountInUSD * liveRates[toCurrency];
      exchangeRate = liveRates[toCurrency] / liveRates[fromCurrency];
    } else {
      // Fallback to static rates
      result = convertCurrency(convertAmount, fromCurrency, toCurrency);
      exchangeRate = convertCurrency(1, fromCurrency, toCurrency);
    }
    if (result !== null) {
      setConversionResult({
        result: result.toFixed(2),
        exchangeRate: exchangeRate.toFixed(6),
        from: fromCurrency,
        to: toCurrency,
      });
      setShowResult(true);
    }
  };

  // Handle Enter key in input fields
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleConvert();
    }
  };

  // Filter currencies based on search and region, update rates if liveRates available
  const filterCurrencies = () => {
    let filtered = CURRENCIES.filter((c) => {
      const matchesSearch =
        searchCurrency === '' ||
        c.name.toLowerCase().includes(searchCurrency.toLowerCase()) ||
        c.code.toLowerCase().includes(searchCurrency.toLowerCase());
      return matchesSearch && c.code !== 'XXX';
    });

    if (filterRegion) {
      const regionCurrencies = getCurrenciesByRegion(filterRegion);
      filtered = filtered.filter((c) =>
        regionCurrencies.find((rc) => rc.code === c.code)
      );
    }

    // If liveRates, update rates for display
    if (liveRates) {
      filtered = filtered.map((c) => {
        if (liveRates[c.code]) {
          return { ...c, rate: liveRates[c.code] };
        }
        return c;
      });
    }

    setFilteredCurrencies(
      filtered.sort((a, b) => a.name.localeCompare(b.name))
    );
  };

  const regions = getRegions();
  const currencyOptions = CURRENCIES.filter((c) => c.code !== 'XXX');

  return (
    <div className="currencies-page">
      {/* Header */}
      <div className="currencies-header">
        <h1>💱 Currency Reference</h1>
        <p>
          Comprehensive guide to 180 official world currencies for transfer fees
          and international transactions
        </p>
        {ratesError && (
          <div style={{color: 'red', fontSize: '14px', marginTop: '8px'}}>Live rates unavailable, using static rates.</div>
        )}
        {liveRates && (
          <div style={{color: 'lime', fontSize: '14px', marginTop: '8px'}}>Live rates updated daily from open.er-api.com</div>
        )}
      </div>

      <main className="currencies-main">
        {/* Overview Section */}
        <section className="intro-card">
          <h2>📋 About This Currency System</h2>
          <p>
            The Soccer Tournament Manager supports all <strong>180 official world currencies</strong> for
            handling transfer fees, player contracts, and international
            transactions. Each currency includes its ISO 4217 code, symbol, and
            current exchange rates for accurate conversions.
          </p>
          <p>
            Exchange rates are updated daily from a public API and used for converting
            transfer fees between different currencies. All rates are relative
            to the US Dollar (USD) as the base currency.
          </p>
          <div className="features-grid">
            <div className="feature-box">
              <strong>✅ 180 Currencies</strong>
              <br />
              All official currencies recognized by international standards (ISO
              4217)
            </div>
            <div className="feature-box">
              <strong>📊 Real Exchange Rates</strong>
              <br />
              Based on current market rates updated daily
            </div>
            <div className="feature-box">
              <strong>🔄 Instant Conversion</strong>
              <br />
              Automatically convert transfer fees between any two currencies
            </div>
            <div className="feature-box">
              <strong>🌍 Global Support</strong>
              <br />
              Covers Africa, Asia, Europe, Americas, and Oceania
            </div>
          </div>
        </section>

        {/* Statistics */}
        <section className="stats">
          <div className="stat-card">
            <div className="stat-value">180</div>
            <div className="stat-label">Official Currencies</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">5</div>
            <div className="stat-label">Regions Covered</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">195</div>
            <div className="stat-label">Countries Supported</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">24/7</div>
            <div className="stat-label">Conversion Available</div>
          </div>
        </section>

        {/* Currency Converter */}
        <section className="converter-section">
          <h2>💰 Currency Converter</h2>
          <div className="converter-grid">
            <div>
              <label htmlFor="convertAmount">Amount</label>
              <input
                type="number"
                id="convertAmount"
                placeholder="10000"
                value={convertAmount}
                onChange={(e) => setConvertAmount(parseFloat(e.target.value))}
                onKeyPress={handleKeyPress}
              />
            </div>
            <div>
              <label htmlFor="fromCurrency">From</label>
              <select
                id="fromCurrency"
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
              >
                <option value="">-- Select Currency --</option>
                {currencyOptions.map((currency) => (
                  <option key={currency.code} value={currency.code}>
                    {currency.code} - {currency.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="toCurrency">To</label>
              <select
                id="toCurrency"
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
              >
                <option value="">-- Select Currency --</option>
                {currencyOptions.map((currency) => (
                  <option key={currency.code} value={currency.code}>
                    {currency.code} - {currency.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button onClick={handleConvert}>Convert</button>
          {showResult && conversionResult && (
            <div className="result-box">
              <div style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Conversion Result
              </div>
              <div className="result-value">{conversionResult.result}</div>
              <div style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '12px' }}>
                {convertAmount.toFixed(2)} {conversionResult.from} ={' '}
                {conversionResult.result} {conversionResult.to}
                <br />
                <small>
                  1 {conversionResult.from} = {conversionResult.exchangeRate}{' '}
                  {conversionResult.to}
                </small>
              </div>
            </div>
          )}
        </section>

        {/* Currencies Table */}
        <section className="currencies-table">
          <h2>📋 Complete Currency List</h2>
          <div className="filter-controls">
            <div>
              <label htmlFor="searchCurrency">Search Currency</label>
              <input
                type="text"
                id="searchCurrency"
                placeholder="Search by name or code..."
                value={searchCurrency}
                onChange={(e) => setSearchCurrency(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="filterRegion">Filter by Region</label>
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
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th>Symbol</th>
                <th>Code</th>
                <th>Currency Name</th>
                <th>Exchange Rate (USD)</th>
              </tr>
            </thead>
            <tbody>
              {filteredCurrencies.map((currency) => (
                <tr key={currency.code}>
                  <td className="currency-symbol">{currency.symbol}</td>
                  <td className="currency-code">{currency.code}</td>
                  <td>{currency.name}</td>
                  <td className="exchange-rate">{currency.rate.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>

      {/* Footer */}
      <footer className="app-footer">
        © 1994/95–{new Date().getFullYear()} Soccer Tournament Manager
      </footer>
    </div>
  );
}
