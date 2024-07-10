import { Component } from '@angular/core';
import { FirstBlockComponent } from './blocks/first-block/first-block.component';
import { SecondBlockComponent } from './blocks/second-block/second-block.component';
import { ThirdBlockComponent } from './blocks/third-block/third-block.component';

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [FirstBlockComponent, SecondBlockComponent, ThirdBlockComponent],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.scss',
})
export class MainContentComponent {}
