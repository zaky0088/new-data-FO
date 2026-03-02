document.addEventListener("DOMContentLoaded", function(){

let data = JSON.parse(localStorage.getItem("fiberData")) || [];

tampilkan();

function simpan(){
localStorage.setItem("fiberData",JSON.stringify(data));
}

window.tambahData=function(){

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
}

});
