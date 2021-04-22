
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
    var post_header = $('.post-body #player')[0];
    if(post_header)
    {
        isHaveVideo=true;
        var iframeSrc = post_header.src;
        var iframeSrcSplit = iframeSrc.split("/");
        var videoId = (iframeSrcSplit[iframeSrcSplit.length-1].split("?"))[0];
        //<![CDATA[
        var iframe = 'https://www.youtube.com/embed/'+ videoId +'?loop=1&controls=1&rel=0&fs=1&showinfo=0&cc_load_policy=1&iv_load_policy=3&modestbranding=1&enablejsapi=1';                                
        $('.video-container').append('<iframe id="player" allow="______autoplay; encrypted-media" allowfullscreen="1" frameborder="0" src=' + iframe + '></iframe>');
        //]]>
        post_header.remove();
        getYoutubeInfoByVideoId(videoId);
    }
    else
    {
        $('.post-header').remove();
        isHaveVideo=false;
    }
}

function ShowRecentPost()
{
    gLBVXT.forEach(postRemove1);
    function postRemove1(postId) 
    {
//        $("#bvxn-id-" + postId).addClass('hidden-item');
    }

    var bvgy_left = $('#bvgy-left');
    //bvgy_left.find('.bvgy-item.hidden-item').removeClass('hidden-item');
    //$('#bvgy-left').find('.bvgy'+gPID).addClass('hidden-item');

  //  bvgy_left.find('.bvgy'+gPID).addClass('hidden-item');
    bvgy_left.find('.bvgy-item.hidden-item').removeClass('hidden-item');
    //$('#bvgy-left').find('.bvgy-item.hidden-item').removeClass('hidden-item');


    var bvgy_right = $('#bvgy-right');

    bvgy_right.find('.bvgy-item.hidden-item').removeClass('hidden-item');
    
    setTimeout(function()
    {
        bvgy_left.removeClass('hidden-item');
        bvgy_right.removeClass('hidden-item');
    }, 1500);
    
    //$('#PopularPosts1').find('.bvgy-item').removeClass('hidden-item');
    //$('#bvgy-left').append($('#PopularPosts1').find('.bvgy-item'));

}
function showBVXT()
{
    $('.bvxt').find('.bvxt-item.hidden-item').removeClass('hidden-item');
    console.log("show");
}

function hidenBVGY(postId)
{
    $("#bvxn-id-" + postId).addClass('hidden-item2').removeClass('bvgy-item');
    $("#apid" + postId).addClass('hidden-item2').removeClass('bvgy-item');
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
        //$("#bvxn-id-" + postIdBVXT).addClass('hidden-item2').removeClass('bvgy-item');
        //$("#apid" + postIdBVXT).addClass('hidden-item2').removeClass('bvgy-item');
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
    //$(document).trigger('function_a_complete');
    //$(document).bind('function_a_complete', ShowRecentPost());
};


