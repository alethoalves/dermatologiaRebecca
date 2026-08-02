export function parseHours(text) {
  return (text || '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const separatorIndex = line.indexOf(':');
      if (separatorIndex === -1) return { label: line, value: '' };
      return {
        label: line.slice(0, separatorIndex).trim(),
        value: line.slice(separatorIndex + 1).trim(),
      };
    });
}

export function buildMapSrc(clinic) {
  return `https://www.google.com/maps?q=${encodeURIComponent(`${clinic.address}, ${clinic.zip}`)}&output=embed`;
}
