import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jsonRoot } from '../const/json-file-root';
import { Story } from '../models/story';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor(private _http: HttpClient) {}

  getStoriesFromFile(): Observable<Story[]> {
    return this._http
      .get<Story[]>(jsonRoot)
      .pipe(
        catchError(() => throwError(() => 'Error during loading json file.'))
      );
  }

  addStoriesToLocalStorage(stories: Story[]): void {
    localStorage.setItem('stories', JSON.stringify(stories));
  }

  get stories(): Story[] {
    const stories = localStorage.getItem('stories');
    if (!stories) {
      throw new Error('Could not find stories in local storage.');
    }
    return JSON.parse(stories);
  }

  set stories(stories: Story[]) {
    localStorage.setItem('stories', JSON.stringify(stories));
  }

  getChosenStory(storyNumber: number): Story | null {
    const story = this.stories[storyNumber];

    if (story.isAvailable) {
      this.updateStoryStatus(story.id);
      return story;
    }
    return null;
  }

  getRandomStory(): Story | null {
    const availableStories = this.stories.filter((story) => story.isAvailable);
    if (availableStories.length === 0) {
      return null;
    }
    const randomNumber = Math.floor(Math.random() * availableStories.length);
    const foundStory = availableStories[randomNumber];
    this.updateStoryStatus(foundStory.id);
    return foundStory;
  }

  updateStoryStatus(storyId: number): void {
    const storiesToUpdate = this.stories;
    const storyIndexToUpdate = storiesToUpdate.findIndex(
      (story) => story.id === storyId
    );
    storiesToUpdate[storyIndexToUpdate].isAvailable = false;
    this.stories = storiesToUpdate;
  }

  resetStoriesStatus() {
    const updatedStories = this.stories.map((story) => {
      story.isAvailable = true;
      return story;
    });
    this.stories = updatedStories;
  }
}
