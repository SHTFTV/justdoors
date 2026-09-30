import { reviewHardware, type HardwareReviewInput } from '../../hardware-review';
import type { HardwareValidationResult } from '../types';
export type HardwareCheckInput = HardwareReviewInput;
export function validateHardwareCompatibility(input: HardwareCheckInput): HardwareValidationResult { return reviewHardware(input); }
