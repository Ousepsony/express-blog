module.exports.url = (_) => {
    var newDate = new Date()
    let kebabDate = _.kebabCase(newDate.toLocaleDateString("en-US",{month:"numeric",day:"numeric",year:"numeric"}))
    return kebabDate;
}