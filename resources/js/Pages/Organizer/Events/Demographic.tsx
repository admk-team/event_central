import React from 'react';
import jsVectorMap from 'jsvectormap';
import 'jsvectormap/dist/jsvectormap.min.css';
import 'jsvectormap/dist/maps/world-merc.js';
import Layout from "../../../Layouts/Event";

interface Attendee {
    country: string;
    location: string;
    position: string;
}

interface Props {
    attendees: Attendee[];
}

const countryCoordinates: Record<string, [number, number]> = {
    "United States": [38, -97],
    "Canada": [56, -106],
    "India": [21, 78],
    "United Kingdom": [54, -2],
    // add more countries you expect here
};

export default function Demographic({ attendees }: Props) {
    const mapRef = React.useRef<HTMLDivElement>(null);
    const mapInstance = React.useRef<any>(null);
    // inside your React.useEffect:
React.useEffect(() => {
    if (!mapRef.current) return;

    // Aggregate attendees by country with counts and positions
    const countryGroups = attendees.reduce((acc, attendee) => {
        if (!countryCoordinates[attendee.country]) return acc;
        if (!acc[attendee.country]) {
            acc[attendee.country] = {
                name: attendee.country,
                count: 0,
                positions: new Set<string>(),
                coords: countryCoordinates[attendee.country],
            };
        }
        acc[attendee.country].count++;
        acc[attendee.country].positions.add(attendee.position);
        return acc;
    }, {} as Record<string, { name: string; count: number; positions: Set<string>; coords: [number, number] }>);

    const markers = Object.values(countryGroups).map(country => ({
        name: `${country.name} (${country.count})`,  // just country name + count
        coords: country.coords,
    }));

    // Destroy previous map instance if any
    if (mapInstance.current) {
        mapInstance.current.destroy();
        mapInstance.current = null;
    }

    mapInstance.current = new jsVectorMap({
        selector: mapRef.current,
        map: "world_merc",
        markers: markers,
        labels: {
            markers: {
                render: (marker: any) => marker.name,
            },
        },
        markerStyle: {
            initial: { fill: '#009688' },
            hover: { fill: '#ff5722', stroke: '#fff', strokeWidth: 2 },
        },
        markerLabelStyle: {
            initial: {
                fontFamily: 'Poppins',
                fontSize: 10,
                fontWeight: 400,
                fill: 'rgba(53, 55, 62, 0.7)',
                whiteSpace: 'pre-line',
            },
        },
    });

    return () => {
        if (mapInstance.current) {
            mapInstance.current.destroy();
            mapInstance.current = null;
        }
    };
}, [attendees]);

    return (
        <Layout>
            <div
                style={{
                    height: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '20px',
                    padding: '20px',
                    boxSizing: 'border-box',
                }}
            >

                <div style={{ display: 'flex', gap: '20px' }}>
                    <div ref={mapRef} style={{ width: 700, height: 400 }} />

                    <div style={{ maxHeight: 400, overflowY: 'auto', width: 300 }}>
                        <h3>Attendees by Country</h3>
                        <ul>
                            {Object.values(attendees.reduce((acc, attendee) => {
                                if (!acc[attendee.country]) {
                                    acc[attendee.country] = {
                                        country: attendee.country,
                                        count: 0,
                                    };
                                }
                                acc[attendee.country].count++;
                                return acc;
                            }, {} as Record<string, { country: string; count: number }>)).map(({ country, count }) => (
                                <li key={country}>
                                    <strong>{country}</strong>: {count} attendees
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
