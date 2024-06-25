// when content loaded, run event
window.addEventListener('DOMContentLoaded', (event) =>{
    getVisitCount();
})


const functionAPIURL = 'https://getresumecountermy.azurewebsites.net/api/GetResumeCoutner?code=L9qBaU2Wa1xjkXx72-QiMOGpqVEc3rw4VFfqpZLZ1YjrAzFuFnaQ_Q%3D%3D';
const localfunctionApi = 'http://localhost:7071/api/GetResumeCoutner';
const resetLocalApi = 'http://localhost:7071/api/ResetResumeCounter';

const getVisitCount = () => {
    let count = 30;
    fetch(localfunctionApi).then(response => {
        return response.json()
    }).then(response =>{
        console.log("Website called function Api.");
        count = response.count; //assign variable as the json response
        document.getElementById("counter").innerText = count; // go into doc, find counter, 
        //find inner text and set it accordingly
    }).catch(function(error){
        console.log(error);
    });
    return count;
}
window.onload = function(){
    const resetCount = document.getElementById("resetButton");
    resetCount.addEventListener('click', (event) =>{
        resetCounter();
    })
}

const resetCounter = () => {
    let count = 0;
    var data = new FormData();
    fetch(resetLocalApi, {
        method: 'POST',
        body: data
    }).then(response => {
        return response.json()
    }).then(response =>{
        // console.log("Website called function Api.");
        count = response.count; //assign variable as the json response
        document.getElementById("counter").innerText = count; // go into doc, find counter, 
        //find inner text and set it accordingly
    }).catch(function(error){
        console.log(error);
    });
    return count;
}