import { MatDialogRef } from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

export abstract class DialogClose {
    constructor(public modalService: NgbModal) { }

    closeDialog(): void {
        this.modalService.dismissAll();
    }
}
