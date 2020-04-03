import { Component, OnInit, Input, ChangeDetectionStrategy, HostBinding } from '@angular/core';
import { ILocation } from '@app/common/location';
import { IPerson } from '@app/common/person';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CellComponent implements OnInit {
  @Input()
  location: ILocation;

  @Input()
  people: IPerson[];

  @Input()
  size: number;

  @HostBinding("style.width") width: string;
  @HostBinding("style.height") height: string;
  @HostBinding("class.empty") empty: boolean;
  @HostBinding("attr.title") title: string;

  private readonly MIN_BOX_SIZE = 5;
  boxSize: number;
  get boxSizePX() {
    return this.boxSize + 'px';
  }

  constructor() { }

  ngOnInit(): void {
    this.refresh();
  }

  private refresh() {
    try {
      if (!this.location) { throw new Error("Missing location property"); }
      if (!this.people) { throw new Error("Missing people property"); }
      if (!this.size) { throw new Error("Missing size property"); }

      this.width = `${this.size}px`;
      this.height = this.width;
      this.empty = this.people.length === 0;
      this.title = `${this.people.length} ${this.people.length === 1 ? 'person' : 'people'} at (${this.location.x},${this.location.y})`;

      this.boxSize = this.people.length === 0 ? 0 : ((this.size / this.people.length) | 0)
      if (this.people.length > 2) {
        this.boxSize -= (this.people.length % 2);
      }

      //ensure boxes are no smaller than min box size.
      //and no bigger than 50% of the size
      this.boxSize = Math.min(
        Math.max(this.boxSize, this.MIN_BOX_SIZE),
        ((this.size / 2) | 0) //truncate
      );

    } catch (error) {
      console.warn("CellComponent - unable to render correctly", {error, location: this.location, people: this.people, size: this.size, boxSize: this.boxSize});
    }
  }
}
