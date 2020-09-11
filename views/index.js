import "./pages/header-view";
import "./pages/credit-guage";
import "./pages/line-graph";
import { LitElement, html } from "lit-element";

class MyIndex extends LitElement {
  render() {
    return html`
      <style>
        .main-container {
          max-width: 1150px;
          margin: 0 auto;
          padding: 30px 20px;
        }
        .body-container {
          padding-top: 0;
          margin-top: 50px;
        }
        .content{
          display: flex;
          justify-content: space-between;
          align-items: stretch;
        }
        .header{
          display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 25px;
        }
      </style>
      <div class="main-container">
        <div class="body-container">
          <div class="header">
          <header-view></header-view>
          </header>
          </div>
        <div class='content'>
          <credit-guage></credit-guage>
          <line-graph></line-graph>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("my-index", MyIndex);
