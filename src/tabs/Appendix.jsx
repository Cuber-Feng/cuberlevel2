import { useEffect, useState } from "react";
import { idToEventName, formatTime, formatLargeNumber } from "../helper/tools.js";
import csvUrl from "../assets/data/event_rank_summary.csv?url";

const headerMapping = {
  event_id: "Event",
  wr: "WR (100pts)",
  top001: "Top 0.1% (95pts)",
  top1: "Top 1% (90pts)",
  top5: "Top 5% (80pts)",
  top10: "Top 10% (70pts)",
  top20: "Top 20% (60pts)",
  top50: "Top 50% (50pts)",
  slowest: "Slowest (40pts)",
  cnt: "Count"
};

export default function Appendix() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(csvUrl)
      .then((res) => res.text())
      .then((text) => {
        const rows = text
          .trim()
          .split("\n")
          .map((row) => row.split(","));
        setData(rows);
      });
  }, []);


  return (
    <div id="content" className="content">
      <div className="card">
        <h2>Appendix</h2>
        <b>1. Different Kind of Events</b>
        <div id="eventList"></div>

        <b>2. Reference Table</b>
        <div>(All blindfolded events use single result, others use average result)</div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                {data[0]?.map((header, i) => (
                  <th key={i}>{headerMapping[header] || header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.slice(1).map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j}>{
                      j == 0 ? idToEventName(cell) :
                        j < 9 ? formatTime(data[i + 1][0], cell, 'average') : formatLargeNumber(cell)
                    }</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}