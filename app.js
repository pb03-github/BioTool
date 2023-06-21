const closeButton = document.getElementById("close");
const dialog = document.getElementById("favDialog");
const dialog2 = document.getElementById("favDialog2");
const confirm = document.getElementById("confirm");
const confirm2 = document.getElementById("confirm2");
const outcome = document.getElementById("outcome");

const call = (value) => {
    dialog.showModal();
    confirm.addEventListener("click", () => {
        if (value === "AA") {
            const seql = [document.getElementById('seql').value];
            console.log(seql);
            AA(seql);
        }
        if (value === "molwt") {
            const seql = [document.getElementById('seql').value];
            console.log(seql);
            molwt(seql);
        }
        if (value === "comp") {
            const seql = document.getElementById('seql').value;
            console.log(seql);
            comp(seql);
        }
        if (value === "complementory") {
            const seql = document.getElementById('seql').value;
            console.log(seql);
            complementory(seql);
        }

    })

    function AA(seql) {
        const dict = {
            "A": [0, 85], "R": [0, 170], "N": [0, 130], "D": [0, 130],
            "E": [0, 145], "Q": [0, 140], "G": [0, 70], "H": [0, 150], "I": [0, 125],
            "L": [0, 125], "K": [0, 145], "M": [0, 143], "F": [0, 160], "P": [0, 110],
            "S": [0, 100], "T": [0, 115], "W": [0, 200], "Y": [0, 175],
            "V": [0, 110], "C": [0, 115]
        };

        function composition(s) {
            const dict = {
                "A": [0, 85], "R": [0, 170], "N": [0, 130], "D": [0, 130],
                "E": [0, 145], "Q": [0, 140], "G": [0, 70], "H": [0, 150], "I": [0, 125],
                "L": [0, 125], "K": [0, 145], "M": [0, 143], "F": [0, 160], "P": [0, 110],
                "S": [0, 100], "T": [0, 115], "W": [0, 200], "Y": [0, 175],
                "V": [0, 110], "C": [0, 115]
            };
            const l = [];

            for (let i = 0; i < s.length; i++) {
                dict[s[i]][0] += 1;
            }

            for (let i in dict) {
                l.push((dict[i][0] / s.length) * 100);
            }

            return l;
        }

        const ans = { "seq1": composition(seql[0]) };
        const findex = [];

        for (let i in dict) {
            findex.push(i);
        }

        const df = new DataFrame(ans, findex);

        console.log(df);

        // Helper function to create a DataFrame
        function DataFrame(data, index) {
            const columns = Object.keys(data);
            const rows = index.length;
            const df = {};

            for (let i = 0; i < columns.length; i++) {
                const column = columns[i];
                const values = data[column];

                for (let j = 0; j < rows; j++) {
                    const row = index[j];

                    if (!df[row]) {
                        df[row] = {};
                    }

                    df[row][column] = values[j];
                }
            }

            return df;
        }

    }

    function molwt(seql) {
        function weight(s) {
            const dict = {
                "A": [0, 85], "R": [0, 170], "N": [0, 130], "D": [0, 130],
                "E": [0, 145], "Q": [0, 140], "G": [0, 70], "H": [0, 150], "I": [0, 125],
                "L": [0, 125], "K": [0, 145], "M": [0, 143], "F": [0, 160], "P": [0, 110],
                "S": [0, 100], "T": [0, 115], "W": [0, 200], "Y": [0, 175],
                "V": [0, 110], "C": [0, 115]
            };
            let sum = 0;
            for (let i = 0; i < s.length; i++) {
                sum += dict[s[i]][1];
            }
            console.log("The molecular weight for " + s + " is " + (sum - 18 * (s.length - 1)));
        }

        for (let i = 0; i < seql.length; i++) {
            weight(seql[i]);
        }

    }

    function comp(seq) {
        const dict = {};

        for (let i = 0; i < seq.length; i++) {
            const char = seq[i];
            if (char in dict) {
                dict[char] += 1;
            } else {
                dict[char] = 1;
            }
        }

        for (const char in dict) {
            console.log("The composition of", char, "is", (dict[char] * 100 / seq.length));
        }
    }

    function complementory(seq) {
        let compseq = '';
        let revseq = '';

        for (let i = 0; i < seq.length; i++) {
            if (seq[i] === "C") {
                compseq += "G";
            } else if (seq[i] === "G") {
                compseq += "C";
            } else if (seq[i] === "A") {
                compseq += "T";
            } else if (seq[i] === "T") {
                compseq += "A";
            }
        }

        for (let i = compseq.length - 1; i >= 0; i--) {
            revseq += compseq[i];
        }
        outcome.innerHTML=revseq;
        console.log("The reverse complementary sequence is: " + revseq);
    }


}

