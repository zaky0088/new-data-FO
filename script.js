// Ambil data dari penyimpanan browser
let data = JSON.parse(localStorage.getItem("fiberData")) || [];

// tampilkan data saat web dibuka
tampilkanData();

function simpanData(){
    localStorage.setItem("fiberData", JSON.stringify(data));
}

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

    if(jalur === "" || odp === "" || core === ""){
        alert("Data belum lengkap!");
        return;
    }

    data.push({jalur, odp, core});

    simpanData();
    tampilkanData();

    document.getElementById("jalur").value="";
    document.getElementById("odp").value="";
    document.getElementById("core").value="";
}

function hapus(index){
    data.splice(index,1);
    simpanData();
    tampilkanData();
}
