import React, { useState } from 'react';
import { Search, BarChart, MessageSquare, Calculator, Filter, ExternalLink, Upload, Download, FileText, Truck, Settings, Table, DollarSign, ClipboardCheck, Menu } from 'lucide-react';
import GetProjectQuote from '../pages/GetProjectQuote';

const MainContent = ({ activeSection, setActiveSection, setSidebarOpen }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('last-month');

  const Header = () => (
    <div className="flex justify-between items-center mb-8 font-sans">
      <div className="flex items-center space-x-4">
        {/* Mobile menu button */}
        <button
          onClick={() => setSidebarOpen && setSidebarOpen(true)}
          className="lg:hidden p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
        {/* Removed Rawbe heading from all pages */}
      </div>
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
          <span className="text-sm font-semibold text-gray-700">MM</span>
        </div>
      </div>
    </div>
  );

  const StatCard = ({ title, value, subtitle }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
      <h3 className="text-sm font-normal text-gray-700 mb-2 font-sans">{title}</h3>
      <p className="text-2xl font-semibold text-gray-900 mb-1 font-sans">{value}</p>
      <p className="text-xs font-light text-gray-500 font-sans">{subtitle}</p>
    </div>
  );

  const DashboardView = () => (
    <div className="space-y-6 font-sans">
      {/* Stats Dashboard */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-medium text-gray-900 font-sans">Stat Dashboard</h2>
          <div className="flex items-center space-x-3">
            <select 
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="text-sm font-sans border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 transition-all duration-200"
            >
              <option value="last-week">Last Week</option>
              <option value="last-month">Last Month</option>
              <option value="last-quarter">Last Quarter</option>
            </select>
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-200 font-sans">
              <Filter className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="# chat sessions" value="1,247" subtitle="by user (filter)" />
          <StatCard title="# chat durations" value="avg 8.5min" subtitle="data" />
          <StatCard title="# CSI (semantic?)" value="94%" subtitle="data" />
          <StatCard title="# offer requests" value="342" subtitle="data" />
        </div>
      </div>

      {/* Main Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 font-sans">What you want to know?</h2>
          <div className="relative">
            <input
              type="text"
              placeholder="Type your question..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 text-lg font-sans border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 transition-all duration-200 shadow-sm"
            />
            <button className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Management Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:border-gray-300 hover:shadow-md transition-all duration-200 text-left group">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-800 group-hover:text-gray-900 font-sans">Manage users</h3>
            <ExternalLink className="w-4 h-4 text-gray-600 group-hover:text-gray-700 transition-colors" />
          </div>
        </button>
        <button className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:border-gray-300 hover:shadow-md transition-all duration-200 text-left group">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-800 group-hover:text-gray-900 font-sans">Manage dealers</h3>
            <ExternalLink className="w-4 h-4 text-gray-600 group-hover:text-gray-700 transition-colors" />
          </div>
        </button>
        <button className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:border-gray-300 hover:shadow-md transition-all duration-200 text-left group">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-800 group-hover:text-gray-900 font-sans">Manage products</h3>
            <ExternalLink className="w-4 h-4 text-gray-600 group-hover:text-gray-700 transition-colors" />
          </div>
        </button>
        <button className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:border-gray-300 hover:shadow-md transition-all duration-200 text-left group">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-800 group-hover:text-gray-900 font-sans">Manage solutions</h3>
            <ExternalLink className="w-4 h-4 text-gray-600 group-hover:text-gray-700 transition-colors" />
          </div>
        </button>
      </div>
    </div>
  );

  const SystemsView = () => (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Main Q-VENT Information */}
      <div className="w-full max-w-4xl mx-auto mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3 font-sans">Get to know Q-VENT</h2>
            <p className="text-base text-gray-600 mb-6 font-sans">Ask questions, search products and services information</p>
            <div className="relative">
              <input
                type="text"
                placeholder="Start typing your question…"
                className="w-full px-6 py-4 text-lg font-sans border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 transition-all duration-200 shadow-sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Category Tags - Lightweight and elegant */}
      <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto mb-8">
        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-transparent hover:bg-gray-50 rounded-full text-xs font-light text-gray-500 transition-all duration-200 border border-gray-200 hover:border-gray-300">
          <Table className="w-3 h-3" strokeWidth={1.5} />
          Standard Components Product list
        </button>

        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-transparent hover:bg-gray-50 rounded-full text-xs font-light text-gray-500 transition-all duration-200 border border-gray-200 hover:border-gray-300">
          <FileText className="w-3 h-3" strokeWidth={1.5} />
          Installation Guides
        </button>

        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-transparent hover:bg-gray-50 rounded-full text-xs font-light text-gray-500 transition-all duration-200 border border-gray-200 hover:border-gray-300">
          <Settings className="w-3 h-3" strokeWidth={1.5} />
          Systems Details
        </button>

        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-transparent hover:bg-gray-50 rounded-full text-xs font-light text-gray-500 transition-all duration-200 border border-gray-200 hover:border-gray-300">
          <Calculator className="w-3 h-3" strokeWidth={1.5} />
          Engineering Services
        </button>

        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-transparent hover:bg-gray-50 rounded-full text-xs font-light text-gray-500 transition-all duration-200 border border-gray-200 hover:border-gray-300">
          <ExternalLink className="w-3 h-3" strokeWidth={1.5} />
          Manufacturing Info
        </button>

        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-transparent hover:bg-gray-50 rounded-full text-xs font-light text-gray-500 transition-all duration-200 border border-gray-200 hover:border-gray-300">
          <Truck className="w-3 h-3" strokeWidth={1.5} />
          Logistics
        </button>
      </div>

      {/* Fastening Systems - Product Boxes */}
      <div className="w-full max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <button className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-gray-300 transition-all duration-200 text-left group min-h-48 flex flex-col justify-start relative">
            <Settings className="w-4 h-4 text-gray-500 absolute top-6 right-6" />
            <h3 className="text-sm font-medium text-gray-700 font-sans leading-5 mb-2">QV1</h3>
            <p className="text-lg font-semibold text-gray-900 mb-0 font-sans leading-6">VISIBLE</p>
            <p className="text-lg font-semibold text-gray-900 mb-2 font-sans leading-6">FIXING</p>
            <p className="text-xs text-gray-500 font-sans leading-4">for flat panels, options with brackets and horizontal rails in case of stud walls</p>
          </button>

          <button className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-gray-300 transition-all duration-200 text-left group min-h-48 flex flex-col justify-start relative">
            <Settings className="w-4 h-4 text-gray-500 absolute top-6 right-6" />
            <h3 className="text-sm font-medium text-gray-700 font-sans leading-5 mb-2">QV2</h3>
            <p className="text-lg font-semibold text-gray-900 mb-0 font-sans leading-6">CONCEALED</p>
            <p className="text-lg font-semibold text-gray-900 mb-2 font-sans leading-6">ADHESIVE FIXING</p>
            <p className="text-xs text-gray-500 font-sans leading-4">structural adhesive attachement suitable for many cladding types</p>
          </button>

          <button className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-gray-300 transition-all duration-200 text-left group min-h-48 flex flex-col justify-start relative">
            <Settings className="w-4 h-4 text-gray-500 absolute top-6 right-6" />
            <h3 className="text-sm font-medium text-gray-700 font-sans leading-5 mb-2">QV3</h3>
            <p className="text-lg font-semibold text-gray-900 mb-0 font-sans leading-6">AGROB</p>
            <p className="text-lg font-semibold text-gray-900 mb-2 font-sans leading-6">BUCHTAL</p>
            <p className="text-xs text-gray-500 font-sans leading-4">advanced system designed specially for KerraTwin K20 terracotta panels with options for vertical and horizontal installation</p>
          </button>

          <button className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-gray-300 transition-all duration-200 text-left group min-h-48 flex flex-col justify-start relative">
            <Settings className="w-4 h-4 text-gray-500 absolute top-6 right-6" />
            <h3 className="text-sm font-medium text-gray-700 font-sans leading-5 mb-2">Q-CLOUD</h3>
            <p className="text-lg font-semibold text-gray-900 mb-0 font-sans leading-6">GLASS PANEL</p>
            <p className="text-lg font-semibold text-gray-900 mb-2 font-sans leading-6">OFF-SITE ADHESIVE</p>
            <p className="text-xs text-gray-500 font-sans leading-4">used for attachment of opaque glass panels in ventilated/ rainscreen application</p>
          </button>

          <button className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-gray-300 transition-all duration-200 text-left group min-h-48 flex flex-col justify-start relative">
            <Settings className="w-4 h-4 text-gray-500 absolute top-6 right-6" />
            <h3 className="text-sm font-medium text-gray-700 font-sans leading-5 mb-2">QV6</h3>
            <p className="text-lg font-semibold text-gray-900 mb-0 font-sans leading-6">CONCEALED</p>
            <p className="text-lg font-semibold text-gray-900 mb-2 font-sans leading-6">UNDERCUT FIXING</p>
            <p className="text-xs text-gray-500 font-sans leading-4">advanced system for flat and 3D panels using undercut anchor technology</p>
          </button>

          <button className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-gray-300 transition-all duration-200 text-left group min-h-48 flex flex-col justify-start relative">
            <Settings className="w-4 h-4 text-gray-500 absolute top-6 right-6" />
            <h3 className="text-sm font-medium text-gray-700 font-sans leading-5 mb-2">QV7</h3>
            <p className="text-lg font-semibold text-gray-900 mb-0 font-sans leading-6">TERRACOTTA</p>
            <p className="text-lg font-semibold text-gray-900 mb-2 font-sans leading-6">PANELS</p>
            <p className="text-xs text-gray-500 font-sans leading-4">mechanical attachment of architectural terracotta panels using clips</p>
          </button>

          <button className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-gray-300 transition-all duration-200 text-left group min-h-48 flex flex-col justify-start relative">
            <Settings className="w-4 h-4 text-gray-500 absolute top-6 right-6" />
            <h3 className="text-sm font-medium text-gray-700 font-sans leading-5 mb-2">QV9</h3>
            <p className="text-lg font-semibold text-gray-900 mb-0 font-sans leading-6">METAL</p>
            <p className="text-lg font-semibold text-gray-900 mb-2 font-sans leading-6">PANELS</p>
            <p className="text-xs text-gray-500 font-sans leading-4">mechanical attachment of metal panels with options for formed panels with hangers and extruded panels with clips</p>
          </button>

          <button className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-gray-300 transition-all duration-200 text-left group min-h-48 flex flex-col justify-start relative">
            <Settings className="w-4 h-4 text-gray-500 absolute top-6 right-6" />
            <h3 className="text-sm font-medium text-gray-700 font-sans leading-5 mb-2">AIO</h3>
            <p className="text-lg font-semibold text-gray-900 mb-0 font-sans leading-6">BESPOKE</p>
            <p className="text-lg font-semibold text-gray-900 mb-2 font-sans leading-6">SLAB TO SLAB</p>
            <p className="text-xs text-gray-500 font-sans leading-4">designed to span story heights without the need for intermediate fixings, and can be used for installation of various cladding materials</p>
          </button>
        </div>
      </div>
    </div>
  );

  const PriceCheckView = () => (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Main Pricing Information */}
      <div className="w-full max-w-4xl mx-auto mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3 font-sans">Distributor Portal</h2>
            <p className="text-base text-gray-600 mb-6 font-sans">Access your personalized pricing, specs, and quote tools</p>
            
            {/* Search input */}
            <div className="relative mb-6">
              <input
                type="text"
                placeholder="Ask question or start typing Product name or Art No"
                className="w-full px-6 py-4 text-lg font-sans border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 transition-all duration-200 shadow-sm"
              />
            </div>

            {/* File interaction buttons */}
            <div className="flex justify-end items-center gap-4 mb-6">
              <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all duration-200" title="Upload price list">
                <Upload className="w-4 h-4" />
                <span className="text-sm font-medium">Upload File</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all duration-200" title="Download in XLS">
                <Download className="w-4 h-4" />
                <span className="text-sm font-medium">Download in XLS</span>
              </button>
            </div>
            
            {/* Checkboxes */}
            <div className="flex justify-center gap-8 text-sm text-gray-600">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 text-gray-600 border border-gray-300 rounded focus:ring-gray-400" />
                <span>show my commission if any</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 text-gray-600 border border-gray-300 rounded focus:ring-gray-400" />
                <span>show product weights</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 text-gray-600 border border-gray-300 rounded focus:ring-gray-400" />
                <span>apply import tax</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Tags - Lightweight style like New Chat */}
      <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-transparent hover:bg-gray-50 rounded-full text-xs font-light text-gray-500 transition-all duration-200 border border-gray-200 hover:border-gray-300">
          <BarChart className="w-3 h-3" strokeWidth={1.5} />
          Category pricing
        </button>

        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-transparent hover:bg-gray-50 rounded-full text-xs font-light text-gray-500 transition-all duration-200 border border-gray-200 hover:border-gray-300">
          <FileText className="w-3 h-3" strokeWidth={1.5} />
          Specifications
        </button>

        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-transparent hover:bg-gray-50 rounded-full text-xs font-light text-gray-500 transition-all duration-200 border border-gray-200 hover:border-gray-300">
          <Truck className="w-3 h-3" strokeWidth={1.5} />
          Transportation
        </button>

        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-transparent hover:bg-gray-50 rounded-full text-xs font-light text-gray-500 transition-all duration-200 border border-gray-200 hover:border-gray-300">
          <MessageSquare className="w-3 h-3" strokeWidth={1.5} />
          Special price
        </button>
      </div>
    </div>
  );

  const ChatView = () => (
    <div className="min-h-screen flex flex-col font-sans px-8 pt-16">
      {/* Main Logo/Title - Aligned with sidebar */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-semibold text-gray-900 mb-4 font-sans tracking-tight">Rawbe</h1>
        <p className="text-lg text-gray-600 font-sans">Discover. Match. Source. Façades</p>
      </div>

      {/* Main Input - Aligned with sidebar width */}
      <div className="w-full max-w-4xl mx-auto mb-8">
        <div className="relative">
          <textarea
            placeholder="Ask questions about ventilated facades to get instant and accurate answers.."
            rows="3"
            className="w-full px-6 py-4 text-lg font-sans border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 transition-all duration-200 resize-none shadow-sm"
          />
        </div>
      </div>

      {/* Category Chips - Lightweight and elegant */}
      <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-transparent hover:bg-gray-50 rounded-full text-xs font-light text-gray-500 transition-all duration-200 border border-gray-200 hover:border-gray-300">
          <Table className="w-3 h-3" strokeWidth={1.5} />
          Panel-System Matcher
        </button>

        <button 
          onClick={() => setActiveSection('get-project-quote')}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-transparent hover:bg-gray-50 rounded-full text-xs font-light text-gray-500 transition-all duration-200 border border-gray-200 hover:border-gray-300"
        >
          <ClipboardCheck className="w-3 h-3" strokeWidth={1.5} />
          Get Quote
        </button>

        <button 
          onClick={() => setActiveSection('systems')}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-transparent hover:bg-gray-50 rounded-full text-xs font-light text-gray-500 transition-all duration-200 border border-gray-200 hover:border-gray-300"
        >
          <Settings className="w-3 h-3" strokeWidth={1.5} />
          Q-VENT systems
        </button>

        <button 
          onClick={() => setActiveSection('keratwin')}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-transparent hover:bg-gray-50 rounded-full text-xs font-light text-gray-500 transition-all duration-200 border border-gray-200 hover:border-gray-300"
        >
          <ExternalLink className="w-3 h-3" strokeWidth={1.5} />
          Terracotta
        </button>

      </div>
    </div>
  );

  const MyProjectsView = () => (
    <div className="space-y-6 font-sans">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 text-center">
        <h2 className="text-xl font-semibold text-gray-900 mb-2 font-sans">My Projects</h2>
        <p className="text-gray-600 font-sans">Your project management dashboard</p>
      </div>
    </div>
  );

  const KeratwinView = () => (
    <div className="space-y-6 font-sans">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 text-center">
        <h2 className="text-xl font-semibold text-gray-900 mb-2 font-sans">Terracotta panels</h2>
        <p className="text-gray-600 font-sans">Explore AGROB BUCHTAL terracotta solutions</p>
      </div>
    </div>
  );

  const MyPricesAgrobView = () => (
    <div className="space-y-6 font-sans">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 text-center">
        <h2 className="text-xl font-semibold text-gray-900 mb-2 font-sans">My Prices (AB distr)</h2>
        <p className="text-gray-600 font-sans">Access your AGROB BUCHTAL pricing</p>
      </div>
    </div>
  );

  const AdminAbView = () => (
    <div className="space-y-6 font-sans">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 text-center">
        <h2 className="text-xl font-semibold text-gray-900 mb-2 font-sans">Admin (AB team)</h2>
        <p className="text-gray-600 font-sans">AGROB BUCHTAL team administration</p>
      </div>
    </div>
  );

  const AdminView = () => {
    const AdminStatCard = ({ title, value, subtitle }) => (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
        <h3 className="text-sm font-normal text-gray-700 mb-2 font-sans">{title}</h3>
        <p className="text-2xl font-semibold text-gray-900 mb-1 font-sans">{value}</p>
        <p className="text-xs font-light text-gray-500 font-sans">{subtitle}</p>
      </div>
    );

    return (
      <div className="min-h-screen flex flex-col font-sans">
        {/* Chat Usage Dashboard - Combined Stats and Search */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 mb-8">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-2xl font-semibold text-gray-900 font-sans">Chat Usage Dashboard</h2>
            <div className="flex items-center space-x-3">
              <select 
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="text-sm font-sans border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 transition-all duration-200"
              >
                <option value="last-week">Last Week</option>
                <option value="last-month">Last Month</option>
                <option value="last-quarter">Last Quarter</option>
              </select>
              <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-200 font-sans">
                <Filter className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <AdminStatCard title="Total Sessions" value="2,849" subtitle="this month" />
            <AdminStatCard title="Avg Duration" value="12.3min" subtitle="per session" />
            <AdminStatCard title="Active Users" value="156" subtitle="this week" />
            <AdminStatCard title="Success Rate" value="94.2%" subtitle="resolution" />
          </div>
          
          <div className="max-w-2xl">
            <div className="relative">
              <input
                type="text"
                placeholder="Search chat logs, users, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-4 text-base font-sans border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 transition-all duration-200"
              />
            </div>
          </div>
        </div>

        {/* Management Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:border-gray-300 hover:shadow-md transition-all duration-200 text-left group">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-800 group-hover:text-gray-900 font-sans">Manage users</h3>
              <ExternalLink className="w-4 h-4 text-gray-600 group-hover:text-gray-700 transition-colors" />
            </div>
          </button>
          <button className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:border-gray-300 hover:shadow-md transition-all duration-200 text-left group">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-800 group-hover:text-gray-900 font-sans">Manage dealers</h3>
              <ExternalLink className="w-4 h-4 text-gray-600 group-hover:text-gray-700 transition-colors" />
            </div>
          </button>
          <button className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:border-gray-300 hover:shadow-md transition-all duration-200 text-left group">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-800 group-hover:text-gray-900 font-sans">Manage products</h3>
              <ExternalLink className="w-4 h-4 text-gray-600 group-hover:text-gray-700 transition-colors" />
            </div>
          </button>
          <button className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:border-gray-300 hover:shadow-md transition-all duration-200 text-left group">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-800 group-hover:text-gray-900 font-sans">Manage prices</h3>
              <ExternalLink className="w-4 h-4 text-gray-600 group-hover:text-gray-700 transition-colors" />
            </div>
          </button>
        </div>
      </div>
    );
  };

  const OurPricesSalesView = () => (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Main Pricing Header */}
      <div className="w-full max-w-4xl mx-auto mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3 font-sans">Internal Hub</h2>
            <p className="text-base text-gray-600 mb-6 font-sans">Search products to access prices, margin details, distributor price levels, drawings.</p>
            
            <div className="relative mb-6">
              <input
                type="text"
                placeholder="Start typing Product name ot Art No"
                className="w-full px-6 py-4 text-lg font-sans border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 transition-all duration-200 shadow-sm"
              />
              <button className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                <Search className="w-5 h-5" />
              </button>
            </div>

            {/* File interaction buttons */}
            <div className="flex justify-end items-center gap-4 mb-6">
              <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all duration-200" title="Upload price list">
                <Upload className="w-4 h-4" />
                <span className="text-sm font-medium">Upload File</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all duration-200" title="Download in XLS">
                <Download className="w-4 h-4" />
                <span className="text-sm font-medium">Download in XLS</span>
              </button>
            </div>

            {/* Checkboxes */}
            <div className="flex justify-center gap-8 text-sm text-gray-600">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 text-gray-600 border border-gray-300 rounded focus:ring-gray-400" />
                <span>show cost and margin breakdown</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 text-gray-600 border border-gray-300 rounded focus:ring-gray-400" />
                <span>compare distributor price levels</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 text-gray-600 border border-gray-300 rounded focus:ring-gray-400" />
                <span>highlight top-margin products</span>
              </label>
            </div>
          </div>
        </div>
      </div>



      {/* Quick Actions Tags - Lightweight style matching My Prices page */}
      <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto mb-8">
        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-transparent hover:bg-gray-50 rounded-full text-xs font-light text-gray-500 transition-all duration-200 border border-gray-200 hover:border-gray-300">
          <FileText className="w-3 h-3" strokeWidth={1.5} />
          Product Drawings
        </button>

        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-transparent hover:bg-gray-50 rounded-full text-xs font-light text-gray-500 transition-all duration-200 border border-gray-200 hover:border-gray-300">
          <ClipboardCheck className="w-3 h-3" strokeWidth={1.5} />
          Technical Specs
        </button>

        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-transparent hover:bg-gray-50 rounded-full text-xs font-light text-gray-500 transition-all duration-200 border border-gray-200 hover:border-gray-300">
          <BarChart className="w-3 h-3" strokeWidth={1.5} />
          Distributor Tiers
        </button>

        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-transparent hover:bg-gray-50 rounded-full text-xs font-light text-gray-500 transition-all duration-200 border border-gray-200 hover:border-gray-300">
          <DollarSign className="w-3 h-3" strokeWidth={1.5} />
          Cost Overview
        </button>
      </div>

      {/* Pricing Management Dashboard */}
      <div className="w-full max-w-4xl mx-auto mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-700 font-sans">Price Lists</h3>
              <FileText className="w-4 h-4 text-gray-500" />
            </div>
            <p className="text-2xl font-semibold text-gray-900 mb-1 font-sans">18</p>
            <p className="text-xs text-gray-500 font-sans">active customer lists</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-700 font-sans">Quote Requests</h3>
              <Calculator className="w-4 h-4 text-gray-500" />
            </div>
            <p className="text-2xl font-semibold text-gray-900 mb-1 font-sans">43</p>
            <p className="text-xs text-gray-500 font-sans">this week</p>
          </div>
        </div>
      </div>

    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'systems':
        return <SystemsView />;
      case 'get-project-quote':
        return <GetProjectQuote />;
      case 'my-prices-dealers':
        return <PriceCheckView />;
      case 'our-prices-sales':
        return <OurPricesSalesView />;
      case 'admin-sales':
        return <AdminView />;
      case 'new-chat':
        return <ChatView />;
      case 'my-projects':
        return <MyProjectsView />;
      case 'keratwin':
        return <KeratwinView />;
      case 'my-prices-agrob':
        return <MyPricesAgrobView />;
      case 'admin-ab':
        return <AdminAbView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 min-h-screen">
      <Header />
      {renderContent()}
    </div>
  );
};

export default MainContent; 