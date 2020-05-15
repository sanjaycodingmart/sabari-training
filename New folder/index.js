var c=1;
function readURL(input) {
  
  if (input.files && input.files[0]) {

    //create img element
    var img = document.createElement("img"); 
    var reader = new FileReader();
      
      reader.onload = function (e) {
          img.src=e.target.result;
          img.width=100;
          img.height=200;
          document.getElementById("container").appendChild(img);
          var temp="imgData"+c;c++;
          localStorage.setItem(temp,e.target.result);    
      };

      reader.readAsDataURL(input.files[0]);
    }
    
}

