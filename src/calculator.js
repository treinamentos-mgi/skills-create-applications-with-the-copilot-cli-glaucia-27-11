#!/usr/bin/env node
/**
 * Calculadora CLI
 *
 * Operações suportadas:
 *   add (+)       - adição
 *   subtract (-)  - subtração
 *   multiply (*)  - multiplicação
 *   divide (/)    - divisão
 *
 * Uso:
 *   node src/calculator.js <operação> <a> <b>
 *
 * Exemplos:
 *   node src/calculator.js add 2 3        # 5
 *   node src/calculator.js subtract 10 4  # 6
 *   node src/calculator.js multiply 3 4   # 12
 *   node src/calculator.js divide 10 2    # 5
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

// Módulo: resto da divisão de a por b (divisão por zero é um erro)
function modulo(a, b) {
  if (b === 0) {
    throw new Error('Módulo por zero não é permitido.');
  }
  return a % b;
}

// Potência: base elevada a exponent
function power(base, exponent) {
  return base ** exponent;
}

// Raiz quadrada: √n (números negativos são um erro)
function squareRoot(n) {
  if (n < 0) {
    throw new Error('Não é possível calcular a raiz quadrada de um número negativo.');
  }
  return Math.sqrt(n);
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
};

function main(args) {
  const [op, rawA, rawB] = args;
  const operation = operations[op];

  if (!operation || args.length !== 3) {
    console.error('Uso: node src/calculator.js <add|subtract|multiply|divide> <a> <b>');
    return 1;
  }

  const a = Number(rawA);
  const b = Number(rawB);
  if (Number.isNaN(a) || Number.isNaN(b)) {
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

module.exports = { addition, subtraction, multiplication, division, modulo, power, squareRoot };
