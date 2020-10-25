  const sideTitles = document.querySelectorAll('.side-title')
  const deals = document.querySelector('.deal-carousel')
  const dealsLeft = document.querySelector('.deal-left')
  const dealsRight = document.querySelector('.deal-right')
  const category = document.querySelectorAll('.category>a')
  const hamburger = document.querySelector('.hamburger')
  const sidebar = document.querySelector('.side-bar')
  let start = false
  let startPoint = 0
  let scrollLeft = 0
  hamburger.addEventListener('click', (e)=> {    
    hamburger.classList.toggle('triggered')
    sidebar.classList.toggle('active')
  })
  sideTitles.forEach(sideTitle => {
    sideTitle.addEventListener('click', (e) => {
      e.preventDefault()
      sideTitle.classList.toggle('active')
    })
  })
  dealsLeft.addEventListener('click', function(e){
    e.preventDefault()
    console.log(e)
    deals.scrollTo({
      left: deals.scrollLeft-(deals.offsetWidth),
      behavior: 'smooth'
    });
  })
  dealsRight.addEventListener('click', function(e){
    e.preventDefault()
    deals.scrollTo({
      left: deals.scrollLeft+(deals.offsetWidth),
      behavior: 'smooth'
    });
  })
  deals.addEventListener('mousedown',function(e){
    start = true
    console.log('start')
    startPoint = e.x - deals.offsetLeft
    scrollLeft = deals.scrollLeft
  })
  deals.addEventListener('mousemove',function(e){
    if(start){
      e.preventDefault()
      const x = e.x - deals.offsetLeft
      const move = (x-startPoint)
      deals.scrollLeft = scrollLeft - move

    }
  })
  deals.addEventListener('mouseup', function(e){
    start = false

  })
  deals.addEventListener('mouseleave', function(e){
    start = false
    
  })

  window.addEventListener('scroll', counterStart)
  function counterStart () {
    const counterNumbers = document.querySelectorAll('.counter-number')
    counterNumbers.forEach((counterNumber)=>{
      if(window.scrollY > (document.querySelector('.event-block').offsetTop-counterNumber.offsetTop)){
        
        counterNumber.classList.add('active')
        counterNumber.addEventListener('transitionend', function(e) {
          if(e.propertyName == 'opacity'){
            console.log(e.target.innerHTML)
            
            animateValue(counterNumber, 0, e.target.innerHTML, 3000 )
          }
        })  
      }
    })
  }

  function animateValue(target, start, end, duration) {
    if (start === end) return;
    let range = end - start;
    let current = start;
    let increment = end > start? Math.ceil(end/300) : -1;
    let stepTime = Math.abs(Math.floor(duration / range));
    let obj = target;
    let timer = setInterval(function() {
        current += increment;
        obj.innerHTML =  current;
        if (current >= end) {
            clearInterval(timer);
            obj.innerHTML=end
        }
    }, stepTime);
  }
