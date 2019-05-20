

//declaration en globale
var zone_txt = document.getElementById('zone_affichage');

var global_memory ="";

var globale_editable = false;

//ajout dun event pour tout les boutton simple



function ini() {
  var bouton_simple = document.getElementsByClassName('bouton_simple');
$(".bouton_simple").click(function(){
  affiche(this);
});
/*
  for (var i = 0; i < bouton_simple.length; i++) {
    bouton_simple[i].setAttribute("onclick","affiche(this)");

  }
  */



  $('#MR').click(memory);


  $('#MC').click(raz_memory);

  $('#MS').click(affiche_memory);

  $('#E').click(this,onEdite);

  $('#zone_affichage').attr("ondblclick","changeZone(this)");

  $('#zone_affichage').attr('onblur', 'save()');

  //recupration des cookie

    $('#zone_affichage').val($.cookie("champ_calc"));


    $(".dragok").draggable({
    revert: true
});


    $(".bouton_libre").droppable({
      drop: function( event, ui ) {
  //      console.log(ui.draggable.html());
        $( this ).val(ui.draggable.html());
        //reveni as son ancine positon
    //   ui.draggable.draggable('option','revert',true);
        save();
        $( "#accordion" ).accordion('refresh');
      }

    }
  );






var url = "http://www-etu-info.iut2.upmf-grenoble.fr/~clercma/ProgWeb/calculatrice3/recup_eta.php";
var callback = setEtaMemoire;

//ajax_get_request(callback,url,true);
$.get(url,callback);

//----------ALL JQUERRY FUNCTION ------------

  $( function() {
    $( "#dialog" ).dialog({
      autoOpen: false,
      show: {
        effect: "blind",
        duration: 1000
      },
      hide: {
        effect: "explode",
        duration: 1000
      }
    });
  });

// var allfucntion = [
//   "Math.abs",
// "Math.ceil",
// "Math.cos",
// "Math.E",
// "Math.exp",
// "Math.floor",
// "Math.log",
// "Math.max",
// "Math.min",
// "Math.PI",
// "Math.pow",
// "Math.round",
// "Math.sin",
// "Math.sqrt"];
//
//
// $( "#zone_affichage" ).autocomplete({
//   source: allfucntion
// });



$( "#zone_affichage" ).autocomplete({
  source: "search.php",
  minLength: 2,
   droppable: true,
  select: function( event, ui ) {

      $( "#zone_affichage" ).text('ui.item.value')

  }
});

$( "#accordion" ).accordion({
  collapsible: true
});

}


function oppenDialog(text){
  $( "#dialog" ).html(text);
  $( "#dialog" ).dialog( "open" );
}

function setEtaMemoire(html,status) {
  console.log('set eta memoire');
  console.log("html :"+html+"|");
  console.log("suecce:"+status);
var obj = JSON.parse(html);

for (it of obj.fonctions) {
var bt = document.getElementById(it.id);
bt.value = it.value;
}

global_memory = obj.memoire;

}

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function save() {
  console.log("save");
  var url = "http://www-etu-info.iut2.upmf-grenoble.fr/~clercma/ProgWeb/calculatrice3/serveur_save.php";
  //callback,url,async,data
  var callback = callback_loadSave;
  var data = "data="+toJSON();
  //ajax_post_request(callback,url,true,data);

  $.post(url,data,callback);


  $.cookie('champ_calc',$("#zone_affichage").val());

}

function callback_loadSave(html) {
  console.log("save ok"+html);
}

function rab() {

  $('#zone_affichage').val("");
//  zone_txt.value="";
}

function calc() {
  try {
      var res = eval(zone_txt.value);
$('#zone_affichage').val(res);

  } catch (e) {
    oppenDialog( "erreur de syntaxe");
  }

}


function affichePost(html){
    $('#zone_affichage').val(html);
//  zone_txt.value = html;
}

function affiche(button) {
  zone_txt.value+=button.value;
}function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function plusMoin() {
  if(zone_txt.value.charAt(0)=='-'){
      $('#zone_affichage').val( zone_txt.value.substr(1,zone_txt.value.length));
  }else{
  $('#zone_affichage').val('-'+zone_txt.value);
  }
}

