// Movimento discreto allo scorrimento (GSAP + ScrollTrigger). Senza GSAP o con "riduci movimento" la pagina resta statica e completa.
(function(){
  if(!window.gsap||!window.ScrollTrigger||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  gsap.registerPlugin(ScrollTrigger);
  var groups=['.section-top','.page-intro>*','.article-heading>*','.article-cover','.article-body>*','.service-tile','.editorial-card','.review-grid figure','.studio-copy>*','.contact-intro>*','.contact-ways>*','.page-contact>*','.service-list details'];
  groups.forEach(function(sel){
    var els=gsap.utils.toArray(sel).filter(function(el){return !el.closest('.hero')});
    if(!els.length)return;
    gsap.set(els,{autoAlpha:0,y:26});
    ScrollTrigger.batch(els,{start:'top 90%',once:true,onEnter:function(b){gsap.to(b,{autoAlpha:1,y:0,duration:.8,ease:'power3.out',stagger:.09,overwrite:true})}});
  });
  // Foto della squadra: leggera profondità
  var team=document.querySelector('.studio-photo img');
  if(team){gsap.fromTo(team,{scale:1.08,yPercent:-3},{scale:1.08,yPercent:3,ease:'none',scrollTrigger:{trigger:team,start:'top bottom',end:'bottom top',scrub:true}})}
  // Immagini delle card servizi: parallasse leggera
  gsap.utils.toArray('.tile-img img').forEach(function(img){gsap.fromTo(img,{yPercent:-4},{yPercent:4,ease:'none',scrollTrigger:{trigger:img.closest('.service-tile'),start:'top bottom',end:'bottom top',scrub:true}})});
  addEventListener('load',function(){ScrollTrigger.refresh()});
})();
