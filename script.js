let data = [];

function tampilkanData() {
    let tabel = document.getElementById("dataFiber");
    tabel.innerHTML = "";

    data.forEach((d, i) => {
        tabel.innerHTML += `
        <tr>
            <td>${i+1}</td>
            <td>${d.jalur}</td>
            <td>${d.odp}</td>
            <td>${d.core}</td>
            <td>
                <button onclick="hapus(${i})">Hapus</button>
            </td>
        </tr>`;
    });
}

function tambahData() {

    let jalur = document.getElementById("jalur").value;
    let odp = document.getElementById("odp").value;
    let core = document.getElementById("core").value;

    data.push({jalur, odp, core});

    tampilkanData();
}

function hapus(index){
    data.splice(index,1);
    tampilkanData();
}
