export function useStats() {
  function megabytesToTerabytes(megabytes: number) {
    return (megabytes / (1024 * 1024)).toFixed(2);
  }

  function formatNumber(value: number) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }

  return {
    megabytesToTerabytes,
    formatNumber,
  };
}
