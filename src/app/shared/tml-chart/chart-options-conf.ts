import { Dset } from 'src/app/report/charts/chart.data';

export const chartOptions = {
  maintainAspectRatio: false,
  responsive: true,
  title: {
    display: true,
  },
  legend: {
    display: false
  },
  hover: {
    animationDuration: 0
  },
  animation: {
    duration: 1,
    onComplete: function () {
      const chartInstance = this.chart;
      const ctx = chartInstance.ctx;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'bottom';
      this.data.datasets.forEach(function (dataset: Dset, i) {
        if (dataset.showMesureOnTop) {
          var meta = chartInstance.controller.getDatasetMeta(i);
          meta.data.forEach(function (bar, index) {
            var data = dataset.data[index];
            ctx.fillText(data, bar._model.x, bar._model.y - 5);
          });
        }
      });
    }
  },
  tooltips: {
    "enabled": false
  },
  scales: {
    yAxes: [
      {
        id: 'left',
        position: 'left',
        ticks: {
          min: 0,
        }
      },
      {
        id: 'right',
        position: 'right',
        gridLines: {
          display: false
        },
        ticks: {
          min: 0,
          max: 100,
          callback: (value, index, values) => {
            return value + "%";
          }
        }
      }
    ]
  }
}