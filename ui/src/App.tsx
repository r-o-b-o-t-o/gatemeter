import { onCleanup, onMount } from "solid-js";

import { WsClient } from "./WsClient";
import "./theme/index.scss";

export let ws: WsClient;

const App = (props) => {
	onMount(() => {
		ws = new WsClient(import.meta.env.VITE_WS_URL);
	});

	onCleanup(() => {
		ws?.close();
	});

	return <>{props.children}</>;
};

export default App;
