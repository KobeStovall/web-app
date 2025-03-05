let arrCourseInfo;
let arrSalaries;
document.addEventListener("DOMContentLoaded", function() {
    fetch('https://swollenhippo.com/courseinfo.php')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => arrCourseInfo = data)
    .catch(error => console.error('Error fetching data:', error));
    fetch('https://swollenhippo.com/salaries.php')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => arrSalaries = data)
    .catch(error => console.error('Error fetching data:', error));
})
document.querySelector('#btnChart').addEventListener('click', (event) => {
    fetch("components/chart.html")
    .then(response => response.text())
    .then(html => {
        const objScript = document.createElement('script');
        objScript.src = 'js/chart.js'; 
        objScript.type = 'text/javascript';
        document.head.appendChild(objScript);
        objScript.onload = () => {
            distillCourses(arrCourseInfo)
          };
        document.querySelector('#divContent').innerHTML += html;
        document.querySelector('#divSelect').style.display = 'none';
        document.querySelector('#divChart').style.display = 'block';
       
    })
    .catch(error => console.error("Error fetching chart:", error));
});
document.querySelector('#btnTable').addEventListener('click', (event) => {
    fetch("components/table.html")
    .then(response => response.text())
    .then(html => {
        const objScript = document.createElement('script');
        objScript.src = 'js/table.js'; 
        objScript.type = 'text/javascript';
        document.head.appendChild(objScript);
        objScript.onload = () => {
            fillTable(arrCourseInfo)
          };
        document.querySelector('#divContent').innerHTML += html;
        document.querySelector('#divSelect').style.display = 'none';
        document.querySelector('#divTable').style.display = 'block';
       
    })
    .catch(error => console.error("Error fetching chart:", error));
});
