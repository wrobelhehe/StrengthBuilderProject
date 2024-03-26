export interface TrainingPlan {
    planId?: string;
    createdBy?: string;
    creationDate?: Date;
    planName: string;
    planType: string;
    experience: string;
    description: string;
    durationWeeks: number;
    performanceResults?: {
        bench?: number;
        deadlift?: number;
        squat?: number;
    };
    trainingDays: TrainingDay[];
}

export interface TrainingDay {
    dayName: string;
    description: string;
    exercises: TrainingExercise[];
}

export interface TrainingExercise {
    name: string;
    videoUrl: string;
    description: string;
    sets: ExerciseSet[];
}

export interface ExerciseSet {
    reps: number;
    rpe: number;
    weight: number;
    tempo: string;
    rest: number;
}
