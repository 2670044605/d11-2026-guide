window.__D11_VER='6';

(function(){
  'use strict';
  var root=document.documentElement, $=function(s){return document.querySelector(s)},
      $$=function(s){return [].slice.call(document.querySelectorAll(s))};
  function store(k,v){try{localStorage.setItem(k,v)}catch(e){}}
  function load(k,d){try{return localStorage.getItem(k)||d}catch(e){return d}}
  window.D11={store:store,load:load,root:root,$:$,$$:$$};
  window.D11_VER=window.__D11_VER||'';

  function applyPrefs(){
    root.dataset.theme=load('d11_theme','light');
    root.dataset.density=load('d11_density','normal');
    root.dataset.fontscale=load('d11_font','m');
    var t=$('#themeBtn'); if(t) t.textContent=root.dataset.theme==='dark'?'◑ 浅色':'◐ 深色';
    var d=$('#densityBtn'); if(d) d.classList.toggle('on',root.dataset.density!=='normal');
    var f=$('#fontBtn'); if(f) f.classList.toggle('on',root.dataset.fontscale!=='m');
  }
  window.D11.applyPrefs=applyPrefs; applyPrefs();
  try{ if(window.matchMedia && matchMedia('(prefers-color-scheme:dark)').matches && !localStorage.getItem('d11_theme')){
    store('d11_theme','dark'); applyPrefs();
  }}catch(e){}
  var tb=$('#themeBtn'); if(tb) tb.addEventListener('click',function(){
    store('d11_theme',root.dataset.theme==='dark'?'light':'dark'); applyPrefs();
  });
  var dcy=['normal','compact','relaxed'], db=$('#densityBtn');
  if(db) db.addEventListener('click',function(){
    var i=dcy.indexOf(root.dataset.density); store('d11_density',dcy[(i+1)%3]); applyPrefs();
  });
  var fsc=['m','l','s'], fb=$('#fontBtn');
  if(fb) fb.addEventListener('click',function(){
    var i=fsc.indexOf(root.dataset.fontscale); store('d11_font',fsc[(i+1)%3]); applyPrefs();
  });

  /* 折叠 */
  $$('.doc-head').forEach(function(h){
    h.addEventListener('click',function(){h.parentNode.classList.toggle('collapsed')});
  });
  var eb=$('#expandBtn');
  if(eb) eb.addEventListener('click',function(){
    var ds=$$('.doc'), anyOpen=ds.some(function(d){return !d.classList.contains('collapsed')});
    ds.forEach(function(d){d.classList.toggle('collapsed',anyOpen)});
    this.textContent=anyOpen?'全部展开':'全部折叠';
  });

  /* 手机抽屉 */
  var sb=$('#sidebar'), scrim=$('#scrim'), mb=$('#menuBtn');
  window.D11.closeMenu=function(){if(sb)sb.classList.remove('open');if(scrim)scrim.classList.remove('on')};
  if(mb) mb.addEventListener('click',function(){
    if(!sb)return; sb.classList.toggle('open'); if(scrim) scrim.classList.toggle('on',sb.classList.contains('open'));
  });
  if(scrim) scrim.addEventListener('click',window.D11.closeMenu);
  $$('.sidebar a').forEach(function(a){a.addEventListener('click',window.D11.closeMenu)});

  /* 目录高亮 */
  var navLinks=$$('.sidebar a.nav-doc');
  if('IntersectionObserver' in window && navLinks.length){
    var io=new IntersectionObserver(function(es){
      es.forEach(function(e){ if(e.isIntersecting){
        var id=e.target.dataset.doc||e.target.id;
        navLinks.forEach(function(a){a.classList.toggle('active',a.dataset.target===id)});
      }});
    },{rootMargin:'-70px 0px -70% 0px',threshold:0});
    $$('.doc').forEach(function(d){d.dataset.doc=d.id;io.observe(d)});
  }

  /* 回到顶部 */
  var toTop=$('#toTop');
  if(toTop){
    toTop.addEventListener('click',function(){window.scrollTo({top:0,behavior:'smooth'})});
    window.addEventListener('scroll',function(){toTop.classList.toggle('on',window.scrollY>700)},{passive:true});
  }
  window.addEventListener('beforeprint',function(){$$('.doc').forEach(function(d){d.classList.remove('collapsed')})});
})();
