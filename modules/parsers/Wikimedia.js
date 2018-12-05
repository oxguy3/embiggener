import Parser from '/modules/Parser.js'

export default class Wikimedia extends Parser {
    getConditions() {
        return [
            { pageUrl: { hostEquals: 'upload.wikimedia.org' } },
        ];
    }
    getBiggestUrl(url) {
        if (url.hostname == "upload.wikimedia.org") {
            let re = /^\/(\w+)\/(\w+)(?:\/thumb)?\/[0-9a-f]\/[0-9a-f]{2}\/([^#<>\[\]\|\{\}\/]+)(?:\/(?:page\d+-)?\d+px-[^#<>\[\]\|\{\}\/]+)?$/ig;
            let result = re.exec(url.pathname);
            if (result !== null) {
                let website = result[1];
                let language = result[2];
                let filename = result[3];

                // special case for .wikimedia.org domains
                let specialLanguages = [ "commons", "species", "meta" ];
                if (website == "wikipedia" && specialLanguages.indexOf(language) != -1) {
                    website = "wikimedia";
                }

                return "https://"+language+"."+website+".org/wiki/File:"+filename;
            }
        }
        return null;
    }
}
