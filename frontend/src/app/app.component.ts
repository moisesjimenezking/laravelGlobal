import { Component, ViewContainerRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ModalService } from './lib/modal/modal.service';
import { AlertService } from './lib/alert/alert.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Global Tecnologías Academy';

  constructor(private readonly vcr: ViewContainerRef,
    private readonly modalService: ModalService,
    private readonly alertService: AlertService
  ) {
    // Se establece inicio de servicios que injectan contenido //
    modalService.init({ viewContainerRef: vcr });
    alertService.init({ viewContainerRef: vcr });
  }
}
