// Calculations engine for FMS

export function calculateActiveHeads(transactions: { movement_type: string; head_count: number }[]): number {
  return transactions.reduce((acc, curr) => {
    if (curr.movement_type === 'دخول/شراء') return acc + curr.head_count;
    if (['نفوق', 'ذبح اضطراري', 'مبيعات'].includes(curr.movement_type)) return acc - curr.head_count;
    if (curr.movement_type === 'تعديل جرد') return acc + curr.head_count;
    return acc;
  }, 0);
}

export function calculateADG(initialWeightKg: number, finalWeightKg: number, daysBetween: number): number {
  if (daysBetween <= 0) return 0;
  return (finalWeightKg - initialWeightKg) / daysBetween;
}

export function calculateFCR(totalFeedConsumedKg: number, totalWeightGainedKg: number): number {
  if (totalWeightGainedKg <= 0) return 0;
  return totalFeedConsumedKg / totalWeightGainedKg;
}
