watch_classes = Array('watch_add', 'watch_remove');

function watch_handler(data, textStatus)
{
    j = JSON.parse(data);
    obj = $('#watch-' + String(j.id))
    if (j.error)
    {
        obj.addClass(j.style);
        obj.attr('title', j.error);
    }
    else
    {
        obj.addClass(j.style);
        obj.attr('title', j.title);
        obj.click(click_function(obj, j.url));
    };
}

function click_function(obj, url)
{
    return function()
    {
        watch_toggle(obj, url);
    }
}

function watch_toggle(obj, url)
{
    obj.onclick = null;
    o = $(obj);
    o.unbind('click');
    for (cls in watch_classes)
    {
        if (o.hasClass(watch_classes[cls]))
        {
            o.removeClass(watch_classes[cls]);
        }
    }
    
    $.post(url=url, callback=watch_handler, type='json');
}
