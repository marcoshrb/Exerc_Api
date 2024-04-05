import { MapContainer, TileLayer, Marker, Popup} from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import "leaflet-defaulticon-compatibility";

export const MapCard = ({position}) => {

    return (
        <div>
            <MapContainer 
            center={position} 
            zoom={13} 
            scrollWheelZoom={true} 
            style={{height: "80vh"}}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer>
        </div >
    )
}