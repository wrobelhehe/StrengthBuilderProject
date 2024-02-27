import { TrainingPlan, TrainingDay, TrainingExercise, ExerciseSet } from "src/app/data/interfaces/plan.model";

export function createEmptyTrainingPlan(): TrainingPlan {
    return {
        planId: '', // tutaj powinien zostać wygenerowany unikalny identyfikator
        createdBy: '', // UID użytkownika tworzącego plan
        creationDate: new Date(), // bieżąca data
        planName: '',
        planType: '',
        experience: '',
        description: '',
        durationWeeks: 0,
        performanceResults: {},
        trainingDays: []
    };
}

export function createEmptyTrainingDay(): TrainingDay {
    return {
        dayName: '',
        description: '',
        exercises: []
    };
}

// function createEmptyTrainingExercise(): TrainingExercise {
//     return {
//         name: '',
//         videoUrl: '',
//         description: '',
//         sets: [createEmptyExerciseSet()]
//     };
// }

export function createEmptyExerciseSet(): ExerciseSet {
    return {
        reps: 0,
        rpe: 0,
        weight: 0,
        tempo: '',
        rest: 0
    };
}


export function editTrainingPlan(plan: TrainingPlan): TrainingPlan {
    return {
        ...plan,
    };
}

