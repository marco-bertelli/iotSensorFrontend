import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ngx-status-card',
  styleUrls: ['./status-card.component.scss'],
  template: `
    <nb-card matRipple (click)="change()" [ngClass]="{'off': !on}">
      <div class="icon-container">
        <div class="icon status-{{ type }}">
          <ng-content></ng-content>
        </div>
      </div>

      <div class="details">
        <div class="title h5">{{ title }}</div>
        <div class="status paragraph-2">{{ on ? 'SELECTED' : 'UNSELECTED' }}</div>
      </div>
    </nb-card>
  `,
})
export class StatusCardComponent {

  @Input() title: string;
  @Input() type: string;
  @Input() on = true;

  @Output() changeStatus = new EventEmitter<any>();

  change(){
    this.on = !this.on;

    this.changeStatus.emit({title: this.title, status: this.on})
  }
}
