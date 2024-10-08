const inputslider = document.querySelector("[data-lengthslider]");
const lengthdisplay= document.querySelector("[data-lengthNumber]");
const passwordDisplay= document.querySelector("[data-passwordDisplay]");
const copyBtn= document.querySelector("[data-copy]");
const copyMsg= document.querySelector("[data-copyMsg]");
const uppercaseCheck= document.querySelector("#uppercase");
const lowercaseCheck= document.querySelector("#lowercase");
const numbersCheck= document.querySelector("#numbers");
const symbolsCheck= document.querySelector("#symbols");
const indicator= document.querySelector("[data-indicator]");
const generateBtn= document.querySelector(".generatebutton");
const allcheckBox= document.querySelectorAll("input[type=checkbox]");
const symbols = "!@#$%^&*()_+-=[]{}|;:'\",.<>?/~`\\";



let password="";
let passwordLength= 10;
let chekCount=0;
handleSlider();
// set strength circle to grey
setIndicator("#ccc")


// Function to handle the slider and display password length
function handleSlider(){
    inputslider.value=passwordLength;
    lengthdisplay.innerHTML=passwordLength;

    const min = inputslider.min;
    const max = inputslider.max;
    inputslider.style.backgroundSize=((passwordLength-min)*100/(max-min)) + "% 100%";
}

// Function to set the strength indicator color
function setIndicator(color){
    indicator.style.backgroundColor=color;
    indicator.style.boxShadow= `0px 0px 10px ${color}`;
}

function getRndInteger(min, max){
    return Math.floor(Math.random()*(max-min)) +min
}

function generateRandomNumber(){
    return getRndInteger(0,9);
}

function generateLowerCase(){
    return String.fromCharCode(getRndInteger(97,123));
}

function generateUpperCase(){
    return String.fromCharCode(getRndInteger(65,91));
}

function generateSymbol(){
    const randNum=getRndInteger(0,symbols.length);
    return symbols.charAt(randNum);
}

function calcStrength(){
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;

    if(uppercaseCheck.checked) hasUpper=true;
    if(lowercaseCheck.checked) hasLower=true;
    if(numbersCheck.checked) hasNum=true;
    if(symbolsCheck.checked) hasSym=true;

    if(hasUpper && hasLower && (hasNum || hasSym) && passwordLength >=8){
        setIndicator("#0f0");
    }else if(
        (hasUpper || hasLower) &&
        (hasNum || hasSym) &&
        passwordLength >= 6
    ){
        setIndicator("#ff0");
    }else{
        setIndicator("#f00");
    }
}

async function copyContent(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText="copied";
    }
    catch(e){
        copyMsg.innerText="Failed";
    }

    copyMsg.classList.add("active");

    setTimeout( ()=> {
        copyMsg.classList.remove("active");
    },2000)
    
}

// Shuffle the array randomly - Fisher Yates Method
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        // random j find out using random function
        const j = Math.floor(Math.random() * (i + 1));
        //swap number at i index and j index
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}

// eventlisteners on slider
inputslider.addEventListener('input', (e)=> {
    passwordLength=e.target.value;
    handleSlider();
})


// eventlisteners on slider
copyBtn.addEventListener('click', () => {
    if(passwordDisplay.value){
        copyContent();
    }
})


// Event listeners for checkbox

function handlecheckBoxchange(){
    chekCount=0;
    allcheckBox.forEach((checkbox) => {
        if(checkbox.checked){
            chekCount++;
        }
    });

    // spsecial condition
    if(passwordLength>chekCount){
        passwordLength= chekCount;
        handleSlider();
    }
}

allcheckBox.forEach((checkbox) => {
    checkbox.addEventListener('change',handlecheckBoxchange )
})

generateBtn.addEventListener('click', () =>{
    // none of the checkbox are selected
    if(chekCount <=0) return;

    if(passwordLength < chekCount){
        passwordLength=chekCount;
        handleSlider();
    }

    // let's start the journey to find new password

    console.log("starting the journey");

    // remove old password
    password="";

    // Let's put the stuff mentioned by checkboxes

    // if(uppercaseCheck.checked){
    //     password += generateUpperCase();
    // }
    // if(lowercaseCheck.checked){
    //     password += generateLowerCase();
    // }
    // if(numbersCheck.checked){
    //     password += generateRandomNumber();
    // }
    // if(symbolsCheck.checked){
    //     password += generateSymbol();
    // }

    
    let funcArr= [];

    if(uppercaseCheck.checked)
        funcArr.push(generateUpperCase);
    if(lowercaseCheck.checked)
        funcArr.push(generateLowerCase);
    if(numbersCheck.checked)
        funcArr.push(generateRandomNumber);
    if(symbolsCheck.checked)
        funcArr.push(generateSymbol);

    // Compulsary addition
    for(let i=0; i<funcArr.length; i++){
        password += funcArr[i]();
    }
    console.log("Compulsary addition done");

    // remaining addition
    for(let i=0; i<passwordLength-funcArr.length; i++){
        let rndIndex = getRndInteger(0, funcArr.length);
        password += funcArr[rndIndex]();
    }
    console.log("remaining addition done");

    //shuffle the password
    password = shuffle(Array.from(password));

    console.log("shuffling done");


    // show in UI
    passwordDisplay.value=password;

    console.log("UI addition done");


    // calculate strength
    calcStrength();

})