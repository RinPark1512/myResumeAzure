// when content loaded, run event
window.addEventListener('DOMContentLoaded', (event) =>{
    getVisitCount();
})

const functionApi = 'http://localhost:7071/api/GetResumeCoutner';

const getVisitCount = () => {
    let count = 30;
    fetch(functionApi).then(response => {
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