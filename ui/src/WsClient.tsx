import { JSX, createContext, useContext } from "solid-js";

import { EventEmitter } from "eventemitter3";
import { ArrayQueue, ConstantBackoff, Websocket, WebsocketBuilder, WebsocketEvent } from "websocket-ts";

export const WsContext = createContext<() => WsClient>();

export const WsProvider = (props: { ws: () => WsClient; children: string | JSX.Element | JSX.Element[] }) => {
	// eslint-disable-next-line solid/reactivity
	return <WsContext.Provider value={props.ws}>{props.children}</WsContext.Provider>;
};

export const useWs = () => {
	return useContext(WsContext);
};

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
