import { AfterViewInit, Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator, MatSort, MatTable } from '@angular/material';
import { TmlTableDataSource } from './tml-table-datasource';

@Component({
  selector: 'app-tml-table',
  templateUrl: './tml-table.component.html',
  styleUrls: ['./tml-table.component.scss']
})
export class TmlTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatTable, {static: false}) table: MatTable<any>;

  @Input() data: Array<Object> = [];
  @Input() displayedColumns: Array<String> = [];
  @Input() tableLable: string = '';
  @Input() pageSize: number = 5;

  dataSource: TmlTableDataSource;

  ngOnInit() {
    this.dataSource = new TmlTableDataSource(this.data);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