function memory() {
console.log("memoire");
  var patern = /^-?\d+\.?\d*$/;

  console.log(zone_txt.value.match(patern));
  if(zone_txt.value.match(patern)!=null){
    global_memory = zone_txt.value;
  }else{
    oppenDialog('vous ne pouvez pas sauvegade une operation , seul un nombre peut etre sauvegade');
  }

}

function affiche_memory(){
  zone_txt.value += global_memory;
}


function raz_memory() {
  console.log("raz memory");
  global_memory="";
}

function onEdite(me) {
console.log("on edit");
  if(globale_editable){
    $(me).css("color","black");
    globale_editable = false;
    set_mode_Calcule();
    console.log("end");
  }else{
    $(me).css("color","red");
    globale_editable = true;
    set_mode_Editable();
    console.log("end");
  }

}

function set_mode_Editable() {
//  var bouton_libre = document.getElementsByClassName('bouton_libre');

$(".bouton_libre").removeAttr("onclick");
$(".bouton_libre").attr("ondblclick","edit(this)");

/*
  for (var i = 0; i < bouton_libre.length; i++) {

    bouton_libre[i].removeAttribute("onclick");
    bouton_libre[i].setAttribute("ondblclick","edit(this)")
  }
  */
}

function set_mode_Calcule() {
  //var bouton_libre = document.getElementsByClassName('bouton_libre');
  $(".bouton_libre").removeAttr("ondblclick");
  $(".bouton_libre").attr("onclick","edit(this)");

/*  for (var i = 0; i < bouton_libre.length; i++) {
    fix(bouton_libre[i]);
    bouton_libre[i].removeAttribute("ondblclick");
    bouton_libre[i].setAttribute("onclick","affiche(this)")
  }*/

}

function edit(button){

  button.setAttribute("type","text");
  button.removeAttribute("ondblclick");
  button.setAttribute("ondblclick","fix(this)")
}

function fix(button) {
  button.setAttribute("type","button");
  button.removeAttribute("ondblclick");
  button.setAttribute("ondblclick","edit(this)");
}

function changeZone(me) {

  var tmp = document.getElementById('zone_affichage');

  var z_calc = document.getElementById('calc');



  if(z_calc.lastChild==tmp){
    tmp.parentNode.removeChild(tmp);
    z_calc.prepend(tmp);
  }else{
    tmp.parentNode.removeChild(tmp);
    z_calc.appendChild(tmp);
  }
  save();
}

function ajax_get_request(callback,url,async) {

  var xhr = new XMLHttpRequest();


  xhr.onreadystatechange= function(){

    if ((xhr.readyState==4) && (xhr.status == 200)) {

      callback(xhr.responseText)
      ;}


    }

    xhr.open("GET",url,async);
    xhr.send();

  }

  function toJSON() {

    //setCookie("champ_calc",zone_txt.value,10);
    //setCookie("memory",global_memory,10);

    var tmp_txt ="{\"fonctions\":[";

    //var bouton_libre = document.getElementsByClassName('bouton_libre');
    $(".bouton_libre").each(function(index){
      if(index!=0){
        tmp_txt+=",";
      }
        tmp_txt += JSON.stringify({id:this.id,value:this.value});

    })

    /*
    for (var i = 0; i < bouton_libre.length; i++) {

      if(i!=0){
        tmp_txt+=",";
      }

      tmp_txt += JSON.stringify({id:bouton_libre[i].id,value:bouton_libre[i].value});
      //tmp_txt += bouton_libre[i].value+",";
    }
    */
    if(global_memory!=""){
      var tmp = ""+global_memory+"";

    }else {
      var tmp=0;
    }
      tmp_txt+="],\"memoire\":"+tmp+"}";



    return tmp_txt;

  }

  function ajax_post_request(callback,url,async,data){
    var xhr = new XMLHttpRequest(); //création de l'objet
    xhr.onreadystatechange = function() {if ((xhr.readyState==4) && (xhr.status == 200)) {

      callback(xhr.responseText);
    }};
    xhr.open("POST",url,async);// initialisation de l'objet
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");//format des données envoyées dans le corps de la requête
    xhr.send("data="+data);//envoi de la requête avec données
  }

  ini();
