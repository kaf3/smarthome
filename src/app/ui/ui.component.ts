import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
import {SidenavService} from '../sevices/sidenav.service';

@Component({
    selector: 'app-ui',
    templateUrl: './ui.component.html',
    styleUrls: ['./ui.component.scss'],
})
export class UiComponent implements OnInit, OnDestroy {
    @ViewChild('sidenav') sideNav: MatSidenav;
    title = 'Smart Home';

    constructor(private readonly sidenavService: SidenavService) {}

    ngOnInit(): void {}

    public onOpen() {
        this.sidenavService.setState(true);
    }

    public onClose() {
        this.sidenavService.setState(false);
    }

    ngOnDestroy(): void {
        if (!!this.sidenavService.sidenavSubject) {
            this.sidenavService.sidenavSubject.complete();
        }
    }
}
