(function(){

    const from_amount = document.getElementById("from_amount");
    const convert_from = document.getElementById("convert_from");
    const to_amount = document.getElementById("to_amount");
    const convert_to = document.getElementById("convert_to");
    const inputs_bottom_span = document.querySelector("#inputs-bottom span");
    let locale_currency;

    navigator.geolocation.getCurrentPosition(suc,err);

    async function suc(e){
        let lat = e.coords.latitude;
        let lon = e.coords.longitude;
        let response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${lat}%2C${lon}&key=4c9f083375f141c6b56e9224962ad296`)
        let data = await response.json();
        locale_currency = data.results[0].annotations.currency.iso_code;
        printTopInfo();
    }

    function err(e){
        console.log(e);
        locale_currency="TRY";
        printTopInfo();
    }

    fetch("https://v6.exchangerate-api.com/v6/f242c41c26a63a05a94ba1d4/codes")
    .then(response => response.json())
    .then(data=>{
        for(let i of data.supported_codes){
            document.getElementById("convert_from_list").insertAdjacentHTML("beforeend",`<option value="${i[0]}">${i[1]}</option>`);
            document.getElementById("convert_to_list").insertAdjacentHTML("beforeend",`<option value="${i[0]}">${i[1]}</option>`);
        }
    });

    from_amount.addEventListener("input",(e)=>{
        exchange(convert_from.value,convert_to.value,from_amount.value,to_amount);
    });
    
    convert_from.addEventListener("input",(e)=>{
        exchange(convert_from.value,convert_to.value,from_amount.value,to_amount);
    });

    to_amount.addEventListener("input",(e)=>{
        exchange(convert_to.value,convert_from.value,to_amount.value,from_amount);
    });

    convert_to.addEventListener("input",(e)=>{
        if(to_amount.value==0)
            exchange(convert_from.value,convert_to.value,from_amount.value,to_amount);
        else
            exchange(convert_to.value,convert_from.value,to_amount.value,from_amount);
    }); 

    convert_from.addEventListener("focus",()=>{
        if(convert_from.value=="---")
            convert_from.value="";
    });

    convert_from.addEventListener("blur",()=>{
        if(convert_from.value=="")
            convert_from.value="---";
    });

    convert_to.addEventListener("focus",()=>{
        if(convert_to.value=="---")
        convert_to.value="";
    });

    convert_to.addEventListener("blur",()=>{
        if(convert_to.value=="")
        convert_to.value="---";
    });

    document.querySelector("#inputs-middle img").addEventListener("click",()=>{
        [from_amount.value,to_amount.value] = [to_amount.value,from_amount.value];
        [convert_from.value,convert_to.value] = [convert_to.value,convert_from.value];
        exchange(convert_from.value,convert_to.value,from_amount.value,to_amount.value);
    });
    
    const exchange = (from,to,amount,change) =>{
        if(from!="" && from!="---" && to!="" && to!="---" && amount!="" && amount!=0){
            fetch(`https://v6.exchangerate-api.com/v6/f242c41c26a63a05a94ba1d4/pair/${from}/${to}/${amount}`)
            .then(response=>response.json())
            .then(data=>{
                if(data.result=="error")
                    throw new Error();           
                inputs_bottom_span.textContent=`1 ${data.base_code} = ${data.conversion_rate} ${data.target_code}`;
                change.value=data.conversion_result;

            }).catch(err=>{
                console.log(err);
                inputs_bottom_span.textContent="Wrong Input";
            });
        }  
    }

    function printTopInfo(){
        const te1_span = document.querySelector("#te1 span");
        const te2_span = document.querySelector("#te2 span");
        const te3_span = document.querySelector("#te3 span");

        if(locale_currency!="USD"){
            te1_span.textContent="USD";
            te1_span.nextElementSibling.textContent="loading...";
            te1_span.nextElementSibling.textContent=locale_currency;
            fetch(`https://v6.exchangerate-api.com/v6/f242c41c26a63a05a94ba1d4/pair/USD/${locale_currency}`)
            .then(response=>response.json())
            .then(data=>{
                te1_span.nextElementSibling.nextElementSibling.textContent="loading...";
                te1_span.nextElementSibling.nextElementSibling.textContent=data.conversion_rate;
            });
        }
        else{
            te1_span.textContent="JPY";
            te1_span.nextElementSibling.textContent="loading...";
            te1_span.nextElementSibling.textContent=locale_currency;
            fetch(`https://v6.exchangerate-api.com/v6/f242c41c26a63a05a94ba1d4/pair/JPY/${locale_currency}`)
            .then(response=>response.json())
            .then(data=>{
                te1_span.nextElementSibling.nextElementSibling.textContent="loading...";
                te1_span.nextElementSibling.nextElementSibling.textContent=data.conversion_rate;
            });     
        }

        if(locale_currency!="EUR"){
            te2_span.textContent="EUR";
            te2_span.nextElementSibling.textContent="loading...";
            te2_span.nextElementSibling.textContent=locale_currency;
            fetch(`https://v6.exchangerate-api.com/v6/f242c41c26a63a05a94ba1d4/pair/EUR/${locale_currency}`)
            .then(response=>response.json())
            .then(data=>{
                te2_span.nextElementSibling.nextElementSibling.textContent="loading...";
                te2_span.nextElementSibling.nextElementSibling.textContent=data.conversion_rate;
            });            
        }
        else{
            te2_span.textContent="JPY";
            te2_span.nextElementSibling.textContent="loading...";
            te2_span.nextElementSibling.textContent=locale_currency;
            fetch(`https://v6.exchangerate-api.com/v6/f242c41c26a63a05a94ba1d4/pair/JPY/${locale_currency}`)
            .then(response=>response.json())
            .then(data=>{
                te2_span.nextElementSibling.nextElementSibling.textContent="loading...";
                te2_span.nextElementSibling.nextElementSibling.textContent=data.conversion_rate;
            }); 
        }

        if(locale_currency!="GBP"){
            te3_span.textContent="GBP";
            te3_span.nextElementSibling.textContent="loading...";
            te3_span.nextElementSibling.textContent=locale_currency;
            fetch(`https://v6.exchangerate-api.com/v6/f242c41c26a63a05a94ba1d4/pair/GBP/${locale_currency}`)
            .then(response=>response.json())
            .then(data=>{
                te3_span.nextElementSibling.nextElementSibling.textContent="loading...";
                te3_span.nextElementSibling.nextElementSibling.textContent=data.conversion_rate;
            });            
        }
        else{
            te3_span.textContent="JPY";
            te3_span.nextElementSibling.textContent="loading...";
            te3_span.nextElementSibling.textContent=locale_currency;
            fetch(`https://v6.exchangerate-api.com/v6/f242c41c26a63a05a94ba1d4/pair/JPY/${locale_currency}`)
            .then(response=>response.json())
            .then(data=>{
                te3_span.nextElementSibling.nextElementSibling.textContent="loading...";
                te3_span.nextElementSibling.nextElementSibling.textContent=data.conversion_rate;
            }); 
        }
    }
})();