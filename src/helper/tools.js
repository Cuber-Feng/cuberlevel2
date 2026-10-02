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
