export type CoinValue = 5 | 10 | 20 | 50 | 100;

export const CoinValuesArr = [5, 10, 20, 50, 100];
export function isCoinValue(val: number): val is CoinValue {
  return CoinValuesArr.includes(val);
}
