export interface PlanImage {
    src: string;
    alt: string;
}

export interface PlanText {
    title: string;
    content: string;
}

export interface PlanSection {
    image: PlanImage;
    text: PlanText;
    button: ButtonSection
    description: string
}

export interface ButtonSection {
    icon: string;
    text: string;
}

