import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { StoryAction } from '../../../../models/story-action';

@Component({
  selector: 'app-third-block',
  standalone: true,
  imports: [],
  templateUrl: './third-block.component.html',
  styleUrl: './third-block.component.scss',
})
export class ThirdBlockComponent implements OnInit, OnDestroy {
  public stories: string[] = [];
  @Input() storyObservable!: Observable<StoryAction>;
  private storySub!: Subscription;
  constructor() {}
  ngOnInit(): void {
    this.storySub = this.storyObservable.subscribe((value) => {
      if (value.action === 'add') {
        this.stories.push(value.story.content);
      } else if (value.action === 'replace') {
        this.stories = [value.story.content];
      }
    });
  }
  ngOnDestroy(): void {
    this.storySub.unsubscribe();
  }
}
