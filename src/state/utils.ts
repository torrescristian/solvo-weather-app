export const WEATHER_API_KEY = '52f3fd4c9ca1dfab121f4bc270a3b178';

export const formatTemp = (temp: number) => Math.floor(temp) / 10;

export const formatOperator = (op: string) => op.split('_').join(' ');
