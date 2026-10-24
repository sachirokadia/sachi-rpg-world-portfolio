(function(){
"use strict";
var WORLD_W=2600, WORLD_H=1700;
var viewport=document.getElementById('viewport');
var world=document.getElementById('world');
var panel=document.getElementById('panel');
var panelContent=document.getElementById('panel-content');
var backdrop=document.getElementById('panel-backdrop');

/* ---------- Panel content (resume only) ---------- */
function ticket(o){return '<article class="ticket"><h3>'+o.t+'</h3>'+(o.sub?'<div class="sub">'+o.sub+'</div>':'')+(o.chips?'<div class="chips">'+o.chips.map(function(c){return '<span class="chip'+(c.w?' warm':'')+'">'+c.t+'</span>'}).join('')+'</div>':'')+(o.body?'<p>'+o.body+'</p>':'')+(o.bullets?'<ul>'+o.bullets.map(function(b){return '<li>'+b+'</li>'}).join('')+'</ul>':'')+(o.cta?'<a class="cta" href="'+o.cta.href+'" target="_blank" rel="noopener">'+o.cta.label+'</a>':'')+'</article>'}
function head(emoji,title,tagline){return '<div class="panel-head"><div class="paws">🐾 🐾 🐾</div><div style="font-size:42px">'+emoji+'</div><h2>'+title+'</h2><div class="tagline">'+tagline+'</div><div class="swirl">~ ❧ ~ ❧ ~</div></div>'}

var PANELS={
about:{html:function(){return head('⛲','Sachi Chirag Rokadia','Fountain Plaza · About')+
 '<p class="panel-intro">B.Tech CSE student at ITM (SLS) Baroda University (2024–2028), based in Vadodara, Gujarat, India — building AI-powered web apps. Open to internships in full-stack, web and AI.</p>'+
 '<div class="tickets single">'+
 ticket({t:'🎓 Education',sub:'ITM (SLS) Baroda University',body:'B.Tech in Computer Science &amp; Engineering · 2024 – 2028 · Vadodara, Gujarat, India.'})+
 ticket({t:'✨ What I Build',body:'AI-powered web applications — a real-time sign-language translator that runs fully on-device, a full-stack AI study platform, a civic intelligence platform, a society management system, and a gamified finance tracker. Explore each building on the map!'} )+
 '</div>'+tourGuide('about')+'<div class="panel-cta-row"><a class="cta" href="resume.pdf" download>⬇ Download Resume</a><button class="cta secondary" data-open="overview">🗺️ View All Zones</button></div>'}},

signspeak:{html:function(){return head('🤟','SignSpeak AI','Real-Time Sign Language Translation')+
 '<div class="tickets single">'+ticket({t:'SignSpeak AI',sub:'Real-time sign-language translation PWA',
  chips:[{t:'MediaPipe'},{t:'ONNX Runtime'},{t:'JavaScript'},{t:'PWA',w:true},{t:'IndexedDB',w:true}],
  bullets:[
   'Converts webcam hand gestures into text and speech — all inference on-device in the browser; no video leaves the user\u2019s machine.',
   'Three-stage pipeline: MediaPipe hand tracking (21 landmarks), custom-trained ONNX neural network (88.8% held-out accuracy on 1,004 labeled images), and a geometric rule-based fallback with 8-frame stability voting.',
   '47 automated tests.',
   'Gesture Studio — train custom gestures from webcam samples, with models persisted in-browser via IndexedDB.',
   'Live performance HUD, two-way conversation mode, and a guided Learn mode.'],
  cta:{href:'https://github.com/sachirokadia/signspeak-ai',label:'⌥ View on GitHub'}})+'</div>'+tourGuide('signspeak')+tourActions('signspeak')}},

studygen:{html:function(){return head('📚','StudyGen AI','AI Study Companion')+
 '<div class="tickets single">'+ticket({t:'StudyGen AI',sub:'Full-stack AI study platform · also a signed Android APK via Capacitor',
  chips:[{t:'React'},{t:'TypeScript'},{t:'Tailwind CSS'},{t:'Express'},{t:'Neon Postgres'},{t:'Drizzle ORM'},{t:'Groq LLM API'},{t:'Vercel',w:true}],
  bullets:[
   'Groq LLM API generates study packs — summaries, flashcards, quizzes and AI study paths — from PDFs, YouTube links, pasted text, or topics; with retry/backoff and JSON-mode structured output.',
   'SM-2 spaced-repetition flashcards and timed quizzes with explanations.',
   'Three-level Ask-AI explainer, focus timer, JWT auth, and a personal deck library.',
   'Bilingual English / Hindi UI. Deployed on Vercel with an Express serverless backend.'],
  cta:{href:'https://github.com/sachirokadia/studygen-ai',label:'⌥ View on GitHub'}})+'</div>'+tourGuide('studygen')+tourActions('studygen')}},

janmind:{html:function(){return head('🏛️','JanMind','Civic Intelligence Platform')+
 '<div class="tickets single">'+ticket({t:'JanMind',sub:'Smart India Hackathon \u201926 · College round cleared',
  chips:[{t:'React'},{t:'TypeScript'},{t:'Glassmorphism UI',w:true}],
  bullets:[
   'Civic intelligence platform for citizen complaints, with AI-powered analysis of government administration.',
   'Glassmorphism UI in an Indian civic visual language.',
   'Cleared the college-level round of Smart India Hackathon \u201926 with the team.'],
  cta:{href:'https://github.com/Maher-Bhatt/Civic-Sathi',label:'⌥ View on GitHub'}})+'</div>'+tourGuide('janmind')+tourActions('janmind')}},

sociotrack:{html:function(){return head('🏘️','SocioTrack','Residential Society Management System')+
 '<div class="tickets single">'+ticket({t:'SocioTrack',sub:'Built by a two-person team',
  chips:[{t:'React'},{t:'TypeScript'},{t:'Node.js'},{t:'Express.js'},{t:'MongoDB'},{t:'JWT + bcrypt',w:true}],
  bullets:[
   'Society management — complaints, technician assignment, notices and alerts — replacing WhatsApp coordination.',
   'JWT auth with bcrypt and role-based access for residents, administrators and technicians.']})+'</div>'+tourGuide('sociotrack')+tourActions('sociotrack')}},

fingame:{html:function(){return head('🎮','FinGame','Gamified Personal Finance Tracker')+
 '<div class="tickets single">'+ticket({t:'FinGame',sub:'RPG-style finance tracker',
  chips:[{t:'React'},{t:'TypeScript'},{t:'Vite'},{t:'Tailwind CSS'},{t:'Node.js'},{t:'Express'},{t:'Prisma'},{t:'SQLite'}],
  bullets:[
   'Turns saving into quests, XP, levels, badges and leaderboards.',
   'JWT auth, expense tracking with category budgets, a quest engine with level maps and friend rankings, and a badge hall of fame.',
   'Recharts spending visualizations.'],
  cta:{href:'https://github.com/sachirokadia/FinGame',label:'⌥ View on GitHub'}})+'</div>'+tourGuide('fingame')+tourActions('fingame')}},

skills:{html:function(){return head('🛠️','Skills','Skills Workshop')+
 '<div class="tickets">'+
 ticket({t:'💻 Languages',bullets:['TypeScript','JavaScript','PHP','Java']})+
 ticket({t:'🎨 Frontend',bullets:['React','Next.js','Vite','Tailwind CSS']})+
 ticket({t:'⚙️ Backend',bullets:['Node.js','Express.js','Laravel','JWT Authentication']})+
 ticket({t:'🗄️ Databases & ORMs',bullets:['MongoDB','MySQL','PostgreSQL (Neon)','SQLite','Prisma','Mongoose','Drizzle ORM']})+
 ticket({t:'🤖 AI / ML',bullets:['MediaPipe Tasks Vision','ONNX Runtime','OpenAI API','Claude API']})+
 ticket({t:'🧰 Tools',bullets:['Git','GitHub','Vercel','PHPUnit','AI-assisted development (Kiro, Lovable)']})+
 '</div>'+tourGuide('skills')+tourActions('skills')}},

achievements:{html:function(){return head('🏆','Achievements','Trophy Well')+
 '<div class="tickets single">'+
 ticket({t:'🇮🇳 Smart India Hackathon \u201925',sub:'Ministry of Education, Govt. of India',body:'Selected for the national 36-hour sprint — built on a real government / industry problem statement.'})+
 ticket({t:'🚀 Smart India Hackathon \u201926',body:'Cleared the college-level round with JanMind.'})+
 ticket({t:'🏁 VCET Hackathon \u201925 — “Race to the Future”',body:'Working prototype for future-urban challenges, built in a 24-hour hackathon.'})+
 ticket({t:'📜 Certifications',bullets:['Database Foundations — Oracle Academy, 2024','Java Fundamentals — Oracle Academy']})+
 '</div>'+tourGuide('achievements')+tourActions('achievements')}},

contact:{html:function(){return head('🍊','Contact','Contact Tree')+
 '<p class="panel-intro">Open to internships (full-stack / web / AI). The fastest way to reach me is email.</p>'+
 '<div class="contact-list">'+
 '<div class="contact-row"><small>Email</small><a href="mailto:sachi.rokadia23@gmail.com">sachi.rokadia23@gmail.com</a></div>'+
 '<div class="contact-row"><small>LinkedIn</small><a href="https://www.linkedin.com/in/sachi-rokadia-9348b8320" target="_blank" rel="noopener">linkedin.com/in/sachi-rokadia-9348b8320</a></div>'+
 '<div class="contact-row"><small>GitHub</small><a href="https://github.com/sachirokadia" target="_blank" rel="noopener">github.com/sachirokadia</a></div>'+
 '<div class="contact-row"><small>Location</small>Vadodara, Gujarat, India</div>'+
 '</div><a class="cta" href="resume.pdf" download>⬇ Download Resume</a>'+tourGuide('contact')+tourActions('contact')}},

overview:{html:function(){
 var zones=[['about','⛲ About','Fountain Plaza · who I am'],['signspeak','🤟 SignSpeak AI','Real-time sign language translation'],['studygen','📚 StudyGen AI','AI study companion'],['janmind','🏛️ JanMind','Civic intelligence platform'],['sociotrack','🏘️ SocioTrack','Society management system'],['fingame','🎮 FinGame','Gamified finance tracker'],['skills','🛠️ Skills','Languages, stack & tools'],['achievements','🏆 Achievements','Hackathons & certifications'],['contact','🍊 Contact','Email, LinkedIn & GitHub']];
 return head('🗺️','Portfolio','Every zone in Sachi\u2019s World')+
 '<p class="panel-intro">Jump straight to a building — the camera will fly there and open its panel.</p><div class="jump-grid">'+
 zones.map(function(z){return '<button class="jump-btn" data-jump="'+z[0]+'">'+z[1]+'<span>'+z[2]+'</span></button>'}).join('')+
 '</div>'+tourGuide('overview')+tourActions('overview')+'<a class="cta" href="resume.pdf" download>⬇ Download Resume</a>'}}
};


/* ---------- Sequential tour: cute guide + Next stop ---------- */
var TOUR_ORDER=['about','signspeak','studygen','janmind','sociotrack','fingame','skills','achievements','contact'];
var TOUR_META={
 about:{e:'⛲',n:'About',s:'Fountain Plaza · who I am'},
 signspeak:{e:'🤟',n:'SignSpeak AI',s:'Real-time sign language translation'},
 studygen:{e:'📚',n:'StudyGen AI',s:'AI study companion'},
 janmind:{e:'🏛️',n:'JanMind',s:'Civic intelligence platform'},
 sociotrack:{e:'🏘️',n:'SocioTrack',s:'Society management system'},
 fingame:{e:'🎮',n:'FinGame',s:'Gamified finance tracker'},
 skills:{e:'🛠️',n:'Skills',s:'Languages, stack & tools'},
 achievements:{e:'🏆',n:'Achievements',s:'Hackathons & certifications'},
 contact:{e:'🍊',n:'Contact',s:'Email, LinkedIn & GitHub'}};
function tourNext(id){var i=TOUR_ORDER.indexOf(id);return TOUR_ORDER[(i+1)%TOUR_ORDER.length]}
function tourGuide(id){
  var n=tourNext(id),m=TOUR_META[n];
  var eyebrow=id==='overview'?'🐾 Your guide has a route planned!':id==='contact'?'🐾 Last stop — then the tour loops back!':'🐾 Next stop on the tour · stop '+(TOUR_ORDER.indexOf(n)+1)+' of 9';
  var label=id==='overview'?'Start the tour →':id==='contact'?'Next: About ↻':'Next: '+m.n+' →';
  return '<div class="tour-bar"><img class="tour-guide" src="assets/avatar.webp" alt="" draggable="false"><div class="tour-bubble"><span class="tour-eyebrow">'+eyebrow+'</span><span><strong>'+m.e+' '+m.n+'</strong> — '+m.s+'</span></div><button class="cta" data-next="'+n+'">'+label+'</button></div>';
}
function tourActions(id){
  if(id==='overview')return '';
  return '<div class="tour-actions"><button class="cta secondary" data-open="overview">🗺️ View All Zones</button></div>';
}

/* ---------- Walking avatar ---------- */
var avatarEl=document.getElementById('avatar');
var AVATAR_POS={about:[1560,680],janmind:[1000,780],achievements:[2390,745],studygen:[640,1180],signspeak:[1640,1160],sociotrack:[2330,1090],fingame:[650,1590],skills:[2180,1560],contact:[2280,1490],overview:[1620,1580]};
var avatarCur={x:parseInt(avatarEl.style.left)||1560,y:parseInt(avatarEl.style.top)||700};
var reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var walkRaf=null, walkTarget=null, lastPuffT=0, lastSparkT=0;
function spawnFx(cls,x,y){
  var s=document.createElement('div'); s.className=cls;
  s.style.left=x+'px'; s.style.top=y+'px'; world.appendChild(s);
  setTimeout(function(){if(s.parentNode)s.parentNode.removeChild(s)},850);
}
function spawnPuff(x,y){spawnFx('walk-puff',x+(Math.random()*26-13),y-4+(Math.random()*6-3))}
function spawnSparkle(x,y,spread){spawnFx('walk-sparkle',x+(Math.random()*2-1)*spread,y-30+(Math.random()*2-1)*spread)}
function burst(x,y){
  for(var i=0;i<9;i++){
    (function(dx,dy,delay){setTimeout(function(){spawnFx('walk-sparkle',x+dx,y+dy)},delay)})(Math.cos(i/9*2*Math.PI)*48,Math.sin(i/9*2*Math.PI)*48-24,i*45);
  }
}
function arrivalHop(x,y){
  if(reducedMotion)return;
  var t0=performance.now(), dur=520;
  function step(t){
    var p=Math.min(1,(t-t0)/dur);
    var hop=Math.abs(Math.sin(p*Math.PI*2))*16;
    avatarEl.style.transform='translate(-50%,-100%) scaleX(var(--flip,1)) translateY('+(-hop)+'px)';
    if(p<1){walkRaf=requestAnimationFrame(step)}
    else{walkRaf=null; avatarEl.style.transform=''; avatarEl.style.transition='';}
  }
  walkRaf=requestAnimationFrame(step);
  burst(x,y);
}
function moveAvatar(id){
  if(!avatarEl)return;
  var p=AVATAR_POS[id]||AVATAR_POS.about;
  if(walkTarget===id && walkRaf)return; /* already strolling there */
  if(walkRaf)cancelAnimationFrame(walkRaf);
  walkTarget=id;
  var sx=avatarCur.x, sy=avatarCur.y, dx=p[0]-sx, dy=p[1]-sy;
  var dist=Math.hypot(dx,dy);
  if(dx!==0)avatarEl.style.setProperty('--flip', dx<0?-1:1);
  if(reducedMotion || dist<8){
    avatarCur={x:p[0],y:p[1]};
    avatarEl.style.transition='none';
    avatarEl.style.left=p[0]+'px'; avatarEl.style.top=p[1]+'px';
    void avatarEl.offsetWidth; avatarEl.style.transition='';
    avatarEl.style.transform=''; walkTarget=null; walkRaf=null;
    return;
  }
  if(dist<40){ /* already there: just do the happy hop */
    avatarCur={x:p[0],y:p[1]};
    avatarEl.style.left=p[0]+'px'; avatarEl.style.top=p[1]+'px';
    walkTarget=null; arrivalHop(p[0],p[1]);
    return;
  }
  /* Curved strolling path: a gentle arc that bows downward, away from the river,
     so she wanders along the ground instead of gliding in a straight line. */
  var mx=(sx+p[0])/2, my=(sy+p[1])/2;
  var nx=-dy/dist, ny=dx/dist, mag=Math.min(180,Math.max(50,dist*0.18));
  if(ny<0){nx=-nx; ny=-ny;}
  var cx=mx+nx*mag, cy=my+ny*mag;
  var dur=Math.min(2400,Math.max(550,dist/620*1000));
  var steps=Math.max(3,Math.round(dist/85));
  var t0=performance.now();
  avatarEl.style.transition='none'; /* positions are driven frame-by-frame now */
  function frame(t){
    var raw=Math.min(1,(t-t0)/dur);
    var e=raw*raw*(3-2*raw); /* smoothstep: soft start, soft landing */
    var u=1-e;
    var x=u*u*sx + 2*u*e*cx + e*e*p[0];
    var y=u*u*sy + 2*u*e*cy + e*e*p[1];
    avatarCur={x:x,y:y};
    avatarEl.style.left=x+'px'; avatarEl.style.top=y+'px';
    var ph=e*steps;
    var bob=Math.abs(Math.sin(ph*Math.PI))*9; /* little bounce on every step */
    var waddle=Math.sin(ph*Math.PI*2)*3.5; /* side-to-side waddle */
    avatarEl.style.transform='translate(-50%,-100%) scaleX(var(--flip,1)) translateY('+(-bob)+'px) rotate('+waddle+'deg)';
    if(t-lastPuffT>120){lastPuffT=t; spawnPuff(x,y);}
    if(t-lastSparkT>340){lastSparkT=t; spawnSparkle(x,y,26);}
    if(raw<1){walkRaf=requestAnimationFrame(frame)}
    else{walkRaf=null; walkTarget=null; avatarEl.style.transform=''; avatarEl.style.transition=''; arrivalHop(p[0],p[1]);}
  }
  walkRaf=requestAnimationFrame(frame);
}

/* ---------- Panel logic ---------- */
var currentZone=null;
function openPanel(id){
  if(!PANELS[id])return;
  currentZone=id;
  moveAvatar(id);
  panelContent.innerHTML=PANELS[id].html();
  panel.scrollTop=0;
  panel.classList.add('open'); panel.setAttribute('aria-hidden','false');
  backdrop.classList.add('show');
  bindPanelButtons();
}
function closePanel(){
  panel.classList.remove('open'); panel.setAttribute('aria-hidden','true');
  backdrop.classList.remove('show'); currentZone=null; moveAvatar('about');
}
function bindPanelButtons(){
  panelContent.querySelectorAll('[data-open]').forEach(function(b){b.addEventListener('click',function(){openPanel(b.getAttribute('data-open'))})});
  panelContent.querySelectorAll('[data-next]').forEach(function(b){b.addEventListener('click',function(){var id=b.getAttribute('data-next'); closePanel(); focusZone(id,true);})});
  panelContent.querySelectorAll('[data-jump]').forEach(function(b){b.addEventListener('click',function(){var id=b.getAttribute('data-jump'); closePanel(); focusZone(id,true);})});
}
document.getElementById('back-btn').addEventListener('click',closePanel);
backdrop.addEventListener('click',closePanel);
document.addEventListener('keydown',function(e){if(e.key==='Escape')closePanel()});

/* ---------- Camera ---------- */
var cam={x:0,y:0,scale:1}, minScale=0.12, maxScale=1.6;
function applyCam(){world.style.transform='translate('+cam.x+'px,'+cam.y+'px) scale('+cam.scale+')'}
function fitScale(){return Math.min(viewport.clientWidth/WORLD_W, viewport.clientHeight/WORLD_H)*0.99}
function fitView(){
  var vw=viewport.clientWidth, vh=viewport.clientHeight;
  cam.scale=fitScale();
  minScale=cam.scale;
  cam.x=(vw-WORLD_W*cam.scale)/2; cam.y=(vh-WORLD_H*cam.scale)/2;
  applyCam();
}
function clampCam(){
  var vw=viewport.clientWidth, vh=viewport.clientHeight;
  var w=WORLD_W*cam.scale, h=WORLD_H*cam.scale, m=140;
  cam.x=Math.min(m, Math.max(vw-w-m, cam.x));
  cam.y=Math.min(m, Math.max(vh-h-m, cam.y));
}
function zoomAt(cx,cy,factor){
  var wx=(cx-cam.x)/cam.scale, wy=(cy-cam.y)/cam.scale;
  cam.scale=Math.min(maxScale,Math.max(minScale,cam.scale*factor));
  cam.x=cx-wx*cam.scale; cam.y=cy-wy*cam.scale;
  clampCam(); applyCam();
}
function animateCamTo(tx,ty,ts,done){
  var sx=cam.x,sy=cam.y,ss=cam.scale,t0=performance.now(),dur=650;
  function step(t){var p=Math.min(1,(t-t0)/dur);p=1-Math.pow(1-p,3);
    cam.x=sx+(tx-sx)*p; cam.y=sy+(ty-sy)*p; cam.scale=ss+(ts-ss)*p; applyCam();
    if(p<1)requestAnimationFrame(step); else if(done)done();}
  requestAnimationFrame(step);
}
var ZONE_POS={about:[1290,540],janmind:[770,605],achievements:[2200,585],studygen:[365,1030],signspeak:[1300,1000],sociotrack:[2065,980],fingame:[420,1470],skills:[1895,1390],contact:[2420,1285],overview:[1300,1535]};
function focusZone(id,openAfter){
  var pos=ZONE_POS[id]; if(!pos)return;
  var vw=viewport.clientWidth, vh=viewport.clientHeight;
  var targetScale=Math.max(cam.scale, Math.min(0.85, Math.max(vw,vh)/1100));
  if(window.innerWidth<=640)targetScale=0.62;
  var tx=vw/2-pos[0]*targetScale, ty=vh/2-pos[1]*targetScale;
  if(openAfter)moveAvatar(id); /* she starts walking while the camera flies */
  animateCamTo(tx,ty,targetScale,function(){
    var el=document.querySelector('[data-zone="'+id+'"]');
    if(el){el.classList.add('highlight'); setTimeout(function(){el.classList.remove('highlight')},2200);}
    if(openAfter)openPanel(id);
  });
}

/* Pan / zoom input */
var pointers=new Map(), dragStart=null, moved=0, pinchDist=0;
viewport.addEventListener('pointerdown',function(e){
  pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});
  dragStart={x:e.clientX,y:e.clientY,camX:cam.x,camY:cam.y}; moved=0;
  if(pointers.size===2){var p=[...pointers.values()]; pinchDist=Math.hypot(p[0].x-p[1].x,p[0].y-p[1].y);}
  viewport.classList.add('dragging');
});
window.addEventListener('pointermove',function(e){
  if(!pointers.has(e.pointerId))return;
  pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});
  if(pointers.size===2){
    var p=[...pointers.values()]; var d=Math.hypot(p[0].x-p[1].x,p[0].y-p[1].y);
    if(pinchDist>0)zoomAt((p[0].x+p[1].x)/2,(p[0].y+p[1].y)/2,d/pinchDist);
    pinchDist=d; moved=99; return;
  }
  if(!dragStart)return;
  var dx=e.clientX-dragStart.x, dy=e.clientY-dragStart.y;
  moved=Math.max(moved,Math.hypot(dx,dy));
  if(moved>4){cam.x=dragStart.camX+dx; cam.y=dragStart.camY+dy; clampCam(); applyCam();}
});
var suppressClick=false;
function endPointer(e){pointers.delete(e.pointerId); if(pointers.size===0){dragStart=null; viewport.classList.remove('dragging'); suppressClick=moved>8; setTimeout(function(){suppressClick=false; moved=0;},200);}}
window.addEventListener('pointerup',endPointer);
window.addEventListener('pointercancel',endPointer);
viewport.addEventListener('wheel',function(e){e.preventDefault(); zoomAt(e.clientX,e.clientY, e.deltaY<0?1.12:0.89);},{passive:false});

