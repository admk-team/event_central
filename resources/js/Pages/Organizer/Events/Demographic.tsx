// import React from 'react';
// import jsVectorMap from 'jsvectormap';
// import 'jsvectormap/dist/jsvectormap.min.css';
// import 'jsvectormap/dist/maps/world-merc.js';
// import Layout from "../../../Layouts/Event";

// interface Attendee {
//     country: string;
//     location: string;
//     position: string;
// }

// interface Props {
//     attendees: Attendee[];
// }

// // Coordinates for standardized country names
// const countryCoordinates: Record<string, [number, number]> = {
//     "United States": [38, -97],
//     "Canada": [56, -106],
//     "India": [21, 78],
//     "United Kingdom": [54, -2],
//     "Brazil": [-14.235, -51.9253],
//     // add more countries you expect here
// };

// // Mapping for variations → standard names
// const countryNameMap: Record<string, string> = {
//     "USA": "United States",
//     "U S A": "United States",
//     "US": "United States",
//     "United States": "United States",
//     "Brasil": "Brazil",
//     "BR": "Brazil",
//     "U.K.": "United Kingdom",
//     "UK": "United Kingdom",
// };

// export default function Demographic({ attendees }: Props) {
//     const mapRef = React.useRef<HTMLDivElement>(null);
//     const mapInstance = React.useRef<any>(null);

//     React.useEffect(() => {
//         if (!mapRef.current) return;

//         // Aggregate attendees by normalized country names
//         const countryGroups = attendees.reduce((acc, attendee) => {
//             const normalizedCountry = countryNameMap[attendee.country] || attendee.country;
//             if (!countryCoordinates[normalizedCountry]) return acc;

//             if (!acc[normalizedCountry]) {
//                 acc[normalizedCountry] = {
//                     name: normalizedCountry,
//                     count: 0,
//                     positions: new Set<string>(),
//                     coords: countryCoordinates[normalizedCountry],
//                 };
//             }
//             acc[normalizedCountry].count++;
//             acc[normalizedCountry].positions.add(attendee.position);
//             return acc;
//         }, {} as Record<string, { name: string; count: number; positions: Set<string>; coords: [number, number] }>);

//         // Create markers — short label only
//         const markers = Object.values(countryGroups).map(country => ({
//             name: `${country.name} (${country.count})`,
//             coords: country.coords,
//         }));

//         // Destroy previous map instance if any
//         if (mapInstance.current) {
//             mapInstance.current.destroy();
//             mapInstance.current = null;
//         }

//         // Initialize map
//         mapInstance.current = new jsVectorMap({
//             selector: mapRef.current,
//             map: "world_merc",
//             markers: markers,
//             labels: {
//                 markers: {
//                     render: (marker: any) => marker.name,
//                 },
//             },
//             markerStyle: {
//                 initial: { fill: '#009688' },
//                 hover: { fill: '#ff5722', stroke: '#fff', strokeWidth: 2 },
//             },
//             markerLabelStyle: {
//                 initial: {
//                     fontFamily: 'Poppins',
//                     fontSize: 10,
//                     fontWeight: 400,
//                     fill: 'rgba(53, 55, 62, 0.7)',
//                     whiteSpace: 'pre-line',
//                 },
//             },
//             onMarkerHover: function (event, index, marker) {
//                 const countryName = marker.name.split(' (')[0];
//                 const countryData = countryGroups[countryName];
//                 if (countryData) {
//                     const fullInfo = `${countryData.name} (${countryData.count})\nPositions: ${[...countryData.positions].join(', ')}`;
//                     (this as any).tooltip.textContent = fullInfo;
//                 }
//             },
//         });

//         return () => {
//             if (mapInstance.current) {
//                 mapInstance.current.destroy();
//                 mapInstance.current = null;
//             }
//         };
//     }, [attendees]);

//     return (
//         <Layout>
//             <div
//                 style={{
//                     height: '100vh',
//                     display: 'flex',
//                     flexDirection: 'column',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     gap: '20px',
//                     padding: '20px',
//                     boxSizing: 'border-box',
//                 }}
//             >
//                 <div style={{ display: 'flex', gap: '20px' }}>
//                     <div ref={mapRef} style={{ width: 700, height: 400 }} />

