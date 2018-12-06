import Parser from '/modules/Parser.js'

export default class CNN extends Parser {
    getConditions() {
        return [
            {
                pageUrl: {
                    hostEquals: 'cdn.cnn.com',
                    pathPrefix: '/cnnnext/dam/assets/'
                }
            },
        ];
    }
    getBiggestUrl(url) {
        let re = /^\/cnnnext\/dam\/assets\/([\w-]+?)-(?:small|medium|medium-plus|large|exlarge|super)-\w+?(\.\w+)$/g;
        let result = re.exec(url.pathname);
        if (result !== null) {
            let fileName = result[1];
            let fileExt = result[2];
            url.pathname = '/cnnnext/dam/assets/'+fileName+'-full-169'+fileExt;
            return url.href;
        }
        return null;
    }
}
