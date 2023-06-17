import { Pipe, PipeTransform } from '@angular/core';

interface ExchangeRates {
  [key: string]: number;
}

@Pipe({
  name: 'currencyConversion'
})
export class CurrencyConversionPipe implements PipeTransform {
  transform(value: number, currency: string): string {
    const exchangeRates: ExchangeRates = {
      PLN: 1,
      EUR: 0.23,
      USD: 0.27
    };

    if (exchangeRates[currency]) {
      const convertedValue = value * exchangeRates[currency];
      return convertedValue.toString();
    }

    return value.toString();
  }
}
