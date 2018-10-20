const Promise = require('bluebird');
const axios = require('axios'); //Axios — это JavaScript-библиотека для выполнения либо HTTP-запросов в Node.js, либо XMLHttpRequests в браузере

//task 01.1
axios.get('http://api.population.io:80/1.0/population/2017/Belarus/')
	.then((response) => {
        console.log("\t\t\ttask 01.1\t\t\t");
        let count=0;

        response.data.forEach(element => {
            count+=element["total"];
        });

       console.log('Колличество всех людей: ' + count);

	}).catch((err) => {
	console.log(`Error task 01.1: ${err}`);
	});

//task 01.2
const countries = ["Canada", "Germany", "France"]
let allPromises = [];
let nMale = 0;
let nFemale = 0;
for (let i=0; i<3; i++)
{
	allPromises.push(axios.get(`http://api.population.io:80/1.0/population/2017/${countries[i]}/`));
}

//Этот промис выполняется тогда, когда выполнены всего его элементы
Promise.all(allPromises)
	.then((res) => {
        console.log("\t\t\t*task 01.2\t\t\t");

        res.forEach((element) => {
            element.data.forEach(group =>{

            nMale += group["males"];
            nFemale += group["females"];

            });            
        });

        console.log("Общее кол-во мужчин: " + nMale);
        console.log("Общее кол-во женщин: " + nFemale);
  
	}).catch((err) => {
	console.log(`Error task 01.2: ${err}`);
	});

//task 01.3
let anyPromises = [];
anyPromises.push(axios.get('http://api.population.io:80/1.0/population/2014/Belarus/'));
anyPromises.push(axios.get('http://api.population.io:80/1.0/population/2015/Belarus/'));

//обрабатывает "первый попавшийся"  промис
Promise.any(anyPromises).then((result) => {
    console.log("\t\t\ttask 01.3\t\t\t");

    result.data.forEach((element) => {
        if(element.age == 25){
            console.log(`Year: ${element.year}, males: ${element.males}, females: ${element.females}`);
        }
        
          
    });

}).catch((err) => {
	console.log(`Error task 01.3: ${err}`);
});


//task 01.4
//Возвращает обещание, которое выполняется, когда выполняются все свойства объекта или значения «карты».
Promise.props({
	greece: axios.get(`http://api.population.io:80/1.0/mortality-distribution/Greece/male/0y2m/today/`),
	turkey: axios.get(`http://api.population.io:80/1.0/mortality-distribution/Turkey/male/0y2m/today/`)
}).then((result) => {
    console.log("\t\t\ttask 01.4\t\t\t");

    console.log('Greece:    ');
    let ageG;
    let mpG = -100;
    result.greece.data.mortality_distribution.forEach(element=>{
        if(element.mortality_percent > mpG){
            mpG =element.mortality_percent;
            ageG = element.age;
        }

    });
    console.log(`Возраст наибольшей смертности: ${ageG}`);

    console.log('Turkey:    ');
    let ageT;
    let mpT = -100;
    result.turkey.data.mortality_distribution.forEach(element=>{
        if(element.mortality_percent > mpT){
            mpT =element.mortality_percent;
            ageT = element.age;
        }

    });
    console.log(`Возраст наибольшей смертности: ${ageT}`);
   
}).catch((err) => {
	console.log(`Error task 01.4 :${err}`);
});


//task 01.5
let cntrs = [];

axios.get('http://api.population.io:80/1.0/countries')
	.then((result)=>{
        console.log("\t\t\ttask 01.5\t\t\t");
        let count = 0;
        console.log(result.data.countries);
     result.data.countries.forEach(c=>{
        if(count<5){
            cntrs.push(c);
            count+=1;
        }
     });
//возвратное обещание не выполняется, пока все сопоставленные обещания не будут выполнены.
Promise.map(cntrs, (i) => {
	return axios.get(`http://api.population.io:80/1.0/population/2007/${i}/`)
}).then((response) => {
    console.log("\t\t\ttask 01.5\t\t\t");

    response.forEach(resp=>{
        let c;
        let count=0;
    
        resp.data.forEach(element => {
            count+=element["total"];
            c = element.country;
        });
    
       console.log(`Колличество всех людей в ${c}: ` + count);
    });
    
/*
    
*/
}).catch((err) => {
	console.log(`Error task 01.5: ${err}`);
});
});

