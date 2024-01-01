function playAudio(audio) {
     return new Promise((res) => {
          audio.play();
          audio.onended = res;
     });
}
async function fire() {
     var chambers = 6;
     var x = Math.floor(Math.random() * chambers);

     if (x == 0) {
          document.getElementById("result").innerHTML =
               "<p style='color:red;'>You Died!</p>";
          document.getElementById("gun").style.transform = "rotate(20deg)";
          setTimeout(
               () =>
                    (document.getElementById("gun").style.transform =
                         "rotate(0deg)"),
               300
          );
          var audio = new Audio("gun.mp3");
          audio.play(audio);
          audio = new Audio("death.mp3");
          await playAudio(audio);
     } else {
          var audio = new Audio("dry.mp3");
          await playAudio(audio);
          document.getElementById("result").innerHTML =
               "<p style='color:green;'>You Lived</p>";
     }
}
