import { AbstractControl, ValidationErrors } from "@angular/forms";

export class NoNumber {
   static noNumber(control: AbstractControl): ValidationErrors | null {
   
    if (!control.value) {
      return null;
    }

    const hasNumber = /[0-9]/.test(control.value);

    return hasNumber ? { hasNumber: true } : null;
  }
}
