import React from 'react';
import { PlusCircle, Home, Settings, Table, DollarSign, Shield } from 'lucide-react';

const Sidebar = ({ activeSection, setActiveSection }) => {
  const navigationItems = [
    { id: 'new-chat', label: 'New Chat', icon: PlusCircle, type: 'action' },
    { id: 'my-projects', label: 'My Projects', icon: Home, type: 'link' },
  ];

  const qventItems = [
    { id: 'systems', label: 'Systems and Components', icon: Settings },
    { id: 'my-prices-dealers', label: 'My Prices (QV distributors)', icon: DollarSign },
    { id: 'our-prices-sales', label: 'Our Prices (QV team)', icon: DollarSign },
    { id: 'admin-sales', label: 'Admin (QV team)', icon: Shield },
  ];

  const agrobItems = [
    { id: 'keratwin', label: 'Terracotta panels', icon: Table },
    { id: 'my-prices-agrob', label: 'My Prices (AB distributors)', icon: DollarSign },
    { id: 'admin-ab', label: 'Admin (AB team)', icon: Shield },
  ];

  const handleNavClick = (id) => {
    setActiveSection(id);
  };

  return (
    <div className="bg-gray-100 text-gray-800 text-sm font-medium w-64 h-screen fixed left-0 top-0 pt-6 pl-6 overflow-y-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-xl font-bold text-gray-900 mb-1">Rawbe</h1>
        <p className="text-gray-600 text-xs">all about your façade project</p>
      </div>

      {/* Group 1: Main Navigation (no spacing between items) */}
      <div className="flex flex-col space-y-0">
        {navigationItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavClick(item.id)}
            className={`flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg transition-colors ${
              activeSection === item.id
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-700 hover:bg-gray-200'
            }`}
          >
            <item.icon className="w-4 h-4 text-gray-600" />
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      {/* Spacer: 2 rows height */}
      <div className="mt-6"></div>

      {/* Group 2: Q-VENT Section */}
      <div className="flex flex-col space-y-0 mb-6">
        {/* Q-VENT section header: only logo, since SVG contains text */}
        <div className="flex items-center gap-2 px-3 py-2 bg-gray-200 border-l-4 border-[#ff0000] rounded-t-lg">
          <img src="/assets/q-vent-logo.svg" alt="Q-VENT" className="h-6 w-auto" />
        </div>
        {qventItems.map((item, idx) => (
          <button
            key={item.id}
            onClick={() => handleNavClick(item.id)}
            className={`flex items-center gap-2 w-full text-left px-3 py-2 rounded-none transition-colors ${
              activeSection === item.id
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-700 hover:bg-gray-200'
            } ${idx === qventItems.length - 1 ? 'rounded-b-lg' : ''}`}
          >
            <item.icon className="w-4 h-4 text-gray-600" />
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      {/* Spacer: 2 rows height */}
      <div className="mt-6"></div>

      {/* Group 3: AGROBBUCHTAL Section */}
      <div className="flex flex-col space-y-0">
        {/* AGROBBUCHTAL section header: left-aligned, grouped with blue icon, visually grouped with menu */}
        <div className="flex items-center gap-2 px-3 py-2 bg-gray-200 border-l-4 border-blue-900 rounded-t-lg">
          <span className="inline-flex items-center justify-center h-6 w-6 rounded bg-blue-900">
            <img src="/assets/agrob-buchtal-logo.svg" alt="Agrob Buchtal" className="h-4 w-auto" />
          </span>
          <span className="font-bold uppercase text-xs tracking-wide text-left">AGROBBUCHTAL</span>
        </div>
        {agrobItems.map((item, idx) => (
          <button
            key={item.id}
            onClick={() => handleNavClick(item.id)}
            className={`flex items-center gap-2 w-full text-left px-3 py-2 rounded-none transition-colors ${
              activeSection === item.id
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-700 hover:bg-gray-200'
            } ${idx === agrobItems.length - 1 ? 'rounded-b-lg' : ''}`}
          >
            <item.icon className="w-4 h-4 text-gray-600" />
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Sidebar; 