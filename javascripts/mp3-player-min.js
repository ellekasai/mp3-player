$(function(){function t(t){var e=t.attr("song"),a=t.attr("cover"),n=t.attr("album"),l=t.attr("artist"),r=t.text();i=new Audio("music/"+e),$("#title").text(r),$("#album").text(n),$("#artist").text(l),$("#cover-img").attr("style","background-image: url(images/covers/"+a+")"),$("#playlist li").removeClass("active"),t.addClass("active")}function e(){$(i).bind("timeupdate",function(){var t=$("#duration"),e=parseInt(i.currentTime%60),a=parseInt(i.currentTime/60)%60,n;e<10?t.html(a+":0"+e):t.html(a+":"+e),i.currentTime>0&&(n=Math.floor(100/i.duration*i.currentTime)),$("#progress").css("width",n+"%")})}function a(){var t=parseInt(i.duration);$(i).bind("timeupdate",function(){var e=parseInt(i.currentTime),a=t-e,n,l,r;n=a%60,l=Math.floor(a/60)%60,r=Math.floor(a/360)%60,n=n<10?"0"+n:n,l=l<10?"0"+l:l,r=r<10?"0"+r:r,$("#timeleft").html(r+":"+l+":"+n)})}var i;$("#pause-btn").hide(),t($("#playlist li:first-child")),$("#play-btn").click(function(t){t.preventDefault(),$("#play-btn").hide(),$("#pause-btn").show(),e(),a(),i.play()}),$("#pause-btn").click(function(t){t.preventDefault(),i.pause(),$("#play-btn").show(),$("#pause-btn").hide()}),$("#stop-btn").click(function(t){t.preventDefault(),i.pause(),$("#play-btn").show(),$("#pause-btn").hide(),i.currentTime=0,$("#progress").css("width","0%")}),$("#next-btn").click(function(n){n.preventDefault(),i.pause();var l=$("#playlist li.active").next();0==l.length&&(l=$("#playlist li:first-child")),t(l),i.addEventListener("loadeddata",function(){e(),a(),i.play()})}),$("#prev-btn").click(function(n){n.preventDefault(),i.pause();var l=$("#playlist li.active").prev();0==l.length&&(l=$("#playlist li:last-child")),t(l),i.addEventListener("loadeddata",function(){e(),a(),i.play()})}),$("#playlist li").click(function(n){i.pause(),t($(this)),$("#play-btn").hide(),$("#pause-btn").show(),i.addEventListener("loadeddata",function(){e(),a(),i.play()})}),$("#volume-slider").change(function(){i.volume=parseFloat(this.value/10)}),$("#progress-bar").on("click",function(t){var e=$(this).width(),a=t.offsetX,n=a/e;$("#progress").css("width",Math.floor(100*n)+"%"),i.currentTime=i.duration*n})});