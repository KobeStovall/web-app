function fillTable(arrCourseInfo){
    let setProf = new Set(arrCourseInfo.map(course => course.PROF))
    let arrProf = [...setProf]
    let arrProfCreditHours = []
    arrProf.forEach(strProf => {
        if(strProf != null){
            let arrProfCourses = arrCourseInfo.filter(course => course.PROF == strProf)
            let intTotalCreditHours = 0;
            arrProfCourses.forEach(course => {
                if(course.STUDENTCOUNT != null && course.CREDITS != null){
                    intTotalCreditHours += (course.STUDENTCOUNT * course.CREDITS)
                }
            })
            let strFirstName = '';
            let strLastName = '';
            let intSalary = 'NA';
            let intProduction = 0;
            if(strProf.includes(', ')){
                strFirstName = strProf.split(', ')[1]
                if(strFirstName.includes(' ')){
                   strFirstName = strFirstName.split(' ')[0]
                }
                strLastName = strProf.split(', ')[0]
              
                let arrSalary = arrSalaries.filter(employee => employee.FirstName == strFirstName && employee.LastName == strLastName)
                if(arrSalary.length > 0){
                    intSalary = arrSalary[0].Salary.replace('$','').replace(',','')
                }
            }
            if(intSalary != 'NA'){
                intSalary = parseInt(intSalary)
                if(intTotalCreditHours > 0){
                    intProduction = intTotalCreditHours/intSalary
                }
                arrProfCreditHours.push({PROF:strProf,CREDITS:intTotalCreditHours,FIRSTNAME:strFirstName,LASTNAME:strLastName,SALARY:intSalary,PRODUCTION:intProduction})

            }
            
        }
    })
    let strHTML = ''
    arrProfCreditHours.forEach(course => {
        strHTML += `<tr>
            <td>${course.FIRSTNAME}</td>
            <td>${course.LASTNAME}</td>
            <td>${course.CREDITS}</td>
            <td>${course.SALARY}</td>
            <td>${course.PRODUCTION}</td>
        </tr>
        `
    })
    document.querySelector('#tblProfessors tbody').innerHTML = strHTML
    new DataTable('#tblProfessors');
}