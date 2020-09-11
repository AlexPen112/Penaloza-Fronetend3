import { LitElement, html } from "lit-element";
import { HeaderView } from "./header-view";
var Chart = require("chart.js");

class LineGraph extends HeaderView {
  static get properties() {
    return {
      myChart: { type: Object },
    };
  }

  firstUpdated() {
    const ctx = this.renderRoot.querySelector("#line-chart").getContext("2d");

    let dates = this.credit.map((d) => d[0]);
    let score = this.credit.map((d) => d[1]);

    dates = dates.slice(5, 11);
    score = score.slice(5, 11);

    this.myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: dates,
        datasets: [
          {
            label: "Credit Score",
            data: score,
            backgroundColor: ["rgba(143, 203, 183, 0.2)"],
            borderColor: ["rgba(41, 211, 129, 1)"],
            pointBackgroundColor: [
              "rgba(41, 211, 129,1)",
              "rgba(41, 211, 129,1)",
              "rgba(41, 211, 129,1)",
              "rgba(41, 211, 129,1)",
              "rgba(41, 211, 129,1)",
              "rgba(41, 211, 129,1)",
            ],
          },
        ],
      },
      options: {
        scales: {
          xAxes: [
            {
              gridLines: { display: false },
            },
          ],
          yAxes: [
            {
              gridLines: {
                drawBorder: false,
              },
              ticks: {
                suggestedMin: 400,
                suggestedMax: 900,
                stepSize: 100,
              },
            },
          ],
        },
      },
    });
  }

  render() {
    return html`<div>
      <canvas id="line-chart" width="675" height="300"></canvas>
    </div>`;
  }
}

customElements.define("line-graph", LineGraph);
