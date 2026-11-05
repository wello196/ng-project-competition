import { AbstractControl } from "@angular/forms";

export class PasswordMatch {
    static checkPasswordMatch(password: string, confirmPassword: string) {
        return (form:AbstractControl) => {
            const passwordValue=form.get(password)?.value;
            const confirmPasswordValue=form.get(confirmPassword)?.value;
            if (!passwordValue || !confirmPasswordValue) {
              return null;
            }
            return passwordValue===confirmPasswordValue?null:{passwordNotMatch:true};
            
            
        }
    }
}
 