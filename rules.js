class Rules {
    constructor(data) {
        this.data = data;
        this.mode = (this.data.length-1)/2;
    }

    createRules() {
        let rules = [];
        let string = []
        for(let i=0;i<this.data.length;i++){
            for(let j=0;j<this.data.length;j++){
                string[j]=this.generateOutput(i,j)
            }
            rules.push(string)
            string = []
        }
        return rules;
    }



    generateOutput(i, j){
        if(i == j){
            return "DRAW";
        }
        if(j>i){
            if(j-this.mode > i){
                return "WIN";
            }else{
                return "LOSE"
            }
        }else{
            if(i-this.mode > j){
                return "LOSE";
            }else{
                return "WIN";
            }
        }

    }
}

module.exports = Rules;