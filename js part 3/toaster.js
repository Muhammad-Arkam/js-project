function createToaster(config) {
  return function (str) {
    let div = document.createElement("div");
    div.textContent = str;
    div.className = `inline-block ${
      config.theme === "dark"
        ? "bg-gray-800 text-white"
        : "bg-gray-100 text-black"
    } px-6 py-3 rounded shadow-lg pointer-events-none transition-opacity duration-300`;

    document.querySelector(".parent").appendChild(div);

    let parent = document.querySelector(".parent")

    parent.classList.add(
      config.positionX === "right" ? "right-5" : "left-5",
      config.positionY === "bottom" ? "bottom-5" : "top-5"
    );

    setTimeout(() => {
      document.querySelector(".parent").removeChild(div);
    }, config.duration * 1000);
  };
}

let toaster = createToaster({
  positionX: "right",
  positionY: "bottom",
  theme: "dark",
  duration: 3,
});
toaster("Download Done");
setTimeout(() => {
  toaster("Arkam accepted your request");
}, 2000);
