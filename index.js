console.log('Api Tester');

let addedParamCount = 0;

function getvalue(str) {
    let div = document.createElement("div");
    // div.appendChild(str);
    div.innerHTML = str;
    return div.firstElementChild;
}


let parameterbox = document.getElementById("parameterbox");
parameterbox.style.display = "none"
// when user click custome parameter box json hide
let paramradio = document.getElementById("customeparams");
paramradio.addEventListener("click", () => {

    document.getElementById("jsontext").style.display = "none";
    document.getElementById("parameterbox").style.display = "block"
})
// json radio
let jsonradio = document.getElementById("json");
jsonradio.addEventListener("click", () => {
    console.log(jsonradio);

    document.getElementById("jsontext").style.display = "block";
    document.getElementById("parameterbox").style.display = "none"

})

let parameter = document.getElementById("addbtn");
parameter.addEventListener("click", () => {
    // console.log('click');

    let str =  `<div class="from-group row my-2">
    <label for="parameter" style="    text-align: center;"
        class="col-sm-2 col-form-label">Parameter ${addedParamCount+2}</label>
    <div class="col">
        <input type="text" class="form-control" id="parameterKey${addedParamCount+2}"
            placeholder="Enter Parameter ${addedParamCount+2} key ">
    </div>


    <div class="col">
        <input type="text" class="form-control" id="parameterValue${addedParamCount+2}"
            placeholder="Enter Parameter ${addedParamCount+2} value">
    </div>
    <button id="addbtn" class="btn btn-primary col-sm-1 deleteparam ">-</button>
</div>`;
    let paramvalue = getvalue(str);
    let parentparam = document.getElementById("params")
    parentparam.append(paramvalue);
    let deleteparam = document.getElementsByClassName("deleteparam");
    for (let button of deleteparam) {
        button.addEventListener("click", (e) => {
            e.target.parentElement.remove();
        })
    }
    addedParamCount++;
});

let submit = document.getElementById("submit");
submit.addEventListener("click", () => {
    console.log('click');
    document.getElementById("responsecode").innerHTML = "Please Wait... Fetching...Response..."
    let url = document.getElementById("urlbox").value;
    let radio = document.querySelector("input[name='radiotype']:checked").value;
    let content = document.querySelector("input[name='content']:checked").value;

    if (content == 'params') {
        data = {};
        for (let i = 0; i < addedParamCount + 1; i++) {
            if (document.getElementById('parameterKey' + (i + 1)) != undefined) {
                let key = document.getElementById('parameterKey' + (i + 1)).value;
                let value = document.getElementById('parameterValue' + (i + 1)).value;
                data[key] = value; 
            }
        }
        data = JSON.stringify(data);
    }
    else {
        data = document.getElementById('requestJsonText').value;
    }

    console.log(url);
    console.log(radio);
    console.log(content);
    console.log(data);

    if (radio == 'GET') {
        fetch(url, {
            method: 'GET',
        })
            .then(response => response.text())
            .then((text) => {
                document.getElementById('responsecode').innerHTML = text;
                // document.getElementById('responsePrism').innerHTML = text;
                Prism.highlightAll();

            });
    }
    else {
        fetch(url, {
            method: 'POST', 
            body: data,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
              }  
        })
        .then(response=> response.text())
        .then((text) =>{
            // document.getElementById('responsepre').value = text;
            document.getElementById('responsecode').innerHTML = text;
            Prism.highlightAll();
        });

    }






});



