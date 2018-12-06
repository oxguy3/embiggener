import Parser from '/modules/Parser.js'

export default class SportsEngine extends Parser {
    getConditions() {
        return [
            {
                pageUrl: {
                    hostEquals: 'assets.ngin.com',
                    pathPrefix: '/attachments/photo/'
                }
            },
            {
                pageUrl: {
                    hostEquals: 'assets.ngin.com.s3.amazonaws.com',
                    pathPrefix: '/attachments/photo/'
                }
            },
            {
                pageUrl: {
                    hostEquals: 'cdn1.sportngin.com',
                    pathPrefix: '/attachments/photo/'
                }
            },
            {
                pageUrl: {
                    hostEquals: 'cdn2.sportngin.com',
                    pathPrefix: '/attachments/photo/'
                }
            },
            {
                pageUrl: {
                    hostEquals: 'cdn3.sportngin.com',
                    pathPrefix: '/attachments/photo/'
                }
            },
            {
                pageUrl: {
                    hostEquals: 'cdn4.sportngin.com',
                    pathPrefix: '/attachments/photo/'
                }
            },
        ];
    }
    getBiggestUrl(url) {
        let re = /^\/attachments\/photo\/([0-9a-f\/-]{9,}\/.*?)_(?:large|medium|small|thumb)(\.\w+)$/g;
        let result = re.exec(url.pathname);
        if (result !== null) {
            let fileIdAndName = result[1];
            let fileExt = result[2];
            return "https://"+url.hostname+"/attachments/photo/"+fileIdAndName+fileExt;
        }
        return null;
    }
}
