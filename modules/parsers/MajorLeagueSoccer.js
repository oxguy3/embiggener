import Parser from '/modules/Parser.js'

export default class MajorLeagueSoccer extends Parser {
    getConditions() {
        return [
            {
                pageUrl: {
                    hostSuffix: '-mp7static.mlsdigital.net',
                    pathPrefix: '/styles/image_',
                    pathContains: '/s3/',
                }
            },
        ];
    }
    getBiggestUrl(url) {
        let re = /^\/styles\/image_\w+\/s3\/(.*?)$/g;
        let result = re.exec(url.pathname);
        if (result !== null) {
            let filePath = result[1];
            return "https://"+url.hostname+"/"+filePath;
        }
        return null;
    }
}
