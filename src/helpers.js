export function queryAllSelector(element, selector, value) {
	let results = [];

	if (selector(element, value)) {
		results.push(element);
	}

	if (element.children) {
		element.children.forEach((child) => {
			results = results.concat(queryAllSelector(child, selector, value))
		});
	}
	return results;
}

export function findAllByTag(element, tagName) {
	return queryAllSelector(
		element,
		(element, value) => element.type === value,
		tagName,
	);
}

export function findAllByClassName(element, className) {
	return queryAllSelector(
		element,
		(element, value) => element.props && element.props.className && element.props.className === value,
		className,
	);
}

export function findByTag(element, tagName) {
	return (findAllByTag(element, tagName) || [null])[0];
}

export function findByClassName(element, className) {
	return (findAllByClassName(element, className) || [null])[0];
}
