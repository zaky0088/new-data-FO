if(localStorage.getItem("login") !== "true"){
   window.location.href = "login.html";
}

document.addEventListener("DOMContentLoaded", function(){

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
document.getElementById("jalur").value="";
document.getElementById("odp").value="";
document.getElementById("core").value="";
document.getElementById("panjang").value="";
document.getElementById("teknisi").value="";
  
data.push({jalur,odp,core,panjang,teknisi,status});

simpan();
tampilkan();
alert("✅ Data berhasil ditambahkan");
}

// ================= HAPUS =================
window.hapus = function(i){
  data.splice(i,1);
  simpan();
  tampilkan();
}
window.edit = function(i){

let d = data[i];

document.getElementById("jalur").value = d.jalur;
document.getElementById("odp").value = d.odp;
document.getElementById("core").value = d.core;
document.getElementById("panjang").value = d.panjang;
document.getElementById("teknisi").value = d.teknisi;
document.getElementById("status").value = d.status;

data.splice(i,1);
simpan();
tampilkan();
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

document.getElementById("totalJalur").innerText = data.length;

let totalCore = 0;
let putus = 0;

data.forEach(d=>{
  totalCore += Number(d.core);
  if(d.status === "Putus") putus++;
});

document.getElementById("totalCore").innerText = totalCore;
document.getElementById("jalurPutus").innerText = putus;
}

// ================= TAMPILKAN =================
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
<td>${d.panjang ? d.panjang + " m" : "-"}</td>
<td>${d.teknisi}</td>
<td class="${warna}">${d.status}</td>
<td>
<button onclick="edit(${i})">Edit</button>
<button onclick="hapus(${i})">Hapus</button>
</td>
</tr>`;
});

  function updateClock(){
    const now = new Date();
    document.getElementById("clock").innerText =
        now.toLocaleTimeString("id-ID");
}

setInterval(updateClock,1000);
updateClock();

 function cekGangguan(){

    let putus = data.filter(d => d.status === "Putus").length;

    const status = document.getElementById("networkStatus");

    if(putus > 0){
        status.innerHTML = "🔴 ALERT - Ada Jalur Putus!";
        status.style.color = "red";

        console.log("ALARM NOC!");
    }else{
        status.innerHTML = "🟢 Network Normal";
        status.style.color = "lime";
    }
 }  
function logout(){
  localStorage.removeItem("login");
  location.reload();
}

// INIT MAP
var map = L.map('map').setView([-6.2, 106.8], 13);

// Tile map (gratis)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:'© OpenStreetMap'
}).addTo(map);   

   updateDashboard();
}

// load awal
tampilkan();

});
