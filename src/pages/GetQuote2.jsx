import React, { useState } from 'react';
import { Upload, MessageSquare, X } from 'lucide-react';

const GetQuote2 = () => {
  const [isAIPanelOpen, setIsAIPanelOpen] = useState(false);
  const [formData, setFormData] = useState({
    // Project Info
    projectRefNo: '',
    projectName: '',
    siteAddress: '',
    postcode: '',
    contactPerson: '',
    contactEmail: '',
    country: '',
    
    // Building Parameters
    buildingHeight: '',
    storyHeight: '',
    cavityDepthMin: '',
    cavityDepthMax: '',
    topHat: 'no',
    topHatDepth: '',
    insulationThickness: '',
    
    // Wind Load
    windLoadTypical: '',
    windLoadTypicalSF: 'no',
    windLoadCorner: '',
    windLoadCornerSF: 'no',
    windLoadFunneling: '',
    windLoadFunnelingSF: 'no',
    
    // Cladding Type
    claddingType: '',
    claddingBrand: '',
    claddingThickness: '',
    panelDimensionB: '',
    panelDimensionH: '',
    claddingWeight: '',
    
    // QV Systems
    qvSystem: '',
    
    // Vertical Profile
    verticalProfileType: '',
    verticalProfileSize: '',
    verticalProfileLengthMax: '',
    verticalProfileLength2: '',
    verticalProfileLength3: '',
    horizontalSpacing: '600',
    deflectionRatio: '200',
    cantileverDeflRatio: '150',
    
    // Wall Bracket
    wallBracket: '',
    
    // Installation (formerly Substrate)
    substrateType: '',
    layoutOutlook: '',
    studThickness: '',
    studMaterial: '',
    steelWorkThickness: '3',
    steelWorkMaterial: '',
    concreteGrade: 'C20/25',
    topHatChannelThickness: '',
    topHatChannelMaterial: '',
    
    // AI Question
    aiQuestion: ''
  });

  const claddingTypes = [
    'AGROB BUCHTAL KeraTwin K20',
    'Terracotta',
    'Aluminum',
    'Fiber cement',
    'Fiber concrete',
    'HPL',
    'Stone',
    'ACM 4 mm',
    'Brick slip'
  ];

  const qvSystems = [
    { id: 'QV1', description: 'Exposed Mechanical Fastening' },
    { id: 'QV2', description: 'Concealed Adhesive' },
    { id: 'QV3', description: 'KeraTwin K20 Panels' },
    { id: 'QV6', description: 'Concealed Undercut' },
    { id: 'QV7', description: 'Terracotta Panels' },
    { id: 'QV9', description: 'Metal panels' },
    { id: 'Q-CLOUD', description: 'Concealed Adhesive' }
  ];

  const verticalProfiles = {
    T: {
      name: 'T-Profile',
      sizes: ['120×60×2', '120×60×3', '140×60×2', '140×60×3', '160×60×2', '160×60×3', '180×60×3']
    },
    L: {
      name: 'L-Profile',
      sizes: ['80×60×2', '80×60×3', '100×60×2', '100×60×3', '120×60×2', '120×60×3']
    }
  };

  const wallBracketTypes = [
    { value: 'QVB', label: 'QVB Aluminum Wall Brackets' },
    { value: 'QTB', label: 'QTB Stainless Steel Wall bracket' }
  ];

  const substrateTypes = [
    'Stud',
    'Steel work',
    'Concrete',
    'Masonry',
    'Top Hat / C-channel',
    'Timber'
  ];

  const studThicknessOptions = ['1.2', '1.5', '2'];
  const studMaterialOptions = ['S280GD', 'S350GD'];
  const steelWorkMaterialOptions = ['S275', 'S235'];
  const topHatThicknessOptions = ['2', '2.5', '3'];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => {
      const next = {
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      };

      // When Story Height is set, mirror it into Max profile length
      if (name === 'storyHeight') {
        next.verticalProfileLengthMax = value;
      }

      // Link between Cladding Type and QV System (for Agrob Buchtal)
      if (name === 'claddingType') {
        if (value === 'AGROB BUCHTAL KeraTwin K20') {
          next.qvSystem = 'QV3';
        }
      }

      return next;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const renderInputWithUnit = (name, unit, placeholder = '', required = false) => (
    <div className="relative">
      <input
        type="text"
        name={name}
        value={formData[name]}
        onChange={handleInputChange}
        required={required}
        className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 text-base font-sans transition-all duration-200"
        placeholder={placeholder}
      />
      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm font-medium text-gray-500">
        {unit}
      </span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-4 lg:gap-8">
        {/* Left: Main form content */}
        <div className="flex-1 min-w-0 space-y-8">
          {/* Page Header */}
          <div className="mb-8 lg:mb-0">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3 font-sans">Get Quote 2</h2>
            <p className="text-base text-gray-600 font-sans">Technical specification form for facade system calculations.</p>
          </div>
            {/* Layer 1: System Define */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-5">
                <h3 className="text-lg font-medium text-gray-900 mb-5 pb-2 border-b border-gray-100 font-sans">
                  System Define
                </h3>
                <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-normal text-gray-700 mb-2 font-sans">
                      Cladding Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="claddingType"
                      value={formData.claddingType}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 text-base font-sans transition-all duration-200"
                    >
                      <option value="">Select cladding type</option>
                      {claddingTypes.map((type, index) => (
                        <option key={index} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-normal text-gray-700 mb-2 font-sans">
                      Brand
                    </label>
                    <input
                      type="text"
                      name="claddingBrand"
                      value={formData.claddingBrand}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 text-base font-sans transition-all duration-200"
                      placeholder="Enter brand name"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-normal text-gray-700 mb-2 font-sans">
                      Cladding Thickness <span className="text-red-500">*</span>
                    </label>
                    {renderInputWithUnit('claddingThickness', 'mm', '', true)}
                  </div>
                  <div>
                    <label className="block text-sm font-normal text-gray-700 mb-2 font-sans">
                      Cladding Weight <span className="text-red-500">*</span>
                    </label>
                    {renderInputWithUnit('claddingWeight', 'kg/sq.m', '', true)}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-normal text-gray-700 mb-2 font-sans">
                      Panel Dimension B (width) <span className="text-red-500">*</span>
                    </label>
                    {renderInputWithUnit('panelDimensionB', 'mm', '', true)}
                  </div>
                  <div>
                    <label className="block text-sm font-normal text-gray-700 mb-2 font-sans">
                      Panel Dimension H (height) <span className="text-red-500">*</span>
                    </label>
                    {renderInputWithUnit('panelDimensionH', 'mm', '', true)}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-normal text-gray-700 mb-2 font-sans">
                      Layout outlook <span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="layoutOutlook"
                          value="visible fixing"
                          checked={formData.layoutOutlook === 'visible fixing'}
                          onChange={handleInputChange}
                          required
                          className="w-4 h-4 text-gray-600 border-gray-300 focus:ring-gray-400"
                        />
                        <span className="text-sm text-gray-700">Visible fixing</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="layoutOutlook"
                          value="concealed"
                          checked={formData.layoutOutlook === 'concealed'}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-gray-600 border-gray-300 focus:ring-gray-400"
                        />
                        <span className="text-sm text-gray-700">Concealed</span>
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-normal text-gray-700 mb-2 font-sans">
                      Substrate Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="substrateType"
                      value={formData.substrateType}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 text-base font-sans transition-all duration-200"
                    >
                      <option value="">Select substrate type</option>
                      {substrateTypes.map((type, index) => (
                        <option key={index} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                </div>
              </div>

            {/* Your Configuration – mobile only (desktop: in right sidebar) */}
            <div className="lg:hidden bg-red-50 border border-red-200 rounded-xl p-4 sm:p-5">
              <h3 className="text-lg font-medium text-gray-900 font-sans mb-4">Your Configuration</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {qvSystems.map((system) => {
                  const isAgrobCladding = formData.claddingType === 'AGROB BUCHTAL KeraTwin K20';
                  const isEnabled = !isAgrobCladding || system.id === 'QV3';
                  const isActive = formData.qvSystem === system.id;
                  return (
                    <label
                      key={system.id}
                      className={`flex flex-col items-center justify-center gap-1 p-4 rounded-lg border-2 border-gray-900 transition-all duration-200 text-center ${
                        !isEnabled ? 'bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed opacity-60'
                          : isActive ? 'bg-red-600 border-red-600 text-white cursor-pointer'
                          : 'bg-white border-gray-900 text-gray-900 hover:bg-gray-50 cursor-pointer'
                      }`}
                    >
                      <input type="radio" name="qvSystem" value={system.id} checked={formData.qvSystem === system.id} onChange={handleInputChange} disabled={!isEnabled} className="sr-only" />
                      <span className="text-sm font-medium">{system.id}</span>
                      <span className={`text-xs font-normal ${isActive ? 'text-white/90' : 'text-gray-600'}`}>{system.description}</span>
                    </label>
                  );
                })}
              </div>
              {formData.qvSystem && (
                <div className="mt-4 border-t border-red-200 pt-4">
                  <h4 className="text-sm font-medium text-gray-800 mb-2 font-sans">Components</h4>
                  {formData.qvSystem === 'QV3' ? (
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 font-sans">
                      <li><span className="font-medium">System rails</span> <span className="text-gray-500">(profiles 695, 690, 698)</span></li>
                      <li><span className="font-medium">Wall brackets</span></li>
                      <li><span className="font-medium">Accessories</span></li>
                      <li><span className="font-medium">Fasteners</span></li>
                    </ul>
                  ) : (
                    <p className="text-xs text-gray-500 font-sans">Configuration details will be added later.</p>
                  )}
                </div>
              )}
              <div className="mt-4 pt-4 border-t border-red-200">
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 font-medium text-base font-sans transition-all duration-200"
                >
                  Get quote
                </button>
              </div>
            </div>

            {/* Layer 2: System Design */}
            <div className="mt-4">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-5">
                <h3 className="text-lg font-medium text-gray-900 mb-5 pb-2 border-b border-gray-100 font-sans">
                  System Design
                </h3>
              <div className="space-y-4">
                <h4 className="text-base font-medium text-gray-800 mb-3 font-sans">Building info</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-normal text-gray-700 mb-2 font-sans">
                      Building Height
                    </label>
                    {renderInputWithUnit('buildingHeight', 'm')}
                  </div>
                  <div>
                    <label className="block text-sm font-normal text-gray-700 mb-2 font-sans">
                      Story Height
                    </label>
                    {renderInputWithUnit('storyHeight', 'm')}
                  </div>
                </div>

                {/* Cavity Depth 1 & 2 */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-normal text-gray-700 mb-2 font-sans">Cavity Depth 1</label>
                    {renderInputWithUnit('cavityDepthMin', 'mm')}
                  </div>
                  <div>
                    <label className="block text-sm font-normal text-gray-700 mb-2 font-sans">Cavity Depth 2</label>
                    {renderInputWithUnit('cavityDepthMax', 'mm')}
                  </div>
                </div>

                {/* Top Hat & Insulation Thickness */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-normal text-gray-700 mb-2 font-sans">Top Hat</label>
                    <div className="flex items-center gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="topHat"
                            value="yes"
                            checked={formData.topHat === 'yes'}
                            onChange={handleInputChange}
                            className="w-4 h-4 text-gray-600 border-gray-300 focus:ring-gray-400"
                          />
                          <span className="text-sm text-gray-700">Yes</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="topHat"
                            value="no"
                            checked={formData.topHat === 'no'}
                            onChange={handleInputChange}
                            className="w-4 h-4 text-gray-600 border-gray-300 focus:ring-gray-400"
                          />
                          <span className="text-sm text-gray-700">No</span>
                        </label>
                    </div>
                    {formData.topHat === 'yes' && (
                      <div className="mt-3">
                        <label className="block text-sm font-normal text-gray-700 mb-2 font-sans">Top Hat Depth</label>
                        {renderInputWithUnit('topHatDepth', 'mm')}
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-normal text-gray-700 mb-2 font-sans">Insulation Thickness</label>
                    {renderInputWithUnit('insulationThickness', 'mm')}
                  </div>
                </div>

                {/* Substrate Type Specifics - depends on Substrate Type above */}
                <div className="pl-4 border-l-4 border-gray-200 bg-gray-50/50 rounded-r-lg py-3 pr-3 space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-800 mb-0.5 font-sans">Substrate Type Specifics</h4>
                    <p className="text-xs text-gray-500 font-sans">Based on Substrate Type selected above</p>
                  </div>
                  {!formData.substrateType && (
                    <p className="text-sm text-gray-400 italic font-sans">Select a substrate type above to see specifications.</p>
                  )}
                  {formData.substrateType === 'Stud' && (
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 space-y-4">
                      <h4 className="text-sm font-medium text-gray-800 font-sans">Stud Specifications</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-normal text-gray-700 mb-2 font-sans">Thickness</label>
                          <select name="studThickness" value={formData.studThickness} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 text-base font-sans transition-all duration-200">
                            <option value="">Select thickness</option>
                            {studThicknessOptions.map((opt) => <option key={opt} value={opt}>{opt} mm</option>)}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-normal text-gray-700 mb-2 font-sans">Material</label>
                          <select name="studMaterial" value={formData.studMaterial} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 text-base font-sans transition-all duration-200">
                            <option value="">Select material</option>
                            {studMaterialOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                          </select>
                        </div>
                      </div>
                    </div>
                  )}
                  {formData.substrateType === 'Steel work' && (
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 space-y-4">
                      <h4 className="text-sm font-medium text-gray-800 font-sans">Steel Work Specifications</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-normal text-gray-700 mb-2 font-sans">Thickness</label>
                          <input type="text" name="steelWorkThickness" value={formData.steelWorkThickness} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 text-base font-sans transition-all duration-200" placeholder="3 mm" />
                        </div>
                        <div>
                          <label className="block text-sm font-normal text-gray-700 mb-2 font-sans">Material</label>
                          <select name="steelWorkMaterial" value={formData.steelWorkMaterial} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 text-base font-sans transition-all duration-200">
                            <option value="">Select material</option>
                            {steelWorkMaterialOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                          </select>
                        </div>
                      </div>
                    </div>
                  )}
                  {formData.substrateType === 'Concrete' && (
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                      <h4 className="text-sm font-medium text-gray-800 font-sans mb-3">Concrete Specifications</h4>
                      <div>
                        <label className="block text-sm font-normal text-gray-700 mb-2 font-sans">Concrete Grade</label>
                        <input type="text" name="concreteGrade" value={formData.concreteGrade} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 text-base font-sans transition-all duration-200" placeholder="C20/25 (default)" />
                      </div>
                    </div>
                  )}
                  {formData.substrateType === 'Top Hat / C-channel' && (
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 space-y-4">
                      <h4 className="text-sm font-medium text-gray-800 font-sans">Top Hat / C-channel Specifications</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-normal text-gray-700 mb-2 font-sans">Thickness</label>
                          <select name="topHatChannelThickness" value={formData.topHatChannelThickness} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 text-base font-sans transition-all duration-200">
                            <option value="">Select thickness</option>
                            {topHatThicknessOptions.map((opt) => <option key={opt} value={opt}>{opt} mm</option>)}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-normal text-gray-700 mb-2 font-sans">Material</label>
                          <input type="text" name="topHatChannelMaterial" value={formData.topHatChannelMaterial} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 text-base font-sans transition-all duration-200" placeholder="5754 H22" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

                {/* Wind Load */}
                <div className="space-y-4 pt-6 pb-4 mt-4 border-t border-gray-100">
                  <h4 className="text-base font-medium text-gray-800 mb-3 font-sans">Wind Load</h4>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-normal text-gray-700 mb-2 font-sans">Typical (center) zone</label>
                        {renderInputWithUnit('windLoadTypical', 'kN/sq.m')}
                      </div>
                      <div className="flex items-center justify-center md:justify-start gap-4 min-h-[42px]">
                        <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700 font-sans">
                          <input type="radio" name="windLoadTypicalSF" value="no" checked={formData.windLoadTypicalSF === 'no'} onChange={handleInputChange} className="w-4 h-4 text-gray-600 border-gray-300 focus:ring-gray-400" />
                          <span>no SF</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700 font-sans">
                          <input type="radio" name="windLoadTypicalSF" value="yes" checked={formData.windLoadTypicalSF === 'yes'} onChange={handleInputChange} className="w-4 h-4 text-gray-600 border-gray-300 focus:ring-gray-400" />
                          <span>with SF</span>
                        </label>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-normal text-gray-700 mb-2 font-sans">Corner zone</label>
                        {renderInputWithUnit('windLoadCorner', 'kN/sq.m')}
                      </div>
                      <div className="flex items-center justify-center md:justify-start gap-4 min-h-[42px]">
                        <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700 font-sans">
                          <input type="radio" name="windLoadCornerSF" value="no" checked={formData.windLoadCornerSF === 'no'} onChange={handleInputChange} className="w-4 h-4 text-gray-600 border-gray-300 focus:ring-gray-400" />
                          <span>no SF</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700 font-sans">
                          <input type="radio" name="windLoadCornerSF" value="yes" checked={formData.windLoadCornerSF === 'yes'} onChange={handleInputChange} className="w-4 h-4 text-gray-600 border-gray-300 focus:ring-gray-400" />
                          <span>with SF</span>
                        </label>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-normal text-gray-700 mb-2 font-sans">Funneling zone</label>
                        {renderInputWithUnit('windLoadFunneling', 'kN/sq.m')}
                      </div>
                      <div className="flex items-center justify-center md:justify-start gap-4 min-h-[42px]">
                        <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700 font-sans">
                          <input type="radio" name="windLoadFunnelingSF" value="no" checked={formData.windLoadFunnelingSF === 'no'} onChange={handleInputChange} className="w-4 h-4 text-gray-600 border-gray-300 focus:ring-gray-400" />
                          <span>no SF</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700 font-sans">
                          <input type="radio" name="windLoadFunnelingSF" value="yes" checked={formData.windLoadFunnelingSF === 'yes'} onChange={handleInputChange} className="w-4 h-4 text-gray-600 border-gray-300 focus:ring-gray-400" />
                          <span>with SF</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Vertical Profile */}
                <div className="space-y-3 pt-6 pb-6 mt-4 border-t border-gray-100">
                  <h4 className="text-base font-medium text-gray-800 mb-3 font-sans">Primary Subframe</h4>
                {/* Select Type + Cross-section - row 1 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                  {/* Select Type - compact */}
                  <div>
                    <div className="grid grid-cols-2 gap-2">
                      <div
                        onClick={() => setFormData(prev => ({ ...prev, verticalProfileType: 'T', verticalProfileSize: '' }))}
                        className={`cursor-pointer rounded-lg border-2 p-2 transition-all duration-200 ${
                          formData.verticalProfileType === 'T' ? 'border-gray-600 bg-gray-50' : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex flex-col items-center">
                          <svg viewBox="0 0 60 80" className="w-10 h-12 mb-1">
                            <rect x="10" y="0" width="40" height="8" fill={formData.verticalProfileType === 'T' ? '#374151' : '#9CA3AF'} />
                            <rect x="24" y="8" width="12" height="72" fill={formData.verticalProfileType === 'T' ? '#374151' : '#9CA3AF'} />
                          </svg>
                          <span className={`text-xs font-medium ${formData.verticalProfileType === 'T' ? 'text-gray-900' : 'text-gray-600'}`}>T-Profile</span>
                        </div>
                      </div>
                      <div
                        onClick={() => setFormData(prev => ({ ...prev, verticalProfileType: 'L', verticalProfileSize: '' }))}
                        className={`cursor-pointer rounded-lg border-2 p-2 transition-all duration-200 ${
                          formData.verticalProfileType === 'L' ? 'border-gray-600 bg-gray-50' : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex flex-col items-center">
                          <svg viewBox="0 0 60 80" className="w-10 h-12 mb-1">
                            <rect x="10" y="0" width="12" height="80" fill={formData.verticalProfileType === 'L' ? '#374151' : '#9CA3AF'} />
                            <rect x="10" y="68" width="40" height="12" fill={formData.verticalProfileType === 'L' ? '#374151' : '#9CA3AF'} />
                          </svg>
                          <span className={`text-xs font-medium ${formData.verticalProfileType === 'L' ? 'text-gray-900' : 'text-gray-600'}`}>L-Profile</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Cross-section Size */}
                  {formData.verticalProfileType && (
                    <div>
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-1.5">
                        {verticalProfiles[formData.verticalProfileType].sizes.map((size) => (
                          <label
                            key={size}
                            className={`flex items-center justify-center p-2 rounded border cursor-pointer transition-all text-xs ${
                              formData.verticalProfileSize === size ? 'border-gray-600 bg-gray-100 text-gray-900 font-medium' : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700'
                            }`}
                          >
                            <input type="radio" name="verticalProfileSize" value={size} checked={formData.verticalProfileSize === size} onChange={handleInputChange} className="sr-only" />
                            <span>{size}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Specify Length - row 2, below Select Type and Cross-section */}
                <div>
                  <div className="h-4" />
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="block text-sm font-normal text-gray-700 mb-2 font-sans">L1 (StoryHeight)</label>
                      {renderInputWithUnit('verticalProfileLengthMax', 'mm')}
                    </div>
                    <div>
                      <label className="block text-sm font-normal text-gray-700 mb-2 font-sans">L2</label>
                      {renderInputWithUnit('verticalProfileLength2', 'mm')}
                    </div>
                    <div>
                      <label className="block text-sm font-normal text-gray-700 mb-2 font-sans">L3</label>
                      {renderInputWithUnit('verticalProfileLength3', 'mm')}
                    </div>
                  </div>
                </div>
                
                {/* Horizontal Spacing + Deflection Ratios - compact row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-normal text-gray-700 mb-2 font-sans">Horizontal Spacing</label>
                    {renderInputWithUnit('horizontalSpacing', 'mm')}
                  </div>
                  <div>
                    <label className="block text-sm font-normal text-gray-700 mb-2 font-sans">Deflection Ratio</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-sm font-medium text-gray-500">
                        L/
                      </span>
                      <input
                        type="text"
                        name="deflectionRatio"
                        value={formData.deflectionRatio}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 text-base font-sans transition-all duration-200"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-normal text-gray-700 mb-2 font-sans">Cantilever Defl Ratio</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-sm font-medium text-gray-500">
                        L/
                      </span>
                      <input
                        type="text"
                        name="cantileverDeflRatio"
                        value={formData.cantileverDeflRatio}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 text-base font-sans transition-all duration-200"
                      />
                    </div>
                  </div>
                </div>
              </div>

                {/* Wall Bracket */}
                <div className="pt-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {wallBracketTypes.map((bracket) => (
                  <label
                    key={bracket.value}
                    className="flex items-center gap-2 cursor-pointer text-sm"
                  >
                    <input
                      type="radio"
                      name="wallBracket"
                      value={bracket.value}
                      checked={formData.wallBracket === bracket.value}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-gray-600 border-gray-300 focus:ring-gray-400"
                    />
                    <span className="font-normal text-gray-700">{bracket.label}</span>
                  </label>
                ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Layer 3: Project Information */}
            <div className="mt-4">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-5 space-y-4">
                <h3 className="text-lg font-medium text-gray-900 mb-5 pb-2 border-b border-gray-100 font-sans">
                  Project Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-normal text-gray-700 mb-2 font-sans">
                      Project ref No
                    </label>
                    <input
                      type="text"
                      name="projectRefNo"
                      value={formData.projectRefNo}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 text-base font-sans transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-normal text-gray-700 mb-2 font-sans">
                      Project Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="projectName"
                      value={formData.projectName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 text-base font-sans transition-all duration-200"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-normal text-gray-700 mb-2 font-sans">
                    Site Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="siteAddress"
                    value={formData.siteAddress}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 text-base font-sans transition-all duration-200"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-normal text-gray-700 mb-2 font-sans">
                      Postcode <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="postcode"
                      value={formData.postcode}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 text-base font-sans transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-normal text-gray-700 mb-2 font-sans">
                      Country <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 text-base font-sans transition-all duration-200"
                      placeholder="Enter country"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-normal text-gray-700 mb-2 font-sans">
                      Contact Person <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="contactPerson"
                      value={formData.contactPerson}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 text-base font-sans transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-normal text-gray-700 mb-2 font-sans">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="contactEmail"
                      value={formData.contactEmail}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 text-base font-sans transition-all duration-200"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <label className="block text-sm font-normal text-gray-700 mb-2 font-sans">
                    Project Files
                  </label>
                  <p className="text-xs font-light text-gray-500 font-sans mb-2">
                    Optional: Upload architectural drawings, structural calculations, etc.
                  </p>
                  <label htmlFor="file-upload-2" className="block cursor-pointer">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center bg-gray-50/30 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200">
                      <div className="flex flex-col items-center space-y-3">
                        <Upload className="w-8 h-8 text-gray-400" />
                        <p className="text-sm font-medium text-gray-600 font-sans">
                          Click to select files or drag and drop
                        </p>
                      </div>
                    </div>
                    <input
                      type="file"
                      multiple
                      accept=".pdf,.dwg,.jpg,.jpeg,.png,.xlsx,.xls"
                      className="hidden"
                      id="file-upload-2"
                    />
                  </label>
                  <p className="text-xs font-light text-gray-500 font-sans mt-2">
                    Supported formats: PDF, DWG, JPG, XLS • Max size: 10MB per file
                  </p>
                </div>
              </div>
            </div>

        </div>

        {/* Right: Your Configuration – sidebar parallel to form */}
        <div className="hidden lg:flex lg:w-80 lg:flex-shrink-0 lg:flex-col">
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 sm:p-5 sticky top-8 flex flex-col">
            <h3 className="text-lg font-medium text-gray-900 font-sans mb-4">Your Configuration</h3>
            <div className="grid grid-cols-2 gap-3">
              {qvSystems.map((system) => {
                const isAgrobCladding = formData.claddingType === 'AGROB BUCHTAL KeraTwin K20';
                const isEnabled = !isAgrobCladding || system.id === 'QV3';
                const isActive = formData.qvSystem === system.id;
                return (
                  <label
                    key={system.id}
                    className={`flex flex-col items-center justify-center gap-1 p-3 rounded-lg border-2 border-gray-900 transition-all duration-200 text-center ${
                      !isEnabled ? 'bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed opacity-60'
                        : isActive ? 'bg-red-600 border-red-600 text-white cursor-pointer'
                        : 'bg-white border-gray-900 text-gray-900 hover:bg-gray-50 cursor-pointer'
                    }`}
                  >
                    <input type="radio" name="qvSystem" value={system.id} checked={formData.qvSystem === system.id} onChange={handleInputChange} disabled={!isEnabled} className="sr-only" />
                    <span className="text-sm font-medium">{system.id}</span>
                    <span className={`text-xs font-normal ${isActive ? 'text-white/90' : 'text-gray-600'}`}>{system.description}</span>
                  </label>
                );
              })}
            </div>
            {formData.qvSystem && (
              <div className="mt-4 border-t border-red-200 pt-4">
                <h4 className="text-sm font-medium text-gray-800 mb-2 font-sans">Components</h4>
                {formData.qvSystem === 'QV3' ? (
                  <ul className="list-disc list-inside space-y-1 text-xs text-gray-700 font-sans">
                    <li>System rails (profiles 695, 690, 698)</li>
                    <li>Wall brackets</li>
                    <li>Accessories</li>
                    <li>Fasteners</li>
                  </ul>
                ) : (
                  <p className="text-xs text-gray-500 font-sans">Configuration details will be added later.</p>
                )}
              </div>
            )}
            <div className="mt-4 pt-4 border-t border-red-200">
              <button
                type="submit"
                className="w-full px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 font-medium text-base font-sans transition-all duration-200"
              >
                Get quote
              </button>
            </div>
          </div>
        </div>

            {/* Floating AI Assistant – chat bubble */}
            <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
              {isAIPanelOpen && (
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 w-80 sm:w-96">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium text-gray-700 font-sans">AI Assistant</h3>
                    <button
                      type="button"
                      onClick={() => setIsAIPanelOpen(false)}
                      className="p-1 rounded-lg hover:bg-gray-100 text-gray-500"
                      aria-label="Close"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 font-sans mb-2">Need help filling the form? Ask me.</p>
                  <textarea
                    name="aiQuestion"
                    value={formData.aiQuestion}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 resize-none text-base font-sans transition-all duration-200"
                    placeholder="Unsure what to fill in? Ask me, I can explain and fill in for you."
                  />
                </div>
              )}
              <button
                type="button"
                onClick={() => setIsAIPanelOpen(!isAIPanelOpen)}
                className={`flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-all duration-200 ${
                  isAIPanelOpen ? 'bg-gray-700 text-white' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:shadow-xl'
                }`}
                aria-label="AI Assistant"
              >
                <MessageSquare className="w-6 h-6" />
              </button>
            </div>
      </form>
    </div>
  );
};

export default GetQuote2;
