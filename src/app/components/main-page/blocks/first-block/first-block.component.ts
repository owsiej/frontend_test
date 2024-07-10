import { Component, EventEmitter, Output } from '@angular/core';
import { FirstBlockRadioOptions } from '../../../../models/first-block-options';

@Component({
  selector: 'app-first-block',
  standalone: true,
  imports: [],
  templateUrl: './first-block.component.html',
  styleUrl: './first-block.component.scss',
})
export class FirstBlockComponent {
  @Output() chosenStory = new EventEmitter<number>();

  public radioOptions: Array<Array<string>> = Object.entries(
    FirstBlockRadioOptions
  );

  getChosenStory(event: Event) {
    const storyNumber = +(event.target as HTMLInputElement).value;
    this.chosenStory.emit(storyNumber);
  }
}