//                     <div style={{ maxHeight: 400, overflowY: 'auto', width: 300 }}>
//                         <h3>Attendees by Country</h3>
//                         <ul>
//                             {Object.values(attendees.reduce((acc, attendee) => {
//                                 const normalizedCountry = attendee.country?.trim()
//                                     ? (countryNameMap[attendee.country] || attendee.country)
//                                     : "Unknown";
//                                 if (!acc[normalizedCountry]) {
//                                     acc[normalizedCountry] = {
//                                         country: normalizedCountry,
//                                         count: 0,
//                                     };
//                                 }
//                                 acc[normalizedCountry].count++;
//                                 return acc;
//                             }, {} as Record<string, { country: string; count: number }>))
//                                 .map(({ country, count }) => (
//                                     <li key={country}>
//                                         <strong>{country}</strong>: {count} attendees
//                                     </li>
//                                 ))}
//                         </ul>
//                     </div>
//                 </div>
//             </div>
//         </Layout>
//     );
// }
import React from 'react';
import jsVectorMap from 'jsvectormap';
import 'jsvectormap/dist/jsvectormap.min.css';
import 'jsvectormap/dist/maps/world-merc.js';
import Layout from "../../../Layouts/Event";

// Import ISO countries and coordinates
import countries from "world-countries"; // has coordinates for all countries

// Normalize common variations
const countryNameMap: Record<string, string> = {
    "us": "United States",
    "usa": "United States",
    "u.s.a": "United States",
    "u s a": "United States",
    "america": "United States",
    "united states": "United States",
};

interface Attendee {
    country: string;
    location: string;
    position: string;
}

interface Props {
    attendees: Attendee[];
}

export default function Demographic({ attendees }: Props) {
    const mapRef = React.useRef<HTMLDivElement>(null);
    const mapInstance = React.useRef<any>(null);

    React.useEffect(() => {
        if (!mapRef.current) return;

        // ✅ Aggregate attendees by normalized country names
        const countryGroups = attendees.reduce((acc, attendee) => {
            if (!attendee.country || attendee.country.trim().toLowerCase() === "unknown") {
                return acc; // skip unknowns
            }

            const key = attendee.country.trim().toLowerCase();
            const normalizedCountry = countryNameMap[key] || attendee.country;

            // Get coordinates from world-countries
            const countryData = countries.find(
                (c) => c.name.common === normalizedCountry
            );
            if (!countryData || !countryData.latlng) return acc;

            if (!acc[normalizedCountry]) {
                acc[normalizedCountry] = {
                    name: normalizedCountry,
                    count: 0,
                    positions: new Set<string>(),
                    coords: countryData.latlng as [number, number],
                };
            }

            acc[normalizedCountry].count++;
            acc[normalizedCountry].positions.add(attendee.position);
            return acc;
        }, {} as Record<string, { name: string; count: number; positions: Set<string>; coords: [number, number] }>);

        // Create markers automatically from normalized countries
        const markers = Object.values(countryGroups).map(country => ({
            name: `${country.name} (${country.count})`,
            coords: country.coords,
        }));

        // Destroy old instance
        if (mapInstance.current) {
            mapInstance.current.destroy();
            mapInstance.current = null;
        }

        // Initialize map
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
            onMarkerHover: function (event, index, marker) {
                const countryName = marker.name.split(' (')[0];
                const countryData = countryGroups[countryName];
                if (countryData) {
                    const fullInfo = `${countryData.name} (${countryData.count})\nPositions: ${[...countryData.positions].join(', ')}`;
                    (this as any).tooltip.textContent = fullInfo;
                }
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
                    {/* Map */}
                    <div ref={mapRef} style={{ width: 700, height: 400 }} />

                    {/* Attendee List */}
                    <div style={{ maxHeight: 400, overflowY: 'auto', width: 300 }}>
                        <h3>Attendees by Country</h3>
                        <ul>
                            {Object.values(
                                attendees.reduce((acc, attendee) => {
                                    if (!attendee.country || attendee.country.trim().toLowerCase() === "unknown") {
                                        return acc; // skip unknowns
                                    }

                                    const key = attendee.country.trim().toLowerCase();
                                    const normalizedCountry = countryNameMap[key] || attendee.country;

                                    if (!acc[normalizedCountry]) {
                                        acc[normalizedCountry] = {
                                            country: normalizedCountry,
                                            count: 0,
                                        };
                                    }
                                    acc[normalizedCountry].count++;
                                    return acc;
                                }, {} as Record<string, { country: string; count: number }>))
                                .map(({ country, count }) => (
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
