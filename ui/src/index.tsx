/* @refresh reload */
import { Route, Router } from "@solidjs/router";
import { render } from "solid-js/web";

import App from "./App";
import { HomePage } from "./pages/HomePage";

const root = document.getElementById("root");

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
	throw new Error("Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?");
}

render(
	() => (
		<Router root={App}>
			<Route path="/" component={HomePage} />
		</Router>
	),
	root
);
