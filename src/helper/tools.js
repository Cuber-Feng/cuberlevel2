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

export function formatTime(eventId, centiseconds, type = 'single') {
  if (centiseconds === null || centiseconds === undefined) return '-';

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