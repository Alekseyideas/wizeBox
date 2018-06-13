export const time = ()=>{

  const time = {
    date: new Date(),
    time: null,
    container: document.querySelector('.time'),

    getCurTime: function(){
      this.time = this.date.toLocaleString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            //second: 'numeric',
            hour12: true
          });
      this.container.innerHTML = this.time;
        },

    init: function(){
      this.getCurTime();
      setInterval(()=>{
        this.date = new Date();
        this.getCurTime();
      })
    }
  };

  time.init();


};