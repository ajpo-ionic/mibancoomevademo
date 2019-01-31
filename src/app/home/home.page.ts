import { Component } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private http : HttpClient,private iab: InAppBrowser){

  }
  public cliente = {
      "identificador": ""
  };

  onClickPagar(){
    console.log("Iniciando proceso de pago con el sistema");
        var opt = {
            "headers": {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": "Basic Y29vbWV2YW1vdmlsOlBARjRzc0FjYzNzcw=="
            }
        };
        var url_auth = 'https://pruebasdesarrollo.coomeva.com.co/psehosting.back/oauth/token?username=client&password=movil123&grant_type=password';
        this.http.post(url_auth, null, opt).subscribe(data => {
          var access_token = data["access_token"];
            console.log(access_token);
            var info_json = '{ "cedula" : "' + this.cliente.identificador + '" , "token" : "' + access_token + '" }';
            console.log(info_json);
            var token_base64 = btoa(info_json);
            var url_pago = 'https://pruebasdesarrollo.coomeva.com.co/psehosting/#/access/';
            url_pago = url_pago + token_base64;
            var options_iab = 'zoom=no';
            var browser = this.iab.create(url_pago, '_self', options_iab);
            console.log(browser);
         }, error => {
          console.log(error);
        });
  }
}
