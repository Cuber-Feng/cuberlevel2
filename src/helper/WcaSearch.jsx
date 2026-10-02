import { useState, useEffect } from 'react';
import { idToEventName, codeToFlag } from './tools.js';



const formatTime = (centiseconds) => {
  if (centiseconds === null || centiseconds === undefined) return '-';
  if (centiseconds > 100000000) {
    const pts = 99 - Math.floor(centiseconds / 10000000);
    const seconds = Math.floor(centiseconds % 10000000 / 100);
    const minutes = Math.floor(seconds / 60);
    const fails = centiseconds % 100;
    return `${pts + fails}/${pts + 2 * fails} ${minutes}:${seconds % 60 < 10 ? '0' : ''}${seconds % 60}`;
  }
  const totalSeconds = Math.floor(centiseconds / 100);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const centis = centiseconds % 100;

  return `${minutes > 0 ? minutes + ':' : ''}${seconds < 10 && minutes > 0 ? '0' : ''}${seconds}.${centis < 10 ? '0' : ''}${centis}`;
};

export default function WcaSearch() {
  const [wcaId, setWcaId] = useState('');
  const [personData, setPersonData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pRecords, setPRecords] = useState([]);
  let lastSearchedWcaId = localStorage.getItem('lastSearchedWcaId') || '';
  if (lastSearchedWcaId && !wcaId) {
    setWcaId(lastSearchedWcaId);
  }

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!wcaId.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const url = `https://www.worldcubeassociation.org/api/v0/persons/${wcaId}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Competitor not found.');
      }

      const data = await response.json();
      console.log('get', data);
      setPersonData(data);
      setPRecords(data.personal_records);
      localStorage.setItem('lastSearchedWcaId', wcaId.toUpperCase());
    } catch (err) {
      setError(err.message);
      setPersonData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    handleSearch({ preventDefault: () => { } }); // Trigger search on initial load
  }, []);

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={wcaId}
          onChange={(e) => setWcaId(e.target.value)}
          placeholder="WCA ID (e.g. 2017FENG35)"
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {personData && (
        <div>
          <div className="cuber-info">
            <img src={personData.person.avatar.thumb_url} alt={`${personData.person.name}'s avatar`} className="avatar" />
            <div className="cuber-details">
              <div className='name'>{codeToFlag(personData.person.country_iso2)}&nbsp;{personData.person.name}&nbsp;{personData.person.gender == 'm' ? '♂️' : '♀️'}</div>
              <div className="other-info">
                <a href={personData.person.url} target="_blank" rel="noopener noreferrer">
                  {personData.person.wca_id}
                </a>
                <div>Comps: {personData.competition_count}</div>
                <div>Solves: {personData.total_solves}</div>
              </div>
            </div>
          </div>
          <div className="personal-records">
            <table>
              <thead>
                <tr>
                  <th className="event-name">Event</th>
                  <th className="event-data">NR</th>
                  <th className="event-data">CR</th>
                  <th className="event-data">WR</th>
                  <th className="event-data">Single</th>
                  <th className="event-data">Average</th>
                  <th className="event-data">WR</th>
                  <th className="event-data">CR</th>
                  <th className="event-data">NR</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(pRecords).map(([eventId, data]) => (
                  <tr key={eventId}>
                    <td className="event-name">{idToEventName(eventId)}</td>
                    <td className="event-data">{data.single.country_rank ? data.single.country_rank : '-'}</td>
                    <td className="event-data">{data.single.continent_rank ? data.single.continent_rank : '-'}</td>
                    <td className="event-data">{data.single.world_rank ? data.single.world_rank : '-'}</td>
                    <td className="event-data">{data.single.best ? formatTime(data.single.best) : '-'}</td>
                    <td className="event-data">{data.average && data.average.best ? formatTime(data.average.best) : '-'}</td>
                    <td className="event-data">{data.average && data.average.world_rank ? data.average.world_rank : '-'}</td>
                    <td className="event-data">{data.average && data.average.continent_rank ? data.average.continent_rank : '-'}</td>
                    <td className="event-data">{data.average && data.average.country_rank ? data.average.country_rank : '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}