export function idToEventName(id) {
  const eventNames = {
    '333': '3x3x3 Cube',
    '222': '2x2x2 Cube',
    '444': '4x4x4 Cube',
    '555': '5x5x5 Cube',
    '666': '6x6x6 Cube',
    '777': '7x7x7 Cube',
    '333bf': '3x3 Blindfolded',
    '333fm': '3x3 Fewest Moves',
    '333ft': '3x3 With Feet',
    '333mbf': '3x3 Multi-Blind',
    '333oh': '3x3 One-Handed',
    '444bf': '4x4 Blindfolded',
    '555bf': '5x5 Blindfolded',
    'clock': 'Clock',
    'pyram': 'Pyraminx',
    'minx': 'Megaminx',
    'skewb': 'Skewb',
    'sq1': 'Square-1',
  };
  return eventNames[id] || id;
};

export function codeToFlag(code) {
  return code.toUpperCase().replace(/./g, (char) =>
    String.fromCodePoint(char.charCodeAt(0) + 127397)
  );
}

export function formatLargeNumber(number) {
  return `${Math.floor(number / 100) / 10}K`;
}

export function formatTime(eventId, centiseconds, type = 'single') {
  if (centiseconds === null || centiseconds === undefined || centiseconds === "-") return '-';

  switch (eventId) {
    case '333fm':
      {
        if (type === 'single') {
          return `${centiseconds}`;
        } else if (type === 'average') {
          return `${centiseconds / 100}`;
        }
      }
      break;
    case '333mbf':
      {
        const pts = 99 - Math.floor(centiseconds / 10000000);
        const seconds = Math.floor(centiseconds % 10000000 / 100);
        const minutes = Math.floor(seconds / 60);
        const fails = centiseconds % 100;
        return `${pts + fails}/${pts + 2 * fails} ${minutes}:${seconds % 60 < 10 ? '0' : ''}${seconds % 60}`;
      }
    default:
      break;
  }
  const totalSeconds = Math.floor(centiseconds / 100);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const centis = centiseconds % 100;

  return `${minutes > 0 ? minutes + ':' : ''}${seconds < 10 && minutes > 0 ? '0' : ''}${seconds}.${centis < 10 ? '0' : ''}${centis}`;
}

export function getScore(eventId = '333', scoreArr = [], single = -1, average = -1) {
  const row = scoreArr.find(row => row[0] == eventId);
  // console.log(row);
  switch (eventId) {
    case '333':
    case '444':
    case '555':
    case '666':
    case '777':
    case '222':
    case '333fm':
    case '333oh':
    case 'clock':
    case 'pyram':
    case 'minx':
    case 'skewb':
    case 'sq1':
      if (average == -1) return -1;
      // ['222', '86', '143', '237', '356', '428', '530', '820', '44211', '183070']
      if (average <= Number(row[1])) return 100;
      if (average <= Number(row[2])) return 95 + (row[2] - average) / (row[2] - row[1]) * 5;
      if (average <= Number(row[3])) return 90 + (row[3] - average) / (row[3] - row[2]) * 5;
      if (average <= Number(row[4])) return 80 + (row[4] - average) / (row[4] - row[3]) * 10;
      if (average <= Number(row[5])) return 70 + (row[5] - average) / (row[5] - row[4]) * 10;
      if (average <= Number(row[6])) return 60 + (row[6] - average) / (row[6] - row[5]) * 10;
      if (average <= Number(row[7])) return 50 + (row[7] - average) / (row[7] - row[6]) * 10;
      if (average <= Number(row[8])) return 40 + (row[8] - average) / (row[8] - row[7]) * 10;
      return 0;

    case '333bf':
    case '444bf':
    case '555bf':
    case '333mbf':
      if (single == -1) return -1;
      // ['222', '86', '143', '237', '356', '428', '530', '820', '44211', '183070']
      if (single <= Number(row[1])) return 100;
      if (single <= Number(row[2])) return 95 + (row[2] - single) / (row[2] - row[1]) * 5;
      if (single <= Number(row[3])) return 90 + (row[3] - single) / (row[3] - row[2]) * 5;
      if (single <= Number(row[4])) return 80 + (row[4] - single) / (row[4] - row[3]) * 10;
      if (single <= Number(row[5])) return 70 + (row[5] - single) / (row[5] - row[4]) * 10;
      if (single <= Number(row[6])) return 60 + (row[6] - single) / (row[6] - row[5]) * 10;
      if (single <= Number(row[7])) return 50 + (row[7] - single) / (row[7] - row[6]) * 10;
      if (single <= Number(row[8])) return 40 + (row[8] - single) / (row[8] - row[7]) * 10;
      return 0;
    default:
      return -1;
  }
}