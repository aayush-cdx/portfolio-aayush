function showmessage(event)
{
    alert("Form Submitted.");
}
// function checkAge(){
//     var age=document.getElementById("ageBtn").value;
//     if(age>=18)
//     {
//         alert("You are Eligible.")
//     }
//     else
//         if(age==10)
//             alert("You are Gay.")
//         else
//             console.log("Your Are not Eligible.")
// }
// function darkMode()
// {
//     // var darkMod[4] =document.getElementById(darkmode);
//     // document.getElementById("abt").style.backgroundColor = "#fff"
//     var a=["red","green","blue","cyan"];
//     var randomIndex = Math.floor(Math.random() * a.length);
//     document.getElementById("about-form").style.backgroundColor = a[randomIndex];
// }
function rockpaper(userChoices){
    var choices=["rock","paper","scissors"];
    var randomIndex = Math.floor(Math.random()* choices.length);
    var compChoices = choices[randomIndex];
    console.log(compChoices);
    // var result ="";

    if(userChoices===compChoices){
        // document.getElementById
        alert("It is a tie."+ compChoices);
    }
    else if(userChoices=='rock')
    {
        if(compChoices=="scissors")
            alert("You win !!"+ compChoices)
        else
            alert("You Lose !!" + compChoices)
    }
    else if(userChoices=='paper')
    {
        if(compChoices=="scissors")
            alert("You Lose !!" + compChoices)
        else
            alert("You Win !!" + compChoices)
    }
    else if(userChoices=="scissors")
    {
        if(compChoices=="rock")
            alert("You Lose !!" + compChoices)
        else
            alert("You Win !!" + compChoices)
    }
}