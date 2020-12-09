import { BehaviorSubject } from "rxjs";
import { experience, links, Experience, MONTHS_SHORT, MONTHS, CATEGORY, Screenshot } from "./data";
import { monthDiff } from "./func/date";
import { Dom } from "./lib/dom";

export class App {

	private _all = experience.sort((a, b) => b.from.getTime() - a.from.getTime());
	private _filter = new BehaviorSubject(CATEGORY.DEVELOPER);
	private _panels: HTMLElement[] = [];
	private _panelCache = new Map<Experience, HTMLElement>();
	private _timelineRows: HTMLElement[];
	private _filterCategoryAttribute = 'data-category';
	private _activeClass = 'active';
	private _lastPreview: Screenshot;

	constructor(
		private _dom: Dom,
	) { }

	viewheightHack() {
		this._dom.root.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
	};

	applyFilter(key: CATEGORY) {
		const fil = this._filter;
		if (fil.getValue() !== key) {
			fil.next(key);
		}
	}

	build() {
		this.buildSocialLinks();
		this.buildFilterBar();
		this.buildTimeline();
		return this;
	}

	buildFilterBar() {
		const dom = this._dom,
			node = dom.byId('filter'),
			cats = Object.values(CATEGORY),
			inUse = new Set(this._all.map(a => a.category));

		inUse.add(CATEGORY.ALL);

		Array.from(inUse)
			.sort((a, b) => cats.indexOf(a) - cats.indexOf(b))
			.map(val => {
				const n = dom.create('div', ['option']);
				n.innerText = val;
				n.setAttribute(this._filterCategoryAttribute, val);
				n.addEventListener('click', () => this.applyFilter(val));
				return n;
			})
			.forEach(n => node.appendChild(n));
	}

	openImage(ss: Screenshot) {
		const dom = this._dom,
			node = dom.byId('preview');

		// if we are opening the same one, there is
		// no need to empty/generate again...
		if (this._lastPreview !== ss) {
			dom.empty(node);
			node.innerHTML = `<div class="wrapper"><img src="/img/${ss.path}"></div>`;
		}

		this._lastPreview = ss;
		node.classList.remove('hidden');
	}

	buildSocialLinks() {
		const dom = this._dom,
			el = dom.byId('socialLinks');
		
		links
			.map(link => {
				const li = dom.create('li'),
					a = dom.create('a');
				a.href = link.href;
				a.innerText = link.label;
				li.appendChild(a);
				link?.classes?.forEach(klass => a.classList.add(klass));
				return li;
			})
			.forEach(li => el.appendChild(li));
	}

	buildTimeline() {
		const dom = this._dom,
			nowNode = dom.byId('now'),
			epochNode = dom.byId('epoch'),
			timelineNode = dom.byId('timeline'),
			filterNode = dom.byId('filter');

		this._filter
			.pipe(
				// map
			)
			.subscribe(fil => {
				const all = fil === CATEGORY.ALL ? this._all : this._all.filter(r => r.category === fil),
					activeEl = dom.byId('active'),
					activeClass = this._activeClass,
					len = all.length,
					today = all[0]?.to || new Date(),
					epoch = all[len - 1].from,
					totalMonths = monthDiff(epoch, today),
					rows = this._timelineRows = all
						.map((xp, idx) => this._createExperienceSegment(monthDiff(xp.from, xp.to || today) / totalMonths, xp, idx))
				
				dom.empty(timelineNode, ['.bar']);
				rows.forEach(n => timelineNode.appendChild(n));

				// spin up our panels
				dom.empty(activeEl);
				this._panels = [];

				all.forEach((xp, idx) => {
					activeEl.appendChild(this._createPanel(idx, xp));
				})

				// update the from/to
				dom.empty(nowNode);
				nowNode.appendChild(this._createDateNode(today));
				dom.empty(epochNode);
				epochNode.appendChild(this._createDateNode(epoch));


				// update our active filter option
				dom.query(`.option.${activeClass}`, filterNode)
					.forEach(n => n.classList.remove(activeClass));

				dom.first(`.option[${this._filterCategoryAttribute}="${fil}"]`)?.classList.add(activeClass)

				// highlight the first in the new tree...
				this.activate(0, true);
				dom.first(`.panel:first-child`)?.scrollIntoView();

			});
	}

