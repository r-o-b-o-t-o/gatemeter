import { createSignal, onCleanup, onMount } from "solid-js";

import { WsClient, WsProvider } from "./WsClient";
import "./theme/index.scss";
import "./theme/panda.css";

const App = (props) => {
	const [ws, setWs] = createSignal<WsClient>();

	onMount(() => {
		setWs(new WsClient(import.meta.env.VITE_WS_URL));
	});

	onCleanup(() => {
		ws()?.close();
	});

	return <WsProvider ws={ws}>{props.children}</WsProvider>;
};

export default App;
