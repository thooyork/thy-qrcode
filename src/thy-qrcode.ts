import { LitElement, css, html, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import QRCode, { QRCodeRenderersOptions } from 'qrcode';
// import litLogo from './assets/lit.svg'
// import viteLogo from '/vite.svg'


@customElement('thy-qrcode')
export class ThyQrcode extends LitElement {

  @property()
  value = "";

  @property()
  width = 350;

  @property()
  color = "#333333";

  @property()
  backgroundColor = "#FFFFFF";

  @property()
  type: "text" | "wifi" = "text";


  private elCanvas: HTMLCanvasElement | null = null;

  private ssid: string = "Network Name (SSID)";
  private password: string = "Passphrase";
  private auth: string = "WPA";

  // "WIFI:T:WPA;S:mynetwork;P:mypass;;" -> thats the string format for wifi qr code

  private textDomQr = html`
    <canvas id="canvas" class="cnvs" @click=${() => { this.download() }}></canvas>
    <div class="hint">click on QR Code to download</div>
    <input type="text" value=${this.value} @input=${(e: any) => { this.value = e.target.value; this.generateQR(this.value) }} />
    <!-- <button class="btn" @click=${() => { this.generateQR(this.value) }}>Generate QR Code</button> -->
  `;

  private wifiDomQr = html`
    <canvas id="canvas" class="cnvs" @click=${() => { this.download() }}></canvas>
    <div class="hint">click on QR Code to download</div>
    <input type="text" name="ssid" placeholder="SSID" value=${this.ssid} @input=${(e: any) => { this.ssid = e.target.value; this.value = `WIFI:T:${this.auth};S:${this.ssid};P:${this.password};;`; this.generateQR(this.value) }} />
    <input type="text" name="password" placeholder="PASSPHRASE" value=${this.password} @input=${(e: any) => { this.password = e.target.value; this.value = `WIFI:T:${this.auth};S:${this.ssid};P:${this.password};;`; this.generateQR(this.value) }} />
    <select name="auth" @change=${(e: any) => { this.auth = e.target.value; this.value = `WIFI:T:${this.auth};S:${this.ssid};P:${this.password};;`; this.generateQR(this.value) }}>
      <option value="WEP">WEP</option>
      <option value="WPA" selected>WPA</option>
      <option value="WPA2-EAP">WPA2-EAP</option>
      <option value="nopass">No Password</option>
    </select>
  `;

  render() {
    return this.type === "text" ? this.textDomQr : this.wifiDomQr;
  }

  constructor() {
    super();
    this.updateComplete.then(() => {
      this.init();
    })
  }

  private init() {
    this.elCanvas = this.renderRoot.querySelector('#canvas');
    this.value = this.type === "wifi" ? `WIFI:T:${this.auth};S:${this.ssid};P:${this.password};;` : "Hello World!";
    this.generateQR(this.value);
  }

  private generateQR(text: string) {
    if (this.elCanvas) {
      const options: QRCodeRenderersOptions = {
        errorCorrectionLevel: 'H',
        width: this.width,
        margin: 1,
        color: {
          dark: this.color,
          light: this.backgroundColor
        }
      };
      QRCode.toCanvas(this.elCanvas, text, options, function (error) {
        if (error) console.error(error)
        console.log('success!');
      })
    }
  }

  private download() {
    if (this.elCanvas) {
      const link = document.createElement('a');
      link.download = 'qrcode.png';
      link.href = this.elCanvas.toDataURL();
      link.click();
    }
  }

  styles = css`
    :host {
      width: ${this.width}px;
    }
    .cnvs {
      background-color: ${unsafeCSS(this.backgroundColor)};
    }
  `;

  static styles = css`
  :host {
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
  }
  h2 {
    color: #CCC;
    font-size: 16px;
    margin: 0 0 32px 0;
    font-family: sans-serif;
  }
  .cnvs {
    width:100%;
    height: auto;
    aspect-ratio: 1/1;
    cursor: pointer;
  }
  .hint {
    color: #CCC;
    font-size: 12px;
    margin: 4px 0 0 0;
    font-family: monospace;
  }
  .btn {
    display:block;
    background-color: #4CAF50;
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 32px 0;
    cursor: pointer;

    &:hover {
      background-color: #45a049;
    }
  }
  input[type=text] {
    background-color: #666;
    color: #FFFFFF;
    border: none;
    margin:32px 0 0 0;
    font-size: 16px;
    padding: 15px 32px;
    width: calc(100% - 64px);
    &:focus {
      outline: none;
      background-color: #333;
    }
    &::placeholder {
      color: #AAA;
    }
  }
  select {
    background-color: #666;
    color: #FFFFFF;
    border: none;
    margin:32px 0 0 0;
    font-size: 16px;
    padding: 15px 32px;
    width: 100%;
    &:focus {
      outline: none;
      background-color: #333;
    }
  }
  `;

}

declare global {
  interface HTMLElementTagNameMap {
    'thy-qrcode': ThyQrcode
  }
}
