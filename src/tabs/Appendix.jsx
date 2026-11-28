/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { idToEventName, formatTime, formatLargeNumber } from "../helper/tools.js";
import csvUrl from "../assets/data/event_rank_summary.csv?url";
import CubeIcon from "../components/CubeIcon.jsx";

const headerMapping = {
  event_id: "Event",
  wr: "WR",
  top001: "PR99.9",
  top1: "PR99",
  top5: "PR95",
  top10: "PR90",
  top20: "PR80",
  top50: "PR50",
  slowest: "Worst",
  cnt: "Count"
};

const ptsMapping = {
  event_id: "Points",
  wr: "100",
  top001: "95",
  top1: "90",
  top5: "80",
  top10: "70",
  top20: "60",
  top50: "50",
  slowest: "40",
  cnt: "--"
}


export default function Appendix() {
  const [metadata, setMetadata] = useState(null);
  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}metadata.json`)
      .then((res) => res.json())
      .then((data) => setMetadata(data))
      .catch((err) => console.error(err));
  }, []);
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
        <h1>Appendix</h1>
        <b>1. Different Kind of Events</b>
        <div id="eventList"></div>

        <b>2. Reference Table</b>
        <div>
          (All blindfolded events use single result, others use average result)
        </div>
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
                      j == 0 ?
                        <CubeIcon eventId={cell}></CubeIcon>
                        : j < 9 ? formatTime(data[i + 1][0], cell, 'average') : formatLargeNumber(cell)
                    }</td>
                  ))}
                </tr>
              ))}
              <tr>
                {data[0]?.map((header, i) => (
                  <td key={i} className="pts-line">{ptsMapping[header] || header}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
        <p>(Last Updated: {metadata?.export_date})</p>
      </div>
    </div>
  );
}