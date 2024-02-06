import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { TranslateService } from "@ngx-translate/core";
import { ToastrService } from "ngx-toastr";

export function handleSuccess(translationKey: string, modal: NgbModal, translate: TranslateService, toast: ToastrService): void {
    modal.dismissAll();
    translate.get(translationKey).subscribe({
        next: (translation: string) => {
            toast.success('', translation, {
                closeButton: true,
                progressBar: true,
                positionClass: 'toast-bottom-right'
            });
        },
        error: (error) => console.error('Error translating message:', error)
    });
}