var article_body_itemHeight;// = document.querySelector("#article-body-item").clientHeight + 45;
                          var maxRow;// = Math.floor((article_body_itemHeight/194.83)) + 1;
                          var maxResult;// = 0;//maxRow*6;
                          var post_num;// = 0;//maxRow*3;
                          

                          
                          
                          var windowWidth = window.innerWidth;
                          

                          
                          function getRelatedPosts(url,maxresults)
                          {
                           $("#keyword"+ gPID).append("Height = " + article_body_itemHeight + ", MaRow = " + maxRow + ", MaxResult = " + maxResult);
                            console.log(maxresults);
                            //<![CDATA[
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
                                      maxResult = 20;
                                      post_num = 0;
                                    }
                                    else
                                    {
                                      maxResult = maxRow*4 + 6;
                                      post_num = (maxRow-5)*2;
                                    }
                                  }
                                  else
                                  {
                                    if(maxRow < 8)
                                    {
                                      maxResult = 10;
                                      post_num = 0;
                                    }
                                    else
                                    {
                                      maxResult = maxRow*4+1;
                                      post_num = (maxRow-5)*2;
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
                                      maxResult = 35
                                      post_num = 0;
                                    }
                                    else
                                    {
                                      maxResult = maxRow*6 +12;
                                      post_num = (maxRow-4)*3;
                                    }
                                  }
                                  else
                                  {
                                    if(maxRow < 7)
                                    {
                                      maxResult = 27;
                                      post_num = 0;
                                    }
                                    else
                                    {
                                      maxResult = maxRow*6+1;
                                      post_num = (maxRow-4)*3;
                                    }
                                  }
                                }
                              //]]>
                            var placeshowdata ='#bvgy-right';
                            var tempElementId = "relatedPoststmp2021"
                            var newClass = 'bvgy-item hidden-item';
                            var postidcurrent = 'pidc' + gPID;
                            //var doc_post; 
                            var numpost = 0;
                            $.ajax(url + maxResult,//maxresults, 
                            {
                              dataType: 'html',
                            }).done(function(ajaxResult) 
                            {
                               
                            
                               
                               
                              var doc = new DOMParser().parseFromString(ajaxResult, "text/html");
                              
                              var doc_post = doc.querySelectorAll('.post');
                              numpost = doc_post.length;

                              var tempElement = document.createElement("div");
                              tempElement.setAttribute("id", tempElementId);
                              document.body.appendChild(tempElement); 

                              var rs = $("#"+tempElementId).append(doc_post);
                              
                              var npost2 = rs.find('.post').removeClass('post').addClass(postidcurrent).addClass(newClass);
                              $('#bvgy-right').append(npost2);
                              //document.querySelector('#bvgy-right').appendChild(doc_post[0]);

                              //$("#" + tempElementId).remove();

                              gLBVXN.push(gPID);
                              gLBVXN.forEach(hideBVGY1);
                              function hideBVGY1(value) 
                              {
                                $("#apid" + value).addClass('hidden-item2').removeClass('bvgy-item');
                                //hidenBVGY(value);
                              }

                              gLBVXT.forEach(hideBVGY2);
                              function hideBVGY2(value) 
                              {
                                //$("#apid" + value).removeClass('bvgy-item');
                                hidenBVGY(value);
                              }

                              $("#apid" + gPID).removeClass('bvgy-item');
                              $("#bvxn-id-" + gPID).removeClass('bvgy-item').addClass('hidden-item');

                              //$('.bvgy-item.hidden-item').removeClass('hidden-item');
                              //ShowRecentPost();
                            
                              var recent_post_current_count = document.querySelectorAll("#bvgy-left.bvgy-item").length;
                              var numNeedAdd=0;
                              //<![CDATA[
                                if (windowWidth <=860 ) 
                                {
                                  numNeedAdd = 10 - recent_post_current_count;
                                }
                                else if (windowWidth >= 861 && windowWidth <=1366 ) 
                                {
                                  numNeedAdd = 10 - recent_post_current_count;
                                }
                                else if (windowWidth >1366)
                                {
                                  numNeedAdd = 12 - recent_post_current_count;
                                }
                                
                                var pos, len = post_num + numNeedAdd;
                                var data = document.querySelectorAll('.' + postidcurrent);
                                for (pos = 0;pos <len; pos++)
                                {
                                  //$("#bvgy-left").append(data[pos]);
                                }
                              
                                recent_post_current_count = document.querySelectorAll("#bvgy-left .bvgy-item").length;
                                var dataRelatedPosts = document.querySelectorAll("#bvgy-right .bvgy-item");
                                //var dataRelatedPosts = $("#bvgy-right").find('.bvgy-item'); 
                                var related_post_current_count = dataRelatedPosts.length;

                                if (windowWidth >= 861 && windowWidth <=1366 ) 
                                {
                                  if(isHaveVideo)
                                  {
                                    related_post_current_count = related_post_current_count - 6;
                                  }
                                  else
                                  {
                                  }
                                }
                                else if (windowWidth >1366)
                                {
                                  if(isHaveVideo)
                                  {
                                    related_post_current_count = related_post_current_count - 12;
                                  }
                                  else
                                  {
                                  }
                                }

                                var numHide = related_post_current_count - recent_post_current_count
                                var j = 1;
                                for (j = 1;j <=numHide; j++)
                                {
                                  //dataRelatedPosts[related_post_current_count-j].remove();
                                }
                              //]]>

                              //<![CDATA[
                              
                                if(numpost < maxresults && !isCallSearchAll ) 
                                {
                                  getRelatedPosts('/search/?max-results=',maxresults);
                                  isCallSearchAll = true;
                                }
                                
                              //]]>
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
