// src/utils/date-utils.ts
import { format } from 'date-fns';

export function nowForReporting(): string {
  return format(new Date(), 'yyyy-MM-dd HH:mm:ss');
}
