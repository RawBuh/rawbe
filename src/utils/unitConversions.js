// Unit conversion utilities
export const UNIT_SYSTEMS = {
  METRIC: 'metric',
  IMPERIAL: 'imperial'
};

// Conversion factors
export const CONVERSIONS = {
  MM_TO_INCHES: 1 / 25.4,
  INCHES_TO_MM: 25.4,
  M_TO_FEET: 1 / 0.3048,
  FEET_TO_M: 0.3048,
  SQM_TO_SQFT: 1 / 0.092903,
  SQFT_TO_SQM: 0.092903
};

// Convert millimeters to inches
export const mmToInches = (mm) => {
  const value = parseFloat(mm);
  return isNaN(value) ? 0 : value * CONVERSIONS.MM_TO_INCHES;
};

// Convert inches to millimeters
export const inchesToMm = (inches) => {
  const value = parseFloat(inches);
  return isNaN(value) ? 0 : value * CONVERSIONS.INCHES_TO_MM;
};

// Convert meters to feet
export const mToFeet = (meters) => {
  const value = parseFloat(meters);
  return isNaN(value) ? 0 : value * CONVERSIONS.M_TO_FEET;
};

// Convert feet to meters
export const feetToM = (feet) => {
  const value = parseFloat(feet);
  return isNaN(value) ? 0 : value * CONVERSIONS.FEET_TO_M;
};

// Convert square meters to square feet
export const sqmToSqft = (sqm) => {
  const value = parseFloat(sqm);
  return isNaN(value) ? 0 : value * CONVERSIONS.SQM_TO_SQFT;
};

// Convert square feet to square meters
export const sqftToSqm = (sqft) => {
  const value = parseFloat(sqft);
  return isNaN(value) ? 0 : value * CONVERSIONS.SQFT_TO_SQM;
};

// Format conversion display
export const formatConversion = (value, fromUnit, toUnit) => {
  if (!value || isNaN(parseFloat(value))) return '';
  
  let convertedValue;
  
  if (fromUnit === 'mm' && toUnit === 'in') {
    convertedValue = mmToInches(value);
  } else if (fromUnit === 'in' && toUnit === 'mm') {
    convertedValue = inchesToMm(value);
  } else if (fromUnit === 'm' && toUnit === 'ft') {
    convertedValue = mToFeet(value);
  } else if (fromUnit === 'ft' && toUnit === 'm') {
    convertedValue = feetToM(value);
  } else if (fromUnit === 'sqm' && toUnit === 'sqft') {
    convertedValue = sqmToSqft(value);
  } else if (fromUnit === 'sqft' && toUnit === 'sqm') {
    convertedValue = sqftToSqm(value);
  } else {
    return '';
  }
  
  // Format the converted value with appropriate decimal places
  const formatted = convertedValue < 1 ? 
    convertedValue.toFixed(2) : 
    convertedValue.toFixed(1);
  
  return `≈ ${formatted} ${toUnit}`;
};

// Get field configuration based on unit system
export const getFieldConfig = (fieldName, unitSystem) => {
  const configs = {
    // Thickness and small measurements (mm/in)
    claddingThickness: {
      [UNIT_SYSTEMS.METRIC]: { unit: 'mm', placeholder: 'Enter thickness (mm)' },
      [UNIT_SYSTEMS.IMPERIAL]: { unit: 'in', placeholder: 'Enter thickness (in)' }
    },
    panel1Height: {
      [UNIT_SYSTEMS.METRIC]: { unit: 'mm', placeholder: 'Enter height (mm)' },
      [UNIT_SYSTEMS.IMPERIAL]: { unit: 'in', placeholder: 'Enter height (in)' }
    },
    panel1Length: {
      [UNIT_SYSTEMS.METRIC]: { unit: 'mm', placeholder: 'Enter length (mm)' },
      [UNIT_SYSTEMS.IMPERIAL]: { unit: 'in', placeholder: 'Enter length (in)' }
    },
    panel2Height: {
      [UNIT_SYSTEMS.METRIC]: { unit: 'mm', placeholder: 'Enter height (mm)' },
      [UNIT_SYSTEMS.IMPERIAL]: { unit: 'in', placeholder: 'Enter height (in)' }
    },
    panel2Length: {
      [UNIT_SYSTEMS.METRIC]: { unit: 'mm', placeholder: 'Enter length (mm)' },
      [UNIT_SYSTEMS.IMPERIAL]: { unit: 'in', placeholder: 'Enter length (in)' }
    },
    floorToFloorDistance: {
      [UNIT_SYSTEMS.METRIC]: { unit: 'mm', placeholder: 'Enter distance (mm)' },
      [UNIT_SYSTEMS.IMPERIAL]: { unit: 'in', placeholder: 'Enter distance (in)' }
    },
    wallToPanelDistance: {
      [UNIT_SYSTEMS.METRIC]: { unit: 'mm', placeholder: 'Enter distance (mm)' },
      [UNIT_SYSTEMS.IMPERIAL]: { unit: 'in', placeholder: 'Enter distance (in)' }
    },
    insulationThickness: {
      [UNIT_SYSTEMS.METRIC]: { unit: 'mm', placeholder: 'Enter thickness (mm)' },
      [UNIT_SYSTEMS.IMPERIAL]: { unit: 'in', placeholder: 'Enter thickness (in)' }
    },
    // Larger measurements (m/ft)
    totalBuildingHeight: {
      [UNIT_SYSTEMS.METRIC]: { unit: 'm', placeholder: 'Enter height (m)' },
      [UNIT_SYSTEMS.IMPERIAL]: { unit: 'ft', placeholder: 'Enter height (ft)' }
    },
    // Area measurements (sqm/sqft)
    totalFacadeArea: {
      [UNIT_SYSTEMS.METRIC]: { unit: 'sqm', placeholder: 'Enter area (sqm)' },
      [UNIT_SYSTEMS.IMPERIAL]: { unit: 'sqft', placeholder: 'Enter area (sqft)' }
    }
  };
  
  return configs[fieldName]?.[unitSystem] || { unit: '', placeholder: '' };
}; 