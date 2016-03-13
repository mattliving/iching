const YIN = 'YIN'
const YANG = 'YANG'
const MOVING_YIN = 'MOVING_YIN'
const MOVING_YANG = 'MOVING_YANG'
const STARTING_STICKS = 49
const DIVINING_TABLE = {
  13: MOVING_YANG,
  25: MOVING_YIN,
  21: YANG,
  17: YIN
}

export function divine (question) {
  var hexagrams = []
  var lines = []
  while (lines.length !== 6) {
    var sticks = STARTING_STICKS
    var count = 0
    for (var i = 0; i < 3; i++) {
      var heaps = divide(sticks)
      var result = 1 + subtractFour(heaps[0]) + subtractFour(heaps[1] - 1)
      count += result
      sticks -= result
    }
    lines.push(DIVINING_TABLE[count])
  }
  if (containsMovingLines(lines)) {
    hexagrams.push({lines: removeMovingLines(lines)})
    hexagrams.push({lines: transformMovingLines(lines)})
  } else {
    hexagrams.push({lines})
  }
  return hexagrams
}

export function printHexagram (lines) {
  var hexagram = ''
  for (var line of [].slice.call(lines).reverse()) {
    switch (line) {
      case YIN:
        hexagram += '-- --\n'
        break
      case MOVING_YIN:
        hexagram += '--x--\n'
        break
      case YANG:
        hexagram += '-----\n'
        break
      case MOVING_YANG:
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
    return (line === MOVING_YIN || line === MOVING_YANG)
  })
}

function removeMovingLines (lines) {
  return lines.map(function (line) {
    if (line === MOVING_YIN) {
      return YIN
    }
    if (line === MOVING_YANG) {
      return YANG
    }
    return line
  })
}

function transformMovingLines (lines) {
  return lines.map(function (line) {
    if (line === MOVING_YIN) {
      return YANG
    }
    if (line === MOVING_YANG) {
      return YIN
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