function myFunction(e) {
e.preventDefault();
var el = document.querySelector(".zip").value;
console.log(el);
fetch('https://api.zippopotam.us/us/'+el)
  .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +response.status);
        document.getElementById("output").innerHTML = `
          <div class="notification is-danger">
           <button class="delete"></button>
             <strong>Incorrect Zipcode. Please enter a valid Zipcode.</strong>
          </div>
        `;
        showIcon('icon-remove');
        // document.querySelector(".icon-remove").style.display = "inline-flex";
        return;
      }
      response.json().then(function(data) {
        var data = data.places[0];
        showIcon('icon-check');
        document.getElementById("output").innerHTML = `
        <article class="message is-primary">
        <div class="message-header">
          <p>Location Info</p>
          <button class="delete" aria-label="delete"></button>
        </div>
        <div class="message-body">
        <ul>
          <li><strong>City: </strong>${data['place name']}<li/>
          <li><strong>State: </strong>${data.state}<li/>
          <li><strong>longitude: </strong>${data.longitude}<li/>
          <li><strong>latitude: </strong>${data.latitude}<li/>
        <ul>
        </div>
        </article>
        `;
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });
}
function showIcon(icon){
  console.log(icon);
   document.querySelector(".icon-remove").style.display = "none";
   document.querySelector(".icon-check").style.display = "none";
   document.querySelector(`.${icon}`).style.display = "inline-flex";
}
