document.addEventListener("DOMContentLoaded", function(){

let data = JSON.parse(localStorage.getItem("fiberData")) || [];

tampilkan();

function simpan(){
localStorage.setItem("fiberData",JSON.stringify(data));
}

window.cariData=function(){

let keyword=document.getElementById("search").value.toLowerCase();
let rows=document.querySelectorAll("#dataFiber tr");

rows.forEach(r=>{
r.style.display=r.innerText.toLowerCase().includes(keyword)
? ""
: "none";
});

}

let jalur = document.getElementById("jalur").value;
let odp=document.getElementById("odp").value;
let core=document.getElementById("core").value;
let panjang=document.getElementById("panjang").value;
let teknisi=document.getElementById("teknisi").value;
let status=document.getElementById("status").value;

data.push({jalur,odp,core,panjang,teknisi,status});

simpan();
tampilkan();
}

window.hapus=function(i){
data.splice(i,1);
simpan();
tampilkan();
}

function tampilkan(){
function updateDashboard(){

document.getElementById("totalJalur").innerText=data.length;

let totalCore=0;
let putus=0;

data.forEach(d=>{
totalCore+=Number(d.core);
if(d.status==="Putus") putus++;
});

document.getElementById("totalCore").innerText=totalCore;
document.getElementById("jalurPutus").innerText=putus;
}
  
let tabel=document.getElementById("dataFiber");
tabel.innerHTML="";

data.forEach((d,i)=>{

let warna="";

if(d.status==="Active") warna="active";
if(d.status==="Putus") warna="putus";
if(d.status==="Maintenance") warna="maintenance";

tabel.innerHTML += `
<tr class="${warna}">
<td>${i+1}</td>
<td>${d.jalur}</td>
<td>${d.odp}</td>
<td>${d.core}</td>
<td>${d.panjang} m</td>
<td>${d.teknisi}</td>
<td>${d.status}</td>
<td><button onclick="hapus(${i})">Hapus</button></td>
</tr>`;
});

});
F12 → Console
updateDasboard();
