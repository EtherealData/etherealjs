export default class Static {
    static getDOMInstance(pid) {
        return document.querySelector(`[component-pid="${pid}"]`)
    }
    static generatePID() {
        return Math.floor(Math.random() * 90000) + 10000;
    }
    static getPropertiesFromAttributeList(attributes){
        let properties = {};
        for( let i = 0; i < attributes.length; i++) {
            if(attributes[i].name.indexOf('property-') !== -1) {
                let name = attributes[i].name.split('property-')[1];
                properties[name] = attributes[i].value;
            }
        }
        return properties;
    }
    static attributize (element, attributes) {
        [...attributes].forEach((att)=>{
            element.setAttribute(att.name, att.value);
        })
        return element;
    }
    static shade(col, amt) {
        var usePound = false;
        if (col[0] == "#") {
            col = col.slice(1);
            usePound = true;
        }
        var num = parseInt(col,16);
        var r = (num >> 16) + amt;
        if (r > 255) r = 255;
        else if  (r < 0) r = 0;
        var b = ((num >> 8) & 0x00FF) + amt;
        if (b > 255) b = 255;
        else if  (b < 0) b = 0;
        var g = (num & 0x0000FF) + amt;
        if (g > 255) g = 255;
        else if (g < 0) g = 0;
        return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);

    }
    static stampPID(pid, ts) {
        let attribute = ` component-pid="${pid}"`,
            position = ts.indexOf('>');
        return [ts.slice(0, position), attribute, ts.slice(position)].join('');
    }
    static getEventMap() {
        return {
            'blur': 'blur',
            'change': 'change',
            'input': 'input',
            'click': 'click',
            'focus': 'focus',
            'drag': 'drag',
            'keyup': 'keyup',
            'keydown': 'keydown',
            'mouseover': 'mouseover',
            'mouseleave': 'mouseleave',
            'mouseenter': 'mouseenter',
            'mousein': 'mousein',
            'mouseout': 'mouseout',
            'submit': 'submit'
        }
    }
    static getStyleSheetFromMap(map, pid) {
        let body = "",
            traverse = (map) => {
                let list = Object.keys(map);
                if(list && list.length > 0){
                    list.forEach((selector, listindex) => {
                        let properties = Object.keys(map[selector]);
                        body += `${pid ? `[component-pid="${pid}"]${selector[0]===':' ? '' : ' '}`+selector : selector} {`
                        if( properties && properties.length > 0){
                            properties.forEach((property, index) => {
                                let line = map[selector][property];
                                if(line && typeof line === 'string'){
                                    body += `${property}: ${map[selector][property]};`;
                                    if(index === properties.length - 1 && body.slice(-2) !== '{ ') {
                                        body += '} ';
                                    }
                                    return;
                                }
                                if(line && typeof line === 'object'){   
                                    if(body.slice(-2) !== '} ')  {
                                        body += `} `;   
                                    }
                                    traverse({[selector+' '+property] : line})
                                    return;
                                }
                            });
                        }
                    });
                }
        }
        traverse(map);
        // body += '} ';
        return body;
    }
    static format(string, to){
        let out = '';
        switch (to) {
            case 'currency':
                return formatCurrency(string);
            case 'percent':
                break;
            default:
                console.log('Sorry, we are out of ' + expr + '.');
        }

    }
}
