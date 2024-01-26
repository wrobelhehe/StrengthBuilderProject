import { CalculatorData } from "../interfaces/calculator-data.model";

export const FFMI_DATA: CalculatorData[] = [
    { value: '< 18', description: "ffmiDesc_1" },
    { value: '18 - 20', description: "ffmiDesc_2" },
    { value: '20 - 22', description: "ffmiDesc_3" },
    { value: '22 - 23', description: "ffmiDesc_4" },
    { value: '23 - 26', description: "ffmiDesc_5" },
    { value: '26 - 28', description: "ffmiDesc_6" },
    { value: '> 28', description: "ffmiDesc_7" },
];


export const BMI_DATA: CalculatorData[] = [
    { value: '< 16', description: "bmiDesc_1" },
    { value: '16 - 16.99', description: "bmiDesc_2" },
    { value: '17 - 18.49', description: "bmiDesc_3" },
    { value: '18.5 - 24.99', description: "bmiDesc_4" },
    { value: '25 - 29.99', description: "bmiDesc_5" },
    { value: '30 - 34.99', description: "bmiDesc_6" },
    { value: '35 - 39.99', description: "bmiDesc_7" },
    { value: '> 40', description: "bmiDesc_8" },

];

export const BODY_PARTS: string[] = [
    'chest',      // klatka piersiowa
    'triceps',    // trójgłowy ramienia
    'biceps',     // dwugłowy ramienia
    'shoulders',  // barki
    'abdominals', // mięśnie brzucha
    'quadriceps', // mięśnie czworogłowe uda
    'hamstrings', // mięśnie dwugłowe uda
    'calves',     // łydki
    'glutes',     // pośladki
    'forearms',   // przedramiona
    'lats',       // mięśnie najszersze grzbietu
    'obliques',   // mięśnie skośne brzucha
    'abductors',
    'hip_flexors',
    'it_band',
    'lower_back',
    'upper_back',
    'traps'
];

export const MOVEMENT_PLANES: string[] = [
    'sagittal',   // płaszczyzna strzałkowa (ruchy do przodu i do tyłu)
    'frontal',    // płaszczyzna czołowa (ruchy boczne, na boki)
    'transverse', // płaszczyzna poprzeczna (ruchy rotacyjne, obrotowe)
];


export const TYPES: string[] = [
    'body_building',
    'powerlifting',
];


export const CATEGORIES: string[] = [
    'bench', 'squat', 'deadlift', 'universal', 'warmup'
]

export const MOVEMENT_TYPES: string[] = [
    'squat', 'hinge', 'lunge', 'push', 'pull', 'carry', 'twist', 'none'
]


export const EXPERIENCE: string[] = [
    'beginner', 'intermediate', 'advanced'
]
