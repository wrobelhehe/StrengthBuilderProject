import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { firstComponents, secondComponents, thirdComponents } from '../../data/mocks/nav-data';
import { ModalViewComponent } from '../main-view/dialogs/modal-view/modal-view.component';


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


    openDialog(name: string) {
        const modalRef = this.modalService.open(ModalViewComponent, {
            fullscreen: true
        })
        modalRef.componentInstance.headerTitle = name

    }

}
