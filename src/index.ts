import { App } from "./app";
import { Dom } from './lib/dom';

declare global {
	interface Window {
		app?: App;
	}
}

addEventListener('load', () => {	
	
	window.app = new App(new Dom())
		.build()
		.init();

	console.log('app is available on window/global as `app`\n\n', window.app);
});


