import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { firstComponents, secondComponents, thirdComponents } from '../main-view/side-nav/nav-data';


interface ComponentItem {
    icon: string;
    name: string;
    component: any; // Ideally, use a more specific type or generic if possible
}

export abstract class DialogOpen {
    constructor(private modalService: NgbModal) { }


    components = firstComponents

    secondComponents = secondComponents


    thirdComponents = thirdComponents


    openDialog(component: any) {
        this.modalService.open(component, {
            fullscreen: true
        })
    }

}
