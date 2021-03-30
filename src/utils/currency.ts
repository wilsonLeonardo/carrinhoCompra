export function parseCurrency(v: string | number | any) {
  const newv = String(v);
  return parseFloat(newv.replace('R$ ', '').replace(/\./g, '').replace(',', '.'));
}

export function toCurrency(v: number) {
  const [, decimal] = v.toFixed(2).split('.');
  const x = v.toLocaleString('pt-BR');
  const y = x.split(',');
  return `R$ ${y[0]},${decimal}`;
}
