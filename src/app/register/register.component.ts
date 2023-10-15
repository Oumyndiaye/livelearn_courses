import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsagerService } from '../services/usager.service';
import { Usager } from '../interfaces/usager';

import { ToastNotification } from '../notification/ToastNotification';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  usager: Usager | undefined;
  message: any = {
    type: '',
    message: ''
  };
  constructor(private usagerService: UsagerService, private formBuilder: FormBuilder, private route: Router) { }

  ngOnInit(): void {
    this.initForm();
    const base64EncodedString = 'IHRlc3RhcHBAbGl2ZWxlYXJuLm5sIDpUZXN0MTIzNDU2QCE=';

// Décodage de la chaîne base64 en binaire
const binaryData = atob(base64EncodedString);

// Conversion du binaire en chaîne Unicode
const decodedString = new TextDecoder().decode(new Uint8Array(binaryData.length).map((_, i) => binaryData.charCodeAt(i)));

console.log(decodedString);
  }
  
  onSubmit(): void {
    console.log(this.form.value);
    if (this.validateForm(this.form.value)) {
      this.usagerService.inscription(this.form.value).subscribe(
        usager => {
          let typeR = "error"
          if (<any>usager == "Votre compte utilisateur a été créé.") {
            typeR = "success"
          }
          this.usager = usager;
          ToastNotification.open({
            type: typeR,
            message: <any>usager
          });
          if (typeR == "success") {
            this.route.navigate(['/connexion']);
          }
        },
        error => {
          ToastNotification.open({
            type: 'error',
            message: error.error.message
          });
        });
    } else {
      ToastNotification.open({
        type: 'error',
        message: this.message.message
      });
    }
  }

  validateForm(usager: Usager): boolean {
    const { password, name, username, email, firstName,lastName } = usager;
    if (name == "") {
      this.message.message = 'Le nom  est obligatoire';
      return false;
    }
    if (password == "") {
      this.message.message = 'Le mot de passe est obligatoire';
      return false;
    }

    if (username == "") {
      this.message.message = 'Le prénom est obligatoire';
      return false;
    }

    if (email == "") {
      this.message.message = 'L\'email est obligatoire';
      return false;
    }
    if (this.form.controls['email'].status == "INVALID") {
      this.message.message = 'Vérifier le format du mail';
      return false;
    }

    if (firstName == "") {
      this.message.message = 'Le firstName est obligatoire';
      return false;
    }
    if (lastName == "") {
      this.message.message = 'Le lastName est obligatoire';
      return false;
    }
    return true;
  }

 

  initForm() {
    this.form = this.formBuilder.group({
      password: this.formBuilder.control("", Validators.required),
      firstName: this.formBuilder.control("", Validators.required),
      lastName: this.formBuilder.control("", Validators.required),
      name: this.formBuilder.control("", Validators.required),
      username: this.formBuilder.control("", Validators.required),
      email: this.formBuilder.control("", [Validators.email, Validators.required]),
    });
  }



}