	closeImage() {
		this._dom.byId('preview').classList.add('hidden');
	}

	init() {

		addEventListener('keydown', evt => {
			if (evt.key === 'Escape') {
				this.closeImage();
			}
		});

		this._dom.byId('preview').addEventListener('click', () => this.closeImage());

		addEventListener('resize', () => this.viewheightHack());

		this._dom.root.setAttribute('data-ua', navigator.userAgent);

		return this;
	}

	activate(idx: number, ignoreScroll?: boolean) {
		const rows = this._timelineRows,
			node = rows[idx],
			klass = this._activeClass,
			target = this._panels[idx];

		rows.filter(r => r !== node && r.classList.contains(klass))
			.forEach(n => n.classList.remove(klass));

		node.classList.add(klass);

		if (!ignoreScroll) {
			setTimeout(() => target.scrollIntoView({behavior: 'smooth'}), 10);
		}
	}

	private _createPanel(idx: number, xp: Experience) {
		const cache = this._panelCache,
			panels = this._panels;

		let panel = cache.get(xp);
		if (!cache.has(xp)) {
			
			const dom = this._dom,
				escaped = xp.company.replace(/\s/, '_'),
				positions = xp.positions?.length ? `<div class="positions">${xp.positions.map(p => `<div class="role">${p}</div>`).join(', ')}</div>` : '',
				tags = xp.tags?.length ? `<div class="tags">${xp.tags.map(t => `<div class="tech">${t}</div>`).join('\n')}</div>` : '';

			panel = dom.create('div', ['panel']);
			panel.setAttribute('data-open', `<${escaped}>`);
			panel.setAttribute('data-close', `</${escaped}>`);

			panel.innerHTML = `
				<div class="company">${xp.company}</div>
				<div class="location">${xp.location}</div>
				<div class="dates">
					<div class="from">${this._createDateNode(xp.from).outerHTML}</div>
					<div class="to">${this._createDateNode(xp.to || new Date()).outerHTML}</div>
				</div>
				${positions}
				<div class="description">${xp.description}</div>
				${tags}
			`;

			if (xp.screenshots) {
				const ssNode = dom.create('div', ['screenshots']);
				xp.screenshots?.forEach(ss => {
					const n = dom.create('img');
					n.src = `/img/${ss.path}`;
					n.alt = ss.description;
					n.addEventListener('click', () => this.openImage(ss));
					ssNode.appendChild(n);
				});
				panel.appendChild(ssNode);
			}

			cache.set(xp, panel);
		}

		if (!panels[idx]) {
			panels[idx] = panel;
		}
		return panel;
	}

	private _createExperienceSegment(ratio: number, xp: Experience, idx: number) {
		const dom = this._dom,
			node = dom.create('div', ['block']),
			label = dom.create('label'),
			percent = Math.round(ratio * 10000) / 100;

		label.innerText = xp.company;
		node.style.height = `${percent}%`;
		node.setAttribute('data-end-date', `${xp.from.getFullYear()}.${((xp.from.getMonth() + 1) + '').padStart(2, '0')}`);
		node.addEventListener('click', () => this.activate(idx));
		node.appendChild(label);
		return node;
	}

	private _createDateNode(d: Date) {
		const dom = this._dom,
			el = dom.create('span', ['date']),
			[year, month, short, long] = new Array(4)
				.fill(null)
				.map(() => dom.create('div'));
	
		year.classList.add('year');
		month.classList.add('month');
		short.classList.add('short');
		long.classList.add('long');

		year.innerText = `${d.getFullYear()}`;
		short.innerText = MONTHS_SHORT[(d.getMonth())];
		long.innerText = MONTHS[d.getMonth()];

		[long, short]
			.forEach(n => month.appendChild(n));

		[year, month]
			.forEach(n => el.appendChild(n));

		return el;
	}

}