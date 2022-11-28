import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const repeatPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const passwordRepeat = control.get('passwordRepeat');
    let val = null;
    if (password && passwordRepeat)
        val = password.value === passwordRepeat.value ? null : { passwordMismatch: true };

    return val
}