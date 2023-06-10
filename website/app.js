/* Global Variables */
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
// Personal API Key for OpenWeatherMap API
const apiKey ='&appid=9cbe918f2690d389b9096be5656c3d17&units=imperial';


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performCallBack);
    
/* Function called by event listener */
function performCallBack(){
    const zipCode = document.getElementById('zip').value;
    getInfo(baseURL, zipCode, apiKey); 
    const data =  getInfo;
    postData('/addNew', {temp:data.temp, date:data.date, feelings:data.feelings})
    .then(retrieveData());
}

/* Function to GET Web API Data*/
const getInfo = async (baseURL, zipCode, apiKey) => {
    //call API
    const response = await fetch(baseURL+zipCode+apiKey);
    try {
        const data =await response.json();
        console.log(data);
        return data;
    } catch(error){
        console.log("error", error);
    }
   
};



/* Function to POST data */
const postData = async ( url = '', data = {})=>{

    const response = await fetch('/addNew', {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header        
  });

    try {
      const newData = await response.json();
      return newData;
    }catch(error) {
    console.log("error", error);
    }
};



/* Function to GET Project Data */

/* Function to update UI*/ 
const retrieveData = async () => {
    const request = await fetch('/all');
    try {
        const allData =  await request.json();
        console.log(allData);
        document.getElementById('temp').innerHTML = Math.round(allData.temp) + 'degrees';
        document.getElementById('feelings').innerHTML = allData.feelings;
        document.getElementById('date').innerHTML = allData.date;
    }
    catch(error) {
        console.log('error');
    }
};

