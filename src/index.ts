import { App } from "./app";
import { Dom } from './lib/dom';
// lets give everything a chance to catch up... 
addEventListener('load', () => {	

	const app = new App(new Dom())
		.build()
		.init();

});


