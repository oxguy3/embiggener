import Parser from '/modules/Parser.js'

export default class ArsTechnica extends Parser {
    getConditions() {
        return [
            {
                pageUrl: {
                    hostSuffix: 'cdn.arstechnica.net',
                    pathPrefix: '/wp-content/uploads/',
                }
            },
        ];
    }
    getBiggestUrl(location) {
        if (location.hostname == 'cdn.arstechnica.net') {
            let re = /^(\/wp-content\/uploads\/\d+\/\d+\/.*?)-\d+x\d+(\.\w+)$/g;
            let result = re.exec(location.pathname);
            if (result !== null) {
                let filePath = result[1];
                let fileExt = result[2];
                return "https://"+location.hostname+"/"+filePath+fileExt;
            }
        }
        return null;
    }
}
