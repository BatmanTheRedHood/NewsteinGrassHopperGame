import { Component, OnInit } from '@angular/core';
import { DemoService } from 'src/app/services/demo.service';
import { Observable } from 'rxjs';
import { LoginModel } from 'src/app/model/user/login-model';
import { Company } from 'src/app/model/demo/company';

@Component({
    selector: 'app-game-setup',
    templateUrl: './game-setup.component.html',
    styleUrls: ['./game-setup.component.css']
})
export class GameSetupComponent implements OnInit {

    public title: string;
    public loginModel: LoginModel;
    public companies: Company[];

    constructor(private demoService: DemoService) {
        this.title = 'Newstein Games';
        this.loginModel = new LoginModel();
    }

    public ngOnInit(): void {
        this.demoService.demoLocalGet().subscribe(
            reposnse => {
                console.log("API request succeeded!");
                console.log(reposnse);

                if (reposnse.isValid == true) {
                    this.companies = reposnse.data;
                }
            },
            error => {
                console.log("API request failed");
                console.log(error);
            }
        )
    }

    public onSubmit(): void {
        console.log(this.loginModel);

        this.demoService.demoPostRequest(this.loginModel).subscribe(
            data => {
                console.log(data);
                this.title = data;
            },
            error => {
                console.log("API request failed");
                console.log(error);
            }
        )
    }
}
