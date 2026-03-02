
document.addEventListener("DOMContentLoaded", function(){

let data = JSON.parse(localStorage.getItem("fiberData")) || [];

tampilkanData();

function simpanData(){
    localStorage.setItem("fiberData", JSON.stringify(data));
}

window.tambahData = function(){

    let jalur = document.getElementById("jalur").value;
    let odp = document.getElementById("odp").value;
    let core = document.getElementById("core").value;

    if(!jalur || !odp || !core){
        alert("Data belum lengkap!");
        return;
    }

    data.push({jalur, odp, core});

    simpanData();
    tampilkanData();
}

window.hapus = function(index){
    data.splice(index,1);
    simpanData();
    tampilkanData();
}

function tampilkanData(){

    let tabel = document.getElementById("dataFiber");
    tabel.innerHTML="";

    data.forEach((d,i)=>{
        tabel.innerHTML += `
        <tr>
        <td>${i+1}</td>
        <td>${d.jalur}</td>
        <td>${d.odp}</td>
        <td>${d.core}</td>
        <td><button onclick="hapus(${i})">Hapus</button></td>
        </tr>`;
    });
}

});
