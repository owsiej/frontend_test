import { Component } from '@angular/core';
import { ManageDataService } from '../../services/manage-data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  public isOptionButtonClicked: boolean = false;

  constructor(private _dataService: ManageDataService) {}

  handleButtonClick() {
    this.isOptionButtonClicked = !this.isOptionButtonClicked;
  }

  handlePersonalDataButtonClick() {
    this._dataService.showPersonalData();
  }

  handleResetPageSettings() {
    this._dataService.hidePersonalData();
    this._dataService.addStoryAction({
      story: '',
      action: 'reset',
    });
  }
}
