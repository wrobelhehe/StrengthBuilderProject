import { PlanSection } from "../interfaces/plan-main-view.model";

export const MOCK_PLAN_SECTIONS: PlanSection[] = [
    {
        image: {
            src: "../../../../assets/img/squat.png",
            alt: "image_description_plan1",
        },
        text: {
            title: "plan1_title",
            content: "plan1_content"
        },
        button: {
            icon: 'shopping_cart',
            text: 'get_plan'
        },
        description: "plan1_description"
    },
    {
        image: {
            src: "../../../../assets/img/benchpress.png",
            alt: "image_description_plan2"
        },
        text: {
            title: "plan2_title",
            content: "plan2_content"
        },
        button: {
            icon: 'shopping_cart',
            text: 'get_plan'
        },
        description: "plan2_description"
    },
    {
        image: {
            src: "../../../../assets/img/deadlift.png",
            alt: "image_description_plan3"
        },
        text: {
            title: "plan3_title",
            content: "plan3_content"
        },
        button: {
            icon: 'shopping_cart',
            text: 'get_plan'
        },
        description: "plan3_description"
    },
    {
        image: {
            src: "../../../../assets/img/run.png",
            alt: "image_description_plan4"
        },
        text: {
            title: "plan4_title",
            content: "plan4_content"
        },
        button: {
            icon: 'shopping_cart',
            text: 'get_plan'
        },
        description: "plan4_description"
    }
];


