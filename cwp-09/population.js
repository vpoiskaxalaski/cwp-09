const Promise = require('bluebird');

function SendData(){
                
    const url = "http://api.population.io:80/1.0/population/2018/Belarus/";
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    let data = "1";
    let dataJson = JSON.stringify(data);
    xhr.send(); 

    xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      let answr = JSON.parse(xhr.responseText);
       console.log(answr);
     
    }
    }
}

SendData();