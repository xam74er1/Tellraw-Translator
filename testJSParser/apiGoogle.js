

var src = "en"
var dest = "fr"


function test() {
  console.log("go");
  var txt = document.getElementById("zoneTest").innerHTML;
  trad2(txt);
};

function trad2(text){
  console.log(google);
  google.language.translate(text, src, dest,  function(result)
  {
    console.log(result.translation);
  }
);
}

function trad(text){
  var YOUR_API_KEY="AIzaSyDdPX486-Kza-6uTk4U96empstfJOk1PAI";

  var urlrequest = "https://translation.googleapis.com/language/translate/v2?"+
  "q="+encodeURI(text.replace(/ /g,"+"))+
  "&target="+dest+
  "&format=text&source="+src+"&key="+YOUR_API_KEY;
  var req = new XMLHttpRequest();

  req.open('GET', urlrequest, true); //Asynchrone
  req.send(null);
  req.onreadystatechange = function(event) {
    if (this.readyState === XMLHttpRequest.DONE) {
      if (this.status == 200 ) {
        var reponseJSON=JSON.parse(this.responseText);
        var container = document.getElementById("zoneTest");
        //La réponse est sous la forme d'un tableau
        //car on peut demander la traduction de plusieurs textes dans la requête
        //en ajoutant autant de &q=texteàtraduire que nécessaire
        container.innerHTML = reponseJSON.data.translations[0].translatedText;
      }
    }
  }
}
