import "../styles/cubeicons.css";
export default function CubeIcon({ eventId = '333' }) {
  return (
    <div className="cubeicon"
      style={{
        "--icon-url": `url("/cube_icons/event/${eventId}.svg")`
      }}>
    </div>
  );
}