import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import QRCode, { QRCodeRenderersOptions } from 'qrcode';

const DEFAULT_VALUE: string = "Input some text";

@customElement('thy-qrcode')
export class ThyQrcode extends LitElement {

  @property()
  value = DEFAULT_VALUE;

  @property()
  width = 225;

  @property()
  color = "#333333";

  @property({ attribute: 'background-color' })
  backgroundColor = "#FFFFFF";

  @property()
  type: "text" | "wifi" = "text";

  @property()
  hint: string | null = null;

  @property({ type: Boolean, attribute: 'hide-inputs' })
  hideInputs = false;


  private elCanvas: HTMLCanvasElement | null = null;

  private ssid: string = "Network Name (SSID)";
  private password: string = "Passphrase";
  private auth: string = "WPA";

  // "WIFI:T:WPA;S:mynetwork;P:mypass;;" -> thats the string format for wifi qr code

  render() {
    this.value = this.value || DEFAULT_VALUE;
    const textDomQr = html`
    <div style="width: ${this.width}px">
      <canvas id="canvas" class="cnvs" @click=${() => { this.download() }}></canvas>
      <div class="${this.hint ? 'hint' : 'hidden'}">${this.hint}</div>
      <input class="${!this.hideInputs ? '' : 'hidden'}" type="text" value=${this.value} @input=${(e: any) => { this.value = e.target.value; this.generateQR(this.value) }} />
    </div>`;

    const wifiDomQr = html`
    <div style="width: ${this.width}px">
      <canvas id="canvas" class="cnvs" @click=${() => { this.download() }}></canvas>
      <div class="${this.hint ? 'hint' : 'hidden'}">${this.hint}</div>
      <input class="${!this.hideInputs ? '' : 'hidden'}" type="text" name="ssid" placeholder="SSID" value=${this.ssid} @input=${(e: any) => { this.ssid = e.target.value; this.value = `WIFI:T:${this.auth};S:${this.ssid};P:${this.password};;`; this.generateQR(this.value) }} />
      <input class="${!this.hideInputs ? '' : 'hidden'}" type="text" name="password" placeholder="PASSPHRASE" value=${this.password} @input=${(e: any) => { this.password = e.target.value; this.value = `WIFI:T:${this.auth};S:${this.ssid};P:${this.password};;`; this.generateQR(this.value) }} />
      <select class="${!this.hideInputs ? '' : 'hidden'}" name="auth" @change=${(e: any) => { this.auth = e.target.value; this.value = `WIFI:T:${this.auth};S:${this.ssid};P:${this.password};;`; this.generateQR(this.value) }}>
        <option value="WEP">WEP</option>
        <option value="WPA" selected>WPA</option>
        <option value="WPA2-EAP">WPA2-EAP</option>
        <option value="nopass">No Password</option>
      </select>
    </div>
    `;
    return this.type === "text" ? textDomQr : wifiDomQr;
  }

  constructor() {
    super();
    this.updateComplete.then(() => {
      this.init();
    })
  }

  private init() {
    this.elCanvas = this.renderRoot.querySelector('#canvas');
    this.value = this.type === "wifi" ? `WIFI:T:${this.auth};S:${this.ssid};P:${this.password};;` : this.value;
    this.generateQR(this.value);
  }

  private generateQR(text: string) {
    if (this.elCanvas && text) {
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

  static styles = css`
  :host {
    display:block;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
  }
  .hidden {
    display: none!important;
  }
  h2 {
    color: #CCC;
    font-size: 16px;
    margin: 0 0 32px 0;
    font-family: sans-serif;
  }
  .cnvs {
    display:block;
    width: 100%;
    height: auto;
    aspect-ratio: 1/1;
    cursor: pointer;
    padding: 0;
    margin: 0;
  }
  .hint {
    width:100%;
    text-align: center;
    color: #CCC;
    font-size: 12px;
    margin: 4px 0 0 0;
    padding: 0;
    word-wrap: break-word;
    font-family: monospace;
    overflow-x: hidden;
    text-overflow: ellipsis;
  }
  input[type=text] {
    display:flex;
    width: calc(100% - 32px);
    background-color: #666;
    color: #FFFFFF;
    border: none;
    margin:32px 0 0 0;
    font-size: 16px;
    padding: 16px;
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
    padding: 16px;
    width: 100%;
    outline: none;
    border: none;
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
