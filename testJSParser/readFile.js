

console.log("start");
  var test="42";

function testbt() {

  test = test.split(',');
console.log(test[1]);
test = atob(test[1]);


}




$('#inputFile').on('change', function () {

    var fileReader = new FileReader();
    fileReader.onload = function () {
      var data = fileReader.result;  // data <-- in this var you have the file data in Base64 format
      console.log(data);
      test = data;
    };
    fileReader.readAsDataURL($('#inputFile').prop('files')[0]);




});



// $(document).ready(function(){
//   $('input[type="file"]').change(function(e){
//     console.log(e.target.files[0]);
//     var fileName = e.target.files[0].name;
//     console.log('The file "' + fileName +  '" has been selected.');
//
//
//     file = e.target.files[0];
//     fr = new FileReader();
//     fr.onload = receivedText;
//     //fr.readAsText(file);
//     fr.readAsDataURL(file);
//     console.log(fr.result);
//   });
// });
