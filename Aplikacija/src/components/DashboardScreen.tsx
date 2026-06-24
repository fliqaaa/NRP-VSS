import React, { useState } from 'react';
import { Ride, Service, Expense, BikeDetails, ScreenType, UnitSystem } from '../types';

interface DashboardScreenProps {
  rides: Ride[];
  services: Service[];
  expenses: Expense[];
  bikeDetails: BikeDetails;
  setScreen: (screen: ScreenType) => void;
  unitSystem: UnitSystem;
  searchQuery: string;
}

export default function DashboardScreen({
  rides,
  services,
  expenses,
  bikeDetails,
  setScreen,
  unitSystem,
  searchQuery
}: DashboardScreenProps) {
  const [activityRange, setActivityRange] = useState<'7' | '30'>('30');
  const [activeAlerts, setActiveAlerts] = useState({
    brakePads: true,
    tireWear: true
  });
  const [showTireSuccess, setShowTireSuccess] = useState(false);
  const [showOrderSuccess, setShowOrderSuccess] = useState(false);

  // Unit conversion helpers
  const formatDistance = (km: number) => {
    if (unitSystem === 'imperial') {
      const miles = km * 0.621371;
      return `${miles.toFixed(1)} mi`;
    }
    return `${km.toFixed(1)} km`;
  };

  const formatElevation = (meters: number) => {
    if (unitSystem === 'imperial') {
      const feet = meters * 3.28084;
      return `${Math.round(feet)} ft`;
    }
    return `${meters} m`;
  };

  // 1. Calculate Total Distance
  const totalDistanceKm = rides.reduce((sum, ride) => sum + ride.distance, 0);

  // 2. Calculate Services This Year (e.g., 2023 or 2026 based on current year)
  const currentYear = new Date().getFullYear();
  const servicesThisYear = services.filter(srv => {
    const srvYear = new Date(srv.date).getFullYear();
    return srvYear === 2023 || srvYear === currentYear;
  }).length;

  // 3. Calculate Maintenance Costs
  const serviceCosts = services.reduce((sum, srv) => sum + srv.cost, 0);
  const maintExpenses = expenses
    .filter(exp => exp.category === 'Maintenance')
    .reduce((sum, exp) => sum + exp.cost, 0);
  const totalMaintenanceCosts = serviceCosts + maintExpenses;

  // Filter rides based on search query
  const filteredRides = rides.filter(ride => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      ride.notes.toLowerCase().includes(query) ||
      ride.bikeProfile.toLowerCase().includes(query) ||
      ride.distance.toString().includes(query)
    );
  });

  // Simple ride type determination (just an illustrative tagging)
  const getRideType = (distance: number, elev: number) => {
    if (elev > 1000) return { label: 'Mountain Clb', color: 'bg-tertiary-container/15 text-tertiary-fixed-dim' };
    if (distance > 60) return { label: 'Endurance', color: 'bg-secondary-container/15 text-secondary' };
    return { label: 'Intervals', color: 'bg-primary-fixed-dim/15 text-primary-fixed-dim' };
  };

  // Generate mock chart values based on actual rides or structured defaults
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const activityData7Days = [12, 28, 65, 0, 15, 82, 45]; // mock patterns
  const activityData30Days = [30, 45, 68, 22, 18, 82, 55]; // matches mockup proportions

  const activeChartData = activityRange === '7' ? activityData7Days : activityData30Days;
  const maxChartVal = Math.max(...activeChartData, 100);

  const handleOrderReplacement = () => {
    setShowOrderSuccess(true);
    setTimeout(() => {
      setShowOrderSuccess(false);
      setActiveAlerts(prev => ({ ...prev, brakePads: false }));
    }, 2500);
  };

  const handleMarkTireChecked = () => {
    setShowTireSuccess(true);
    setTimeout(() => {
      setShowTireSuccess(false);
      setActiveAlerts(prev => ({ ...prev, tireWear: false }));
    }, 2500);
  };

  // Chain life status
  const chainLimit = 4000;
  const chainRemaining = Math.max(0, chainLimit - bikeDetails.chainAgeKm);
  const chainLifePct = Math.min(100, (bikeDetails.chainAgeKm / chainLimit) * 100);

  return (
    <div className="px-8 py-6 space-y-8 max-w-7xl mx-auto">
      {/* Summary Stat Grid */}
      <div className="grid grid-cols-12 gap-6">
        {/* Total Distance */}
        <div className="col-span-12 md:col-span-4 bg-surface-container-low border border-outline-variant p-6 rounded-xl relative overflow-hidden group hover:border-primary-fixed-dim/30 transition-all duration-300">
          <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
            <span className="material-symbols-outlined text-9xl text-on-surface">route</span>
          </div>
          <p className="font-mono text-xs text-on-surface-variant uppercase tracking-wider mb-2">TOTAL DISTANCE</p>
          <h3 className="font-display text-4xl font-extrabold text-primary-fixed-dim">
            {formatDistance(totalDistanceKm)}
          </h3>
          <div className="mt-4 flex items-center gap-2 text-primary-fixed-dim/80 text-xs">
            <span className="material-symbols-outlined text-sm">trending_up</span>
            <span>+12% vs last month</span>
          </div>
        </div>

        {/* Services This Year */}
        <div className="col-span-12 md:col-span-4 bg-surface-container-low border border-outline-variant p-6 rounded-xl relative overflow-hidden group hover:border-primary-fixed-dim/30 transition-all duration-300">
          <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
            <span className="material-symbols-outlined text-9xl text-on-surface">handyman</span>
          </div>
          <p className="font-mono text-xs text-on-surface-variant uppercase tracking-wider mb-2">SERVICES LOGGED</p>
          <h3 className="font-display text-4xl font-extrabold text-white">
            {servicesThisYear} <span className="text-sm font-normal text-on-surface-variant font-sans">this year</span>
          </h3>
          <div className="mt-4 flex items-center gap-2 text-on-surface-variant text-xs">
            <span className="material-symbols-outlined text-sm">event</span>
            <span>Next inspection due soon</span>
          </div>
        </div>

        {/* Maintenance Costs */}
        <div className="col-span-12 md:col-span-4 bg-surface-container-low border border-outline-variant p-6 rounded-xl relative overflow-hidden group hover:border-primary-fixed-dim/30 transition-all duration-300">
          <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
            <span className="material-symbols-outlined text-9xl text-on-surface">payments</span>
          </div>
          <p className="font-mono text-xs text-on-surface-variant uppercase tracking-wider mb-2">MAINTENANCE COSTS</p>
          <h3 className="font-display text-4xl font-extrabold text-on-surface">
            €{totalMaintenanceCosts.toFixed(2)}
          </h3>
          <div className="mt-4 flex items-center gap-2 text-on-surface-variant text-xs">
            <span className="material-symbols-outlined text-sm">account_balance_wallet</span>
            <span>Includes repairs and parts</span>
          </div>
        </div>
      </div>

      {/* Main Analysis and Alerts Grid */}
      <div className="grid grid-cols-12 gap-6">
        {/* Riding Activity Bar Chart */}
        <div className="col-span-12 lg:col-span-8 bg-surface-container-low border border-outline-variant p-6 rounded-xl">
          <div className="flex justify-between items-center mb-6">
            <h4 className="font-display text-lg font-bold text-on-surface">Riding Activity</h4>
            <div className="flex gap-2">
              <button
                onClick={() => setActivityRange('7')}
                className={`text-xs px-3.5 py-1.5 rounded-full font-bold transition-all cursor-pointer ${
                  activityRange === '7'
                    ? 'bg-primary-fixed-dim/20 text-primary-fixed-dim'
                    : 'bg-surface-container-highest text-on-surface-variant hover:text-on-surface'
                }`}
              >
                7 Days
              </button>
              <button
                onClick={() => setActivityRange('30')}
                className={`text-xs px-3.5 py-1.5 rounded-full font-bold transition-all cursor-pointer ${
                  activityRange === '30'
                    ? 'bg-primary-fixed-dim/20 text-primary-fixed-dim'
                    : 'bg-surface-container-highest text-on-surface-variant hover:text-on-surface'
                }`}
              >
                30 Days
              </button>
            </div>
          </div>

          <div className="h-64 w-full relative flex items-end justify-between gap-4 pt-10 pb-4">
            {/* Elegant SVG/HTML bar representation mimicking mockup heights */}
            {activeChartData.map((val, idx) => {
              const heightPct = `${(val / maxChartVal) * 85 + 5}%`;
              const isHigh = val >= 60;
              return (
                <div key={idx} className="flex-1 flex flex-col justify-end items-center h-full relative group">
                  {/* Tooltip on Hover */}
                  <div className="absolute top-0 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-4 bg-primary-fixed-dim text-on-primary-fixed text-[10px] px-2 py-1 rounded shadow-lg font-mono font-bold z-10 pointer-events-none">
                    {formatDistance(val)}
                  </div>
                  
                  {/* Visual Bar */}
                  <div
                    style={{ height: heightPct }}
                    className={`w-full rounded-t transition-all duration-500 group-hover:brightness-110 ${
                      isHigh
                        ? 'bg-primary-fixed-dim border-t border-primary-fixed-dim'
                        : idx % 2 === 0
                        ? 'bg-primary-fixed-dim/40 border-t-2 border-primary-fixed-dim'
                        : 'bg-surface-container-highest border-t border-outline-variant'
                    }`}
                  ></div>
                </div>
              );
            })}

            {/* Chart Labels */}
            <div className="absolute bottom-[-16px] left-0 w-full flex justify-between text-[10px] text-on-surface-variant uppercase font-mono tracking-wider">
              {daysOfWeek.map((day, idx) => (
                <span key={idx} className={idx === 5 ? 'text-primary-fixed-dim font-bold' : ''}>
                  {day}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Warnings & Alerts */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
          {/* Upcoming Chain replacement card */}
          <div className="bg-secondary-container text-on-secondary-container p-6 rounded-xl shadow-lg border border-primary-fixed-dim/10 relative overflow-hidden">
            <div className="flex items-center gap-3 mb-4">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>build_circle</span>
              <h4 className="font-display font-extrabold text-xs tracking-widest uppercase">UPCOMING MAINTENANCE</h4>
            </div>
            <p className="text-xl font-extrabold leading-tight">Chain replacement in {formatDistance(chainRemaining)}</p>
            <div className="w-full bg-black/20 h-2 rounded-full overflow-hidden mt-4">
              <div 
                className="bg-on-secondary-container h-full transition-all duration-1000" 
                style={{ width: `${chainLifePct}%` }}
              ></div>
            </div>
            <div className="flex justify-between items-center mt-3 text-xs opacity-90">
              <span>{chainLifePct.toFixed(0)}% of life reached</span>
              <button 
                onClick={() => setScreen('my-bike')}
                className="hover:underline font-bold text-[11px] uppercase tracking-wider text-on-secondary-container hover:text-white"
              >
                Inspect Bike →
              </button>
            </div>
          </div>

          {/* Critical Alerts */}
          <div className="bg-surface-container-low border border-outline-variant p-6 rounded-xl flex-1">
            <h4 className="font-mono text-xs text-on-surface-variant mb-4 uppercase tracking-wider font-bold">Critical Alerts</h4>
            
            {showOrderSuccess && (
              <div className="mb-4 text-xs bg-primary-fixed-dim/20 text-primary-fixed-dim p-2.5 rounded border border-primary-fixed-dim/40 flex items-center gap-2 animate-fade-in">
                <span className="material-symbols-outlined text-sm">check_circle</span>
                <span>Naročilo poslano! Zavore bodo pripravljene za servis.</span>
              </div>
            )}
            
            {showTireSuccess && (
              <div className="mb-4 text-xs bg-primary-fixed-dim/20 text-primary-fixed-dim p-2.5 rounded border border-primary-fixed-dim/40 flex items-center gap-2 animate-fade-in">
                <span className="material-symbols-outlined text-sm">check_circle</span>
                <span>Pnevmatike označene kot pregledane.</span>
              </div>
            )}

            {!activeAlerts.brakePads && !activeAlerts.tireWear && (
              <p className="text-xs text-on-surface-variant text-center py-6 italic">No critical alerts detected. Safe riding!</p>
            )}

            <ul className="space-y-4">
              {activeAlerts.brakePads && (
                <li className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-lg bg-error/10 flex items-center justify-center text-error border border-error/20 flex-shrink-0">
                    <span className="material-symbols-outlined">warning</span>
                  </div>
                  <div>
                    <p className="font-bold text-on-surface text-sm">Brake pads low</p>
                    <p className="text-xs text-on-surface-variant leading-normal">Thickness is below 0.8mm safety threshold.</p>
                    <button 
                      onClick={handleOrderReplacement}
                      className="text-xs text-primary-fixed-dim mt-2 hover:underline font-bold text-left block"
                    >
                      Order Replacement
                    </button>
                  </div>
                </li>
              )}

              {activeAlerts.tireWear && (
                <li className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center text-on-surface-variant border border-outline-variant/30 flex-shrink-0">
                    <span className="material-symbols-outlined">tire_repair</span>
                  </div>
                  <div>
                    <p className="font-bold text-on-surface text-sm">Tire wear check</p>
                    <p className="text-xs text-on-surface-variant leading-normal">Rear tire exceeds 2,500km. Visual inspection required.</p>
                    <button 
                      onClick={handleMarkTireChecked}
                      className="text-xs text-on-surface-variant mt-2 hover:underline hover:text-on-surface font-bold text-left block"
                    >
                      Mark as Checked
                    </button>
                  </div>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Recent Rides Table */}
      <div className="bg-surface-container-low border border-outline-variant rounded-xl overflow-hidden shadow-sm">
        <div className="p-6 border-b border-outline-variant/50 flex justify-between items-center">
          <h4 className="font-display text-lg font-bold text-on-surface">Recent Rides</h4>
          <button 
            onClick={() => setScreen('my-bike')}
            className="text-primary-fixed-dim text-sm font-bold flex items-center gap-1.5 hover:underline cursor-pointer"
          >
            View All History 
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-on-surface-variant text-xs font-mono uppercase border-b border-outline-variant/30 bg-surface-container-lowest/50">
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Route Name</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Distance</th>
                <th className="px-6 py-4">Elevation</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {filteredRides.length > 0 ? (
                filteredRides.map((ride) => {
                  const tag = getRideType(ride.distance, ride.elevation);
                  return (
                    <tr 
                      key={ride.id} 
                      className="hover:bg-surface-container-highest/30 transition-all duration-200 cursor-pointer group"
                    >
                      <td className="px-6 py-4 text-sm font-medium">
                        {new Date(ride.date).toLocaleDateString('sl-SI', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-bold text-on-surface group-hover:text-primary-fixed-dim transition-colors">
                          {ride.notes.split('.')[0]}
                        </p>
                        <p className="text-xs text-on-surface-variant truncate max-w-xs mt-0.5">
                          {ride.notes}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] uppercase font-bold ${tag.color}`}>
                          {tag.label}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-mono font-bold text-sm">
                        {formatDistance(ride.distance)}
                      </td>
                      <td className="px-6 py-4 font-mono text-sm text-on-surface-variant">
                        {formatElevation(ride.elevation)}
                      </td>
                      <td className="px-6 py-4">
                        <span className="flex items-center gap-1.5 text-xs text-primary-fixed-dim">
                          <span className="w-2 h-2 rounded-full bg-primary-fixed-dim animate-pulse"></span>
                          {ride.status}
                        </span>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-on-surface-variant text-sm italic">
                    Ni najdenih voženj za iskalni niz "{searchQuery}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Large visual banner highlighting Add Ride CTA */}
      <div className="bg-gradient-to-r from-surface-container-low to-surface-container p-8 rounded-xl border border-outline-variant/40 flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h4 className="font-display font-extrabold text-lg text-white mb-1">Želite shraniti novo kolesarsko telemetryo?</h4>
          <p className="text-sm text-on-surface-variant">Dodajte podrobnosti o vaši zadnji vožnji in posodobite statistiko ter življenjsko dobo verige in pnevmatik.</p>
        </div>
        <button
          onClick={() => setScreen('add-ride')}
          className="bg-primary-fixed-dim text-on-primary-fixed px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-md cursor-pointer"
        >
          <span className="material-symbols-outlined">add_circle</span>
          Add Ride
        </button>
      </div>
    </div>
  );
}
