import { LitElement, html } from "lit-element";
import { HeaderView } from "./header-view";

var { Gauge } = require("gaugeJS");

class CreditGauge extends HeaderView {
  static get properties() {
    return {
      myGauge: { type: Object },
    };
  }

  firstUpdated() {
    var opts = {
      angle: -0.2,
      lineWidth: 0.05,
      radiusScale: 1,
      pointer: {
        length: 0.5,
        strokeWidth: 0.0,
        color: "#ffffff00",
        iconPath:
          "https://i7.pngguru.com/preview/986/173/67/circle-clip-art-circle-thumbnail.jpg",
        iconScale: 0.09,
        iconAngle: 40.0,
      },
      limitMax: false,
      limitMin: false,
      staticZones: [
        { strokeStyle: "#D3334E", min: 300, max: 499 },
        { strokeStyle: "#F03E3E", min: 500, max: 559 },
        { strokeStyle: "#f5a724", min: 560, max: 669 },
        { strokeStyle: "#f0c432", min: 670, max: 749 },
        { strokeStyle: "#29d381", min: 750, max: 809 },
        { strokeStyle: "#249469", min: 809, max: 850 },
      ],

      generateGradient: true,
      highDpiSupport: true,
    };
    var target = this.renderRoot.querySelector("#guage");
    let score = this.credit.map((d) => d[1]);
    score = score[score.length - 1];
    this.myGauge = new Gauge(target).setOptions(opts);
    this.myGauge.maxValue = 850;
    this.myGauge.setMinValue(300);
    this.myGauge.animationSpeed = 32;
    this.myGauge.set(score);
  }
  render() {
    let score = this.credit.map((d) => d[1]);
    score = score[score.length - 1];
    console.log(this.gettingStatus());
    return html`
      <style>
        .numScore {
          font-size: 35px;
        }
        .score {
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
        }
        .outside {
          position: relative;
          float: left;
          width: 380px;
          height: 320px;
          margin: 0 20px 20px 0;
          -webkit-border-radius: 10px;
          -moz-border-radius: 10px;
          border-radius: 10px;
          clear: both;
        }
        .inside {
          position: absolute;
          top: 65px;
          left: 118px;
          right: 0;
          text-align: center;
          color: black;
          font-family: "Amaranth", sans-serif;
        }
      </style>
      <div class="guageBody">
        <div class="outside">
          <canvas id="guage" width="500" height="250"></canvas>
          <div class="inside">
            <div class="data">
              <div class="score">
                <h1 class="numScore">${score}</h1>
                ${this.getUpdate()}
                <img src=${this.getProgress()} height="13px" />
              </div>
              <div class="rating-info">
                Your Credit Rating
                <h2 id="status">${this.status.toUpperCase()}</h2>
                <p>Vantage Score 3.0</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
  async gettingStatus() {
    let current = await this.credit.map((d) => d[1]);
    current = current[current.length - 1];
    let colorConfig = this.renderRoot.querySelector("#status");

    if (current >= 300 && current <= 499) {
      colorConfig.style.color = "#D3334E";
    } else if (current >= 550 && current <= 559) {
      colorConfig.style.color = "#F03E3E";
    } else if (current >= 560 && current <= 669) {
      colorConfig.style.color = "#f5a724";
    } else if (current >= 670 && current <= 749) {
      colorConfig.style.color = "#f0c432";
    } else if (current >= 750 && current <= 809) {
      colorConfig.style.color = "#29d381";
    } else {
      colorConfig.style.color = "#249469";
    }

    return colorConfig;
  }
  getUpdate() {
    let score = this.credit.map((d) => d[1]);
    let currScore = score[score.length - 1];
    let lastScore = score[score.length - 2];
    let diff = currScore - lastScore;
    return diff;
  }
  getProgress() {
    let num = this.getUpdate();
    let trend, img;
    if (num > 0) {
      trend = true;
    } else {
      trend = false;
    }
    trend
      ? (img = "https://www.iconsdb.com/icons/preview/green/triangle-xxl.png")
      : "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRI2On_stEqp2QAwCpVq21xywof4T4UnX96PQ&usqp=CAU";

    return img;
  }
}

customElements.define("credit-guage", CreditGauge);
