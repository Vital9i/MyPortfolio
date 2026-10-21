/* Optional visual QA only. Do not load any reference on a normal visit. */
(() => {
 if(new URLSearchParams(location.search).get('cases-review')!=='1')return;
 const section=document.getElementById('cases');if(!section)return;
 section.style.position='relative';
 const ref=document.createElement('img');ref.alt='';ref.setAttribute('aria-hidden','true');
 ref.src=innerWidth<=600?'reference/cases-mobile.jpg':'reference/cases-desktop.jpg';
 Object.assign(ref.style,{position:'absolute',left:'0',top:'0',width:'100%',height:'auto',maxWidth:'none',opacity:'.5',pointerEvents:'none',zIndex:'1000'});
 section.append(ref);
 const panel=document.createElement('aside');
 panel.setAttribute('aria-label','Сравнение с референсом');
 panel.innerHTML='<label>Референс: <input aria-label="Прозрачность референса" type="range" min="0" max="100" value="50"></label><button type="button">Скрыть</button><small>Десктоп: viewport 1363 px · мобилка: 390 px</small>';
 Object.assign(panel.style,{position:'fixed',bottom:'12px',left:'12px',right:'12px',zIndex:'1001',display:'flex',alignItems:'center',flexWrap:'wrap',gap:'12px',padding:'12px',background:'#1e1e1b',color:'#fff',font:'12px Arial',border:'1px solid #d5eb00',borderRadius:'8px'});
 const range=panel.querySelector('input'),button=panel.querySelector('button');
 range.addEventListener('input',()=>{ref.style.opacity=String(Number(range.value)/100)});
 button.addEventListener('click',()=>{const hide=ref.style.display!=='none';ref.style.display=hide?'none':'block';button.textContent=hide?'Показать':'Скрыть';});
 document.body.append(panel);
})();
