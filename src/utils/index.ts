// 为url最前面添加/
const addPrefixSlashForUrl = (url: string) : string =>{
    if(url && url[0] === '/') {
        return url;
    } else {
        return '/' + url;
    }
};

// 去除url最前面/
const removePrefixSlashForUrl = (url: string) : string => {
    if(url && url[0] === '/') {
        return url.substr(1);
    }
    return '';
};
export {
    addPrefixSlashForUrl,
    removePrefixSlashForUrl
};