//Main

//var text = '/tellraw @a ["",{"text":"hello world ","color":"dark_red"},{"text":"is world","color":"dark_green"},{"text":"\n"},{"text":"this is a test","color":"dark_blue"},{"text":"\ngg"}]';

//var text = 'execute if score message traduction matches 1 run execute as @a at @s if block ~ 1 ~ lime_wool run tellraw @s ["",{"text":"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n[Mr Marco]","color":"gold"},{"text":" Bonjour et bienvenue sur le chantier de Orly, Je suis votre patron et nous avons besoin de vous pour construire cet immense terminal. Il relira les 2 terminaux entre eux. Il permettra davoir un flux moins conséquent \nÊtes-vous prêt pour accomplir cette mission ?","color":"aqua"},{"text":"\n"},{"text":"[Oui]","color":"dark_green","clickEvent":{"action":"run_command","value":"/scoreboard players set @s grue 1"}},{"text":" "},{"text":"[Non]","color":"dark_red"}]';


/*
On commence par recupere ce qu ce situe dans la zone d'input (dans start)
On met a jour la zone pour que lon puisse traduire (setupZoneTranslte)



*/

var text ="";
var copyText = "";
var fileText ="";
var tabOriginal = [];
var tabTraduis = [];
var pos = 0;
var change = false;
var textNonModififer = "";

function ini(){
  text = $("#inputText").html();

  copyText = text;

  $(".hide").hide();

  $(".tutoMainHide").click(function(){
    showTuto();

  })

  //pour la lecture du ficier

  $('#inputFile').on('change', function () {

    var fileReader = new FileReader();
    fileReader.onload = function () {
      var data = fileReader.result;  // data <-- in this var you have the file data in Base64 format


      fileText = data.split(',');
      fileText = b64_to_utf8(fileText[1]);
      tabOriginal  = fileText.split('\n');
      tabTraduis = tabOriginal;

      pos = -1;
      //on affiche le premier text
      next();

    };
    fileReader.readAsDataURL($('#inputFile').prop('files')[0]);




  });

  //chargment des donne save si elle exite

  console.log(localStorage);
  if(localStorage.trad_TranslateText){

    tabTraduis = JSON.parse(localStorage.getItem("trad_TranslateText"));
    tabOriginal = JSON.parse(localStorage.getItem("trad_OriginalText"));
    pos = localStorage.getItem("trad_pos");
    //  console.log(pos);


    if(tabTraduis.length>1){

      next();
    }
    //on affiche le premier text

  }else{
    console.log("Aucun local storage");
  }

}




//lorsque lon traduis
function traduire(update=true,isAutoTranslate=false){

  //console.log($(".texttoTranslate"));

  //pour chaque ellement traduis si il nest pas vide on le remet dans sa forme original
  $(".texttoTranslate").each(function(index, el) {
//si l'ellment a un text ou si on est dans une trad auto
    if($(el).text()!=""||isAutoTranslate){
console.log(el);
      //  console.log($(el).text());




          var childOriginalText = $(el).children(".orignalText")[0];
              var originaltext  =  $(childOriginalText).data("original")

console.log(originaltext);


//      var originaltext  =  $(childOriginalText).html().replace(/<br>/gm,'\\n');
      //console.log($(childOriginalText).html());
  //    originaltext  =   originaltext.replace(/(\n)*/,'');



      var parent = $(el).children(".spanTrad")[0];

//si on est en trad auto
      if(isAutoTranslate){
//on dessen de 2 niveaux et on recure le texte
            var textTranslte = $(childOriginalText).first().first().text()

      }else{
      //on recupere ce qui a ete mis dans le champ de saisise
      var textTranslte = $(parent).children("input").val();
      //  console.log("orignal ",originaltext,"replace",textTranslte);
    }


      if(copyText==undefined){
        copyText = $("#inputText").text();
      }

      if(textTranslte!=undefined&&textTranslte!=""){

        //console.log(copyText);
        copyText =  copyText.replace(originaltext,textTranslte);
        console.log("ORIGINAL : \n "+originaltext);
        console.log("Translate : \n "+textTranslte);
      }


      //var childTranslateText = $(el).children(".spanTrad")[0];

      //var originaltext  =  $(childTranslateText).html().replace("<br>",'\\n');

      //console.log(copyText);
    }
  }
);


//console.log(copyText);
try {
  copyText = copyText.replace(/\n/gm,"\\n");
  copyText = copyText.replace(/\n/gm,"\n");
} catch (e) {
  //console.log(e);
}





if(update&&copyText!=undefined){

  $("#txtouput").html(copyText);
  //showResult
  setupZoneTranslte(copyText,"#showResult",false);

  //mise en place dans le presse papier
  var copyText = document.getElementById("txtouput");

//si on copy colle auto
if($("#autoCopy").is(':checked')){
  /* Select the text field */
  copyText.select();

  /* Copy the text inside the text field */
  document.execCommand("copy");
}
//  console.log("en principe");
}






var tmpTxt = copyText;
//on change
copyText = text;

return tmpTxt;
};

