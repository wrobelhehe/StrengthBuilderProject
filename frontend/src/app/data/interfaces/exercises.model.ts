export interface Exercise {
    exerciseId?: string;
    type: string[]
    name: string;
    bodyPart: string[];
    category: string[];
    coeff: number;
    isCompetitionLift: boolean
    description: string;
    movementPlane: string;
    movementType: string;
    videoUrl: string;
    exp: string[],
}
