import React, { useState } from 'react';
import { Upload, Search, Check, Info, Maximize2, BookOpen, MessageSquare, ChevronDown, ChevronUp } from 'lucide-react';
import { UNIT_SYSTEMS, getFieldConfig, formatConversion } from '../utils/unitConversions';

const GetProjectQuote = () => {
  const [unitSystem, setUnitSystem] = useState(UNIT_SYSTEMS.METRIC);
  const [showUnitTooltip, setShowUnitTooltip] = useState(false);
  const [isMobileAIExpanded, setIsMobileAIExpanded] = useState(false);
  const [formData, setFormData] = useState({
    facadePanelMaterial: '',
    claddingThickness: '',
    brand: '',
    layoutIndex: 0,
    panel1Height: '',
    panel1Length: '',
    panel2Height: '',
    panel2Length: '',
    projectLocation: '',
    floorToFloorDistance: '',
    wallToPanelDistance: '',
    insulationThickness: '',
    wallType: '',
    bracketMaterialType: '',
    totalBuildingHeight: '',
    totalFacadeArea: '',
    claddingEngineering: false,
    facadeDesignEngineering: false,
    shopDrawings: false,
    structuralCalculations: false,
    thermalAnalysis: false,
    projectName: '',
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    aiQuestion: ''
  });

  const [searchBrand, setSearchBrand] = useState('');

  const facadeMaterials = [
    'Ceramic/ Porcelain/ Terracotta',
    'Fiber-cement',
    'Glass Reinforced Concrete (GRC / GFRC)',
    'High-Pressure Laminate (HPL)',
    'Natural Stone (e.g., Granite, Limestone, Marble)',
    'Extruded Aluminum Panel',
    'Perforated Metal / Expanded Mesh Panels',
    'Aluminum Composite Panel (ACP / ACM)'
  ];

  const brands = [
    'Q-VENT Premium',
    'Q-VENT Standard',
    'Q-VENT Eco',
    'Q-VENT Fire-Rated',
    'Q-VENT Acoustic'
  ];

  const layouts = [
    { name: 'Vertical, Op1', image: '/assets/Vertical, Op1.png', description: 'Standard vertical layout option 1' },
    { name: 'Vertical, Op2', image: '/assets/Vertical, Op 2.png', description: 'Standard vertical layout option 2' },
    { name: 'Vertical, Op3', image: '/assets/Vertical, Op 3.png', description: 'Standard vertical layout option 3' }
  ];

  const projectLocations = [
    'Europe (exterior region): 2.25 kN/m²',
    'Europe (coastal region): 3.0 kN/m²',
    'Mediterranean: 2.25 kN/m²',
    'Northern Europe: 3.75 kN/m²',
    'Mountain regions: 4.5 kN/m²',
    'Tropical zones: 3.0-4.5 kN/m²',
    'Other, average: 2.25 kN/m²'
  ];

  const wallTypes = [
    'Concrete',
    'Masonry (CMU)',
    'Stud wall'
  ];

  const bracketTypes = [
    'Aluminum',
    'Stainless Steel'
  ];

  const engineeringServices = [
    { key: 'claddingEngineering', label: 'Cladding engineering (early phrase consultation)' },
    { key: 'facadeDesignEngineering', label: 'Facade design and engineering' },
    { key: 'shopDrawings', label: 'Shop Drawings' },
    { key: 'structuralCalculations', label: 'Structural calculations' },
    { key: 'thermalAnalysis', label: 'Thermal analysis' }
  ];

  const filteredBrands = brands.filter(brand =>
    brand.toLowerCase().includes(searchBrand.toLowerCase())
  );

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleUnitSystemChange = (newSystem) => {
    setUnitSystem(newSystem);
  };

  const renderFieldWithConversion = (fieldName, inputProps, showConversion = true) => {
    const config = getFieldConfig(fieldName, unitSystem);
    const currentValue = formData[fieldName];
    
    const getOppositeUnit = (currentUnit) => {
      if (currentUnit === 'mm') return 'in';
      if (currentUnit === 'in') return 'mm';
      if (currentUnit === 'm') return 'ft';
      if (currentUnit === 'ft') return 'm';
      if (currentUnit === 'sqm') return 'sqft';
      if (currentUnit === 'sqft') return 'sqm';
      return '';
    };

    const oppositeUnit = getOppositeUnit(config.unit);
    const conversionText = showConversion && currentValue ? 
      formatConversion(currentValue, config.unit, oppositeUnit) : '';

    return (
      <div>
        <div className="relative">
          <input
            {...inputProps}
            className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 text-base font-sans transition-all duration-200"
            placeholder=""
          />
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm font-medium text-gray-500">
            {config.unit}
          </span>
        </div>
        {showConversion && conversionText && (
          <div className="mt-1 text-xs font-light text-gray-400 font-sans">
            {conversionText}
          </div>
        )}
      </div>
    );
  };

  const UnitSelector = () => (
    <div className="flex items-center gap-3">
      <div className="flex items-center bg-gray-100 rounded-lg p-1">
        <button
          type="button"
          onClick={() => handleUnitSystemChange(UNIT_SYSTEMS.METRIC)}
          className={`px-3 py-2 text-xs font-medium rounded-md transition-all duration-200 ${
            unitSystem === UNIT_SYSTEMS.METRIC
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          mm / m
        </button>
        <button
          type="button"
          onClick={() => handleUnitSystemChange(UNIT_SYSTEMS.IMPERIAL)}
          className={`px-3 py-2 text-xs font-medium rounded-md transition-all duration-200 ${
            unitSystem === UNIT_SYSTEMS.IMPERIAL
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          in / ft
        </button>
      </div>
      <div className="relative">
        <button
          type="button"
          onMouseEnter={() => setShowUnitTooltip(true)}
          onMouseLeave={() => setShowUnitTooltip(false)}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <Info className="w-4 h-4" />
        </button>
        {showUnitTooltip && (
          <div className="absolute left-0 top-6 bg-gray-800 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap z-10 font-sans shadow-lg">
            Controls measurement units for all form inputs
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Page Header */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3 font-sans">Get a Project Quote</h2>
            <p className="text-base text-gray-600 font-sans">Fill out the form below. Ask the AI for help or details at any step.</p>
          </div>

          {/* Mobile AI Assistant - Above Form */}
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
            {/* Cladding Panel Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-5">
              <div className="flex items-center justify-between mb-5 pb-2 border-b border-gray-100">
                <h2 className="text-lg font-medium text-gray-900 font-sans">
                  Cladding Panel
                </h2>
                <UnitSelector />
              </div>
              <div className="space-y-4">
                {/* Cladding panel material */}
                <div>
                  <label className="block text-sm font-normal text-gray-700 mb-2 font-sans">
                    Material
                  </label>
                  <select
                    name="facadePanelMaterial"
                    value={formData.facadePanelMaterial}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 text-base font-sans transition-all duration-200"
                  >
                    <option value="">Select material</option>
                    {facadeMaterials.map((material, index) => (
                      <option key={index} value={material}>{material}</option>
                    ))}
                  </select>
                </div>

                {/* Cladding thickness */}
                <div>
                  <label className="block text-sm font-normal text-gray-700 mb-2 font-sans">
                    Thickness
                  </label>
                  {renderFieldWithConversion('claddingThickness', {
                    type: 'text',
                    name: 'claddingThickness',
                    value: formData.claddingThickness,
                    onChange: handleInputChange
                  })}
                </div>

                {/* Brand */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <label className="text-sm font-normal text-gray-700 font-sans">
                      Brand
                    </label>
                    <span className="text-xs font-light text-gray-500 font-sans">Optional</span>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      value={searchBrand}
                      onChange={(e) => setSearchBrand(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 text-base font-sans transition-all duration-200"
                      placeholder="Search or select brand..."
                    />
                    <Search className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                    {searchBrand && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-40 overflow-y-auto">
                        {filteredBrands.map((brand, index) => (
                          <div
                            key={index}
                            className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-base font-sans transition-colors"
                            onClick={() => {
                              setFormData(prev => ({ ...prev, brand }));
                              setSearchBrand('');
                            }}
                          >
                            {brand}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  {formData.brand && (
                    <div className="mt-2 text-sm text-gray-600 font-sans">
                      Selected: {formData.brand}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Facade Layout Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-5">
              <div className="flex items-center justify-between mb-5 pb-2 border-b border-gray-100">
                <h2 className="text-lg font-medium text-gray-900 font-sans">
                  Facade Layout
                </h2>
                <span className="text-sm font-medium text-gray-500 font-sans">
                  Selected: {layouts[formData.layoutIndex].name}
                </span>
              </div>
              <div className="space-y-6">
                {/* Layout Selection with Multiple Layouts */}
                <div>
                  <div className="overflow-x-auto">
                    <div className="flex gap-3 pb-4">
                      {layouts.map((layout, index) => (
                        <div
                          key={index}
                          className={`relative cursor-pointer transition-all duration-200 hover:scale-105 flex-shrink-0 ${
                            index === formData.layoutIndex ? 'ring-2 ring-gray-600' : ''
                          }`}
                          onClick={() => setFormData(prev => ({ ...prev, layoutIndex: index }))}
                        >
                          <div className="bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow overflow-hidden w-48 sm:w-56">
                            <div className="relative bg-gray-50 h-40 flex items-center justify-center">
                              <img
                                src={layout.image}
                                alt={layout.name}
                                className="max-w-full max-h-full object-contain"
                                loading="lazy"
                              />
                              <div className="absolute top-3 right-3 flex gap-2">
                                <button
                                  type="button"
                                  className="p-2 bg-white/90 hover:bg-white rounded-lg shadow-sm border border-gray-200/50 transition-all duration-200"
                                  title="Enlarge image"
                                >
                                  <Maximize2 className="w-4 h-4 text-gray-600" />
                                </button>
                                <button
                                  type="button"
                                  className="p-2 bg-white/90 hover:bg-white rounded-lg shadow-sm border border-gray-200/50 transition-all duration-200"
                                  title="View specifications"
                                >
                                  <BookOpen className="w-4 h-4 text-gray-600" />
                                </button>
                              </div>
                            </div>
                            <div className="p-3">
                              <div className="text-sm font-medium text-gray-700 text-center flex items-center justify-center gap-2 font-sans">
                                {index === formData.layoutIndex && (
                                  <div className="bg-gray-600 text-white rounded-full p-1">
                                    <Check className="w-3 h-3" />
                                  </div>
                                )}
                                {layout.name}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Slider/Progress indicator */}
                  <div className="flex justify-center items-center gap-2 mt-4">
                    {layouts.map((_, index) => (
                      <div
                        key={index}
                        className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-200 ${
                          index === formData.layoutIndex ? 'bg-gray-600' : 'bg-gray-300 hover:bg-gray-400'
                        }`}
                        onClick={() => setFormData(prev => ({ ...prev, layoutIndex: index }))}
                      />
                    ))}
                  </div>
                </div>

                {/* Panel Dimensions - Compact with Color Indicators */}
                <div className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Panel Dimensions Card 1 */}
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                        <h4 className="text-sm font-medium text-gray-800 font-sans">Panel Dimensions</h4>
                      </div>
                      <div className="space-y-3">
                        <div>
                          {renderFieldWithConversion('panel1Height', {
                            type: 'text',
                            name: 'panel1Height',
                            value: formData.panel1Height,
                            onChange: handleInputChange
                          }, false)}
                        </div>
                        <div>
                          {renderFieldWithConversion('panel1Length', {
                            type: 'text',
                            name: 'panel1Length',
                            value: formData.panel1Length,
                            onChange: handleInputChange
                          }, false)}
                        </div>
                      </div>
                    </div>

                    {/* Panel Dimensions Card 2 */}
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-3 h-3 rounded-full bg-red-700"></div>
                        <h4 className="text-sm font-medium text-gray-800 font-sans">Panel Dimensions</h4>
                      </div>
                      <div className="space-y-3">
                        <div>
                          {renderFieldWithConversion('panel2Height', {
                            type: 'text',
                            name: 'panel2Height',
                            value: formData.panel2Height,
                            onChange: handleInputChange
                          }, false)}
                        </div>
                        <div>
                          {renderFieldWithConversion('panel2Length', {
                            type: 'text',
                            name: 'panel2Length',
                            value: formData.panel2Length,
                            onChange: handleInputChange
                          }, false)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* System Composition Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
              <h2 className="text-lg font-medium text-gray-900 mb-5 pb-2 border-b border-gray-100 font-sans">
                System Composition
              </h2>
              <div className="space-y-4">
                {/* Project location */}
                <div>
                  <label className="block text-sm font-normal text-gray-700 mb-2 font-sans">
                    Wind Load
                  </label>
                  <select
                    name="projectLocation"
                    value={formData.projectLocation}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 text-base font-sans transition-all duration-200"
                  >
                    <option value="">Select location type</option>
                    {projectLocations.map((location, index) => (
                      <option key={index} value={location}>{location}</option>
                    ))}
                  </select>
                </div>

                {/* Floor to floor distance */}
                <div>
                  <label className="block text-sm font-normal text-gray-700 mb-2 font-sans">
                    Floor-to-Floor Distance
                  </label>
                  {renderFieldWithConversion('floorToFloorDistance', {
                    type: 'text',
                    name: 'floorToFloorDistance',
                    value: formData.floorToFloorDistance,
                    onChange: handleInputChange
                  })}
                </div>

                {/* Wall to panel distance */}
                <div>
                  <label className="block text-sm font-normal text-gray-700 mb-2 font-sans">
                    Wall-to-Panel Distance
                  </label>
                  {renderFieldWithConversion('wallToPanelDistance', {
                    type: 'text',
                    name: 'wallToPanelDistance',
                    value: formData.wallToPanelDistance,
                    onChange: handleInputChange
                  })}
                </div>

                {/* Insulation Thickness */}
                <div>
                  <label className="block text-sm font-normal text-gray-700 mb-2 font-sans">
                    Insulation Thickness
                  </label>
                  {renderFieldWithConversion('insulationThickness', {
                    type: 'text',
                    name: 'insulationThickness',
                    value: formData.insulationThickness,
                    onChange: handleInputChange
                  })}
                </div>

                {/* Wall Type */}
                <div>
                  <label className="block text-sm font-normal text-gray-700 mb-2 font-sans">
                    Wall Type
                  </label>
                  <select
                    name="wallType"
                    value={formData.wallType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 text-base font-sans transition-all duration-200"
                  >
                    <option value="">Select wall type</option>
                    {wallTypes.map((type, index) => (
                      <option key={index} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                {/* Bracket material type */}
                <div>
                  <label className="block text-sm font-normal text-gray-700 mb-2 font-sans">
                    Wall Bracket type
                  </label>
                  <select
                    name="bracketMaterialType"
                    value={formData.bracketMaterialType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 text-base font-sans transition-all duration-200"
                  >
                    <option value="">Select bracket material</option>
                    {bracketTypes.map((type, index) => (
                      <option key={index} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* General Project Info Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
              <h2 className="text-lg font-medium text-gray-900 mb-5 pb-2 border-b border-gray-100 font-sans">
                General Project Info
              </h2>
              <div className="space-y-4">
                {/* Project name */}
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
                    placeholder=""
                  />
                </div>

                {/* Total building height */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <label className="text-sm font-normal text-gray-700 font-sans">
                      Total Building Height
                    </label>
                    <span className="text-xs font-light text-gray-500 font-sans">Optional</span>
                  </div>
                  {renderFieldWithConversion('totalBuildingHeight', {
                    type: 'text',
                    name: 'totalBuildingHeight',
                    value: formData.totalBuildingHeight,
                    onChange: handleInputChange
                  })}
                </div>

                {/* Total façade area */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <label className="text-sm font-normal text-gray-700 font-sans">
                      Total Façade Area
                    </label>
                    <span className="text-xs font-light text-gray-500 font-sans">Optional</span>
                  </div>
                  {renderFieldWithConversion('totalFacadeArea', {
                    type: 'text',
                    name: 'totalFacadeArea',
                    value: formData.totalFacadeArea,
                    onChange: handleInputChange
                  })}
                </div>

                {/* Engineering services */}
                <div>
                  <label className="block text-sm font-normal text-gray-700 mb-3 font-sans">
                    Would you need engineering services?
                  </label>
                  <div className="space-y-2">
                    {engineeringServices.map((service, index) => (
                      <label key={index} className="flex items-start gap-3 group cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
                        <input
                          type="checkbox"
                          name={service.key}
                          checked={formData[service.key]}
                          onChange={handleInputChange}
                          className="w-4 h-4 rounded border-gray-300 text-gray-600 focus:ring-gray-400 focus:ring-2 mt-0.5"
                        />
                        <span className="text-sm font-normal text-gray-700 leading-relaxed group-hover:text-gray-900 transition-colors">
                          {service.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
              <h2 className="text-lg font-medium text-gray-900 mb-5 pb-2 border-b border-gray-100 font-sans">
                Contact Information
              </h2>
              <div className="space-y-3">
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 text-base font-sans transition-all duration-200"
                  placeholder="Company name"
                />
                <input
                  type="text"
                  name="contactName"
                  value={formData.contactName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 text-base font-sans transition-all duration-200"
                  placeholder="Name"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 text-base font-sans transition-all duration-200"
                  placeholder="Email"
                />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 text-base font-sans transition-all duration-200"
                  placeholder="Phone number"
                />
              </div>
            </div>

            {/* File Upload Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
              <h2 className="text-lg font-medium text-gray-900 mb-5 pb-2 border-b border-gray-100 font-sans">
                Project Files
              </h2>
              <div className="space-y-2">
                <p className="text-xs font-light text-gray-500 font-sans">
                  Optional: Upload architectural drawings, panel layouts etc.
                </p>
                
                <label htmlFor="file-upload" className="block cursor-pointer">
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
                    accept=".pdf,.dwg,.jpg,.jpeg,.png"
                    className="hidden"
                    id="file-upload"
                  />
                </label>
                
                <p className="text-xs font-light text-gray-500 font-sans">
                  Supported formats: PDF, DWG, JPG • Max size: 10MB per file
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 text-center">
              <button
                type="submit"
                className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 font-medium text-base font-sans transition-all duration-200"
              >
                Get Quote
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

export default GetProjectQuote; 