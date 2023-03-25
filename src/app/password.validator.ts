import { FormControl } from '@angular/forms';

export class PasswordValidator {
  static strong(control: FormControl): { [key: string]: boolean } | null {
    let hasNumber = /\d/.test(control.value);
    let hasUppercase = /[A-Z]/.test(control.value);
    let hasLowercase = /[a-z]/.test(control.value);
    const valid = hasNumber && hasUppercase && hasLowercase;
    if (!valid) {
      return { strong: true };
    }
    return null;
  }
}
