window.onload = function () {
    let patern = "abcdefghijklmnopqrstuvwxyz".split('');
    let data = {};
    let map = [0];

    function check(arr) {
        return arr.every(a => a >= 25);
    }

    function uniqueUrl() {
        let answer = map.map(a => patern[a]).join('');
        map[map.length - 1]++;
        if (check(map)) {
            map.push(0);
            map = map.map(a => 0);
        }
        for (let i = map.length - 1; i > 0; i--) {
            if (map[i] > 25) {
                map[i - 1]++;
                map[i] = 0;
            }
        }
        return answer;
    }

    function urlShortener(longURL) {
        if (typeof data[longURL] != "undefined") {
            return data[longURL];
        }
        return data[longURL] = "short.ly/" + uniqueUrl();
    }

    function urlRedirector(shortURL) {
        return Object.keys(data)[Object.values(data).indexOf(shortURL)]
    }

    const form1 = document.querySelector('#form1');
    const form2 = document.querySelector('#form2');
    const result = document.querySelector('#result');
    const res = document.querySelector('#res');
    form1.onsubmit = function (e){
        e.preventDefault();
        let value = this.querySelector('input').value;
        result.innerHTML = value + " → " + urlShortener(value) + "<br>";
    }
    form2.onsubmit = function (e){
        e.preventDefault();
        let value = this.querySelector('input').value;
        let urlOriginal = urlRedirector(value);
        if (urlOriginal === undefined){
            res.innerHTML = "не найдено!";
        } else {
            res.innerHTML = value + " → " + urlOriginal;
        }
    }
}