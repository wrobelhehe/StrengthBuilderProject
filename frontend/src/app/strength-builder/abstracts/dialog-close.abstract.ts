import { MatDialogRef } from '@angular/material/dialog';

export abstract class DialogClose {
    constructor(public dialogRef: MatDialogRef<any>) { }

    closeDialog(): void {
        this.dialogRef.close();
    }
}
