'use strict';

const getLastFromURL = async (url) => {
    let name = decodeURI(url).split('/').pop();
    name = name.replace(/(\r\n|\n|\r)/gm,"");
    return String(name);
}

module.exports = {
    getLastFromURL: getLastFromURL
}