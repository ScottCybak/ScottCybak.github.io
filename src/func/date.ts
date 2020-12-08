export function monthDiff(a: Date, b: Date) {
	return b.getMonth() - a.getMonth() + (12 * (b.getFullYear() - a.getFullYear()));
}