import { WarehouseManagementService } from 'src/app/shared/service-proxies/warehouse-management-service';
import { Component, OnInit } from '@angular/core';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

@Component({
  selector: 'app-order-chart',
  templateUrl: './order-chart.component.html',
  styleUrls: ['./order-chart.component.css']
})
export class OrderChartComponent implements OnInit {

  constructor(
   private _orderService:WarehouseManagementService
  ) { }

    date : Date = new Date();
   data: any[] = [];
  year = this.date.getFullYear();
  ngOnInit(): void {
    this.fetData();
  }
  fetchChart(){
    let root = am5.Root.new("orderchart");


// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([
  am5themes_Animated.new(root)
]);


// Create chart
// https://www.amcharts.com/docs/v5/charts/xy-chart/
let chart = root.container.children.push(am5xy.XYChart.new(root, {
  panX: true,
  panY: true,
  wheelX: "panX",
  wheelY: "zoomX",
  layout: root.verticalLayout,
  pinchZoomX:true
}));

// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
  behavior: "none"
}));
cursor.lineY.set("visible", false);

let colorSet = am5.ColorSet.new(root, {});

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
let xRenderer = am5xy.AxisRendererX.new(root, {});
xRenderer.grid.template.set("location", 0.5);
xRenderer.labels.template.setAll({
  location: 0.5,
  multiLocation: 0.5
});

let xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
  categoryField: "year",
  renderer: xRenderer,
  tooltip: am5.Tooltip.new(root, {})
}));

xAxis.data.setAll(this.data);

let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  maxPrecision: 0,
  renderer: am5xy.AxisRendererY.new(root, {})
}));

let series = chart.series.push(am5xy.LineSeries.new(root, {
  xAxis: xAxis,
  yAxis: yAxis,
  valueYField: "value",
  categoryXField: "year",
  tooltip: am5.Tooltip.new(root, {
    labelText: "{valueY} đơn hàng đã thanh toán",
    dy:-5
  })
}));

series.strokes.template.setAll({
  templateField: "strokeSettings",
  strokeWidth: 2
});

series.fills.template.setAll({
  visible: true,
  fillOpacity: 0.5,
  templateField: "fillSettings"
});


series.bullets.push(function() {
  return am5.Bullet.new(root, {
    sprite: am5.Circle.new(root, {
      templateField: "bulletSettings",
      radius: 5
    })
  });
});

series.data.setAll(this.data);
series.appear(1000);

// Add scrollbar
// https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
// chart.set("scrollbarX", am5.Scrollbar.new(root, {
//   orientation: "horizontal",
//   marginBottom: 20
// }));

// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
chart.appear(1000, 100);
  }
  fetData(){
    this._orderService.getAllOrderOfMonth(this.date.getFullYear())
    .subscribe((result) => {
      // console.log(result.object);
      if(result){
        result.object.forEach(element => {
        this.data.push({
        year: "Tháng " + element.month,
        value:element.invoicePaid,
        // motorcycles:element.slotDeposit,
        // bicycles:element.slotCancel,
        })
      });
      this.fetchChart();
      }
    }
    );
  }
}
