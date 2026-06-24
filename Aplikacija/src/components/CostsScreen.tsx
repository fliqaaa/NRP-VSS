import React, { useState } from 'react';
import { Expense, Service, ScreenType } from '../types';

interface CostsScreenProps {
  expenses: Expense[];
  services: Service[];
  onAddExpense: (expense: Omit<Expense, 'id'>) => void;
}

export default function CostsScreen({
  expenses,
  services,
  onAddExpense
}: CostsScreenProps) {
  const [showAddModal, setShowAddModal] = useState(false);

  // Form states
  const [itemName, setItemName] = useState('');
  const [category, setCategory] = useState<'Maintenance' | 'Upgrades' | 'Apparel'>('Maintenance');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [cost, setCost] = useState('');
  const [notes, setNotes] = useState('');

  // 1. Calculate Lifetime Spent (Services costs + Expenses costs)
  const totalServiceCosts = services.reduce((sum, srv) => sum + srv.cost, 0);
  const totalExpenseCosts = expenses.reduce((sum, exp) => sum + exp.cost, 0);
  const totalLifetimeSpent = totalServiceCosts + totalExpenseCosts;

  // 2. Spending Current Month
  const currentMonthStr = `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}`;
  
  const servicesCurrentMonth = services
    .filter(srv => srv.date.startsWith(currentMonthStr))
    .reduce((sum, srv) => sum + srv.cost, 0);
  
  const expensesCurrentMonth = expenses
    .filter(exp => exp.date.startsWith(currentMonthStr))
    .reduce((sum, exp) => sum + exp.cost, 0);
  
  const totalCurrentMonthSpending = servicesCurrentMonth + expensesCurrentMonth;

  // 3. Category Splits (include services in "Maintenance" cost too, or split)
  const maintenanceCost = expenses
    .filter(exp => exp.category === 'Maintenance')
    .reduce((sum, exp) => sum + exp.cost, 0) + totalServiceCosts;

  const upgradesCost = expenses
    .filter(exp => exp.category === 'Upgrades')
    .reduce((sum, exp) => sum + exp.cost, 0);

  const apparelCost = expenses
    .filter(exp => exp.category === 'Apparel')
    .reduce((sum, exp) => sum + exp.cost, 0);

  const totalCategorized = maintenanceCost + upgradesCost + apparelCost;
  
  // Percentages for Category Pie Chart
  const maintPct = totalCategorized > 0 ? (maintenanceCost / totalCategorized) * 100 : 40;
  const upgradePct = totalCategorized > 0 ? (upgradesCost / totalCategorized) * 100 : 35;
  const apparelPct = totalCategorized > 0 ? (apparelCost / totalCategorized) * 100 : 25;

  // Pie chart stroke calculations (SVG circle dasharray)
  const dashArrayMaint = `${maintPct} 100`;
  const dashArrayUpgrade = `${upgradePct} 100`;
  const dashArrayApparel = `${apparelPct} 100`;

  const dashOffsetUpgrade = -maintPct;
  const dashOffsetApparel = -(maintPct + upgradePct);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const costNum = parseFloat(cost);
    if (isNaN(costNum) || costNum <= 0) {
      alert('Vnesite veljaven znesek stroška.');
      return;
    }

    onAddExpense({
      itemName: itemName || 'Nakup opreme',
      category,
      date,
      cost: costNum,
      notes: notes || 'Zabeleženi splošni kolesarski stroški.'
    });

    // Reset Form
    setItemName('');
    setCategory('Maintenance');
    setCost('');
    setNotes('');
    setShowAddModal(false);
  };

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'Maintenance':
        return 'handyman';
      case 'Upgrades':
        return 'rocket_launch';
      case 'Apparel':
        return 'checkroom';
      default:
        return 'shopping_cart';
    }
  };

  return (
    <div className="px-8 py-6 space-y-8 max-w-7xl mx-auto animate-fade-in">
      {/* Top Header Row */}
      <div className="flex justify-between items-center bg-surface-container-low border border-outline-variant/35 p-6 rounded-xl">
        <div>
          <h3 className="font-display text-lg font-bold text-white">Expense Tracker & Costs</h3>
          <p className="text-xs text-on-surface-variant">Spremljajte amortizacijo, stroške servisov ter kolesarske nakupe.</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-primary-fixed-dim text-on-primary-fixed font-bold px-6 py-2.5 rounded-full scale-100 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
        >
          <span className="material-symbols-outlined">add_circle</span>
          Add Expense
        </button>
      </div>

      {/* Stats Bento Grid */}
      <div className="grid grid-cols-12 gap-6">
        {/* Lifetime Spend */}
        <div className="col-span-12 md:col-span-4 p-6 bg-surface-container-low border border-outline-variant rounded-xl flex flex-col justify-between group hover:border-primary-fixed-dim/30 transition-all duration-300">
          <span className="font-mono text-xs text-on-surface-variant uppercase tracking-wider block">Lifetime Spent</span>
          <div className="mt-4">
            <span className="font-display text-4xl font-extrabold text-primary-fixed-dim">
              €{totalLifetimeSpent.toFixed(2)}
            </span>
            <div className="flex items-center gap-1 text-primary-fixed-dim mt-2 text-xs">
              <span className="material-symbols-outlined text-sm">trending_up</span>
              <span>+12% vs last year</span>
            </div>
          </div>
        </div>

        {/* Spending Current Month */}
        <div className="col-span-12 md:col-span-5 p-6 bg-surface-container-low border border-outline-variant rounded-xl relative overflow-hidden flex flex-col justify-between group hover:border-primary-fixed-dim/30 transition-all duration-300">
          <div className="flex justify-between items-start relative z-10 w-full">
            <div>
              <span className="font-mono text-xs text-on-surface-variant uppercase tracking-wider">Spending Current Month</span>
              <div className="mt-4">
                <span className="font-display text-4xl font-extrabold text-white">
                  €{totalCurrentMonthSpending > 0 ? totalCurrentMonthSpending.toFixed(2) : '342.15'}
                </span>
                <p className="text-on-surface-variant text-xs mt-1">Previous month: €285.00</p>
              </div>
            </div>
            
            {/* Simple Mini Chart Mockup */}
            <div className="h-16 w-32 flex-shrink-0">
              <svg className="w-full h-full" viewBox="0 0 100 40">
                <path d="M0 35 Q 20 30, 40 38 T 80 10 T 100 5" fill="none" stroke="#abd600" strokeLinecap="round" strokeWidth="3"></path>
                <path d="M0 35 Q 20 30, 40 38 T 80 10 T 100 5 V 40 H 0 Z" fill="url(#grad1)" opacity="0.15"></path>
                <defs>
                  <linearGradient id="grad1" x1="0%" x2="0%" y1="0%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#abd600', stopOpacity: 1 }}></stop>
                    <stop offset="100%" style={{ stopColor: '#abd600', stopOpacity: 0 }}></stop>
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>

        {/* Small Pie Chart / Category Split */}
        <div className="col-span-12 md:col-span-3 p-6 bg-surface-container-low border border-outline-variant rounded-xl flex flex-col items-center justify-center group hover:border-primary-fixed-dim/30 transition-all duration-300">
          <span className="font-mono text-xs text-on-surface-variant uppercase tracking-wider mb-4 w-full text-left">By Category</span>
          <div className="relative w-28 h-28 flex-shrink-0">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              {/* Maintenance */}
              <circle className="pie-segment transition-all duration-500" cx="18" cy="18" fill="none" r="15.9" stroke="#abd600" strokeDasharray={dashArrayMaint} strokeWidth="4"></circle>
              {/* Upgrades */}
              <circle className="pie-segment transition-all duration-500" cx="18" cy="18" fill="none" r="15.9" stroke="#ff5708" strokeDasharray={dashArrayUpgrade} strokeDashoffset={dashOffsetUpgrade} strokeWidth="4"></circle>
              {/* Apparel */}
              <circle className="pie-segment transition-all duration-500" cx="18" cy="18" fill="none" r="15.9" stroke="#3cddc7" strokeDasharray={dashArrayApparel} strokeDashoffset={dashOffsetApparel} strokeWidth="4"></circle>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary-fixed-dim text-xl">pie_chart</span>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-1.5 w-full text-[9px] font-mono uppercase tracking-tighter">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-primary-fixed-dim"></div>
              <span>Maint: {maintPct.toFixed(0)}%</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-secondary-container"></div>
              <span>Upg: {upgradePct.toFixed(0)}%</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-tertiary-fixed-dim"></div>
              <span>App: {apparelPct.toFixed(0)}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Cost History Table Section */}
      <section className="bg-surface-container-low border border-outline-variant rounded-xl overflow-hidden shadow-sm">
        <div className="px-6 py-5 flex justify-between items-center border-b border-outline-variant/30">
          <h3 className="font-display font-bold text-on-surface">Expense History Ledger</h3>
          <div className="flex gap-2 text-xs">
            <button className="px-3 py-1.5 bg-surface-container-highest text-on-surface text-xs font-bold rounded flex items-center gap-1.5 border border-outline-variant hover:bg-surface-bright transition-colors">
              <span className="material-symbols-outlined text-sm">filter_list</span>
              Filter
            </button>
            <button className="px-3 py-1.5 bg-surface-container-highest text-on-surface text-xs font-bold rounded flex items-center gap-1.5 border border-outline-variant hover:bg-surface-bright transition-colors">
              <span className="material-symbols-outlined text-sm">download</span>
              Export CSV
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low/50 border-b border-outline-variant/20 text-on-surface-variant font-mono text-xs uppercase tracking-widest">
                <th className="px-6 py-4">Item / Purchase</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Cost</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {expenses.map((exp) => (
                <tr key={exp.id} className="hover:bg-surface-container-highest/30 transition-all duration-250">
                  <td className="px-6 py-4.5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded bg-surface-container-highest flex items-center justify-center border border-outline-variant/30 text-on-surface-variant">
                        <span className="material-symbols-outlined text-lg">
                          {getCategoryIcon(exp.category)}
                        </span>
                      </div>
                      <div>
                        <p className="font-bold text-on-surface text-sm">{exp.itemName}</p>
                        <p className="text-xs text-on-surface-variant mt-0.5">{exp.notes}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4.5">
                    <span className={`px-2.5 py-1 text-[10px] font-mono font-extrabold rounded-full ${
                      exp.category === 'Maintenance' 
                        ? 'bg-primary-container/20 text-primary-fixed-dim' 
                        : exp.category === 'Upgrades' 
                        ? 'bg-secondary-container/20 text-secondary-container' 
                        : 'bg-tertiary-container/10 text-tertiary-fixed-dim'
                    }`}>
                      {exp.category}
                    </span>
                  </td>
                  <td className="px-6 py-4.5 text-on-surface-variant text-xs font-mono">
                    {new Date(exp.date).toLocaleDateString('sl-SI', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="px-6 py-4.5 text-right font-mono font-bold text-sm text-primary-fixed-dim">
                    €{exp.cost.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Additional Insights & Cost optimization */}
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8 bg-surface-container-low border border-outline-variant rounded-xl p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h4 className="font-display font-bold text-white">Monthly Burn Rate</h4>
              <p className="text-on-surface-variant text-xs mt-0.5">Projected vs actual maintenance costs</p>
            </div>
            <select className="bg-surface-container border border-outline-variant rounded text-xs px-3 py-1.5 text-on-surface focus:outline-none focus:border-primary-fixed-dim">
              <option>Last 6 Months</option>
              <option>Last Year</option>
            </select>
          </div>
          
          <div className="h-44 w-full flex items-end gap-3 px-2 pt-4">
            {/* Simple Bar Chart Mockup */}
            {['MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT'].map((m, idx) => {
              const hArray = [35, 60, 25, 85, 45, 95];
              return (
                <div key={idx} className="flex-grow flex flex-col items-center gap-2 group cursor-pointer">
                  <div className="w-full bg-surface-container-highest rounded-t-sm h-32 group-hover:bg-primary-fixed-dim/20 transition-all relative">
                    <div 
                      className="absolute inset-x-0 bottom-0 bg-primary-fixed-dim rounded-t-sm transition-all duration-700"
                      style={{ height: `${hArray[idx]}%` }}
                    ></div>
                  </div>
                  <span className="text-[10px] font-mono opacity-65 tracking-wide">{m}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4 bg-surface-container-low border border-outline-variant rounded-xl p-6 flex flex-col justify-between">
          <div>
            <h4 className="font-display font-bold text-white mb-2">Cost Optimization</h4>
            <p className="text-on-surface-variant text-xs leading-relaxed mb-6">Proaktivni predlogi na podlagi zabeleženih podatkov in stroškovnikov.</p>
            
            <div className="space-y-3.5">
              <div className="flex items-start gap-3 p-3 bg-surface-container rounded-lg border-l-2 border-primary-fixed-dim text-xs">
                <span className="material-symbols-outlined text-primary-fixed-dim">lightbulb</span>
                <p className="text-on-surface leading-normal">
                  Switching to <span className="text-primary-fixed-dim font-bold">drip wax</span> for your chain could save up to €120/year in drivetrain component wear.
                </p>
              </div>
              <div className="flex items-start gap-3 p-3 bg-surface-container rounded-lg border-l-2 border-secondary-container text-xs">
                <span className="material-symbols-outlined text-secondary-container">warning</span>
                <p className="text-on-surface leading-normal">
                  Your front tire is at 80% life. Order a replacement now to avoid premium last-minute LBS pricing.
                </p>
              </div>
            </div>
          </div>
          
          <button className="w-full mt-6 py-2.5 border border-primary-fixed-dim text-primary-fixed-dim text-[10px] font-bold uppercase tracking-widest hover:bg-primary-fixed-dim/10 transition-all cursor-pointer">
            View Maintenance Forecast
          </button>
        </div>
      </div>

      {/* Add Expense Modal popup */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-[100] flex items-center justify-center p-6" onClick={() => setShowAddModal(false)}>
          <div 
            className="bg-surface-container-high border border-outline-variant max-w-md w-full rounded-2xl p-6 space-y-4 shadow-2xl animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center border-b border-outline-variant/30 pb-3">
              <h3 className="font-display font-bold text-lg text-primary-fixed-dim">Add Cycling Expense</h3>
              <button onClick={() => setShowAddModal(false)} className="text-on-surface-variant hover:text-on-surface font-mono text-sm">✕</button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider block">Item / Service Name</label>
                <input 
                  type="text"
                  placeholder="e.g. MAAP Bib Tights, Zipp Wheelset"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-3 text-sm text-on-surface focus:outline-none focus:border-primary-fixed-dim"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider block">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-3 text-sm text-on-surface focus:outline-none focus:border-primary-fixed-dim"
                  >
                    <option value="Maintenance">Maintenance & Parts</option>
                    <option value="Upgrades">Performance Upgrades</option>
                    <option value="Apparel">Cycling Apparel</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider block">Date</label>
                  <input 
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-3 text-sm text-on-surface focus:outline-none focus:border-primary-fixed-dim"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider block">Expense Cost (€)</label>
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

              <div className="space-y-1">
                <label className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider block">Notes</label>
                <textarea 
                  placeholder="Notes about purchase location, brand, size, specifications..."
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
                  Save Expense
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
