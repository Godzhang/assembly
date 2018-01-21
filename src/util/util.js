import Hogan from 'hogan';

export function renderTemplate(htmlTempalte, data){
	let template = Hogan.compile(htmlTempalte),
        result = template.render(data);
    return result;
}
