export const createWebSocket = (
  url: string,
  onopen: (e: Event) => any,
  onmessage: (e: Event) => any,
  onclose: (e: Event) => any
) => {
  let ws = new WebSocket(url);
  ws.onopen = (e: Event) => {
    if (onopen) onopen(e);
  };
  ws.onmessage = (e: Event) => {
    if (onmessage) onmessage(e);
  };
  ws.onclose = (e: Event) => {
    if (onclose) onclose(e);
  };
  ws.onerror = (e: Event) => {};

  ws.close();
};

class CreateWebSocket {
  constructor(url: string) {
    this.ws = new WebSocket(url);
  }
  private ws: WebSocket;
  private onopen: ((e: Event) => any) | undefined;
  private onmessage: ((e: Event) => any) | undefined;
  private onclose: ((e: Event) => any) | undefined;
}
