export interface HardwareReviewInput {
  doorType: string; fireRating: string; lockset: string; hinges: string;
  closer?: string; frameType?: string; location?: string;
}

// Product descriptions alone cannot establish a tested assembly or code approval.
export function reviewHardware(input: HardwareReviewInput) {
  return {
    isCompatible: false,
    status: 'warning' as const,
    summary: 'Project and manufacturer review required before ordering.',
    ruleCode: 'REVIEW-REQUIRED',
    details: [
      'These selections are a planning schedule, not a tested assembly or a compliance certificate.',
      `Requested door: ${input.doorType}; requested rating: ${input.fireRating}.`,
      'Exact product models, listing documents, dimensions, door weight and site requirements have not been checked.'
    ],
    recommendations: ['Have the project professional and supplier confirm the complete door, frame, hardware and installation specification.'],
    codeReferences: [] as string[],
    testedAssemblies: 'No assembly testing or certification performed'
  };
}
