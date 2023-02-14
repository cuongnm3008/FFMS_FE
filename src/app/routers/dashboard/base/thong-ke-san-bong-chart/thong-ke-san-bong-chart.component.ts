import { Component, OnInit } from '@angular/core';

import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import {
  FootballFieldInputDto,
  FoundationFieldsService,
} from 'src/app/shared/service-proxies/foundation-management-service';
import {
  FootballActive,
  FootballFielDto,
} from 'src/app/shared/service-proxies/system-management-service';
import { any } from '@amcharts/amcharts5/.internal/core/util/Array';
@Component({
  selector: 'app-thong-ke-san-bong-chart',
  templateUrl: './thong-ke-san-bong-chart.component.html',
  styleUrls: ['./thong-ke-san-bong-chart.component.css'],
})
export class ThongKeSanBongChartComponent implements OnInit {
  constructor(private _footballFieldFields: FoundationFieldsService) { }

  listFootballField: FootballFielDto[] = [];
  listFootballFieldActive: FootballActive[] = [];
  objFilter = new FootballFieldInputDto();
  lstdata: any[] = [];

  ngOnInit(): void {
    this.fetchData();
  }

  fetchChart() {
    let root = am5.Root.new('thongkesanbongchart');
    root.setThemes([am5themes_Animated.new(root)]);
    // debugger;
    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: false,
        wheelX: 'panX',
        wheelY: 'zoomX',
        layout: root.verticalLayout,
      })
    );

    // Add scrollbar
    // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
    // chart.set(
    //   'scrollbarX',
    //   am5.Scrollbar.new(root, {
    //     orientation: 'horizontal',
    //   })
    // );

    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    let xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: 'country',
        renderer: am5xy.AxisRendererX.new(root, {}),
        tooltip: am5.Tooltip.new(root, {
          themeTags: ['axis'],
          animationDuration: 200,
        }),
      })
    );

    xAxis.data.setAll(this.lstdata);
    // debugger;
    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        min: 0,
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/

    let series0 = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: 'Income',
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: 'year2004',
        categoryXField: 'country',
        clustered: false,
        tooltip: am5.Tooltip.new(root, {
          labelText: '2004: {valueY}',
        }),
      })
    );

    series0.columns.template.setAll({
      width: am5.percent(80),
      tooltipY: 0,
    });

    series0.data.setAll(this.lstdata);

    let series1 = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: 'Income',
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: 'year2005',
        categoryXField: 'country',
        clustered: false,
        tooltip: am5.Tooltip.new(root, {
          labelText: '2005: {valueY}',
        }),
      })
    );

    series1.columns.template.setAll({
      width: am5.percent(50),
      tooltipY: 0,
    });

    series1.data.setAll(this.lstdata);

    let cursor = chart.set('cursor', am5xy.XYCursor.new(root, {}));

    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    chart.appear(1000, 100);
    series0.appear();
    series1.appear();
  }

  fetchData() {
    this._footballFieldFields
      .getListFootballField(
        this.objFilter.status,
        this.objFilter.name,
        (this.objFilter.pageIndex = 0),
        (this.objFilter.pageSize = 100),
        this.objFilter.sort,
        this.objFilter.sortBy,
        this.objFilter.foundationType,
        (this.objFilter.foundationId = 1),
        this.objFilter.textSearch
      )
      .subscribe((result) => {
        if (result) {
          this.listFootballField = result['content'];
          this.listFootballField = this.listFootballField.filter(
            (s) => s.status != '0'
          );
          this.listFootballField.forEach((element) => {
            this.lstdata.push({
              country: element.name,
              year2005: 3.4,
              year2004: 4.0,
            });
          });
          this.fetchChart();
        }
      });
  }
}
