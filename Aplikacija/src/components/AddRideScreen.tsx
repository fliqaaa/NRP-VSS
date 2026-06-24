import React, { useState } from 'react';
import { Ride, BikeDetails, ScreenType, UnitSystem } from '../types';

interface AddRideScreenProps {
  onAddRide: (ride: Omit<Ride, 'id' | 'status'>) => void;
  bikeDetails: BikeDetails;
  setScreen: (screen: ScreenType) => void;
  unitSystem: UnitSystem;
}

export default function AddRideScreen({
  onAddRide,
  bikeDetails,
  setScreen,
  unitSystem
}: AddRideScreenProps) {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [bikeProfile, setBikeProfile] = useState(`${bikeDetails.brand} ${bikeDetails.model}`);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [elevation, setElevation] = useState('');
  const [avgHeartRate, setAvgHeartRate] = useState('');
  const [calories, setCalories] = useState('');
  const [notes, setNotes] = useState('');

  // Submission / Syncing Simulation States
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatusText, setSyncStatusText] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  // Duration auto-formatting: HH:MM:SS
  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 6) val = val.substring(0, 6);
    
    let formatted = '';
    if (val.length > 0) formatted += val.substring(0, 2);
    if (val.length > 2) formatted += ':' + val.substring(2, 4);
    if (val.length > 4) formatted += ':' + val.substring(4, 6);
    
    setDuration(formatted);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const distNum = parseFloat(distance);
    if (isNaN(distNum) || distNum <= 0) {
      alert('Vnesite veljavno razdaljo vožnje.');
      return;
    }

    // Convert distance if in Imperial units (internally stored in KM)
    const distanceInKm = unitSystem === 'imperial' ? distNum * 1.60934 : distNum;
    
    // Convert elevation if in feet (internally stored in meters)
    const elevationInMeters = elevation ? (unitSystem === 'imperial' ? parseFloat(elevation) * 0.3048 : parseFloat(elevation)) : 0;

    setIsSyncing(true);
    setSyncStatusText('Povezovanje z oblakom...');

    setTimeout(() => {
      setSyncStatusText('Sinhronizacija kolesarske telemetrije...');
      
      setTimeout(() => {
        // Trigger parent state update
        onAddRide({
          date,
          bikeProfile,
          distance: distanceInKm,
          duration: duration || '01:00:00',
          elevation: Math.round(elevationInMeters),
          avgHeartRate: avgHeartRate ? parseInt(avgHeartRate) : 130,
          calories: calories ? parseInt(calories) : Math.round(distanceInKm * 25),
          notes: notes || `Regularna vožnja s kolesom ${bikeProfile}.`
        });

        setIsSyncing(false);
        setIsSaved(true);

        setTimeout(() => {
          // Navigate back to dashboard
          setScreen('dashboard');
        }, 1200);
      }, 1000);
    }, 1000);
  };

  return (
    <div className="px-8 py-6 max-w-5xl mx-auto space-y-8 animate-fade-in">
      <div className="grid grid-cols-12 gap-8">
        {/* Atmospheric Imagery Section (Left) */}
        <div className="col-span-12 md:col-span-4 flex flex-col justify-between">
          <div className="relative group h-64 md:h-full rounded-xl overflow-hidden border border-outline-variant min-h-[380px] flex flex-col justify-end p-6">
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ 
                backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBkpBb1m6js4rflYNu86u1qxawJtoS7b988Vwn8MdW5YruWKDjYiTkkdaWFNqATKSjWh7_ev41pjevJqzJkHqfnmmOJtGK3u3lv-Ta_5jjJ3A7dQW4IX4CXdc6oFf9H7jAXcxO2YxAT0qy9MVm-Zfngs3DivXw0R5JT5QLDyYH0fp0J0R-OPm9__BhFlewQ8as0sW6KHZv5C1U4iK2sM0wIqQG5HVwLTss065jL5Xsfkr4RhAyaJyATeYa3zkibqxQDm6OEqNs5JAM')` 
              }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-90"></div>
            
            <div className="relative z-10 space-y-2">
              <span className="font-mono text-[10px] font-extrabold text-primary-fixed-dim bg-on-primary-fixed-variant px-2.5 py-1 rounded">
                INTENSITY: HIGH
              </span>
              <h3 className="font-display text-2xl font-extrabold mt-2 leading-tight text-white">
                Log your latest performance
              </h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Avtomatsko sinhroniziranje s pametnimi senzorji in GPS telemetrijo.
              </p>
            </div>
          </div>
        </div>

        {/* Focused Form Section (Right) */}
        <div className="col-span-12 md:col-span-8">
          <div className="bg-surface-container-low border border-outline-variant p-8 rounded-xl shadow-xl">
            {isSaved ? (
              <div className="py-16 text-center space-y-4 animate-scale-up">
                <span className="material-symbols-outlined text-6xl text-primary-fixed-dim animate-bounce" style={{ fontVariationSettings: "'FILL' 1" }}>
                  check_circle
                </span>
                <h4 className="font-display text-xl font-bold text-white">Vožnja shranjena!</h4>
                <p className="text-sm text-on-surface-variant">Statistika kolesa in življenjska doba komponent sta bili posodobljeni.</p>
              </div>
            ) : isSyncing ? (
              <div className="py-16 text-center space-y-6">
                <div className="w-12 h-12 border-4 border-primary-fixed-dim/20 border-t-primary-fixed-dim rounded-full animate-spin mx-auto"></div>
                <h4 className="font-display text-lg font-bold text-white">{syncStatusText}</h4>
                <p className="text-xs text-on-surface-variant">Prosimo počakajte, da se podatki prenesejo...</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Date & Bike Profile */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="font-mono text-xs text-on-surface-variant uppercase tracking-wider block">Date of Ride</label>
                    <div className="relative">
                      <input 
                        type="date" 
                        value={date} 
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-3.5 text-on-surface focus:ring-1 focus:ring-primary-fixed-dim focus:outline-none focus:border-primary-fixed-dim"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="font-mono text-xs text-on-surface-variant uppercase tracking-wider block">Bike Profile</label>
                    <select 
                      value={bikeProfile}
                      onChange={(e) => setBikeProfile(e.target.value)}
                      className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-3.5 text-on-surface focus:ring-1 focus:ring-primary-fixed-dim focus:outline-none focus:border-primary-fixed-dim"
                    >
                      <option value="Canyon Endurace CF SL">Canyon Endurace CF SL</option>
                      <option value="S-Works Tarmac SL8">S-Works Tarmac SL8</option>
                      <option value="Specialized Epic EVO">Specialized Epic EVO</option>
                    </select>
                  </div>
                </div>

                {/* Distance & Duration */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="font-mono text-xs text-on-surface-variant uppercase tracking-wider block">Distance</label>
                    <div className="relative">
                      <input 
                        type="number" 
                        step="0.01"
                        placeholder="0.00"
                        value={distance} 
                        onChange={(e) => setDistance(e.target.value)}
                        className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-3.5 font-display text-2xl font-bold text-primary-fixed-dim focus:ring-1 focus:ring-primary-fixed-dim focus:outline-none focus:border-primary-fixed-dim pr-16"
                        required
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 font-mono text-xs text-on-surface-variant font-bold">
                        {unitSystem === 'imperial' ? 'MI' : 'KM'}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="font-mono text-xs text-on-surface-variant uppercase tracking-wider block">Duration</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        placeholder="HH:MM:SS"
                        value={duration} 
                        onChange={handleDurationChange}
                        className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-3.5 font-display text-2xl font-bold text-primary-fixed-dim focus:ring-1 focus:ring-primary-fixed-dim focus:outline-none focus:border-primary-fixed-dim pr-16"
                        required
                      />
                      <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant">
                        timer
                      </span>
                    </div>
                  </div>
                </div>

                {/* Secondary optional telemetry parameters */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-surface-container p-3 rounded-lg border border-outline-variant/30 hover:border-primary-fixed-dim transition-colors">
                    <label className="font-mono text-[10px] text-on-surface-variant uppercase block mb-1">
                      Elevation ({unitSystem === 'imperial' ? 'ft' : 'm'})
                    </label>
                    <input 
                      type="number" 
                      placeholder="0"
                      value={elevation}
                      onChange={(e) => setElevation(e.target.value)}
                      className="w-full bg-transparent border-none p-0 font-display font-bold text-lg text-on-surface focus:ring-0 focus:outline-none"
                    />
                  </div>
                  <div className="bg-surface-container p-3 rounded-lg border border-outline-variant/30 hover:border-primary-fixed-dim transition-colors">
                    <label className="font-mono text-[10px] text-on-surface-variant uppercase block mb-1">Avg HR (bpm)</label>
                    <input 
                      type="number" 
                      placeholder="0"
                      value={avgHeartRate}
                      onChange={(e) => setAvgHeartRate(e.target.value)}
                      className="w-full bg-transparent border-none p-0 font-display font-bold text-lg text-on-surface focus:ring-0 focus:outline-none"
                    />
                  </div>
                  <div className="bg-surface-container p-3 rounded-lg border border-outline-variant/30 hover:border-primary-fixed-dim transition-colors">
                    <label className="font-mono text-[10px] text-on-surface-variant uppercase block mb-1">Calories (kcal)</label>
                    <input 
                      type="number" 
                      placeholder="0"
                      value={calories}
                      onChange={(e) => setCalories(e.target.value)}
                      className="w-full bg-transparent border-none p-0 font-display font-bold text-lg text-on-surface focus:ring-0 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Ride Notes */}
                <div className="space-y-2">
                  <label className="font-mono text-xs text-on-surface-variant uppercase tracking-wider block">Ride Notes & Conditions</label>
                  <textarea 
                    placeholder="Kakšno je bilo počutje? Vreme, veter, mehanske težave ali posebni odseki poteka..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={4}
                    className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-3.5 text-on-surface focus:ring-1 focus:ring-primary-fixed-dim focus:outline-none focus:border-primary-fixed-dim resize-none"
                  ></textarea>
                </div>

                {/* Actions */}
                <div className="pt-4 flex flex-col sm:flex-row gap-4 items-center justify-between">
                  <div className="flex items-center gap-2 text-on-surface-variant text-xs">
                    <span className="material-symbols-outlined text-sm">cloud_upload</span>
                    <span>Avtomatska obdelava telemetrije</span>
                  </div>
                  <div className="flex gap-3 w-full sm:w-auto">
                    <button 
                      type="button"
                      onClick={() => setScreen('dashboard')}
                      className="flex-1 sm:flex-none px-6 py-3 bg-surface-container-highest text-on-surface rounded-full text-xs font-bold hover:bg-surface-bright transition-all cursor-pointer"
                    >
                      Prekliči
                    </button>
                    <button 
                      type="submit"
                      className="flex-grow sm:flex-none px-10 py-3.5 bg-primary-fixed-dim text-on-primary-fixed font-bold rounded-full hover:scale-105 active:scale-95 transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer text-sm"
                    >
                      <span>Save Ride</span>
                      <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>
                        check_circle
                      </span>
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
