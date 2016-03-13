import * as CX from './constants'

function lookupHexagramNumber (lines) {
  return CX.LINES_TO_NUMBERS[lines.join('')]
}

export function divine (question) {
  var hexagrams = []
  var lines = []
  while (lines.length !== 6) {
    var sticks = CX.STARTING_STICKS
    var count = 0
    for (var i = 0; i < 3; i++) {
      var heaps = divide(sticks)
      var result = 1 + subtractFour(heaps[0]) + subtractFour(heaps[1] - 1)
      count += result
      sticks -= result
    }
    lines.push(CX.DIVINING_TABLE[count])
  }
  if (containsMovingLines(lines)) {
    let withoutMoving = removeMovingLines(lines)
    let transformed = transformMovingLines(lines)
    hexagrams.push({lines: withoutMoving, number: lookupHexagramNumber(withoutMoving)})
    hexagrams.push({lines: transformed, number: lookupHexagramNumber(transformed)})
  } else {
    hexagrams.push({lines, number: lookupHexagramNumber(lines)})
  }
  return hexagrams
}

export function printHexagram (lines) {
  var hexagram = ''
  for (var line of [].slice.call(lines).reverse()) {
    switch (line) {
      case CX.YIN:
        hexagram += '-- --\n'
        break
      case CX.MOVING_YIN:
        hexagram += '--x--\n'
        break
      case CX.YANG:
        hexagram += '-----\n'
        break
      case CX.MOVING_YANG:
        hexagram += '--o--\n'
        break
      default:
        break
    }
  }
  return hexagram
}

function divide (sticks) {
  var rand = getRandomIntInclusive(0, 3)
  var first = Math.floor(sticks / 2)
  var second = Math.ceil(sticks / 2)
  if (Math.random() > 0.5) {
    first += rand
    second -= rand
  } else {
    first -= rand
    second += rand
  }
  return [first, second]
}

function containsMovingLines (lines) {
  return !!lines.find(function (line) {
    return (line === CX.MOVING_YIN || line === CX.MOVING_YANG)
  })
}

function removeMovingLines (lines) {
  return lines.map(function (line) {
    if (line === CX.MOVING_YIN) {
      return CX.YIN
    }
    if (line === CX.MOVING_YANG) {
      return CX.YANG
    }
    return line
  })
}

function transformMovingLines (lines) {
  return lines.map(function (line) {
    if (line === CX.MOVING_YIN) {
      return CX.YANG
    }
    if (line === CX.MOVING_YANG) {
      return CX.YIN
    }
    return line
  })
}

function getRandomIntInclusive (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function subtractFour (number) {
  while (number > 4) {
    number -= 4
  }
  return number
}