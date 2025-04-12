import { AbstractControl, ValidationErrors } from "@angular/forms"

export let passwordMatch = (control: AbstractControl): ValidationErrors | null => {
    let password = control.value.password;
    let repassword = control.value.rePassword;
    if (password == repassword && password && repassword) {
        return null
    }
    else {
        return{passworddisMatch:true}
    }
}