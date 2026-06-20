import FrontLayout from '@/layouts/FrontLayout';
import { Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default Leaflet icon issues in React
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

interface Himpunan {
    name: string;
    lat: number;
    lng: number;
}

const wilayahData: Record<number, Himpunan[]> = {
    1: [
        { name: "PERMATA FT UNSRI", lat: -3.2185, lng: 104.6521 },
        { name: "HIMATA ISTP", lat: 3.5952, lng: 98.6722 },
        { name: "HMTP FT UNP", lat: -0.9009, lng: 100.3486 },
        { name: "HIMATA UBB", lat: -1.8624, lng: 106.1082 },
        { name: "HIMATA STTIND", lat: -0.9100, lng: 100.3500 },
        { name: "HMTT UMB", lat: -3.8000, lng: 102.2600 },
        { name: "HMTP USK", lat: 5.5700, lng: 95.3600 },
        { name: "HMTP UNJA", lat: -1.6100, lng: 103.5800 },
        { name: "HMTA ITERA", lat: -5.3600, lng: 105.3100 },
        { name: "HMPS MATARATU PAP", lat: -4.0000, lng: 104.0000 }
    ],
    2: [
        { name: "HMT-ITB", lat: -6.8915, lng: 107.6107 },
        { name: "HMTP UNISBA", lat: -6.9048, lng: 107.6083 },
        { name: "HMTA UPN", lat: -7.7656, lng: 110.4079 },
        { name: "HMTT USAKTI", lat: -6.1674, lng: 106.7905 },
        { name: "HMTPM AGP (D3)", lat: -6.9200, lng: 107.6000 },
        { name: "HIMATETA ITATS", lat: -7.2885, lng: 112.7842 },
        { name: "HMTA ITNY", lat: -7.7800, lng: 110.4100 },
        { name: "HMTP UNDANA", lat: -10.1500, lng: 123.6300 },
        { name: "HIMETA ITSB", lat: -6.3500, lng: 107.1500 },
        { name: "HITAM UIN", lat: -6.3000, lng: 106.7500 },
        { name: "HMTP ITY", lat: -7.8000, lng: 110.4000 },
        { name: "HMT-UMTAS", lat: -7.3300, lng: 108.2000 },
        { name: "HMTA UMMAT", lat: -8.5800, lng: 116.1000 },
        { name: "HMT UMMAT (D3)", lat: -8.5850, lng: 116.1050 },
        { name: "HMT UNDOVA", lat: -8.5000, lng: 116.5000 },
        { name: "HMTP PEP (D3)", lat: -6.9000, lng: 107.6500 },
        { name: "HIMATA UNEJ", lat: -8.1600, lng: 113.7200 },
        { name: "HMTT STTMI (D3)", lat: -6.9500, lng: 107.6000 },
        { name: "PERMATA UTS", lat: -8.4900, lng: 117.4100 }
    ],
    3: [
        { name: "HMTP UNMUL", lat: -0.4700, lng: 117.1500 },
        { name: "HMTP UNIKARTA", lat: -0.4200, lng: 116.9800 },
        { name: "HIMASAPTA ULM", lat: -3.2900, lng: 114.5800 },
        { name: "HMTP UPR", lat: -2.2100, lng: 113.9000 },
        { name: "INTAN POLIBAN", lat: -3.2950, lng: 114.5850 },
        { name: "HIMATA FT UNTAN", lat: -0.0500, lng: 109.3400 },
        { name: "HMJTSP POLITAP", lat: -1.8200, lng: 109.9700 },
        { name: "HMTP POLISAFARIS", lat: -0.5000, lng: 117.1000 }
    ],
    4: [
        { name: "HMTP UPRI Makassar", lat: -5.1300, lng: 119.4100 },
        { name: "HMTP UMI", lat: -5.1350, lng: 119.4500 },
        { name: "HMTP USN Kolaka", lat: -4.0500, lng: 121.6000 },
        { name: "PERMATA FT-UH", lat: -5.1320, lng: 119.4800 },
        { name: "HMTP UHO", lat: -4.0100, lng: 122.5200 },
        { name: "HMTP UNIDAYAN", lat: -5.4600, lng: 122.6000 },
        { name: "HMTP UM Kendari", lat: -3.9800, lng: 122.5100 },
        { name: "HMTP UNIBOS", lat: -5.1380, lng: 119.4400 },
        { name: "PERMATA UST", lat: -5.1400, lng: 119.4300 }
    ],
    5: [
        { name: "HMTP USTJ", lat: -2.5700, lng: 140.6400 },
        { name: "HMTP UNCEN", lat: -2.5800, lng: 140.6500 },
        { name: "HMTP UMMU", lat: -0.8000, lng: 127.3800 },
        { name: "HMTP UNIPA", lat: -0.8600, lng: 134.0600 },
        { name: "HMTP UNKHAIR", lat: -0.8100, lng: 127.3700 },
        { name: "HMTP PAT", lat: -2.5500, lng: 140.6300 }
    ]
};

const romanNumerals = ['I', 'II', 'III', 'IV', 'V'];

// Helper to center the map when tab changes
function MapUpdater({ activeWilayah }: { activeWilayah: number }) {
    const map = useMap();
    useEffect(() => {
        const centers: Record<number, [number, number]> = {
            1: [-0.9, 101.0], // Sumatra
            2: [-7.0, 110.0], // Java & NT
            3: [0.0, 114.0], // Kalimantan
            4: [-3.0, 120.0], // Sulawesi
            5: [-2.0, 134.0] // Papua & Maluku
        };
        const zooms: Record<number, number> = {
            1: 5.5,
            2: 6.5,
            3: 6,
            4: 6,
            5: 5.5
        };
        map.flyTo(centers[activeWilayah], zooms[activeWilayah], { duration: 1.5 });
    }, [activeWilayah, map]);
    return null;
}

export default function Anggota() {
    const [activeWilayah, setActiveWilayah] = useState<number>(4);

    // Create a custom icon generator
    const createCustomIcon = (himpunan: string, wilayahId: number) => {
        const logoSrc = `/logo-himpunan/wilayah${wilayahId}/${himpunan}.png`;
        const fallbackSrc = `https://ui-avatars.com/api/?name=${encodeURIComponent(himpunan)}&background=FACC15&color=0B1727&bold=true`;
        
        return L.divIcon({
            className: 'custom-leaflet-marker',
            html: `
                <div style="background-color: white; border-radius: 50%; padding: 4px; box-shadow: 0 4px 6px rgba(0,0,0,0.3); border: 2px solid #FACC15; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; overflow: hidden; position: relative;">
                    <img src="${logoSrc}" onerror="this.onerror=null;this.src='${fallbackSrc}';" style="width: 100%; height: 100%; object-fit: contain;" alt="${himpunan}" />
                </div>
                <div style="width: 0; height: 0; border-left: 8px solid transparent; border-right: 8px solid transparent; border-top: 10px solid #FACC15; position: absolute; bottom: -10px; left: 50%; transform: translateX(-50%);"></div>
            `,
            iconSize: [40, 50],
            iconAnchor: [20, 50], // Point of the marker
            popupAnchor: [0, -45] // Where the popup opens relative to the iconAnchor
        });
    };

    return (
        <FrontLayout>
            <Head title="Anggota | Permata Indonesia" />
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-[#0B1727] mb-6 border-b-2 border-[#FACC15] pb-2 inline-block">Himpunan Anggota</h1>
                
                <div className="mt-8">
                    <p className="text-gray-600 mb-8 max-w-2xl">
                        PERMATA Indonesia menaungi himpunan mahasiswa pertambangan yang tersebar di 5 wilayah koordinasi di seluruh Indonesia.
                    </p>

                    {/* Map and List */}
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="relative md:col-span-2 bg-gray-100 rounded-xl overflow-hidden shadow-inner h-[500px]">
                            {/* Interactive Leaflet Map */}
                            {typeof window !== 'undefined' && (
                                <MapContainer 
                                    center={[-3.0, 120.0]} 
                                    zoom={6} 
                                    style={{ height: '100%', width: '100%', zIndex: 0 }}
                                    scrollWheelZoom={false}
                                >
                                    <TileLayer
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                    <MapUpdater activeWilayah={activeWilayah} />
                                    
                                    {/* Render markers for current wilayah */}
                                    {wilayahData[activeWilayah].map((himpunan, i) => (
                                        <Marker 
                                            key={i} 
                                            position={[himpunan.lat, himpunan.lng]}
                                            icon={createCustomIcon(himpunan.name, activeWilayah)}
                                        >
                                            <Popup className="custom-popup">
                                                <div className="text-center p-2">
                                                    <img 
                                                        src={`/logo-himpunan/wilayah${activeWilayah}/${himpunan.name}.png`} 
                                                        onError={(e) => {
                                                            const target = e.target as HTMLImageElement;
                                                            if (!target.src.includes('ui-avatars')) {
                                                                target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(himpunan.name)}&background=FACC15&color=0B1727&bold=true`;
                                                            }
                                                        }}
                                                        alt={himpunan.name} 
                                                        className="h-16 w-16 mx-auto mb-3 object-contain" 
                                                    />
                                                    <h3 className="font-bold text-[#0B1727] text-sm leading-tight">{himpunan.name}</h3>
                                                    <p className="text-xs text-gray-500 mt-1">Anggota Wilayah {romanNumerals[activeWilayah - 1]}</p>
                                                </div>
                                            </Popup>
                                        </Marker>
                                    ))}
                                </MapContainer>
                            )}
                        </div>
                        
                        <div className="flex flex-col h-[500px] bg-white border border-gray-100 rounded-xl shadow-sm p-4">
                            <h3 className="text-xl font-bold text-[#0B1727] mb-4 shrink-0 pb-2 border-b border-gray-100">
                                Anggota di Wilayah {romanNumerals[activeWilayah - 1]}
                            </h3>
                            <div className="overflow-y-auto flex-grow pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400">
                                <ul className="space-y-3 pb-2">
                                    {wilayahData[activeWilayah].map((himpunan, i) => (
                                        <li key={i} className="bg-white border border-gray-200 p-3 rounded shadow-sm text-sm font-medium text-gray-700 hover:border-[#FACC15] cursor-pointer transition-colors flex items-center gap-3 group">
                                            <div className="w-8 h-8 rounded shrink-0 overflow-hidden bg-gray-50 border border-gray-100">
                                                <img 
                                                    src={`/logo-himpunan/wilayah${activeWilayah}/${himpunan.name}.png`} 
                                                    onError={(e) => {
                                                        const target = e.target as HTMLImageElement;
                                                        if (!target.src.includes('ui-avatars')) {
                                                            target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(himpunan.name)}&background=FACC15&color=0B1727&bold=true`;
                                                        }
                                                    }}
                                                    alt={himpunan.name} 
                                                    className="w-full h-full object-contain" 
                                                />
                                            </div>
                                            <span className="group-hover:text-[#0B1727]">{himpunan.name}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Regions Tabs */}
                    <div className="mt-12 flex flex-wrap gap-4">
                        {[1, 2, 3, 4, 5].map((wilayah) => (
                            <button
                                key={wilayah}
                                onClick={() => setActiveWilayah(wilayah)}
                                className={`px-6 py-3 rounded font-bold text-sm border-2 transition-all duration-200 ${
                                    activeWilayah === wilayah
                                        ? 'bg-[#FACC15] border-[#FACC15] text-[#0B1727] shadow-md scale-105'
                                        : 'bg-transparent border-gray-300 text-gray-600 hover:border-[#0B1727] hover:text-[#0B1727]'
                                }`}
                            >
                                WILAYAH {romanNumerals[wilayah - 1]}
                            </button>
                        ))}
                    </div>

                </div>
            </div>
            
            <style>{`
                .custom-popup .leaflet-popup-content-wrapper {
                    border-radius: 12px;
                    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
                }
                .custom-popup .leaflet-popup-content {
                    margin: 10px 14px;
                }
            `}</style>
        </FrontLayout>
    );
}
