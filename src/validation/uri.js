import * as URI from 'uri-js'

const uri = function (node) {
    try {
        const checkUri = URI.parse(node.value, {reference: 'absolute', absolutePath: true});

        return !checkUri.error;
    } catch (e) {
        return false;
    }
}

export default uri
