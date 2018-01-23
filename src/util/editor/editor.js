import pub from 'util/public.js';

class RichEditor {
	constructor(container, params = {}){
		const t = this;
		const options = {
			width: 900,
			height: 500,
			borderColor: "#ddd",
			//按钮组
			buttons: {
				heading: {
					title: '标题',
					icon: '\uf1dc',
					click(){
						let h = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
						t.closeModal();
						let html = '<div class="editor-heading">';
						h.forEach((val) => {
							html += `<${val} data-h="${val}"${val}</${val}>`;
						});
						html += '</div>';

						function HClick(){
							let h = document.querySelector('.editor-heading');
								h = h.childNodes;
							h.forEach((val) => {
								pub.addEvent(val, 'click', () => {
									let dh = val.getAttribute('data-h');
									t.execCommand('formatBlock', `<${dh}>`);
									t.closeModal();
								});
							});
						}
						t.openModal.call(t, html, HClick);
					}
				}
			}
		}
		this.selectedRange = null;
		this.et = null;
		this.toolbarTop = null;
		this.params = Object.assign({}, options, params);
	}
}
	