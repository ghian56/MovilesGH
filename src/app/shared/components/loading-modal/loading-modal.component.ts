import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-loading-modal',
  templateUrl: './loading-modal.component.html',
  styleUrls: ['./loading-modal.component.scss'],
})
export class LoadingModalComponent implements OnInit {

  constructor(private modalController: ModalController) {}

  dismissModal() {
    this.modalController.dismiss();
  }
  ngOnInit() {}

}
