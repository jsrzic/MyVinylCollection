import React     from "react";

import { MapContainer, TileLayer, Marker } from 'react-leaflet'

function LocationMap({lat, lng, setLat, setLng, editing}) {

    return (
        <MapContainer
            center={[lat, lng]}
            style={{
                width: "100%",
                height: 300,
                margin: "auto",
                marginTop: "1rem",
                borderRadius: 10,
            }}
            zoom={13}
            scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <DraggableMarker lat={lat} lng={lng} draggable={editing}
                setLat={setLat} setLng={setLng}
            />
        </MapContainer>
    )
}

function DraggableMarker({lat, lng, setLat, setLng, draggable}) {
    const [position, setPosition] = React.useState({
        lat: lat,
        lng: lng})
    const markerRef = React.useRef(null)
    const eventHandlers = React.useMemo(
        () => ({
            dragend() {
                const marker = markerRef.current
                if (marker != null) {
                    setPosition(marker.getLatLng())
                    setLat(marker.getLatLng().lat)
                    setLng(marker.getLatLng().lng)
                }
            },
        }),
        [],
    )
    return (
        <Marker
            draggable={draggable}
            eventHandlers={eventHandlers}
            position={position}
            ref={markerRef}>
        </Marker>
    )
}

export default LocationMap