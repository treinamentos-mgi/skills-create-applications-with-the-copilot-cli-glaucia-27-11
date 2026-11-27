#!/usr/bin/env node
/**
 * Calculadora CLI
 *
 * Operações suportadas:
 *   add (+)       - adição
 *   subtract (-)  - subtração
 *   multiply (*)  - multiplicação
 *   divide (/)    - divisão
 *   modulo (%)    - resto da divisão
 *   exponentiation (**, ^) - exponenciação
 *   sqrt          - raiz quadrada
 *
 * Uso:
 *   node src/calculator.js <operação> <a> <b>
 *   node src/calculator.js sqrt <a>
 *
 * Exemplos:
 *   node src/calculator.js add 2 3        # 5
 *   node src/calculator.js subtract 10 4  # 6
 *   node src/calculator.js multiply 3 4   # 12
 *   node src/calculator.js divide 10 2    # 5
 *   node src/calculator.js modulo 10 3    # 1
 *   node src/calculator.js exponentiation 2 3 # 8
 *   node src/calculator.js sqrt 9         # 3
 */

// Adição: a + b
function addition(a, b) {
  return a + b;
}

// Subtração: a - b
function subtraction(a, b) {
  return a - b;
}

// Multiplicação: a * b
function multiplication(a, b) {
  return a * b;
}

// Divisão: a / b (divisão por zero é um erro)
function division(a, b) {
  if (b === 0) {
    throw new Error('Divisão por zero não é permitida.');
  }
  return a / b;
}

function validateNumbers(...values) {
  if (!values.every(Number.isFinite)) {
    throw new Error('Os operandos devem ser números finitos.');
  }
}

// Módulo: resto de a / b
function modulo(a, b) {
  validateNumbers(a, b);
  if (b === 0) {
    throw new Error('Módulo por zero não é permitido.');
  }
  return a % b;
}

// Exponenciação: a ** b
function exponentiation(a, b) {
  validateNumbers(a, b);
  const result = a ** b;
  if (!Number.isFinite(result)) {
    throw new Error('A exponenciação deve produzir um número real finito.');
  }
  return result;
}

// Raiz quadrada de a
function squareRoot(a) {
  validateNumbers(a);
  if (a < 0) {
    throw new Error('Raiz quadrada de número negativo não é permitida.');
  }
  return Math.sqrt(a);
}

const operations = {
  add: addition,
  '+': addition,
  subtract: subtraction,
  '-': subtraction,
  multiply: multiplication,
  '*': multiplication,
  divide: division,
  '/': division,
  modulo,
  '%': modulo,
  exponentiation,
  '**': exponentiation,
  '^': exponentiation,
  sqrt: squareRoot,
};

function main(args) {
  const [op, rawA, rawB] = args;
  const operation = Object.hasOwn(operations, op) ? operations[op] : undefined;
  const expectedArgs = operation === squareRoot ? 2 : 3;

  if (!operation || args.length !== expectedArgs) {
    console.error('Uso: node src/calculator.js <add|subtract|multiply|divide|modulo|exponentiation> <a> <b> ou sqrt <a>');
    return 1;
  }

  const a = Number(rawA);
  const b = Number(rawB);
  if (Number.isNaN(a) || (operation !== squareRoot && Number.isNaN(b))) {
    console.error('Erro: os operandos devem ser números.');
    return 1;
  }

  try {
    console.log(operation(a, b));
    return 0;
  } catch (err) {
    console.error(`Erro: ${err.message}`);
    return 1;
  }
}

if (require.main === module) {
  process.exitCode = main(process.argv.slice(2));
}

module.exports = { addition, subtraction, multiplication, division, modulo, exponentiation, squareRoot };