function start(){

  text = $("#inputText").val();
  textNonModififer = $("#inputText").html()

  copyText = text;
  setupZoneTranslte(copyText);
}


///////////////////Utilise/////////////

function isValidText(tmpTxt){
  tmpTxt = tmpTxt.trim();

  //return !(tmpTxt.charAt(0) == '#' || tmpTxt.length < 2);
  return tmpTxt.indexOf('text')!=-1;

}


function b64_to_utf8( str ) {
  return decodeURIComponent(escape(window.atob( str )));
}

function save(){

  //  console.log(JSON.stringify(tabTraduis));
  if(change){
    tabTraduis[pos] = traduire(false);
    var tmpTxt = JSON.stringify(tabTraduis);
    localStorage.setItem("trad_TranslateText", tmpTxt);
    var tmpTxt = JSON.stringify(tabOriginal);
    localStorage.setItem("trad_OriginalText", tmpTxt);


  }
  console.log(pos);
  localStorage.setItem("trad_pos", pos);
}

////////////////////GESTION DE LA VUE ///////////////////


function showTuto(){

  console.log("show");
  $(".tutoMainHide").unbind();
  $("#tuto").show(5);


  $(".tutoMainHide").click(function(){

    hideTuto();

  })
}

function hideTuto(){
  console.log("hide");
  $(".tutoMainHide").unbind();
  $("#tuto").hide();


  $(".tutoMainHide").click(function(){

    showTuto();

  })
}
//set a passe d'un format json a une sozne html formate
//la zone html ou le text est mis est defini par arg "zone"
function setupZoneTranslte(textTrad,zone="#main",needCase = true){


  //console.log("zone tranlate = "+textTrad);

  $(zone).empty();

  //var list = text.slice(text.indexOf(' ["')).replace(/\n/g,'<br>');
  try {
    var list = textTrad.slice(textTrad.indexOf(' ["'));
    if(textNonModififer.indexOf(' ["')==-1){
      console.log("Pas de [ trouver ]");

var a = textNonModififer;
var b = " [\"\",";
var position = textNonModififer.indexOf(' {"text"');
var output = [a.slice(0, position), b, a.slice(position)].join('');

output = output+"]"
console.log(output);
      var listNonModifier = output.slice(output.indexOf(' ["'));
    }else{
    var listNonModifier = textNonModififer.slice(textNonModififer.indexOf(' ["'));
  }

  } catch (e) {
    var list = textTrad;
    console.log(textTrad);
    console.log(textTrad.indexOf(' ["'));
  }

  //  console.log(list);
var objTextNonModifier = [];

  const regex = /"text":"([^"]*)/gm;
const str = listNonModifier;
let m;

let debutRegex = regex.exec(str);

if(debutRegex==null){
  console.log(str);
}

