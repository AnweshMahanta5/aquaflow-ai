import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function PlumberPanel() {
  const [coords, setCoords] = useState(null);
  const [geoError, setGeoError] = useState('');
  const [geoLoading, setGeoLoading] = useState(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      setGeoError(
        'Your browser does not support precise location. Showing approximate plumbers near you.'
      );
      setGeoLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setGeoLoading(false);
      },
      (err) => {
        console.error(err);

        if (err.code === 1) {
          // Permission denied
          setGeoError(
            'Location access was blocked in the browser. Showing approximate plumbers near you instead.'
          );
        } else {
          setGeoError(
            'Could not get precise GPS location. Showing approximate plumbers near you.'
          );
        }

        setGeoLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      }
    );
  }, []);

  // More precise: center map exactly on coords with higher zoom
  let mapSrc = '';
  if (coords) {
  const { lat, lng } = coords;
  // Show "plumber near me" and center around your precise coordinates
  mapSrc = `https://www.google.com/maps?q=plumber+near+me&ll=${lat},${lng}&z=16&output=embed`;
} else {
  // Fallback – Google guesses your area from network/IP
  mapSrc = 'https://www.google.com/maps?q=plumber+near+me&z=14&output=embed';
}


  return (
    <motion.div
      className="rounded-3xl border border-slate-800/80 bg-slate-900/90 p-4 sm:p-5 shadow-glass"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
    >
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-sm sm:text-base font-semibold text-slate-50 flex items-center gap-2">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-300 text-xs">
            🧰
          </span>
          Plumber locator
        </h2>
        <span className="text-[10px] sm:text-xs text-slate-400">
          Powered by Google Maps
        </span>
      </div>

      {geoLoading && (
        <p className="text-[11px] sm:text-xs text-slate-300 mb-2 flex items-center gap-2">
          <span className="inline-flex h-3 w-3 border-2 border-emerald-200 border-t-transparent rounded-full animate-spin" />
          Trying to detect your location…
        </p>
      )}

      {!geoLoading && coords && (
        <p className="text-[10px] sm:text-[11px] text-emerald-300 mb-2">
          Showing plumbers near your detected location.
        </p>
      )}

      {!geoLoading && !coords && geoError && (
        <p className="text-[10px] sm:text-[11px] text-amber-300 mb-2">
          {geoError}
        </p>
      )}

      <div className="h-32 sm:h-40 rounded-xl overflow-hidden border border-slate-800 mb-2">
        <iframe
          title="Plumbers on Google Maps"
          src={mapSrc}
          className="w-full h-full"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      <p className="text-[10px] sm:text-[11px] text-slate-400">
        If the position looks wrong, enable location access for this site in
        your browser settings and reload the page. You can always pan and zoom
        the map to explore more plumbers around you.
      </p>
    </motion.div>
  );
}
