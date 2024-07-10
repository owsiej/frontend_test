import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-second-block',
  standalone: true,
  imports: [],
  templateUrl: './second-block.component.html',
  styleUrl: './second-block.component.scss',
})
export class SecondBlockComponent {
  @Output() addStoryEvent = new EventEmitter<string>();
  @Output() replaceStoryEvent = new EventEmitter<string>();

  addStory() {
    this.addStoryEvent.emit();
  }

  replaceStory() {
    this.replaceStoryEvent.emit();
  }
}
