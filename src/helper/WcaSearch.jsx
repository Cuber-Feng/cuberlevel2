import { useState, useEffect } from 'react';
import { idToEventName, codeToFlag, formatTime } from './tools.js';

export default function WcaSearch() {
  const [wcaId, setWcaId] = useState(() => {
    return localStorage.getItem('lastSearchedWcaId') || '';
  });
  const [personData, setPersonData] = useState(null);
  const [error, setError] = useState(null);
  const [pRecords, setPRecords] = useState([]);

  const handleSearchVal = async (val) => {
    // e.preventDefault();
    if (!wcaId.trim()) return;
    setError(null);

    try {
      const url = `https://www.worldcubeassociation.org/api/v0/persons/${val}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Competitor not found.');
      }

      const data = await response.json();
      console.log('get', data);
      setPersonData(data);
      setPRecords(data.personal_records);
      localStorage.setItem('lastSearchedWcaId', val.toUpperCase());
    } catch (err) {
      setError(err.message);
      setPersonData(null);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!wcaId.trim()) return;
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
    } 
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    handleSearchVal(wcaId); // Trigger search on initial load
  }, []);

  const handleChange = (val) => {
    setWcaId(val);
    localStorage.setItem('savedInputValue', val);
    if (val.length >= 10) {
      handleSearchVal(val);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={wcaId}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Search WCA ID"
        />
        {/* <button type="submit" disabled={loading}>
          {loading ? '...' : 'Search'}
        </button> */}
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {personData && (
        <div>
          <div className="cuber-info">
            <img src={personData.person.avatar.url} alt={`${personData.person.name}'s avatar`} className="avatar" />
            <div className="cuber-details">
              <div className='name'>{codeToFlag(personData.person.country_iso2)}&nbsp;{personData.person.name}&nbsp;{personData.person.gender == 'm' ? '♂️' : (personData.person.gender == 'f' ? '♀️' : '')}</div>
              <div className="other-info">
                <a href={personData.person.url} target="_blank" rel="noopener noreferrer">
                  {personData.person.wca_id}
                </a>
                <div>Comps: {personData.competition_count}</div>
                <div>Solves: {personData.total_solves}</div>
              </div>
            </div>
          </div>
          <div className="personal-records table-container">
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
                    <td className="event-data">{data.single.best ? formatTime(eventId, data.single.best, 'single') : '-'}</td>
                    <td className="event-data">{data.average && data.average.best ? formatTime(eventId, data.average.best, 'average') : '-'}</td>
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