const {
  addition: add,
  subtraction: subtract,
  multiplication: multiply,
  division: divide,
  modulo,
  exponentiation,
  squareRoot,
} = require('../calculator');
const { spawnSync } = require('node:child_process');
const path = require('node:path');

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

  describe('modulo', () => {
    test('10 % 3 = 1', () => expect(modulo(10, 3)).toBe(1));
    test('divisão exata', () => expect(modulo(9, 3)).toBe(0));
    test('zero', () => expect(modulo(0, 3)).toBe(0));
    test('dividendo negativo', () => expect(modulo(-10, 3)).toBe(-1));
    test('divisor negativo', () => expect(modulo(10, -3)).toBe(1));
    test('decimais', () => expect(modulo(5.5, 2)).toBe(1.5));
    test.each([0, -0])('módulo por %s lança erro', b => {
      expect(() => modulo(10, b)).toThrow('Módulo por zero não é permitido.');
    });
  });

  describe('exponentiation', () => {
    test('2 ** 3 = 8', () => expect(exponentiation(2, 3)).toBe(8));
    test('expoente zero', () => expect(exponentiation(2, 0)).toBe(1));
    test('expoente negativo', () => expect(exponentiation(2, -2)).toBe(0.25));
    test('expoente fracionário', () => expect(exponentiation(9, 0.5)).toBe(3));
    test('base negativa', () => expect(exponentiation(-2, 3)).toBe(-8));
    test.each([[0, -1], [-2, 0.5], [10, 1000]])(
      'resultado inválido para %s ** %s lança erro', (a, b) => {
        expect(() => exponentiation(a, b)).toThrow('número real finito');
      }
    );
  });

  describe('squareRoot', () => {
    test('raiz de 9', () => expect(squareRoot(9)).toBe(3));
    test('raiz de zero', () => expect(squareRoot(0)).toBe(0));
    test('raiz decimal', () => expect(squareRoot(0.25)).toBe(0.5));
    test('raiz irracional', () => expect(squareRoot(2)).toBeCloseTo(Math.SQRT2));
    test('raiz negativa lança erro', () => {
      expect(() => squareRoot(-1)).toThrow('Raiz quadrada de número negativo');
    });
  });

  describe('validação das novas operações', () => {
    test.each([NaN, Infinity, -Infinity, '2', undefined, null])(
      'rejeita operando inválido %s', value => {
        expect(() => modulo(value, 2)).toThrow('números finitos');
        expect(() => modulo(2, value)).toThrow('números finitos');
        expect(() => exponentiation(value, 2)).toThrow('números finitos');
        expect(() => exponentiation(2, value)).toThrow('números finitos');
        expect(() => squareRoot(value)).toThrow('números finitos');
      }
    );
  });

  describe('CLI', () => {
    const run = args => spawnSync(process.execPath, [
      path.join(__dirname, '../calculator.js'), ...args,
    ], { encoding: 'utf8' });

    test.each([
      ['add', '2', '3', '5'],
      ['subtract', '10', '4', '6'],
      ['multiply', '3', '4', '12'],
      ['divide', '10', '2', '5'],
      ['modulo', '10', '3', '1'],
      ['%', '10', '3', '1'],
      ['exponentiation', '2', '3', '8'],
      ['**', '2', '3', '8'],
      ['^', '2', '3', '8'],
      ['sqrt', '9', undefined, '3'],
    ])('%s calcula corretamente', (op, a, b, expected) => {
      const result = run(b === undefined ? [op, a] : [op, a, b]);
      expect(result.status).toBe(0);
      expect(result.stdout.trim()).toBe(expected);
      expect(result.stderr).toBe('');
    });

    test.each([
      ['modulo', '1', '0'],
      ['exponentiation', '-2', '0.5'],
      ['exponentiation', '10', '1000'],
      ['sqrt', '-1'],
      ['sqrt', 'abc'],
      ['sqrt', 'Infinity'],
      ['modulo', 'Infinity', '2'],
      ['exponentiation', '2', 'Infinity'],
      ['sqrt'],
      ['sqrt', '9', '2'],
      ['modulo', '10'],
      ['exponentiation', '2'],
      ['unknown', '2', '3'],
      ['toString', '2', '3'],
    ])('entrada inválida %j retorna erro', (...args) => {
      const result = run(args);
      expect(result.status).toBe(1);
      expect(result.stdout).toBe('');
      expect(result.stderr).toMatch(/Erro:|Uso:/);
    });
  });
  test('0 / 0 lança erro', () => {
    expect(() => divide(0, 0)).toThrow();
  });
});
