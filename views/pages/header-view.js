import { LitElement, html } from "lit-element";

export class HeaderView extends LitElement {
  static get properties() {
    return {
      credit: { type: Array },
      status: { type: String },
    };
  }

  constructor() {
    super();
    this.credit = [
      ["Sept 2019", 420],
      ["Oct 2019", 540],
      ["Nov 2019", 550],
      ["Dec 2019", 559],
      ["Jan 2020", 567],
      ["Feb 2020", 550],
      ["Mar 2020", 495],
      ["Apr 2020", 502],
      ["May 2020", 578],
      ["Jun 2020", 691],
      ["July 2020", 710],
      ["Aug 2020", 780],
    ];
    this.status = this.getStatus();
  }

  render() {
    return html` <style>
        .credit-title {
          color: #1665d8;
          font-size: 30px;
          font-family: "Heebo", "Roboto", "Open Sans", serif;
          margin-left: 55px;
        }
      </style>

      <div>
        <p class="credit-title">Your credit's in ${this.status} shape</p>
      </div>`;
  }
  getStatus() {
    let current = this.credit[this.credit.length - 1][1];
    if (current >= 300 && current <= 499) {
      return "very poor";
    } else if (current >= 500 && current <= 559) {
      return "poor";
    } else if (current >= 560 && current <= 669) {
      return "fair";
    } else if (current >= 670 && current <= 749) {
      return "good";
    } else if (current >= 750 && current <= 809) {
      return "very good";
    } else {
      return "excellent";
    }
  }
}

customElements.define("header-view", HeaderView);
