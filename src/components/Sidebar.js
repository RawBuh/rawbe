import React, { useState } from 'react';
import { PlusCircle, Home, Settings, Table, DollarSign, Shield, ClipboardCheck, ChevronLeft, ChevronRight } from 'lucide-react';

const Sidebar = ({ activeSection, setActiveSection, onCollapseChange }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navigationItems = [
    { id: 'new-chat', label: 'New Chat', icon: PlusCircle, type: 'action' },
    { id: 'my-projects', label: 'My Projects', icon: Home, type: 'link' },
    { id: 'get-project-quote', label: 'Get Quote', icon: ClipboardCheck, type: 'link' },
  ];

  const qventItems = [
    { id: 'systems', label: 'Attachment Systems', icon: Settings },
    { id: 'my-prices-dealers', label: 'My Prices (QV distr)', icon: DollarSign },
    { id: 'our-prices-sales', label: 'Our Prices (QV team)', icon: DollarSign },
    { id: 'admin-sales', label: 'Admin (QV team)', icon: Shield },
  ];

  const agrobItems = [
    { id: 'keratwin', label: 'Terracotta panels', icon: Table },
    { id: 'my-prices-agrob', label: 'My Prices (AB distr)', icon: DollarSign },
    { id: 'admin-ab', label: 'Admin (AB team)', icon: Shield },
  ];

  const handleNavClick = (id) => {
    setActiveSection(id);
  };

  const toggleCollapse = () => {
    const newCollapsedState = !isCollapsed;
    setIsCollapsed(newCollapsedState);
    onCollapseChange?.(newCollapsedState);
  };

  if (isCollapsed) {
    return (
      <div className="bg-gray-50 text-gray-800 w-24 h-screen fixed left-0 top-0 pt-6 px-3 overflow-y-auto font-sans transition-all duration-300">
        {/* Collapsed Header */}
        <div className="mb-8 flex flex-col items-center">
          <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center mb-4">
            <span className="text-sm font-semibold text-white">RB</span>
          </div>
          <button
            onClick={toggleCollapse}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Collapsed Navigation */}
        <div className="mb-8 flex flex-col items-center space-y-4">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              title={item.label}
              className={`p-3 rounded-lg transition-all duration-200 ${
                activeSection === item.id
                  ? 'bg-white text-gray-900 shadow-sm border border-gray-200'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <item.icon className="w-5 h-5" strokeWidth={1.5} />
            </button>
          ))}
        </div>

        {/* Collapsed Brand Modules */}
        <div className="space-y-8 flex flex-col items-center">
          {/* Q-VENT Collapsed */}
          <button
            onClick={() => handleNavClick('systems')}
            className="flex flex-col items-center hover:bg-gray-100 p-2 rounded-lg transition-all duration-200"
            title="Access Q-VENT systems"
          >
            <div className="w-5 h-5 relative group mb-2">
              <div className="w-5 h-5 border-2 border-gray-400 rounded-full"></div>
              <div className="absolute inset-0 w-5 h-5 border-2 border-gray-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" 
                   style={{
                     background: 'conic-gradient(from 0deg, #6b7280 0deg, #6b7280 120deg, transparent 120deg, transparent 360deg)',
                     borderRadius: '50%'
                   }}></div>
            </div>
            <span className="text-xs text-gray-600 font-medium text-center">Q-VENT</span>
          </button>

          {/* AGROB BUCHTAL Collapsed */}
          <button
            onClick={() => handleNavClick('keratwin')}
            className="flex flex-col items-center hover:bg-gray-100 p-2 rounded-lg transition-all duration-200"
            title="Access AGROB BUCHTAL terracotta panels"
          >
            <div className="w-5 h-5 relative group mb-2">
              <div className="w-5 h-5 border-2 border-gray-400 rounded-full"></div>
              <div className="absolute inset-0 w-5 h-5 border-2 border-gray-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" 
                   style={{
                     background: 'conic-gradient(from 0deg, #6b7280 0deg, #6b7280 120deg, transparent 120deg, transparent 360deg)',
                     borderRadius: '50%'
                   }}></div>
            </div>
            <span className="text-xs text-gray-600 font-medium text-center">Agrob<br/>Buchtal</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 text-gray-800 w-80 h-screen fixed left-0 top-0 pt-6 px-6 overflow-y-auto font-sans transition-all duration-300">
      {/* Expanded Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
              <div className="w-full h-full bg-black rounded-full"></div>
            </div>
            <span className="text-3xl font-semibold text-black">RB</span>
          </div>
          <button
            onClick={toggleCollapse}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Core Platform Navigation */}
      <div className="mb-8">
        <div className="flex flex-col space-y-1">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`flex items-center gap-2 w-full text-left px-4 py-3 rounded-lg transition-all duration-200 text-sm font-medium font-sans ${
                activeSection === item.id
                  ? 'bg-white text-gray-900 shadow-sm border border-gray-200'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <item.icon className="w-4 h-4 text-gray-500" strokeWidth={1.5} />
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* AI Agent Modules */}
      <div className="space-y-4">
        {/* Q-VENT AI Module */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm">
          <div className="mb-4">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 relative group">
                <div className="w-5 h-5 border-2 border-gray-400 rounded-full"></div>
                <div className="absolute inset-0 w-5 h-5 border-2 border-gray-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" 
                     style={{
                       background: 'conic-gradient(from 0deg, #6b7280 0deg, #6b7280 120deg, transparent 120deg, transparent 360deg)',
                       borderRadius: '50%'
                     }}></div>
              </div>
              <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wide font-sans">
                Q-VENT
              </h3>
            </div>
          </div>
          <div className="flex flex-col space-y-1">
            {qventItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                title={`${item.label} - Access Q-VENT module functionality`}
                className={`flex items-center gap-2 w-full text-left px-3 py-2 rounded-md transition-all duration-200 text-sm font-normal font-sans ${
                  activeSection === item.id
                    ? 'bg-white text-gray-900 shadow-sm border border-gray-200'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <item.icon className="w-4 h-4 text-gray-500" strokeWidth={1.5} />
                <span className="whitespace-nowrap">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* AGROB BUCHTAL AI Module */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm">
          <div className="mb-4">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 relative group">
                <div className="w-5 h-5 border-2 border-gray-400 rounded-full"></div>
                <div className="absolute inset-0 w-5 h-5 border-2 border-gray-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" 
                     style={{
                       background: 'conic-gradient(from 0deg, #6b7280 0deg, #6b7280 120deg, transparent 120deg, transparent 360deg)',
                       borderRadius: '50%'
                     }}></div>
              </div>
              <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wide font-sans">
                AGROB BUCHTAL
              </h3>
            </div>
          </div>
          <div className="flex flex-col space-y-1">
            {agrobItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                title={`${item.label} - Access Agrob Buchtal module functionality`}
                className={`flex items-center gap-2 w-full text-left px-3 py-2 rounded-md transition-all duration-200 text-sm font-normal font-sans ${
                  activeSection === item.id
                    ? 'bg-white text-gray-900 shadow-sm border border-gray-200'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <item.icon className="w-4 h-4 text-gray-500" strokeWidth={1.5} />
                <span className="whitespace-nowrap">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar; 