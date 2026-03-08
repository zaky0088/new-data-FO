// ================= PROTEKSI LOGIN =================
if(localStorage.getItem("login") !== "true"){
    window.location.href = "login.html";
}

document.addEventListener("DOMContentLoaded", function(){

// ================= LOAD DATA =================
let data = JSON.parse(localStorage.getItem("fiberData")) || [];

function simpan(){
    localStorage.setItem("fiberData", JSON.stringify(data));
}

// ================= TAMBAH DATA =================
window.tambahData = function(){

    let jalur = document.getElementById("jalur").value;
    let odp = document.getElementById("odp").value;
    let core = document.getElementById("core").value;
    let panjang = document.getElementById("panjang").value;
    let teknisi = document.getElementById("teknisi").value;
    let status = document.getElementById("status").value;

    if(!jalur || !odp){
        alert("Isi data dulu!");
        return;
    }

    let newData = {jalur,odp,core,panjang,teknisi,status};

    if(editIndex === null){
        data.push(newData);
    }else{
        data[editIndex] = newData;
        editIndex = null;
    }

    simpan();
    tampilkan();

    document.getElementById("jalur").value="";
    document.getElementById("odp").value="";
    document.getElementById("core").value="";
    document.getElementById("panjang").value="";
    document.getElementById("teknisi").value="";

    alert("✅ Data berhasil disimpan");
}

// ================= HAPUS =================
window.hapus = function(i){
    data.splice(i,1);
    simpan();
    tampilkan();
}

// ================= EDIT =================
window.edit = function(i){

    let d = data[i];

    document.getElementById("jalur").value = d.jalur;
    document.getElementById("odp").value = d.odp;
    document.getElementById("core").value = d.core;
    document.getElementById("panjang").value = d.panjang;
    document.getElementById("teknisi").value = d.teknisi;
    document.getElementById("status").value = d.status;

    editIndex = i;
}

// ================= CARI =================
window.cariData = function(){

    let keyword = document.getElementById("search").value.toLowerCase();
    let rows = document.querySelectorAll("#dataFiber tr");

    rows.forEach(r=>{
        r.style.display =
            r.innerText.toLowerCase().includes(keyword)
            ? ""
            : "none";
    });
}

// ================= DASHBOARD =================
function updateDashboard(){

    let totalJalur = data.length;
    let totalCore = 0;
    let putus = 0;

    data.forEach(d=>{
        totalCore += Number(d.core) || 0;
        if(d.status && d.status.toLowerCase() === "putus"){
            putus++;
        }
    });

    document.getElementById("totalJalur").innerText = totalJalur;
    document.getElementById("totalCore").innerText = totalCore;
    document.getElementById("jalurPutus").innerText = putus;

    cekGangguan(putus);

}
    
// ================= TAMPILKAN DATA =================
function tampilkan(){

    let tabel = document.getElementById("dataFiber");
    tabel.innerHTML = "";

    data.forEach((d,i)=>{

        let warna="";
        if(d.status==="Active") warna="active";
        if(d.status==="Putus") warna="putus";
        if(d.status==="Maintenance") warna="maintenance";

        tabel.innerHTML += `
        <tr>
            <td>${i+1}</td>
            <td>${d.jalur}</td>
            <td>${d.odp}</td>
            <td>${d.core}</td>
            <td>${d.panjang ? d.panjang : "-"}</td>
            <td>${d.teknisi}</td>
            <td class="${warna}">${d.status}</td>
            <td>
                <button onclick="edit(${i})">Edit</button>
                <button onclick="hapus(${i})">Hapus</button>
            </td>
        </tr>`;
    });

    updateDashboard();
}

// ================= STATUS NETWORK =================
function cekGangguan(jumlahPutus){

    const status = document.getElementById("networkStatus");

    if(!status) return;

    if(jumlahPutus > 0){
        status.innerHTML = "🔴 ALERT - Ada Jalur Putus!";
        status.style.color = "red";
    }else{
        status.innerHTML = "🟢 Network Normal";
        status.style.color = "lime";
    }
}

// ================= JAM REALTIME =================
function updateClock(){
    const now = new Date();
    const clock = document.getElementById("clock");
    if(clock){
        clock.innerText = now.toLocaleTimeString("id-ID");
    }
}

setInterval(updateClock,1000);
updateClock();

// ================= LOGOUT =================
window.logout = function(){
    localStorage.removeItem("login");
    window.location.href = "login.html";
}

// ================= LOAD AWAL =================
tampilkan();

});