/* Building clicks (ignore if dragged) */
document.querySelectorAll('.building').forEach(function(el){
  el.addEventListener('click',function(){ if(suppressClick)return; openPanel(el.getAttribute('data-zone')); });
});

/* Zoom controls + nav */
document.getElementById('zoom-in').addEventListener('click',function(){zoomAt(viewport.clientWidth/2,viewport.clientHeight/2,1.3)});
document.getElementById('zoom-out').addEventListener('click',function(){zoomAt(viewport.clientWidth/2,viewport.clientHeight/2,0.77)});
document.getElementById('zoom-reset').addEventListener('click',function(){closePanel(); fitView();});
document.querySelectorAll('[data-nav]').forEach(function(b){b.addEventListener('click',function(){focusZone(b.getAttribute('data-nav'),true);})});
document.addEventListener('keydown',function(e){
  var step=70;
  if(e.key==='ArrowLeft'){cam.x+=step}else if(e.key==='ArrowRight'){cam.x-=step}
  else if(e.key==='ArrowUp'){cam.y+=step}else if(e.key==='ArrowDown'){cam.y-=step}else return;
  clampCam(); applyCam();
});
window.addEventListener('resize',function(){minScale=Math.min(minScale,fitScale()); clampCam(); applyCam();});
fitView();
})();
