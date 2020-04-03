import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ILocation } from '@app/common/location';
import { IPerson } from '@app/common/person';

export interface IGroupTemplateData {
  location: ILocation,
  people: IPerson[]
}

@Component({
  selector: 'app-group-template',
  templateUrl: './group-template.component.html',
  styleUrls: ['./group-template.component.scss']
})
export class GroupTemplateComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<GroupTemplateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IGroupTemplateData
  ) { }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }

}
