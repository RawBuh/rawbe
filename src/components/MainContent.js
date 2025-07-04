import React, { useState } from 'react';
import { Search, BarChart, MessageSquare, Calculator, Filter, ExternalLink, Upload, Download, FileText, Truck, Tag, Sparkles, Settings } from 'lucide-react';

const MainContent = ({ activeSection }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('last-month');

  const Header = () => (
    <div className="flex justify-between items-center mb-8">
      <div className="flex items-center space-x-4">
        {/* Removed Rawbe heading from all pages */}
      </div>
      <button className="text-sm text-neutral-600 hover:text-neutral-800 border border-neutral-200 px-4 py-2 rounded-lg hover:bg-neutral-50 transition-colors">
        Login
      </button>
    </div>
  );

  const StatCard = ({ title, value, subtitle }) => (
    <div className="bg-white rounded-xl shadow-md p-6 border border-neutral-100">
      <h3 className="text-sm font-medium text-neutral-600 mb-2">{title}</h3>
      <p className="text-2xl font-bold text-neutral-800 mb-1">{value}</p>
      <p className="text-xs text-neutral-500">{subtitle}</p>
    </div>
  );



  const DashboardView = () => (
    <div className="space-y-8">
      {/* Stats Dashboard */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-neutral-800">Stat Dashboard</h2>
          <div className="flex items-center space-x-2">
            <select 
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="text-sm border border-neutral-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-neutral-500"
            >
              <option value="last-week">Last Week</option>
              <option value="last-month">Last Month</option>
              <option value="last-quarter">Last Quarter</option>
            </select>
            <button className="flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-800 border border-neutral-200 px-3 py-2 rounded-lg hover:bg-neutral-50 transition-colors">
              <Filter className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="# chat sessions" value="1,247" subtitle="by user (filter)" />
          <StatCard title="# chat durations" value="avg 8.5min" subtitle="data" />
          <StatCard title="# CSI (semantic?)" value="94%" subtitle="data" />
          <StatCard title="# offer requests" value="342" subtitle="data" />
        </div>
      </div>

      {/* Main Search */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-xl font-semibold text-neutral-800 mb-2">What you want to know?</h2>
          <div className="relative">
            <input
              type="text"
              placeholder="Type your question..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-4 text-lg border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-transparent"
            />
            <button className="absolute right-4 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600">
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Management Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <button className="bg-white rounded-xl shadow-md p-6 border border-neutral-100 hover:border-neutral-200 transition-colors text-left group">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-neutral-800 group-hover:text-neutral-900">Manage users</h3>
            <ExternalLink className="w-4 h-4 text-gray-600 group-hover:text-neutral-600" />
          </div>
        </button>
        <button className="bg-white rounded-xl shadow-md p-6 border border-neutral-100 hover:border-neutral-200 transition-colors text-left group">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-neutral-800 group-hover:text-neutral-900">Manage dealers</h3>
            <ExternalLink className="w-4 h-4 text-gray-600 group-hover:text-neutral-600" />
          </div>
        </button>
        <button className="bg-white rounded-xl shadow-md p-6 border border-neutral-100 hover:border-neutral-200 transition-colors text-left group">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-neutral-800 group-hover:text-neutral-900">Manage products</h3>
            <ExternalLink className="w-4 h-4 text-gray-600 group-hover:text-neutral-600" />
          </div>
        </button>
        <button className="bg-white rounded-xl shadow-md p-6 border border-neutral-100 hover:border-neutral-200 transition-colors text-left group">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-neutral-800 group-hover:text-neutral-900">Manage prices</h3>
            <ExternalLink className="w-4 h-4 text-gray-600 group-hover:text-neutral-600" />
          </div>
        </button>
      </div>
    </div>
  );

  const SystemsView = () => (
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-xl font-semibold text-neutral-800 mb-2">Get to know Q-VENT</h2>
          <p className="text-neutral-600 mb-6">Ask anything you want to know about products and services</p>
          <div className="relative">
            <input
              type="text"
              placeholder="Type your question..."
              className="w-full px-4 py-4 text-lg border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* 2x2 grid of action cards below input field */}
      <div className="grid grid-cols-2 gap-4 max-w-3xl mx-auto">
        <button className="bg-white shadow-sm rounded-xl p-4 text-sm flex flex-col items-start hover:shadow-md hover:bg-neutral-50 transition-colors">
          <span className="flex items-center gap-2 mb-1 font-medium">
            <Search className="w-4 h-4 text-gray-600" />
            Explore categories
          </span>
          <span className="text-neutral-500">Browse system categories and specs</span>
        </button>
        <button className="bg-white shadow-sm rounded-xl p-4 text-sm flex flex-col items-start hover:shadow-md hover:bg-neutral-50 transition-colors">
          <span className="flex items-center gap-2 mb-1 font-medium">
            <Calculator className="w-4 h-4 text-gray-600" />
            Panel – system matcher
          </span>
          <span className="text-neutral-500">Find compatible panel systems</span>
        </button>
        <button className="bg-white shadow-sm rounded-xl p-4 text-sm flex flex-col items-start hover:shadow-md hover:bg-neutral-50 transition-colors">
          <span className="flex items-center gap-2 mb-1 font-medium">
            <Settings className="w-4 h-4 text-gray-600" />
            System components
          </span>
          <span className="text-neutral-500">Detailed component information</span>
        </button>
        <button className="bg-white shadow-sm rounded-xl p-4 text-sm flex flex-col items-start hover:shadow-md hover:bg-neutral-50 transition-colors">
          <span className="flex items-center gap-2 mb-1 font-medium">
            <FileText className="w-4 h-4 text-gray-600" />
            Installation guides
          </span>
          <span className="text-neutral-500">Step-by-step installation manuals</span>
        </button>
      </div>
    </div>
  );

  const PriceCheckView = () => (
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-xl font-semibold text-neutral-800 mb-2">Check component price</h2>
          <p className="text-neutral-600 mb-6">Get instant componet price by typing product name or art no</p>
          {/* File interaction zone above input field */}
          <div className="flex flex-col items-end mb-4">
            <div className="flex gap-4 bg-gray-50 p-3 rounded-lg border border-neutral-100 w-full justify-end">
              <div className="flex flex-col items-end">
                <label className="relative cursor-pointer flex items-center gap-2 border border-neutral-200 rounded-md px-4 py-2 bg-white hover:bg-neutral-50 transition-colors shadow-sm">
                  <Upload className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-neutral-700 font-medium">Upload File</span>
                  <input type="file" accept=".pdf,.xls,.xlsx,.csv" className="absolute inset-0 opacity-0 cursor-pointer" />
                </label>
                <span className="text-xs text-neutral-400 mt-1">PDF or spreadsheet formats supported</span>
              </div>
              <div className="flex flex-col items-end">
                <button className="flex items-center gap-2 border border-neutral-200 rounded-md px-4 py-2 bg-white hover:bg-neutral-50 transition-colors shadow-sm">
                  <Download className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-neutral-700 font-medium">Download in XLS</span>
                </button>
                <span className="text-xs text-neutral-400 mt-1">Download calculated prices</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Start typing product name or Art No"
              className="w-full px-4 py-4 text-lg border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-transparent"
            />
          </div>
          <div className="mt-6 flex flex-wrap gap-4 justify-center text-sm">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="rounded border-neutral-300" />
              <span className="text-neutral-600">show my commission if any</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="rounded border-neutral-300" />
              <span className="text-neutral-600">show product weights</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="rounded border-neutral-300" />
              <span className="text-neutral-600">apply import tax</span>
            </label>
          </div>
        </div>
      </div>

      {/* 2x2 grid of action cards below input field */}
      <div className="grid grid-cols-2 gap-4 max-w-3xl mx-auto">
        <button className="bg-white shadow-sm rounded-xl p-4 text-sm flex flex-col items-start hover:shadow-md hover:bg-neutral-50 transition-colors">
          <span className="flex items-center gap-2 mb-1 font-medium">
            <BarChart className="w-4 h-4 text-gray-600" />
            List category pricing
          </span>
          <span className="text-neutral-500">Browse pricing by category</span>
        </button>
        <button className="bg-white shadow-sm rounded-xl p-4 text-sm flex flex-col items-start hover:shadow-md hover:bg-neutral-50 transition-colors">
          <span className="flex items-center gap-2 mb-1 font-medium">
            <FileText className="w-4 h-4 text-gray-600" />
            Check specifications
          </span>
          <span className="text-neutral-500">Product specifications and details</span>
        </button>
        <button className="bg-white shadow-sm rounded-xl p-4 text-sm flex flex-col items-start hover:shadow-md hover:bg-neutral-50 transition-colors">
          <span className="flex items-center gap-2 mb-1 font-medium">
            <Truck className="w-4 h-4 text-gray-600" />
            Request transportation
          </span>
          <span className="text-neutral-500">Get a delivery price quote</span>
        </button>
        <button className="bg-white shadow-sm rounded-xl p-4 text-sm flex flex-col items-start hover:shadow-md hover:bg-neutral-50 transition-colors">
          <span className="flex items-center gap-2 mb-1 font-medium">
            <MessageSquare className="w-4 h-4 text-gray-600" />
            Request special price
          </span>
          <span className="text-neutral-500">Get personalized pricing</span>
        </button>
      </div>
    </div>
  );

  const ChatView = () => (
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-xl font-semibold text-neutral-800 mb-2">Ask anything about ventilated façades</h2>
          <p className="text-neutral-600 mb-6">Get instant and accurate answers, powered by advanced AI</p>
          <div className="relative">
            <input
              type="text"
              placeholder="Type your question..."
              className="w-full px-4 py-4 text-lg border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* 2x3 grid of action cards below input field */}
      <div className="grid grid-cols-2 gap-4 max-w-3xl mx-auto">
        <button className="bg-white shadow-sm rounded-xl p-4 text-sm flex flex-col items-start hover:shadow-md hover:bg-neutral-50 transition-colors">
          <span className="flex items-center gap-2 mb-1 font-medium">
            <Calculator className="w-4 h-4 text-gray-600" />
            Panel – system matcher
          </span>
          <span className="text-neutral-500">Find compatible systems</span>
        </button>
        <button className="bg-white shadow-sm rounded-xl p-4 text-sm flex flex-col items-start hover:shadow-md hover:bg-neutral-50 transition-colors">
          <span className="flex items-center gap-2 mb-1 font-medium">
            <BarChart className="w-4 h-4 text-gray-600" />
            Get a project quote
          </span>
          <span className="text-neutral-500">Project pricing calculator</span>
        </button>
        <button className="bg-white shadow-sm rounded-xl p-4 text-sm flex flex-col items-start hover:shadow-md hover:bg-neutral-50 transition-colors">
          <span className="flex items-center gap-2 mb-1 font-medium">
            <Search className="w-4 h-4 text-gray-600" />
            Explore categories
          </span>
          <span className="text-neutral-500">Browse topics and categories</span>
        </button>
        <button className="bg-white shadow-sm rounded-xl p-4 text-sm flex flex-col items-start hover:shadow-md hover:bg-neutral-50 transition-colors">
          <span className="flex items-center gap-2 mb-1 font-medium">
            <Settings className="w-4 h-4 text-gray-600" />
            Learn about Q-VENT
          </span>
          <span className="text-neutral-500">Explore our systems</span>
        </button>
        <button className="bg-white shadow-sm rounded-xl p-4 text-sm flex flex-col items-start hover:shadow-md hover:bg-neutral-50 transition-colors">
          <span className="flex items-center gap-2 mb-1 font-medium">
            <ExternalLink className="w-4 h-4 text-gray-600" />
            Learn about Terracotta
          </span>
          <span className="text-neutral-500">Terracotta systems overview</span>
        </button>
        <button className="bg-white shadow-sm rounded-xl p-4 text-sm flex flex-col items-start hover:shadow-md hover:bg-neutral-50 transition-colors">
          <span className="flex items-center gap-2 mb-1 font-medium">
            <FileText className="w-4 h-4 text-gray-600" />
            Check product specs
          </span>
          <span className="text-neutral-500">Detailed product specifications</span>
        </button>
      </div>
    </div>
  );

  // Empty My Projects page
  const MyProjectsView = () => (
    <div className="min-h-screen p-8"></div>
  );

  // Empty AGROBBUCHTAL pages
  const KeratwinView = () => (
    <div className="min-h-screen p-8">
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-neutral-800 mb-2">Terracotta panels</h2>
          <p className="text-neutral-600">Work in progress</p>
        </div>
      </div>
    </div>
  );
  const MyPricesAgrobView = () => (
    <div className="min-h-screen p-8">
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-neutral-800 mb-2">My Prices (AB distributors)</h2>
          <p className="text-neutral-600">Work in progress</p>
        </div>
      </div>
    </div>
  );
  const AdminAbView = () => (
    <div className="min-h-screen p-8">
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-neutral-800 mb-2">Admin (AB team)</h2>
          <p className="text-neutral-600">Work in progress</p>
        </div>
      </div>
    </div>
  );

  // Admin page for Q-VENT
  const AdminView = () => {
    // Smaller StatCard for Admin page
    const AdminStatCard = ({ title, value, subtitle }) => (
      <div className="bg-white rounded-xl shadow-md p-4 border border-neutral-100">
        <h3 className="text-sm font-medium text-neutral-600 mb-2">{title}</h3>
        <p className="text-xl font-bold text-neutral-800 mb-1">{value}</p>
        <p className="text-xs text-neutral-500">{subtitle}</p>
      </div>
    );

    return (
      <div className="space-y-8">
        {/* Chat Usage Dashboard - Combined Stats and Search */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-neutral-800">Chat Usage Dashboard</h2>
            <div className="flex items-center space-x-2">
              <select 
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="text-sm border border-neutral-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-neutral-500"
              >
                <option value="last-week">Last Week</option>
                <option value="last-month">Last Month</option>
                <option value="last-quarter">Last Quarter</option>
              </select>
              <button className="flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-800 border border-neutral-200 px-3 py-2 rounded-lg hover:bg-neutral-50 transition-colors">
                <Filter className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>
          
          {/* KPI Cards - Single row layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <AdminStatCard title="# chat sessions" value="1,247" subtitle="by user (filter)" />
            <AdminStatCard title="# chat durations" value="avg 8.5min" subtitle="data" />
            <AdminStatCard title="# CSI (semantic?)" value="94%" subtitle="data" />
            <AdminStatCard title="# offer requests" value="342" subtitle="data" />
          </div>

        {/* Search Section */}
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="What do you want to know about chat usage?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-4 text-lg border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-transparent"
              />
            </div>
            <button className="flex items-center gap-2 px-6 py-4 text-sm border border-neutral-200 rounded-xl hover:bg-neutral-50 transition-colors font-medium whitespace-nowrap text-neutral-700">
              <Sparkles className="w-5 h-5" />
              Surprise me
            </button>
          </div>
        </div>
      </div>

      {/* Management Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <button className="bg-white rounded-xl shadow-md p-6 border border-neutral-100 hover:border-neutral-200 transition-colors text-left group">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-neutral-800 group-hover:text-neutral-900">Manage users</h3>
            <ExternalLink className="w-4 h-4 text-gray-600 group-hover:text-neutral-600" />
          </div>
        </button>
        <button className="bg-white rounded-xl shadow-md p-6 border border-neutral-100 hover:border-neutral-200 transition-colors text-left group">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-neutral-800 group-hover:text-neutral-900">Manage dealers</h3>
            <ExternalLink className="w-4 h-4 text-gray-600 group-hover:text-neutral-600" />
          </div>
        </button>
        <button className="bg-white rounded-xl shadow-md p-6 border border-neutral-100 hover:border-neutral-200 transition-colors text-left group">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-neutral-800 group-hover:text-neutral-900">Manage products</h3>
            <ExternalLink className="w-4 h-4 text-gray-600 group-hover:text-neutral-600" />
          </div>
        </button>
        <button className="bg-white rounded-xl shadow-md p-6 border border-neutral-100 hover:border-neutral-200 transition-colors text-left group">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-neutral-800 group-hover:text-neutral-900">Manage prices</h3>
            <ExternalLink className="w-4 h-4 text-gray-600 group-hover:text-neutral-600" />
          </div>
        </button>
      </div>
    </div>
  );
};

  const OurPricesSalesView = () => (
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-xl font-semibold text-neutral-800 mb-2">Check component price</h2>
          <p className="text-neutral-600 mb-6">Get instant componet price by typing product name or art no</p>
          {/* File interaction zone above input field (reuse from PriceCheckView if needed) */}
          <div className="flex flex-col items-end mb-4">
            <div className="flex gap-4 bg-gray-50 p-3 rounded-lg border border-neutral-100 w-full justify-end">
              <div className="flex flex-col items-end">
                <label className="relative cursor-pointer flex items-center gap-2 border border-neutral-200 rounded-md px-4 py-2 bg-white hover:bg-neutral-50 transition-colors shadow-sm">
                  <Upload className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-neutral-700 font-medium">Upload File</span>
                  <input type="file" accept=".pdf,.xls,.xlsx,.csv" className="absolute inset-0 opacity-0 cursor-pointer" />
                </label>
                <span className="text-xs text-neutral-400 mt-1">PDF or spreadsheet formats supported</span>
              </div>
              <div className="flex flex-col items-end">
                <button className="flex items-center gap-2 border border-neutral-200 rounded-md px-4 py-2 bg-white hover:bg-neutral-50 transition-colors shadow-sm">
                  <Download className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-neutral-700 font-medium">Download in XLS</span>
                </button>
                <span className="text-xs text-neutral-400 mt-1">Download calculated prices</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Start typing product name or Art No"
              className="w-full px-4 py-4 text-lg border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-transparent"
            />
          </div>
          {/* Checkboxes row for price output logic */}
          <div className="flex flex-wrap gap-4 justify-center my-6 text-sm">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="rounded border-neutral-300" />
              <span className="text-neutral-600">always show price calculation</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="rounded border-neutral-300" />
              <span className="text-neutral-600">always show price levels</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="rounded border-neutral-300" />
              <span className="text-neutral-600">always show gross profit</span>
            </label>
          </div>
        </div>
      </div>
      {/* 2x2 grid of action cards below input field */}
      <div className="grid grid-cols-2 gap-4 max-w-3xl mx-auto">
        <button className="bg-white shadow-sm rounded-xl p-4 text-sm flex flex-col items-start hover:shadow-md hover:bg-neutral-50 transition-colors">
          <span className="flex items-center gap-2 mb-1 font-medium">
            <BarChart className="w-4 h-4 text-gray-600" />
            List category pricing
          </span>
          <span className="text-neutral-500">Browse pricing by category</span>
        </button>
        <button className="bg-white shadow-sm rounded-xl p-4 text-sm flex flex-col items-start hover:shadow-md hover:bg-neutral-50 transition-colors">
          <span className="flex items-center gap-2 mb-1 font-medium">
            <FileText className="w-4 h-4 text-gray-600" />
            Check specifications
          </span>
          <span className="text-neutral-500">Product specifications and details</span>
        </button>
        <button className="bg-white shadow-sm rounded-xl p-4 text-sm flex flex-col items-start hover:shadow-md hover:bg-neutral-50 transition-colors">
          <span className="flex items-center gap-2 mb-1 font-medium">
            <Calculator className="w-4 h-4 text-gray-600" />
            Show price calculations
          </span>
          <span className="text-neutral-500">Detailed breakdown of pricing steps</span>
        </button>
        <button className="bg-white shadow-sm rounded-xl p-4 text-sm flex flex-col items-start hover:shadow-md hover:bg-neutral-50 transition-colors">
          <span className="flex items-center gap-2 mb-1 font-medium">
            <Tag className="w-4 h-4 text-gray-600" />
            Get price
          </span>
          <span className="text-neutral-500">Design new product price</span>
        </button>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'systems':
        return <SystemsView />;
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
    <div className="p-8 min-h-screen">
      <Header />
      {renderContent()}
    </div>
  );
};

export default MainContent; 