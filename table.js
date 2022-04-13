


class Table {
    table(data, rules) {
        let temp = [];
        let j = 0;
        for (let i=0;i<data.length;i++) {
            j=0
            temp.push(rules[i].reduce(function(target, key) {
                target[data[j++]] = key;
                return target;
            }, {}));
        }
        j = 0;
        let table = temp.reduce(function(object, values) {
            object[data[j++]] = values;
            return object;
        }, {})
        console.table(table);
    }
}

module.exports = Table;
