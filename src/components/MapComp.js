import React, { useEffect, useState } from "react";
import { Icon } from "leaflet";
import styles from "./MapComp.module.css";
import { useNavigate } from "react-router-dom";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap,
} from "react-leaflet";
import { UseMyLocation } from "../hook/UseMyLocation";
import { useUrlPosition } from "../hook/useUrlPosition";

const camera_icon = new Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/2642/2642550.png",
  iconSize: [25, 25],
});
const police_icon = new Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/5600/5600529.png",
  iconSize: [25, 25],
});
const my_icon = new Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/4284/4284108.png",
  iconSize: [35, 35],
});

const pol_pos = [
  {
    id: 1,
    position: [28.65, 77.2],
  },
  {
    id: 2,
    position: [28.7, 77.25],
  },
  {
    id: 3,
    position: [28.55, 77.18],
  },
];
const cam_pos = [
  {
    id: 1,
    position: [28.62, 77.232],
  },
  {
    id: 2,
    position: [28.61, 77.23],
  },
  {
    id: 3,
    position: [28.63, 77.21],
  },
  {
    id: 4,
    position: [28.58, 77.24],
  },
];

export default function MapComp() {
  const [mapLat, mapLng] = useUrlPosition();
  const [mapPosition, setMapPosition] = useState([28.611, 77.234]);
  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = UseMyLocation();
  useEffect(
    function () {
      if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
    },
    [mapLat, mapLng]
  );

  useEffect(
    function () {
      if (geolocationPosition)
        setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
    },
    [geolocationPosition]
  );

  return (
    <div className={styles.mapContainer}>
      {!geolocationPosition && (
        <button type="position" onClick={getPosition}>
          {isLoadingPosition ? "Loading..." : "Use your position"}
        </button>
      )}

      <MapContainer
        center={mapPosition}
        scrollWheelZoom={true}
        className={styles.map}
        zoom={13}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* http://localhost:3000/?lat=28.69600859759741&lng=77.13257415664246 */}
        {/* http://localhost:3000/?lat=28.69600859759741&lng=77.13257415664246 */}
        {pol_pos.map((pol) => (
          <Marker position={pol.position} icon={police_icon} key={pol.id}>
            <Popup>
              Police Station ID: {pol.id} <br />
              {/* Add more details here if available in cam_pos */}
            </Popup>
          </Marker>
        ))}
        <Marker position={mapPosition} icon={my_icon}>
          <Popup>mycurrent location</Popup>
        </Marker>
        {cam_pos.map((cam) => (
          <Marker position={cam.position} icon={camera_icon} key={cam.id}>
            <Popup>
              Camera ID: {cam.id} <br />
              {/* Add more details here if available in capos */}
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}
function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();

  useMapEvents({
    click: (e) => navigate(`?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
}
