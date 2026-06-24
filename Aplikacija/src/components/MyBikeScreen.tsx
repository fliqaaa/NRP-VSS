import React, { useState } from 'react';
import { BikeDetails, ScreenType, UnitSystem } from '../types';

interface MyBikeScreenProps {
  bikeDetails: BikeDetails;
  totalDistanceKm: number;
  onReplaceChain: () => void;
  setScreen: (screen: ScreenType) => void;
  unitSystem: UnitSystem;
}

export default function MyBikeScreen({
  bikeDetails,
  totalDistanceKm,
  onReplaceChain,
  setScreen,
  unitSystem
}: MyBikeScreenProps) {
  const [replaceSuccess, setReplaceSuccess] = useState(false);

  // Unit conversion helpers
  const formatDistance = (km: number) => {
    if (unitSystem === 'imperial') {
      const miles = km * 0.621371;
      return `${miles.toFixed(0)} mi`;
    }
    return `${km.toFixed(0)} km`;
  };

  const formatChainAge = (km: number) => {
    if (unitSystem === 'imperial') {
      const miles = km * 0.621371;
      return `${miles.toFixed(0)} / 2,500 mi`;
    }
    return `${km.toFixed(0)} / 4,000 km`;
  };

  const handleChainReplaceClick = () => {
    onReplaceChain();
    setReplaceSuccess(true);
    setTimeout(() => {
      setReplaceSuccess(false);
    }, 3000);
  };

  return (
    <div className="px-8 py-6 max-w-7xl mx-auto space-y-10 animate-fade-in">
      {/* Top Header */}
      <div className="flex justify-between items-center bg-surface-container-low border border-outline-variant/35 p-6 rounded-xl">
        <div>
          <h3 className="font-display text-lg font-bold text-white">My Bike Garage & Specs</h3>
          <p className="text-xs text-on-surface-variant">Prilagodite komponente, spremljajte življenjsko dobo pnevmatik in verige.</p>
        </div>
        <button
          onClick={() => setScreen('add-ride')}
          className="bg-primary-fixed-dim text-on-primary-fixed font-bold px-6 py-2.5 rounded hover:scale-105 active:scale-95 transition-all shadow-md cursor-pointer"
        >
          Add Ride
        </button>
      </div>

      {/* Hero Section: Bike Visualization & Specs */}
      <section className="grid grid-cols-12 gap-8 items-start">
        {/* Bike Image/Visual Anchor */}
        <div className="col-span-12 lg:col-span-7 group">
          <div className="relative h-[440px] w-full rounded-xl overflow-hidden bg-surface-container-high border border-outline-variant transition-all duration-500 hover:border-primary-fixed-dim/30">
            {/* Atmospheric Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-surface-dim via-transparent to-transparent z-10 opacity-60"></div>
            <img 
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDvzCZJP3aYvhd7D90okiHTEhw1Lzhp9QJVWS7dn1kCq27wJu-sWGn0rb6Vlo3Awq1det8rNjQ1DZKqcBrcM8sqsGJtLG6OxkoX5SgurPTFJrU3f5doTvL2aNbnhnWY7hxtVX3nZKh_cP16nS7qj8LCuSGbERKjBGG-KHuS2rLq6VaViYbIHAJRhtRPOZKLyPD7S_D0Bymg8VZdMQFL0g1GLgDVm2s0fuH57hv8_BnMlPfbHHOxpOqOlTeu1Db_rhAqR37muCD93mk"
              alt="Canyon Endurace CF SL Road Bike"
              referrerPolicy="no-referrer"
            />
            {/* Floating Badge */}
            <div className="absolute top-6 left-6 z-20 flex flex-col gap-2">
              <span className="bg-primary-fixed-dim text-on-primary-fixed px-3 py-1 font-mono text-[10px] font-extrabold uppercase rounded-sm">Primary Ride</span>
              <span className="bg-background/80 backdrop-blur-md text-on-background px-3 py-1 font-mono text-[10px] rounded-sm">Road / Endurance</span>
            </div>
          </div>
        </div>

        {/* Core Details Cards */}
        <div className="col-span-12 lg:col-span-5 flex flex-col gap-6 h-full justify-between">
          {/* Brand & Model Info */}
          <div className="bg-surface-container-low border border-outline-variant p-8 rounded-xl flex flex-col justify-between h-[200px]">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-display text-sm font-semibold text-primary-fixed-dim uppercase tracking-wider">{bikeDetails.brand}</h3>
                <h4 className="font-display text-3xl font-extrabold text-on-surface mt-1">{bikeDetails.model}</h4>
                <p className="font-mono text-xs text-on-surface-variant mt-2">MODEL YEAR {bikeDetails.year}</p>
              </div>
              <span className="material-symbols-outlined text-4xl text-outline">verified</span>
            </div>
            <div className="flex gap-2.5 mt-4">
              <span className="bg-surface-container-highest px-3.5 py-1.5 rounded-full font-mono text-[11px] text-on-surface">Carbon Fiber</span>
              <span className="bg-surface-container-highest px-3.5 py-1.5 rounded-full font-mono text-[11px] text-on-surface">Electronic Shifting</span>
            </div>
          </div>

          {/* Odometer Display */}
          <div className="bg-surface-container-low p-8 rounded-xl border border-outline-variant border-l-4 border-secondary-container relative overflow-hidden flex flex-col justify-between h-[215px]">
            {/* Decorative background telemetry */}
            <div className="absolute -right-4 -bottom-4 opacity-5 pointer-events-none">
              <span className="material-symbols-outlined text-9xl text-on-surface">speed</span>
            </div>
            <p className="font-mono text-xs text-on-surface-variant uppercase mb-2 tracking-wider">Total Odometer</p>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-5xl font-extrabold text-on-surface tracking-tighter">
                {formatDistance(totalDistanceKm).split(' ')[0]}
              </span>
              <span className="font-display text-lg text-secondary-container font-extrabold">
                {unitSystem === 'imperial' ? 'MILES' : 'KM'}
              </span>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between font-mono text-xs text-on-surface-variant">
                <span>Recent Month Mileage</span>
                <span className="text-primary-fixed-dim">+342 km</span>
              </div>
              <div className="w-full bg-surface-variant h-1.5 rounded-full overflow-hidden">
                <div className="bg-primary-fixed-dim h-full w-[72%]"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Components & Maintenance Bento Grid */}
      <section className="space-y-6">
        <h3 className="font-display text-lg font-bold text-on-surface flex items-center gap-3">
          <span className="material-symbols-outlined text-primary-fixed-dim">settings_input_component</span>
          Components Specification
        </h3>

        {replaceSuccess && (
          <div className="bg-primary-fixed-dim/25 text-primary-fixed-dim p-4 rounded-xl border border-primary-fixed-dim/50 flex items-center gap-3 animate-scale-up">
            <span className="material-symbols-outlined">check_circle</span>
            <div className="text-xs">
              <p className="font-bold">Veriga uspešno posodobljena!</p>
              <p className="text-[11px] opacity-80">Življenjska doba je bila ponastavljena na 0. Strošek servisa verige (€65.00) je bil zabeležen v zgodovino.</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Groupset Details */}
          <div className="bg-surface-container-low border border-outline-variant p-6 rounded-xl hover:bg-surface-container transition-all">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-primary-fixed-dim/10 rounded-lg border border-primary-fixed-dim/20">
                <span className="material-symbols-outlined text-primary-fixed-dim">settings_ethernet</span>
              </div>
              <h4 className="font-display font-bold">Groupset</h4>
            </div>
            <div className="space-y-4 text-xs">
              <div>
                <p className="font-mono text-on-surface-variant uppercase text-[10px]">Model</p>
                <p className="font-bold text-on-surface text-sm mt-0.5">{bikeDetails.groupsetModel}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-mono text-on-surface-variant uppercase text-[10px]">Cassette</p>
                  <p className="font-semibold text-on-surface mt-0.5">{bikeDetails.cassetteSpec}</p>
                </div>
                <div>
                  <p className="font-mono text-on-surface-variant uppercase text-[10px]">Crankset</p>
                  <p className="font-semibold text-on-surface mt-0.5">{bikeDetails.cranksetSpec}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tires Details */}
          <div className="bg-surface-container-low border border-outline-variant p-6 rounded-xl hover:bg-surface-container transition-all">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-secondary-container/10 rounded-lg border border-secondary-container/20">
                <span className="material-symbols-outlined text-secondary-container">radio_button_checked</span>
              </div>
              <h4 className="font-display font-bold">Tires</h4>
            </div>
            <div className="space-y-4 text-xs">
              <div>
                <p className="font-mono text-on-surface-variant uppercase text-[10px]">Current Setup</p>
                <p className="font-bold text-on-surface text-sm mt-0.5">{bikeDetails.tireModel}</p>
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <p className="font-mono text-on-surface-variant uppercase text-[10px]">Size</p>
                  <p className="font-semibold text-on-surface mt-0.5">{bikeDetails.tireSize}</p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-[10px] text-on-surface-variant uppercase">Estimated Life</p>
                  <p className="font-bold text-primary-fixed-dim mt-0.5">{bikeDetails.tireHealth}% Health</p>
                </div>
              </div>
              <div className="w-full bg-surface-variant h-1 rounded-full overflow-hidden">
                <div className="bg-primary-fixed-dim h-full" style={{ width: `${bikeDetails.tireHealth}%` }}></div>
              </div>
            </div>
          </div>

          {/* Chain Age Tracker */}
          <div className="bg-surface-container-low border border-outline-variant p-6 rounded-xl hover:bg-surface-container transition-all">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-tertiary-fixed-dim/10 rounded-lg border border-tertiary-fixed-dim/20">
                <span className="material-symbols-outlined text-tertiary-fixed-dim">link</span>
              </div>
              <h4 className="font-display font-bold">Chain Age</h4>
            </div>
            <div className="space-y-4 text-xs">
              <div className="text-center w-full bg-surface rounded-lg py-2 border border-outline-variant/30">
                <p className="font-mono text-[10px] text-on-surface-variant uppercase mb-1">KM Since Install</p>
                <p className="font-display text-xl font-bold text-on-surface">
                  {formatChainAge(bikeDetails.chainAgeKm)}
                </p>
              </div>
              
              <div className="relative pt-2">
                <div className="w-full bg-surface-variant h-2.5 rounded-full overflow-hidden flex">
                  <div 
                    className="bg-tertiary-fixed-dim h-full transition-all duration-1000" 
                    style={{ width: `${Math.min(100, (bikeDetails.chainAgeKm / 4000) * 100)}%` }}
                  ></div>
                </div>
                <div className="flex justify-between w-full mt-2 font-mono text-[9px] text-on-surface-variant">
                  <span>NEW</span>
                  <span className="text-error font-bold">REPLACE</span>
                </div>
                
                <div className="flex items-center gap-2 mt-4">
                  <button 
                    onClick={handleChainReplaceClick}
                    className="w-full py-2.5 bg-tertiary-fixed-dim/20 hover:bg-tertiary-fixed-dim/30 text-tertiary-fixed-dim rounded font-mono text-[11px] font-bold transition-all uppercase cursor-pointer text-center"
                  >
                    Replace & Wax Chain
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Secondary Metrics */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-outline-variant/20">
        <div className="flex items-center gap-4 p-4 border border-outline-variant/40 rounded-lg bg-surface-container-low/40">
          <span className="material-symbols-outlined text-on-surface-variant">weight</span>
          <div>
            <p className="font-mono text-[10px] text-on-surface-variant uppercase">Frame Weight</p>
            <p className="text-sm font-semibold text-on-surface">{bikeDetails.frameWeight}</p>
          </div>
        </div>
        <div className="flex items-center gap-4 p-4 border border-outline-variant/40 rounded-lg bg-surface-container-low/40">
          <span className="material-symbols-outlined text-on-surface-variant">calendar_today</span>
          <div>
            <p className="font-mono text-[10px] text-on-surface-variant uppercase">Acquisition Date</p>
            <p className="text-sm font-semibold text-on-surface">
              {new Date(bikeDetails.acquisitionDate).toLocaleDateString('sl-SI', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4 p-4 border border-outline-variant/40 rounded-lg bg-surface-container-low/40">
          <span className="material-symbols-outlined text-on-surface-variant">history</span>
          <div>
            <p className="font-mono text-[10px] text-on-surface-variant uppercase">Total Service Time</p>
            <p className="text-sm font-semibold text-on-surface">{bikeDetails.totalServiceTime}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
