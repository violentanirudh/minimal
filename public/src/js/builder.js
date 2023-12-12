function build(element, parent, options = false, content = '') {
	 element = document.createElement(element)

	if (options) {
		Object.keys(options).forEach((item) => {
			element.setAttribute(item, options[item])
		})
	}

	element.innerText = content
	parent.append(element)

	return element

}
