///////////circle skill///////////////////////
 const circle = document.querySelectorAll('.circle');
 circle.forEach(element => {
    var dots =element.getAttribute("data-dots");
    var marked = element.getAttribute("data-percent");
    var percent =Math.floor( dots*marked/100);
    var points="";
    var rotate = 360 / dots ;
    
    for(let i=0; i< dots ; i++){
        points +=  `<div class="points" style="--i:${i}; --rot:${rotate}deg"></div>`;
    }
element.innerHTML = points;
 const pointsMarked = element.querySelectorAll('.points');
 for( let i=0; i<percent; i++){
    pointsMarked[i].classList.add('marked')
 }

 });
 ///////////active Menu///////////////////////
 let menuli = document.querySelectorAll('header ul li a ');
 let section = document.querySelectorAll('section');

 function activeMenu(){
    let len = section.length ;
    while(--len && window.scrollY + 97 < section [len].offsetTop){}
    menuli.forEach(sec => sec.classList.remove("active"));
    menuli[len].classList.add("active");
 }
 activeMenu();
 window.addEventListener("scroll",activeMenu);


 
 ///////////sticky navbar///////////////////////
 const header = document.querySelector("header");
 window.addEventListener("scroll",function(){
   header.classList.toggle("sticky" ,this.window.scrollY > 50 )
 }
)
