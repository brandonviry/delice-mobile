"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { FoodTruckLocation, LocationStatus } from "@/types/location";

// Fonction pour créer les icônes personnalisées
const createCustomIcon = (color: string) => {
  if (typeof window === 'undefined') return null;

  return L.divIcon({
    className: "custom-marker",
    html: `
      <div style="
        background-color: ${color};
        width: 32px;
        height: 32px;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        border: 3px solid white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <div style="
          transform: rotate(45deg);
          color: white;
          font-size: 16px;
          font-weight: bold;
        ">📍</div>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
};

// Composant pour ajuster la vue de la carte
function MapBounds({ locations }: { locations: FoodTruckLocation[] }) {
  const map = useMap();

  useEffect(() => {
    if (locations.length > 0) {
      const bounds = L.latLngBounds(
        locations.map((loc) => [loc.latitude, loc.longitude])
      );
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [locations, map]);

  return null;
}

interface FoodTruckMapProps {
  locations: FoodTruckLocation[];
  currentLocation: FoodTruckLocation | null;
  nextLocation: FoodTruckLocation | null;
}

export function FoodTruckMap({
  locations,
  currentLocation,
  nextLocation,
}: FoodTruckMapProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [icons, setIcons] = useState<{
    passed: L.DivIcon | null;
    current: L.DivIcon | null;
    upcoming: L.DivIcon | null;
  }>({
    passed: null,
    current: null,
    upcoming: null,
  });

  useEffect(() => {
    setIsMounted(true);

    // Créer les icônes uniquement côté client
    if (typeof window !== 'undefined') {
      setIcons({
        passed: createCustomIcon("#8c8577") as L.DivIcon, // gris olive discret
        current: createCustomIcon("#6b7c59") as L.DivIcon, // brand-olive
        upcoming: createCustomIcon("#f4a261") as L.DivIcon, // brand-orange
      });
    }
  }, []);

  if (!isMounted || !icons.passed || !icons.current || !icons.upcoming) {
    return (
      <div className="w-full h-[500px] bg-gray-100 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">Chargement de la carte...</p>
      </div>
    );
  }

  if (locations.length === 0) {
    return (
      <div className="w-full h-[500px] bg-gray-100 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">Aucun emplacement configuré</p>
      </div>
    );
  }

  // Centre par défaut (Réunion)
  const defaultCenter: [number, number] = [-21.1151, 55.5364];
  const center: [number, number] = currentLocation
    ? [currentLocation.latitude, currentLocation.longitude]
    : nextLocation
    ? [nextLocation.latitude, nextLocation.longitude]
    : defaultCenter;

  // Lignes de parcours
  const passedRoute = locations
    .filter((loc) => loc.status === LocationStatus.PASSED)
    .map((loc) => [loc.latitude, loc.longitude] as [number, number]);

  const upcomingRoute = locations
    .filter(
      (loc) =>
        loc.status === LocationStatus.UPCOMING ||
        loc.status === LocationStatus.CURRENT
    )
    .map((loc) => [loc.latitude, loc.longitude] as [number, number]);

  const formatTime = (time: string) => {
    return time.substring(0, 5); // HH:mm
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("fr-FR", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
  };

  const getMarkerIcon = (status: LocationStatus): L.DivIcon => {
    switch (status) {
      case LocationStatus.PASSED:
        return icons.passed!;
      case LocationStatus.CURRENT:
        return icons.current!;
      case LocationStatus.UPCOMING:
        return icons.upcoming!;
    }
  };

  const getStatusLabel = (status: LocationStatus) => {
    switch (status) {
      case LocationStatus.PASSED:
        return "Passé";
      case LocationStatus.CURRENT:
        return "En cours";
      case LocationStatus.UPCOMING:
        return "À venir";
    }
  };

  const getStatusColor = (status: LocationStatus) => {
    switch (status) {
      case LocationStatus.PASSED:
        return "text-stone-700 bg-stone-100";
      case LocationStatus.CURRENT:
        return "text-brand-olive bg-brand-gold/20";
      case LocationStatus.UPCOMING:
        return "text-brand-rust bg-brand-orange/20";
    }
  };

  return (
    <div className="w-full h-[500px] rounded-lg overflow-hidden shadow-lg border border-gray-200 relative z-0">
      <MapContainer
        center={center}
        zoom={11}
        className="h-full w-full"
        scrollWheelZoom={true}
        zoomControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Ligne de parcours passé */}
        {passedRoute.length > 1 && (
          <Polyline
            positions={passedRoute}
            color="#8c8577"
            weight={3}
            opacity={0.6}
            dashArray="10, 10"
          />
        )}

        {/* Ligne de parcours futur */}
        {upcomingRoute.length > 1 && (
          <Polyline
            positions={upcomingRoute}
            color="#f4a261"
            weight={4}
            opacity={0.8}
          />
        )}

        {/* Marqueurs */}
        {locations.map((location) => (
          <Marker
            key={location.id}
            position={[location.latitude, location.longitude]}
            icon={getMarkerIcon(location.status)}
          >
            <Popup>
              <div className="p-2 min-w-[200px]">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-bold text-lg text-gray-900">
                    {location.name}
                  </h3>
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-semibold ${getStatusColor(
                      location.status
                    )}`}
                  >
                    {getStatusLabel(location.status)}
                  </span>
                </div>

                <p className="text-sm text-gray-600 mb-2">{location.address}</p>

                <div className="space-y-1 text-sm">
                  <p className="font-semibold text-gray-700">
                    📅 {formatDate(location.date)}
                  </p>
                  <p className="text-gray-600">
                    🕐 {formatTime(location.startTime)} - {formatTime(location.endTime)}
                  </p>
                </div>

                {location.description && (
                  <p className="mt-2 text-sm text-gray-500 italic">
                    {location.description}
                  </p>
                )}
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Ajuster la vue */}
        <MapBounds locations={locations} />
      </MapContainer>
    </div>
  );
}
