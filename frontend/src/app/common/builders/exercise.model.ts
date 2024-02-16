import { Exercise, ExerciseSet } from "src/app/data/interfaces/exercises.model";

export function createExercise(): Exercise {
    return {
        type: [''],
        name: '',
        bodyPart: [''],
        category: [''],
        coeff: 0.5,
        description: '',
        isCompetitionLift: false,
        movementPlane: '',
        movementType: '',
        videoUrl: '',
        exp: [''],
        //sets: [createSet()]
    };
}

function createSet(): ExerciseSet {
    return {
        reps: 0,
        rpe: 0,
        weight: 0,
        tempo: ''
    }
}


export function editExercise(exercise: Exercise): Exercise {
    return {
        ...exercise,
    };
}
