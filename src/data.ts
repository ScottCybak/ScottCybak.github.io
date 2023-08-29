export interface SocialLink {
	href: string;
	label: string;
	classes?: string[];
}

export interface Screenshot {
	path: string;
	year?: number;
	description?: string;
}

export interface Experience {
	from: Date;
	to?: Date;
	company: string;
	location: string;
	category: CATEGORY;
	description?: string;
	positions?: POSITION[];
	tags?: TAG[];
	screenshots?: Screenshot[];
}

export const WINDSOR = 'Windsor, Ontario';
export const LONDON = 'London, Ontario';
export const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export const MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export enum CATEGORY {
	DEVELOPER = 'Developer',
	RETAIL = 'Retail Management',
	TRANSPORTATION = 'Logistics',
	ALL = 'All',
}

export enum TAG {
	CSHARP = 'C#',
	DOTNET = '.Net',
	ANGULAR = 'Angular',
	RX = 'RxJs',
	NGRX = 'NgRx',
	NGXS = 'NgXs',
	MYSQL = 'MySQL',
	GIT = 'Git',
	TYPESCRIPT = 'Typescript',
	JAVASCRIPT = 'Javascript',
	DOJO = 'Dojo',
	MATERIAL = 'Material',
	PHP = 'pHp',
	HTML = 'HTML',
	CSS = 'CSS',
	SASS = 'SCSS/SASS',
	WORDPRESS = 'Wordpress',
	LARAVEL = 'Laravel',
	MSSQL = 'MSSql',
	TAILWIND = 'Tailwind',
}

export enum POSITION {
	SENIOR_DEV = 'Senior Developer',
	JR_DEV = 'Junior Developer',
	STORE_MGR = 'Store Manager',
	SALES = 'Sales Associate',
	ANGULAR_SME = 'Angular SME',
	FRONTEND = 'Frontend',
}

export const links: SocialLink[] = [
	{
		href: 'mailto:scott.cybak@gmail.com',
		label: 'Email',
	},
	{
		href: 'https://github.com/scottcybak',
		label: 'GitHub',
	},
	{
		href: 'https://github.com/ScottCybak/ScottCybak.github.io/',
		label: 'Source Code',
		classes: ['smol', 'space-above'],
	}
];

export const experience: Experience[] = [
	{
		from: new Date(2022, 2, 1),
		company: 'Lawlabs',
		location: LONDON,
		category: CATEGORY.DEVELOPER,
		description: '',
		positions: [POSITION.SENIOR_DEV, POSITION.FRONTEND],
		tags: [TAG.ANGULAR, TAG.GIT, TAG.JAVASCRIPT, TAG.NGXS, TAG.TAILWIND, TAG.MSSQL, TAG.RX, TAG.TYPESCRIPT, TAG.SASS],
	},
	{
		from: new Date(2021, 2, 1),
		to: new Date(2022, 2, 1),
		company: 'Rocket Innovation Studio',
		location: WINDSOR,
		category: CATEGORY.DEVELOPER,
		description: `Brought in primarily as an Angular S.M.E., in my role as Senior Developer in an Agile environment.  Responsible for contributing to the code base, while also mentoring junior developers, advising others, while also assisting with analysis and planning.  Also assisted in updating the new candidate hiring guides where my experience justified it, as well as contributing to the creation of internal code policies.`,
		positions: [POSITION.SENIOR_DEV, POSITION.ANGULAR_SME, POSITION.FRONTEND],
		tags: [TAG.ANGULAR, TAG.GIT, TAG.JAVASCRIPT, TAG.NGRX, TAG.MSSQL, TAG.RX, TAG.TYPESCRIPT, TAG.SASS, TAG.DOTNET, TAG.CSHARP],
	},
	{
		from: new Date(2017, 10, 1),
		to: new Date(2021, 2, 1),
		company: 'Auxilium Group',
		location: WINDSOR,
		category: CATEGORY.DEVELOPER,
		description: `Heavy use of Angular (+Material), Rxjs, Custom API integration to develop one-off client solutions for a range of client industries and uses, and, actively migrating multiple large scale legacy web-apps on a component/module basis.<br><br>I created many internal tools/process' that grant the entire dev team rapid prototype-to-production times, that give us the flexibility to be market-ready in hours/days instead of weeks/months.`,
		positions: [POSITION.SENIOR_DEV],
		tags: [TAG.ANGULAR, TAG.GIT, TAG.JAVASCRIPT, TAG.MYSQL, TAG.RX, TAG.TYPESCRIPT, TAG.DOJO, TAG.MATERIAL, TAG.SASS, TAG.PHP],
		screenshots: [
			{path: 'appointments.png', year: 2019, description: 'Appointment scheduler, for a Barber shop.  Designed for a touchscreen and rapid data entry, almost everything is drag and drop via gestures/mouse.  Angular + Material/Custom UI'},
			{path: 'mavis.png', year: 2020, description: 'A complete overhaul/redesign of the current elearning platform.  Migrating the existing poorly structure backend to a normalized one, and making the entire UI more user friendly.  Angular + MySql 5.7/8'},
			{path: 'modules.png', year: 2020, description: 'Modernizing the Datalynk bundle.  Currently a works in progress.  Supports external change detection, real time collaboration.  Angular + Material'},
		],
	},
	{
		from: new Date(2016, 10, 1),
		to: new Date(2017, 10, 1),
		company: 'Splice Digital',
		location: WINDSOR,
		category: CATEGORY.DEVELOPER,
		description: `Primary developer for the majority of the high-profile projects, while acting as a mentor and guide to the junior developers on staff.  Spent a good deal of my time here, communicating with new/existing clients primarly for the purposes of patching legacy projects, and adding new features to whatever their stack happened to be.`,
		positions: [POSITION.SENIOR_DEV],
		tags: [TAG.GIT, TAG.JAVASCRIPT, TAG.MYSQL, TAG.RX, TAG.TYPESCRIPT, TAG.SASS, TAG.PHP, TAG.WORDPRESS, TAG.LARAVEL],
	},
	{
		from: new Date(2013, 2, 1),
		to: new Date(2016, 10, 1),
		company: 'Auxilium Group',
		location: WINDSOR,
		category: CATEGORY.DEVELOPER,
		positions: [POSITION.SENIOR_DEV, POSITION.JR_DEV],
		description: `Started as a junior front-end developer, and quickly grew my skills to finish up the first version of their Datalynk project (a cloud-based Database management suite), also while patching and adding new modules to their e-learning platform.`,
		tags: [TAG.GIT, TAG.JAVASCRIPT, TAG.MYSQL, TAG.DOJO, TAG.CSS, TAG.PHP],
	},
]
