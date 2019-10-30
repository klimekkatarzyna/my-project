const apiUrl = 'https://api.exchangeratesapi.io';

export const getCurrency = (baseCurrency: string) => `${apiUrl}/latest?base=${baseCurrency}`;