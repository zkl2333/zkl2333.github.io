import marked from "marked";

const mdToJs = (str) => {
	const content = JSON.stringify(marked(str));
	return `export default ${content}`;
};

export default function md() {
	return {
		transform(src, id) {
			if (id.endsWith(".md")) {
				console.log(id);
				return {
					code: mdToJs(src),
					map: null, // provide source map if available
				};
			}
		},
	};
}
