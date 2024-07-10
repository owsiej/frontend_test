import { Component } from '@angular/core';
import { FirstBlockComponent } from './blocks/first-block/first-block.component';
import { SecondBlockComponent } from './blocks/second-block/second-block.component';
import { ThirdBlockComponent } from './blocks/third-block/third-block.component';
import { LocalStorageService } from '../../services/local-storage.service';
import { Subject } from 'rxjs';
import { Story } from '../../models/story';
import { StoryAction } from '../../models/story-action';

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [FirstBlockComponent, SecondBlockComponent, ThirdBlockComponent],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.scss',
})
export class MainContentComponent {
  constructor(private _localStorage: LocalStorageService) {}

  private currentStoryNumber!: number;
  private currentStory$ = new Subject<StoryAction>();
  public story$ = this.currentStory$.asObservable();
  ngOnInit(): void {
    this._localStorage
      .getStoriesFromFile()
      .subscribe((value) => this._localStorage.addStoriesToLocalStorage(value));
  }

  handleStoryChange(storyNumber: number) {
    this.currentStoryNumber = storyNumber;
  }

  getCurrentStory(): Story | null {
    switch (this.currentStoryNumber) {
      case undefined:
        alert('Choose one of the options first.');
        return null;
      case 2:
        const randomStory = this._localStorage.getRandomStory();
        if (randomStory === null) {
          alert('You have already chosen all available stories.');
          return null;
        } else {
          return randomStory;
        }
      default:
        const story = this._localStorage.getChosenStory(
          this.currentStoryNumber
        );
        if (story === null) {
          alert('Chosen story is already in block.');
          return null;
        } else {
          return story;
        }
    }
  }

  handleAddStory() {
    const story = this.getCurrentStory();
    if (story) {
      this.currentStory$.next({
        story: story,
        action: 'add',
      });
    }
  }
  handleReplaceStory() {
    this._localStorage.resetStoriesStatus();
    const story = this.getCurrentStory();
    if (story) {
      this.currentStory$.next({
        story: story,
        action: 'replace',
      });
    }
  }
}
