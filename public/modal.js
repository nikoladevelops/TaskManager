/**
 * Used to configure a task modal window div element.
 * @param modalDiv The modal HTML Element.
 * @param {String} modalDivId The modal div id name.
 * @param {Function} submitBtnFunc The function that runs when the submit button is clicked.
 */
class TaskModal{
  constructor(modalDiv, modalDivId, submitBtnFunc){
    this.modalDiv=modalDiv;
    this.modalDivId=modalDivId;
    this.submitBtnFunc=submitBtnFunc;

    this.configureModal();
  }

  configureModal(){

  // Get the <span> element that closes the modal.
  let span = document.querySelector(`#${this.modalDivId} .close`);

  // When the user clicks on <span> (x), close the modal.
  span.onclick = () => {
    this.modalDiv.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it.
  window.addEventListener('click', (e)=>{
    if (e.target == this.modalDiv) {
      this.modalDiv.style.display = "none";
    }
  });

  // Add the submitBtnFunc to the submit button click event / Execute submitBtnFunc when the submit button is clicked. 
  document.querySelector(`#${this.modalDivId} .submitBtn`).addEventListener('click', this.submitBtnFunc);
  }
}