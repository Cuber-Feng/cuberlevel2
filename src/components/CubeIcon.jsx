import "../styles/cubeicons.css";
import { idToEventName } from "../helper/tools";
export default function CubeIcon({ eventId = '333' }) {
  return (
    <div className="cubeicon"
      style={{
        "--icon-url": `url("/cube_icons/event/${eventId}.svg")`
      }}
       title={idToEventName(eventId)}
    >
    </div>
  );
}