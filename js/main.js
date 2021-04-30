var year = '2021';
var month = '04';
var numedit = 2;
 
console.log('version: '+ year + '.' + month + '.e' + numedit);
var isHaveVideo = false;
var isCallSearchAll = false;
var gLBVXN = new Array();
var gLBVXT = new Array();
var gPID = -1;
var gblogId = '<data:blog.blogId/>';
var gnumBVXT = 0;

function TestShowPostId(postId)
{
    document.write(postId);
}

function removePost(postId)
{
$(postId).remove();
//console.log("Deleted: "+postId);
};


window.addEventListener('resize', function () 
{ 
"use strict";

// if(window.innerWidth>860)
// window.location.reload(); 
});


function getYoutubeInfoByVideoId(videoId)
{
//<![CDATA[
var key = 'AIzaSyCkGFiE6LNPeYEuuA0XX_npdH0D7DGYALo';
$.ajax({
    url: 'https://www.googleapis.com/youtube/v3/videos?id=' + videoId + '&key=' + key + '&part=snippet,statistics',
    type: 'get',
    dataType: 'json',
    success: function(data) 
    {
    var w = ' thag ';
    var x = ', ';
    var t = data.items[0].snippet.publishedAt;
    var publishedAt = t.substring(8, 10) + w + t.substring(5, 7) + x + t.substring(0, 4);
    var channelId = data.items[0].snippet.channelId;
    var channel = 'https://www.youtube.com/channel/' + channelId;
    var subscribe = 'https://www.youtube.com/channel/' + channelId + '?sub_confirmation=1';
    var title = data.items[0].snippet.title;
    var description = data.items[0].snippet.description;
    var channelTitle = data.items[0].snippet.channelTitle;
    var viewCount = data.items[0].statistics.viewCount;
    var numviewCount = parseInt(viewCount).toLocaleString();
    var likeCount = data.items[0].statistics.likeCount;
    var dislikeCount = data.items[0].statistics.dislikeCount;

    function nFormatter(likeCount) 
    {
        if (likeCount >= 1000000000) 
        {
        return (likeCount / 1000000000).toFixed(1).replace(/\.0$/, '') + ' T';
        }
        if (likeCount >= 1000000) 
        {
        return (likeCount / 1000000).toFixed(1).replace(/\.0$/, '') + ' TR';
        }
        if (likeCount >= 1000) 
        {
        return (likeCount / 1000).toFixed(1).replace(/\.0$/, '') + ' N';
        }
        return likeCount;
    }

    function nFormatter(dislikeCount) 
    {
        if (dislikeCount >= 1000000000) 
        {
        return (dislikeCount / 1000000000).toFixed(1).replace(/\.0$/, '') + ' T';
        }
        if (dislikeCount >= 1000000) 
        {
        return (dislikeCount / 1000000).toFixed(1).replace(/\.0$/, '') + ' TR';
        }
        if (dislikeCount >= 1000) 
        {
        return (dislikeCount / 1000).toFixed(1).replace(/\.0$/, '') + ' N';
        }
        return dislikeCount;
    }

    function convert(description) 
    {
        if (description) 
        {
        description = description.replace(/((https?\:\/\/)|(www\.))(\S+)(\w{2,4})(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/gi, function(url) 
        {
            var full_url = url;
            if (!full_url.match('^https?:\/\/')) 
            {
            full_url = 'http://' + full_url;
            }
            return '<a href="' + full_url + '" target="_blank">' + url + '</a>';
        });
        }
        return description;
    }

    $('.video_published').html(publishedAt);
    $('.video_title').html(title);
    $('.video_description').html(convert(description));
    $('.channel_Title').html(channelTitle);
    $('.channel').attr('href', (channel)).attr('title', (channelTitle));
    $('.subscribe').attr('href', (subscribe));
    $('.view_count').html(numviewCount);
    $('.like_count').html(nFormatter(likeCount));
    $('.dislike_count').html(nFormatter(dislikeCount));
    $.ajax({
        url: 'https://www.googleapis.com/youtube/v3/channels?id=' + channelId + '&key=' + key + '&part=snippet,statistics',
        type: 'get',
        dataType: 'json',
        success: function(data) 
        {
        var userphoto = data.items[0].snippet.thumbnails.default.url;
        var subscriberCount = data.items[0].statistics.subscriberCount;

        function nFormatter(subscriberCount) 
        {
            if (subscriberCount >= 1000000000) 
            {
            return (subscriberCount / 1000000000).toFixed(1).replace(/\.0$/, '') + ' T';
            }
            if (subscriberCount >= 1000000) 
            {
            return (subscriberCount / 1000000).toFixed(1).replace(/\.0$/, '') + ' TR';
            }
            if (subscriberCount >= 1000) 
            {
            return (subscriberCount / 1000).toFixed(1).replace(/\.0$/, '') + ' N';
            }
            if (subscriberCount == 0) 
            {
            return (subscriberCount).replace('0', '');
            }
            return subscriberCount;
        }
        $('#img').attr('src', (userphoto)).attr('title', (channelTitle));
        $('.subscriber_Count').html(nFormatter(subscriberCount));
        }
    });
    }
});
//]]>
};

function setVideo()
{
    console.log('.p' + gPID);
    var post_header = $('.post-body #player')[0];
    if(post_header)
    {
        isHaveVideo = true;
        var iframeSrc = post_header.src;
        var iframeSrcSplit = iframeSrc.split("/");
        var videoId = (iframeSrcSplit[iframeSrcSplit.length-1].split("?"))[0];
        var iframe = 'https://www.youtube.com/embed/'+ videoId +'?loop=1&controls=1&rel=0&fs=1&showinfo=0&cc_load_policy=1&iv_load_policy=3&modestbranding=1&enablejsapi=1';                                
        $('.video-container').append('<iframe id="player" allow="______autoplay; encrypted-media" allowfullscreen="1" frameborder="0" src=' + iframe + '></iframe>');
        post_header.remove();
        getYoutubeInfoByVideoId(videoId);
    }
    else
    {
        $('.post-header').remove();
        isHaveVideo = false;
    }
}

function ShowRecentPost()
{
    var bvgy_left = $('#bvgy-left');
    //bvgy_left.find('.bvgy-item.hidden-item').removeClass('hidden-item');
    //$('#bvgy-left').find('.bvgy'+gPID).addClass('hidden-item');

  //  bvgy_left.find('.bvgy'+gPID).addClass('hidden-item');
    bvgy_left.find('.bvgy-item.hidden-item').removeClass('hidden-item');
    //$('#bvgy-left').find('.bvgy-item.hidden-item').removeClass('hidden-item');


    var bvgy_right = $('#bvgy-right');

    bvgy_right.find('.bvgy-item.hidden-item').removeClass('hidden-item');
    /*
    setTimeout(function()
    {
        bvgy_left.removeClass('hidden-item');
        bvgy_right.removeClass('hidden-item');
    }, 1000);
    */
    //$('#PopularPosts1').find('.bvgy-item').removeClass('hidden-item');
    //$('#bvgy-left').append($('#PopularPosts1').find('.bvgy-item'));

}
function showBVXT()
{
    $('.bvxt').find('.bvxt-item.hidden-item').removeClass('hidden-item');
    console.log("show");
}

function getBVXTfromUrl(posBVXT,url)
{
    
    $.ajax(url, 
    {
        dataType: 'html',
    }).done(function(ajaxResult) 
    {
        var doc = new DOMParser().parseFromString(ajaxResult, "text/html");
        var elementBVXT = doc.getElementsByClassName("bvxt-item hidden-item")[0];
        elementBVXT.classList.remove('hidden-item')
        posBVXT.appendChild(elementBVXT);

        var postIdBVXT = elementBVXT.id.split("bvxt-id-")[1]
        gLBVXT.push(postIdBVXT);
        
        //hidenBVGY(postIdBVXT);
        $("#bvxn-id-" + postIdBVXT).addClass('hidden-item2').removeClass('bvgy-item');
        $(".pid" + postIdBVXT).addClass('hidden-item2').removeClass('bvgy-item');
        //$("#bvxn-id-" + postIdBVXT).addClass('hidden-item');
        
        //$('#bvgy-left').find(".bvgy-item.bvxn-id-" + postIdBVXT).addClass('hidden-item2 bvgy' + gPID).removeClass('bvgy-item');
        //$("#bvxn-id-" + postIdBVXT).removeClass('bvgy-item').addClass('hidden-item ' +'bvgy' + postIdBVXT);
        
        //var dataBVXT = doc.querySelector('.bvxt-item.hidden-item');
        //document.getElementsByClassName('bvxt-item hidden-item')[0].classList.remove('hidden-item');
        //showBVXT();
    });
        
};

function loaddataBVXT(postId)
{
    var posBVXTs;
    posBVXTs = document.querySelectorAll('.bvxt'); 
    //posBVXTs= $('.bvxt');
    gnumBVXT = posBVXTs.length;
    if(gnumBVXT>0)
    {
        $.ajax('/p/bvxt-data.html', 
        {
            dataType: 'html',
        }).done(function(ajaxResult) 
        {
            
            var doc = new DOMParser().parseFromString(ajaxResult, "text/html");
            var dataBVXTs = doc.querySelectorAll('.p' + gPID);
            var i = 0;
            //<![CDATA[
            for(i=0 ;i<gnumBVXT;i++)
            {
                var links;
                try
                {
                    links = dataBVXTs[i].innerText.split("@");
                    var link1 = links[1].trim();
                    var link2 = links[2].trim();
                    if(link1 != "N/A") getBVXTfromUrl(posBVXTs[i],link1);
                    if(link2 != "N/A") getBVXTfromUrl(posBVXTs[i],link2);
                }
                catch
                {
                }
            }
            //]]>
            
        });
    }
    
    //$(document).trigger('function_a_complete');
    //$(document).bind('function_a_complete', ShowRecentPost());
};
function BVGYLeft()
{
    return getbvgy('bvgy-left');
}

function BVGYRight()
{
    return getbvgy('bvgy-right');
}

function getbvgy(elId)
{
    return document.querySelectorAll("#" + elId + " .bvgy-item");
}

var article_body_itemHeight;// = document.querySelector("#article-body-item").clientHeight + 45;
var maxRow;// = Math.floor((article_body_itemHeight/194.83)) + 1;
var maxResult;// = 0;//maxRow*6;
var post_num;// = 0;//maxRow*3;
var windowWidth = window.innerWidth;
                          
function getRelatedPosts(url)
{
    //$("#keyword"+ gPID).append("Height = " + article_body_itemHeight + ", MaRow = " + maxRow + ", MaxResult = " + maxResult);
    
    if (windowWidth <=860)
    {
        maxResult = 40;
        post_num = 0;
    }
    else if (windowWidth >= 861 && windowWidth <=1366 ) 
    {
        if(isHaveVideo)
        {
            if(maxRow < 8)
            {
                maxResult = 8*gnumBVXT + 20;
                post_num = 2*gnumBVXT;
            }
            else
            {
                maxResult = maxRow*4 + 8*gnumBVXT + 6;
                post_num = 2*(maxRow + 2*gnumBVXT - 5);
            }
        }
        else
        {
            if(maxRow < 8)
            {
                maxResult = 8*gnumBVXT + 10;
                post_num = 2*gnumBVXT;
            }
            else
            {
                maxResult = maxRow*4 + 8*gnumBVXT + 1;
                post_num = 2*(maxRow + 2*gnumBVXT - 5);
            }
        }
    }
    else if (windowWidth >1366)
    {
        columDisplay=3;
        if(isHaveVideo)
        {
            if(maxRow < 7)
            {
                maxResult = 12*gnumBVXT + 35;
                post_num = 2*gnumBVXT;
            }
            else
            {
                maxResult = maxRow*6 + 12*gnumBVXT + 12;
                post_num = 3*(maxRow + 2*gnumBVXT - 4);
            }
        }
        else
        {
            if(maxRow < 7)
            {
                maxResult = 12*gnumBVXT + 27;
                post_num = 2*gnumBVXT;
            }
            else
            {
                maxResult = maxRow*6 + 12*gnumBVXT + 1;
                post_num = 3*(maxRow + 2*gnumBVXT - 4);
            }
        }
    }

    //console.log('url: ' + url);
    //console.log('maxResult: ' + maxResult);

    //var doc_post; 
    var numpost = 0;
    $.ajax(url + maxResult, 
    {
        dataType: 'html',
    }).done(function(ajaxResult) 
    {
        var doc = new DOMParser().parseFromString(ajaxResult, "text/html");
        var doc_post = doc.querySelectorAll('.post');
        numpost = doc_post.length;
        //console.log(isCallSearchAll);

        if(numpost < maxResult && !isCallSearchAll ) 
        {
            getRelatedPosts('/search/?max-results='+ maxResult);
            isCallSearchAll = true;
        }
        else
        {
            /*
            var tempElement = document.createElement("div");
            tempElement.setAttribute("id", tempElementId);
            document.body.appendChild(tempElement); 

            var rs = $("#"+tempElementId).append(doc_post);
            
            var npost2 = rs.find('.post').removeClass('post').addClass('pidc' + gPID).addClass('bvgy-item hidden-item');

            $('#bvgy-right').append(npost2);

            */        
            $('#bvgy-right').append(doc_post);
            $('#bvgy-right').find('.post').removeClass('post').addClass('pidc' + gPID).addClass('bvgy-item hidden-item');
            //document.querySelector('#bvgy-right').appendChild(doc_post[0]);

            //$("#" + tempElementId).remove();

            gLBVXN.push(gPID);
            gLBVXN.forEach(hideBVGY1);
            function hideBVGY1(value) 
            {
                $(".pid" + value).addClass('hidden-item2').removeClass('bvgy-item');
            }

            gLBVXT.forEach(hideBVGY2);
            function hideBVGY2(value) 
            {
                $(".pid" + value).addClass('hidden-item2').removeClass('bvgy-item');
            }

            $("#apid" + gPID).removeClass('bvgy-item');
            $("#bvxn-id-" + gPID).removeClass('bvgy-item').addClass('hidden-item');

            //$('.bvgy-item.hidden-item').removeClass('hidden-item');
            //ShowRecentPost();
        
            var bvgyleftCount = BVGYLeft().length ;//document.querySelectorAll("#bvgy-left .bvgy-item").length;
            
            var bvgyleftNeedAdd=0;
            //<![CDATA[
            if (windowWidth <=860 ) 
            {
                bvgyleftNeedAdd = 10 - bvgyleftCount;
            }
            else if (windowWidth >= 861 && windowWidth <=1366 ) 
            {
                bvgyleftNeedAdd = 10 - bvgyleftCount;
            }
            else if (windowWidth >1366)
            {
                bvgyleftNeedAdd = 12 - bvgyleftCount;
            }
            
            var pos, len = post_num + bvgyleftNeedAdd;
            var data = BVGYRight() ;//document.querySelectorAll('#bvgy-right .bvgy-item.pidc1691217876339742303' + postidcurrent);

            //console.log(data);

            for (pos = 0;pos <len; pos++)
            {
                $("#bvgy-left").append(data[pos]);
            }
            
            bvgyleftCount = BVGYLeft().length ;//document.querySelectorAll("#bvgy-left .bvgy-item").length;
            var BVGYRights = BVGYRight() ;//document.querySelectorAll("#bvgy-right .bvgy-item");
            //var BVGYRights = $("#bvgy-right").find('.bvgy-item'); 
            var bvgyrightCount = BVGYRights.length;

            if (windowWidth >= 861 && windowWidth <=1366 ) 
            {
                if(isHaveVideo)
                {
                    bvgyrightCount = bvgyrightCount - 6;
                }
                else
                {
                }
            }
            else if (windowWidth >1366)
            {
                if(isHaveVideo)
                {
                    bvgyrightCount = bvgyrightCount - 12;
                }
                else
                {
                }
            }

            var numHide = bvgyrightCount - bvgyleftCount
            var j = 1;
            for (j = 1;j <=numHide; j++)
            {
                BVGYRights[bvgyrightCount-j].remove();
            }

        }

        
        
        ShowRecentPost();
    })
    if(isHaveVideo)
    {
        //document.querySelector("#bvgy-right").style.height = 'px';
    }
    else
    {
        //document.querySelector("#bvgy-right").style.height = '2200px';
    }
}


/*

function atRP()
{
    var posts = $('.posts article');//[6].getAttribute("class");
    var counts = posts.length;
    //console.log(posts);
    var i=0;
    var vt = -1;


    while (i<counts)
    {
        var p = posts[i];
        var cl = p.getAttribute("class");
        vt = i+1;
        //console.log( i + ': ' + cl);
        if(cl=='google-auto-placed')
        {
            if(vt % 2 == 0)
            {
                var p1 = posts[i-1];
                var cl1 = p1.getAttribute("class");
                if(cl1!='google-auto-placed')
                {
                    p1.style='width:100%';
                    i = i + 1;
                }
                
            }
            else
            {
                var p1 = posts[i+1];
                var cl1 = p1.getAttribute("class");
                if(cl1 == 'google-auto-placed')
                {
                    i = i + 1;
                }
                else
                {
                    if(i==counts-2)
                    {
                        p1.style='width:100%';
                    }
                    else
                    {
                        var p2 = posts[i+2];
                        var cl2 = p2.getAttribute("class");

                        if(cl2 == 'google-auto-placed')
                        {
                            p1.style='width:100%';
                        }  
                        i = i + 2;
                    }
                    
                }
            }
        }
        else
        {
            i = i + 1;
        } 
    }
    
    var pn = posts[counts-1];
    var cln = pn.getAttribute("class");
    if(cln !='google-auto-placed')
    {
        pn.style='width:100%';
    }
    
}
*/

 function getClass(e)
 {
     return e.getAttribute("class");
 }
function atRP()
{
    var posts = $('.posts article');//[6].getAttribute("class");
    var counts = posts.length;
    //console.log(posts);
    var i=0;
    var vt = -1;


    while (i<counts)
    {
        var pcurrent = posts[i];
        var clcurrent = getClass(pcurrent);
        console.log('clcurrent ' + i + ': ' + clcurrent);
        if(clcurrent == 'google-auto-placed')
        {
            i = i + 1;
        }
        else
        {
            if(i<counts-1)
            {
                var clnext = getClass(posts[i+1]);
                console.log('clnext: ' + (i+1) + ': ' +clnext);
                if(clnext == 'google-auto-placed')
                {
                    pcurrent.style='width:100%';
                    i = i + 2;
                }
                else
                {
                    i = i + 2;
                }
            }
            else
            {
                var clpre1 = getClass(posts[i-1]);
                console.log('clpre1: ' + (i-1) + ': ' +clpre1);

                var clpre2 = getClass(posts[i-2]);
                console.log('clpre2: ' + (i-2) + ': ' +clpre2);

                if(clpre1 == 'google-auto-placed')
                {
                    pcurrent.style='width:100%';
                    i = i + 1;
                }
                else if((clpre1 != 'google-auto-placed')&&(clpre2 == 'google-auto-placed'))
                {
                    pcurrent.style='width:100%';
                    i = i + 1;
                }
                else
                {
                 i = i + 1;
                }
             
            }
        }
    }
    /*
    var pn = posts[counts-1];
    var cln = pn.getAttribute("class");
    if(cln !='google-auto-placed')
    {
        pn.style='width:100%';
    }
    */
}

//atRP();




