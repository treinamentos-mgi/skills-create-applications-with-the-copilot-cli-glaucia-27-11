const {
  addition: add,
  subtraction: subtract,
  multiplication: multiply,
  division: divide,
  modulo,
  power,
  squareRoot,
} = require('../calculator');

describe('add', () => {
  test('2 + 3 = 5', () => expect(add(2, 3)).toBe(5));
  test('números negativos', () => expect(add(-2, -3)).toBe(-5));
  test('positivo + negativo', () => expect(add(5, -8)).toBe(-3));
  test('zero é elemento neutro', () => expect(add(7, 0)).toBe(7));
  test('decimais', () => expect(add(0.1, 0.2)).toBeCloseTo(0.3));
  test('números grandes', () => expect(add(1e15, 1e15)).toBe(2e15));
});

describe('subtract', () => {
  test('10 - 4 = 6', () => expect(subtract(10, 4)).toBe(6));
  test('resultado negativo', () => expect(subtract(4, 10)).toBe(-6));
  test('números negativos', () => expect(subtract(-5, -3)).toBe(-2));
  test('subtrair zero', () => expect(subtract(9, 0)).toBe(9));
  test('decimais', () => expect(subtract(0.3, 0.1)).toBeCloseTo(0.2));
});

describe('multiply', () => {
  test('45 * 2 = 90', () => expect(multiply(45, 2)).toBe(90));
  test('multiplicar por zero', () => expect(multiply(123, 0)).toBe(0));
  test('multiplicar por um', () => expect(multiply(8, 1)).toBe(8));
  test('sinais diferentes', () => expect(multiply(-3, 4)).toBe(-12));
  test('dois negativos', () => expect(multiply(-3, -4)).toBe(12));
  test('decimais', () => expect(multiply(0.5, 0.5)).toBeCloseTo(0.25));
});

describe('divide', () => {
  test('20 / 5 = 4', () => expect(divide(20, 5)).toBe(4));
  test('resultado decimal', () => expect(divide(1, 4)).toBe(0.25));
  test('sinais diferentes', () => expect(divide(-10, 2)).toBe(-5));
  test('dois negativos', () => expect(divide(-10, -2)).toBe(5));
  test('zero dividido por número', () => expect(divide(0, 5)).toBe(0));
  test('divisão por zero lança erro', () => {
    expect(() => divide(10, 0)).toThrow('Divisão por zero não é permitida.');
  });
  test('0 / 0 lança erro', () => {
    expect(() => divide(0, 0)).toThrow();
  });
});

describe('modulo', () => {
  test('5 % 2 = 1', () => expect(modulo(5, 2)).toBe(1));
  test('divisão exata resulta em 0', () => expect(modulo(10, 5)).toBe(0));
  test('dividendo menor que divisor', () => expect(modulo(2, 5)).toBe(2));
  test('dividendo negativo mantém o sinal', () => expect(modulo(-5, 3)).toBe(-2));
  test('divisor negativo', () => expect(modulo(5, -3)).toBe(2));
  test('decimais', () => expect(modulo(5.5, 2)).toBeCloseTo(1.5));
  test('zero módulo número', () => expect(modulo(0, 5)).toBe(0));
  test('módulo por zero lança erro', () => {
    expect(() => modulo(5, 0)).toThrow('Módulo por zero não é permitido.');
  });
});

describe('power', () => {
  test('2 ^ 3 = 8', () => expect(power(2, 3)).toBe(8));
  test('expoente zero resulta em 1', () => expect(power(5, 0)).toBe(1));
  test('expoente um resulta na base', () => expect(power(7, 1)).toBe(7));
  test('expoente negativo', () => expect(power(2, -2)).toBe(0.25));
  test('base negativa com expoente par', () => expect(power(-2, 2)).toBe(4));
  test('base negativa com expoente ímpar', () => expect(power(-2, 3)).toBe(-8));
  test('expoente fracionário (raiz)', () => expect(power(9, 0.5)).toBe(3));
  test('0 ^ 0 = 1', () => expect(power(0, 0)).toBe(1));
  test('base negativa com expoente fracionário é NaN', () => {
    expect(power(-8, 0.5)).toBeNaN();
  });
  test('resultado muito grande é Infinity', () => {
    expect(power(10, 1000)).toBe(Infinity);
  });
});

describe('squareRoot', () => {
  test('√16 = 4', () => expect(squareRoot(16)).toBe(4));
  test('√0 = 0', () => expect(squareRoot(0)).toBe(0));
  test('√1 = 1', () => expect(squareRoot(1)).toBe(1));
  test('resultado irracional', () => expect(squareRoot(2)).toBeCloseTo(1.41421356));
  test('decimais', () => expect(squareRoot(0.25)).toBe(0.5));
  test('números grandes', () => expect(squareRoot(1e20)).toBe(1e10));
  test('número negativo lança erro', () => {
    expect(() => squareRoot(-1)).toThrow(
      'Não é possível calcular a raiz quadrada de um número negativo.'
    );
  });
  test('negativo decimal lança erro', () => {
    expect(() => squareRoot(-0.0001)).toThrow();
  });
});
