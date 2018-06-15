export const popUp =()=>{

  const objPopUp = {
    container: document.querySelector('.popUp'),
    showPopUp: function(){
      this.container.classList.add('active');
    },
    closePopUp: function(){
      objPopUp.container.classList.remove('active');
    }
  };

  document.addEventListener('click',function (e) {

    if(
      e.target.tagName.toLowerCase() !== 'button' &&
      e.target.parentNode.tagName.toLowerCase() !== 'button' &&
      e.target.parentNode.parentNode.tagName.toLowerCase() !== 'button' &&
      e.target.tagName.toLowerCase() !== 'input'
    ){
      objPopUp.showPopUp();
    }

  });

  document.querySelector('.btn--close').addEventListener('click',objPopUp.closePopUp);
};