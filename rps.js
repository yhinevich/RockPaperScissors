const readlineSync = require("readline-sync");
const Hmac = require("./Hmac");
const Table = require("./table");
const Rules = require("./rules");
let key;

class Main {



    isUserChoiceNotValid(numberOfMoves, userChoice){

        if (/^[a-zA-Z]+$/.test(userChoice)) {
            return true;
        }
        if (userChoice <=0 || userChoice-1>numberOfMoves+1 || userChoice.length!==1 ){
            return true;
        }else {
            return false
        }


    }
    getAndPrintHmac(computerChoice){
        let hash = new Hmac(computerChoice);
        key = hash.generateAndPrintHMAC()

    }
    readUserInput(query) {
        return readlineSync.question(query).replace(/ + /g,' ').trim().split(" ");
    }

    printChoice(data){
        console.log("Available moves:")
        for(let i=0;i<data.length;i++){
            console.log((i+1)+ ": "+ data[i])
        }
        console.log("h: help")
        console.log("e: exit")
    }
    isDataCorrect(data)
    {
        if(data.length == 1 || data.length == 0 ){
            console.log("Number of elements should be more then three!")
            return  false;
        }

        if(data.length%2 == 0){
            console.log("The number of elements must be odd!")
            return false;
        }
        if ((new Set(data)).size !== data.length){
            console.log("Provided data shouldn't contain duplicates!")
            return false;
        }
        return true;
    }
    start(){
        let data = process.argv.slice(2);
        if(!this.isDataCorrect(data)){
            return;
        }

        let computerChoice = data[Math.floor(Math.random()*data.length)];
        let rules = new Rules(data).createRules()
        this.getAndPrintHmac(computerChoice)
        this.printChoice(data)

        let userChoice = this.readUserInput("Your choice: ")

        while ((this.isUserChoiceNotValid(data.length-2,userChoice))){


            if(userChoice=="e"){
                return;
            }else if(userChoice=="h"){
                new Table().table(data,rules)
                this.printChoice(data)
            }else{
                console.log("Invalid input. Choose one of the following options")
                this.printChoice(data)
            }
            userChoice = this.readUserInput("Your choice: ")
        }
        console.log("Your move: " + data[userChoice-1])
        console.log("Computer move: " + computerChoice)
        console.log(rules[userChoice-1][data.indexOf(computerChoice)])
        console.log("HMAC key: " + key);



    }

}

let main = new Main();
main.start();