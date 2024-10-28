import EventEmitter from "events";

import { ArrayQueue, ConstantBackoff, Websocket, WebsocketBuilder, WebsocketEvent } from "websocket-ts";

export class WsClient extends EventEmitter {
	private ws: Websocket;

	public constructor(url: string) {
		super();

		this.ws = new WebsocketBuilder(url).withBuffer(new ArrayQueue()).withBackoff(new ConstantBackoff(2000)).build();
		this.ws.addEventListener(WebsocketEvent.open, () => this.emit("open"));
		this.ws.addEventListener(WebsocketEvent.close, () => this.emit("close"));
		this.ws.addEventListener(WebsocketEvent.message, (ws: Websocket, ev: MessageEvent) => {
			const msg = JSON.parse(ev.data);
			const msgType = msg.MessageType;
			this.emit(`message:${msgType}`, msg);
		});
	}

	public close() {
		this.ws?.close();
	}
}
