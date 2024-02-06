import { ValidatorFn, AbstractControl } from '@angular/forms';

export function nonEmptyArrayValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const array = control.value;
        const nonEmpty = array.some((item: string) => item.trim() !== '');
        return nonEmpty ? null : { 'required': { value: control.value } };
    };
}
