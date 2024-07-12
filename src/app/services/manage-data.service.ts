import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { StoryAction } from '../models/story-action';

@Injectable({
  providedIn: 'root',
})
export class ManageDataService {
  private isPersonalDataVisibleSubject$ = new BehaviorSubject<boolean>(false);
  public isPersonalDataVisible$ =
    this.isPersonalDataVisibleSubject$.asObservable();

  private currentStory$ = new Subject<StoryAction>();
  public story$ = this.currentStory$.asObservable();

  showPersonalData() {
    this.isPersonalDataVisibleSubject$.next(true);
  }
  hidePersonalData() {
    this.isPersonalDataVisibleSubject$.next(false);
  }

  addStoryAction(story: StoryAction) {
    this.currentStory$.next(story);
  }
}
