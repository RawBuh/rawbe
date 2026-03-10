import React from 'react';
import { useQuote } from '../context/QuoteContext';

const Quote = () => {
  const { quoteData } = useQuote();

  const formatValue = (val) => (val != null && val !== '' ? String(val) : '–');

  const siteAddressValue = quoteData ? [quoteData.siteAddress, quoteData.postcode].filter(Boolean).join(', ') || '–' : '–';

  const claddingTypeValue = quoteData
    ? (formatValue(quoteData.claddingType) + (quoteData.claddingBrand ? ` (${quoteData.claddingBrand})` : '')) || '–'
    : '–';

  const summaryColumn1 = [
    { label: 'Building height', value: quoteData?.buildingHeight ? `${quoteData.buildingHeight} m` : '–' },
    { label: 'Cladding type', value: claddingTypeValue },
    { label: 'Cladding weight', value: quoteData?.claddingWeight ? `${quoteData.claddingWeight} kg/m²` : '–' },
    { label: 'Substrate type', value: formatValue(quoteData?.substrateType) },
  ];

  const summaryColumn2Simple = [
    { label: 'Profile length (L1)', value: quoteData?.verticalProfileLengthMax ? `${quoteData.verticalProfileLengthMax} mm` : '–' },
    { label: 'Horizontal spacing', value: quoteData?.horizontalSpacing ? `${quoteData.horizontalSpacing} mm` : '–' },
  ];

  const summaryColumn2Zones = [
    {
      label: 'Span max',
      center: quoteData?.spanMaxCenter ?? '–',
      corner: quoteData?.spanMaxCorner ?? '–',
      funneling: quoteData?.spanMaxFunneling ?? '–',
    },
    {
      label: 'Cantilever max',
      center: quoteData?.cantileverMaxCenter ?? '–',
      corner: quoteData?.cantileverMaxCorner ?? '–',
      funneling: quoteData?.cantileverMaxFunneling ?? '–',
    },
    {
      label: 'Wall bracket type fixed point',
      center: quoteData?.wallBracketTypeCenter ?? '–',
      corner: quoteData?.wallBracketTypeCorner ?? '–',
      funneling: quoteData?.wallBracketTypeFunneling ?? '–',
    },
    {
      label: 'Wall bracket type sliding point',
      center: quoteData?.wallBracketTypeSlidingCenter ?? '–',
      corner: quoteData?.wallBracketTypeSlidingCorner ?? '–',
      funneling: quoteData?.wallBracketTypeSlidingFunneling ?? '–',
    },
  ];

  const structuralCalculationsItems = [
    { label: 'Profile type', value: quoteData?.verticalProfileType ? `${quoteData.verticalProfileType}-Profile ${quoteData.verticalProfileSize || ''}`.trim() : '–' },
    { label: 'Wind load (typical)', value: quoteData?.windLoadTypical ? `${quoteData.windLoadTypical} kN/m²` : '–' },
    { label: 'Wind load (corner)', value: quoteData?.windLoadCorner ? `${quoteData.windLoadCorner} kN/m²` : '–' },
    { label: 'Wind load (funneling)', value: quoteData?.windLoadFunneling ? `${quoteData.windLoadFunneling} kN/m²` : '–' },
  ];

  const handlePrint = () => window.print();

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <div className="max-w-[210mm] mx-auto no-print mb-6">
        <button
          type="button"
          onClick={handlePrint}
          className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
        >
          Print / Save as PDF
        </button>
      </div>

      {/* A4 document – printable layout */}
      <div className="quote-document bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden max-w-[210mm] mx-auto">
        <div className="bg-gray-900 text-white px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-xl font-semibold tracking-tight">Q-VENT</h1>
          </div>
          <div className="text-sm text-gray-300">
            QUOTE No {quoteData?.projectRefNo || '001'} | {new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
          </div>
        </div>
        <div className="quote-content p-6 sm:p-8">
          <div className="quote-page-1">
          <>
              <div className="quote-section mb-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-4 pt-1">
                  <div className="flex flex-col sm:col-start-1 sm:row-start-1">
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Project</span>
                    <span className="text-sm font-medium text-gray-900 mt-0.5">{formatValue(quoteData?.projectName)}</span>
                  </div>
                  <div className="flex flex-col sm:col-start-2 sm:row-start-1">
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Total facade area</span>
                    <span className="text-sm font-medium text-gray-900 mt-0.5">{quoteData?.totalFacadeArea ? `${quoteData.totalFacadeArea} m²` : '–'}</span>
                  </div>
                  <div className="flex flex-col sm:col-start-1 sm:row-start-2">
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Site Address</span>
                    <span className="text-sm font-medium text-gray-900 mt-0.5">{siteAddressValue}</span>
                  </div>
                  <div className="flex flex-col sm:col-start-2 sm:row-start-2">
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Start date</span>
                    <span className="text-sm font-medium text-gray-900 mt-0.5">{formatValue(quoteData?.startDate)}</span>
                  </div>
                  <div className="flex flex-col sm:col-start-3 sm:row-start-1">
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Contact person</span>
                    <span className="text-sm font-medium text-gray-900 mt-0.5">{formatValue(quoteData?.contactPerson)}</span>
                  </div>
                  <div className="flex flex-col sm:col-start-3 sm:row-start-2">
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">E-mail</span>
                    <span className="text-sm font-medium text-gray-900 mt-0.5">{formatValue(quoteData?.contactEmail)}</span>
                  </div>
                </div>
              </div>
              <div className="quote-section quote-page-1-end mt-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">Summary</h2>

                {/* Part 1: Building & system info – 3-column grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-4 sm:gap-x-8 sm:gap-y-4 mb-6 items-start">
                  <div className="flex flex-col gap-y-4 min-w-0">
                    {summaryColumn1.map((item) => (
                      <div key={item.label} className="flex flex-col">
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">{item.label}</span>
                        <span className="text-sm font-medium text-gray-900 mt-0.5">{item.value}</span>
                      </div>
                    ))}
                  </div>
                  <div className="sm:col-span-2 flex flex-col gap-y-4">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight bg-gray-100 border-l-4 border-gray-900 px-4 py-3 rounded-r-lg">
                        {quoteData?.qvSystem === 'QV1.1' ? 'QV1.1 - Exposed Mechanical Fastening' : formatValue(quoteData?.qvSystem) || '–'}
                      </h3>
                      <div className="flex flex-wrap gap-2 mt-4">
                        <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2">
                          <div className="w-7 h-7 flex-shrink-0 flex items-center justify-center">
                            <div className="flex items-end gap-0.5">
                              <svg viewBox="0 0 60 80" className="w-4 h-5">
                                <rect x="10" y="0" width="40" height="8" fill="#374151" />
                                <rect x="24" y="8" width="12" height="72" fill="#374151" />
                              </svg>
                              <svg viewBox="0 0 60 80" className="w-4 h-5">
                                <rect x="10" y="0" width="12" height="80" fill="#374151" />
                                <rect x="10" y="68" width="40" height="12" fill="#374151" />
                              </svg>
                            </div>
                          </div>
                          <span className="text-xs font-medium text-gray-900">Vertical profiles</span>
                        </div>
                        <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2">
                          <div className="w-7 h-7 flex-shrink-0 flex items-center justify-center">
                            <svg viewBox="0 0 64 56" className="w-6 h-5">
                              <rect x="4" y="8" width="8" height="40" rx="1" fill="#374151" />
                              <rect x="12" y="36" width="44" height="10" rx="1" fill="#374151" />
                              <rect x="12" y="10" width="8" height="8" rx="1" fill="#6B7280" />
                            </svg>
                          </div>
                          <span className="text-xs font-medium text-gray-900">Wall brackets</span>
                        </div>
                        <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2">
                          <div className="w-7 h-7 flex-shrink-0 flex items-center justify-center">
                            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#374151">
                              <rect x="4" y="4" width="16" height="16" rx="2" fill="#6B7280" stroke="#374151" strokeWidth="1" />
                              <rect x="8" y="8" width="8" height="8" rx="1" fill="#374151" />
                            </svg>
                          </div>
                          <span className="text-xs font-medium text-gray-900">Thermo-pads</span>
                        </div>
                        <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2">
                          <div className="w-7 h-7 flex-shrink-0 flex items-center justify-center">
                            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#374151">
                              <circle cx="12" cy="8" r="5" />
                              <rect x="10" y="13" width="4" height="10" rx="1" />
                              <rect x="8" y="6" width="8" height="1.5" rx="0.5" />
                            </svg>
                          </div>
                          <span className="text-xs font-medium text-gray-900">Fasteners</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="flex flex-col">
                          <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Facade Area</span>
                          <span className="text-sm font-medium text-gray-900 mt-0.5 bg-gray-50 border border-gray-200 rounded px-3 py-2">
                            {quoteData?.totalFacadeArea ? `${quoteData.totalFacadeArea} m²` : '–'}
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Price per sq.m</span>
                          <span className="text-sm font-medium text-gray-900 mt-0.5 bg-gray-50 border border-gray-200 rounded px-3 py-2">
                            {quoteData?.pricePerSqm != null && quoteData?.pricePerSqm !== '' ? `${quoteData.pricePerSqm}` : '–'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <h3 className="text-base font-semibold text-gray-900 mt-6 mb-2">Subframe Composition</h3>
                <div className="border-t border-gray-200 pt-4" />

                {/* Part 2: Profile length + image – 2-column grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 sm:gap-x-8">
                  <div className="flex flex-col gap-y-4 min-w-0">
                    {summaryColumn2Simple.map((item) => (
                      <div key={item.label} className="flex flex-col">
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">{item.label}</span>
                        <span className="text-sm font-medium text-gray-900 mt-0.5">{item.value}</span>
                      </div>
                    ))}
                    {summaryColumn2Zones.map((item) => (
                      <div key={item.label} className="flex flex-col bg-gray-100 rounded px-2 py-2">
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">{item.label}</span>
                        <div className="grid grid-cols-3 gap-x-2 mt-1 text-xs">
                          <div>
                            <span className="text-gray-500">Center:</span>
                            <span className="ml-1 font-medium text-gray-900">{item.center}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Corner:</span>
                            <span className="ml-1 font-medium text-gray-900">{item.corner}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Funneling:</span>
                            <span className="ml-1 font-medium text-gray-900">{item.funneling}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="w-full">
                    <img
                      src="/assets/system-drawing.png"
                      alt="Facade system cross-section"
                      className="w-full rounded border border-gray-200 object-contain"
                    />
                  </div>
                </div>
              </div>
          </>
          </div>
              <div className="quote-section quote-page-break-before mt-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">Structural Calculations</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                  {structuralCalculationsItems.map((item) => (
                    <div key={item.label} className="flex flex-col">
                      <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">{item.label}</span>
                      <span className="text-sm font-medium text-gray-900 mt-0.5">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
          {!quoteData && (
            <div className="mt-8 py-6 text-center border-t border-gray-100">
              <p className="text-sm text-gray-500 font-sans">Fill out the Apple Calculator form and click “Get quote” to generate your quote.</p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default Quote;
