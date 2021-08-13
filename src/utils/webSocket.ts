interface IWebSocket {
  start: () => any;
  stop: () => any;
}
class CreateWebSocket implements IWebSocket {
  constructor(url: string) {
    this.url = url;
    this.ws = null;
  }
  private ws: WebSocket | null;
  private url: string;
  private daemonThread: NodeJS.Timeout | undefined;
  private DAEMONTHREAD_TIME: number = 10;
  private onopen: ((e: Event) => any) | undefined;
  private onmessage: ((e: Event) => any) | undefined;
  private onclose: ((e: Event) => any) | undefined;

  public start = () => {
    this._run();
  };

  public stop = () => {
    this._stop();
  };

  private _run = () => {
    if (!this.ws) {
      this.ws = new WebSocket(this.url);
      this._createDaemonThread();
    } else console.warn("ws is running");
    if (this.onopen) this.ws.onopen = this.onopen;
    if (this.onmessage) this.ws.onmessage = this.onmessage;
    if (this.onclose) this.ws.onclose = this.onclose;
  };

  private _stop = () => {
    if (this.ws) {
      this.ws.close();
      if (this.daemonThread) clearTimeout(this.daemonThread);
    } else console.warn("ws is closed");
  };

  private _createDaemonThread = () => {
    this.daemonThread = setTimeout(() => {
      if (
        this.ws?.readyState === WebSocket.CLOSED ||
        this.ws?.readyState === WebSocket.CLOSING
      ) {
        this._stop();
        this._run();
      }
    }, this.DAEMONTHREAD_TIME * 1000);
  };
}

export default CreateWebSocket;
