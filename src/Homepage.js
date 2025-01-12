import MapComp from "./components/MapComp";
import Sidebar from "./components/Sidebar";

export default function Homepage() {
  return (
    <div className="App">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="map_page">
        <MapComp />
      </div>
    </div>
  );
}
