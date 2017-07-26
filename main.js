window.onload=main;

var _inputBox;
var _output;
function main()
{
    var testb=document.querySelector(".test");
    _inputBox=document.querySelector(".input-box");
    _output=document.querySelector(".output");

    testb.addEventListener("click",(e)=>{
        parseInput();
    });

    var testc=document.querySelector(".click-test");

    testc.addEventListener("click",(e)=>{
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

    for (var x=0,l=inputLinks.length;x<l;x++)
    {
        if (inputLinks[x].length<5)
        {
            return;
        }

        _output.insertAdjacentHTML("beforeend",`<a href="${inputLinks[x]}" target="_blank" rel="noreferrer">link</a>`);
    }
}