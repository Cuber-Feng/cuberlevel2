import '../styles/about.css';
export default function About() {
    return (
        <div id="content" className="content">
            <div className="card">
                <h2>About</h2>
                <h3>1. How it work?</h3>

                <p>It is based on both the <strong>rank</strong> and the <strong>result</strong>. For the result, single
                    result is used for 4 blindfolded events, while average result is used for others.</p>
                <p>Each event has several <strong>boundary points</strong> that determine the score.</p>

                <strong>Example:</strong>
                <p>If your 3x3x3 Cube's PR is <strong>9.90</strong>, which is between 8.58 and 11.22,
                    your score is calculated as <strong>85</strong>.</p>

                <table>
                    <tr>
                        <th>Boundary Point</th>
                        <th>Result</th>
                        <th>Score</th>
                    </tr>
                    <tr>
                        <td>World Record</td>
                        <td>3.51</td>
                        <td>100</td>
                    </tr>
                    <tr>
                        <td>Top 0.1% or WR3</td>
                        <td>6.67</td>
                        <td>95</td>
                    </tr>
                    <tr>
                        <td>Top 1% or WR10</td>
                        <td>8.58</td>
                        <td>90</td>
                    </tr>
                    <tr>
                        <td>Top 5% or WR50</td>
                        <td>11.22</td>
                        <td>80</td>
                    </tr>
                    <tr>
                        <td>Top 10%</td>
                        <td>13.27</td>
                        <td>70</td>
                    </tr>
                    <tr>
                        <td>Top 20%</td>
                        <td>16.67</td>
                        <td>60</td>
                    </tr>
                    <tr>
                        <td>Top 50%</td>
                        <td>28.74</td>
                        <td>50</td>
                    </tr>
                    <tr>
                        <td>The Slowest One</td>
                        <td>8:45.07</td>
                        <td>40</td>
                    </tr>
                </table>


                <h3>2. Where the data from?</h3>

                <ul>
                    <li><strong>Result source: </strong><code>WCA API<br />(Real-time updates)</code></li>
                    <li><strong>Appendix Table: </strong><code>WCA Result Export<br />(Last Updated: Sep-14, 2025)</code></li>

                </ul>

                <h3>3. Any idea? Contact Me!</h3>
                <ul>
                    <li><strong>GitHub: </strong><a href="https://github.com/Cuber-Feng/cuberlevel"
                        target="_blank">cuberlevel (this repository)</a></li>
                    <li><strong>Instagram: </strong><a href="https://www.instagram.com/cuber_feng/"
                        target="_blank">cuber_feng</a></li>
                    <li><strong>SpeedSolving: </strong><a href="https://www.speedsolving.com/members/maple-feng.83039/"
                        target="_blank">Maple Feng</a></li>
                </ul>
            </div>
        </div>
    );
}