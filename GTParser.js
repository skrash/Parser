function GetTag(RegStr,bodyHtml)
{
    /* RegStr - регулярное выражение в виде строки для поиска тега с заданным классом 
    bodyHtml - весь документ в виде строки 
    На выходе массив найденых строк содержащие искомый тег в документе*/
    if(typeof(RegStr) != typeof('') || typeof(bodyHtml) != typeof(''))
    {
        console.log('incorrect argument for function.');
        return null;
    }
    if(bodyHtml == null || RegStr == null || bodyHtml == '' || RegStr == '')
    {
        console.log('body or regular string is null or empty');
        return null;
    }
    else
    {
        let regexpStart = new RegExp('<');
        let regexpEnd = new RegExp('>');
        let regexpTag = new RegExp(RegStr);
        var ArrayOut = new Array();
        var mismatched = 0;
        var matchstr = bodyHtml.match(/</g);
        for(var i = 1; i < matchstr.length;i++)
        {
            if(regexpStart.exec(bodyHtml) != null)
            {
                var firstMatch = regexpStart.exec(bodyHtml).index;
                var len = regexpEnd.exec(bodyHtml.substr(firstMatch)).index;
                var substr = bodyHtml.substr(firstMatch,len);
            }
            if(regexpTag.exec(substr) != null)
            {
                ArrayOut[i] = substr + '>';
            }
            else
            {
                mismatched++;
            }
            bodyHtml = bodyHtml.substr(firstMatch+len);
        }
    console.log('matched: ' + ArrayOut.length + ' mismatched: '+mismatched);
    return ArrayOut;
    }
}
module.exports = GetTag;