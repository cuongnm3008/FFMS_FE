import { Component, OnInit } from '@angular/core';

// amCharts imports
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';


@Component({
  selector: 'app-thu-chi',
  templateUrl: './thu-chi.component.html',
  styleUrls: ['./thu-chi.component.css']
})
export class ThuChiComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  legend: any;

  listYear = [
    {
      id : 1,
      name : '2018'
    },
    {
      id : 2,
      name : '2019'
    },
    {
      id : 3,
      name : '2020'
    },
    {
      id : 4,
      name : '2021'
    },
    {
      id : 5,
      name : '2022'
    },
  ]



ngAfterViewInit() {


/* Chart code */
// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
let root = am5.Root.new("thuChi");


// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([
  am5themes_Animated.new(root)
]);


// Create chart
// https://www.amcharts.com/docs/v5/charts/xy-chart/
let chart = root.container.children.push(am5xy.XYChart.new(root, {
  panX: false,
  panY: false,
  wheelX: "panX",
  wheelY: "zoomX",
  layout: root.verticalLayout
}));


// Add legend
// https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
this.legend = chart.children.push(am5.Legend.new(root, {
  centerX: am5.p50,
  x: am5.p50
}))


// Data
let data = [{
  month: "Tháng 12",
  income: 23.5,
  expenses: 18.1
}, {
  month: "Tháng 11",
  income: 26.2,
  expenses: 22.8
}, {
  month: "Tháng 10",
  income: 30.1,
  expenses: 23.9
}, {
  month: "Tháng 9",
  income: 29.5,
  expenses: 25.1
}, {
  month: "Tháng 8",
  income: 24.6,
  expenses: 25
}];


// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
let yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(root, {
  categoryField: "month",
  renderer: am5xy.AxisRendererY.new(root, {
    inversed: true,
    cellStartLocation: 0.1,
    cellEndLocation: 0.9
  })
}));

yAxis.data.setAll(data);

let xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
  renderer: am5xy.AxisRendererX.new(root, {}),
  min: 0
}));


// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
function createSeries(field, name) {
  let series = chart.series.push(am5xy.ColumnSeries.new(root, {
    name: name,
    xAxis: xAxis,
    yAxis: yAxis,
    valueXField: field,
    categoryYField: "month",
    sequencedInterpolation: true,
    tooltip: am5.Tooltip.new(root, {
      pointerOrientation: "horizontal",
      labelText: "[bold]{name}[/]\n{categoryY}: {valueX}"
    })
  }));

  series.columns.template.setAll({
    height: am5.p100
  });


  series.bullets.push(function() {
    return am5.Bullet.new(root, {
      locationX: 1,
      locationY: 0.5,
      sprite: am5.Label.new(root, {
        centerY: am5.p50,
        text: "{valueX}",
        populateText: true
      })
    });
  });

  series.bullets.push(function() {
    return am5.Bullet.new(root, {
      locationX: 1,
      locationY: 0.5,
      sprite: am5.Label.new(root, {
        centerX: am5.p100,
        centerY: am5.p50,
        text: "{name}",
        fill: am5.color(0xffffff),
        populateText: true
      })
    });
  });

  series.data.setAll(data);
  series.appear();

  return series;
}

createSeries("income", "Tổng thu");
createSeries("expenses", "Tổng chi");


// Add legend
// https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
this.legend = chart.children.push(am5.Legend.new(root, {
  centerX: am5.p50,
  x: am5.p50
}));

this.legend.data.setAll(chart.series.values);


// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
  behavior: "zoomY"
}));
cursor.lineY.set("forceHidden", true);
cursor.lineX.set("forceHidden", true);


// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
chart.appear(1000, 100);

}


}
