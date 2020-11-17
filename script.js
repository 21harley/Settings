const $d=document;
const $canvas=$d.getElementById("canvas");
let context=$canvas.getContext("2d");
const aimM=["Legacy","oven","loyalty"];
let aimC=0;
const mouse=["Disable","Enable"];
let mou1=0;
let mou2=0;
$canvas.setAttribute("width",640);
$canvas.setAttribute("height", 300);
let sumaX=0;
let sumaY=0;
setInterval(()=>{
    context.clearRect(0,0,$canvas.width,$canvas.height);//limpiar el canvas
    context.beginPath();
    context.fillStyle="#000000";
    context.arc(123+sumaX,93+sumaY,20,0,2*Math.PI,true);
    context.fill();
},0);

let buffer="";
let contB=0;
$d.addEventListener("keypress",(e)=>{
    buffer+=e.code; contB++;

   if(e.code=="KeyW"){
       sumaY-=20;
   }
   if(e.code=="KeyS"){
       sumaY+=20;
   }
   if(e.code=="KeyA"){
       sumaX-=20;
   }
   if(e.code=="KeyD"){
       sumaX+=20;
   }
   if(e.code=="KeyC"){
      buffer=""; contB=0;
   }
   if(buffer=="KeyLNumpadAddKeyO"){
       alert("Comando secreto :v ");
   }
   if(contB==3){
      buffer="";
      contB=0;
    }
   
});
function apagar(id,open){
    let $aux=$d.getElementById(id);
    $aux.style.display="none";
    
    let $acti=$d.getElementById(open);
    $acti.classList.toggle("open"); 
}


$d.addEventListener("click",(e)=>{
    if(e.target.matches(".menu__nav--item")){
        let $open=$d.querySelector(".open");
        apagar($open.id[3],e.target.id);
        $open.classList.toggle("open");
       let $acti=$d.getElementById( e.target.id[3]);
       switch(e.target.id[3]){
        case "A": 
        case "G":
            $acti.style.display="block";
        break; 
        case "M":
            $acti.style.display="block";
            mostrar();
         break;
        case "P":
            $acti.style.display="flex";
        break;
       }
    }
    if(e.target.matches(".KeyMB__item")){
        if(!e.target.matches(".KeyMB__item.openMB")){
            e.target.classList.toggle("openMB");
            let $aux=e.target.id;
            if($aux=="kBo"){
                $d.querySelector(".container__Bey").style.display="block";
                $d.querySelector(".container__Mouse").style.display="none";
                $d.querySelector("#kMo").classList.toggle("openMB");
            }else{
                $d.querySelector(".container__Mouse").style.display="block";
                $d.querySelector(".container__Bey").style.display="none";
                $d.querySelector("#kBo").classList.toggle("openMB");
            }
        }
    }
    if(e.target.id[1]=="m"||e.target.id[1]=="M"){
        console.log("boton");
        let auxS=0;
        if(e.target.id[1]=="m"){
            auxS=-1;
        }else{
            auxS=1;
        }
        console.log(auxS+" "+e.target.id[2]+" "+aimC);
         switch(parseInt(e.target.id[2])){
             case 1:
                if(auxS<0){
                    if((aimC-1)>=0){
                        aimC+=auxS;
                    }   
                }else{
                    if((aimC+1)<=2){
                        aimC+=auxS;
                    }  
                }
                $d.getElementById("txt"+e.target.id[2]).innerHTML=aimM[aimC];
             break;
             case 2:
                if(auxS<0){
                    if((mou1-1)>=0){
                        mou1+=auxS;
                    }   
                }else{
                    if((mou1+1)<=1){
                        mou1+=auxS;
                    }  
                }
                $d.getElementById("txt"+e.target.id[2]).innerHTML=mouse[mou1];        
             break;
             case 3:
                if(auxS<0){
                    if((mou2-1)>=0){
                        mou2+=auxS;
                    }   
                }else{
                    if((mou2+1)<=1){
                        mou2+=auxS;
                    }  
                }
                $d.getElementById("txt"+e.target.id[2]).innerHTML=mouse[mou2];
                
             break;
        }
    }
 
});
const $input = document.querySelectorAll("input[type=range]");
const $p = document.querySelectorAll(".item__valor");
for(let i=0;i<$input.length;i++){
    $input[i].style.setProperty("--value", $input[i].value);
}

$d.addEventListener("input", (e)=>{
   if(e.target.matches("input[type=range]")){
    for(let i=0;i<$input.length;i++){
        $input[i].style.setProperty("--value", $input[i].value);
        switch(i+1){
            case 1:
                $p[i].innerHTML=$input[i].value;
            break;
            case 2:
                $p[i].innerHTML=parseFloat($input[i].value)/100;
            break;
            case 3:
                $p[i].innerHTML=parseFloat($input[i].value)/10;
            break;
        }
    }
   }
  },false); 
let idItem="";
function validaObj(id){
    const $aux=$d.getElementById(id);
      if($aux.children[1].classList=="item__valor"){
        $aux.children[2].classList.toggle("rageH");
      }else if($aux.children[1].classList=="item__txt"){
        $aux.children[2].children[0].classList.toggle("active");
        $aux.children[2].children[1].classList.toggle("active");
      }
}
function cambio(obj){
    if(obj.children[1].classList=="item__valor"&&idItem!=obj.id){
        obj.children[2].classList.toggle("rageH");
        if(idItem!=""){
            validaObj(idItem);
        }
        idItem=obj.id;
    }else if(obj.children[1].classList=="item__txt"&&idItem!=obj.id){
        obj.children[2].children[0].classList.toggle("active");
        obj.children[2].children[1].classList.toggle("active");
        if(idItem!=""){
            validaObj(idItem);
        }
        idItem=obj.id;
    }
}

function mostrar(){
    const $inpuItem=$d.querySelectorAll(".keyMouse__input--item");
    for(let i=0;i<$inpuItem.length;i++){
      $inpuItem[i].addEventListener("mouseover",(e)=>{
          if(e.target.matches(".keyMouse__input--item ")||e.target.matches(".keyMouse__input--item *")){
            if(e.target.children.length>=3){
                 cambio(e.target);
            }else{
               if(e.target.parentElement.id[0]=="t"){
                cambio(e.target.parentElement.parentElement);                 
               }else{
                cambio(e.target.parentElement);
               }
            }
          }
      });
    }
}
$d.body.addEventListener("mouseover",(e)=>{
        if(e.target.matches(".container__Mouse")||e.target.matches(".keyMouse")){
             if(idItem!=""){
                 validaObj(idItem);
                 idItem="";
             }
        }
});  

/*
context.beginPath();
context.fillStyle="rgb(0,0,0)";
context.arc(123,93,70,0,2*Math.PI,true);
context.fill();
*/