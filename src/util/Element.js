class Element {
	constructor(tagName, props, children){
		if(Array.isArray(props)){
			children = props;
			props = {};
		}

		this.tagName = tagName;
		this.props = props;
		this.children = children || [];
	}

	render(){
		let el = document.createElement(this.tagName);
		let props = this.props;

		for(let key in props){
			let value = props[key];
			el.setAttribute(key, value);
		}

		let children = this.children || [];

		children.forEach(child => {
			let childEl = (child instanceof Element) ? child.render() : document.createTextNode(child);

			el.appendChild(childEl);
		});

		return el;
	}
}

const createVirtualDom = function(tagName, props, children){
	return new Element(tagName, props, children);
}

export default createVirtualDom;

// const el = createVirtualDom;

// const ul = el('ul', {id: 'list'}, [
// 	el('li', {class: 'item'}, ['item-1']),
// 	el('li', {class: 'item'}, ['item-2']),
// 	el('li', {class: 'item'}, ['item-3'])
// ]);

// console.log(ul.render());