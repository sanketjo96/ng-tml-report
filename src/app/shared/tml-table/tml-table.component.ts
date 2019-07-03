import { AfterViewInit, Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { MatPaginator, MatSort, MatTable } from '@angular/material';
import { TmlTableDataSource } from './tml-table-datasource';
import { UtilService } from 'src/app/core/util/util.service';
import { ISortCol } from 'src/app/report/report.data';

interface RefCol {
  name: string;    
}

@Component({
  selector: 'tml-table',
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
  @Input() defaultColToSort: ISortCol;
  @Input() colDef?: any = null;
 
  @Output() tableRowClick = new EventEmitter<RefCol>();

  dataSource: TmlTableDataSource;

  constructor(private utilServ: UtilService) {

  }

  ngOnInit() {
    this.dataSource = new TmlTableDataSource(this.data, this.utilServ);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  onRowClick(row) {
    this.tableRowClick.emit(row);
  }
}