const call2 = (value) => {
    dialog2.showModal();
    confirm2.addEventListener("click", () => {
        if (value === "doalign") {
            const sel = document.getElementById('sel').value;
            const sel2 = document.getElementById('sel2').value;
            doAlign(sel, sel2);
        }
        if (value === "alogn") {
            const sel = document.getElementById('sel').value;
            const sel2 = document.getElementById('sel2').value;
            alogn(sel, sel2);
        }
        if (value === "similarity") {
            const sel = document.getElementById('sel').value;
            const sel2 = document.getElementById('sel2').value;
            similarity(sel, sel2);
        }



    })

    function similarity(seq1, seq2) {
        
        let k1 = 0;
        let k2 = 0;

        for (let i = 0; i < seq1.length; i++) {
            if (seq2[i] === " ") {
                k1 += 1;
            }
            if (seq2[i] === "+") {
                k2 += 1;
            }
        }

        if (seq1.length === seq2.length) {
            outcome.innerHTML=`<h1>The query coverage is 100 %h1>`
            console.log("The query coverage is 100 %");
        } else {
            outcome.innerHTML=`<h1>${(seq2.length / seq1.length) * 100}h1>`
            console.log((seq2.length / seq1.length) * 100);
        }

        let k3 = 0;
        if (!seq2.includes("-")) {
            outcome.innerHTML=`<h1>The gap percentage is : 0 %</h1>`
            console.log("The gap percentage is : 0 %");
        } else {
            for (let i = 0; i < seq2.length; i++) {
                if (seq2[i] === "-") {
                    k3 += 1;
                }
            }
            outcome.innerHTML=`<h1>The gap percentage is : ${k3 / seq2.length}</h1>`
            console.log("The gap percentage is : ", (k3 / seq2.length) * 100);
        }

        const ip = ((seq1.length - k1 - k2) / seq1.length) * 100;
        const sp = ((seq1.length - k1) / seq1.length) * 100;
        outcome.innerHTML=`<h1>The percentage identity is : ${ip} </h1><br>
                            <h1>The percentage similarity is : ${sp} </h1> `;
        console.log("The percentage identity is : ", ip);
        console.log("The percentage of similarity is : ", sp);
    }


    function alogn(a, b) {
        let s = 0;
        const m = ["A", "T", "C", "G"];

        for (let i = 1; i < b.length; i++) {
            if (b[i] === "-" && b[i - 1] !== "-") {
                s += 1;
            }
        }

        let k = 0;
        for (let i = 0; i < a.length; i++) {
            if (a[i] === b[i]) {
                k += 1;
            } else if (b[i] === "-") {
                k -= 1;
            } else {
                k += 0;
            }
        }

        const ans = k + s * -2;
        outcome.innerHTML=`<h1>The alignment score is : ${ans}</h1>`;
        console.log("The alignment score is ", ans);

    }


    function doAlign(a, b) {
        const mat = Array.from({ length: b.length + 1 }, () => Array(a.length + 1).fill(0));

        for (let i = 0; i < mat[0].length; i++) {
            mat[0][i] = -2 * i;
        }

        for (let i = 0; i < b.length + 1; i++) {
            mat[i][0] = i * -2;
        }

        for (let i = 1; i < b.length + 1; i++) {
            for (let j = 1; j < a.length + 1; j++) {
                let mnk = mat[i - 1][j] - 2;
                let mnk2 = mat[i][j - 1] - 2;
                let mk = mat[i - 1][j - 1];
                if (a[j - 1] === b[i - 1]) {
                    mk = mat[i - 1][j - 1] + 2;
                    mat[i][j] = Math.max(mnk, mk, mnk2);
                } else {
                    mk -= 1;
                    mat[i][j] = Math.max(mnk, mk, mnk2);
                }
            }
        }

        const p = [];
        const q = [];
        let l = b.length;
        let m = a.length;
        let my = true;

        while (my === true) {
            if (b[l - 1] === a[m - 1]) {
                p.push(b[l - 1]);
                q.push(b[l - 1]);
                l = l - 1;
                m = m - 1;
            } else if (mat[l][m] === mat[l][m - 1] - 2) {
                p.push(a[m - 1]);
                q.push("-");
                m = m - 1;
            } else if (mat[l][m] === mat[l - 1][m] - 2) {
                p.push(a[m - 1]);
                q.push(b[l - 1]);
                l = l - 1;
            } else if (mat[l][m] === mat[l - 1][m - 1] - 1) {
                p.push(a[m - 1]);
                q.push(b[l - 1]);
                l = l - 1;
                m = m - 1;
            }
            if (p.length === 11) {
                my = false;
            }
        }

        let ans1 = "";
        let ans2 = "";
        for (let i = p.length - 1; i > 0; i--) {
            ans1 += p[i];
        }
        for (let i = q.length - 1; i > 0; i--) {
            ans2 += q[i];
        }
        outcome.innerHTML=`<h1>${ans1}<br>${ans2}</h1>`
        console.log(ans1);
        console.log(ans2);

    }
}
// Form close button closes the dialog box
closeButton.addEventListener("click", () => {

    dialog.close();
});


