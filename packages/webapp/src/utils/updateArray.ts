export default function updateArray<T>(
	array: T[] | null | undefined,
	newElement: T,
	replacePredicate: (element: T, index?: number) => boolean
) {
	if (!array) return [];
	return array.map((element, index) => {
		if (replacePredicate(element, index)) return newElement;
		return element;
	});
}
