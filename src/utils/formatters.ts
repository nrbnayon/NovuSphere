export function formatTk(amount: number): string {
  return new Intl.NumberFormat("en-BD", {
    maximumFractionDigits: 0,
  }).format(amount) + " TK";
}

export function formatNumber(num: number): string {
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (num >= 1_000) {
    return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "k";
  }
  return num.toString();
}

export function formatTimeRemaining(targetDate: string): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
} {
  const difference = new Date(targetDate).getTime() - new Date().getTime();
  
  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds, isExpired: false };
}
