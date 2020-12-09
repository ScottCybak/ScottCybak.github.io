export class Dom {

	root = this._doc.documentElement;

	constructor(
		private _doc = document,
	) { }

	byId(id: string | number) {
		return this._doc.getElementById(`${id}`);
	}

	// K extends keyof HTMLElementTagNameMap
	create<K extends keyof HTMLElementTagNameMap>(tag: K, classes: string[] = []) {

		const el = this._doc.createElement(tag);

		if (classes?.length) {
			el.classList.add(... classes);
		}

		return el;
	}

	empty(node: HTMLElement, excludeQuery?: string[]) {
		Array
			.from(excludeQuery?.length ? node.querySelectorAll(`:scope > :not(${excludeQuery.join(':not(')})`) : node.childNodes)
			.forEach(n => node.removeChild(n));
	}

	first(css: string, node: Element | Document = this._doc) {
		return this.query(css, node)?.[0];
	}

	query(css: string, node: Element | Document = this._doc) {
		return Array.from(node.querySelectorAll(css));
	}
}