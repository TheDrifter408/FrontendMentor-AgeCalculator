//Get input labels
let allLabels = document.getElementsByTagName('label');
let labelsArr = [allLabels[0],allLabels[1],allLabels[2]];
// Get input day, month, year
let userDay = document.getElementById("day");
let userMonth = document.getElementById("month");
let userYear = document.getElementById("year");
let userInputs = [userDay,userMonth,userYear];
// Get the warning spans
let warningDay = document.getElementById('warning-day');
let warningMonth = document.getElementById('warning-month');
let warningYear = document.getElementById('warning-year');
let warnings = [warningYear,warningMonth,warningDay];
// Get the result spans 
let resultYears = document.getElementById('result-years');
let resultMonths = document.getElementById('result-months');
let resultDays = document.getElementById('result-days');
//function to validate the date
function validateDate(year,month,date) {
    if(userDay.value === ''){
        warningDay.textContent = "This field is required";
        warningDay.classList.add('warning');
    }
    else if(userMonth.value === ''){
        warningMonth.textContent = "This field is required";
        warningMonth.classList.add("warning");
    } else if(userYear.value === ''){
        warningYear.textContent = "This field is required";
        warningYear.classList.add('warning');
    } else {
        let userDate = new Date(year,month-1,date);
        let DateToday = new Date();
        if(userDate.getDate() !== date){
            warningDay.textContent = "Must be a valid date.";
            warningDay.classList.add('warning');
        } else if((userDate.getMonth()) !== (month - 1)){
            warningMonth.textContent = "Must be a valid Month.";
            warningMonth.classList.add('warning');
        }else if(userDate.getFullYear() > DateToday.getFullYear()){
            warningYear.textContent = "Must be in the past.";
            warningYear.classList.add('warning');
        } 
        else {
            return userDate.getFullYear() === year && (userDate.getMonth()) === (month - 1) && userDate.getDate() === date;
        }
    }
    return false; 
}
//function to animate the numbers
function AgeCounter(DomElement, limit){
    let i=0;
    const counting = setInterval(Increment,45);
    function Increment() {
        i = i + 1;
        DomElement.textContent = i;
        if(i >= limit){
            clearInterval(counting);
        }
    }
    return DomElement.textContent;
}
//function to find the age 
function getAge(year,month,day){
    let userDate = new Date(year,month,day);
    let dateToday = new Date();
    let age_year = dateToday.getFullYear() - userDate.getFullYear();
    // get months
    let age_month = 0;
    let age_date = 0;
    if(dateToday.getMonth() >= userDate.getMonth()){
        age_month = dateToday.getMonth() - userDate.getMonth();
    } else {
        age_year--;
        age_month = 12 + (dateToday.getMonth() - userDate.getMonth());
    }
    // get the days
    if(dateToday.getDate() >= userDate.getDate()){
        age_date = dateToday.getDate() - userDate.getDate();
    } else {
        age_month--;
        age_date = 31 + (dateToday.getDate() - userDate.getDate());
    }
    if (age_month < 0){
        age_month = 11;
        age_year--;
    }
    return [age_year, age_month + 1, age_date];
}
// result variables
let res_year = 0;
let res_month = 0;
let res_day = 0;
//Get the form by id
let ageForm = document.getElementById("ageForm");
//Add an event listener to the form
let user_day = 0;
let user_month = 0;
let user_year = 0;
ageForm.addEventListener("submit",(e) => {
    e.preventDefault();
    //
    //perform checks on the value
    user_day = Number(userDay.value);
    user_month = Number(userMonth.value);
    user_year = Number(userYear.value);
    // validation check on the input
    
    validateDate(user_year,user_month,user_day);
    console.log(validateDate(user_year,user_month,user_day));
    if(validateDate(user_year,user_month,user_day) === true){
        warnings.map((e) => {
            e.classList.remove("warning");
        })
        userInputs.map((e) => {
            e.classList.remove("warning-input");
        })
        labelsArr.map((e) => {
            e.classList.remove("warning-label")
        })
        warningDay.textContent = ""; 
        warningMonth.textContent = ""; 
        warningYear.textContent = "";
        [res_year,res_month,res_day] = getAge(user_year,user_month,user_day);
        resultYears.textContent = AgeCounter(resultYears,res_year);
        resultMonths.textContent = AgeCounter(resultMonths,res_month);
        resultDays.textContent = AgeCounter(resultDays,res_day);
    } 
    else {
        if(warningDay.textContent.length === 0 && warningMonth.textContent.length === 0 && warningYear.textContent.length === 0){
            warningDay.textContent = "Must be a valid date."
            warningDay.classList.add('warning');
        }
        else {
            return;
        }
    }
})
