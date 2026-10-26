// Ingresso hero con GSAP. Senza GSAP o con "riduci movimento" la hero resta statica e visibile.
(function(){
  var root=document.documentElement;
  if(!root.classList.contains('anim')||!window.gsap)return;
  var q=function(s){return document.querySelector(s)};
  var lines=document.querySelectorAll('.hero h1 .ln>span');
  var path=q('.hl-line path');
  var len=path.getTotalLength();
  var stamp=q('.experience-stamp strong');
  var n={v:0};
  gsap.set(path,{strokeDasharray:len,strokeDashoffset:len});
  var tl=gsap.timeline({defaults:{ease:'power3.out'}});
  tl.fromTo('.hero .eyebrow',{autoAlpha:0,y:10},{autoAlpha:1,y:0,duration:.5})
    .fromTo('.hero-pretitle',{autoAlpha:0,y:14},{autoAlpha:1,y:0,duration:.6},'-=.25')
    .fromTo(lines,{autoAlpha:1,yPercent:105},{yPercent:0,duration:.9,stagger:.13,ease:'power4.out'},'-=.3')
    .fromTo('.photo-frame',{autoAlpha:1,clipPath:'inset(100% 0% 0% 0%)'},{clipPath:'inset(0% 0% 0% 0%)',duration:1.1,ease:'power3.inOut'},'<-.2')
    .fromTo('.photo-frame img',{scale:1.12},{scale:1,duration:1.4,clearProps:'transform'},'<')
    .set('.hero h1 .ln',{overflow:'visible'})
    .fromTo('.hl-line',{autoAlpha:1},{autoAlpha:1,duration:0},'-=.45')
    .to(path,{strokeDashoffset:0,duration:.7,ease:'power2.inOut'},'<')
    .fromTo(['.hero .intro','.hero .button','.hero-secondary'],{autoAlpha:0,y:14},{autoAlpha:1,y:0,duration:.6,stagger:.08},'<-.1')
    .fromTo('.portrait-caption',{autoAlpha:0,y:24},{autoAlpha:1,y:0,duration:.7},'<')
    .fromTo('.experience-stamp',{autoAlpha:0,scale:.85},{autoAlpha:1,scale:1,duration:.6,ease:'back.out(1.6)'},'<.1')
    .to(n,{v:32,duration:1.1,ease:'power2.out',onUpdate:function(){stamp.textContent=Math.round(n.v)}},'<')
    .fromTo('.trust p',{autoAlpha:0,y:12},{autoAlpha:1,y:0,duration:.6,stagger:.1},'<.2');
  stamp.textContent='0';
})();
