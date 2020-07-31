import { Component, OnInit, AfterViewInit, Input, ElementRef } from '@angular/core';
import { createChart, CrosshairMode, PriceScaleMode, LineStyle } from 'lightweight-charts';

import * as data from './data';

@Component({
  selector: 'greet-comp',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  width : number ;
  firstChartHeight : number;
  secondChartHeight : number;
  noOfEntries:number;
  firstLineColor : string;
  secondLineColor : string;
  thirdLineColor : string;
  fourthLineColor:string;

  constructor(private _elementRef: ElementRef){
    let native = this._elementRef.nativeElement;
    this.width = +native.getAttribute("width");
    this.firstChartHeight = +native.getAttribute("firstChartHeight");
    this.secondChartHeight = +native.getAttribute("secondChartHeight")
    this.noOfEntries = +native.getAttribute("noOfEntries");
    this.firstLineColor = native.getAttribute("firstLineColor");
    this.secondLineColor = native.getAttribute("secondLineColor");
    this.thirdLineColor = native.getAttribute("thirdLineColor");
    this.fourthLineColor = native.getAttribute("fourthLineColor")
    console.log(this.width);
}

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    var chart = createChart(document.body, {
      width: this.width ,
      height: this.firstChartHeight,
      layout: {
        backgroundColor: '#000000',
        textColor: 'rgba(255, 255, 255, 0.9)',
      },
      grid: {
        vertLines: {
          color: 'rgba(197, 203, 206, 0.5)',
        },
        horzLines: {
          color: 'rgba(197, 203, 206, 0.5)',
        },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
      },
      rightPriceScale: {
        borderColor: 'rgba(197, 203, 206, 0.8)',
      },
      timeScale: {
        borderColor: 'rgba(197, 203, 206, 0.8)',
      },
    });
    var chart2 = createChart(document.body, {
      width: this.width,
      height: this.secondChartHeight,
      layout: {
        backgroundColor: '#000000',
        textColor: 'rgba(255, 255, 255, 0.9)',
      },
      grid: {
        vertLines: {
          color: 'rgba(197, 203, 206, 0.5)',
        },
        horzLines: {
          color: 'rgba(197, 203, 206, 0.5)',
        },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
      },
      rightPriceScale: {
        borderColor: 'rgba(197, 203, 206, 0.8)',
      },
      timeScale: {
        borderColor: 'rgba(197, 203, 206, 0.8)',
      },
    });
    const candleSeries = chart.addCandlestickSeries({
      upColor: '#26a69a',
      downColor: '#FF6347',
      borderVisible: false,
      wickVisible: true,
      borderColor: '#FFFFFF',
      wickColor: '#FFFFFF',
      borderUpColor: '#4682B4',
      borderDownColor: '#A52A2A',
      wickUpColor: '#4682B4',
      wickDownColor: '#A52A2A',
     });
    var volumeSeries = chart2.addHistogramSeries({
    color: '#26a69a',
    priceFormat: {
      type: 'volume',
    },
    scaleMargins: {
      top: 0.8,
      bottom: 0,
    },
  });
    var lineSeries = chart2.addLineSeries({
      color: this.firstLineColor,
      lineWidth: 2,
    });
    var lineSeries1 = chart.addLineSeries({
      color:this.secondLineColor,
      lineWidth: 2,
    });
    var lineSeries2 = chart.addLineSeries({
      color: this.thirdLineColor,
      lineWidth: 2,
    });
    var lineSeries3 = chart.addLineSeries({
      color : this.fourthLineColor,
      lineWidth: 2,
    });



    chart.timeScale().subscribeVisibleTimeRangeChange(syncHandler)
    function syncHandler(e) {
      var range = chart.timeScale().getVisibleRange();
      var range2 = chart2.timeScale().getVisibleRange();

      /* var barSpacing1 = chart.timeScale().getBarSpacing(); */
      var scrollPosition1 = chart.timeScale().scrollPosition();

      chart2.timeScale().applyOptions({ rightOffset: scrollPosition1})
  }
    chart2.timeScale().subscribeVisibleTimeRangeChange(syncHandler2)
    function syncHandler2(e) {

      var range = chart.timeScale().getVisibleRange();
      var range2 = chart2.timeScale().getVisibleRange();

      /* var barSpacing2 = chart2.timeScale().getBarSpacing(); */
      var scrollPosition2 = chart2.timeScale().scrollPosition();

      chart.timeScale().applyOptions({ rightOffset: scrollPosition2})
  }

    const lineSeriesData  =data.lineSeriesData;
    const lineSeries1Data =data.lineSeries1Data;
    const lineSeries2Data =data.lineSeries2Data;
    const lineSeries3Data =data.lineSeries3Data;
    const candleSeriesData =data.candleSeriesData;
    const volumeSeriesData =data.volumeSeriesData;

    lineSeries3.setData(lineSeries3Data)
    lineSeries.setData(lineSeriesData);
    lineSeries1.setData(lineSeries1Data);
    lineSeries2.setData(lineSeries2Data);

    candleSeries.setData(candleSeriesData);
    volumeSeries.setData(volumeSeriesData);

    chart.timeScale().setVisibleLogicalRange({
      from: candleSeriesData.length -this.noOfEntries,
      to : candleSeriesData.length
    })
    chart2.timeScale().setVisibleLogicalRange({
      from: volumeSeriesData.length -this.noOfEntries,
      to : volumeSeriesData.length
    })
  }
}
