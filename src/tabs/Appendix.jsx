export default function Appendix() {
    return (
        <div id="content" className="content">
            <div className="card">
                <h2>Appendix</h2>
                <div style={{ height: '0.8rem' }}></div>
                <b style={{ fontSize: '1.2rem' }}>1. Different Kind of Events</b>
                <div style={{ height: '0.6rem' }}></div>
                <div id="eventList"></div>
                <div style={{ height: '0.8rem' }}></div>

                <b style={{ fontSize: '1.2rem' }}>2. Reference Table</b>
                <div style={{ height: '0.6rem' }}></div>
                <div>(All blindfolded events use single result, others use average result)</div>
                <div id="table-container">Loading...</div>
            </div>
        </div>
    );
}