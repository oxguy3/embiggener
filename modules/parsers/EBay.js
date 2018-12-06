import Parser from '/modules/Parser.js'

export default class EBay extends Parser {
    getConditions() {
        return [
            {
                pageUrl: {
                    hostEquals: 'i.ebayimg.com',
                    pathPrefix: '/images/g/'
                }
            },
        ];
    }
    getBiggestUrl(url) {
        let re = /^(\/images\/g\/[^\/]+\/s-l)\d+(\.\w+)$/g;
        let result = re.exec(url.pathname);
        if (result !== null) {
            let filePath = result[1];
            let fileExt = result[2];
            url.pathname = filePath+'2000'+fileExt;
            return url.href;
        }
        return null;
    }
}
