function getUsers(){
  
  fetch("https://randomuser.me/api/?results=3")

.then((rawData) => rawData.json())
.then((data) => {

  document.querySelector(".users").innerHTML = "";

  data.results.forEach(user => {

    console.log(user);
    

     // Create card container
  let card = document.createElement("div");
  card.className = "card";

  // Create image
  let img = document.createElement("img");
  img.src = user.picture.large;
  img.alt = "Profile Image";

  // Create info container
  let info = document.createElement("div");
  info.className = "info";

  // Create name
  let name = document.createElement("h3");
  name.textContent = user.name.first;

  // Create email
  let email = document.createElement("p");
  email.textContent = user.email;

  // Create status
  let status = document.createElement("span");
  status.className = "status";
  status.textContent = "Active";

  // Append everything together
  info.appendChild(name);
  info.appendChild(email);
  info.appendChild(status);

  card.appendChild(img);
  card.appendChild(info);

  document.querySelector(".users").appendChild(card);
    
  });
})

.catch((err) =>{
  console.log(err);
  
})
}

getUsers()

document.querySelector(".refresh-btn")
.addEventListener("click", ()=>{
  getUsers()
});

