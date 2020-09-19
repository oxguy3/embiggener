import Parser from '/modules/Parser.js'

export default class DukeChronicleArchives extends Parser {
    getConditions() {
        return [
            {
                pageUrl: {
                    hostEquals: 'library.duke.edu',
                    pathPrefix: '/digitalcollections/media/jpg/dukechronicle/med/',
                }
            },
            {
                pageUrl: {
                    hostEquals: 'library.duke.edu',
                    pathPrefix: '/digitalcollections/media/jpg/dukechronicle/thm/',
                }
            },
        ];
    }
    getBiggestUrl(url) {
        return url.toString().replace(
            "/digitalcollections/media/jpg/dukechronicle/med/",
            "/digitalcollections/media/jpg/dukechronicle/lrg/"
        ).replace(
            "/digitalcollections/media/jpg/dukechronicle/thm/",
            "/digitalcollections/media/jpg/dukechronicle/lrg/"
        );
    }
}