while ((m = regex.exec(str)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (m.index === regex.lastIndex) {
        regex.lastIndex++;
    }

    // The result can be accessed through the `m`-variable.
    m.forEach((match, groupIndex) => {
      console.log(`Found match, group ${groupIndex}: ${match}`);
      if(groupIndex==1){

                objTextNonModifier.push(match)
      }

    });
}

try{
//console.log(listNonModifier);
  var obj = JSON.parse(list);

}catch (e) {

  console.log(list);
  console.log(e);
}



  //on liste les object en attendant un break line
  var listTmpObj = [];

  var newcolor;

  //console.log(obj.length);


  var tmpBool = false;

  for (var i = 0; i < obj.length; i++) {

    // console.log(i);
    // console.log(obj[i] instanceof Object);
    if(obj[i] instanceof Object &&obj[i].text!=""&&obj[i].text!=" " ){

      // var testTmp = obj[i].text+""
      // console.log(testTmp.decode("utf-8"));
      var bacupkText = obj[i].text;

      try{
        if(tmpBool){
          obj[i].text = obj[i].text.replace(/\n/g,'<br>');
        }else{
          tmpBool = true;
        }

      }catch(e){
        console.log(obj[i]);
        console.log(e);
      }
      //on save lobject pour si ya un break

      listTmpObj.push(obj[i]);


      var txtTmp = obj[i].text;
      var tmp = $("<span></span>");

      var spanTxt = $("<span></span>").html(txtTmp);
      spanTxt.addClass("orignalText");

      spanTxt.data("original",objTextNonModifier[i-1])

      $(tmp).addClass("texttoTranslate");


      //console.log("tmp = ",tmp.html());
      //  tmp.attr('text', obj[i].text);



      var color = obj[i].color;
      // console.log(color);
      // console.log(obj[i]);

      if(color !== undefined){
        newcolor = color.replace("_",'');
        //  console.log(newcolor);
        tmp.css("color",newcolor);
      }


      tmp.append(spanTxt);

      //ne pas cree de block uniqument pour un espace
      if(obj[i].text!="<br>"&&needCase){
        var saisir = $("<span></span>").addClass("spanTrad");

        var zoneTrad = $("<input>").addClass("zoneTrad");

        $(zoneTrad).keyup(function(event) {

          // $(this).attr("size",Math.max(this.value.length, 1));

          this.size = Math.max(this.value.length, 10);


        });

        saisir.append(zoneTrad);

        // tmp.append($("<br>"))

        tmp.append(saisir);

      }else if(needCase){
        //si on a juste un saut de ligne on lui met des classe spetiale
        var saisir = $("<span></span>").addClass("spanTrad,tradvide");
        tmp.append(saisir);
      }

      $(zone).append(tmp);
    }
  }
  //Fin du for

  $(".zoneTrad").change(function (){
    change = true;
    if($("#liveTranslta").is(':checked')){
      traduire();
    }

  })

}


function setupinputText(tmpTxt){
  $("#inputText").html(tmpTxt);
}



//gestion des bouton

function next(turn=false){
  if(!turn){
    save();
  }

  pos++;
  if(pos>tabTraduis.length-1){
    pos =0;
  }
  //on avence juscau prochaie text valide
  while(!isValidText(tabTraduis[pos])){
    //on troune
    next(true)
  }

  //si on ne fait pas de la rotation
  if(!turn){
    if(!turn){
      textSuivant();
    }
  }

  if($("#autoGGtrad").is(':checked')){
    fuck_lopstruction()
  }

}

function prev(turn=false){

  if(!turn){
    save();
  }


  pos--;
  if(pos<0){
    pos =tabTraduis.length-1;
  }

  while(!isValidText(tabTraduis[pos])){
    //on troune
    prev(true);
  }

  //si on ne fait pas de la rotation
  if(!turn){
    textSuivant();
  }

  if($("#autoGGtrad").is(':checked')){
    fuck_lopstruction()
  }

}



function textSuivant(){




  setupinputText(tabTraduis[pos]);
  start();

  if($("#liveTranslta").is(':checked')){
    traduire();
  }
  change = false;


}

//fonction qui permet de cliquer sur lobject de google pour acitve google translate
function fuck_lopstruction(){


$($($("iframe").contents()[0]).find("button")[0]).click();

setTimeout(function(){
traduire(true,true);
}, 500);


}

//on lance la classe principe qui met en forme
ini();
