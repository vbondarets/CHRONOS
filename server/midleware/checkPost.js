class CheckPost {
    checktitle(title) {
        if (title.length>50 || title.length<0) {return false}
        return title
    }
    checkContent(info) {
        if (info.length>500 || info.length===0) {return false}
        return info
    }
}

module.exports = new CheckPost()