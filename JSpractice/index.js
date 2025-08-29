// console.log("34")

// for(let i=0; i<=10; i++) {
//     console.log(i);
// }

// for(let i=1; i<=15; i= i+2) {
//     console.log(i)
// }

//even number
// for(let i=2; i<=10; i=i+2) {
//     console.log(i)
// }

// for(let i=10; i>=2; i=i-2) {
//     console.log(i)
// }

//table of 5
// for(let i=5; i<=50; i=i+5) {
//     console.log(i)
// }

//nested loop
// for(let i=1; i<=5; i++) {
//     console.log("Outer LOOp")
//     for(let j=1; j<=5; j++) {
    
//         console.log( "Inner loop"+j);
//     }
// }


//while looo
// let i = 0;
// while(i <= 5) {
//     console.log(i);
//     i++;
// }

//gues the movie
// const movie = "spiderman";
// let guess = prompt("guess the my movie");

// while((movie != guess)) {
//     if(guess == "quite"){
//         break;
//     }
//     guess = prompt("wrong guess try again")
// }
// if((movie == quess)) {
//     console.log("nice");
// } else if(guess == "quite") {
//     console.log("you skipped the game");
// }

// let i = 1;
// while(i < 15) {
//     //break
//     if(i == 7) {
//         break;
//     } 
//     console.log(i);
//     i++;
// }

//array
// let fruites = ["apple", "banana", "orange", "pineapple", "litchi"];

// for(let i = 0; i<fruites.length; i++) {
//     console.log(i, fruites[i]);
// }

let fruites = [["apple", "banana", "orange", "pineapple", "litchi"], ["apple", "banana", "orange", "pineapple", "litchi"]];

for(let fruite of fruites) {
    console.log(fruite)
    for(let name of fruite) {
        console.log(name);
    }
}