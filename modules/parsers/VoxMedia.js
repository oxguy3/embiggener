import Parser from '/modules/Parser.js'

/* Vox Media sites (The Verge, Vox, SBNation, Eater, Polygon, etc) */
export default class VoxMedia extends Parser {
    getConditions() {
        return [
            {
                pageUrl: {
                    hostEquals: 'cdn.vox-cdn.com',
                    pathPrefix: '/thumbor/',
                }
            },
        ];
    }
    getBiggestUrl(url) {
        let re = /^\/thumbor\/[^\/]+\/[^\/]+\/[^\/]+\/[^\/]+\/(.*)$/g;
        let result = re.exec(url.pathname);
        if (result !== null) {
            let originalUrl = result[1];

            // Use HTTPS if we know the URL supports it
            let protocol = 'http';
            if (originalUrl.startsWith('cdn.vox-cdn.com/')) {
                protocol = 'https';
            }
            return "http://"+originalUrl;
        }
        return null;
    }
}
