import React, { Component } from 'react';
import Chart from "react-apexcharts";

type ChartProps = {
  value: {
    key: number;
    color: string;
    chartColor: string;
  };
};

type ChartState = {
  series: any[];
  options: any;
};

class CircleChart extends Component<ChartProps, ChartState> {

  constructor(props: ChartProps) {
    super(props);
    const { value } = props;
    let unit = '%';
    function formatNumber(num:number) {
      if (num >= 1000) {
        unit = 'k';
        return (num / 1000).toFixed(1);
      } 
      return num
    }

    const newValue = formatNumber(value.key);

    this.state = {
      series: [Number(newValue)],
      options: {
        chart: {
          type: 'radialBar',
          offsetY: -20,
          sparkline: {
            enabled: true
          },
          foreColor: value.color
        },
        plotOptions: {
          radialBar: {
            startAngle: -140,
            endAngle: 140,
            track: {
              background: "#ffffff1a",
              strokeWidth: '100%',
              margin: 5, // margin is in pixels
              dropShadow: {
                enabled: true,
                top: 2,
                left: 0,
                color: '#999',
                opacity: 1,
                blur: 1
              }
            },
            dataLabels: {
              name: {
                show: false
              },
              value: {
                offsetY: 4,
                offsetX: 4,
                fontSize: '22px',
                formatter: function (val:number) {
                  // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
                  return val + unit;
                }
              }
            }
          }
        },
        grid: {
          padding: {
            top: -10
          }
        },
        fill: {
          // type: 'gradient',
          colors: [value.chartColor],
        },
        value: {
          color: '#111',
          fontSize: '36px',
          show: true,
          formatter: function (val:number) {
            return val + 'k%';
          },
        },
        labels: ['Average Results'],
      },
    };
  }


  render() {

    return (
      <div className="radialbar">
        <Chart
          options={this.state.options}
          series={this.state.series}
          type="radialBar"
          height="100%"
        />
      </div>
    );
  }
}

export default CircleChart;