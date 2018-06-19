window.onload=main;

var _inputBox;
var _output;

var _lastPixivCount=-1;

function main()
{
    var genLinkB=document.querySelector(".gen-link");
    _inputBox=document.querySelector(".input-box");
    _output=document.querySelector(".output");

    genLinkB.addEventListener("click",(e)=>{
        parseInput();
    });

    var openAllB=document.querySelector(".open-all");

    openAllB.addEventListener("click",(e)=>{
        var links=document.querySelectorAll(".output a");

        for (var x=0,l=links.length;x<l;x++)
        {
            links[x].click();
        }
    });
}

function parseInput()
{
    var inputLinks=_inputBox.value.split("\n");
    _output.innerHTML="";

    for (var x=0,l=inputLinks.length;x<l;x++)
    {
        if (inputLinks[x].length<5)
        {
            return;
        }

        _output.insertAdjacentHTML("beforeend",`<a href="${inputLinks[x]}" target="_blank" rel="noreferrer">${inputLinks[x]}</a>`);
    }
}

//give it the top page of a pixiv multi image to generate native pixiv
//big image links
//give it the direct source of an image to generate source links, it doesnt
//matter which page it is
function pixivgen(url,count=_lastPixivCount)
{
    if (count<0)
    {
        console.log("count missing!");
        return;
    }

    if (url.length<=50)
    {
        console.log(`usage:\npixivgen(url,count)\n\nsteps:\n1. navigate to the top pixiv page of a pixiv manga page\n2. give that link and the number of pages to the function as url,count\n3. generate the pages and open all the links so the images cache.\n4. take any of the newly open tabs and get a source image url by dragging the image on the page into a tab\n5. give the function that url. the count can be omitted, it will use the last entered count\n6. generate again and open.`);
        return;
    }

    var toppagereg=/\?mode=medium/;
    var srcreg=/img-original/;
    var res="";

    //if it is the top page pixiv
    if (url.search(toppagereg)>0)
    {
        //the illustrator id
        var illid=url.replace(/.*illust_id=(\d+)/,"$1");
        for (var x=0;x<count;x++)
        {
            res+=`https://www.pixiv.net/member_illust.php?mode=manga_big&illust_id=${illid}&page=${x}\n`;
        }
    }

    //or it is a source image
    else if (url.search(srcreg)>0)
    {
        var preurl=url.match(/(.*_p)\d+\.(\w+)/);
        var imgextension=preurl[2];
        preurl=preurl[1];

        for (var x=0;x<count;x++)
        {
            res+=`${preurl}${x}.${imgextension}\n`;
        }
    }

    _inputBox.value=res;
}