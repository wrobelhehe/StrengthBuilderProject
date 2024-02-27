import { Exercise } from "src/app/data/interfaces/exercises.model";

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
    };
}



export function editExercise(exercise: Exercise): Exercise {
    return {
        ...exercise,
    };
}
