import { LitElement } from 'lit';
export declare class ThyQrcode extends LitElement {
    value: string;
    width: number;
    color: string;
    backgroundColor: string;
    type: "text" | "wifi";
    hint: string | null;
    hideInputs: boolean;
    private elCanvas;
    private ssid;
    private password;
    private auth;
    render(): import("lit-html").TemplateResult<1>;
    constructor();
    private init;
    private generateQR;
    private download;
    static styles: import("lit").CSSResult;
}
declare global {
    interface HTMLElementTagNameMap {
        'thy-qrcode': ThyQrcode;
    }
}
