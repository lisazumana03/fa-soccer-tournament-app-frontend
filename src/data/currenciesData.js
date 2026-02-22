// Complete list of world currencies (ISO 4217)
export const CURRENCIES = [
  // Africa
  { code: 'ZAR', symbol: 'R', name: 'South African Rand', rate: 0.055, region: 'Africa' },
  { code: 'EGP', symbol: '£', name: 'Egyptian Pound', rate: 0.021, region: 'Africa' },
  { code: 'NGN', symbol: '₦', name: 'Nigerian Naira', rate: 0.00064, region: 'Africa' },
  { code: 'GHS', symbol: '₵', name: 'Ghanaian Cedi', rate: 0.063, region: 'Africa' },
  { code: 'KES', symbol: 'Sh', name: 'Kenyan Shilling', rate: 0.0077, region: 'Africa' },
  { code: 'MAD', symbol: 'د.م.', name: 'Moroccan Dirham', rate: 0.10, region: 'Africa' },
  { code: 'TND', symbol: 'د.ت', name: 'Tunisian Dinar', rate: 0.32, region: 'Africa' },
  { code: 'UGX', symbol: 'Sh', name: 'Ugandan Shilling', rate: 0.00027, region: 'Africa' },
  { code: 'ETB', symbol: 'Br', name: 'Ethiopian Birr', rate: 0.0079, region: 'Africa' },
  { code: 'DZD', symbol: 'د.ج', name: 'Algerian Dinar', rate: 0.0075, region: 'Africa' },
  { code: 'ZWL', symbol: 'Z$', name: 'Zimbabwean Dollar', rate: 0.0013, region: 'Africa' },
  { code: 'RWF', symbol: 'Fr', name: 'Rwandan Franc', rate: 0.00078, region: 'Africa' },
  { code: 'BWP', symbol: 'P', name: 'Botswana Pula', rate: 0.073, region: 'Africa' },
  { code: 'SOS', symbol: 'Sh', name: 'Somali Shilling', rate: 0.0056, region: 'Africa' },

  // Asia
  { code: 'INR', symbol: '₹', name: 'Indian Rupee', rate: 0.012, region: 'Asia' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen', rate: 0.0068, region: 'Asia' },
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan', rate: 0.137, region: 'Asia' },
  { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar', rate: 0.74, region: 'Asia' },
  { code: 'HKD', symbol: 'HK$', name: 'Hong Kong Dollar', rate: 0.128, region: 'Asia' },
  { code: 'THB', symbol: '฿', name: 'Thai Baht', rate: 0.028, region: 'Asia' },
  { code: 'MYR', symbol: 'RM', name: 'Malaysian Ringgit', rate: 0.21, region: 'Asia' },
  { code: 'PHP', symbol: '₱', name: 'Philippine Peso', rate: 0.017, region: 'Asia' },
  { code: 'IDR', symbol: 'Rp', name: 'Indonesian Rupiah', rate: 0.000062, region: 'Asia' },
  { code: 'VND', symbol: '₫', name: 'Vietnamese Dong', rate: 0.000039, region: 'Asia' },
  { code: 'KRW', symbol: '₩', name: 'South Korean Won', rate: 0.00074, region: 'Asia' },
  { code: 'AED', symbol: 'د.إ', name: 'United Arab Emirates Dirham', rate: 0.272, region: 'Asia' },
  { code: 'SAR', symbol: '﷼', name: 'Saudi Riyal', rate: 0.266, region: 'Asia' },
  { code: 'PKR', symbol: '₨', name: 'Pakistani Rupee', rate: 0.0036, region: 'Asia' },
  { code: 'BDT', symbol: '৳', name: 'Bangladeshi Taka', rate: 0.0095, region: 'Asia' },
  { code: 'LKR', symbol: 'Rs', name: 'Sri Lankan Rupee', rate: 0.0031, region: 'Asia' },
  { code: 'MMK', symbol: 'K', name: 'Myanmar Kyat', rate: 0.00048, region: 'Asia' },
  { code: 'KZT', symbol: '₸', name: 'Kazakhstani Tenge', rate: 0.0021, region: 'Asia' },
  { code: 'UZS', symbol: 'сўм', name: 'Uzbekistani Som', rate: 0.000078, region: 'Asia' },
  { code: 'TJS', symbol: 'ЅМ', name: 'Tajikistani Somoni', rate: 0.094, region: 'Asia' },
  { code: 'KGS', symbol: 'с', name: 'Kyrgyzstani Som', rate: 0.0112, region: 'Asia' },
  { code: 'MVR', symbol: 'Rf', name: 'Maldivian Rufiyaa', rate: 0.065, region: 'Asia' },
  { code: 'BND', symbol: 'B$', name: 'Brunei Dollar', rate: 0.74, region: 'Asia' },
  { code: 'KHR', symbol: '៛', name: 'Cambodian Riel', rate: 0.00039, region: 'Asia' },

  // Europe
  { code: 'EUR', symbol: '€', name: 'Euro', rate: 1.087, region: 'Europe' },
  { code: 'GBP', symbol: '£', name: 'British Pound', rate: 1.265, region: 'Europe' },
  { code: 'CHF', symbol: 'Fr', name: 'Swiss Franc', rate: 1.107, region: 'Europe' },
  { code: 'SEK', symbol: 'kr', name: 'Swedish Krona', rate: 0.092, region: 'Europe' },
  { code: 'NOK', symbol: 'kr', name: 'Norwegian Krone', rate: 0.092, region: 'Europe' },
  { code: 'DKK', symbol: 'kr', name: 'Danish Krone', rate: 0.146, region: 'Europe' },
  { code: 'PLN', symbol: 'zł', name: 'Polish Zloty', rate: 0.248, region: 'Europe' },
  { code: 'CZK', symbol: 'Kč', name: 'Czech Koruna', rate: 0.042, region: 'Europe' },
  { code: 'HUF', symbol: 'Ft', name: 'Hungarian Forint', rate: 0.0027, region: 'Europe' },
  { code: 'RON', symbol: 'lei', name: 'Romanian Leu', rate: 0.21, region: 'Europe' },
  { code: 'BGN', symbol: 'лв', name: 'Bulgarian Lev', rate: 0.555, region: 'Europe' },
  { code: 'HRK', symbol: 'kn', name: 'Croatian Kuna', rate: 0.145, region: 'Europe' },
  { code: 'RSD', symbol: 'дин.', name: 'Serbian Dinar', rate: 0.0093, region: 'Europe' },
  { code: 'UAH', symbol: '₴', name: 'Ukrainian Hryvnia', rate: 0.025, region: 'Europe' },
  { code: 'BYN', symbol: 'Br', name: 'Belarusian Ruble', rate: 0.31, region: 'Europe' },
  { code: 'RUB', symbol: '₽', name: 'Russian Ruble', rate: 0.011, region: 'Europe' },
  { code: 'ISK', symbol: 'kr', name: 'Icelandic Króna', rate: 0.0072, region: 'Europe' },

  // Americas
  { code: 'USD', symbol: '$', name: 'United States Dollar', rate: 1.0, region: 'Americas' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar', rate: 0.71, region: 'Americas' },
  { code: 'MXN', symbol: '$', name: 'Mexican Peso', rate: 0.059, region: 'Americas' },
  { code: 'BRL', symbol: 'R$', name: 'Brazilian Real', rate: 0.20, region: 'Americas' },
  { code: 'ARS', symbol: '$', name: 'Argentine Peso', rate: 0.0104, region: 'Americas' },
  { code: 'CLP', symbol: '$', name: 'Chilean Peso', rate: 0.0011, region: 'Americas' },
  { code: 'COP', symbol: '$', name: 'Colombian Peso', rate: 0.00026, region: 'Americas' },
  { code: 'PEN', symbol: 'S/', name: 'Peruvian Sol', rate: 0.27, region: 'Americas' },
  { code: 'UYU', symbol: '$U', name: 'Uruguayan Peso', rate: 0.025, region: 'Americas' },
  { code: 'VEF', symbol: 'Bs.', name: 'Venezuelan Bolívar', rate: 0.000000021, region: 'Americas' },
  { code: 'JMD', symbol: 'J$', name: 'Jamaican Dollar', rate: 0.0065, region: 'Americas' },
  { code: 'TTD', symbol: 'TT$', name: 'Trinidad and Tobago Dollar', rate: 0.148, region: 'Americas' },
  { code: 'DOP', symbol: 'RD$', name: 'Dominican Peso', rate: 0.0173, region: 'Americas' },
  { code: 'HTG', symbol: 'G', name: 'Haitian Gourde', rate: 0.0077, region: 'Americas' },

  // Oceania
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', rate: 0.64, region: 'Oceania' },
  { code: 'NZD', symbol: 'NZ$', name: 'New Zealand Dollar', rate: 0.59, region: 'Oceania' },
  { code: 'FJD', symbol: 'FJ$', name: 'Fijian Dollar', rate: 0.45, region: 'Oceania' },
  { code: 'WST', symbol: 'T', name: 'Samoan Tala', rate: 0.36, region: 'Oceania' },
  { code: 'VUV', symbol: 'Vt', name: 'Vanuatu Vatu', rate: 0.0084, region: 'Oceania' },
  { code: 'XPF', symbol: '₣', name: 'CFP Franc', rate: 0.0092, region: 'Oceania' },
  { code: 'PGK', symbol: 'K', name: 'Papua New Guinean Kina', rate: 0.28, region: 'Oceania' },

  // Special codes
  { code: 'XXX', symbol: '', name: 'No currency', rate: 0, region: 'Special' },
];

/**
 * Convert amount from one currency to another
 */
export function convertCurrency(amount, fromCode, toCode) {
  const fromCurrency = getCurrency(fromCode);
  const toCurrency = getCurrency(toCode);

  if (!fromCurrency || !toCurrency) {
    return null;
  }

  // Convert to USD first, then to target currency
  const amountInUSD = amount / fromCurrency.rate;
  const result = amountInUSD * toCurrency.rate;

  return result;
}

/**
 * Get a specific currency by code
 */
export function getCurrency(code) {
  return CURRENCIES.find((c) => c.code === code);
}

/**
 * Get all currencies for a specific region
 */
export function getCurrenciesByRegion(region) {
  return CURRENCIES.filter((c) => c.region === region && c.code !== 'XXX');
}

/**
 * Get all unique regions
 */
export function getRegions() {
  const regions = new Set();
  CURRENCIES.forEach((c) => {
    if (c.code !== 'XXX') {
      regions.add(c.region);
    }
  });
  return Array.from(regions);
}

