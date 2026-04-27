import { Component, signal } from '@angular/core';
import { DataServices } from '../../../../core/services/data-services';
import { Meeting } from '../../../../core/models/meeting';

@Component({
  selector: 'app-event',
  imports: [],
  templateUrl: './event.html',
  styles: ``,
})
export class Event {
  fondoId: number = 1;
  meetings = signal<Meeting[]>([]);

  constructor(
    private dataService: DataServices
  ) {}

  ngOnInit() {
    this.getMeetingAll();
  }

  async getMeetingAll() {
    const data = await this.dataService.reunionProxima(this.fondoId).then(data => data);
    this.meetings.set(data);
  }

}
