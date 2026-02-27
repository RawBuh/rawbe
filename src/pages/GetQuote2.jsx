import React, { useState } from 'react';
import { Upload, MessageSquare, ChevronDown, ChevronUp } from 'lucide-react';

const GetQuote2 = () => {
  const [isMobileAIExpanded, setIsMobileAIExpanded] = useState(false);
  const [formData, setFormData] = useState({
    // Project Info
    projectName: '',
    siteAddress: '',
    postcode: '',
    contactPerson: '',
    contactEmail: '',
    date: '',
    
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
    
    // Substrate
    substrateType: '',
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
    'QV1',
    'QV2',
    'QV3',
    'QV6',
    'QV7',
    'QV9.3',
    'QV9.5',
    'Q-CLOUD'
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
    { value: 'QVB', label: 'QVB (aluminum)' },
    { value: 'QTB', label: 'QTB (stainless steel)' }
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

  const renderInputWithUnit = (name, unit, placeholder = '') => (
    <div className="relative">
      <input
        type="text"
        name={name}
        value={formData[name]}
        onChange={handleInputChange}
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
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Page Header */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3 font-sans">Get Quote 2</h2>
            <p className="text-base text-gray-600 font-sans">Technical specification form for facade system calculations.</p>
          </div>

          {/* Mobile AI Assistant */}
          <div className="lg:hidden mb-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div
                onClick={() => setIsMobileAIExpanded(!isMobileAIExpanded)}
                className="flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-5 h-5 text-gray-600" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 font-sans">AI Assistant</h3>
                    <p className="text-xs text-gray-500 font-sans">Need help filling the form?</p>
                  </div>
                </div>
                {isMobileAIExpanded ? (
                  <ChevronUp className="w-5 h-5 text-gray-600" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-600" />
                )}
              </div>
              
              {isMobileAIExpanded && (
                <div className="mt-4 border-t border-gray-100 pt-4">
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
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Project Information Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-5">
              <h2 className="text-lg font-medium text-gray-900 mb-5 pb-2 border-b border-gray-100 font-sans">
                Project Information
              </h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-normal text-gray-700 mb-2 font-sans">
                      Project Name
                    </label>
                    <input
                      type="text"
                      name="projectName"
                      value={formData.projectName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 text-base font-sans transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-normal text-gray-700 mb-2 font-sans">
                      Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 text-base font-sans transition-all duration-200"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-normal text-gray-700 mb-2 font-sans">
                    Site Address
                  </label>
                  <input
                    type="text"
                    name="siteAddress"
                    value={formData.siteAddress}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 text-base font-sans transition-all duration-200"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-normal text-gray-700 mb-2 font-sans">
                      Postcode
                    </label>
                    <input
                      type="text"
                      name="postcode"
                      value={formData.postcode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 text-base font-sans transition-all duration-200"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-normal text-gray-700 mb-2 font-sans">
                      Contact Person
                    </label>
                    <input
                      type="text"
                      name="contactPerson"
                      value={formData.contactPerson}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 text-base font-sans transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-normal text-gray-700 mb-2 font-sans">
                      Email
                    </label>
                    <input
                      type="email"
                      name="contactEmail"
                      value={formData.contactEmail}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 text-base font-sans transition-all duration-200"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Cladding Type Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-5">
              <h2 className="text-lg font-medium text-gray-900 mb-5 pb-2 border-b border-gray-100 font-sans">
                Cladding Type
              </h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-normal text-gray-700 mb-2 font-sans">
                      Cladding Type
                    </label>
                    <select
                      name="claddingType"
                      value={formData.claddingType}
                      onChange={handleInputChange}
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
                
                <div>
                  <label className="block text-sm font-normal text-gray-700 mb-2 font-sans">
                    Cladding Thickness
                  </label>
                  {renderInputWithUnit('claddingThickness', 'mm')}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-normal text-gray-700 mb-2 font-sans">
                      Panel Dimension B (width)
                    </label>
                    {renderInputWithUnit('panelDimensionB', 'mm')}
                  </div>
                  <div>
                    <label className="block text-sm font-normal text-gray-700 mb-2 font-sans">
                      Panel Dimension H (height)
                    </label>
                    {renderInputWithUnit('panelDimensionH', 'mm')}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-normal text-gray-700 mb-2 font-sans">
                    Cladding Weight
                  </label>
                  {renderInputWithUnit('claddingWeight', 'kg/sq.m')}
                </div>
              </div>
            </div>

            {/* Substrate - Type Selection */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-5">
              <h2 className="text-lg font-medium text-gray-900 mb-5 pb-2 border-b border-gray-100 font-sans">
                Substrate
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-normal text-gray-700 mb-2 font-sans">
                    Substrate Type
                  </label>
                  <select
                    name="substrateType"
                    value={formData.substrateType}
                    onChange={handleInputChange}
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

            {/* QV Systems Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-5">
              <h2 className="text-lg font-medium text-gray-900 mb-5 pb-2 border border-gray-100 font-sans">
                QV Systems
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {qvSystems.map((system) => {
                  const isAgrobCladding = formData.claddingType === 'AGROB BUCHTAL KeraTwin K20';
                  const isEnabled = !isAgrobCladding || system === 'QV3';

                  return (
                    <label
                      key={system}
                      className={`flex items-center justify-center gap-2 p-4 rounded-lg border-2 transition-all duration-200 ${
                        !isEnabled
                          ? 'border-gray-200 bg-gray-50 text-gray-300 cursor-not-allowed opacity-60'
                          : formData.qvSystem === system
                            ? 'border-gray-600 bg-gray-50 text-gray-900 cursor-pointer'
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 cursor-pointer'
                      }`}
                    >
                      <input
                        type="radio"
                        name="qvSystem"
                        value={system}
                        checked={formData.qvSystem === system}
                        onChange={handleInputChange}
                        disabled={!isEnabled}
                        className="sr-only"
                      />
                      <span className="text-sm font-medium">{system}</span>
                    </label>
                  );
                })}
              </div>

              {/* QV System Configuration */}
              {formData.qvSystem && (
                <div className="mt-6 border-t border-gray-100 pt-4">
                  <h3 className="text-sm font-medium text-gray-800 mb-2 font-sans">
                    Configuration
                  </h3>

                  {formData.qvSystem === 'QV3' ? (
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 font-sans">
                      <li>
                        <span className="font-medium">System rails</span>{' '}
                        <span className="text-gray-500">(profiles 695, 690, 698)</span>
                      </li>
                      <li>
                        <span className="font-medium">Wall brackets</span>
                      </li>
                      <li>
                        <span className="font-medium">Accessories</span>
                      </li>
                      <li>
                        <span className="font-medium">Fasteners</span>
                      </li>
                    </ul>
                  ) : (
                    <p className="text-xs text-gray-500 font-sans">
                      Configuration details for this system will be added later.
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Building Parameters Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-5">
              <h2 className="text-lg font-medium text-gray-900 mb-5 pb-2 border-b border-gray-100 font-sans">
                Building Parameters
              </h2>
              <div className="space-y-4">
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
                
                {/* Cavity Depth with two sizes */}
                <div>
                  <label className="block text-sm font-normal text-gray-700 mb-2 font-sans">
                    Cavity Depth
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-xs text-gray-500 mb-1 block">Min</span>
                      {renderInputWithUnit('cavityDepthMin', 'mm')}
                    </div>
                    <div>
                      <span className="text-xs text-gray-500 mb-1 block">Max</span>
                      {renderInputWithUnit('cavityDepthMax', 'mm')}
                    </div>
                  </div>
                </div>
                
                {/* Top Hat - moved before Insulation */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center gap-4">
                    <label className="text-sm font-normal text-gray-700 font-sans">Top Hat</label>
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
                  </div>
                  {formData.topHat === 'yes' && (
                    <div className="mt-3">
                      <label className="block text-sm font-normal text-gray-700 mb-2 font-sans">
                        Top Hat Depth
                      </label>
                      {renderInputWithUnit('topHatDepth', 'mm')}
                    </div>
                  )}
                </div>
                
                {/* Insulation Thickness - after Top Hat */}
                <div>
                  <label className="block text-sm font-normal text-gray-700 mb-2 font-sans">
                    Insulation Thickness
                  </label>
                  {renderInputWithUnit('insulationThickness', 'mm')}
                </div>
              </div>
            </div>

            {/* Wind Load Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-5">
              <h2 className="text-lg font-medium text-gray-900 mb-5 pb-2 border-b border-gray-100 font-sans">
                Wind Load
              </h2>
              <div className="space-y-4">
                {/* Typical (center) zone */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-normal text-gray-700 mb-2 font-sans">
                      Typical (center) zone
                    </label>
                    {renderInputWithUnit('windLoadTypical', 'kN/sq.m')}
                  </div>
                  <div>
                    <label className="block text-sm font-normal text-gray-700 mb-2 font-sans">
                      Safety Factor
                    </label>
                    <div className="flex flex-col gap-1">
                      <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
                        <input
                          type="radio"
                          name="windLoadTypicalSF"
                          value="no"
                          checked={formData.windLoadTypicalSF === 'no'}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-gray-600 border-gray-300 focus:ring-gray-400"
                        />
                        <span>no SF</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
                        <input
                          type="radio"
                          name="windLoadTypicalSF"
                          value="yes"
                          checked={formData.windLoadTypicalSF === 'yes'}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-gray-600 border-gray-300 focus:ring-gray-400"
                        />
                        <span>with SF</span>
                      </label>
                    </div>
                  </div>
                </div>
                
                {/* Corner zone */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-normal text-gray-700 mb-2 font-sans">
                      Corner zone
                    </label>
                    {renderInputWithUnit('windLoadCorner', 'kN/sq.m')}
                  </div>
                  <div>
                    <label className="block text-sm font-normal text-gray-700 mb-2 font-sans">
                      Safety Factor
                    </label>
                    <div className="flex flex-col gap-1">
                      <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
                        <input
                          type="radio"
                          name="windLoadCornerSF"
                          value="no"
                          checked={formData.windLoadCornerSF === 'no'}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-gray-600 border-gray-300 focus:ring-gray-400"
                        />
                        <span>no SF</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
                        <input
                          type="radio"
                          name="windLoadCornerSF"
                          value="yes"
                          checked={formData.windLoadCornerSF === 'yes'}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-gray-600 border-gray-300 focus:ring-gray-400"
                        />
                        <span>with SF</span>
                      </label>
                    </div>
                  </div>
                </div>
                
                {/* Funneling zone */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-normal text-gray-700 mb-2 font-sans">
                      Funneling zone
                    </label>
                    {renderInputWithUnit('windLoadFunneling', 'kN/sq.m')}
                  </div>
                  <div>
                    <label className="block text-sm font-normal text-gray-700 mb-2 font-sans">
                      Safety Factor
                    </label>
                    <div className="flex flex-col gap-1">
                      <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
                        <input
                          type="radio"
                          name="windLoadFunnelingSF"
                          value="no"
                          checked={formData.windLoadFunnelingSF === 'no'}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-gray-600 border-gray-300 focus:ring-gray-400"
                        />
                        <span>no SF</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
                        <input
                          type="radio"
                          name="windLoadFunnelingSF"
                          value="yes"
                          checked={formData.windLoadFunnelingSF === 'yes'}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-gray-600 border-gray-300 focus:ring-gray-400"
                        />
                        <span>with SF</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Vertical Profile Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-5">
              <h2 className="text-lg font-medium text-gray-900 mb-5 pb-2 border-b border-gray-100 font-sans">
                Vertical Profile
              </h2>
              <div className="space-y-4">
                {/* Profile Type Selection with Images */}
                <div>
                  <label className="block text-sm font-normal text-gray-700 mb-3 font-sans">
                    Select Type
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    {/* T-Profile */}
                    <div
                      onClick={() => setFormData(prev => ({ ...prev, verticalProfileType: 'T', verticalProfileSize: '' }))}
                      className={`cursor-pointer rounded-xl border-2 p-4 transition-all duration-200 ${
                        formData.verticalProfileType === 'T'
                          ? 'border-gray-600 bg-gray-50'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex flex-col items-center">
                        {/* T-Profile SVG */}
                        <svg viewBox="0 0 60 80" className="w-16 h-20 mb-3">
                          <rect x="10" y="0" width="40" height="8" fill={formData.verticalProfileType === 'T' ? '#374151' : '#9CA3AF'} />
                          <rect x="24" y="8" width="12" height="72" fill={formData.verticalProfileType === 'T' ? '#374151' : '#9CA3AF'} />
                        </svg>
                        <span className={`text-sm font-medium ${formData.verticalProfileType === 'T' ? 'text-gray-900' : 'text-gray-600'}`}>
                          T-Profile
                        </span>
                      </div>
                    </div>
                    
                    {/* L-Profile */}
                    <div
                      onClick={() => setFormData(prev => ({ ...prev, verticalProfileType: 'L', verticalProfileSize: '' }))}
                      className={`cursor-pointer rounded-xl border-2 p-4 transition-all duration-200 ${
                        formData.verticalProfileType === 'L'
                          ? 'border-gray-600 bg-gray-50'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex flex-col items-center">
                        {/* L-Profile SVG */}
                        <svg viewBox="0 0 60 80" className="w-16 h-20 mb-3">
                          <rect x="10" y="0" width="12" height="80" fill={formData.verticalProfileType === 'L' ? '#374151' : '#9CA3AF'} />
                          <rect x="10" y="68" width="40" height="12" fill={formData.verticalProfileType === 'L' ? '#374151' : '#9CA3AF'} />
                        </svg>
                        <span className={`text-sm font-medium ${formData.verticalProfileType === 'L' ? 'text-gray-900' : 'text-gray-600'}`}>
                          L-Profile
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Cross-section Size Selection */}
                {formData.verticalProfileType && (
                  <div>
                    <label className="block text-sm font-normal text-gray-700 mb-2 font-sans">
                      Cross-section Size (mm)
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {verticalProfiles[formData.verticalProfileType].sizes.map((size) => (
                        <label
                          key={size}
                          className={`flex items-center justify-center p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                            formData.verticalProfileSize === size
                              ? 'border-gray-600 bg-gray-100 text-gray-900'
                              : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700'
                          }`}
                        >
                          <input
                            type="radio"
                            name="verticalProfileSize"
                            value={size}
                            checked={formData.verticalProfileSize === size}
                            onChange={handleInputChange}
                            className="sr-only"
                          />
                          <span className="text-sm font-medium">{size}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Specify Length - 3 values */}
                <div>
                  <label className="block text-sm font-normal text-gray-700 mb-2 font-sans">
                    Specify Length (Max = Story Height)
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <span className="text-xs text-gray-500 mb-1 block">Max</span>
                      {renderInputWithUnit('verticalProfileLengthMax', 'mm')}
                    </div>
                    <div>
                      <span className="text-xs text-gray-500 mb-1 block">Length 2</span>
                      {renderInputWithUnit('verticalProfileLength2', 'mm')}
                    </div>
                    <div>
                      <span className="text-xs text-gray-500 mb-1 block">Length 3</span>
                      {renderInputWithUnit('verticalProfileLength3', 'mm')}
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-normal text-gray-700 mb-2 font-sans">
                    Horizontal Spacing
                  </label>
                  {renderInputWithUnit('horizontalSpacing', 'mm')}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-normal text-gray-700 mb-2 font-sans">
                      Deflection Ratio
                    </label>
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
                    <label className="block text-sm font-normal text-gray-700 mb-2 font-sans">
                      Cantilever Defl Ratio
                    </label>
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
            </div>

            {/* Wall Bracket Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3 sm:p-4">
              <h2 className="text-lg font-medium text-gray-900 mb-5 pb-2 border-b border-gray-100 font-sans">
                Wall Bracket
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {wallBracketTypes.map((bracket) => (
                  <label
                    key={bracket.value}
                    className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 px-2 py-1.5 rounded-md border border-gray-200 transition-colors text-sm"
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

            {/* Substrate specifics Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3 sm:p-4">
              <h2 className="text-lg font-medium text-gray-900 mb-5 pb-2 border-b border-gray-100 font-sans">
                Substrate specifics
              </h2>
              <div className="space-y-3 text-sm">
                {/* Stud options */}
                {formData.substrateType === 'Stud' && (
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 space-y-3">
                    <h4 className="text-sm font-medium text-gray-800 font-sans">Stud Specifications</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-normal text-gray-700 mb-2 font-sans">
                          Thickness
                        </label>
                        <select
                          name="studThickness"
                          value={formData.studThickness}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 text-base font-sans transition-all duration-200"
                        >
                          <option value="">Select thickness</option>
                          {studThicknessOptions.map((opt) => (
                            <option key={opt} value={opt}>{opt} mm</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-normal text-gray-700 mb-2 font-sans">
                          Material
                        </label>
                        <select
                          name="studMaterial"
                          value={formData.studMaterial}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 text-base font-sans transition-all duration-200"
                        >
                          <option value="">Select material</option>
                          {studMaterialOptions.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Steel work options */}
                {formData.substrateType === 'Steel work' && (
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 space-y-3">
                    <h4 className="text-sm font-medium text-gray-800 font-sans">Steel Work Specifications</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-normal text-gray-700 mb-2 font-sans">
                          Thickness
                        </label>
                        <input
                          type="text"
                          name="steelWorkThickness"
                          value={formData.steelWorkThickness}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 text-base font-sans transition-all duration-200"
                          placeholder="3 mm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-normal text-gray-700 mb-2 font-sans">
                          Material
                        </label>
                        <select
                          name="steelWorkMaterial"
                          value={formData.steelWorkMaterial}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 text-base font-sans transition-all duration-200"
                        >
                          <option value="">Select material</option>
                          {steelWorkMaterialOptions.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Concrete options */}
                {formData.substrateType === 'Concrete' && (
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                    <h4 className="text-sm font-medium text-gray-800 font-sans mb-3">Concrete Specifications</h4>
                    <div>
                      <label className="block text-sm font-normal text-gray-700 mb-2 font-sans">
                        Concrete Grade
                      </label>
                      <input
                        type="text"
                        name="concreteGrade"
                        value={formData.concreteGrade}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 text-base font-sans transition-all duration-200"
                        placeholder="C20/25 (default)"
                      />
                    </div>
                  </div>
                )}
                
                {/* Top Hat / C-channel options */}
                {formData.substrateType === 'Top Hat / C-channel' && (
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 space-y-3">
                    <h4 className="text-sm font-medium text-gray-800 font-sans">Top Hat / C-channel Specifications</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-normal text-gray-700 mb-2 font-sans">
                          Thickness
                        </label>
                        <select
                          name="topHatChannelThickness"
                          value={formData.topHatChannelThickness}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 text-base font-sans transition-all duration-200"
                        >
                          <option value="">Select thickness</option>
                          {topHatThicknessOptions.map((opt) => (
                            <option key={opt} value={opt}>{opt} mm</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-normal text-gray-700 mb-2 font-sans">
                          Material
                        </label>
                        <input
                          type="text"
                          name="topHatChannelMaterial"
                          value={formData.topHatChannelMaterial}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 text-base font-sans transition-all duration-200"
                          placeholder="5754 H22"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* File Upload Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
              <h2 className="text-lg font-medium text-gray-900 mb-5 pb-2 border-b border-gray-100 font-sans">
                Project Files
              </h2>
              <div className="space-y-2">
                <p className="text-xs font-light text-gray-500 font-sans">
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
                
                <p className="text-xs font-light text-gray-500 font-sans">
                  Supported formats: PDF, DWG, JPG, XLS • Max size: 10MB per file
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 text-center">
              <button
                type="submit"
                className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 font-medium text-base font-sans transition-all duration-200"
              >
                Submit Specification
              </button>
            </div>
          </form>
        </div>

        {/* AI Assistance Panel - Desktop Only */}
        <div className="hidden lg:block w-80">
          <div className="bg-white rounded-xl shadow-md p-5 sticky top-8">
            <h3 className="text-sm font-medium text-gray-700 mb-3 font-sans">AI Assistant</h3>
            <textarea
              name="aiQuestion"
              value={formData.aiQuestion}
              onChange={handleInputChange}
              rows={6}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 resize-none text-base font-sans transition-all duration-200"
              placeholder="Unsure what to fill in? Ask me, I can explain and fill in for you."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetQuote2;
