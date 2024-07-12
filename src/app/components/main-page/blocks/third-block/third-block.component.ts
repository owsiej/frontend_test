import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ManageDataService } from '../../../../services/manage-data.service';

@Component({
  selector: 'app-third-block',
  standalone: true,
  imports: [],
  templateUrl: './third-block.component.html',
  styleUrl: './third-block.component.scss',
})
export class ThirdBlockComponent implements OnInit, OnDestroy {
  public stories: string[] = [];
  private storySub!: Subscription;
  constructor(private _dataService: ManageDataService) {}
  ngOnInit(): void {
    this.storySub = this._dataService.story$.subscribe((value) => {
      if (value.action === 'add') {
        this.stories.push(value.story.content);
        this.stories.sort();
      } else if (value.action === 'replace') {
        this.stories = [value.story.content];
      } else if (value.action === 'reset') {
        this.stories = [];
      }
    });
  }
  ngOnDestroy(): void {
    this.storySub.unsubscribe();
  }
}
