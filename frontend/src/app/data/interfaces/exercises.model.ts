export interface Exercise {
    exerciseId?: string;
    type: string[]
    name: string;
    bodyPart: string[];
    category: string[];
    coeff: number;
    description: string;
    movementPlane: string;
    movementType: string;
    videoUrl: string;
    exp: string,
    sets: ExerciseSet[]
}

export interface ExerciseSet {
    reps: number;
    rpe: number;
    weight: number;
    tempo: string
}