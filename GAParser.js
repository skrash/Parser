function GetAttr(AttrName,Tag)
{
    /* Attr - искомый атрибут в теге
    Tag - массив тегов в виде строки 
    На выходе массив извлеченных строк из атрибутов в тегах
    ТОЛЬКО ДЛЯ СТРОКОВЫХ ДАННЫХ АТРИБУТА (полезно для извлечение ссылок якорей и тп)
    Для иных случаев функцию не применять.*/
    if(typeof(RegStr) != typeof('') || bodyHtml != typeof('') || InnerLevel != typeof(1))
    {
        console.log('incorrect argument for function.');
        return null;
    }
    if(AttrName == null || Tag == null || AttrName == '' || Tag == '')
    {
        console.log('attribute or tag is null or empty');
        return null;
    }
    else
    {
        let regexpQuotes = new RegExp(/\u0022/);
        let regexpAttr = new RegExp(AttrName);
        var ArrayOut = new Array();
        var mismatched = 0;
        var RegExpCountMatches = new RegExp(AttrName,'g');
        var CountMatches = Tag.match(RegExpCountMatches);
        for(var i = 0; i < CountMatches.length;i++)
        {
            if(regexpQuotes.exec(Tag) != null)
            {
                var firstMatch = regexpAttr.exec(Tag).index; // индекс первого совпадения атрибута
                var len = regexpQuotes.exec(Tag.substr(firstMatch)).index+1; // индекс позиции кавычек относительно атрибута
                var substr = Tag.substr(firstMatch+len); // отрезаем до позиции кавычек
                var SecondMatch = regexpQuotes.exec(substr).index; // ищем следующие кавычки
                var substr2 = substr.substr(0,SecondMatch);
            }
            if(substr != null)
            {
                ArrayOut[i] = substr2+'\n';
            }
            else
            {
                mismatched++;
            }
            Tag = substr.substr(SecondMatch);
        }
    console.log('matched: ' + ArrayOut.length + ' mismatched: '+mismatched);
    return ArrayOut;
    }
}
module.exports = GetAttr;