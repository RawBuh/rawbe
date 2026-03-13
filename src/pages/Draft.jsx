import React, { useState } from 'react';
import { Upload, MessageSquare, X, Eye, Info } from 'lucide-react';

const Draft = () => {
  const [isAIPanelOpen, setIsAIPanelOpen] = useState(false);
  const [previewItem, setPreviewItem] = useState(null);
  const [formData, setFormData] = useState({
    // Project Info
    projectRefNo: '',
    projectName: '',
    siteAddress: '',
    postcode: '',
    contactPerson: '',
    contactEmail: '',
    city: '',
    country: '',
    totalFacadeArea: '',
    startDate: '',
    
    // Building Parameters
    buildingHeight: '',
    storyHeight: '',
    cavityDepthMin: '',
    cavityDepthMax: '',
    cavityOrInsulation: 'cavity',
    insulationThicknessMode: false,
    topHat: 'no',
    topHatDepth: '',
    insulationThickness: '',
    insulationThickness2: '',
    
    // Wind Load
    windLoadTypical: '',
    windLoadCorner: '',
    windLoadFunneling: '',
    applySafetyFactor: 'no',
    windLoadByAddress: false,
    windLoadSiteAddress: '',
    windLoadPostcode: '',
    
    // Cladding Type
    claddingType: '',
    claddingBrand: '',
    claddingThickness: '',
    claddingDensity: '',
    materialDensity: false,
    panelDimensionB: '',
    panelDimensionH: '',
    claddingWeight: '',
    
    // QV Systems
    qvSystem: '',
    qvVariant: '',
    
    // Vertical Profile
    verticalProfileType: '',
    verticalProfileSize: '',
    verticalProfileLengthMax: '',
    verticalProfileLength2: '',
    verticalProfileLength3: '',
    tProfileSize: '',
    tProfileLength1: '',
    tProfileLength2: '',
    tProfileLength3: '',
    lProfileSize: '',
    lProfileLength1: '',
    lProfileLength2: '',
    lProfileLength3: '',
    horizontalSpacing: '600',
    deflectionRatio: '200',
    cantileverDeflRatio: '150',
    
    // Wall Bracket
    wallBracket: '',
    wallBracketSize: '',
    
    // Installation (formerly Substrate)
    substrateType: '',
    layoutOutlook: '',
    panelOrientation: '',
    studThickness: '',
    studMaterial: '',
    steelWorkThickness: '3',
    steelWorkMaterial: '',
    concreteGrade: 'C20/25',
    topHatChannelThickness: '',
    topHatChannelMaterial: '',
    
    // AI Question
    aiQuestion: '',
    termsAccepted: false
  });

  const claddingTypes = [
    'AGROB BUCHTAL KeraTwin K20',
    'Terracotta',
    'Ceramic',
    'Aluminum',
    'Glass',
    'Fiber cement',
    'Fiber concrete',
    'HPL',
    'Stone',
    'ACM 4 mm',
    'Brick slip'
  ];

  // QV Systems (parent) with their variants (sub-systems)
  const qvSystemsWithVariants = [
    { id: 'QV1', description: 'Exposed Mechanical Fastening', variants: [
      { id: 'QV1.1', description: 'Exposed Mechanical Fastening', embedUrl: 'https://sketchfab.com/models/5fc61e27e8c540d7b9a99c01fccc08dc/embed' },
      { id: 'QV1.2', description: 'Exposed Mechanical Fastening for Stud Wall', embedUrl: 'https://sketchfab.com/models/5d2c6cb61b634346a90f410e724da93b/embed' }
    ]},
    { id: 'QV2', description: 'Concealed Adhesive Fastening', variants: [], embedUrl: 'https://sketchfab.com/models/52660666d1db4d7abd60081e08ab5314/embed' },
    { id: 'QV3', description: 'KeraTwin K20 Panels', variants: [
      { id: 'QV3.1', description: 'Horizontal KeraTwin K20 Panels with T Rails', embedUrl: 'https://sketchfab.com/models/f821f622761249c1ad5b3b35869cbb92/embed' },
      { id: 'QV3.2', description: 'Horizontal KeraTwin K20 Panels with Omega Rails for Stud Wall', embedUrl: 'https://sketchfab.com/models/8cfae5a518654b698a77be084372c7e0/embed' },
      { id: 'QV3.3', description: 'Vertical KeraTwin K20 Panels with Omega-S Rails', embedUrl: 'https://sketchfab.com/models/721705f3f456462faf0e6d172f9c7fb0/embed' },
      { id: 'QV3.4', description: 'Vertical KeraTwin K20 panels with clamps' }
    ]},
    { id: 'QV6', description: 'Concealed Undercut Fastening', variants: [
      { id: 'QV6.2', description: 'Concealed Undercut Fastening' },
      { id: 'QV6.3', description: 'Concealed Undercut Fastening', embedUrl: 'https://sketchfab.com/models/6ca1e487c2c641668b04fabdf0c278cc/embed' },
      { id: 'QV6.4', description: 'Concealed Undercut Fastening' }
    ]},
    { id: 'Q-CLOUD', description: 'Concealed Adhesive Glass Panels Fastening', variants: [], embedUrl: 'https://sketchfab.com/models/e5b2d10584104b5fa764b765c5977b0d/embed' },
    { id: 'QV7', description: 'Terracotta Panels', embedUrl: 'https://sketchfab.com/models/c189665bdcd644f9a090e5782baf4532/embed', variants: [
      { id: 'QV7.1', description: 'Horizontal Terracotta Panels with Clips and T Rails' },
      { id: 'QV7.2', description: 'Horizontal Terracotta Panels with Clips and HAT Rails for Stud Wall' },
      { id: 'QV7.3', description: 'Vertical Terracotta Panels with Clips and Horizontal Rails' },
      { id: 'QV7.4', description: 'Horizontal Terracotta Panels with Clips and Horizontal Rails' },
      { id: 'QV7.5', description: 'Vertical Terracotta Panels with Clips and Bottom-Support Rails' }
    ]},
    { id: 'QV9', description: 'Metal panels', variants: [
      { id: 'QV9.3', description: 'Formed Metal Panels with Hangers', embedUrl: 'https://sketchfab.com/models/5564e7cd7405451e988b3454d3ce9cec/embed' },
      { id: 'QV9.5', description: 'Extruded Aluminium Panels', embedUrl: 'https://sketchfab.com/models/5cd9b5719d6b40bcab2d1805cc05beb2/embed' }
    ]}
  ];

  // Cladding type → allowed QV systems (empty = all systems)
  const claddingToQvSystems = {
    'AGROB BUCHTAL KeraTwin K20': ['QV3'],
    'Terracotta': ['QV7'],
    'Aluminum': ['QV9'],
    'Glass': ['Q-CLOUD'],
    'Ceramic': ['QV1', 'QV2', 'QV6'],
    'Fiber cement': ['QV1', 'QV2', 'QV6'],
    'Fiber concrete': ['QV1', 'QV2', 'QV6'],
    'HPL': ['QV1', 'QV2', 'QV6'],
    'ACM 4 mm': ['QV1', 'QV2'],
    'Stone': ['QV1', 'QV2', 'QV6']
  };

  const availableQvSystems = (() => {
    const allowed = claddingToQvSystems[formData.claddingType];
    if (allowed) return qvSystemsWithVariants.filter(s => allowed.includes(s.id));
    return qvSystemsWithVariants;
  })();

  const selectedSystemData = qvSystemsWithVariants.find(s => s.id === formData.qvSystem);
  // Една логика за всички системи: под системата се листват варианти. QV3 и QV7 – филтриране по panel orientation
  const currentVariants = (() => {
    const variants = selectedSystemData?.variants || [];
    const isKeraTwin = formData.qvSystem === 'QV3' && formData.claddingType === 'AGROB BUCHTAL KeraTwin K20';
    const isTerracotta = formData.qvSystem === 'QV7' && formData.claddingType === 'Terracotta';
    if (isKeraTwin) {
      if (formData.panelOrientation === 'vertical') return variants.filter(v => ['QV3.3', 'QV3.4'].includes(v.id));
      if (formData.panelOrientation === 'horizontal') return variants.filter(v => ['QV3.1', 'QV3.2'].includes(v.id));
      return variants;
    }
    if (isTerracotta) {
      const d = (v) => (v.description || '').toLowerCase();
      if (formData.panelOrientation === 'vertical') return variants.filter(v => d(v).startsWith('vertical'));
      if (formData.panelOrientation === 'horizontal') return variants.filter(v => d(v).startsWith('horizontal'));
      return variants;
    }
    return variants;
  })();

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

  const qvbBracketSizes = [50, 75, 100, 125, 150, 175, 200, 225, 250, 275, 300]; // числа за изчисления, показват се като L-XX
  const qtbBracketSizes = [85, 100, 125, 150, 175, 200, 225, 250, 275, 300]; // числа за изчисления, показват се като L-XX
  const wallBracketSizes = formData.wallBracket === 'QTB' ? qtbBracketSizes : qvbBracketSizes;

  const substrateTypes = [
    'Stud',
    'Steel work',
    'Concrete',
    'Masonry',
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

      // When Story Height is set, mirror it into T and L profile length 1
      if (name === 'storyHeight') {
        next.verticalProfileLengthMax = value;
        next.tProfileLength1 = value;
        next.lProfileLength1 = value;
      }

      // Link between Cladding Type and QV System
      if (name === 'claddingType') {
        const allowed = claddingToQvSystems[value];
        if (value === 'AGROB BUCHTAL KeraTwin K20') {
          next.qvSystem = 'QV3';
          next.qvVariant = '';
        } else if (value === 'Terracotta') {
          next.qvSystem = 'QV7';
          next.qvVariant = '';
        } else if (value === 'Aluminum') {
          next.qvSystem = 'QV9';
          next.qvVariant = '';
        } else if (value === 'Glass') {
          next.qvSystem = 'Q-CLOUD';
          next.qvVariant = '';
        } else if (allowed && !allowed.includes(next.qvSystem)) {
          // Mapped cladding (e.g. Ceramic, HPL) – clear if current selection not in allowed list
          next.qvSystem = '';
          next.qvVariant = '';
        } else if (!allowed) {
          next.qvSystem = '';
          next.qvVariant = '';
        }
      }

      // When qvSystem changes, clear qvVariant
      if (name === 'qvSystem') {
        next.qvVariant = '';
      }

      // When panel orientation changes for QV3/QV7, clear qvVariant if no longer valid
      if (name === 'panelOrientation') {
        const variants = qvSystemsWithVariants.find(s => s.id === next.qvSystem)?.variants || [];
        let allowedIds = [];
        if (next.qvSystem === 'QV3' && next.claddingType === 'AGROB BUCHTAL KeraTwin K20') {
          allowedIds = value === 'vertical' ? ['QV3.3', 'QV3.4'] : value === 'horizontal' ? ['QV3.1', 'QV3.2'] : ['QV3.1', 'QV3.2', 'QV3.3', 'QV3.4'];
        } else if (next.qvSystem === 'QV7' && next.claddingType === 'Terracotta') {
          const d = (v) => (v.description || '').toLowerCase();
          allowedIds = value === 'vertical'
            ? variants.filter(v => d(v).startsWith('vertical')).map(v => v.id)
            : value === 'horizontal'
              ? variants.filter(v => d(v).startsWith('horizontal')).map(v => v.id)
              : variants.map(v => v.id);
        }
        if (allowedIds.length > 0 && next.qvVariant && !allowedIds.includes(next.qvVariant)) {
          next.qvVariant = '';
        }
      }

      // Sync cavityOrInsulation and insulationThicknessMode (for Building section)
      if (name === 'insulationThicknessMode') {
        next.cavityOrInsulation = checked ? 'insulation' : 'cavity';
      }
      if (name === 'cavityOrInsulation') {
        next.insulationThicknessMode = value === 'insulation';
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
        value={formData[name] ?? ''}
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

  const PROFILE_LENGTH_MIN = 500;
  const PROFILE_LENGTH_MAX = 6000;
  const isProfileLengthInvalid = (val) => val !== '' && (isNaN(parseFloat(val)) || parseFloat(val) < PROFILE_LENGTH_MIN || parseFloat(val) > PROFILE_LENGTH_MAX);

  const INSULATION_THICKNESS_MIN = 0;
  const INSULATION_THICKNESS_MAX = 300;
  const isInsulationThicknessInvalid = (val) => val !== '' && (isNaN(parseFloat(val)) || parseFloat(val) < INSULATION_THICKNESS_MIN || parseFloat(val) > INSULATION_THICKNESS_MAX);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-8">
        {/* Left: Main form content */}
        <div className="flex-1 min-w-0 space-y-8">
          {/* Page Header */}
          <div className="mb-8 lg:mb-0">
            <div className="mb-3">
              <h2 className="text-2xl font-semibold text-gray-900 font-sans">Project Navigator</h2>
              <p className="text-sm text-gray-600 font-sans mt-1">System selection, early-stage bracket spacing calculations & cost estimation</p>
            </div>
          </div>
            {/* Layer 1: Cladding */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-5">
                <h3 className="text-lg font-medium text-gray-900 mb-5 pb-2 border-b border-gray-100 font-sans">
                  Cladding
                </h3>
                <div className="space-y-4">
                <div>
                  <label className="block text-sm font-normal text-gray-700 mb-2 font-sans">
                    Type <span className="text-red-500">*</span>
                  </label>
                  <div className="flex flex-wrap gap-4">
                    {claddingTypes.map((type, index) => (
                      <label key={type} className="flex items-center gap-2 cursor-pointer text-sm text-gray-700 font-sans">
                        <input
                          type="radio"
                          name="claddingType"
                          value={type}
                          checked={formData.claddingType === type}
                          onChange={handleInputChange}
                          required={index === 0}
                          className="w-4 h-4 text-gray-600 border-gray-300 focus:ring-gray-400"
                        />
                        <span>{type}</span>
                      </label>
                    ))}
                  </div>
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

                {(formData.claddingType === 'AGROB BUCHTAL KeraTwin K20' || formData.claddingType === 'Terracotta') && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-normal text-gray-700 mb-2 font-sans">
                        Panel Orientation
                      </label>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="panelOrientation"
                            value="horizontal"
                            checked={formData.panelOrientation === 'horizontal'}
                            onChange={handleInputChange}
                            className="w-4 h-4 text-gray-600 border-gray-300 focus:ring-gray-400"
                          />
                          <span className="text-sm text-gray-700">Horizontal</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="panelOrientation"
                            value="vertical"
                            checked={formData.panelOrientation === 'vertical'}
                            onChange={handleInputChange}
                            className="w-4 h-4 text-gray-600 border-gray-300 focus:ring-gray-400"
                          />
                          <span className="text-sm text-gray-700">Vertical</span>
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {formData.claddingType !== 'AGROB BUCHTAL KeraTwin K20' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-normal text-gray-700 mb-2 font-sans">Weight</label>
                    {renderInputWithUnit('claddingWeight', 'kg/sq.m')}
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-sm text-gray-500 font-medium">or</span>
                    <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700 font-sans">
                      <input
                        type="checkbox"
                        name="materialDensity"
                        checked={formData.materialDensity}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-gray-600 border-gray-300 rounded focus:ring-gray-400"
                      />
                      <span>Material Density</span>
                    </label>
                  </div>
                  {formData.materialDensity && (
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label className="block text-sm font-normal text-gray-700 mb-2 font-sans">Thickness</label>
                        {renderInputWithUnit('claddingThickness', 'mm')}
                      </div>
                      <div>
                        <label className="block text-sm font-normal text-gray-700 mb-2 font-sans">Density</label>
                        {renderInputWithUnit('claddingDensity', 'kg/m³')}
                      </div>
                    </div>
                  )}
                </div>
                )}
                </div>
              </div>

            {/* Your Configuration – mobile only (desktop: in right sidebar) */}
            <div className="lg:hidden bg-red-50 border border-red-200 rounded-xl p-4 sm:p-5">
              <h3 className="text-lg font-medium text-gray-900 font-sans mb-4">Your Configuration</h3>
              {/* Systems (top) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {availableQvSystems.map((system) => {
                  const isActive = formData.qvSystem === system.id;
                  return (
                    <label
                      key={system.id}
                      className={`flex flex-col items-center justify-center gap-1 p-4 rounded-lg border-2 transition-all duration-200 text-center ${
                        isActive ? 'bg-red-600 border-red-600 text-white cursor-pointer' : 'bg-white border-gray-200 text-gray-900 hover:bg-gray-50 cursor-pointer'
                      }`}
                    >
                      <input type="radio" name="qvSystem" value={system.id} checked={formData.qvSystem === system.id} onChange={handleInputChange} className="sr-only" />
                      <span className="text-sm font-medium">{system.id}</span>
                      <span className={`text-xs font-normal ${isActive ? 'text-white/90' : 'text-gray-600'}`}>{system.description}</span>
                    </label>
                  );
                })}
              </div>
              {/* Variants (below) */}
              {formData.qvSystem && currentVariants.length > 0 && (
                <div className="mt-4 border-t border-red-200 pt-4">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h4 className="text-sm font-medium text-gray-800 font-sans">Variants</h4>
                    {selectedSystemData?.embedUrl && (
                      <button
                        type="button"
                        onClick={() => setPreviewItem(selectedSystemData)}
                        className="shrink-0 p-1.5 rounded-md hover:bg-gray-100 text-gray-600 flex items-center gap-1"
                        title="Preview 3D"
                        aria-label="Preview 3D"
                      >
                        <Eye className="w-4 h-4" />
                        <span className="text-xs">Preview</span>
                      </button>
                    )}
                  </div>
                  <div className="space-y-2">
                    {currentVariants.map((variant) => {
                      const isVariantActive = formData.qvVariant === variant.id;
                      return (
                        <label
                          key={variant.id}
                          className={`flex items-start justify-between gap-2 p-2.5 rounded-lg border-2 transition-all duration-200 w-full cursor-pointer ${
                            isVariantActive ? 'bg-red-600 border-red-600 text-white' : 'bg-white border-gray-200 text-gray-900 hover:bg-gray-50'
                          }`}
                        >
                          <div className="flex-1 min-w-0">
                            <input type="radio" name="qvVariant" value={variant.id} checked={formData.qvVariant === variant.id} onChange={handleInputChange} className="sr-only" />
                            <span className="text-sm font-medium block">{variant.id}</span>
                            <span className={`text-xs font-normal ${isVariantActive ? 'text-white/90' : 'text-gray-600'}`}>{variant.description}</span>
                          </div>
                          {variant.embedUrl && (
                            <button
                              type="button"
                              onClick={(e) => { e.preventDefault(); e.stopPropagation(); setPreviewItem(variant); }}
                              className={`shrink-0 p-1.5 rounded-md transition-colors ${isVariantActive ? 'hover:bg-red-500 text-white' : 'hover:bg-gray-100 text-gray-600'}`}
                              title="Preview 3D"
                              aria-label="Preview 3D"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                          )}
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}
              {formData.qvSystem && currentVariants.length === 0 && selectedSystemData && (
                <div className="mt-4 border-t border-red-200 pt-4">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs text-gray-600 font-sans">{selectedSystemData.id} – {selectedSystemData.description}</p>
                    {selectedSystemData.embedUrl && (
                      <button
                        type="button"
                        onClick={() => setPreviewItem(selectedSystemData)}
                        className="shrink-0 p-1.5 rounded-md hover:bg-gray-100 text-gray-600"
                        title="Preview 3D"
                        aria-label="Preview 3D"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              )}
              <div className="mt-4 pt-4 border-t border-red-200 space-y-3">
                <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700 font-sans">
                  <input
                    type="checkbox"
                    name="termsAccepted"
                    checked={formData.termsAccepted}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-gray-600 border-gray-300 rounded focus:ring-gray-400"
                  />
                  <span>Terms and Conditions accepted</span>
                </label>
                <button
                  type="submit"
                  disabled={!formData.termsAccepted}
                  className="w-full px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 font-medium text-base font-sans transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Get quote
                </button>
              </div>
            </div>

            {/* Building */}
            <div className="mt-4">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-5">
                <h3 className="text-lg font-medium text-gray-900 mb-5 pb-2 border-b border-gray-100 font-sans">
                  Building
                </h3>
                <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-normal text-gray-700 mb-2 font-sans">
                      Building Height <span className="text-red-500">*</span>
                    </label>
                    {renderInputWithUnit('buildingHeight', 'm', '', true)}
                  </div>
                  <div>
                    <label className="block text-sm font-normal text-gray-700 mb-2 font-sans">
                      Story Height <span className="text-red-500">*</span>
                    </label>
                    {renderInputWithUnit('storyHeight', 'm', '', true)}
                  </div>
                </div>

                {/* Substrate Type */}
                <div>
                  <label className="block text-sm font-normal text-gray-700 mb-2 font-sans">
                    Substrate Type <span className="text-red-500">*</span>
                  </label>
                  <div className="flex flex-wrap gap-4">
                    {substrateTypes.map((type, index) => (
                      <label key={type} className="flex items-center gap-2 cursor-pointer text-sm text-gray-700 font-sans">
                        <input
                          type="radio"
                          name="substrateType"
                          value={type}
                          checked={formData.substrateType === type}
                          onChange={handleInputChange}
                          required={index === 0}
                          className="w-4 h-4 text-gray-600 border-gray-300 focus:ring-gray-400"
                        />
                        <span>{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Substrate-specific fields – веднага под Substrate Type */}
                {(formData.substrateType === 'Stud' || formData.substrateType === 'Steel work' || formData.substrateType === 'Concrete') && (
                <div className="mt-4">
                  {formData.substrateType === 'Stud' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-normal text-gray-700 mb-2 font-sans">Thickness <span className="text-red-500">*</span></label>
                          <select name="studThickness" value={formData.studThickness} onChange={handleInputChange} required className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 text-base font-sans transition-all duration-200">
                            <option value="">Select thickness</option>
                            {studThicknessOptions.map((opt) => <option key={opt} value={opt}>{opt} mm</option>)}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-normal text-gray-700 mb-2 font-sans">Material <span className="text-red-500">*</span></label>
                          <select name="studMaterial" value={formData.studMaterial} onChange={handleInputChange} required className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 text-base font-sans transition-all duration-200">
                            <option value="">Select material</option>
                            {studMaterialOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                          </select>
                        </div>
                      </div>
                  )}
                  {formData.substrateType === 'Steel work' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-normal text-gray-700 mb-2 font-sans">Thickness <span className="text-red-500">*</span></label>
                          <input type="text" name="steelWorkThickness" value={formData.steelWorkThickness} onChange={handleInputChange} required className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 text-base font-sans transition-all duration-200" placeholder="3 mm" />
                        </div>
                        <div>
                          <label className="block text-sm font-normal text-gray-700 mb-2 font-sans">Material <span className="text-red-500">*</span></label>
                          <select name="steelWorkMaterial" value={formData.steelWorkMaterial} onChange={handleInputChange} required className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 text-base font-sans transition-all duration-200">
                            <option value="">Select material</option>
                            {steelWorkMaterialOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                          </select>
                        </div>
                      </div>
                  )}
                  {formData.substrateType === 'Concrete' && (
                    <div>
                        <label className="block text-sm font-normal text-gray-700 mb-2 font-sans">Concrete Grade <span className="text-red-500">*</span></label>
                        <input type="text" name="concreteGrade" value={formData.concreteGrade} onChange={handleInputChange} required className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 text-base font-sans transition-all duration-200" placeholder="C20/25 (default)" />
                    </div>
                  )}
                </div>
                )}

                {/* Top Hat / C-Channel */}
                <div>
                  <label className="block text-sm font-normal text-gray-700 mb-2 font-sans">Top Hat / C-Channel <span className="text-red-500">*</span></label>
                  <div className="flex gap-4">
                      <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700 font-sans">
                        <input
                          type="radio"
                          name="topHat"
                          value="yes"
                          checked={formData.topHat === 'yes'}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-gray-600 border-gray-300 focus:ring-gray-400"
                        />
                        <span>Yes</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700 font-sans">
                        <input
                          type="radio"
                          name="topHat"
                          value="no"
                          checked={formData.topHat === 'no'}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-gray-600 border-gray-300 focus:ring-gray-400"
                        />
                        <span>No</span>
                      </label>
                    </div>
                </div>
                {formData.topHat === 'yes' && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div>
                      <label className="block text-sm font-normal text-gray-700 mb-2 font-sans">Thickness <span className="text-red-500">*</span></label>
                      <select name="topHatChannelThickness" value={formData.topHatChannelThickness} onChange={handleInputChange} required className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 text-base font-sans transition-all duration-200">
                        <option value="">Select thickness</option>
                        {topHatThicknessOptions.map((opt) => <option key={opt} value={opt}>{opt} mm</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-normal text-gray-700 mb-2 font-sans">Material <span className="text-red-500">*</span></label>
                      <input type="text" name="topHatChannelMaterial" value={formData.topHatChannelMaterial} onChange={handleInputChange} required className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 text-base font-sans transition-all duration-200" placeholder="5754 H22" />
                    </div>
                    <div>
                      <label className="block text-sm font-normal text-gray-700 mb-2 font-sans">Depth <span className="text-red-500">*</span></label>
                      {renderInputWithUnit('topHatDepth', 'mm', '', true)}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Cavity Depth – под блока Building */}
            <div className="mt-4">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-5">
                <h3 className="text-lg font-medium text-gray-900 mb-5 pb-2 border-b border-gray-100 font-sans flex items-center gap-2">
                  Cavity Depth
                  <span className="group relative inline-flex" title="Total depth measured from the substrate/ building wall to the back of the cladding.">
                    <Info className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-help" aria-label="Cavity Depth definition" />
                    <span className="absolute left-0 bottom-full mb-1 px-2 py-1.5 text-xs text-gray-700 bg-gray-100 border border-gray-200 rounded-lg shadow-sm opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity w-64 z-10 font-sans">
                      Total depth measured from the substrate/ building wall to the back of the cladding.
                    </span>
                  </span>
                </h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-normal text-gray-700 mb-2 font-sans">Depth 1</label>
                      {renderInputWithUnit('cavityDepthMin', 'mm')}
                    </div>
                    <div>
                      <label className="block text-sm font-normal text-gray-700 mb-2 font-sans">Depth 2</label>
                      {renderInputWithUnit('cavityDepthMax', 'mm')}
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-sm text-gray-500 font-medium">or</span>
                    <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700 font-sans">
                      <input
                        type="checkbox"
                        name="insulationThicknessMode"
                        checked={formData.insulationThicknessMode}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-gray-600 border-gray-300 rounded focus:ring-gray-400"
                      />
                      <span>Provide Insulation Thickness</span>
                    </label>
                  </div>
                  {formData.insulationThicknessMode && (
                    <div className="pt-2 border-t border-gray-100 space-y-2">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-normal text-gray-700 mb-2 font-sans">Thickness 1</label>
                          {renderInputWithUnit('insulationThickness', 'mm')}
                        </div>
                        <div>
                          <label className="block text-sm font-normal text-gray-700 mb-2 font-sans">Thickness 2</label>
                          {renderInputWithUnit('insulationThickness2', 'mm')}
                        </div>
                      </div>
                      {(isInsulationThicknessInvalid(formData.insulationThickness) || isInsulationThicknessInvalid(formData.insulationThickness2)) && (
                        <p className="text-sm text-red-600 font-sans">Insulation thickness should be between 0 and 300 mm</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Wind load */}
            <div className="mt-4">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-5">
                <h3 className="text-lg font-medium text-gray-900 mb-5 pb-2 border-b border-gray-100 font-sans">
                  Wind load
                </h3>
                <div className="space-y-4">
                  {/* Wind load values OR Get by site address */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-normal text-gray-700 mb-2 font-sans">Typical (center) zone</label>
                      {renderInputWithUnit('windLoadTypical', 'kN/sq.m')}
                    </div>
                    <div>
                      <label className="block text-sm font-normal text-gray-700 mb-2 font-sans">Corner zone</label>
                      {renderInputWithUnit('windLoadCorner', 'kN/sq.m')}
                    </div>
                    <div>
                      <label className="block text-sm font-normal text-gray-700 mb-2 font-sans">Funneling zone</label>
                      {renderInputWithUnit('windLoadFunneling', 'kN/sq.m')}
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-sm text-gray-500 font-medium">or</span>
                    <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700 font-sans">
                      <input
                        type="checkbox"
                        name="windLoadByAddress"
                        checked={formData.windLoadByAddress}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-gray-600 border-gray-300 rounded focus:ring-gray-400"
                      />
                      <span>Get by site address</span>
                    </label>
                  </div>
                  {formData.windLoadByAddress && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-normal text-gray-700 mb-2 font-sans">Site Address</label>
                        <input
                          type="text"
                          name="windLoadSiteAddress"
                          value={formData.windLoadSiteAddress}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 text-base font-sans transition-all duration-200"
                          placeholder="Enter site address"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-normal text-gray-700 mb-2 font-sans">Postcode</label>
                        <input
                          type="text"
                          name="windLoadPostcode"
                          value={formData.windLoadPostcode}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 text-base font-sans transition-all duration-200"
                          placeholder="Enter postcode"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {formData.claddingType !== 'AGROB BUCHTAL KeraTwin K20' && (
            <>
            {/* Vertical profiles */}
            <div className="mt-4">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-5">
                <h3 className="text-lg font-medium text-gray-900 mb-5 pb-2 border-b border-gray-100 font-sans">
                  Vertical profiles
                </h3>
                <div className="space-y-6">
                {/* T-Profile */}
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="shrink-0">
                    <svg viewBox="0 0 60 80" className="w-8 h-10 flex-shrink-0">
                      <rect x="10" y="0" width="40" height="8" fill="#374151" />
                      <rect x="24" y="8" width="12" height="72" fill="#374151" />
                    </svg>
                  </div>
                  <div className="flex-1 space-y-4">
                    <div>
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-1.5">
                        {verticalProfiles.T.sizes.map((size) => (
                          <label
                            key={size}
                            className={`flex items-center justify-center p-2 rounded border cursor-pointer transition-all text-xs ${
                              formData.tProfileSize === size ? 'border-gray-600 bg-gray-100 text-gray-900 font-medium' : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700'
                            }`}
                          >
                            <input type="radio" name="tProfileSize" value={size} checked={formData.tProfileSize === size} onChange={handleInputChange} className="sr-only" />
                            <span>{size}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-normal text-gray-700 mb-2 font-sans">L1</label>
                        {renderInputWithUnit('tProfileLength1', 'mm')}
                      </div>
                      <div>
                        <label className="block text-sm font-normal text-gray-700 mb-2 font-sans">L2</label>
                        {renderInputWithUnit('tProfileLength2', 'mm')}
                      </div>
                      <div>
                        <label className="block text-sm font-normal text-gray-700 mb-2 font-sans">L3</label>
                        {renderInputWithUnit('tProfileLength3', 'mm')}
                      </div>
                    </div>
                    {(isProfileLengthInvalid(formData.tProfileLength1) || isProfileLengthInvalid(formData.tProfileLength2) || isProfileLengthInvalid(formData.tProfileLength3)) && (
                      <p className="text-sm text-red-600 font-sans">Profile length should be between 500 and 6000 mm</p>
                    )}
                  </div>
                </div>

                {/* L-Profile */}
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="shrink-0">
                    <svg viewBox="0 0 60 80" className="w-8 h-10 flex-shrink-0">
                      <rect x="10" y="0" width="12" height="80" fill="#374151" />
                      <rect x="10" y="68" width="40" height="12" fill="#374151" />
                    </svg>
                  </div>
                  <div className="flex-1 space-y-4">
                    <div>
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-1.5">
                        {verticalProfiles.L.sizes.map((size) => (
                          <label
                            key={size}
                            className={`flex items-center justify-center p-2 rounded border cursor-pointer transition-all text-xs ${
                              formData.lProfileSize === size ? 'border-gray-600 bg-gray-100 text-gray-900 font-medium' : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700'
                            }`}
                          >
                            <input type="radio" name="lProfileSize" value={size} checked={formData.lProfileSize === size} onChange={handleInputChange} className="sr-only" />
                            <span>{size}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-normal text-gray-700 mb-2 font-sans">L1</label>
                        {renderInputWithUnit('lProfileLength1', 'mm')}
                      </div>
                      <div>
                        <label className="block text-sm font-normal text-gray-700 mb-2 font-sans">L2</label>
                        {renderInputWithUnit('lProfileLength2', 'mm')}
                      </div>
                      <div>
                        <label className="block text-sm font-normal text-gray-700 mb-2 font-sans">L3</label>
                        {renderInputWithUnit('lProfileLength3', 'mm')}
                      </div>
                    </div>
                    {(isProfileLengthInvalid(formData.lProfileLength1) || isProfileLengthInvalid(formData.lProfileLength2) || isProfileLengthInvalid(formData.lProfileLength3)) && (
                      <p className="text-sm text-red-600 font-sans">Profile length should be between 500 and 6000 mm</p>
                    )}
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
            </div>
            </div>
            </>
            )}

            {/* Wall brackets */}
            <div className="mt-4">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-5">
                <h3 className="text-lg font-medium text-gray-900 mb-5 pb-2 border-b border-gray-100 font-sans">
                  Wall brackets
                </h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-2 max-w-xs">
                    <div
                      onClick={() => setFormData(prev => ({ ...prev, wallBracket: 'QVB', wallBracketSize: '' }))}
                      className={`cursor-pointer rounded-lg border-2 p-3 transition-all duration-200 ${
                        formData.wallBracket === 'QVB' ? 'border-gray-600 bg-gray-50' : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex flex-col items-center">
                        <svg viewBox="0 0 64 56" className="w-10 h-12 mb-2">
                          <rect x="4" y="8" width="8" height="40" rx="1" fill={formData.wallBracket === 'QVB' ? '#374151' : '#9CA3AF'} />
                          <rect x="12" y="36" width="44" height="10" rx="1" fill={formData.wallBracket === 'QVB' ? '#374151' : '#9CA3AF'} />
                          <rect x="12" y="10" width="8" height="8" rx="1" fill={formData.wallBracket === 'QVB' ? '#6B7280' : '#D1D5DB'} />
                        </svg>
                        <span className={`text-xs font-medium text-center ${formData.wallBracket === 'QVB' ? 'text-gray-900' : 'text-gray-600'}`}>QVB aluminum</span>
                      </div>
                    </div>
                    <div
                      onClick={() => setFormData(prev => ({ ...prev, wallBracket: 'QTB', wallBracketSize: '' }))}
                      className={`cursor-pointer rounded-lg border-2 p-3 transition-all duration-200 ${
                        formData.wallBracket === 'QTB' ? 'border-gray-600 bg-gray-50' : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex flex-col items-center">
                        <svg viewBox="0 0 64 56" className="w-10 h-12 mb-2">
                          <rect x="4" y="8" width="8" height="40" rx="1" fill={formData.wallBracket === 'QTB' ? '#374151' : '#9CA3AF'} />
                          <rect x="12" y="36" width="44" height="10" rx="1" fill={formData.wallBracket === 'QTB' ? '#374151' : '#9CA3AF'} />
                          <rect x="12" y="10" width="8" height="8" rx="1" fill={formData.wallBracket === 'QTB' ? '#6B7280' : '#D1D5DB'} />
                          <circle cx="48" cy="41" r="3" fill={formData.wallBracket === 'QTB' ? '#374151' : '#9CA3AF'} />
                        </svg>
                        <span className={`text-xs font-medium text-center ${formData.wallBracket === 'QTB' ? 'text-gray-900' : 'text-gray-600'}`}>QTB stainless steel</span>
                      </div>
                    </div>
                  </div>
                  {formData.wallBracket && (
                    <div>
                      <div className="flex items-center gap-1.5 mb-2">
                        <span className="text-sm font-normal text-gray-600 font-sans">Depth (length)</span>
                        <span className="group relative inline-flex" title="Wall Bracket Stand-off Distance">
                          <Info className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-help" aria-label="Definition" />
                          <span className="absolute left-0 bottom-full mb-1 px-2 py-1.5 text-xs text-gray-700 bg-gray-100 border border-gray-200 rounded-lg shadow-sm opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity w-56 z-10 font-sans">
                            Wall Bracket Stand-off Distance
                          </span>
                        </span>
                      </div>
                      <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                        {wallBracketSizes.map((size) => {
                          const value = String(size);
                          const display = `L-${size}`;
                          const isChecked = formData.wallBracketSize === value;
                          return (
                            <label
                              key={value}
                              className={`flex items-center justify-center p-2 rounded border cursor-pointer transition-all text-xs ${
                                isChecked ? 'border-gray-600 bg-gray-100 text-gray-900 font-medium' : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700'
                              }`}
                            >
                              <input type="radio" name="wallBracketSize" value={value} checked={isChecked} onChange={handleInputChange} className="sr-only" />
                              <span>{display}</span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Layer 3: Project */}
            <div className="mt-4 bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-5 space-y-4">
                <h3 className="text-lg font-medium text-gray-900 mb-5 pb-2 border-b border-gray-100 font-sans">
                  Project
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
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-normal text-gray-700 mb-2 font-sans">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 text-base font-sans transition-all duration-200"
                      placeholder="Enter city"
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
                      Total Facade Area
                    </label>
                    <input
                      type="text"
                      name="totalFacadeArea"
                      value={formData.totalFacadeArea}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 text-base font-sans transition-all duration-200"
                      placeholder="sq.m"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-normal text-gray-700 mb-2 font-sans">
                      Start Date
                    </label>
                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 text-base font-sans transition-all duration-200"
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
                    Optional: Upload architectural drawings, or any other files that will help to get more precise quote.
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

        {/* Right: Your Configuration – sticky кошница, винаги видима при скрол */}
        <div className="hidden lg:block lg:w-80 lg:flex-shrink-0 lg:self-start sticky top-8">
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 sm:p-5 flex flex-col max-h-[calc(100vh-4rem)] overflow-y-auto">
            <h3 className="text-lg font-medium text-gray-900 font-sans mb-4">Your Configuration</h3>
            {/* Systems (top) */}
            <div className="grid grid-cols-2 gap-2">
              {availableQvSystems.map((system) => {
                const isActive = formData.qvSystem === system.id;
                return (
                  <label
                    key={system.id}
                    className={`flex flex-col items-center justify-center gap-0.5 p-2.5 rounded-lg border-2 transition-all duration-200 text-center ${
                      isActive ? 'bg-red-600 border-red-600 text-white cursor-pointer' : 'bg-white border-gray-200 text-gray-900 hover:bg-gray-50 cursor-pointer'
                    }`}
                  >
                    <input type="radio" name="qvSystem" value={system.id} checked={formData.qvSystem === system.id} onChange={handleInputChange} className="sr-only" />
                    <span className="text-sm font-medium">{system.id}</span>
                    <span className={`text-xs font-normal truncate w-full px-1 ${isActive ? 'text-white/90' : 'text-gray-600'}`}>{system.description}</span>
                  </label>
                );
              })}
            </div>
            {/* Variants (below, when system has variants) */}
            {formData.qvSystem && currentVariants.length > 0 && (
              <div className="mt-4 border-t border-red-200 pt-4">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h4 className="text-sm font-medium text-gray-800 font-sans">Variants</h4>
                  {selectedSystemData?.embedUrl && (
                    <button
                      type="button"
                      onClick={() => setPreviewItem(selectedSystemData)}
                      className="shrink-0 p-1.5 rounded-md hover:bg-gray-100 text-gray-600 flex items-center gap-1"
                      title="Preview 3D"
                      aria-label="Preview 3D"
                    >
                      <Eye className="w-4 h-4" />
                      <span className="text-xs">Preview</span>
                    </button>
                  )}
                </div>
                <div className="space-y-2">
                  {currentVariants.map((variant) => {
                    const isVariantActive = formData.qvVariant === variant.id;
                    return (
                      <label
                        key={variant.id}
                        className={`flex items-start justify-between gap-2 p-2.5 rounded-lg border-2 transition-all duration-200 w-full cursor-pointer ${
                          isVariantActive ? 'bg-red-600 border-red-600 text-white' : 'bg-white border-gray-200 text-gray-900 hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex-1 min-w-0">
                          <input type="radio" name="qvVariant" value={variant.id} checked={formData.qvVariant === variant.id} onChange={handleInputChange} className="sr-only" />
                          <span className="text-sm font-medium block">{variant.id}</span>
                          <span className={`text-xs font-normal ${isVariantActive ? 'text-white/90' : 'text-gray-600'}`}>{variant.description}</span>
                        </div>
                        {variant.embedUrl && (
                          <button
                            type="button"
                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); setPreviewItem(variant); }}
                            className={`shrink-0 p-1.5 rounded-md transition-colors ${isVariantActive ? 'hover:bg-red-500 text-white' : 'hover:bg-gray-100 text-gray-600'}`}
                            title="Preview 3D"
                            aria-label="Preview 3D"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        )}
                      </label>
                    );
                  })}
                </div>
              </div>
            )}
            {/* Systems without variants: selection is complete when system is selected */}
              {formData.qvSystem && currentVariants.length === 0 && selectedSystemData && (
                <div className="mt-4 border-t border-red-200 pt-4">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs text-gray-600 font-sans">{selectedSystemData.id} – {selectedSystemData.description}</p>
                    {selectedSystemData.embedUrl && (
                      <button
                        type="button"
                        onClick={() => setPreviewItem(selectedSystemData)}
                        className="shrink-0 p-1.5 rounded-md hover:bg-gray-100 text-gray-600"
                        title="Preview 3D"
                        aria-label="Preview 3D"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              )}
            <div className="mt-4 pt-4 border-t border-red-200 space-y-3">
              <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700 font-sans">
                <input
                  type="checkbox"
                  name="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-gray-600 border-gray-300 rounded focus:ring-gray-400"
                />
                <span>Terms and Conditions accepted</span>
              </label>
              <button
                type="submit"
                disabled={!formData.termsAccepted}
                className="w-full px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 font-medium text-base font-sans transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
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

            {/* 3D Preview Modal */}
            {previewItem && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60" onClick={() => setPreviewItem(null)}>
                <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900 font-sans">{previewItem.id} – {previewItem.description}</h3>
                    <button
                      type="button"
                      onClick={() => setPreviewItem(null)}
                      className="p-2 rounded-lg hover:bg-gray-100 text-gray-600"
                      aria-label="Close"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="flex-1 min-h-0 p-4">
                    <iframe
                      title={previewItem.id}
                      src={previewItem.embedUrl}
                      className="w-full aspect-video rounded-lg"
                      allowFullScreen
                      allow="autoplay; fullscreen; xr-spatial-tracking"
                    />
                  </div>
                </div>
              </div>
            )}
      </form>
    </div>
  );
};

export default Draft;
