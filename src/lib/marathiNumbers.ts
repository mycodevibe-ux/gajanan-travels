/**
 * Helper utility to convert English digits to Marathi Devanagari numerals
 */
export const toMarathiDigits = (input: string | number | undefined | null): string => {
  if (input === undefined || input === null) return '';
  const marathiDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
  return input.toString().replace(/[0-9]/g, (digit) => marathiDigits[parseInt(digit, 10)]);
};

/**
 * Format date string (YYYY-MM-DD) into natural Marathi date (उदा. २ सप्टेंबर २०२६)
 */
export const formatMarathiDate = (dateStr: string): string => {
  if (!dateStr) return '';
  try {
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      const year = parseInt(parts[0], 10);
      const monthIdx = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      
      const marathiMonths = [
        'जानेवारी', 'फेब्रुवारी', 'मार्च', 'एप्रिल', 'मे', 'जून',
        'जुलै', 'ऑगस्ट', 'सप्टेंबर', 'ऑक्टोबर', 'नोव्हेंबर', 'डिसेंबर'
      ];
      
      const dayMr = toMarathiDigits(day);
      const monthMr = marathiMonths[monthIdx] || '';
      const yearMr = toMarathiDigits(year);
      
      return `${dayMr} ${monthMr} ${yearMr}`;
    }
  } catch (e) {
    // fallback
  }
  return toMarathiDigits(dateStr);
};
