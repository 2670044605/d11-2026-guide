window.__D11_VER='12';

(function(){
  'use strict';

  var root=document.documentElement;
  function $(s,c){return (c||document).querySelector(s)}
  function $$(s,c){return [].slice.call((c||document).querySelectorAll(s))}
  function store(k,v){try{localStorage.setItem(k,v)}catch(e){}}
  function load(k,d){try{var v=localStorage.getItem(k);return v===null?d:v}catch(e){return d}}

  window.D11={store:store,load:load,root:root,$:$,$$:$$};
  window.D11_VER=window.__D11_VER;

  var THEME_KEY='d11_theme', DENSITY_KEY='d11_density', FONT_KEY='d11_font';
  var mediaDark=window.matchMedia?window.matchMedia('(prefers-color-scheme:dark)'):null;

  function pref(key,def){
    var v=load(key,null);
    return v===null?def:v;
  }
  function systemTheme(){return mediaDark&&mediaDark.matches?'dark':'light'}
  function resolvedTheme(){return pref(THEME_KEY,systemTheme())==='dark'?'dark':'light'}

  function anyDocOpen(){
    return $$('.doc').some(function(d){return !d.classList.contains('collapsed')});
  }

  function syncUI(){
    var t=root.dataset.theme==='dark'?'dark':'light';

    var themeBtn=$('#themeBtn');
    if(themeBtn){
      themeBtn.setAttribute('aria-pressed',t==='dark'?'true':'false');
      themeBtn.setAttribute('aria-label',t==='dark'?'切换到浅色主题':'切换到深色主题');
      themeBtn.title=t==='dark'?'切换到浅色主题':'切换到深色主题';
    }
    var meta=$('meta[name="theme-color"]');
    if(meta) meta.setAttribute('content',t==='dark'?'#101a22':'#0f766e');

    var density=root.dataset.density||'normal';
    var font=root.dataset.fontscale||'m';
    $$('.seg').forEach(function(seg){
      var kind=seg.getAttribute('data-pref');
      var val=kind==='theme'?t:kind==='density'?density:font;
      $$('button[data-val]',seg).forEach(function(b){
        var on=b.getAttribute('data-val')===val;
        b.classList.toggle('active',on);
        b.setAttribute('aria-pressed',on?'true':'false');
      });
    });

    var label=anyDocOpen()?'全部折叠':'全部展开';
    ['#expandBtn','#expandBtn2'].forEach(function(sel){
      var b=$(sel);
      if(!b) return;
      if(sel==='#expandBtn2') b.textContent=label;
      else {b.title=label;b.setAttribute('aria-label',label)}
    });
  }

  function applyTheme(t){
    root.dataset.theme=t==='dark'?'dark':'light';
  }
  function setTheme(t){store(THEME_KEY,t);applyTheme(t);syncUI()}
  function setDensity(v){store(DENSITY_KEY,v);root.dataset.density=v;syncUI()}
  function setFont(v){store(FONT_KEY,v);root.dataset.fontscale=v;syncUI()}

  /* 初始化偏好：head 里的内联脚本已提前应用，避免主题闪烁 */
  if(!root.dataset.theme) root.dataset.theme=resolvedTheme();
  if(!root.dataset.density) root.dataset.density=pref(DENSITY_KEY,'normal');
  if(!root.dataset.fontscale) root.dataset.fontscale=pref(FONT_KEY,'m');
  applyTheme(root.dataset.theme);
  syncUI();

  if(mediaDark){
    var onSystemChange=function(){
      if(load(THEME_KEY,null)===null){
        applyTheme(resolvedTheme());
        syncUI();
      }
    };
    if(mediaDark.addEventListener) mediaDark.addEventListener('change',onSystemChange);
    else if(mediaDark.addListener) mediaDark.addListener(onSystemChange);
  }

  var themeBtn=$('#themeBtn');
  if(themeBtn) themeBtn.addEventListener('click',function(){
    setTheme(root.dataset.theme==='dark'?'light':'dark');
  });

  /* 阅读设置浮层 */
  var toolsBtn=$('#toolsBtn'), toolsPop=$('#toolsPop');
  function setTools(open,returnFocus){
    if(!toolsPop) return;
    toolsPop.hidden=!open;
    if(toolsBtn) toolsBtn.setAttribute('aria-expanded',open?'true':'false');
    if(open){
      var first=toolsPop.querySelector('button');
      if(first) first.focus();
    }else if(returnFocus&&toolsBtn){
      toolsBtn.focus();
    }
  }
  if(toolsBtn) toolsBtn.addEventListener('click',function(e){
    e.stopPropagation();
    setTools(toolsPop.hidden,false);
  });
  var toolsClose=$('#toolsClose');
  if(toolsClose) toolsClose.addEventListener('click',function(){setTools(false,true)});
  if(toolsPop){
    document.addEventListener('click',function(e){
      if(toolsPop.hidden) return;
      if(e.target.closest('#toolsPop')||e.target.closest('#toolsBtn')) return;
      setTools(false,false);
    });
    document.addEventListener('keydown',function(e){
      if(e.key==='Escape'&&!toolsPop.hidden){e.preventDefault();setTools(false,true)}
    });
  }
  $$('.seg').forEach(function(seg){
    seg.addEventListener('click',function(e){
      var b=e.target.closest('button[data-val]');
      if(!b) return;
      var kind=seg.getAttribute('data-pref');
      var val=b.getAttribute('data-val');
      if(kind==='theme') setTheme(val);
      else if(kind==='density') setDensity(val);
      else if(kind==='font') setFont(val);
    });
  });

  /* 文档折叠 */
  function setDoc(d,collapsed){
    if(!d) return;
    d.classList.toggle('collapsed',!!collapsed);
    var h=$('.doc-head',d);
    if(h) h.setAttribute('aria-expanded',collapsed?'false':'true');
    if(!collapsed) setTimeout(function(){measureTOC();setupTables()},30);
  }
  window.D11.setDoc=setDoc;
  window.D11.syncUI=syncUI;

  var docs=$$('.doc');
  docs.forEach(function(d,i){
    var h=$('.doc-head',d), b=$('.doc-body',d);
    if(!h||!b) return;
    if(!b.id) b.id=(d.id||'doc-'+i)+'-body';
    h.setAttribute('role','button');
    h.setAttribute('tabindex','0');
    h.setAttribute('aria-controls',b.id);
    h.setAttribute('aria-expanded',d.classList.contains('collapsed')?'false':'true');
    h.addEventListener('click',function(){setDoc(d,!d.classList.contains('collapsed'));syncUI()});
    h.addEventListener('keydown',function(e){
      if(e.key==='Enter'||e.key===' '){
        e.preventDefault();
        setDoc(d,!d.classList.contains('collapsed'));
        syncUI();
      }
    });
  });
  if(!docs.length){
    ['#expandBtn','#expandBtn2'].forEach(function(sel){var b=$(sel);if(b)b.hidden=true});
  }
  function toggleAll(){
    var open=anyDocOpen();
    docs.forEach(function(d){setDoc(d,open)});
    syncUI();
  }
  ['#expandBtn','#expandBtn2'].forEach(function(sel){
    var b=$(sel);
    if(b) b.addEventListener('click',toggleAll);
  });

  /* 手机抽屉 */
  var sidebar=$('#sidebar'), scrim=$('#scrim'), menuBtn=$('#menuBtn');
  function closeNav(returnFocus){
    if(!sidebar) return;
    sidebar.classList.remove('open');
    if(scrim){scrim.classList.remove('on');scrim.setAttribute('aria-hidden','true')}
    document.body.classList.remove('nav-open');
    if(menuBtn) menuBtn.setAttribute('aria-expanded','false');
    if(returnFocus&&menuBtn&&window.innerWidth<=900) menuBtn.focus();
  }
  function openNav(){
    if(!sidebar) return;
    sidebar.classList.add('open');
    if(scrim){scrim.classList.add('on');scrim.setAttribute('aria-hidden','false')}
    document.body.classList.add('nav-open');
    if(menuBtn) menuBtn.setAttribute('aria-expanded','true');
    setTimeout(function(){var c=$('#sideClose');if(c)c.focus()},160);
  }
  window.D11.closeMenu=function(){closeNav(false)};
  if(menuBtn) menuBtn.addEventListener('click',function(){
    if(!sidebar) return;
    if(sidebar.classList.contains('open')) closeNav(true);
    else openNav();
  });
  if(scrim) scrim.addEventListener('click',function(){closeNav(true)});
  var sideClose=$('#sideClose');
  if(sideClose) sideClose.addEventListener('click',function(){closeNav(true)});
  if(sidebar) sidebar.addEventListener('click',function(e){
    var a=e.target.closest('a');
    if(a&&sidebar.classList.contains('open')) closeNav(false);
  });
  document.addEventListener('keydown',function(e){
    if(e.key==='Escape'&&sidebar&&sidebar.classList.contains('open')){e.preventDefault();closeNav(true)}
  });
  var resizeTimer=null;
  window.addEventListener('resize',function(){
    clearTimeout(resizeTimer);
    resizeTimer=setTimeout(function(){
      if(window.innerWidth>900) closeNav(false);
      measureTOC();
      setupTables();
    },150);
  },{passive:true});

  /* 当前页导航高亮 */
  var current=(location.pathname.split('/').pop()||'index.html');
  $$('.sidebar a.nav-doc').forEach(function(a){
    var href=(a.getAttribute('href')||'').split('#')[0].split('/').pop();
    if(href===current){a.classList.add('active');a.setAttribute('aria-current','page')}
  });

  /* 页内目录 + 阅读时长 + 标题锚点 */
  var tocHeads=[], tocOffsets=[], tocLinks=[];
  function tocLabel(t){
    t=(t||'').replace(/\s+/g,' ').trim();
    return t.length>40?t.slice(0,38)+'…':t;
  }
  function makeTocLinks(){
    var frag=document.createDocumentFragment();
    tocHeads.forEach(function(h){
      var a=document.createElement('a');
      a.href='#'+h.id;
      if(h.tagName==='H3') a.className='lv3';
      a.textContent=tocLabel(h.textContent);
      a.title=(h.textContent||'').trim();
      frag.appendChild(a);
    });
    return frag;
  }
  function measureTOC(){
    tocOffsets=tocHeads.map(function(h){
      return {id:h.id,top:h.getBoundingClientRect().top+(window.scrollY||window.pageYOffset||0)};
    });
  }
  function setTocActive(id){
    tocLinks.forEach(function(a){
      var on=a.getAttribute('href')==='#'+id;
      a.classList.toggle('active',on);
      if(on) a.setAttribute('aria-current','location');
      else a.removeAttribute('aria-current');
    });
  }
  function updateTOC(){
    if(!tocOffsets.length) return;
    var y=(window.scrollY||window.pageYOffset||0)+112;
    var currentId=tocOffsets[0].id;
    for(var i=0;i<tocOffsets.length;i++){
      if(tocOffsets[i].top<=y) currentId=tocOffsets[i].id;
      else break;
    }
    setTocActive(currentId);
  }
  function buildTOC(){
    var body=$('.doc-body.prose');
    if(!body) return;
    var all=$$('h2,h3',body).filter(function(h){return (h.textContent||'').trim().length>0});
    if(all.length<3) return;
    var h2s=all.filter(function(h){return h.tagName==='H2'});
    tocHeads=all.length>22?h2s:all;
    if(tocHeads.length<2) tocHeads=h2s;
    if(tocHeads.length<2) return;
    tocHeads.forEach(function(h,i){
      if(!h.id) h.id=(body.parentNode.id||'sec')+'-h-'+i;
    });

    var layout=$('.layout');
    if(layout){
      var rail=document.createElement('aside');
      rail.className='toc-rail';
      rail.id='tocRail';
      rail.setAttribute('aria-label','本页目录');
      var title=document.createElement('p');
      title.className='toc-title';
      title.textContent='本页目录';
      var nav=document.createElement('nav');
      nav.className='toc-list';
      nav.appendChild(makeTocLinks());
      rail.appendChild(title);
      rail.appendChild(nav);
      var footer=layout.querySelector('.site-foot');
      if(footer) layout.insertBefore(rail,footer);
      else layout.appendChild(rail);
      layout.classList.add('has-toc');
    }
    var side=$('#sideToc'), sideList=$('#sideTocList');
    if(side&&sideList){
      sideList.appendChild(makeTocLinks());
      side.hidden=false;
    }
    tocLinks=$$('.toc-list a, .side-toc a');
    measureTOC();
    updateTOC();

    /* 标题旁的小锚点，方便复制深链接 */
    tocHeads.forEach(function(h){
      if($('.hlink',h)) return;
      var a=document.createElement('a');
      a.className='hlink';
      a.href='#'+h.id;
      a.textContent='#';
      a.title='链接到本节';
      a.setAttribute('aria-label','链接到本节');
      h.appendChild(a);
    });

    /* 阅读时长 */
    var head=$('.doc-head');
    if(head&&!$('.rt-badge',head)){
      var text=(body.textContent||'').replace(/\s+/g,'');
      var mins=Math.max(1,Math.round(text.length/420));
      var rt=document.createElement('span');
      rt.className='rt-badge';
      rt.textContent='约 '+mins+' 分钟';
      rt.title='按每分钟约 420 字估算';
      var chev=$('.chev',head);
      if(chev) head.insertBefore(rt,chev);
      else head.appendChild(rt);
    }
  }

  /* 宽表格：给出横向滑动提示，并让键盘可以聚焦滚动容器 */
  function setupTables(){
    $$('.tw-hint').forEach(function(h){h.remove()});
    var first=null;
    $$('.tw').forEach(function(tw){
      var scrollable=tw.scrollWidth>tw.clientWidth+2;
      tw.classList.toggle('scrollable',scrollable);
      if(scrollable){
        tw.setAttribute('tabindex','0');
        tw.setAttribute('role','region');
        tw.setAttribute('aria-label','宽表格，可左右滚动查看');
        if(!first) first=tw;
      }else{
        tw.removeAttribute('tabindex');
        tw.removeAttribute('role');
        tw.removeAttribute('aria-label');
      }
    });
    if(first){
      var hint=document.createElement('p');
      hint.className='tw-hint';
      hint.textContent='表格较宽，可左右滑动查看完整内容';
      first.parentNode.insertBefore(hint,first);
    }
  }
  buildTOC();
  setupTables();

  /* 滚动：进度、回到顶部、目录高亮 */
  var topbar=$('.topbar'), toTop=$('#toTop');
  var ticking=false;
  function onScroll(){
    var y=window.scrollY||window.pageYOffset||0;
    var h=document.documentElement.scrollHeight-window.innerHeight;
    var p=h>0?Math.min(1,Math.max(0,y/h)):0;
    root.style.setProperty('--p',p.toFixed(4));
    if(toTop) toTop.classList.toggle('on',y>620);
    if(topbar) topbar.classList.toggle('scrolled',y>6);
    updateTOC();
    ticking=false;
  }
  function requestScroll(){
    if(!ticking){ticking=true;requestAnimationFrame(onScroll)}
  }
  window.addEventListener('scroll',requestScroll,{passive:true});
  window.addEventListener('load',function(){measureTOC();setupTables();requestScroll()});
  requestScroll();

  if(toTop) toTop.addEventListener('click',function(){
    var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion:reduce)').matches;
    window.scrollTo({top:0,left:0,behavior:reduce?'auto':'smooth'});
  });

  /* 锚点跳转时确保文档展开 */
  function expandForHash(){
    if(!location.hash) return;
    var id;
    try{id=decodeURIComponent(location.hash.slice(1))}catch(e){id=location.hash.slice(1)}
    var el=document.getElementById(id);
    if(!el||!el.closest) return;
    var d=el.closest('.doc');
    if(d&&d.classList.contains('collapsed')){setDoc(d,false);syncUI()}
  }
  expandForHash();
  window.addEventListener('hashchange',expandForHash);

  /* 打印：临时展开，打印后恢复 */
  var printState=[];
  window.addEventListener('beforeprint',function(){
    printState=docs.map(function(d){return d.classList.contains('collapsed')});
    docs.forEach(function(d){setDoc(d,false)});
    syncUI();
  });
  window.addEventListener('afterprint',function(){
    docs.forEach(function(d,i){setDoc(d,!!printState[i])});
    syncUI();
  });
})();
