import { Component, OnInit } from '@angular/core';
import { ManageDataService } from '../../services/manage-data.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  public isPersonalDataVisible: boolean = false;
  public dataSubscription!: Subscription;

  constructor(private _dataService: ManageDataService) {}
  ngOnInit(): void {
    this.dataSubscription = this._dataService.isPersonalDataVisible$.subscribe(
      (value) => {
        this.isPersonalDataVisible = value;
      }
    );
  }
}
