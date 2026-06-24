import React, { useState } from 'react';
import { Service, BikeDetails, ScreenType, UnitSystem } from '../types';

interface ServicesScreenProps {
  services: Service[];
  onAddService: (service: Omit<Service, 'id'>) => void;
  bikeDetails: BikeDetails;
  totalDistanceKm: number;
}

export default function ServicesScreen({
  services,
  onAddService,
  bikeDetails,
  totalDistanceKm
}: ServicesScreenProps) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string>('ALL');

  // Add Service Form States
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [type, setType] = useState('');
  const [category, setCategory] = useState<'MAJOR' | 'HYDRAULIC' | 'PARTS' | 'CRITICAL'>('MAJOR');
  const [shopName, setShopName] = useState('');
  const [notes, setNotes] = useState('');
  const [cost, setCost] = useState('');

  // 1. Calculate stats dynamically
  const totalServiceCosts = services.reduce((sum, srv) => sum + srv.cost, 0);
  const costPerKm = totalDistanceKm > 0 ? totalServiceCosts / totalDistanceKm : 0;

  // Filtered services
  const filteredServices = services.filter(srv => {
    if (filterCategory === 'ALL') return true;
    return srv.category === filterCategory;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const costNum = parseFloat(cost);
    if (isNaN(costNum) || costNum < 0) {
      alert('Vnesite veljaven znesek stroška servisa.');
      return;
    }

    onAddService({
      date,
      totalKm: Math.round(totalDistanceKm),
      type: type || 'Splošni servis',
      category,
      shopName: shopName || 'Samostojni servis',
      notes: notes || 'Opravljena redna dela na kolesu.',
      cost: costNum
    });

    // Reset form
    setType('');
    setCategory('MAJOR');
    setShopName('');
    setNotes('');
    setCost('');
    setShowAddModal(false);
  };

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'MAJOR':
        return 'bg-on-primary-fixed-variant text-primary-fixed';
      case 'HYDRAULIC':
        return 'bg-on-secondary-fixed-variant text-secondary';
      case 'PARTS':
        return 'bg-on-tertiary-fixed-variant text-tertiary-fixed-dim';
      case 'CRITICAL':
        return 'bg-error-container/30 text-error';
      default:
        return 'bg-surface-variant text-on-surface-variant';
    }
  };

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'MAJOR':
        return 'build';
      case 'HYDRAULIC':
        return 'water_drop';
      case 'PARTS':
        return 'tire_repair';
      case 'CRITICAL':
        return 'settings_ethernet';
      default:
        return 'settings';
    }
  };

  return (
    <div className="px-8 py-6 space-y-8 max-w-7xl mx-auto animate-fade-in">
      {/* Top Header Row for Services Screen */}
      <div className="flex justify-between items-center bg-surface-container-low border border-outline-variant/35 p-6 rounded-xl">
        <div>
          <h3 className="font-display text-lg font-bold text-white">Service Log & Telemetry Alerts</h3>
          <p className="text-xs text-on-surface-variant">Preglejte vse servisne opravke in posodobite mehansko stanje kolesa.</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-primary-fixed-dim text-on-primary-fixed px-6 py-2.5 rounded-full font-bold hover:scale-105 active:scale-95 transition-all shadow-lg cursor-pointer"
        >
          <span className="material-symbols-outlined text-lg">add</span>
          Add Service
        </button>
      </div>

      {/* Bento Grid Overview */}
      <div className="grid grid-cols-12 gap-6">
        {/* Next Service Card */}
        <div className="col-span-12 md:col-span-4 bg-surface-container-low border border-outline-variant p-6 rounded-xl flex flex-col justify-between relative overflow-hidden group hover:border-primary-fixed-dim/30 transition-all duration-300">
          <div className="relative z-10">
            <p className="font-mono text-on-surface-variant uppercase text-xs mb-2 tracking-wider">Upcoming Maintenance</p>
            <h3 className="font-display text-lg font-bold text-primary-fixed-dim mb-4">Drivetrain Clean</h3>
            <div className="flex items-end gap-2">
              <span className="font-display text-4xl font-extrabold text-white">142</span>
              <span className="font-mono text-[10px] text-on-surface-variant mb-2.5">KM REMAINING</span>
            </div>
          </div>
          <div className="w-full h-1.5 bg-surface-variant rounded-full mt-6 overflow-hidden">
            <div className="w-[85%] h-full bg-primary-fixed-dim"></div>
          </div>
          <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:scale-110 transition-transform duration-500">
            <span className="material-symbols-outlined text-[120px]">cleaning_services</span>
          </div>
        </div>

        {/* Total Service Cost Card */}
        <div className="col-span-12 md:col-span-4 bg-surface-container-low border border-outline-variant p-6 rounded-xl flex flex-col justify-between overflow-hidden group hover:border-primary-fixed-dim/30 transition-all duration-300">
          <div>
            <p className="font-mono text-on-surface-variant uppercase text-xs mb-2 tracking-wider">Annual Expenditure</p>
            <h3 className="font-display text-lg font-bold text-white mb-4">Total Service Cost</h3>
            <div className="flex items-end gap-2">
              <span className="font-display text-4xl font-extrabold text-on-surface">€{totalServiceCosts.toFixed(2)}</span>
              <span className="text-on-error font-bold flex items-center gap-1 text-xs bg-error-container/20 px-2 py-0.5 rounded mb-2.5">
                <span className="material-symbols-outlined text-xs">trending_up</span> 12%
              </span>
            </div>
          </div>
          <div className="flex gap-1 mt-6 h-8 items-end">
            <div className="flex-1 bg-surface-variant h-[30%]"></div>
            <div className="flex-1 bg-surface-variant h-[50%]"></div>
            <div className="flex-1 bg-surface-variant h-[45%]"></div>
            <div className="flex-1 bg-primary-fixed-dim h-[80%]"></div>
            <div className="flex-1 bg-surface-variant h-[60%]"></div>
            <div className="flex-1 bg-primary-fixed-dim h-[95%]"></div>
          </div>
        </div>

        {/* Telemetry Alert Card */}
        <div className="col-span-12 md:col-span-4 bg-surface-container-low border border-outline-variant p-6 rounded-xl flex items-center justify-between group hover:border-primary-fixed-dim/30 transition-all duration-300">
          <div className="flex-1">
            <p className="font-mono text-on-surface-variant uppercase text-xs mb-2 tracking-wider">Telemetry Alert</p>
            <h3 className="font-display text-lg font-bold text-secondary mb-1">Brake Bleed Due</h3>
            <p className="text-xs text-on-surface-variant leading-normal pr-4">Recommended every 6 months or 2500km to ensure responsive stopping power.</p>
          </div>
          <div className="w-20 h-20 relative flex items-center justify-center flex-shrink-0">
            <svg className="w-full h-full -rotate-90">
              <circle className="text-surface-variant" cx="40" cy="40" fill="transparent" r="34" stroke="currentColor" stroke-width="8"></circle>
              <circle className="text-secondary" cx="40" cy="40" fill="transparent" r="34" stroke="currentColor" stroke-dasharray="213" stroke-dashoffset="180" stroke-linecap="round" stroke-width="8"></circle>
            </svg>
            <span className="absolute material-symbols-outlined text-secondary animate-pulse">warning</span>
          </div>
        </div>
      </div>

      {/* Service History List Section */}
      <section className="bg-surface-container-low border border-outline-variant rounded-xl overflow-hidden shadow-sm">
        <div className="p-6 border-b border-outline-variant flex justify-between items-center flex-wrap gap-4">
          <h4 className="font-display text-lg font-bold">Service History Log</h4>
          <div className="flex gap-2">
            {/* Filter Buttons */}
            {['ALL', 'MAJOR', 'HYDRAULIC', 'PARTS', 'CRITICAL'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-mono font-bold transition-all cursor-pointer ${
                  filterCategory === cat
                    ? 'bg-primary-fixed-dim text-on-primary-fixed'
                    : 'bg-surface-container-highest text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low/50 border-b border-outline-variant/30 text-on-surface-variant font-mono text-xs uppercase tracking-wider">
                <th className="px-6 py-4">Date & Mileage</th>
                <th className="px-6 py-4">Service Type</th>
                <th className="px-6 py-4">Shop / Tech Notes</th>
                <th className="px-6 py-4 text-right">Cost</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {filteredServices.length > 0 ? (
                filteredServices.map((srv) => (
                  <tr key={srv.id} className="hover:bg-surface-container-highest/30 transition-all duration-200">
                    <td className="px-6 py-5">
                      <p className="font-bold text-on-surface">
                        {new Date(srv.date).toLocaleDateString('sl-SI', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </p>
                      <p className="text-xs text-on-surface-variant mt-1 font-mono">{srv.totalKm} km total</p>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded bg-primary-fixed-dim/10 flex items-center justify-center border border-outline-variant/20">
                          <span className="material-symbols-outlined text-primary-fixed-dim text-lg">
                            {getCategoryIcon(srv.category)}
                          </span>
                        </div>
                        <div>
                          <p className="font-bold text-white text-sm">{srv.type}</p>
                          <span className={`inline-block text-[9px] font-mono px-1.5 py-0.5 rounded-sm font-extrabold mt-1 uppercase ${getCategoryColor(srv.category)}`}>
                            {srv.category}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <p className="text-sm font-semibold text-on-surface">{srv.shopName}</p>
                      <p className="text-xs text-on-surface-variant italic mt-1 leading-normal max-w-sm">"{srv.notes}"</p>
                    </td>
                    <td className="px-6 py-5 text-right font-mono font-bold text-base text-primary-fixed-dim">
                      €{srv.cost.toFixed(2)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center py-8 text-on-surface-variant text-sm italic">
                    Ni najdenih servisnih opravkov za izbrano kategorijo.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Insights & Pro Tips */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-surface-container-low rounded-xl border border-outline-variant flex gap-4">
          <div className="bg-primary-container text-on-primary-container p-3 rounded-xl h-fit">
            <span className="material-symbols-outlined text-lg">lightbulb</span>
          </div>
          <div>
            <h5 className="font-display font-bold text-white mb-1">Maintenance Pro-Tip</h5>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Checking your chain wear every 500km can save you from premature cassette and chainring replacement. Most chains should be replaced at 0.5% wear.
            </p>
          </div>
        </div>
        <div className="p-6 bg-surface-container-low rounded-xl border border-outline-variant flex gap-4">
          <div className="bg-secondary-container/20 text-secondary-container p-3 rounded-xl h-fit">
            <span className="material-symbols-outlined text-lg">analytics</span>
          </div>
          <div>
            <h5 className="font-display font-bold text-white mb-1">Maintenance Cost Analysis</h5>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Trenutni strošek servisa na prevoženi kilometer znaša <span className="text-primary-fixed-dim font-bold font-mono">€{costPerKm.toFixed(2)} / km</span>. To je optimalna vrednost, ki kaže na učinkovito preventivno vzdrževanje!
            </p>
          </div>
        </div>
      </div>

      {/* Add Service Modal popup */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-[100] flex items-center justify-center p-6" onClick={() => setShowAddModal(false)}>
          <div 
            className="bg-surface-container-high border border-outline-variant max-w-lg w-full rounded-2xl p-6 space-y-4 shadow-2xl animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center border-b border-outline-variant/30 pb-3">
              <h3 className="font-display font-bold text-lg text-primary-fixed-dim">Add Bike Service Record</h3>
              <button onClick={() => setShowAddModal(false)} className="text-on-surface-variant hover:text-on-surface font-mono text-sm">✕</button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider block">Date of Service</label>
                  <input 
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-3 text-sm text-on-surface focus:outline-none focus:border-primary-fixed-dim"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider block">Service Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-3 text-sm text-on-surface focus:outline-none focus:border-primary-fixed-dim"
                  >
                    <option value="MAJOR">Major Maintenance</option>
                    <option value="HYDRAULIC">Hydraulic System</option>
                    <option value="PARTS">Replacement Parts</option>
                    <option value="CRITICAL">Critical Alert Fix</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider block">Service Title</label>
                <input 
                  type="text"
                  placeholder="e.g. Brake Bleed or Chain Waxing"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-3 text-sm text-on-surface focus:outline-none focus:border-primary-fixed-dim"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider block">Shop Name</label>
                  <input 
                    type="text"
                    placeholder="Ljubljana Bike Lab or Self"
                    value={shopName}
                    onChange={(e) => setShopName(e.target.value)}
                    className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-3 text-sm text-on-surface focus:outline-none focus:border-primary-fixed-dim"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider block">Service Cost (€)</label>
                  <input 
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={cost}
                    onChange={(e) => setCost(e.target.value)}
                    className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-3 text-sm text-on-surface focus:outline-none focus:border-primary-fixed-dim font-mono"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider block">Detailed Mechanic Notes</label>
                <textarea 
                  placeholder="Write detailed service notes or checklist items performed..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-3 text-sm text-on-surface focus:outline-none focus:border-primary-fixed-dim resize-none"
                ></textarea>
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button 
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-5 py-2.5 bg-surface-container-highest text-on-surface rounded-full text-xs font-bold cursor-pointer hover:bg-surface-bright"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-6 py-2.5 bg-primary-fixed-dim text-on-primary-fixed rounded-full text-xs font-bold cursor-pointer hover:brightness-110"
                >
                  Save Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
