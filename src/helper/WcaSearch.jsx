import { useState, useEffect } from 'react';
import { idToEventName, codeToFlag, formatTime, getScore } from './tools.js';
import csvUrl from "../assets/data/event_rank_summary.csv?url";

export default function WcaSearch() {
  const [wcaId, setWcaId] = useState(() => {
    return localStorage.getItem('lastSearchedWcaId') || '';
  });
  const [personData, setPersonData] = useState(null);
  const [error, setError] = useState(null);
  const [pRecords, setPRecords] = useState([]);
  const [scoreData, setSData] = useState([]);
  const [displayContents, setDis] = useState([]);
  useEffect(() => {
    fetch(csvUrl)
      .then((res) => res.text())
      .then((text) => {
        const rows = text
          .trim()
          .split("\n")
          .map((row) => row.split(","));
        setSData(rows);
      });
  }, []);

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

  useEffect(() => {
    if (scoreData.length > 0 && pRecords) {
      console.log("good");
      console.log(scoreData, pRecords);
      let dis = [];
      Object.entries(pRecords).map(([eventId, data]) => {
        let row = [];
        let s = getScore(eventId, scoreData, data.single.best, data.average ? data.average.best : -1);
        // console.log(eventId, s);
        row.push(eventId, s, data.single.country_rank, data.single.continent_rank, data.single.world_rank, data.single.best);
        data.average
          ? row.push(data.average.best, data.average.world_rank, data.average.continent_rank, data.average.country_rank)
          : row.push("-", "-", "-", "-")
          ;
        // console.log(row);
        dis.push(row);
      });
      dis.sort((a, b) => b[1] - a[1]);
      console.log(dis);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDis(dis);
    }
  }, [scoreData, pRecords]);

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={wcaId}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Search WCA ID"
        />
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
                  <th className='event-score'>Score</th>
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
                {displayContents.map((row) => {
                  const event_id = row[0]; // First element used as key
                  return (
                    <tr key={event_id}>
                      {row.map((cell, colIndex) =>
                        colIndex === 0 ? (
                          <td key={colIndex} className="event-name">
                            {idToEventName(cell)}
                          </td>
                        ) : colIndex === 1 ? (
                          <td key={colIndex} className='event-score'>
                            {cell >=0 ? (Math.round(cell * 100) / 100).toFixed(2) : 'N/A'}
                          </td>
                        ) : colIndex == 5 || colIndex == 6 ? (
                          <td key={colIndex} className='event-data'>
                            {formatTime(event_id, cell, colIndex == 6 ? 'average' : 'single')}
                          </td>
                        ) : (
                          <td key={colIndex} className='event-data'>
                            {cell}
                          </td>
                        )
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}