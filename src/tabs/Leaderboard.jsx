/* eslint-disable no-unused-vars */
import { useEffect, useMemo, useState } from "react";
import Papa from "papaparse";
import "../styles/leaderboard.css";
import MAPLE_SCORE_PATH from "../assets/data/maple.csv?url";

const PAGE_SIZE = 100;

export default function Leaderboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searched, setSearched] = useState(false);
  const [highlightedId, setHighlightedId] = useState(null);

  // person_id -> array index
  const [idIndex, setIdIndex] = useState(new Map());

  // Load CSV
  useEffect(() => {
    const loadCSV = async () => {
      try {
        const response = await fetch(MAPLE_SCORE_PATH);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const csvText = await response.text();

        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,

          complete: (result) => {
            try {
              if (result.errors.length > 0) {
                console.warn("CSV parsing warnings:", result.errors);
              }

              const rows = result.data.map((row) => ({
                maple_rank: Number(row.maple_rank),
                person_id: row.person_id.trim(),
                name: row.name.trim(),
                nationality: row.nationality.trim(),
                maple: Number(row.maple),
              }));

              const index = new Map();

              rows.forEach((row, i) => {
                index.set(row.person_id, i);
              });

              setData(rows);
              setIdIndex(index);
              setLoading(false);
            } catch (err) {
              console.error(err);
              setError("Failed to process CSV data.");
              setLoading(false);
            }
          },

          error: (err) => {
            console.error(err);
            setError("Failed to parse CSV.");
            setLoading(false);
          },
        });
      } catch (err) {
        console.error(err);
        setError("Failed to load ranking.csv.");
        setLoading(false);
      }
    };

    loadCSV();
  }, []);

  // Top 10
  const topTen = useMemo(() => data.slice(0, 10), [data]);

  // Remaining pages
  const remainingData = useMemo(() => data.slice(10), [data]);

  const totalPages = Math.ceil(remainingData.length / PAGE_SIZE);

  // Current page data
  const currentData = useMemo(() => {
    const start = currentPage * PAGE_SIZE;

    return remainingData.slice(start, start + PAGE_SIZE);
  }, [remainingData, currentPage]);

  // Search
  const handleSearch = (e) => {
    setSearched(false);
    e.preventDefault();

    const query = searchQuery.trim();

    if (!query) {
      setSearchResults([]);
      return;
    }
    setSearched(true);
    // First: exact person_id lookup (O(1))
    const index = idIndex.get(query.toUpperCase());

    if (index !== undefined) {
      jumpToResult(data[index]);
      setSearchResults([]);
      setSearched(false);
      setSearchQuery(query.toUpperCase());
      return;
    }

    // Second: search by name
    const normalizedQuery = query.toLowerCase();

    const exactMatches = [];
    const partialMatches = [];

    for (const row of data) {
      const name = row.name.toLowerCase();

      if (name === normalizedQuery) {
        exactMatches.push(row);
      } else if (name.includes(normalizedQuery)) {
        partialMatches.push(row);
      }

      // Limit displayed search results
      if (exactMatches.length + partialMatches.length >= 20) {
        break;
      }
    }

    const results = exactMatches.length ? exactMatches : partialMatches;

    setSearchResults(results);

    if (results.length === 1) {
      jumpToResult(results[0]);
      setSearchResults([]);
      setSearched(false);
    }
  };

  // Jump to the page containing a person
  const jumpToResult = (person) => {
    const index = idIndex.get(person.person_id);

    if (index === undefined) return;

    setHighlightedId(person.person_id);

    if (index < 10) {
      // Person is in Top 10
      document.getElementById("top-ten")?.scrollIntoView({
        behavior: "smooth",
      });
    } else {
      // Calculate page (excluding Top 10)
      const page = Math.floor((index - 10) / PAGE_SIZE);

      setCurrentPage(page);

      setTimeout(() => {
        document.querySelector("#ranking-table .highlighted")?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 50);
    }
  };

  // Pagination
  const changePage = (page) => {
    if (page < 0 || page >= totalPages) return;

    setCurrentPage(page);
    setHighlightedId(null);
  };

  // Loading / error states
  if (loading) return <p>Loading ranking...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="ranking-page">
      <h1>Maple Ranking</h1>

      <p>Total participants: {data.length.toLocaleString()}</p>

      {/* Top 10 */}
      <section id="top-ten">
        <h2>Top 10</h2>

        <RankingTable rows={topTen} highlightedId={highlightedId} />
      </section>

      {/* Search */}
      <form className="ranking-search" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search WCA ID or name..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setSearchResults([]);
            setSearched(false);
          }}
        />

        <button type="submit">Search</button>
      </form>

      {/* Search results */}
      {searched && (searchResults.length > 0 ?
        (
          <div className="search-results">
            {searchResults.map((person) => (
              <button
                key={person.person_id}
                onClick={() => {
                  jumpToResult(person);
                  // setSearchResults([]);
                  // setSearched(false);
                }}
              >
                #{person.maple_rank} - {person.name}({person.person_id})
              </button>
            ))}
          </div>
        )
        : (<div className="search-results"><p>No Result for "{searchQuery}"</p></div>))}

      {/* Remaining rankings */}
      <section id="ranking-table">
        <h2>Ranking</h2>
        <p>
          Showing {remainingData.length === 0 ? 0 : currentPage * PAGE_SIZE + 11}
          {" - "}
          {Math.min((currentPage + 1) * PAGE_SIZE, remainingData.length) + 10}
          {" of "}
          {(remainingData.length + 10).toLocaleString()}
        </p>

        <RankingTable rows={currentData} highlightedId={highlightedId} />

        {/* Pagination */}
        <div className="pagination">
          <button
            disabled={currentPage === 0}
            onClick={() => changePage(currentPage - 1)}
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => i)
            .filter(
              (page) =>
                page === 0 ||
                page === totalPages - 1 ||
                Math.abs(page - currentPage) <= 2,
            )
            .map((page, i, pages) => (
              <span key={page}>
                {i > 0 && page - pages[i - 1] > 1 && <span> ... </span>}

                <button
                  className={currentPage === page ? "active" : ""}
                  onClick={() => changePage(page)}
                >
                  {page + 1}
                </button>
              </span>
            ))}

          <button
            disabled={currentPage >= totalPages - 1}
            onClick={() => changePage(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </section>
    </div>
  );
}

// Reusable ranking table
function RankingTable({ rows, highlightedId }) {
  return (
    <div className="table-container">
      <table className="ranking-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th className="WCAID-col">WCA ID</th>
            <th>Name</th>
            <th>Nationality</th>
            <th>Maple</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((person) => (
            <tr
              key={person.person_id}
              className={person.person_id === highlightedId ? "highlighted" : ""}
            >
              <td>{person.maple_rank}</td>
              <td className="WCAID-col">{person.person_id}</td>
              <td>{person.name}&nbsp;<a href={`https://www.worldcubeassociation.org/persons/${person.person_id}`} target="_blank" rel="noopener noreferrer">
                <img src="/cube_icons/wca-logo.svg" alt="WCA" className="WCA-LOGO" />
              </a></td>
              <td>{person.nationality}</td>
              <td>{person.maple.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
