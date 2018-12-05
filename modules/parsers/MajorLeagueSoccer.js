import Parser from '/modules/Parser.js'

export default class SportsEngine extends Parser {
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
    getBiggestUrl(location) {

        if (location.hostname.endsWith('-mp7static.mlsdigital.net')) {
            let re = /^\/styles\/image_\w+\/s3\/(.*?)$/g;
            let result = re.exec(location.pathname);
            if (result !== null) {
                let filePath = result[1];
                return "https://"+location.hostname+"/"+filePath;
            }
        }
        return null;
    }
}
