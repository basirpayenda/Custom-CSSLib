/* alerts in boostrap, box in basirstrap */
let close_btn = [...document.getElementsByClassName("close")];

close_btn.forEach(close => {
  close.addEventListener("click", function() {
    let parent_elem = this.parentElement;
    parent_elem.style.opacity = 0;
    setTimeout(function() {
      parent_elem.style.display = "none";
    }, 500);
  });
});
