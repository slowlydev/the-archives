window.onload = load();


function getQueryVariable(variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}

function load() {

    if(getQueryVariable("id")) {

        var id = getQueryVariable("id");
    
        let container = document.querySelector(".video-container");
    
        let video = document.createElement("iframe");
    
        video.className = "video";
    
        video.setAttribute("src", "https://youtube.com/embed/" + id + "?autoplay=1");
        video.setAttribute("frameborder", "0");
        video.setAttribute("allowfullscreen", "");
        video.setAttribute("allow", "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture;");
    
        container.appendChild(video);

        container.style.backgroundColor = "transparent";

        setTimeout(togglePiP, 5000)

    
    } else {

        let container = document.querySelector(".no-id-container");
    
        let badge = document.createElement("img");

        badge.setAttribute("src", "/resources/icon/badge.png");
        badge.setAttribute("alt", "Requires VideoX Shortcut");
        badge.className = "badge";

        let link = document.createElement("a");

        link.setAttribute("href", "https://www.icloud.com/shortcuts/6a2ef89fa7c345f4b4cc7452f84f2dd6");

        container.appendChild(link);
        link.appendChild(badge)
    
    }
}

function togglePiP() {
    var video = document.getElementsByClassName("video");
    video.webkitSetPresentationMode(video.webkitPresentationMode === "picture-in-picture" ? "inline" : "picture-in-picture");
}