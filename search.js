/* 共享全文检索：索引懒加载 / 键盘导航 / 最近搜索 / 跨页命中高亮 */
(function(){
  'use strict';

  var D=window.D11;
  if(!D||!D.$) return;
  var $=D.$, $$=D.$$;

  var q=$('#q'), res=$('#results'), cnt=$('#searchcount'), box=$('#searchbox'), clr=$('#searchClear');
  if(!q||!res) return;

  var VER=window.D11_VER||'12';
  var IDX=[];
  var loading=false, pending=[];
  var timer=null, active=-1, hits=[], terms=[];
  var marks=[];

  var RECENT_KEY='d11_recent';
  var JUMP_KEY='d11_jump_terms';
  var SUGGEST=['国补','价保','黑五','AliExpress','智能眼镜','以旧换新'];
  var PAGE_NAMES={
    p00:'一页速查',p10:'总纲 · 已核验事实',p20:'大陆详版',p21:'汽车 · 线下 · 防坑',
    p30:'跨境速读',p31:'跨境详版',p40:'区域速读',p41:'区域详版'
  };
  var SKIP_TAGS=/^(SCRIPT|STYLE|CODE|PRE|MARK|KBD)$/;

  function esc(s){
    return String(s===undefined||s===null?'':s).replace(/[&<>"]/g,function(c){
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];
    });
  }
  function escRe(s){return String(s).replace(/[.*+?^${}()|[\]\\]/g,'\\$&')}

  function indexUrl(){
    var prefix=location.pathname.indexOf('/pages/')>=0?'../':'';
    return prefix+'search-index.js?v='+VER;
  }
  function ensureIndex(cb){
    if(IDX.length){cb(true);return}
    if(window.D11_IDX&&window.D11_IDX.length){IDX=window.D11_IDX;cb(true);return}
    pending.push(cb);
    if(loading) return;
    loading=true;
    function flush(ok){
      loading=false;
      var ps=pending;pending=[];
      for(var i=0;i<ps.length;i++){try{ps[i](ok)}catch(e){}}
    }
    var sc=document.createElement('script');
    sc.src=indexUrl();
    sc.async=true;
    sc.onload=function(){IDX=window.D11_IDX||[];flush(IDX.length>0)};
    sc.onerror=function(){flush(false)};
    document.head.appendChild(sc);
  }

  function closePanel(){
    res.classList.remove('on');
    q.setAttribute('aria-expanded','false');
    q.removeAttribute('aria-activedescendant');
    active=-1;
  }
  function openPanel(){
    res.classList.add('on');
    q.setAttribute('aria-expanded','true');
  }
  function clearMarks(){
    marks.forEach(function(m){
      var p=m.parentNode;
      if(p){p.replaceChild(document.createTextNode(m.textContent),m);p.normalize()}
    });
    marks=[];
  }
  function flash(el){
    if(!el) return;
    el.classList.add('flash');
    setTimeout(function(){el.classList.remove('flash')},1600);
  }

  function hi(text,ts){
    var out=esc(text);
    ts.forEach(function(t){
      if(!t) return;
      try{out=out.replace(new RegExp('('+escRe(t)+')','ig'),'<b>$1</b>')}catch(e){}
    });
    return out;
  }
  function snippet(text,ts){
    text=String(text||'').replace(/\s+/g,' ').trim();
    if(text.length<=190) return text;
    var lower=text.toLowerCase(), pos=-1;
    for(var i=0;i<ts.length;i++){
      var p=lower.indexOf(ts[i]);
      if(p>=0&&(pos<0||p<pos)) pos=p;
    }
    if(pos<0) pos=0;
    var start=Math.max(0,pos-45);
    var end=Math.min(text.length,start+190);
    return (start>0?'…':'')+text.slice(start,end)+(end<text.length?'…':'');
  }
  function pageName(it){
    var f=(it.p||'').split('/').pop().replace('.html','');
    return PAGE_NAMES[f]||it.t||'文档';
  }
  function score(it,ts,raw){
    var x=(it.x||'').toLowerCase(), t=(it.t||'').toLowerCase(), s=0;
    for(var i=0;i<ts.length;i++){
      var term=ts[i];
      var inTitle=t.indexOf(term)>=0;
      var inText=x.indexOf(term)>=0;
      if(!inTitle&&!inText) return -1;
      if(inTitle) s+=40;
      if(inText) s+=10;
    }
    if(raw&&x.indexOf(raw)>=0) s+=15;
    if(it.a) s+=1;
    return s;
  }

  function saveRecent(t){
    if(!t) return;
    var list=[];
    try{list=JSON.parse(D.load(RECENT_KEY,'[]'))||[]}catch(e){}
    if(!Array.isArray(list)) list=[];
    list=list.filter(function(x){return x!==t});
    list.unshift(t);
    list=list.slice(0,6);
    D.store(RECENT_KEY,JSON.stringify(list));
  }
  function readRecent(){
    try{
      var list=JSON.parse(D.load(RECENT_KEY,'[]'));
      return Array.isArray(list)?list:[];
    }catch(e){return []}
  }

  function setActive(i){
    if(i===active) return;
    var items=$$('.res-i',res);
    items.forEach(function(el,j){
      var on=j===i;
      el.classList.toggle('active',on);
      el.setAttribute('aria-selected',on?'true':'false');
    });
    active=i;
    if(items[i]){
      q.setAttribute('aria-activedescendant',items[i].id);
      items[i].scrollIntoView({block:'nearest'});
    }
  }

  function renderDefault(){
    var recent=readRecent();
    var out='';
    if(recent.length){
      out+='<div class="res-h"><span>最近搜索</span><button class="res-clear" type="button" data-act="clear-recent">清除</button></div>';
      out+='<div class="res-sug">'+recent.map(function(t){
        return '<button type="button" data-q="'+esc(t)+'">'+esc(t)+'</button>';
      }).join('')+'</div>';
    }
    out+='<div class="res-sec">'+(recent.length?'试试这些':'输入关键词，检索 8 份文档')+'</div>';
    out+='<div class="res-sug">'+SUGGEST.map(function(t){
      return '<button type="button" data-q="'+esc(t)+'">'+esc(t)+'</button>';
    }).join('')+'</div>';
    if(IDX.length){
      out+='<div class="res-empty" style="padding-top:0">索引已就绪 · 共 '+IDX.length+' 条可检索片段</div>';
    }
    res.innerHTML=out;
    active=-1;
    openPanel();
    cnt.textContent='';
  }

  function showLoading(){
    cnt.textContent='加载索引…';
    res.innerHTML='<div class="res-h"><span>正在加载检索索引</span></div>'
      +'<div class="res-empty">首次检索需加载约 210 KB 索引，仅加载一次；之后搜索将即时完成。</div>';
    openPanel();
  }
  function showError(){
    cnt.textContent='索引加载失败';
    res.innerHTML='<div class="res-h"><span>检索索引加载失败</span></div>'
      +'<div class="res-empty">请检查网络后刷新页面重试。</div>';
    openPanel();
  }

  function run(){
    var v=q.value.trim();
    if(!v){renderDefault();return}
    var ts=v.toLowerCase().split(/\s+/).filter(Boolean);
    var raw=v.toLowerCase();
    terms=ts;
    var scored=[];
    for(var i=0;i<IDX.length;i++){
      var s=score(IDX[i],ts,raw);
      if(s>=0) scored.push({it:IDX[i],s:s,i:i});
    }
    scored.sort(function(a,b){return b.s-a.s||a.i-b.i});
    var total=scored.length;
    hits=scored.slice(0,40).map(function(x){return x.it});

    if(!hits.length){
      cnt.textContent='无结果';
      res.innerHTML='<div class="res-h"><span>没有匹配内容</span></div>'
        +'<div class="res-empty">试试更短的关键词，例如「国补」「价保」「黑五」「AliExpress」。</div>';
      active=-1;
      openPanel();
      return;
    }

    cnt.textContent=total+' 条命中';
    var hitLabel=total>hits.length?total+' 条命中 · 显示前 '+hits.length+' 条':total+' 条命中';
    var out='<div class="res-h"><span>'+hitLabel+'</span>'
      +'<span class="res-kbd">↑↓ 选择 · ↵ 跳转</span></div>';
    hits.forEach(function(it,i){
      var pn=pageName(it);
      var chip=pn&&pn!==(it.t||'').trim()?'<span class="rp">'+esc(pn)+'</span>':'';
      out+='<div class="res-i" role="option" id="sres-'+i+'" data-i="'+i+'" aria-selected="false">'
        +'<span class="rt">'+chip+esc(it.t||'')+'</span>'
        +'<span class="rq">'+hi(snippet(it.x,ts),ts)+'</span></div>';
    });
    res.innerHTML=out;
    active=-1;
    openPanel();
  }

  function render(){
    var v=q.value.trim();
    if(clr) clr.hidden=!v;
    if(!v){clearMarks();renderDefault();return}
    if(!IDX.length){
      showLoading();
      ensureIndex(function(ok){
        if(!q.value.trim()){renderDefault();return}
        if(ok) run(); else showError();
      });
      return;
    }
    run();
  }

  function resolvePage(p){
    if(!p) return '';
    var inPages=location.pathname.indexOf('/pages/')>=0;
    if(inPages){
      if(p.indexOf('../')===0) return p;
      return '../'+p.replace(/^\/+/,'');
    }
    return p.replace(/^\.\//,'');
  }

  function go(i){
    var it=hits[i];
    if(!it) return;
    var raw=q.value.trim();
    saveRecent(raw);
    var anchor=it.a||'';
    var target=resolvePage(it.p||'');
    var currentFile=location.pathname.split('/').pop()||'index.html';
    var targetFile=target.split('#')[0].split('/').pop();

    if(target&&targetFile!==currentFile){
      try{D.store(JUMP_KEY,JSON.stringify(terms))}catch(e){}
      closePanel();
      location.href=target+(anchor?'#'+anchor:'');
      return;
    }

    var doc=document.querySelector('.doc');
    if(anchor){
      var el=document.getElementById(anchor);
      if(el){
        if(doc&&D.setDoc){D.setDoc(doc,false);if(D.syncUI)D.syncUI()}
        clearMarks();
        highlightIn(doc||document.body,terms);
        el.scrollIntoView({behavior:'smooth',block:'start'});
        flash(doc||el);
      }
    }else if(doc){
      if(D.setDoc){D.setDoc(doc,false);if(D.syncUI)D.syncUI()}
      clearMarks();
      highlightIn(doc,terms);
      doc.scrollIntoView({behavior:'smooth',block:'start'});
      flash(doc);
    }
    closePanel();
    q.blur();
  }

  function highlightIn(rootEl,ts){
    if(!rootEl||!ts||!ts.length) return 0;
    clearMarks();
    var walker=document.createTreeWalker(rootEl,NodeFilter.SHOW_TEXT,null,false);
    var nodes=[], n;
    while((n=walker.nextNode())){
      var p=n.parentNode;
      if(!p||SKIP_TAGS.test(p.nodeName)) continue;
      if(p.closest&&p.closest('.srcurl,.hlink,.badge,.doc-head,.res-i,.sidebar,.toc-rail')) continue;
      if((n.nodeValue||'').trim()) nodes.push(n);
    }
    if(!nodes.length) return 0;
    var re;
    try{re=new RegExp('('+ts.map(escRe).join('|')+')','ig')}catch(e){return 0}
    nodes.forEach(function(node){
      if(marks.length>=400) return;
      var v=node.nodeValue;
      if(!v) return;
      re.lastIndex=0;
      if(!re.test(v)) return;
      re.lastIndex=0;
      var frag=document.createDocumentFragment(), last=0, m;
      while((m=re.exec(v))!==null){
        if(m.index>last) frag.appendChild(document.createTextNode(v.slice(last,m.index)));
        var mk=document.createElement('mark');
        mk.textContent=m[0];
        frag.appendChild(mk);
        marks.push(mk);
        last=m.index+m[0].length;
      }
      if(last<v.length) frag.appendChild(document.createTextNode(v.slice(last)));
      node.parentNode.replaceChild(frag,node);
    });
    return marks.length;
  }

  /* 事件绑定 */
  res.addEventListener('click',function(e){
    var sug=e.target.closest('button[data-q]');
    if(sug){
      q.value=sug.getAttribute('data-q');
      render();
      q.focus();
      return;
    }
    var clrRecent=e.target.closest('button[data-act="clear-recent"]');
    if(clrRecent){
      D.store(RECENT_KEY,'[]');
      renderDefault();
      return;
    }
    var item=e.target.closest('.res-i');
    if(item) go(+item.getAttribute('data-i'));
  });
  res.addEventListener('mouseover',function(e){
    var item=e.target.closest('.res-i');
    if(item) setActive(+item.getAttribute('data-i'));
  });

  q.addEventListener('focus',function(){
    if(!IDX.length) ensureIndex(function(ok){
      if(!q.value.trim()&&res.classList.contains('on')) renderDefault();
    });
    if(!q.value.trim()) renderDefault();
    else render();
  });
  q.addEventListener('input',function(){
    if(clr) clr.hidden=!q.value.trim();
    clearTimeout(timer);
    timer=setTimeout(render,110);
  });
  q.addEventListener('keydown',function(e){
    if(e.key==='ArrowDown'||e.key==='ArrowUp'){
      if(!res.classList.contains('on')) render();
      e.preventDefault();
      var items=$$('.res-i',res);
      if(!items.length) return;
      var next=e.key==='ArrowDown'?(active+1)%items.length:(active-1+items.length)%items.length;
      setActive(next);
      return;
    }
    if(e.key==='Enter'){
      if(res.classList.contains('on')){
        var list=$$('.res-i',res);
        if(list.length){e.preventDefault();go(active>=0?active:0)}
      }
      return;
    }
    if(e.key==='Escape'){
      if(res.classList.contains('on')){e.preventDefault();closePanel();q.blur()}
      else if(q.value){q.value='';render()}
    }
  });
  if(clr) clr.addEventListener('click',function(){
    q.value='';
    if(clr) clr.hidden=true;
    clearMarks();
    renderDefault();
    q.focus();
  });
  document.addEventListener('click',function(e){
    if(!e.target.closest('.searchbox')) closePanel();
  });
  document.addEventListener('keydown',function(e){
    var tag=(document.activeElement&&document.activeElement.tagName)||'';
    var typing=/^(INPUT|TEXTAREA|SELECT)$/.test(tag);
    if(e.key==='/'&&!typing&&!e.metaKey&&!e.ctrlKey&&!e.altKey){
      e.preventDefault();
      q.focus();
      q.select();
    }
    if((e.metaKey||e.ctrlKey)&&(e.key==='k'||e.key==='K')){
      e.preventDefault();
      q.focus();
      q.select();
    }
  });

  /* 站内锚点：展开被折叠的文档 */
  document.addEventListener('click',function(e){
    var a=e.target.closest('a.internal, a[href^="#doc-"], a[href^="#p"]');
    if(!a) return;
    var d=document.getElementById(a.getAttribute('href').slice(1));
    if(d&&d.classList&&d.classList.contains('doc')) d.classList.remove('collapsed');
  });

  /* 跨页跳转后：恢复高亮与定位 */
  (function restoreJump(){
    var saved=[];
    try{saved=JSON.parse(D.load(JUMP_KEY,'[]'))||[]}catch(e){}
    D.store(JUMP_KEY,'[]');
    if(!Array.isArray(saved)) saved=[];

    var aid='';
    if(location.hash){
      try{aid=decodeURIComponent(location.hash.slice(1))}catch(e){aid=location.hash.slice(1)}
    }
    if(aid){
      var target=document.getElementById(aid);
      if(target&&target.closest){
        var doc=target.closest('.doc');
        if(doc&&D.setDoc){D.setDoc(doc,false);if(D.syncUI)D.syncUI()}
      }
    }
    if(!saved.length){
      if(aid){
        setTimeout(function(){
          var t=document.getElementById(aid);
          if(t) t.scrollIntoView({block:'start'});
        },80);
      }
      return;
    }
    var doc=document.querySelector('.doc');
    var apply=function(){
      var scope=document.getElementById(aid);
      if(scope&&scope.closest) scope=scope.closest('.doc');
      scope=scope||doc||document.body;
      highlightIn(scope,saved);
      if(aid){
        var t=document.getElementById(aid);
        if(t) t.scrollIntoView({block:'start'});
      }else if(doc){
        doc.scrollIntoView({block:'start'});
      }
      flash(scope);
    };
    setTimeout(apply,160);
    window.addEventListener('load',function(){setTimeout(apply,120)});
  })();
})();
