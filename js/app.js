/* Arcot CUB static demo: data-driven content, language, themes and calculators. */
/* WORKING HOURS: edit MONDAY once. Saturday refers to Monday, so both always match. */
const WORKING_HOURS={
  monday:{open:'10:00',close:'16:00'},
  get saturday(){return this.monday}
};
function workingHours(lang){
  const m=WORKING_HOURS.monday,s=WORKING_HOURS.saturday,same=m.open===s.open&&m.close===s.close;
  const t=h=>h.open+'\u2013'+h.close;
  if(lang==='ta')return same?'\u0BA4\u0BBF\u0B99\u0BCD\u0B95\u0BB3\u0BCD\u2013\u0B9A\u0BA9\u0BBF '+t(m):'\u0BA4\u0BBF\u0B99\u0BCD\u0B95\u0BB3\u0BCD\u2013\u0BB5\u0BC6\u0BB3\u0BCD\u0BB3\u0BBF '+t(m)+', \u0B9A\u0BA9\u0BBF '+t(s);
  return same?'Mon\u2013Sat '+t(m):'Mon\u2013Fri '+t(m)+', Sat '+t(s);
}
/* ===== DEAF ACCOUNTS (unclaimed deposits) search page =====
   Data : data/deaf-accounts.json (or .csv)  ->  Savings A/c no + Name
   PDF  : copy "Arcot UCB Deaf Account list.pdf" to the path in DEAF_PDF
   Page : deaf-accounts.html  (body has data-page="deaf")                         */
const DEAF_BASE=(document.currentScript&&document.currentScript.src||'').replace(/[^\/]*$/,'')||'js/';   /* folder that holds app.js */
/* the page looks for the accounts list in these places, in order (first one found is used) */
const DEAF_DATA=[DEAF_BASE+'deaf-data.js','js/deaf-data.js','data/deaf-accounts.json','data/deaf-accounts.csv','deaf-accounts.json','deaf-accounts.csv'];
/* the page looks for the PDF under these names, in order (first one found is used) */
const DEAF_PDFS=['Arcot-UCB-Deaf-Account-list.pdf','Arcot UCB Deaf Account list.pdf','Arcot_UCB_Deaf_Account_list.pdf','Arcot-UCB-Deaf-Account-list.PDF','pdf/Arcot-UCB-Deaf-Account-list.pdf','downloads/Arcot-UCB-Deaf-Account-list.pdf'];
const DEAF_PDF=DEAF_PDFS[0];
const DEAF_MASK_ACCOUNT=true;   /* true = show only the last 4 digits of the account number; false = show full number */
const DEAF_PAGE_SIZE=10;
const DEAF_PAGE={
  title:{en:'DEAF Accounts (inactive for 10+ years)',ta:'DEAF கணக்குகள் (10 ஆண்டுகளுக்கும் மேல் செயலற்றவை)'},
  intro:{en:'Search for deposit accounts with no customer transactions for 10 years or more that were moved to the RBI Depositor Education and Awareness Fund (DEAF). You can still claim your money through the Bank.',ta:'10 ஆண்டுகளுக்கும் மேலாக வாடிக்கையாளர் பரிவர்த்தனை இல்லாத, ரிசர்வ் வங்கியின் வைப்புதாரர் கல்வி மற்றும் விழிப்புணர்வு நிதிக்கு (DEAF) மாற்றப்பட்ட கணக்குகளைத் தேடலாம். உங்கள் தொகையை வங்கி வழியாக உரிமை கோரலாம்.'}
};
const DEAF_TEXT={
  en:{menu:'DEAF Accounts',name:'Customer name',hint:'Part of a name is enough. At least 3 characters.',cap:(a,b)=>`What is ${a} + ${b}?`,search:'Search',reset:'Reset',acno:'Savings A/c No',cname:'Customer name',prev:'Previous',next:'Next',matches:'matches',none:'No matching records found.',short:'Please enter at least 3 characters.',wrong:'Incorrect answer. Please try again.',loading:'Loading data, please try again in a moment.',err:'The accounts list could not be loaded. Please try again later.',note:'* Accounts that have been inactive for more than 10 years.',disc:'Disclaimer: The records shown are based on the search criteria matched in the database and should not be regarded as conclusive. If you cannot locate your account, please reach out to your nearest Arcot UCB branch. Deposits/accounts that have already been claimed may continue to appear in the database until a periodic review is conducted.',pdf:'Or browse the published list (PDF)',pdfSub:'Arcot UCB Deaf Account list',pdfSoon:'The published PDF list will be available shortly.'},
  ta:{menu:'DEAF கணக்குகள்',name:'வாடிக்கையாளர் பெயர்',hint:'பெயரின் ஒரு பகுதி போதும். குறைந்தது 3 எழுத்துகள்.',cap:(a,b)=>`${a} + ${b} எவ்வளவு?`,search:'தேடு',reset:'மீட்டமை',acno:'சேமிப்புக் கணக்கு எண்',cname:'வாடிக்கையாளர் பெயர்',prev:'முந்தையது',next:'அடுத்தது',matches:'பொருத்தங்கள்',none:'பொருந்தும் பதிவுகள் எதுவும் இல்லை.',short:'குறைந்தது 3 எழுத்துகளை உள்ளிடவும்.',wrong:'பதில் தவறு. மீண்டும் முயற்சிக்கவும்.',loading:'தரவு ஏற்றப்படுகிறது, சிறிது நேரத்தில் மீண்டும் முயற்சிக்கவும்.',err:'கணக்குப் பட்டியலை ஏற்ற இயலவில்லை. பின்னர் முயற்சிக்கவும்.',note:'* 10 ஆண்டுகளுக்கும் மேல் செயலற்றிருந்த கணக்குகள்.',disc:'பொறுப்புத் துறப்பு: காட்டப்படும் பதிவுகள் தரவுத்தளத்தில் தேடல் அளவுகோலுக்குப் பொருந்தியவை மட்டுமே; இவை இறுதியானவை அல்ல. உங்கள் கணக்கைக் கண்டறிய முடியவில்லை எனில், அருகிலுள்ள ஆற்காடு நகரக் கூட்டுறவு வங்கிக் கிளையை அணுகவும். ஏற்கெனவே உரிமை கோரப்பட்ட வைப்புகள்/கணக்குகள் காலமுறை மறு ஆய்வு நடைபெறும் வரை தரவுத்தளத்தில் தொடர்ந்து தோன்றலாம்.',pdf:'அல்லது வெளியிடப்பட்ட பட்டியலைப் (PDF) பாருங்கள்',pdfSub:'ஆற்காடு நகரக் கூட்டுறவு வங்கி DEAF கணக்குப் பட்டியல்',pdfSoon:'வெளியிடப்பட்ட PDF பட்டியல் விரைவில் கிடைக்கும்.'}
};
const deafState={q:'',hits:null,page:1,rows:null,loading:false,error:false,a:0,b:0,msg:''};
function deafT(){return DEAF_TEXT[state.lang==='ta'?'ta':'en']}
function deafEsc(s){return String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function deafNewCaptcha(){deafState.a=1+Math.floor(Math.random()*9);deafState.b=1+Math.floor(Math.random()*9)}
function deafMask(ac){const s=String(ac==null?'':ac);return DEAF_MASK_ACCOUNT&&s.length>4?'X'.repeat(s.length-4)+s.slice(-4):s}
function deafMarkup(){
  const t=deafT();if(!deafState.a)deafNewCaptcha();
  return `<section class="detail-block deaf-section"><form class="deaf-form" data-deaf-form novalidate>
<label for="deaf-q">${t.name}</label><input id="deaf-q" name="q" type="search" autocomplete="off" value="${deafEsc(deafState.q)}">
<p class="deaf-hint">${t.hint}</p>
<label for="deaf-cap" data-deaf-cap-label>${deafEsc(t.cap(deafState.a,deafState.b))} *</label><input id="deaf-cap" name="cap" inputmode="numeric" autocomplete="off">
<div class="deaf-actions"><button class="button" type="submit">${t.search}</button><button class="deaf-reset" type="button" data-deaf-reset>${t.reset}</button></div>
<p class="deaf-status" role="status" aria-live="polite"></p></form>
<div class="deaf-results" data-deaf-results></div>
<p class="deaf-note"><em>${t.note}</em></p><p class="deaf-disclaimer">${t.disc}</p>
<a class="deaf-pdf" href="${DEAF_PDF}" data-fill-pdf="${DEAF_PDF}" data-fill-name="${deafEsc(t.pdfSub)}" target="_blank" rel="noopener"><span class="deaf-pdf-icon" aria-hidden="true">PDF</span><span><strong>${t.pdf}</strong><small>${t.pdfSub}</small></span></a></section>`;
}
function deafRender(){
  const t=deafT(),box=document.querySelector('[data-deaf-results]');if(!box)return;
  const cap=document.querySelector('[data-deaf-cap-label]'),status=document.querySelector('.deaf-status');
  if(cap)cap.textContent=t.cap(deafState.a,deafState.b)+' *';
  if(status)status.textContent=deafState.msg||(deafState.error?t.err:'');
  const hits=deafState.hits;
  if(!hits){box.innerHTML='';return}
  if(!hits.length){box.innerHTML=`<p class="deaf-empty">${t.none}</p>`;return}
  const pages=Math.ceil(hits.length/DEAF_PAGE_SIZE),pg=Math.min(Math.max(deafState.page,1),pages);deafState.page=pg;
  const rows=hits.slice((pg-1)*DEAF_PAGE_SIZE,pg*DEAF_PAGE_SIZE);
  box.innerHTML=`<div class="deaf-table-wrap"><table class="deaf-table"><thead><tr><th>${t.acno}</th><th>${t.cname}</th></tr></thead><tbody>${rows.map(r=>`<tr><td>${deafEsc(deafMask(r.ac))}</td><td>${deafEsc(r.name)}</td></tr>`).join('')}</tbody></table></div><div class="deaf-pager"><button type="button" class="deaf-page-btn" data-deaf-prev ${pg<=1?'disabled':''}>${t.prev}</button><span>${pg} / ${pages} (${hits.length} ${t.matches})</span><button type="button" class="deaf-page-btn" data-deaf-next ${pg>=pages?'disabled':''}>${t.next}</button></div>`;
}
function deafSearch(form){
  const t=deafT(),q=form.q.value.replace(/\s+/g,' ').trim().toUpperCase(),ans=form.cap.value.trim();
  deafState.q=form.q.value;deafState.page=1;
  if(q.length<3){deafState.msg=t.short;deafState.hits=null;return deafRender()}
  if(ans===''||Number(ans)!==deafState.a+deafState.b){deafState.msg=t.wrong;deafNewCaptcha();form.cap.value='';deafState.hits=null;return deafRender()}
  if(!deafState.rows){deafState.msg=deafState.loading?t.loading:t.err;deafState.hits=null;return deafRender()}
  deafState.msg='';
  deafState.hits=deafState.rows.filter(r=>String(r.name||'').toUpperCase().includes(q));
  deafRender();
}
function deafReset(){
  deafState.q='';deafState.hits=null;deafState.page=1;deafState.msg='';deafNewCaptcha();
  const f=document.querySelector('[data-deaf-form]');if(f){f.q.value='';f.cap.value=''}
  deafRender();
}
function deafParse(txt){
  txt=String(txt).replace(/^\uFEFF/,'');
  if(/^\s*[\[{]/.test(txt)){const d=JSON.parse(txt);return Array.isArray(d)?d:(d.accounts||[])}
  const lines=[];let row=[],cell='',q=false;
  for(let i=0;i<txt.length;i++){const c=txt[i];
    if(q){if(c==='"'){if(txt[i+1]==='"'){cell+='"';i++}else q=false}else cell+=c}
    else if(c==='"')q=true;
    else if(c===','||c==='\t'||c===';'){row.push(cell);cell=''}
    else if(c==='\n'||c==='\r'){if(c==='\r'&&txt[i+1]==='\n')i++;row.push(cell);lines.push(row);row=[];cell=''}
    else cell+=c}
  if(cell!==''||row.length){row.push(cell);lines.push(row)}
  const out=[];
  for(const r of lines){const ac=String(r[0]||'').trim(),name=String(r[1]||'').replace(/\s+/g,' ').trim();if(name&&/\d/.test(ac))out.push({ac,name})}
  const width=Math.max(0,...out.map(x=>x.ac.length));   /* Excel drops leading zeros: pad numeric accounts to the longest length */
  out.forEach(x=>{if(/^\d+$/.test(x.ac))x.ac=x.ac.padStart(width,'0')});
  return out;
}
function deafLoadScript(src){return new Promise(res=>{const el=document.createElement('script');el.src=src;el.onload=()=>res(true);el.onerror=()=>{console.warn('DEAF data script failed to load:',src);res(false)};document.head.appendChild(el)})}
async function deafLoadRows(){
  for(const u of DEAF_DATA){
    try{
      if(/\.js$/i.test(u)){
        if(!(Array.isArray(window.DEAF_ROWS)&&window.DEAF_ROWS.length))await deafLoadScript(u+'?v='+Date.now());
        if(Array.isArray(window.DEAF_ROWS)&&window.DEAF_ROWS.length)return window.DEAF_ROWS;
      }else{
        const r=await fetch(u,{cache:'no-store'});if(!r.ok)continue;
        const list=deafParse(await r.text());if(list.length)return list;
      }
    }catch(e){}
  }
  return null;
}
function deafCheckPdf(){
  const a=document.querySelector('.deaf-pdf');if(!a||a.dataset.checked)return;a.dataset.checked='1';
  (async()=>{
    for(const name of DEAF_PDFS){
      const url=encodeURI(name);
      try{
        const r=await fetch(url,{method:'HEAD',cache:'no-store'}),ct=r.headers.get('content-type')||'';
        if(r.status===404||!r.ok||/text\/html/i.test(ct))continue;
        a.href=url;a.dataset.fillPdf=url;return;      /* found: point the button at the real file */
      }catch(e){a.href=encodeURI(DEAF_PDFS[0]);return}  /* network hiccup: keep the button */
    }
    console.warn('DEAF PDF not found. Tried:',DEAF_PDFS.join(', '));
    a.hidden=true;
    if(!a.nextElementSibling||!a.nextElementSibling.classList.contains('deaf-pdf-missing'))a.insertAdjacentHTML('afterend','<p class="deaf-pdf-missing">'+deafT().pdfSoon+'</p>');
  })();
}
let deafBound=false;
function deafInit(){
  if(!deafState.rows&&!deafState.loading){
    deafState.loading=true;deafState.error=false;
    deafLoadRows().then(list=>{if(list)deafState.rows=list;else{deafState.error=true;console.warn('DEAF list not found. Tried:',DEAF_DATA.join(', '))}}).finally(()=>{deafState.loading=false;deafRender()});
  }
  deafRender();deafCheckPdf();
  if(deafBound)return;deafBound=true;
  document.addEventListener('submit',e=>{const f=e.target&&e.target.closest&&e.target.closest('[data-deaf-form]');if(f){e.preventDefault();deafSearch(f)}});
  document.addEventListener('click',e=>{
    if(e.target.closest('[data-deaf-reset]'))deafReset();
    else if(e.target.closest('[data-deaf-prev]')){deafState.page--;deafRender()}
    else if(e.target.closest('[data-deaf-next]')){deafState.page++;deafRender()}
  });
}
/* ===== FINANCIAL POSITION (Disclosures) page =====
   Page : financial-position.html  (body has data-page="financial")
   PDFs : copy the two PDFs next to the other PDFs (see FP_DATA.pdfs below)
   Next year: change ONLY the FP_DATA block (date, numbers, PDF names).            */
const FP_DATA={
  asOn:'31.03.2026',
  fy:'2025-26',
  unit:{en:'Rupees in Lakhs',ta:'ரூபாய் இலட்சங்களில்'},
  liabilities:[
    [{en:'Share Capital',ta:'பங்கு மூலதனம்'},'229.95'],
    [{en:'Reserves & Surplus',ta:'சேமிப்பு நிதிகள் & உபரி'},'174.07'],
    [{en:'Deposits',ta:'வைப்புகள்'},'6209.39'],
    [{en:'Borrowings',ta:'கடன்கள் (பெற்றவை)'},'27.89'],
    [{en:'Payables',ta:'செலுத்த வேண்டியவை'},'0.00'],
    [{en:'Other Liabilities',ta:'பிற பொறுப்புகள்'},'296.93']
  ],
  assets:[
    [{en:'Cash & Bank Balance',ta:'ரொக்கம் & வங்கி இருப்பு'},'243.70'],
    [{en:'Money at Call',ta:'கோரிக்கையில் பணம்'},'200.00'],
    [{en:'Investments',ta:'முதலீடுகள்'},'1319.50'],
    [{en:'Loans & Advances',ta:'கடன்கள் & முன்பணங்கள்'},'4914.19'],
    [{en:'Receivables',ta:'பெறத்தக்கவை'},'0.00'],
    [{en:'Property & Other Assets',ta:'சொத்து & பிற சொத்துகள்'},'260.83']
  ],
  totalLiabilities:'6938.22',
  totalAssets:'6938.22',
  pdfs:[   /* file names exactly as they are on your server */
    {file:'Balance-sheet-31-03-2026-with-schedules.pdf',pages:8,en:'Balance Sheet as on 31-03-2026 (with schedules)',ta:'31-03-2026 இருப்புநிலைக் குறிப்பு (அட்டவணைகளுடன்)'},
    {file:'Profit-and-loss-31-03-2026-with-schedules.pdf',pages:3,en:'Profit and Loss Account for the year ended 31-03-2026 (with schedules)',ta:'31-03-2026 அன்றுடன் முடிந்த ஆண்டின் இலாப நட்டக் கணக்கு (அட்டவணைகளுடன்)'}
  ]
};
const FP_PDF_BASE='';   /* if the PDFs are inside a folder, e.g. 'pdf/', put that here */
const FP_TEXT={
  en:{menu:'Financial Position',eyebrow:'Disclosures',liab:'Liabilities',assets:'Assets',amount:'Amount',total:'TOTAL',asOn:'as on',dl:'Download',pg:'pages',stmts:'Audited Financial Statements FY',menuTitle:'Financial Position'},
  ta:{menu:'நிதி நிலை',eyebrow:'வெளிப்படுத்தல்கள்',liab:'பொறுப்புகள்',assets:'சொத்துகள்',amount:'தொகை',total:'மொத்தம்',asOn:'நிலவரப்படி',dl:'பதிவிறக்கு',pg:'பக்கங்கள்',stmts:'தணிக்கை செய்யப்பட்ட நிதிநிலை அறிக்கைகள் நிதியாண்டு',menuTitle:'நிதி நிலை'}
};
function fpT(){return FP_TEXT[state.lang==='ta'?'ta':'en']}
function fpL(o){return o&&typeof o==='object'?(o[state.lang==='ta'?'ta':'en']||o.en||''):String(o==null?'':o)}
const FP_PAGE={
  get title(){const t=fpT();return {en:'Financial Position',ta:'நிதி நிலை'}},
  get intro(){return {en:'Financial position of the Bank as on '+FP_DATA.asOn+'. The audited statements are available to download below.',ta:'வங்கியின் '+FP_DATA.asOn+' நிலவரப்படி நிதி நிலை. தணிக்கை செய்யப்பட்ட அறிக்கைகளைக் கீழே பதிவிறக்கலாம்.'}}
};
function fpMarkup(){
  const t=fpT(),d=FP_DATA,rows=d.liabilities.map((l,i)=>{const a=d.assets[i]||['',''];return `<tr><td>${deafEsc(fpL(l[0]))}</td><td class="fp-amt">${deafEsc(l[1])}</td><td class="fp-gap" aria-hidden="true"></td><td>${deafEsc(fpL(a[0]))}</td><td class="fp-amt">${deafEsc(a[1])}</td></tr>`}).join('');
  const links=d.pdfs.map(p=>{const name=fpL(p),href=encodeURI(FP_PDF_BASE+p.file);return `<a class="button dl-icon fp-pdf" href="${href}" target="_blank" rel="noopener" aria-label="${deafEsc(t.dl+' – '+name)} (PDF)"><span class="dl-text">${t.dl}</span><span class="dl-filetype">PDF</span><span class="dl-label">${deafEsc(name)} · ${p.pages} ${t.pg}</span></a>`}).join('');
  return `<section class="detail-block fp-section"><div class="fp-card"><div class="fp-head"><div><h2>${t.menuTitle}</h2><small>(${t.asOn} ${d.asOn})</small></div><span class="fp-unit">(${deafEsc(fpL(d.unit))})</span></div><div class="table-scroll"><table class="fp-table"><thead><tr><th scope="col">${t.liab}</th><th scope="col" class="fp-amt">${t.amount}</th><th class="fp-gap" aria-hidden="true"></th><th scope="col">${t.assets}</th><th scope="col" class="fp-amt">${t.amount}</th></tr></thead><tbody>${rows}<tr class="fp-total"><td>${t.total}</td><td class="fp-amt">${d.totalLiabilities}</td><td class="fp-gap" aria-hidden="true"></td><td>${t.total}</td><td class="fp-amt">${d.totalAssets}</td></tr></tbody></table></div></div><h3 class="fp-sub">${t.stmts} ${d.fy}</h3><div class="fp-downloads">${links}</div></section>`;
}
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
function readPreference(key,fallback){try{return localStorage.getItem(key)||fallback}catch{return fallback}}
function saveLanguage(language){try{localStorage.setItem('arcot-language',language)}catch{}}
function savePreference(key,value){try{localStorage.setItem(key,String(value))}catch{}}
try{localStorage.removeItem('arcot-dark')}catch{}
const fontScales=[.875,.9375,1,1.0625,1.125,1.1875,1.25];
const storedLanguage=readPreference('arcot-language','en'),storedPalette=readPreference('arcot-palette','1'),storedScale=Number(readPreference('arcot-font-scale','1'));
const calculatorState={kind:'emi',values:{}};
let downloadsActive=0;
const state={lang:['en','ta'].includes(storedLanguage)?storedLanguage:'en',palette:'1',dark:false,fontScale:fontScales.includes(storedScale)?storedScale:1,data:{}};
const palettes=[['Kanchipuram Maroon & Gold','#5A1222','#B4232C','#E8B03A','#FBF6EA'],['Temple Green & Gold','#0F4C3A','#17805F','#E8B03A','#F4F8F2'],['Royal Navy & Gold','#0B2341','#1455D9','#D6A84F','#F5F7FA'],['Turmeric Saffron & Brown','#6B3410','#D9640F','#F2B705','#FFF7E8'],['Peacock Teal & Copper','#0B4F5C','#0E8FA0','#D98E4A','#F1F8F9'],['Mysore Silk Purple & Gold','#4A1D6B','#8B2FC9','#E8B03A','#F8F4FB'],['Chettinad Indigo & Rose','#1F2A5C','#D6336C','#F0C040','#F6F6FB']];
const menu=[['menuHome','index.html'],['menuAbout','about.html',['mission','board','history']],['menuAccounts','accounts.html',['saving','current','fixed','recurring']],['menuLoans','loans.html',['personalLoan','goldLoan','vehicleLoan','housingLoan','businessLoan']],['menuServices','services.html',['atm','transfer','mobile','sms','locker']],['menuRates','rates.html'],['menuCalculators','calculators.html'],['menuDownloads','downloads.html']];
const products={deposits:'accounts',loans:'loans',services:'services'};const quick=[['◉','saving','accounts.html'],['◈','fixed','accounts.html'],['◇','goldLoan','loans.html'],['▣','atm','services.html'],['⇄','transfer','services.html'],['▤','simpleInterestCalc','calculators.html'],['⌖','menuBranches','branches.html'],['⇩','menuDownloads','downloads.html']];
const pageInfo={financial:['pageFinancial','financialIntro'],about:['pageAbout','aboutIntro'],accounts:['pageAccounts','productTerms'],loans:['pageLoans','productTerms'],services:['pageServices','productTerms'],rates:['pageRates','ratesIntro'],calculators:['pageCalculators','estimateDisclaimer'],downloads:['pageDownloads','downloadsIntro'],branches:['pageBranches','branchesPending'],security:['pageSecurity','securityIntro'],contact:['pageContact','contactIntro'],deaf:['pageDeaf','deafIntro']};
const itemName=(it)=>localized(it?.title??it?.name??it)||localized(it?.id)||'';
function tr(key){if(key==='menuDeaf')return DEAF_TEXT[state.lang==='ta'?'ta':'en'].menu;if(key==='menuFinancial')return FP_TEXT[state.lang==='ta'?'ta':'en'].menu;const current=state.data[state.lang]?.[key],english=state.data.en?.[key];if(typeof current==='string'&&current.trim())return current;if(typeof english==='string'&&english.trim())return english;const fallback={bankName:'The Arcot Co-operative Urban Bank Limited',tagline:'Rooted in trust. Growing together.',menuHome:'Home',menuAbout:'About',menuAccounts:'Accounts',menuLoans:'Loans',menuServices:'Services',menuRates:'Rates & Charges',menuCalculators:'Calculators',menuDownloads:'Form',menuBranches:'Branches & ATMs',menuSecurity:'Security',menuContact:'Contact Us',more:'More',internet:'Internet Banking',openAccount:'Open Account',phone:'Phone',email:'Email',search:'Search the site',important:'IMPORTANT',fraudNotice:'The Bank never asks for your OTP, PIN or card details.',tickerAlert:'Alert: the Bank never asks for your OTP, PIN or card details.',dicgcNotice:'Deposit insurance cover is subject to applicable DICGC terms; verify details with the Bank.',saving:'Savings Account',fixed:'Fixed Deposit',atm:'ATM services',transfer:'Money transfer',emi:'Simple Interest',simpleInterestCalc:'Simple interest calculator',personalLoan:'Personal Loan',goldLoan:'Gold Loan',vehicleLoan:'Vehicle Loan',housingLoan:'Housing Loan',businessLoan:'Business Loan'};return fallback[key]||key}
async function loadData(){const files=['en','ta','rates','accounts','loans','services','branches','content','extras','pages'];await Promise.all(files.map(async f=>{try{state.data[f]=await(await fetch(`data/${f}.json`,{cache:'no-store'})).json()}catch(e){console.error('Could not load data/'+f+'.json',e);state.data[f]=['en','ta'].includes(f)?{}:f==='content'||f==='pages'||f==='extras'?{}:[]}}));if(Array.isArray(state.data.loans)&&Array.isArray(state.data.rates?.loans)&&state.data.rates.loans.length){const ids=new Set(state.data.rates.loans.map(x=>x.id));state.data.loans=state.data.loans.filter(l=>ids.has(l.id))}applyBrandName();if(!state.data.content.synthetic&&state.data.extras.synthetic)state.data.content=state.data.extras;const disclaimer=state.data.pages?.calculators?.disclaimer;if(disclaimer){const en=typeof disclaimer==='object'?(disclaimer.en||disclaimer.ta):disclaimer,ta=typeof disclaimer==='object'?(disclaimer.ta||disclaimer.en):disclaimer;state.data.en.estOnly=en;state.data.ta.estOnly=ta}}
function applyPalette(){const p=palettes[Number(state.palette)-1]||palettes[0],root=document.documentElement;root.style.setProperty('--navy',p[1]);root.style.setProperty('--blue',p[2]);root.style.setProperty('--link-ink',['4','5','7'].includes(String(state.palette))?'#000000':p[2]);root.style.setProperty('--button-ink',['4','5','7'].includes(String(state.palette))?'#000000':'#FFFFFF');root.style.setProperty('--gold',p[3]);root.style.setProperty('--kanchipuram-maroon',String(state.palette)==='1'?'#7A1230':p[1]);root.style.setProperty('--hero-ink',String(state.palette)==='1'?'#7A1230':p[1]);root.style.setProperty('--accent-gold',p[3]);root.style.setProperty('--bg',p[4]);root.style.setProperty('--tint',shade(p[4],-.05));root.style.setProperty('--deep',shade(p[1],-.36));root.style.setProperty('--mid',shade(p[1],.38));root.dataset.theme='light';root.style.setProperty('--font-scale',state.fontScale);root.style.fontSize=(state.fontScale*100)+'%';const meta=$('meta[name="theme-color"]');if(meta)meta.content=p[1]}
function shade(hex,amount){const n=parseInt(hex.slice(1),16),f=amount<0?0:255,a=Math.abs(amount),r=(n>>16)&255,g=(n>>8)&255,b=n&255;return '#'+[r,g,b].map(c=>Math.round((f-c)*a+c).toString(16).padStart(2,'0')).join('')}
function renderPalettes(){const root=$('#palette-list');if(!root)return;root.innerHTML=palettes.map((p,i)=>`<button class="palette-swatch" style="--swatch:${p[1]};--accent:${p[3]}" data-palette="${i+1}" aria-label="${p[0]}" aria-pressed="${state.palette==i+1}"></button>`).join('');root.onclick=e=>{const b=e.target.closest('[data-palette]');if(!b)return;state.palette=b.dataset.palette;savePreference('arcot-palette',state.palette);applyPalette();renderPalettes()};}
function slug(value){return String(value??'').normalize('NFKD').trim().toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'')||'item'}
function navMarkup(){const extras=[['menuBranches','branches.html'],['menuDeaf','deaf-accounts.html'],['menuFinancial','financial-position.html'],['menuContact','contact.html']];const items=[...menu,...extras].map(([key,href,subs])=>{const extraServices=key==='menuServices'?(state.data.extras?.more_services||[]):[],loanSubs=key==='menuLoans'&&Array.isArray(state.data.loans)&&state.data.loans.length?state.data.loans.map(l=>`<a href="loans.html#${slug(l.id)}">${localized(l.title)}</a>`):null,links=[...(loanSubs||(subs||[]).map(s=>`<a href="${href}#${slug(s)}">${tr(s)}</a>`)),...extraServices.map(s=>`<a href="services.html#${slug(s.id||localized(s.title)||localized(s.name))}">${localized(s.title)||localized(s.name)||localized(s.id)}</a>`)];return `<div class="nav-item"><a class="nav-link" href="${href}" ${links.length?'aria-haspopup="true"':''}>${tr(key)}</a>${links.length?`<div class="dropdown">${links.join('')}</div>`:''}</div>`});return items.join('')+`<div class="nav-item more-item"><button class="nav-link more-button" type="button" aria-expanded="false">${tr('more')} </button><div class="dropdown more-dropdown"></div></div>`}

function renderNavControls(){const root=$('#header-controls');if(!root)return;root.innerHTML=`<div class="language-control" role="group" aria-label="Language"><button type="button" data-language="ta" aria-label="View in Tamil" aria-pressed="${state.lang==='ta'}" class="${state.lang==='ta'?'active':''}">&#x0BA4;&#x0BAE;&#x0BBF;&#x0BB4;&#x0BCD;</button><button type="button" data-language="en" aria-label="View in English" aria-pressed="${state.lang==='en'}" class="${state.lang==='en'?'active':''}">EN</button></div><div class="font-control" role="group" aria-label="Text size"><button type="button" data-scale="-1" aria-label="Decrease text size" aria-pressed="${state.fontScale===.875}">A&minus;</button><button type="button" data-scale="0" aria-label="Reset text size" aria-pressed="${state.fontScale===1}">A</button><button type="button" data-scale="1" aria-label="Increase text size" aria-pressed="${state.fontScale===1.25}">A+</button></div>`;$$('[data-scale]',root).forEach(b=>{if(Number(b.dataset.scale)===-1)b.disabled=state.fontScale<=.875;if(Number(b.dataset.scale)===1)b.disabled=state.fontScale>=1.25})}
function fitNavigation(){const nav=$('#navigation'),more=$('.more-item',nav);if(!nav||!more)return;if(innerWidth<768){more.hidden=true;return}const items=$$('.nav-item:not(.more-item)',nav),dropdown=$('.more-dropdown',more);items.forEach(item=>item.hidden=false);dropdown.querySelectorAll('[data-overflow-link]').forEach(link=>link.remove());const overflow=()=>nav.scrollWidth>nav.clientWidth+1,priority=items.map((_,i)=>i).slice(1).reverse();for(const i of priority){if(!overflow())break;const item=items[i];item.hidden=true;const link=$('.nav-link',item);if(link)dropdown.insertAdjacentHTML('beforeend',`<a data-overflow-link href="${link.getAttribute('href')}">${link.textContent.replace(/\u2304/g,'').replace(/\u25be/g,'').trim()}</a>`)}more.hidden=dropdown.children.length===0}

const heroSlider={index:0,timer:null,initialized:false,hoverAreas:new Set(),focusedDot:false};
function renderHomeHeroSlide(index=heroSlider.index){const root=$('.hero');if(!root)return;heroSlider.index=(index+3)%3;$$('[data-hero-slide]',root).forEach((el,i)=>{const active=i===heroSlider.index;el.classList.toggle('is-active',active);el.setAttribute('aria-hidden',String(!active))});$$('[data-hero-card]',root).forEach((el,i)=>{const active=i===heroSlider.index;el.classList.toggle('is-active',active);el.setAttribute('aria-hidden',String(!active))});$$('[data-hero-dot]',root).forEach((el,i)=>{const active=i===heroSlider.index;el.classList.toggle('active',active);el.setAttribute('aria-pressed',String(active))})}
function syncHeroSliderTimer(){if(!heroSlider.initialized)return;clearTimeout(heroSlider.timer);heroSlider.timer=null;if(heroSlider.hoverAreas.size||heroSlider.focusedDot||document.hidden)return;heroSlider.timer=setTimeout(()=>{heroSlider.timer=null;if(heroSlider.hoverAreas.size||heroSlider.focusedDot||document.hidden){syncHeroSliderTimer();return}renderHomeHeroSlide(heroSlider.index+1);syncHeroSliderTimer()},6000)}
function initHomeHero(){const root=$('.hero');if(!root||heroSlider.initialized)return;heroSlider.initialized=true;root.addEventListener('click',e=>{const dot=e.target.closest('[data-hero-dot]');if(!dot)return;renderHomeHeroSlide(Number(dot.dataset.heroDot));syncHeroSliderTimer()});['.hero-copy','.hero-side'].forEach(selector=>{const area=$(selector,root);if(!area)return;area.addEventListener('pointerenter',e=>{if(e.pointerType!=='mouse')return;heroSlider.hoverAreas.add(area);syncHeroSliderTimer()});area.addEventListener('pointerleave',e=>{if(e.pointerType!=='mouse')return;heroSlider.hoverAreas.delete(area);syncHeroSliderTimer()})});root.addEventListener('focusin',e=>{const dot=e.target.closest('[data-hero-dot]');if(dot&&dot.matches(':focus-visible')){heroSlider.focusedDot=true;syncHeroSliderTimer()}});root.addEventListener('focusout',e=>{if(e.target.closest('[data-hero-dot]')){heroSlider.focusedDot=false;syncHeroSliderTimer()}});root.addEventListener('touchstart',syncHeroSliderTimer,{passive:true});document.addEventListener('visibilitychange',syncHeroSliderTimer);renderHomeHeroSlide(heroSlider.index);syncHeroSliderTimer()}
function renderChrome(){const nav=$('#navigation');if(nav)nav.innerHTML=navMarkup();renderNavControls();document.documentElement.lang=state.lang;document.body.classList.toggle('lang-ta',state.lang==='ta');$$('[data-i18n]').forEach(el=>{const v=tr(el.dataset.i18n);if(v&&v!==el.dataset.i18n)el.innerHTML=v});$$('[data-i18n-placeholder]').forEach(el=>{const v=tr(el.dataset.i18nPlaceholder);if(v)el.placeholder=v});renderPalettes();const yr=$('#year');if(yr)yr.textContent=new Date().getFullYear();renderHomeHeroSlide(heroSlider.index);requestAnimationFrame(fitNavigation)}
function renderQuick(){const root=$('#quick-services');if(!root)return;root.innerHTML=quick.map(([icon,key,url])=>`<a class="quick-item" href="${url}"><span class="quick-icon" aria-hidden="true">${icon}</span><span>${tr(key)}</span></a>`).join('')}
function renderWhyChoose(){const data=state.data.extras?.why_choose_us;if(!data||!$('#quick-services'))return;let section=$('#why-choose-us');if(!section){section=document.createElement('section');section.id='why-choose-us';section.className='why-choose-strip container';$('#quick-services').insertAdjacentElement('afterend',section)}const stats=data.stats||[],entries=Array.isArray(stats)?stats.map(x=>({label:x.label??x.title??x.name,value:x.value??x.count??x.stat})):Object.entries(stats).map(([label,value])=>({label,value:typeof value==='object'?(value.value??value.count):value}));section.innerHTML=`<h2>${state.lang==='ta'?'எங்களை ஏன் தேர்வு செய்ய வேண்டும்':'Why choose us'}</h2><div class="why-stats">${entries.map((x,i)=>`<article class="why-stat"><strong data-count-index="${i}">${typeof x.value==='number'?'0':localized(x.value)}</strong><span>${localized(x.label)||`${state.lang==='ta'?'விவரம்':'Detail'} ${i+1}`}</span></article>`).join('')}</div>`;entries.forEach((x,i)=>{if(typeof x.value!=='number')return;const el=section.querySelector(`[data-count-index="${i}"]`),start=performance.now(),duration=650;const tick=now=>{const t=Math.min(1,(now-start)/duration);el.textContent=String(Number((x.value*t).toFixed(2)));if(t<1)requestAnimationFrame(tick)};requestAnimationFrame(tick)})}
function renderTrust(){const root=$('#trust-grid');if(!root)return;const dicgc=tr('dicgcTrust').replace('5','<span data-trust-count>0</span>'),cards=[['&#x25c9;',dicgc,tr('dicgcTrustSub')],['&#x2696;',tr('rbiTrust'),tr('rbiTrustSub')],['&#x25a3;',tr('rupayTrust'),tr('rupayTrustSub')],['&#x25a4;',tr('smsTrust'),tr('smsTrustSub')]];root.innerHTML=cards.map(c=>`<div class="trust-item"><span class="trust-icon">${c[0]}</span><div><strong>${c[1]}</strong><small>${c[2]}</small></div></div>`).join('');const count=$('[data-trust-count]',root);if(count){if(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches){count.textContent='5';return}const start=performance.now(),duration=800;const tick=now=>{const progress=Math.min(1,(now-start)/duration);count.textContent=String(Math.round(5*progress));if(progress<1)requestAnimationFrame(tick)};requestAnimationFrame(tick)}}
function renderProducts(type='deposits'){const root=$('#product-grid');if(!root)return;const items=state.data[products[type]]||[];root.innerHTML=items.slice(0,4).map((it,i)=>`<article class="product-card"><span class="quick-icon" aria-hidden="true">${productIcon(type,i,it)}</span><h3>${itemName(it)}</h3><p>${it.description?.[state.lang]||it.description?.en||''}</p><a href="${products[type]}.html">${tr('allProducts')}</a></article>`).join('')}
function rateRows(){return(state.data.rates?.rates||[]).map(x=>({product:x.product,tenure:x.tenure,rate:Number(x.general).toFixed(2)+'%',senior:x.senior==null?'\u2014':Number(x.senior).toFixed(2)+'%'}))}
function ratesFootnote(){return state.data.rates?.footnote?.[state.lang]||''}
function effectiveFromText(){const value=state.data.rates?.effectiveFrom;if(!value)return'';const date=new Date(value+'T00:00:00Z'),formatted=new Intl.DateTimeFormat(state.lang==='ta'?'ta-IN':'en-GB',{day:'numeric',month:'short',year:'numeric',timeZone:'UTC'}).format(date);return state.lang==='ta'?'\u0b85\u0bae\u0bb2\u0bc1\u0b95\u0bcd\u0b95\u0bc1 \u0bb5\u0ba8\u0bcd\u0ba4 \u0ba4\u0bc7\u0ba4\u0bbf: '+formatted:'Effective from '+formatted}
function fillRateValues(){const rows=state.data.rates?.rates||[],norm=s=>String(s||'').toLowerCase().replace(/[^a-z0-9]/g,''),text=x=>norm((typeof x.product==='string'?x.product:(x.product&&(x.product.en||x.product.ta))||'')+' '+(x.id||''));$$('[data-rate-id]').forEach(el=>{const key=el.dataset.rateId,k=norm(key);let row=rows.find(x=>x.id===key)||rows.find(x=>x.id&&norm(x.id)===k)||rows.find(x=>x.id&&k&&(norm(x.id).includes(k)||k.includes(norm(x.id))));if(!row){const group=/fd|fixed|deposit|term/.test(k)?/fixed|deposit|fd|term/:/sav/.test(k)?/saving/:/rd|recurring/.test(k)?/recurring|rd/:null;if(group){const list=rows.filter(x=>group.test(text(x))&&Number.isFinite(Number(x.general)));if(list.length)row=list.reduce((a,b)=>Number(b.general)>Number(a.general)?b:a)}}const value=row?Number(row.general):NaN;if(Number.isFinite(value))el.textContent=value.toFixed(2);else console.warn('[rates] no rate found for data-rate-id="'+key+'". Available ids:',rows.map(x=>x.id))})}
function renderRates(){const rows=rateRows(),root=$('#rates-table');if(root)root.innerHTML=rows.map(x=>`<tr><td>${itemName(x.product)}</td><td>${itemName(x.tenure)}</td><td>${x.rate}</td></tr>`).join('');if(root){const tb=root.closest('table');if(tb)[...tb.querySelectorAll('thead th')].slice(3).forEach(h=>h.remove())}const footnote=$('#rates-footnote');if(footnote)footnote.textContent=[ratesFootnote(),effectiveFromText()].filter(Boolean).join(' ');fillRateValues();const n=$('#notice-list');if(n)n.innerHTML=(state.data.rates?.notices||[]).slice(0,2).map(x=>{const text=x.text?.[state.lang]||x.text?.en||x.text||'';return `<div class="notice-row"><span class="notice-icon">!</span><div><strong>${text}</strong>${x.date?`<small>${x.date}</small>`:''}</div></div>`}).join('')}
function sharedRatesTable(){return `<div class="table-scroll"><table class="data-table shared-rates-table rates-page-table rates-page-current"><thead><tr><th>${tr('product')}</th><th>${tr('tenure')}</th><th>${tr('general')}</th></tr></thead><tbody>${rateRows().map(x=>`<tr><td>${itemName(x.product)}</td><td>${itemName(x.tenure)}</td><td>${x.rate}</td></tr>`).join('')}</tbody></table></div><p class="fine-print rates-effective-from">${ratesFootnote()} ${effectiveFromText()}</p>`}
function recurringDepositTable(){const row=(state.data.rates?.rates||[]).find(x=>x.id==='rd-12m-24m');if(!row)return'';const senior=row.senior==null?'\u2014':Number(row.senior).toFixed(2)+'%';return `<div class="rates-page-recurring"><h2>${tr('recurringDepositRate')}</h2><p>${tr('recurringDepositBlurb')}</p><div class="table-scroll"><table class="data-table rates-page-table"><thead><tr><th>${tr('tenure')}</th><th>${tr('interestRate')}</th></tr></thead><tbody><tr><td>${itemName(row.tenure)}</td><td>${Number(row.general).toFixed(2)}%</td></tr></tbody></table></div></div>`}
function ratesDetailTable(rows,kind){if(!Array.isArray(rows)||!rows.length)return'';const keys=Object.keys(rows[0]);return `<div class="table-scroll"><table class="data-table rates-page-table rates-page-${kind}"><thead><tr>${keys.map(k=>`<th>${localized(k.replace(/_/g,' ')).replace(/^\w/,c=>c.toUpperCase())}</th>`).join('')}</tr></thead><tbody>${rows.map(row=>{const charge=kind==='charges'?String(localized(row.charge)||'').trim():'';const chargeClass=/^(coming soon|விரைவில்)$/i.test(charge)?'charge-coming-soon':/^(nil|இல்லை)$/i.test(charge)?'charge-benefit':/^(lowest ever compared to others|மற்றவர்களை விட மிகக் குறைவு)$/i.test(charge)?'charge-best-value':'';return `<tr${chargeClass==='charge-coming-soon'?' class="charge-row-coming-soon"':''}>${keys.map(k=>{const value=localized(row[k]);return `<td${kind==='charges'&&k==='charge'&&chargeClass?` class="${chargeClass}"`:''}>${kind==='charges'&&k==='charge'&&chargeClass?`<span class="charge-value">${value}</span>`:value}</td>`}).join('')}</tr>`}).join('')}</tbody></table></div>`}
function money(n){return new Intl.NumberFormat(state.lang==='ta'?'en-IN':'en-IN',{style:'currency',currency:'INR',maximumFractionDigits:0}).format(Math.max(0,n||0))}
function money2(n){return new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',minimumFractionDigits:2,maximumFractionDigits:2}).format(Math.max(0,n||0))}
const unitSuffix=format=>format==='percent'?'%':format==='years'?` ${tr('years')}`:'';
const controls=(id,key,min,max,value,step,format='number')=>{value=calculatorState.values[id]??value;return `<div class="range-control"><label for="${id}"><span>${tr(key)}</span><output id="${id}-out">${format==='money'?money(value):value+unitSuffix(format)}</output></label><input type="range" id="${id}" min="${min}" max="${max}" value="${value}" step="${step}" data-format="${format}"><div class="range-limits"><span>${format==='money'?money(min):min}</span><span>${format==='money'?money(max):max+unitSuffix(format)}</span></div></div>`};
const dualControls=(id,key,min,max,value,step,format='number')=>{value=calculatorState.values[id]??value;const shown=format==='money'?money2(value):`${value}${format==='percent'?'%':''}`;return `<div class="range-control dual-range-control"><label for="${id}"><span>${tr(key)}</span><output id="${id}-out">${shown}</output></label><div class="calc-dual-inputs"><input type="range" id="${id}-range" min="${min}" max="${max}" value="${value}" step="${step}" data-calc-input="${id}" data-min="${min}" data-max="${max}" data-format="${format}" aria-label="${tr(key)}"><input type="number" id="${id}" min="${min}" max="${max}" value="${value}" step="${format==='money'?'any':step}" data-calc-input="${id}" data-min="${min}" data-max="${max}" data-format="${format}" aria-label="${tr(key)}"></div><div class="range-limits"><span>${format==='money'?money2(min):min}</span><span>${format==='money'?money2(max):max+ (format==='percent'?'%':'')}</span></div><small class="calc-input-error" id="${id}-error" aria-live="polite"></small></div>`};
function calcTabs(active){return `<div class="calc-tabs" role="tablist" aria-label="${tr('calculatorTitle')}">${[['emi','emi'],['fd','fdCalc'],['rd','rdCalc'],['compare','loanCompare']].map(([id,key])=>`<button role="tab" aria-selected="${id===active}" class="${id===active?'active':''}" data-calc="${id}">${id==='emi'?(state.lang==='ta'?'கடன் வட்டி':'Loan interest'):tr(key)}</button>`).join('')}</div>`}
function calcDepositRate(kind,months){const rows=state.data.rates?.rates||[];const id=kind==='rd'?'rd-12m-24m':months<=2?'fd-1-2m':months<=4?'fd-3-4m':months<=7?'fd-5-7m':months<=11?'fd-7-11m':'fd-11m-24m';const row=rows.find(x=>x.id===id);return row?Number(row.general):0}
function renderCalc(kind='emi',root=$('#calculator-content')){
 if(!root)return;
 let fields='',out='';
 if(kind==='emi'){
  const aiLabel=state.lang==='ta'?'ஆண்டு வட்டி':'Annual interest',dayLabel=state.lang==='ta'?'ஒரு நாள் வட்டி':'Interest per day';
  fields=dualControls('siPrincipal','simplePrincipal',1,10000000,500000,1,'money')+dualControls('siRate','simpleRate',0.01,100,8,0.01,'percent')+dualControls('siDays','simpleDays',1,3650,365,1,'number');
  out=`<div class="result-main" id="res-primary"></div><span class="result-label">${tr('maturityAmount')}</span><div class="calc-donut-wrap"><div class="calc-donut" id="simple-interest-donut" role="img"></div><div class="calc-donut-legend"><div><i class="legend-principal"></i><span>${tr('principal')}</span><b id="si-principal-legend"></b></div><div><i class="legend-interest"></i><span>${aiLabel}</span><b id="si-interest-legend"></b></div></div></div><div class="result-rows"><div class="result-row"><span>${tr('principal')}</span><b id="res-a"></b></div><div class="result-row"><span>${aiLabel}</span><b id="res-b"></b></div><div class="result-row"><span>${dayLabel}</span><b id="res-day"></b></div></div>`;
 }else if(kind==='fd'){
  const ta=state.lang==='ta',fdMode=calculatorState.values.fdPayout||'yearly';
  const fdMonths=calculatorState.values.years??12;
  fields=controls('amount','investment',10000,5000000,300000,10000,'money')+`<div class="range-control"><label for="years"><span>${ta?'காலம் (மாதங்கள்)':'Tenure (months)'}</span><output id="years-out">${fdMonths}</output></label><input type="range" id="years" min="1" max="24" value="${fdMonths}" step="1" data-format="number"><div class="range-limits"><span>1</span><span>24</span></div></div><div class="range-control"><label><span>${tr('rateLabel')}</span><output id="fd-rate-out">${calcDepositRate('fd',fdMonths).toFixed(2)}%</output></label></div><div class="range-control fd-payout-control"><label for="fdPayout"><span>${ta?'வட்டி செலுத்தும் முறை':'Interest payout'}</span></label><select id="fdPayout" class="fd-payout-select"><option value="yearly"${fdMode==='yearly'?' selected':''}>${ta?'ஆண்டுதோறும் (FD / FDQ)':'Yearly payout (FD / FDQ)'}</option><option value="monthly"${fdMode==='monthly'?' selected':''}>${ta?'மாதந்தோறும் (FD மாதாந்திர வட்டி)':'Monthly payout (FD monthly)'}</option></select></div>`;
  out=`<div class="result-main" id="res-primary">—</div><span class="result-label" id="fd-label">${tr('maturity')}</span><div class="result-rows"><div class="result-row"><span>${tr('principal')}</span><b id="res-a"></b></div><div class="result-row"><span id="fd-b-label">${tr('totalInterest')}</span><b id="res-b"></b></div><div class="result-row" id="fd-c-row" hidden><span id="fd-c-label"></span><b id="res-c"></b></div></div>`;
 }else if(kind==='rd'){
  const rdMonths=calculatorState.values.rdMonths??12;fields=dualControls('rdDeposit','rdMonthlyDeposit',100,1000000,5000,100,'money')+`<div class="range-control"><label for="rdMonths"><span>${state.lang==='ta'?'காலம் (மாதங்கள்)':'Tenure (months)'}</span><output id="rdMonths-out">${rdMonths}</output></label><input type="range" id="rdMonths" min="12" max="24" value="${rdMonths}" step="1" data-format="number"><div class="range-limits"><span>12</span><span>24</span></div></div><div class="range-control"><label><span>${tr('rdInterestRate')}</span><output id="rd-rate-out">${calcDepositRate('rd',rdMonths).toFixed(2)}%</output></label></div>`;
  out=`<div class="result-main" id="res-primary"></div><span class="result-label">${tr('maturityAmount')}</span><div class="result-rows"><div class="result-row"><span>${tr('totalDeposited')}</span><b id="res-a"></b></div><div class="result-row"><span>${tr('interestEarned')}</span><b id="res-b"></b></div></div><p class="calc-note">${tr('quarterlyNote')}</p>`;
 }else{
  fields=controls('amount','emiAmount',50000,5000000,500000,50000,'money')+controls('years','loanTenure',1,30,5,1,'years')+controls('rateA','compareA',0,24,0,.25,'percent')+controls('rateB','compareB',0,24,0,.25,'percent');
  out=`<div class="result-main" id="res-primary">—</div><span class="result-label">${tr('compareDifference')}</span><div class="result-rows"><div class="result-row"><span>${tr('compareA')}</span><b id="res-a"></b></div><div class="result-row"><span>${tr('compareB')}</span><b id="res-b"></b></div></div>`;
 }
 root.innerHTML=`<div class="calc-content"><div class="calc-controls">${fields}</div><div class="calc-result"><h3>${tr('calcResult')}</h3>${out}</div></div>`;
 const val=id=>Number($('#'+id,root)?.value||0),set=(id,v,precise=false)=>{const o=$('#'+id,root);if(o)o.textContent=precise?money2(v):money(v)};
 const update=()=>{
  $$('input[type=range]:not([data-calc-input])',root).forEach(input=>{const o=$('#'+input.id+'-out',root),v=Number(input.value);if(o)o.textContent=input.dataset.format==='money'?money(v):v+unitSuffix(input.dataset.format)});
  if(kind==='emi'){
   const principal=val('siPrincipal'),rate=val('siRate'),days=val('siDays'),interest=principal*rate*days/(365*100),maturity=principal+interest;
   $('#res-primary',root).textContent=money2(maturity);set('res-a',principal,true);set('res-b',interest,true);set('res-day',principal*rate/36500,true);
   const share=principal/maturity*100,donut=$('#simple-interest-donut',root);donut.style.background=`conic-gradient(var(--navy) 0 ${share}%,var(--gold) ${share}% 100%)`;donut.setAttribute('aria-label',`${tr('principal')}: ${money2(principal)}; ${state.lang==='ta'?'ஆண்டு வட்டி':'Annual interest'}: ${money2(interest)}`);$('#si-principal-legend',root).textContent=money2(principal);$('#si-interest-legend',root).textContent=money2(interest);
  }else if(kind==='fd'){
   const p=val('amount'),months=val('years'),r=calcDepositRate('fd',months)/100,yrs=months/12,ta=state.lang==='ta',monthly=($('#fdPayout',root)?.value||'yearly')==='monthly',cRow=$('#fd-c-row',root);$('#fd-rate-out',root).textContent=(r*100).toFixed(2)+'%';
   if(!monthly){
    /* FD & FDQ: yearly payout, simple interest = Principal x Rate x Years */
    const interest=p*r*yrs;$('#res-primary',root).textContent=money(p+interest);$('#fd-label',root).textContent=tr('maturity');$('#fd-b-label',root).textContent=tr('totalInterest');cRow.hidden=true;set('res-a',p);set('res-b',interest);
   }else{
    /* FD monthly payout (discounted): Principal x r / (12 + r), rounded to the rupee */
    const m=Math.round(p*r/(12+r)),annual=m*12;$('#res-primary',root).textContent=money(m);$('#fd-label',root).textContent=ta?'மாதாந்திர வட்டி':'Monthly payout';$('#fd-b-label',root).textContent=ta?'மொத்த வட்டி (முழு காலம்)':'Total interest (full tenure)';$('#fd-c-label',root).textContent=ta?'ஆண்டு மொத்தம் (மாதம் × 12)':'Annual total (monthly × 12)';cRow.hidden=false;set('res-a',p);set('res-b',annual*yrs);set('res-c',annual);
   }
  }else if(kind==='rd'){
   const deposit=val('rdDeposit'),months=val('rdMonths'),rate=calcDepositRate('rd',months);$('#rd-rate-out',root).textContent=rate.toFixed(2)+'%';/* CBS RD rule: quarterly compounding; within each quarter, each monthly deposit earns simple interest for the months it is held (3,2,1); interest is added to the balance at quarter end. A last part-quarter earns simple interest only. */
   let bal=0;const qi=rate/400,mi=rate/1200;for(let done=0;done<months;done+=3){const m=Math.min(3,months-done);let held=0;for(let j=0;j<m;j++)held+=m-j;const interest=bal*qi*(m/3)+deposit*held*mi;bal+=deposit*m+(m===3?interest:0)+(m<3?interest:0)}const maturity=Math.round(bal),invested=deposit*months;$('#res-primary',root).textContent=money2(maturity);set('res-a',invested,true);set('res-b',maturity-invested,true);
  }else{
   const p=val('amount'),a=val('rateA')/1200,b=val('rateB')/1200,terms=val('years')*12,ea=a?p*a*Math.pow(1+a,terms)/(Math.pow(1+a,terms)-1):p/terms,eb=b?p*b*Math.pow(1+b,terms)/(Math.pow(1+b,terms)-1):p/terms;$('#res-primary',root).textContent=money(Math.abs(ea-eb));set('res-a',ea);set('res-b',eb);
  }
 };
 $$('input[type=range]:not([data-calc-input])',root).forEach(x=>{x.oninput=()=>{calculatorState.values[x.id]=x.value;update()}});
 $$('#fdPayout',root).forEach(x=>{x.onchange=()=>{calculatorState.values.fdPayout=x.value;update()}});
 $$('[data-calc-input]',root).forEach(input=>input.addEventListener('input',()=>{
  const id=input.dataset.calcInput,value=Number(input.value),min=Number(input.dataset.min),max=Number(input.dataset.max),error=$('#'+id+'-error',root),numberInput=$('#'+id,root);
  if(input.type==='number'&&(!input.value||!Number.isFinite(value)||value<min||value>max)){input.setCustomValidity(tr('calcValidation'));if(error)error.textContent=tr('calcValidation');return}
  if(numberInput)numberInput.setCustomValidity('');if(error)error.textContent='';
  $$(`[data-calc-input="${id}"]`,root).forEach(pair=>{if(pair!==input)pair.value=input.value});calculatorState.values[id]=input.value;const output=$('#'+id+'-out',root);if(output)output.textContent=input.dataset.format==='money'?money2(value):`${value}${input.dataset.format==='percent'?'%':''}`;update();
 }));
 update();
}
function pageIntro(id,p,fallbackKey){const copy=localized(p.intro)||localized(p.description);if(copy)return copy;if(id==='downloads')return localized(p.note)||(state.lang==='ta'?'படிவங்கள் மற்றும் ஆவணங்களை கீழே வகை வாரியாகத் தேர்ந்தெடுக்கவும்.':'Choose a form or document below by category.');if(id==='contact')return state.lang==='ta'?'தொடர்பு விவரங்களைப் பயன்படுத்தி வங்கியை அணுகவும். விசாரணைப் படிவம் செயல்விளக்கத்திற்கானது; அனுப்பப்படாது.':'Use the contact details below to reach the Bank. The enquiry form is a demo and will not be submitted.';if(id==='rates')return localized(p.note)||tr(fallbackKey);if(id==='calculators')return localized(p.disclaimer??p.calculators?.disclaimer)||tr(fallbackKey);return tr(fallbackKey)}
function positionDownloadsThumb(){const track=$('.download-tabs');if(!track)return;const thumb=$('.download-tabs-thumb',track),active=$('[data-download-tab].active',track);if(!thumb||!active)return;thumb.style.width=active.offsetWidth+'px';thumb.style.transform=`translateX(${active.offsetLeft}px)`}
function selectDownloadTab(index,animate=true,focus=false){const track=$('.download-tabs');if(!track)return;const tabs=$$('[data-download-tab]',track);if(!tabs.length)return;downloadsActive=Math.max(0,Math.min(tabs.length-1,index));tabs.forEach((tab,i)=>{const active=i===downloadsActive;tab.classList.toggle('active',active);tab.setAttribute('aria-selected',String(active));tab.tabIndex=active?0:-1});const active=tabs[downloadsActive],panel=$('.download-list');if(panel)panel.setAttribute('aria-labelledby',active.id);const rows=$$('[data-download-category]');rows.forEach(row=>{row.hidden=Number(row.dataset.downloadCategory)!==downloadsActive;row.classList.remove('is-entering')});if(animate&&!matchMedia('(prefers-reduced-motion: reduce)').matches){const visible=rows.filter(row=>!row.hidden);visible.forEach((row,i)=>row.style.setProperty('--row-index',i));if(panel){void panel.offsetWidth;visible.forEach(row=>row.classList.add('is-entering'))}}const rect=active.getBoundingClientRect(),bounds=track.getBoundingClientRect();if(rect.left<bounds.left)track.scrollLeft-=bounds.left-rect.left;else if(rect.right>bounds.right)track.scrollLeft+=rect.right-bounds.right;positionDownloadsThumb();if(focus)active.focus()}
function renderPage(){const mount=$('#page-root');if(!mount)return;const id=document.body.dataset.page||'about',info=pageInfo[id]||pageInfo.about,p=pageRecord(id),title=localized(p.title)||tr(info[0]),intro=pageIntro(id,p,info[1]);mount.innerHTML=`<header class="page-hero"><div class="container"><div class="breadcrumbs"><a href="index.html">${tr('menuHome')}</a>　/　${title}</div><p class="eyebrow">${tr('bankName')}</p><h1>${title}</h1><p>${intro}</p></div></header><main class="page-content container" id="main">${renderDataPageBody(id,p)}</main>`;if(id==='calculators'){const root=$('#inner-calculator');root.innerHTML='';renderCalc(calculatorState.kind,root);root.insertAdjacentHTML('afterbegin',calcTabs(calculatorState.kind));renderCalculatorGuide(p,calculatorState.kind)}if(id==='downloads'){const count=$$('[data-download-tab]').length;downloadsActive=Math.min(downloadsActive,Math.max(0,count-1));selectDownloadTab(downloadsActive,false);const track=$('.download-tabs');track?.addEventListener('scroll',positionDownloadsThumb,{passive:true});requestAnimationFrame(positionDownloadsThumb)}if(id==='deaf'){try{deafInit()}catch(err){console.error('DEAF init error:',err)}}}
function cards(items,url){return `<div class="inner-grid">${items.map(it=>`<article class="info-card" id="${slug(it.id)}"><span class="quick-icon">${it.icon||'◈'}</span><h3>${itemName(it)}</h3><p>${it.description?.[state.lang]||it.description?.en||tr('productTerms')}</p><a href="contact.html">${tr('contact')} →</a></article>`).join('')}</div>`}
// Page-specific datasets are optional during development. Localized values always
// fall back to English so incomplete Tamil content never renders as an empty string.
function localized(value){if(value==null)return'';if(typeof value==='string'||typeof value==='number'){const text=String(value).trim();return /à®|à¯|à°/.test(text)?'':text}if(Array.isArray(value))return value.map(localized).filter(Boolean).join(' ');if(typeof value==='object'){for(const candidate of [value[state.lang],value.en,value.ta,value.name,value.title])if(candidate!=null&&String(candidate).trim()!==''){const text=localized(candidate);if(text)return text}}return''}
function pageRecord(id){if(id==='deaf')return DEAF_PAGE;if(id==='financial')return FP_PAGE;const root=state.data.pages||{};const aliases={rates:'rates_charges'};const record=root[id]||root[aliases[id]]||root.pages?.[id]||root.content?.[id]||{};if(id==='about')return {...record,board_members:record.board?.members||record.board_members,committees:record.committees||record.board?.committees};if(id==='contact')return {...record,address:record.address||record.head_office,grievance_process:(record.grievance||record.grievance_process||[]).map(x=>({title:x.level||x.title,description:[x.how,x.time].map(localized).filter(Boolean).join(' — ')})),form_fields:(record.form_fields||record.fields||[]).map(x=>{const f=typeof x==='string'?{label:x}:x;return{...f,type:f.type||(/message/i.test(localized(f.label))?'textarea':'text')}})};if(id==='downloads'){const categories=record.categories||record.downloads?.categories||record.downloads||[];return {...record,categories:Array.isArray(categories)?categories.map(c=>({...c,items:(c.items||[]).map(x=>typeof x==='string'?{title:x}:x)})):[]}}return record}
function sampleBadge(){return ''}
function pageList(p,...keys){for(const k of keys){const v=p?.[k];if(Array.isArray(v))return v;if(Array.isArray(v?.[state.lang]))return v[state.lang];if(Array.isArray(v?.en))return v.en}return[]}

function boardContacts(items){/* hide the placeholder "Board of Directors ... not in place" card; keep the real contact cards */return items.filter(x=>{const t=String(localized(x.title??x.name??x.label??'')).trim();const d=String(localized(x.description??x.text??x.body??''));return !(/^(board of directors|இயக்குநர் குழு)$/i.test(t)||/not in place/i.test(d));});}
function heading(text){return `<h2>${localized(text)}</h2>`}
function renderItems(items,className=''){return `<div class="${className||'inner-grid'}">${items.map((item,i)=>{const title=localized(item.title??item.name??item.label??item),body=localized(item.description??item.summary??item.text??item.body),role=localized(item.role??item.position),name=localized(item.name??item.title);return `<article class="info-card">${item.icon?`<span class="quick-icon" aria-hidden="true">${item.icon}</span>`:''}<h3>${role&&name&&role!==name?`${role} — ${name}`:title||name||`${state.lang==='ta'?'விவரம்':'Details'} ${i+1}`}</h3>${body?`<p>${body}</p>`:''}${item.date?`<small>${localized(item.date)}</small>`:''}</article>`}).join('')}</div>`}
/* ===== People cards (Board of Directors): photo + name + role + phone =====
   Put each photo in  assets/images/people/  named after the person, e.g.  v-amuda.jpg  (jpg, png or webp).
   Or set "photo": "assets/images/people/anything.jpg" on the person in your data file.
   If no photo is found, the card shows the person's initials instead. */
const PEOPLE_DIR='assets/images/people/',PEOPLE_EXTS=['jpg','png','webp'];
function personSlug(s){return String(s||'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'')}
function personImgFallback(img){const n=(+img.dataset.try||0)+1;if(n<PEOPLE_EXTS.length&&img.dataset.slug){img.dataset.try=n;img.src=PEOPLE_DIR+img.dataset.slug+'.'+PEOPLE_EXTS[n]}else{img.remove()}}
function renderPeople(items){return `<div class="inner-grid people-grid">${items.map((item,i)=>{
  const title=String(localized(item.title??item.name??item.label??item)||'').trim();
  let role=String(localized(item.role??item.position)||'').trim(),name=String(localized(item.person??item.name)||'').trim();
  if(!role||!name||role===name){const parts=title.split(/\s+[—–-]\s+/);if(parts.length>1){role=parts.slice(0,-1).join(' — ');name=parts[parts.length-1]}else{role='';name=title}}
  const body=String(localized(item.description??item.summary??item.text??item.body)||'').trim();
  const phone=String(localized(item.phone??item.telephone)||'').trim();
  const phoneText=phone||(body.match(/\+?\d[\d\s-]{7,}\d/)||[''])[0].trim();
  const initials=name.replace(/\b(Dr|Mr|Mrs|Ms|Shri|Smt|Thiru|Tmt)\b\.?/gi,'').split(/\s+/).filter(Boolean).map(w=>w[0]).slice(0,2).join('').toUpperCase()||'•';
  const slug=personSlug(item.id)||personSlug(localized(item.name)||name)||('person-'+(i+1));
  const explicit=item.photo??item.image??item.img;
  const img=explicit?`<img src="${explicit}" alt="${name}" loading="lazy" data-try="9" onerror="personImgFallback(this)">`:`<img src="${PEOPLE_DIR}${slug}.${PEOPLE_EXTS[0]}" alt="${name}" loading="lazy" data-slug="${slug}" data-try="0" onerror="personImgFallback(this)">`;
  const phoneLine=phoneText?`<p class="person-phone">${state.lang==='ta'?'தொலைபேசி':'Phone'}: <a href="tel:${phoneText.replace(/[^+\d]/g,'')}">${phoneText}</a></p>`:(body?`<p>${body}</p>`:'');
  return `<article class="info-card person-card"><div class="person-photo"><span class="person-initials" aria-hidden="true">${initials}</span>${img}</div><div class="person-body"><h3>${name}</h3>${role?`<p class="person-role">${role}</p>`:''}${phoneLine}</div></article>`}).join('')}</div>`}
function listSection(title,items,kind='list'){if(!items.length)return'';return `<section class="detail-block data-section">${heading(title)}${kind==='chips'?`<div class="value-chips">${items.map(x=>`<span class="value-chip">${x.icon?`<b>${x.icon}</b>`:''}${localized(x.title??x.name??x.label??x)}</span>`).join('')}</div>`:kind==='timeline'?`<ol class="history-timeline">${items.map(x=>`<li><span class="timeline-date">${localized(x.date??x.year)}</span><strong>${localized(x.title??x.name??x)}</strong><p>${localized(x.description??x.text??x.body)}</p></li>`).join('')}</ol>`:kind==='inline'?`<ul class="values-inline">${items.map(x=>`<li class="value-item">${localized(x.title??x.name??x.label??x)}</li>`).join('')}</ul>`:kind==='stages'?`<ol class="stages">${items.map(x=>`<li class="stage"><span class="stage-dot"></span><span class="stage-text">${localized(x.title??x.name??x)}</span></li>`).join('')}</ol>`:kind==='account-steps'?`<ol class="principles-list account-opening-steps" style="--n:${Math.max(items.length,2)}">${items.map(x=>`<li><span>${localized(x.title??x.name??x)}</span>${localized(x.description??x.text)?`<p>${localized(x.description??x.text)}</p>`:''}</li>`).join('')}</ol>`:kind==='numbered'?`<ol class="principles-list">${items.map(x=>`<li><span>${localized(x.title??x.name??x)}</span>${localized(x.description??x.text)?`<p>${localized(x.description??x.text)}</p>`:''}</li>`).join('')}</ol>`:kind==='people'?renderPeople(items):kind==='cards'?renderItems(items):`<ul>${items.map(x=>`<li>${localized(x.title??x.name??x.label??x)}</li>`).join('')}</ul>`}</section>`}
function renderTable(title,rows){if(!Array.isArray(rows)||!rows.length)return'';const keys=Object.keys(rows[0]);return `<section class="detail-block data-section">${heading(title)}<div class="table-scroll"><table class="data-table"><thead><tr>${keys.map(k=>`<th>${localized(k.replace(/_/g,' '))}</th>`).join('')}</tr></thead><tbody>${rows.map(row=>`<tr>${keys.map(k=>`<td>${localized(row[k])}</td>`).join('')}</tr>`).join('')}</tbody></table></div></section>`}
let coopActive=0;
const coopIcons=[
 '<circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M3 20v-1a6 6 0 0 1 12 0v1zM15 14a5 5 0 0 1 6 5v1h-4"/>',
 '<path d="M4 4h16v12H4zM8 8h8M8 12h5M7 20l5-4 5 4"/>',
 '<ellipse cx="12" cy="6" rx="8" ry="3"/><path d="M4 6v5c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 11v5c0 1.7 3.6 3 8 3 1.5 0 2.9-.2 4-.5"/><path d="M17 16v6m-3-3h6"/>',
 '<path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11z"/><path d="m9 12 2 2 4-4"/>',
 '<path d="M3 21h18M5 21V9l7-6 7 6v12M9 21v-6h6v6M9 10h.01M15 10h.01"/>',
 '<path d="M12 21s-8-4.5-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 6.5-8 11-8 11z"/><path d="M3 16h5l2-3 3 5 2-3h6"/>',
 '<path d="M3 21h18M5 21V8h14v13M8 8V4h8v4M8 12h2m4 0h2m-8 4h2m4 0h2"/>'
];
function positionCoopPoints(){const ring=$('.coop-ring');if(!ring)return;const points=$$('.coop-point',ring),size=ring.clientWidth,center=size/2,radius=center;points.forEach((point,i)=>{const angle=(Math.PI*2*i/7)-Math.PI/2,half=point.offsetWidth/2;point.style.left=`${center+Math.cos(angle)*radius-half}px`;point.style.top=`${center+Math.sin(angle)*radius-half}px`})}
function selectCoopPrinciple(index,focus=false){const section=$('.coop-principles');if(!section)return;const points=$$('.coop-point',section),copy=$('.coop-center-copy',section);coopActive=(index+7)%7;points.forEach((point,i)=>{const active=i===coopActive;point.setAttribute('aria-selected',String(active));point.tabIndex=active?0:-1;point.classList.toggle('is-active',active)});if(copy){copy.classList.remove('is-changing');void copy.offsetWidth;copy.innerHTML=`<h3>${tr('coopPrinciple'+(coopActive+1))}</h3><p>${tr('coopPrinciple'+(coopActive+1)+'Desc')}</p>`;copy.classList.add('is-changing')}if(focus)points[coopActive]?.focus()}
function renderCoopPrinciples(){requestAnimationFrame(positionCoopPoints);const keys=Array.from({length:7},(_,i)=>'coopPrinciple'+(i+1));const tabs=keys.map((key,i)=>`<button class="coop-point${i===coopActive?' is-active':''}" type="button" role="tab" aria-label="${tr(key)}" aria-selected="${i===coopActive}" aria-controls="coop-center" tabindex="${i===coopActive?0:-1}" data-coop-point="${i}"><svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${coopIcons[i]}</svg></button>`).join('');return `<section class="coop-principles"><div class="coop-intro"><p class="coop-label">${tr('coopLabel')}</p><h2>${tr('coopHeading')}</h2><span class="coop-rule" aria-hidden="true"></span><p class="coop-summary">${tr('coopIntro')}</p></div><div class="coop-interactive"><div class="coop-ring" role="tablist" aria-label="${tr('coopHeading')}"><span class="coop-ring-line" aria-hidden="true"></span>${tabs}<div class="coop-center-copy" id="coop-center" role="tabpanel" aria-live="polite"><h3>${tr('coopPrinciple'+(coopActive+1))}</h3><p>${tr('coopPrinciple'+(coopActive+1)+'Desc')}</p></div></div></div></section>`}
document.addEventListener('click',e=>{const point=e.target.closest('[data-coop-point]');if(point)selectCoopPrinciple(Number(point.dataset.coopPoint))});
document.addEventListener('mouseover',e=>{const point=e.target.closest('[data-coop-point]');if(!point)return;const i=Number(point.dataset.coopPoint);if(i!==coopActive)selectCoopPrinciple(i)});
document.addEventListener('focusin',e=>{const point=e.target.closest('[data-coop-point]');if(!point)return;const i=Number(point.dataset.coopPoint);if(i!==coopActive)selectCoopPrinciple(i)});
document.addEventListener('keydown',e=>{const point=e.target.closest('[data-coop-point]');if(!point)return;const index=Number(point.dataset.coopPoint);if(['ArrowRight','ArrowDown'].includes(e.key)){e.preventDefault();selectCoopPrinciple(index+1,true)}else if(['ArrowLeft','ArrowUp'].includes(e.key)){e.preventDefault();selectCoopPrinciple(index-1,true)}else if(e.key==='Home'){e.preventDefault();selectCoopPrinciple(0,true)}else if(e.key==='End'){e.preventDefault();selectCoopPrinciple(6,true)}});
window.addEventListener('resize',positionCoopPoints);
function renderDataPageBody(id,p){if(id==='financial'){try{return fpMarkup()}catch(err){console.error('Financial Position error:',err);return '<p>Unable to load this page right now. Please refresh or try again later.</p>'}}if(id==='deaf'){try{return deafMarkup()}catch(err){console.error('DEAF page error:',err);return '<p>Unable to load this page right now. Please refresh or try again later.</p>'}}const content=state.data.content||{},next=state.lang==='ta'?'அடுத்த படி: உறுதிப்படுத்தப்பட்ட விவரங்களுக்கு வங்கிக் கிளையை அணுகவும்.':'Next step: contact a verified bank branch for confirmed details.';if(id==='about'){const vm=pageList(p,'vision_mission','visionMission');return `${vm.length?listSection(state.lang==='ta'?'தொலைநோக்கு & நோக்கம்':'Vision & Mission',vm,'cards'):`<section class="detail-block data-section"><h2>${state.lang==='ta'?'தொலைநோக்கு & நோக்கம்':'Vision & Mission'}</h2><div class="inner-grid">${[['Vision','vision'],['Mission','mission']].map(([en,key])=>{const item=p[key]||{};return `<article class="info-card"><h3>${localized(item.title)|| (state.lang==='ta'?(key==='vision'?'தொலைநோக்கு':'நோக்கம்'):en)}</h3><p>${localized(item.description??item.text??item)||next}</p></article>`}).join('')}</div></section>`}${listSection(state.lang==='ta'?'இயக்குநர் குழு':'Board of Directors',boardContacts(pageList(p,'board_members','directors','board_of_directors') .length?pageList(p,'board_members','directors','board_of_directors'):pageList(p.board,'members')),'people')}${listSection(state.lang==='ta'?'எங்கள் மதிப்புகள்':'Our Values',pageList(p,'values','value_chips'),'inline')}${renderCoopPrinciples()}${listSection(state.lang==='ta'?'வரலாறு':'History',pageList(p,'history','timeline'),'timeline')}${listSection(state.lang==='ta'?'குழுக்கள்':'Committees',pageList(p,'committees').length?pageList(p,'committees'):pageList(p.board,'committees'))}`}
if(id==='rates'){const loans=pageList(p,'loan_rates','loans'),charges=pageList(p,'service_charges','charges'),split=Math.ceil(charges.length/2);return `${p.how_to_read?`<div class="placeholder-box"><strong>${state.lang==='ta'?'எவ்வாறு படிப்பது':'How to read'}:</strong> ${localized(p.how_to_read)}</div>`:''}<div class="rates-page-layout"><div class="rates-page-top"><section class="rates-page-block"><h2>${tr('currentRates')}</h2><p class="rates-current-note rates-page-note-slot">${tr('ratesCurrentNote')}</p>${sharedRatesTable()}${recurringDepositTable()}</section><section class="rates-page-block"><h2>${state.lang==='ta'?'கடன் வட்டி விகிதங்கள்':'Loan rates'}</h2><p class="rates-page-note-slot" aria-hidden="true"></p>${ratesDetailTable(loans,'loans')}</section></div><section class="rates-page-services"><h2>${state.lang==='ta'?'சேவைக் கட்டணங்கள்':'Service charges'}</h2><div class="rates-page-service-grid">${ratesDetailTable(charges.slice(0,split),'charges')}${ratesDetailTable(charges.slice(split),'charges')}</div></section></div>`}
if(id==='calculators')return `<div class="calculator-layout"><div class="calculator-shell" id="inner-calculator"></div><aside class="calculator-guide info-card" id="calculator-guide"></aside></div>`;
if(id==='downloads'){
  const ta=state.lang==='ta';        
  const groups=p.categories||p.downloads||p.items||[];
  const normalized=(Array.isArray(groups)?groups:[{title:ta?'பதிவிறக்கங்கள்':'Downloads',items:groups}]).filter(g=>!/notices?\s*(and|&|&amp;)\s*reports?/i.test(JSON.stringify({t:g.title,n:g.name,l:g.label,c:g.category})));
  /* Notices & Reports tab (Annual Report) – items come from ANNUAL_REPORTS below. The old placeholder "Notices and Reports" tab is hidden above. */
  (function(){
    const items=ANNUAL_REPORTS.map(r=>({title:{en:'Annual Report '+r.year,ta:'ஆண்டு அறிக்கை '+r.year},description:{en:r.en,ta:r.ta}}));
    normalized.push({title:{en:'Notices & Reports',ta:'அறிவிப்புகள் & அறிக்கைகள்'},items});
  })();
  const tabs=normalized.map((g,i)=>`<button id="downloads-tab-${i}" class="download-tab ${i===downloadsActive?'active':''}" type="button" role="tab" aria-selected="${i===downloadsActive}" aria-controls="downloads-panel" tabindex="${i===downloadsActive?0:-1}" data-download-tab="${i}">${localized(g.title??g.name)||`${ta?'வகை':'Category'} ${i+1}`}<span class="download-tab-count" aria-label="${g.items?.length||g.documents?.length||0}">${g.items?.length||g.documents?.length||0}</span></button>`).join('');
  const rows=normalized.flatMap((g,gi)=>(g.items||g.documents||[]).map(item=>{    
    const name=localized(item.title??item.name??item.label),
          desc=localized(item.description??item.text),
          files=pdfFor(item),
          links=files.length
            ?files.map(([label,file,fill])=>{if(fill){const ft=ta?'படிவத்தை நிரப்பு':'Fill form',fn=(name+(label?' – '+label:'')).replace(/"/g,'&quot;');return `<button type="button" class="button dl-fill" data-fill-pdf="${PDF_BASE+file}" data-fill-name="${fn}" aria-haspopup="dialog">${ft}${label?' – '+label:''}</button>`}const dl=ta?'பதிவிறக்கு':'Download',full=dl+(label?' – '+label:'');const fileType=/\.pdf$/i.test(file)?'PDF':/\.docx?$/i.test(file)?'Word':'';return `<a class="button dl-icon" href="${encodeURI(PDF_BASE+file)}" download="${file}" title="${full}" aria-label="${full} (${fileType})"><span class="dl-text">${dl}</span><span class="dl-filetype">${fileType}</span>${label?`<span class="dl-label">${label}</span>`:''}</a>`}).join(' ')
            :`<span class="fine-print">${ta?'விரைவில்':'Coming soon'}</span>`;
    return `<article class="info-card download-row" data-download-category="${gi}"><h3>${name}</h3>${desc?`<p>${desc}</p>`:''}${links}</article>`;
  })).join('');
  return `${normalized.length>1?`<div class="download-tabs" role="tablist" aria-label="${ta?'படிவ வகைகள்':'Form categories'}"><span class="download-tabs-thumb" aria-hidden="true"></span>${tabs}</div>`:''}<div class="download-list" id="downloads-panel" role="tabpanel" aria-labelledby="downloads-tab-${downloadsActive}">${rows||`<p>${ta?'பதிவிறக்கங்கள் விரைவில் சேர்க்கப்படும்.':'Download items will be added soon.'}</p>`}</div>`;
}







if(id==='contact'){const phone=localized(p.phone??p.telephone)||'',email=localized(p.email)||'',address=localized(p.address)||tr('branchesPending'),hours=workingHours(state.lang),grievance=pageList(p,'grievance','grievance_process','steps'),fields=pageList(p,'form_fields','fields');return `<div class="contact-cards"><article class="info-card"><h3>${tr('address')}</h3><p>${address}</p></article><article class="info-card"><h3>${tr('phone')}</h3><a href="tel:${phone.replace(/[^+\d]/g,'')}">${phone}</a></article><article class="info-card"><h3>${tr('email')}</h3><a href="mailto:${email}">${email}</a></article><article class="info-card"><h3>${tr('hours')}</h3><p>${hours}</p></article></div><section class="detail-block data-section"><h2>${state.lang==='ta'?'குறை தீர்வு நடைமுறை':'Grievance process'}</h2>${grievance.length?`<ol class="grievance-stepper">${grievance.slice(0,3).map((x,i)=>`<li><b>${i+1}</b><div><strong>${localized(x.title??x.role)||`${state.lang==='ta'?'நிலை':'Level'} ${i+1}`}</strong><p>${localized(x.description??x.text??x)}</p></div></li>`).join('')}</ol>`:`<ol class="grievance-stepper">${[1,2,3].map(i=>`<li><b>${i}</b><div><strong>${state.lang==='ta'?`நிலை ${i}`:`Level ${i}`}</strong><p>${state.lang==='ta'?'விவரம் உறுதிப்படுத்தப்பட வேண்டும்.':'Details to be confirmed from the supplied pages.json.'}</p></div></li>`).join('')}</ol>`}</section><section class="detail-block"><h2>${state.lang==='ta'?'எங்களைத் தொடர்புகொள்ளுங்கள்':'Contact form'}</h2><form class="demo-contact-form" data-contact-form data-lang="${state.lang}" data-mailto="${email}">${fields.map((f,i)=>{const label=localized(f.label??f.title??f.name)||`${state.lang==='ta'?'புலம்':'Field'} ${i+1}`,type=f.type||'text',nm=f.name||'field'+i,req=['name','mobile','message'].includes(nm)||f.required;return `<label class="${type==='textarea'?'field-wide':''}">${label}${req?'<span class="req" aria-hidden="true"> *</span>':''}${type==='textarea'?`<textarea name="${nm}" placeholder="${label}" rows="5" ${req?'required':''}></textarea>`:`<input name="${nm}" type="${['email','tel','text'].includes(type)?type:'text'}" placeholder="${label}" ${nm==='mobile'?`pattern="[6-9][0-9]{9}" inputmode="numeric" maxlength="10" autocomplete="tel" title="${state.lang==='ta'?'10 இலக்க மொபைல் எண்ணை உள்ளிடவும்':'Enter a 10-digit mobile number'}"`:''} ${nm==='email'?'autocomplete="email"':''} ${nm==='name'?'autocomplete="name"':''} ${req?'required':''}>`}</label>`}).join('')}<input type="text" name="_gotcha" class="hp" tabindex="-1" autocomplete="off" aria-hidden="true"><button class="button" type="submit">${state.lang==='ta'?'செய்தியை அனுப்பு':'Send message'}</button><p class="form-status" role="status" aria-live="polite"></p></form></section>`}
if(['accounts','loans','services'].includes(id)){const extra=state.data.extras||{},baseList=(id==='loans'&&Array.isArray(state.data.loans)&&state.data.loans.length?state.data.loans:(content[id]||state.data[id]||[])),list=id==='services'?[...baseList,...(extra.more_services||[])]:baseList,stepData=id==='loans'?content.loan_process:id==='accounts'?[...(content.procedures?.account_opening||[]),...(extra.open_account_extra?.steps||[])]:id==='services'?(content.service_process||[
{title:{en:'Visit the nearest branch and tell us which service you need.',ta:'அருகிலுள்ள கிளையை அணுகி தேவையான சேவையைத் தெரிவிக்கவும்.'}},
{title:{en:'Submit the service request form with ID and address proof.',ta:'சேவை விண்ணப்பப் படிவத்தை அடையாளம் மற்றும் முகவரிச் சான்றுடன் சமர்ப்பிக்கவும்.'}},
{title:{en:'The bank verifies your account and KYC details.',ta:'வங்கி உங்கள் கணக்கு மற்றும் கே.ஒய்.சி விவரங்களைச் சரிபார்க்கும்.'}},
{title:{en:'Pay any applicable charges.',ta:'பொருந்தும் கட்டணங்களைச் செலுத்தவும்.'}},
{title:{en:'The service is activated and you receive confirmation.',ta:'சேவை செயல்படுத்தப்பட்டதும் உறுதிப்படுத்தல் பெறுவீர்கள்.'}}]):[];const stepTitle=id==='loans'?(state.lang==='ta'?'கடன் விண்ணப்பிக்கும் முறை':'Loan application steps'):id==='services'?(state.lang==='ta'?'சேவையைப் பெறும் முறை':'Steps to avail a service'):(state.lang==='ta'?'கணக்கு தொடங்கும் முறை':'Account opening steps');const schemes=extra.government_schemes||{};
const ta=state.lang==='ta';
const loanRates=new Map((state.data.rates?.loans||[]).map(x=>[x.id,x]));
const isSoon=it=>id==='services'&&/mobile|\batm\b|debit|neft|rtgs|imps/i.test(String(it.id||'')+' '+(typeof it.title==='string'?it.title:(it.title&&it.title.en)||''));
const soonHtml=(it)=>{if(/neft|rtgs|imps/i.test(String(it.id||'')+' '+(typeof it.title==='string'?it.title:(it.title&&it.title.en)||''))){const L=ta?'எந்த வங்கிக் கணக்கிற்கும் பணத்தை பாதுகாப்பாகவும் எளிதாகவும் அனுப்பும் வசதியைத் தயார் செய்து வருகிறோம். விரைவில் நல்ல செய்தியுடன் சந்திப்போம்!':'We are getting a safe and simple way ready for you to send money to any bank account. Something good is coming your way very soon!',I=ta?['எந்த வங்கிக் கணக்கிற்கும் பணம் அனுப்பலாம்','வேகமானது & பாதுகாப்பானது','பயன்படுத்த எளிதானது']:['Send money to any bank account','Quick and secure','Easy to use'],N=ta?'அதுவரை, உங்கள் அருகிலுள்ள கிளையை அணுகுங்கள் - எங்கள் குழு உதவ மகிழ்ச்சியடையும்.':'Until then, visit your nearest branch - our team will be happy to help you.';return `<section class="split-col coming-soon-col" role="status"><h3>${ta?'விரைவில் வருகிறது':'Coming soon'}</h3><p class="soon-lead">${L}</p><ol>${I.map(x=>`<li>${x}</li>`).join('')}</ol><p class="coming-soon-note">${N}</p></section>`}const atm=/\batm\b|debit/i.test(String(it.id||'')+' '+(typeof it.title==='string'?it.title:(it.title&&it.title.en)||''));return `<section class="split-col coming-soon-col" role="status"><h3>${ta?'விரைவில் வருகிறது':'Coming soon'}</h3><p class="soon-lead">${atm?(ta?'பணம் எடுக்கவும் பொருட்கள் வாங்கவும் எளிதாகப் பயன்படுத்தக்கூடிய ரூபே டெபிட் கார்டு வசதியைத் தயார் செய்து வருகிறோம். விரைவில் நல்ல செய்தியுடன் சந்திப்போம்!':'We are getting your RuPay debit card ready for easy cash withdrawals and shopping. Something good is coming your way very soon!'):(ta?'உங்கள் தொலைபேசியிலிருந்தே பணத்தை பாதுகாப்பாகவும் எளிதாகவும் நிர்வகிக்கும் வசதியை உருவாக்கி வருகிறோம். விரைவில் நல்ல செய்தியுடன் சந்திப்போம்!':'We are building a safe and simple way for you to manage your money from your phone. Something good is coming your way very soon!')}</p><ol><li>${atm?(ta?'எப்போது வேண்டுமானாலும் பணம் எடுக்கலாம்':'Withdraw cash anytime'):(ta?'எப்போதும் இருப்பு பார்க்கலாம்':'Check balance anytime')}</li><li>${atm?(ta?'எளிதாகப் பொருட்கள் வாங்கலாம்':'Shop with ease'):(ta?'எளிதாகப் பணம் அனுப்பலாம்':'Transfer funds easily')}</li><li>${ta?'பாதுகாப்பானது & எளிமையானது':'Safe and simple'}</li></ol><p class="coming-soon-note">${ta?'அதுவரை, உங்கள் அருகிலுள்ள கிளையை அணுகுங்கள் - எங்கள் குழு உதவ மகிழ்ச்சியடையும்.':'Until then, visit your nearest branch - our team will be happy to help you.'}</p></section>`};
return `<div class="page-product-sections page-product-sections--${id}"${id==='services'?` style="--service-rows:${Math.ceil(list.length/2)}"`:""}>${list.map(rawItem=>{const soon=isSoon(rawItem);let item=soon?{...rawItem,features:null,eligibility:null,documents:null,how_to:null}:rawItem;if(id==='loans'&&loanRates.has(item.id)){const source=loanRates.get(item.id),rate=Number(source.rate),rateText=ta?`\u0b86\u0ba3\u0bcd\u0b9f\u0bc1\u0b95\u0bcd\u0b95\u0bc1 ${rate}%`:`${rate}% p.a.`,rateFeature=ta?`\u0b86\u0ba3\u0bcd\u0b9f\u0bc1\u0b95\u0bcd\u0b95\u0bc1 ${rate}% \u0bb5\u0b9f\u0bcd\u0b9f\u0bbf \u0bb5\u0bbf\u0b95\u0bbf\u0ba4\u0bae\u0bcd`:`Interest rate of ${rate}% p.a.`,features=(item.features||[]).filter(x=>!/^Interest rate of \d/i.test(x.en||''));features.push({en:`Interest rate of ${rate}% p.a.`,ta:rateFeature});item={...item,title:source.title,rate:{en:rateText,ta:rateText},features}}return `<article class="info-card content-product split-card"${item.id?` id="${slug(item.id)}"`:''}><div class="split-left"><div><h2>${localized(item.title)||item.id||localized(item.name)}</h2><p class="split-desc">${localized(item.summary)}</p>${item.rate?`<p class="split-rate"><span>${state.lang==='ta'?'வட்டி':'Rate'}</span><b>${localized(item.rate)}</b></p>`:''}${item.tenure?`<p class="split-tenure"><span>${state.lang==='ta'?'காலம்':'Tenure'}:</span> ${localized(item.tenure)}</p>`:''}</div><a class="split-cta" href="contact.html">${tr(id==='accounts'?'openAccount':'menuContact')}</a></div><div class="split-right">${soon?soonHtml(item):''}${Array.isArray(item.features)&&item.features.length?`<section class="split-col"><h3>${state.lang==='ta'?'அம்சங்கள்':'Features'}</h3><ul>${item.features.map(x=>`<li>${localized(x)}</li>`).join('')}</ul></section>`:''}${Array.isArray(item.eligibility)&&item.eligibility.length?`<section class="split-col"><h3>${state.lang==='ta'?'தகுதி':'Eligibility'}</h3><ul>${item.eligibility.map(x=>`<li>${localized(x)}</li>`).join('')}</ul></section>`:''}${Array.isArray(item.documents)&&item.documents.length?`<section class="split-col"><h3>${state.lang==='ta'?'தேவையான ஆவணங்கள்':'Documents'}</h3><ul>${item.documents.map(x=>`<li>${localized(x)}</li>`).join('')}</ul></section>`:''}${Array.isArray(item.how_to)&&item.how_to.length?`<section class="split-col"><h3>${state.lang==='ta'?'எப்படிப் பயன்படுத்துவது':'How to use'}</h3><ol>${item.how_to.map(x=>`<li>${localized(x)}</li>`).join('')}</ol></section>`:''}</div></article>`}).join('')||`<p>${localized(p.intro)||next}</p>`}</div>${stepData?.length?listSection(stepTitle,stepData,'account-steps'):''}${id==='accounts'&&Array.isArray(schemes.items)?`${listSection(state.lang==='ta'?'அரசுத் திட்டங்கள்':'Government Schemes',schemes.items,'cards')}${listSection(state.lang==='ta'?'எப்படி விண்ணப்பிப்பது':'How to apply',schemes.how_to_apply||[],'numbered')}${schemes.note?`<div class="placeholder-box">${localized(schemes.note)}</div>`:''}`:''}`}
if(id==='branches'){const c=state.data.pages?.contact||{},office=localized(c.head_office),items=state.data.branches||[],ta=state.lang==='ta',phone=localized(c.phone??c.telephone),email=localized(c.email),hours=workingHours(state.lang),row=(label,val)=>val?`<div class="office-row"><h3>${label}</h3><p>${val}</p></div>`:'';return `${office?`<section class="office-block"><div class="office-title"><h2>${ta?'தலைமை அலுவலகம்':'Head Office'}</h2><a class="office-cta" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(office)}" target="_blank" rel="noopener">${ta?'வழி காண':'Get directions'}</a></div><div class="office-details">${row(ta?'முகவரி':'Address',office)}${row(ta?'தொலைபேசி':'Phone',phone)}${row(ta?'வேலை நேரம்':'Working hours',hours)}${email?`<div class="office-row"><h3>${ta?'மின்னஞ்சல்':'Email'}</h3><p><a href="mailto:${email}">${email}</a></p></div>`:''}</div></section>`:''}${items.length?cards(items):''}`}
if(id==='security'){const tips=content.procedures?.security_tips||[];return `${localized(p.intro)||tr('securityIntro')}${listSection(state.lang==='ta'?'பாதுகாப்பு குறிப்புகள்':'Security tips',tips)}<div class="placeholder-box">${tr('securityTip')}</div>`}
return `${localized(p.intro)||localized(p.description)||next}`}
function introFromPage(p){return localized(p.intro)||localized(p.description)}
function renderCalculatorGuide(p,kind){const root=$('#calculator-guide');if(!root)return;const item=p[kind]||p.calculators?.[kind]||p[kind==='emi'?'loan_emi':kind==='fd'?'fd_maturity':kind==='rd'?'rd_maturity':'loan_comparison']||{};const how=pageList(item,'how_to','steps').length?pageList(item,'how_to','steps'):pageList(p,'how_to');root.innerHTML=`<h2>${state.lang==='ta'?'எப்படி பயன்படுத்துவது':'How to use'}</h2><ol>${(how.length?how:[state.lang==='ta'?'தொகை, வட்டி மற்றும் காலத்தைத் தேர்ந்தெடுக்கவும்.':'Set the amount, rate and tenure using the controls.',state.lang==='ta'?'மதிப்பீட்டை முடிவாகக் கருதாமல், வங்கியிடம் உறுதிப்படுத்தவும்.':'Treat the result as an estimate and confirm terms with the Bank.']).map(x=>`<li>${localized(x)}</li>`).join('')}</ol>`}


function setupSharedHeader(){
 $$('.utility,.brand-row,.main-nav').forEach(el=>el.remove());
 const contactEmail=localized(state.data.pages?.contact?.email)||'contact@actcub.bank.in';
 const utility=document.createElement('div');utility.className='utility';utility.innerHTML=(()=>{
  /* Edit these two lines to change the working hours and head-office text shown in the top bar */
  const INFO={en:{hours:workingHours('en'),place:'Head Office, Arcot (T.N)'},ta:{hours:workingHours('ta'),place:'தலைமை அலுவலகம், ஆற்காடு'}}[state.lang]||{};
  const PHONE_FALLBACK='9442862088'; /* used only if the contact data has no phone number */
  const fromData=localized(state.data.pages?.contact?.phone??state.data.pages?.contact?.telephone),fromLabel=String(tr('phone')).replace(/^[^\d+]*/,'').trim();
  const ph=[fromData,fromLabel].map(v=>String(v||'').trim()).find(v=>/\d{6,}/.test(v))||PHONE_FALLBACK,tel=ph.replace(/[^\d+]/g,'');
  const ic=p=>`<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;
  const mail=ic('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>'),
        phone=ic('<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>'),
        clock=ic('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),
        pin=ic('<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>');
  return `<div class="container utility-inner"><div class="utility-list">`+
    `<a class="utility-item" href="mailto:${contactEmail}">${mail}<span>${contactEmail}</span></a>`+
    (ph?`<a class="utility-item" href="tel:${tel}">${phone}<span>${ph}</span></a>`:'')+
    (INFO.hours?`<span class="utility-item">${clock}<span>${INFO.hours}</span></span>`:'')+
    (INFO.place?`<span class="utility-item">${pin}<span>${INFO.place}</span></span>`:'')+
  `</div></div>`})();
 const brand=document.createElement('header');brand.className='brand-row container';brand.innerHTML=`<a class="brand" href="index.html" aria-label="${tr('bankName')}"><img class="brand-logo" src="logos/Logo.png" data-try="0" onerror="brandLogoFallback(this)" alt="The Arcot Co-operative Urban Bank Limited" height="56"><span class="brand-copy"><strong data-i18n="bankName">${tr('bankName')}</strong><small data-i18n="tagline">${tr('tagline')}</small></span></a><form class="search" role="search"><label class="sr-only" for="site-search">${tr('search')}</label><input id="site-search" type="search" placeholder="${tr('search')}" data-i18n-placeholder="search"><button type="submit" aria-label="${tr('search')}"><svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="10.8" cy="10.8" r="6.8" fill="none" stroke="currentColor" stroke-width="2"/><path d="m16 16 4.3 4.3" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></button></form><div class="brand-actions"><a class="button button-outline" href="#" data-i18n="internet">${tr('internet')}</a><a class="button" href="contact.html" data-i18n="openAccount">${tr('openAccount')}</a><div class="header-controls" id="header-controls"></div></div><button class="menu-toggle" aria-expanded="false" aria-label="Open navigation">&#x2630;</button>`;
 const nav=document.createElement('nav');nav.className='main-nav';nav.setAttribute('aria-label','Main navigation');nav.innerHTML='<div class="container nav-inner"><a class="nav-home" href="index.html" aria-label="Home">⌂</a><div id="navigation"></div></div>';
 const anchor=$('#shared-header-root')||$('#page-root')||$('#main');document.body.insertBefore(utility,anchor);document.body.insertBefore(brand,anchor);document.body.insertBefore(nav,anchor);
}
function setupShellPages(){setupSharedHeader();const contactEmail=localized(state.data.pages?.contact?.email)||'contact@actcub.bank.in';$$('.site-footer,.theme-widget,.scroll-progress,.back-top').forEach(el=>el.remove());const footer=document.createElement('footer');footer.className='site-footer';footer.innerHTML=`<div class="kolam-border" aria-hidden="true"></div><div class="container footer-grid"><div class="footer-brand"><a class="brand brand-inverse" href="index.html"><img class="brand-logo" src="logos/Logo.png" data-try="0" onerror="brandLogoFallback(this)" alt="The Arcot Co-operative Urban Bank Limited" height="56"><span class="brand-copy"><strong>${tr('bankName')}</strong><small>${tr('tagline')}</small></span></a><p>${tr('footerAbout')}</p><div class="footer-contact"><a href="tel:">${tr('phone')}</a><a href="mailto:${contactEmail}">${tr('email')}: ${contactEmail}</a><span data-footer-address></span></div></div><div><h3>${tr('banking')}</h3><a href="accounts.html">${tr('accounts')}</a><a href="loans.html">${tr('loans')}</a><a href="services.html">${tr('services')}</a><a href="rates.html">${tr('ratesCharges')}</a></div><div><h3>${tr('information')}</h3><a href="about.html">${tr('about')}</a><a href="downloads.html">${tr('downloads')}</a><a href="branches.html">${tr('branches')}</a></div><div><h3>${tr('support')}</h3><a href="contact.html">${tr('contact')}</a><a href="downloads.html">${tr('policies')}</a><a href="contact.html">${tr('grievance')}</a></div>${quickLinksMarkup()}</div><div class="container footer-bottom"><span class="footer-copy">© ${new Date().getFullYear()} ${tr('bankName')}. ${state.lang==='ta'?'அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.':'All rights reserved.'}</span><span class="footer-credit">${state.lang==='ta'?'உருவாக்கி நிர்வகிப்பவர்':'Built &amp; managed by'} <a href="https://a5cyber.in/" target="_blank" rel="noopener noreferrer">A5 Cyber Nexus</a> <small>Pvt. Ltd.</small></span></div>`;document.body.append(footer);const widget=document.createElement('div');widget.className='theme-widget';widget.innerHTML=`<button class="theme-toggle" aria-expanded="false" aria-controls="theme-panel">◉ ${tr('colourOptions')}</button><div class="theme-panel" id="theme-panel" hidden><div class="theme-panel-head"><strong>${tr('choosePalette')}</strong><button class="theme-close" aria-label="Close">×</button></div><div class="palette-list" id="palette-list"></div></div>`;document.body.append(widget);const progress=document.createElement('div');progress.className='scroll-progress';progress.innerHTML='<span></span>';document.body.prepend(progress);const back=document.createElement('button');back.className='back-top';back.innerHTML='🪔';back.setAttribute('aria-label','Back to top');document.body.append(back)}
let eventsInitialized=false;function initEvents(){if(eventsInitialized)return;eventsInitialized=true;document.addEventListener('click',e=>{const l=e.target.closest('[data-language]');if(l){if(!['en','ta'].includes(l.dataset.language))return;state.lang=l.dataset.language;saveLanguage(state.lang);refresh();}if(e.target.closest('.language-toggle')){state.lang=state.lang==='en'?'ta':'en';saveLanguage(state.lang);refresh()}const toggle=e.target.closest('.theme-toggle');if(toggle){const panel=$('#theme-panel');panel.hidden=!panel.hidden;toggle.setAttribute('aria-expanded',String(!panel.hidden))}if(e.target.closest('.theme-close')){$('#theme-panel').hidden=true}const tab=e.target.closest('[data-tab]');if(tab){$$('[data-tab]').forEach(b=>{b.classList.toggle('active',b===tab);b.setAttribute('aria-selected',b===tab)});renderProducts(tab.dataset.tab)}const calc=e.target.closest('[data-calc]');if(calc){const host=$('#calculator-content')||$('#inner-calculator');if(host){if(host.id==='calculator-content'){$$('.calc-tabs [data-calc]').forEach(b=>b.classList.toggle('active',b===calc));$$('.calc-tabs [data-calc]').forEach(b=>b.setAttribute('aria-selected',String(b===calc)))}calculatorState.kind=calc.dataset.calc;renderCalc(calculatorState.kind,host);if(host.id==='inner-calculator')host.insertAdjacentHTML('afterbegin',calcTabs(calculatorState.kind))}}const menuBtn=e.target.closest('.menu-toggle');if(menuBtn){const nav=$('.main-nav');nav.classList.toggle('open');menuBtn.setAttribute('aria-expanded',String(nav.classList.contains('open')))}if(e.target.closest('.back-top'))window.scrollTo({top:0,behavior:'smooth'})});document.addEventListener('submit',e=>{const search=e.target.closest('.search');if(!search)return;e.preventDefault();const q=$('#site-search').value.trim().toLowerCase();if(q)location.href=({accounts:'accounts.html',savings:'accounts.html',loan:'loans.html',rate:'rates.html',branch:'branches.html',contact:'contact.html',download:'downloads.html',calculator:'calculators.html'}[Object.keys({accounts:1,savings:1,loan:1,rate:1,branch:1,contact:1,download:1,calculator:1}).find(k=>q.includes(k))]||'about.html')});window.addEventListener('scroll',()=>{const bar=$('.scroll-progress span'),top=$('.back-top'),max=document.documentElement.scrollHeight-innerHeight;if(bar)bar.style.width=(max>0?scrollY/max*100:0)+'%';if(top)top.classList.toggle('visible',scrollY>450)});}
let navControlsInitialized=false;function initNavControls(){if(navControlsInitialized)return;navControlsInitialized=true;document.addEventListener('click',e=>{const size=e.target.closest('[data-scale]');if(size){const steps=fontScales,current=steps.indexOf(state.fontScale),delta=Number(size.dataset.scale),next=delta===0?steps.indexOf(1):Math.max(0,Math.min(steps.length-1,(current<0?2:current)+delta));state.fontScale=steps[next];savePreference('arcot-font-scale',state.fontScale);document.documentElement.style.setProperty('--font-scale',state.fontScale);document.documentElement.style.fontSize=(state.fontScale*100)+'%';renderNavControls();requestAnimationFrame(fitNavigation)}const more=e.target.closest('.more-button');if(more){const item=more.closest('.more-item');item.classList.toggle('open');more.setAttribute('aria-expanded',String(item.classList.contains('open')))}});window.addEventListener('resize',fitNavigation)}
let dataPageControlsInitialized=false;function initDataPageControls(){if(dataPageControlsInitialized)return;dataPageControlsInitialized=true;document.addEventListener('click',e=>{const tab=e.target.closest('[data-download-tab]');if(tab){const n=tab.dataset.downloadTab;$$('[data-download-tab]').forEach(b=>{b.classList.toggle('active',b===tab);b.setAttribute('aria-selected',String(b===tab))});$$('[data-download-category]').forEach(row=>row.hidden=row.dataset.downloadCategory!==n)}const calc=e.target.closest('[data-calc]');if(calc&&document.body.dataset.page==='calculators')renderCalculatorGuide(pageRecord('calculators'),calc.dataset.calc)});document.addEventListener('submit',e=>{if(e.target.matches('.demo-contact-form'))e.preventDefault()})}
document.addEventListener('click',e=>{const tab=e.target.closest('[data-download-tab]');if(tab)selectDownloadTab(Number(tab.dataset.downloadTab),true);if(e.target.closest('[data-scale]'))requestAnimationFrame(()=>selectDownloadTab(downloadsActive,false))});
document.addEventListener('keydown',e=>{const tab=e.target.closest('[data-download-tab]');if(!tab)return;const tabs=$$('[data-download-tab]'),index=Number(tab.dataset.downloadTab);if(e.key==='ArrowRight'||e.key==='ArrowLeft'||e.key==='Home'||e.key==='End'){e.preventDefault();const next=e.key==='Home'?0:e.key==='End'?tabs.length-1:(index+(e.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length;selectDownloadTab(next,false,true)}});
window.addEventListener('resize',()=>selectDownloadTab(downloadsActive,false));
if(document.fonts){document.fonts.ready.then(()=>selectDownloadTab(downloadsActive,false));document.fonts.addEventListener?.('loadingdone',()=>selectDownloadTab(downloadsActive,false))}
function syncPageContactChrome(){const c=state.data.pages?.contact;if(!c)return;const phone=localized(c.phone),email=localized(c.email),address=localized(c.head_office),labels=state.lang==='ta'?['\u0ba4\u0bca\u0bb2\u0bc8\u0baa\u0bc7\u0b9a\u0bbf','\u0bae\u0bbf\u0ba9\u0bcd\u0ba9\u0b9e\u0bcd\u0b9a\u0bb2\u0bcd']:['Phone','Email'];if(phone){const value=$('.utility a[href^="tel"]');if(value){value.href='tel:'+phone.replace(/[^+\d]/g,'');value.textContent=labels[0]+': '+phone}}if(email){const value=$('.utility a[href^="mailto"]');if(value){value.href='mailto:'+email;value.textContent=labels[1]+': '+email}}const footer=$('.footer-contact');if(footer){footer.innerHTML=(phone?'<a href="tel:'+phone.replace(/[^+\d]/g,'')+'">'+labels[0]+': '+phone+'</a>':'')+(email?'<a href="mailto:'+email+'">'+labels[1]+': '+email+'</a>':'')+(address?'<span data-footer-address>'+address+'</span>':'')}if(address){const branch=$('.branch-banner p:not(.eyebrow)');if(branch)branch.textContent=state.lang==='ta'?'\u0ba4\u0bb2\u0bc8\u0bae\u0bc8 \u0b85\u0bb2\u0bc1\u0bb5\u0bb2\u0b95\u0bae\u0bcd: '+address+' \u0b95\u0bbf\u0bb3\u0bc8 \u0bae\u0bb1\u0bcd\u0bb1\u0bc1\u0bae\u0bcd ATM \u0bb5\u0bbf\u0bb5\u0bb0\u0b99\u0bcd\u0b95\u0bb3\u0bc1\u0b95\u0bcd\u0b95\u0bc1 \u0bb5\u0b99\u0bcd\u0b95\u0bbf\u0baf\u0bc8\u0ba4\u0bcd \u0ba4\u0bca\u0b9f\u0bb0\u0bcd\u0baa\u0bc1\u0b95\u0bca\u0bb3\u0bcd\u0bb3\u0bb5\u0bc1\u0bae\u0bcd.':'Head office: '+address+' Contact the Bank for branch and ATM details.'}}
function captureCalculatorState(){const root=$('#calculator-content')||$('#inner-calculator');if(!root)return;const active=$$('.calc-tabs [data-calc]').find(b=>b.classList.contains('active'));if(active)calculatorState.kind=active.dataset.calc;$$('input[type=range]',root).forEach(input=>calculatorState.values[input.id]=input.value)}
function refresh(){captureCalculatorState();setupShellPages();renderChrome();syncPageContactChrome();renderQuick();renderWhyChoose();renderTrust();renderProducts();renderRates();renderPage();const homeCalculator=$('#calculator-content');if(homeCalculator){renderCalc(calculatorState.kind,homeCalculator);$$('.calculator-shell .calc-tabs [data-calc]').forEach(b=>{b.classList.toggle('active',b.dataset.calc===calculatorState.kind);b.setAttribute('aria-selected',String(b.dataset.calc===calculatorState.kind))})}const name=$('body').dataset.page;if(name&&pageInfo[name])document.title=tr(pageInfo[name][0])+' | Arcot CUB'}
async function init(){applyPalette();await loadData();refresh();initEvents();initNavControls();initDataPageControls();initHomeHero();const tabs=$$('.tabs [data-tab]');if(tabs.length){tabs.forEach(b=>b.setAttribute('aria-selected',String(b.classList.contains('active'))));renderProducts('deposits')}const homeCalcs=$('#calculator-content');if(homeCalcs){renderCalc(calculatorState.kind,homeCalcs);$$('.calculator-shell .calc-tabs [data-calc]').forEach(b=>{b.classList.toggle('active',b.dataset.calc===calculatorState.kind);b.setAttribute('aria-selected',String(b.dataset.calc===calculatorState.kind))})}const observer='IntersectionObserver'in window?new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('in-view');observer.unobserve(entry.target)}}),{threshold:.12}):null;if(observer)$$('.product-card,.info-card,.rates-card,.notices-card,.trust-item').forEach(el=>{el.classList.add('reveal');observer.observe(el)}) }
document.addEventListener('DOMContentLoaded',init);










/* ===== Dropdown menu fix =====
   Makes every dropdown link find its section, scroll to it smoothly and highlight it. */
(function(){
  // menu slug -> real section id used on the Accounts and Loans pages
  const alias={saving:'savings',fixed:'fd',recurring:'rd',
               personalloan:'personal',goldloan:'gold',vehicleloan:'vehicle',housingloan:'housing',businessloan:'business'};
  const here=()=>location.pathname.split('/').pop()||'index.html';

  // Give the About page sections ids (English and Tamil headings)
  function tagAboutSections(){
    if(document.body.dataset.page!=='about') return;
    const rules=[['mission',/vision|mission|தொலைநோக்கு/i],['values',/values|மதிப்பு/i],
                 ['principles',/principle|கொள்கை/i],['history',/history|வரலாறு/i],
                 ['board',/board|இயக்குநர்/i],['committees',/committee|குழுக்கள்/i]];
    $$('.page-content .data-section').forEach(sec=>{
      const h=$('h2',sec); if(!h) return;
      const r=rules.find(([,re])=>re.test(h.textContent));
      if(r&&!document.getElementById(r[0])) sec.id=r[0];
    });
  }

  function findTarget(hash){
    const id=decodeURIComponent((hash||'').replace('#','')); if(!id) return null;
    return document.getElementById(id)||document.getElementById(alias[id])||null;
  }
  function targetForLink(a){
    const el=findTarget('#'+((a.getAttribute('href')||'').split('#')[1]||''));
    if(el) return el;
    const label=a.textContent.trim().toLowerCase();          // last resort: match by heading text
    const h=$$('.page-content h2, .page-content h3').find(x=>x.textContent.trim().toLowerCase()===label);
    return h?(h.closest('.content-product,.data-section,.info-card')||h):null;
  }
  function flashTo(el){
    el.scrollIntoView({behavior:'smooth',block:'start'});
    el.classList.add('flash-target');
    setTimeout(()=>el.classList.remove('flash-target'),1800);
  }

  document.addEventListener('click',e=>{
    const a=e.target.closest('.main-nav a[href]'); if(!a) return;
    const href=a.getAttribute('href')||'', item=a.closest('.nav-item');

    // Touch screens have no hover: first tap opens the dropdown, second tap opens the page
    if(a.classList.contains('nav-link')&&a.hasAttribute('aria-haspopup')&&matchMedia('(hover: none)').matches
       &&item&&!item.classList.contains('open-touch')){
      e.preventDefault();
      $$('.nav-item.open-touch').forEach(x=>x.classList.remove('open-touch'));
      item.classList.add('open-touch');
      return;
    }

    if(!href.includes('#')) return;
    const parts=href.split('#'), path=parts[0], hash=parts[1];
    if(path&&path!==here()) return;                          // link to another page: normal navigation
    const el=targetForLink(a); if(!el) return;
    e.preventDefault();
    flashTo(el);
    history.replaceState(null,'','#'+(el.id||hash));
    if(item){ item.classList.add('closed'); item.addEventListener('mouseleave',()=>item.classList.remove('closed'),{once:true}); }
    const nav=$('.main-nav'); if(nav) nav.classList.remove('open');
    const toggle=$('.menu-toggle'); if(toggle) toggle.setAttribute('aria-expanded','false');
    if(document.activeElement) document.activeElement.blur();
  });

  // Coming from another page (for example Home -> About #history): scroll once the page has rendered
  let done=false;
  function initialHash(){
    if(done||!location.hash) return;
    const el=findTarget(location.hash); if(!el) return;
    done=true; setTimeout(()=>flashTo(el),200);
  }
  addEventListener('hashchange',()=>{ const el=findTarget(location.hash); if(el) flashTo(el); });

  // Run after every full render (first load and every language change)
  const prev=refresh;
  refresh=function(){ prev(); tagAboutSections(); initialHash(); };
})();


/* Product and detail tabs are added after each Accounts, Loans, and Services render. */
(function(){
  let selectedProductId=null;
  const selectedColumns=new Map();
  let listenersBound=false;

  function enhance(){
    const groups=$$('.page-product-sections').filter(g=>!g.classList.contains('page-product-sections--loans'));
    groups.forEach(group=>{
      const products=$$(':scope > article.content-product',group);
      if(!products.length)return;

      products.forEach((product,index)=>{
        if(!product.id)product.id=`enhanced-product-${index}`;
        product.setAttribute('role','tabpanel');
        product.tabIndex=0;
      });

      let productTabs=$(':scope > .product-tabs',group);
      if(!productTabs){
        productTabs=document.createElement('div');
        productTabs.className='product-tabs';
        productTabs.setAttribute('role','tablist');
        productTabs.setAttribute('aria-label','Products');
        group.insertBefore(productTabs,products[0]);
      }
      productTabs.innerHTML=products.map((product,index)=>{
        const title=$('h2',product)?.textContent.trim()||`Product ${index+1}`;
        product.setAttribute('aria-labelledby',`product-tab-${index}`);
        return `<button type="button" class="product-tab" role="tab" id="product-tab-${index}" aria-controls="${product.id}" aria-selected="false" tabindex="-1" data-product-tab="${product.id}">${title}</button>`;
      }).join('');

      products.forEach((product,index)=>{
        const right=$('.split-right',product);
        const columns=$$('.split-col',product);
        if(!right||!columns.length)return;
        right.classList.add('has-column-tabs');
        let columnTabs=$(':scope > .column-tabs',right);
        if(!columnTabs){
          columnTabs=document.createElement('div');
          columnTabs.className='column-tabs';
          columnTabs.setAttribute('role','tablist');
          columnTabs.setAttribute('aria-label','Product details');
          right.insertBefore(columnTabs,columns[0]);
        }
        columnTabs.innerHTML=columns.map((column,columnIndex)=>{
          const title=$('h3',column)?.textContent.trim()||`Details ${columnIndex+1}`;
          const panelId=`${product.id}-detail-${columnIndex}`;
          column.id=panelId;
          column.setAttribute('role','tabpanel');
          column.setAttribute('aria-labelledby',`${panelId}-tab`);
          column.tabIndex=0;
          return `<button type="button" class="column-tab" role="tab" id="${panelId}-tab" aria-controls="${panelId}" aria-selected="false" tabindex="-1" data-column-tab="${columnIndex}">${title}</button>`;
        }).join('');
      });

      function chooseProduct(id){
        const active=products.find(product=>product.id===id)||products[0];
        selectedProductId=active.id;
        products.forEach(product=>{
          const selected=product===active;
          product.hidden=!selected;
          productTabs.querySelector(`[data-product-tab="${product.id}"]`)?.setAttribute('aria-selected',String(selected));
          const tab=productTabs.querySelector(`[data-product-tab="${product.id}"]`);
          if(tab)tab.tabIndex=selected?0:-1;
        });
      }

      function chooseColumn(product,index){
        const columns=$$('.split-col',product);
        if(!columns.length)return;
        const activeIndex=Math.max(0,Math.min(columns.length-1,index));
        selectedColumns.set(product.id,activeIndex);
        columns.forEach((column,columnIndex)=>{
          const selected=columnIndex===activeIndex;
          column.hidden=!selected;
          const tab=$(`[data-column-tab="${columnIndex}"]`,$('.column-tabs',product));
          if(tab){tab.setAttribute('aria-selected',String(selected));tab.tabIndex=selected?0:-1;}
        });
      }

      products.forEach(product=>chooseColumn(product,selectedColumns.get(product.id)||0));
      const hashId=decodeURIComponent(location.hash.slice(1));
      const hashProduct=products.find(product=>product.id===hashId);
      chooseProduct((selectedProductId&&products.some(product=>product.id===selectedProductId))?selectedProductId:(hashProduct||products[0]).id);
    });

    if(listenersBound)return;
    listenersBound=true;
    document.addEventListener('click',event=>{
      const productTab=event.target.closest('[data-product-tab]');
      if(productTab){
        const group=productTab.closest('.page-product-sections');
        const panel=$(`#${CSS.escape(productTab.dataset.productTab)}`,group);
        if(group&&panel){
          selectedProductId=panel.id;
          group.querySelectorAll(':scope > article.content-product').forEach(product=>{
            const selected=product===panel;
            product.hidden=!selected;
            const tab=group.querySelector(`[data-product-tab="${CSS.escape(product.id)}"]`);
            if(tab){tab.setAttribute('aria-selected',String(selected));tab.tabIndex=selected?0:-1;}
          });
        }
        return;
      }
      const columnTab=event.target.closest('[data-column-tab]');
      if(columnTab){
        const product=columnTab.closest('article.content-product');
        if(!product)return;
        const index=Number(columnTab.dataset.columnTab);
        selectedColumns.set(product.id,index);
        $$('.split-col',product).forEach((column,columnIndex)=>{
          const selected=columnIndex===index;
          column.hidden=!selected;
          const tab=$(`[data-column-tab="${columnIndex}"]`,$('.column-tabs',product));
          if(tab){tab.setAttribute('aria-selected',String(selected));tab.tabIndex=selected?0:-1;}
        });
      }
    });
    document.addEventListener('keydown',event=>{
      const tab=event.target.closest('[data-product-tab],[data-column-tab]');
      if(!tab)return;
      const list=tab.closest('[role="tablist"]');
      const tabs=$$('[role="tab"]',list);
      const current=tabs.indexOf(tab);
      let next=current;
      if(event.key==='ArrowRight'||event.key==='ArrowDown')next=(current+1)%tabs.length;
      else if(event.key==='ArrowLeft'||event.key==='ArrowUp')next=(current+tabs.length-1)%tabs.length;
      else if(event.key==='Home')next=0;
      else if(event.key==='End')next=tabs.length-1;
      else return;
      event.preventDefault();
      tabs[next].focus();
      tabs[next].click();
    });
    addEventListener('hashchange',()=>{
      const id=decodeURIComponent(location.hash.slice(1));
      $$('.page-product-sections').forEach(group=>{
        const product=$(`:scope > article.content-product#${CSS.escape(id)}`,group);
        if(!product)return;
        selectedProductId=product.id;
        group.querySelectorAll(':scope > article.content-product').forEach(item=>{
          const selected=item===product;
          item.hidden=!selected;
          const tab=group.querySelector(`[data-product-tab="${CSS.escape(item.id)}"]`);
          if(tab){tab.setAttribute('aria-selected',String(selected));tab.tabIndex=selected?0:-1;}
        });
      });
    });
  }

  const previousRefresh=refresh;
  refresh=function(){previousRefresh();enhance();};
})();

/* ===== Loans page: rate list with a centred detail popup ===== */
(function(){
  const GROUP='.page-product-sections--loans';
  let modal=null,lastRow=null,items=[],current=-1,selectedLoanIndex=-1,tabIndex=0,closing=false,hashDone=false,listObserver=null;
  const ta=()=>state.lang==='ta';
  const txt=el=>el?el.textContent.trim():'';
  const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  const reduced=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
  const shortRate=r=>String(r).replace(/\s*p\.a\.$/i,'').replace(/^ஆண்டுக்கு\s*/,'');

  function readItems(group){
    return $$(':scope > article.content-product',group).map(a=>({
      id:a.id,
      title:txt($('h2',a)),
      summary:txt($('.split-desc',a)),
      rate:txt($('.split-rate b',a)),
      tenure:txt($('.split-tenure',a)),
      cols:$$('.split-col',a).map(c=>({title:txt($('h3',c)),items:$$('li',c).map(li=>li.textContent.trim())}))
    }));
  }

  function buildList(group){
    if(listObserver){listObserver.disconnect();listObserver=null}
    $$('.loan-list',group).forEach(x=>x.remove());
    items=readItems(group);
    if(!items.length)return;
    const el=document.createElement('div');
    el.className='loan-list';
    el.style.setProperty('--rows',Math.ceil(items.length/2));
    el.innerHTML=`<h2 class="loan-list-title">${ta()?'கடன்':'Loan'}</h2><ul class="loan-list-rows">${items.map((it,i)=>`<li class="${i===Math.ceil(items.length/2)-1||i===items.length-1?'is-column-end':''}" style="--i:${i}"><button type="button" class="loan-row${i===selectedLoanIndex?' is-selected':''}" data-loan-index="${i}" aria-haspopup="dialog" aria-pressed="${i===selectedLoanIndex}"><span class="loan-row-name">${esc(it.title)}</span><span class="loan-row-rate">${esc(shortRate(it.rate))}</span></button></li>`).join('')}</ul><p class="loan-list-hint">${ta()?'விவரங்களைக் காண ஒரு கடனைத் தேர்ந்தெடுக்கவும்.':'Select a loan to see its features, eligibility and documents.'}</p>`;
    group.insertBefore(el,group.firstChild);
    if(!matchMedia('(prefers-reduced-motion: reduce)').matches&&'IntersectionObserver'in window){listObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('in-view');listObserver.disconnect();listObserver=null}}),{threshold:.12});listObserver.observe(el)}else el.classList.add('in-view');
  }

  function bodyHtml(){
    const c=items[current].cols[tabIndex];
    return c?`<ul>${c.items.map((x,i)=>`<li style="--i:${i}">${esc(x)}</li>`).join('')}</ul>`:'';
  }

  function fill(){
    const it=items[current],inner=$('.loan-modal-inner',modal);
    const tabs=it.cols.map((c,i)=>`<button type="button" role="tab" class="loan-modal-tab${i===tabIndex?' is-active':''}" aria-selected="${i===tabIndex}" tabindex="${i===tabIndex?0:-1}" data-loan-tab="${i}">${esc(c.title)}</button>`).join('');
    inner.innerHTML=`<header class="loan-modal-head"><p class="loan-modal-count">${current+1} / ${items.length}</p><h2 id="loan-modal-title">${esc(it.title)}</h2>${it.summary?`<p class="loan-modal-sum">${esc(it.summary)}</p>`:''}<div class="loan-modal-meta"><div class="loan-modal-rate"><span>${ta()?'வட்டி':'Rate'}</span><b>${esc(it.rate)}</b></div>${it.tenure?`<div class="loan-modal-tenure">${esc(it.tenure)}</div>`:''}</div></header>${it.cols.length?`<div class="loan-modal-tabs" role="tablist">${tabs}</div><div class="loan-modal-body is-in" role="tabpanel">${bodyHtml()}</div>`:''}<footer class="loan-modal-foot"><div class="loan-modal-nav"><button type="button" data-loan-step="-1" aria-label="${ta()?'முந்தைய கடன்':'Previous loan'}">&lsaquo;</button><button type="button" data-loan-step="1" aria-label="${ta()?'அடுத்த கடன்':'Next loan'}">&rsaquo;</button></div><a class="loan-modal-cta" href="contact.html">${tr('menuContact')}</a></footer>`;
  }

  function setTab(i){
    tabIndex=i;
    $$('.loan-modal-tab',modal).forEach((b,k)=>{const on=k===i;b.classList.toggle('is-active',on);b.setAttribute('aria-selected',String(on));b.tabIndex=on?0:-1});
    const b=$('.loan-modal-body',modal);
    if(!b)return;
    b.innerHTML=bodyHtml();b.classList.remove('is-in');void b.offsetWidth;b.classList.add('is-in');
  }

  function step(d){
    current=(current+d+items.length)%items.length;tabIndex=0;
    fill();
    const inner=$('.loan-modal-inner',modal);
    inner.classList.remove('is-swap');void inner.offsetWidth;inner.classList.add('is-swap');
    history.replaceState(null,'','#'+items[current].id);
    const btn=$(`[data-loan-step="${d}"]`,modal);if(btn)btn.focus({preventScroll:true});
  }

  function open(index,row){
    if(!items[index])return;
    if(modal){modal.remove();modal=null}
    closing=false;
    if(row)lastRow=row;
    current=index;selectedLoanIndex=index;tabIndex=0;
    $$('.loan-row',document).forEach((button,i)=>{const selected=i===selectedLoanIndex;button.classList.toggle('is-selected',selected);button.setAttribute('aria-pressed',String(selected))});
    modal=document.createElement('div');
    modal.className='loan-modal';
    modal.innerHTML=`<div class="loan-modal-backdrop" data-loan-close></div><div class="loan-modal-panel" role="dialog" aria-modal="true" aria-labelledby="loan-modal-title" tabindex="-1"><button type="button" class="loan-modal-close" data-loan-close aria-label="${ta()?'மூடு':'Close'}">&times;</button><div class="loan-modal-inner"></div></div>`;
    document.body.append(modal);
    fill();
    document.documentElement.classList.add('loan-modal-open');
    requestAnimationFrame(()=>requestAnimationFrame(()=>{if(modal)modal.classList.add('is-open')}));
    $('.loan-modal-close',modal).focus({preventScroll:true});
    history.replaceState(null,'','#'+items[current].id);
  }

  function close(){
    if(!modal||closing)return;
    closing=true;
    const m=modal;
    m.classList.remove('is-open');m.classList.add('is-closing');
    document.documentElement.classList.remove('loan-modal-open');
    history.replaceState(null,'',location.pathname+location.search);
    setTimeout(()=>{m.remove();if(modal===m)modal=null;closing=false;if(lastRow&&lastRow.isConnected)lastRow.focus({preventScroll:true})},reduced()?0:260);
  }

  function teardown(){
    if(modal){modal.remove();modal=null}
    closing=false;
    document.documentElement.classList.remove('loan-modal-open');
  }

  function indexFromHash(h){
    const id=decodeURIComponent((h||'').replace('#',''));
    return id?items.findIndex(it=>it.id===id):-1;
  }

  document.addEventListener('click',e=>{
    const link=e.target.closest('.main-nav .dropdown a[href*="loans.html#"]');
    if(link&&document.body.dataset.page==='loans'&&items.length){
      const idx=indexFromHash('#'+link.getAttribute('href').split('#')[1]);
      if(idx>-1){
        e.preventDefault();e.stopPropagation();
        const nav=$('.main-nav');if(nav)nav.classList.remove('open');
        if(document.activeElement)document.activeElement.blur();
        open(idx);
      }
    }
  },true);

  document.addEventListener('click',e=>{
    const row=e.target.closest('.loan-row');
    if(row){open(Number(row.dataset.loanIndex),row);return}
    if(!modal)return;
    if(e.target.closest('[data-loan-close]')){close();return}
    const tab=e.target.closest('[data-loan-tab]');
    if(tab){setTab(Number(tab.dataset.loanTab));return}
    const st=e.target.closest('[data-loan-step]');
    if(st)step(Number(st.dataset.loanStep));
  });

  document.addEventListener('keydown',e=>{
    if(!modal)return;
    if(e.key==='Escape'){e.preventDefault();close();return}
    const tab=e.target.closest&&e.target.closest('[data-loan-tab]');
    if(tab&&(e.key==='ArrowRight'||e.key==='ArrowLeft')){
      const n=$$('.loan-modal-tab',modal).length,i=Number(tab.dataset.loanTab),next=(i+(e.key==='ArrowRight'?1:-1)+n)%n;
      e.preventDefault();setTab(next);const t=$(`[data-loan-tab="${next}"]`,modal);if(t)t.focus();return;
    }
    if(e.key==='Tab'){
      const f=$$('button,a[href]',$('.loan-modal-panel',modal)).filter(x=>x.tabIndex>=0&&!x.disabled);
      if(!f.length)return;
      const first=f[0],last=f[f.length-1];
      if(!$('.loan-modal-panel',modal).contains(document.activeElement)){e.preventDefault();first.focus()}
      else if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}
      else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}
    }
  });

  const previousRefresh=refresh;
  refresh=function(){
    previousRefresh();
    teardown();
    const g=$(GROUP);
    if(!g)return;
    buildList(g);
    if(!hashDone&&location.hash){
      const idx=indexFromHash(location.hash);
      if(idx>-1){hashDone=true;setTimeout(()=>open(idx),250)}
    }
  };
})();


function quickLinksMarkup(){
  const ta=state.lang==='ta';
  const links=[
    ['https://kooturavu.tn.gov.in/','Tamil Nadu Co-operation Department','தமிழ்நாடு கூட்டுறவுத் துறை'],
    ['https://www.tn.gov.in/','Government of Tamil Nadu','தமிழ்நாடு அரசு'],
    ['https://www.rbi.org.in/','Reserve Bank of India','இந்திய ரிசர்வ் வங்கி'],
    ['https://www.dicgc.org.in/','DICGC (deposit insurance)','DICGC (வைப்புக் காப்பீடு)'],
    ['https://www.ckycindia.in/ckyc/?r=home','CKYC India','CKYC இந்தியா'],
    ['https://cms.rbi.org.in/cms/indexpage.html#eng','RBI Complaint Management System','RBI புகார் மேலாண்மை அமைப்பு'],
    ['https://www.npci.org.in/','NPCI','NPCI'],
    ['https://ckycregistry.co.in/','CKYC Registry','CKYC பதிவகம்']
  ];
  return `<div class="footer-quick"><h3>${tr('quickLinks')}</h3>${links.map(l=>`<a href="${l[0]}" target="_blank" rel="noopener noreferrer">${ta?l[2]:l[1]}</a>`).join('')}</div>`;
}


/* Map form titles (English) to the PDF files in the project folder */
const PDF_BASE='';   // if the PDFs are inside a folder, e.g. 'forms/', put that here
const PDF_FILES={
  'account opening form':[['','Savings_Account_Opening_Form.pdf']],
  'kyc form':[['Legal Entity','KYC_Form_Legal_Entity.pdf',1]],
  'kyc form (individual)':[['','KYC_Form_Individual.pdf']],
  'sms alert application form':[['','SMS_Application_Form.docx']],
  'nomination form':[['','Nomination_Form.pdf']]
};
/* Annual reports – to add a new year, copy one line, change year + file, upload the PDF */
const ANNUAL_REPORTS=[
  {year:2026,file:'Arcot-UCB-Annual-Report-2026.pdf',en:'Audited Balance Sheet, Profit & Loss Account and Notes on Accounts as on 31-03-2026',ta:'31-03-2026 நிலவரப்படி தணிக்கை செய்யப்பட்ட இருப்புநிலைக் குறிப்பு, இலாப நட்டக் கணக்கு மற்றும் கணக்குக் குறிப்புகள்'}
];
ANNUAL_REPORTS.forEach(r=>{PDF_FILES['annual report '+r.year]=[['',r.file]]});
function pdfFor(item){
  const t=item.title??item.name??item.label;
  const key=String(t&&typeof t==='object'?(t.en||''):(t||'')).trim().toLowerCase();
  return PDF_FILES[key]||[];
}

/* ===== Scroll animation for values, stages and history ===== */
(function(){
  const sel='.history-timeline,.stages,.values-inline';
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const io='IntersectionObserver' in window
    ?new IntersectionObserver(entries=>entries.forEach(e=>{
        if(e.isIntersecting){e.target.classList.add('in-view');io.unobserve(e.target)}
      }),{threshold:.15})
    :null;

  function scan(){
    document.querySelectorAll(sel).forEach(el=>{
      if(el.dataset.anim) return;
      el.dataset.anim='1';
      [...el.children].forEach((c,i)=>c.style.setProperty('--i',i));
      if(!io||reduce){el.classList.add('in-view');return}
      io.observe(el);
    });
  }

  scan();
  new MutationObserver(scan).observe(document.body,{childList:true,subtree:true});
})();


/* ===== Full-colour SVG icons for the quick services bar ===== */
(function(){
  const svg=p=>`<svg class="qi" viewBox="0 0 48 48" aria-hidden="true">${p}</svg>`;
  const icons={
    saving:`<rect x="10" y="8" width="28" height="9" rx="3" fill="#F2B705"/><rect x="6" y="13" width="36" height="28" rx="6" fill="#2E7D5B"/><rect x="27" y="22" width="15" height="11" rx="5" fill="#1F5E43"/><circle cx="34" cy="27.5" r="2.2" fill="#F2B705"/>`,
    fixed:`<path d="M16 22v-6a8 8 0 0 1 16 0v6" fill="none" stroke="#6B7788" stroke-width="4" stroke-linecap="round"/><rect x="9" y="22" width="30" height="21" rx="6" fill="#F2B705"/><circle cx="24" cy="31" r="3.2" fill="#8A5A00"/><rect x="22.6" y="32" width="2.8" height="6.5" rx="1.4" fill="#8A5A00"/>`,
    goldLoan:`<path d="M10 32v4c0 3.3 6.3 6 14 6s14-2.7 14-6v-4z" fill="#C98A00"/><ellipse cx="24" cy="32" rx="14" ry="6" fill="#F2B705"/><path d="M10 24v4c0 3.3 6.3 6 14 6s14-2.7 14-6v-4z" fill="#C98A00"/><ellipse cx="24" cy="24" rx="14" ry="6" fill="#F2B705"/><path d="M10 16v4c0 3.3 6.3 6 14 6s14-2.7 14-6v-4z" fill="#C98A00"/><ellipse cx="24" cy="16" rx="14" ry="6" fill="#FFCF33"/><ellipse cx="24" cy="16" rx="8" ry="3" fill="none" stroke="#C98A00" stroke-width="1.5"/>`,
    atm:`<rect x="5" y="11" width="38" height="26" rx="5" fill="#1F6FEB"/><rect x="5" y="17" width="38" height="6" fill="#0B3D91"/><rect x="10" y="28" width="12" height="5" rx="1.8" fill="#F2B705"/><rect x="27" y="29.5" width="11" height="2.2" rx="1.1" fill="#B9D2FF"/>`,
    transfer:`<path d="M8 17h26" stroke="#1F6FEB" stroke-width="4" stroke-linecap="round"/><path d="m28 10 8 7-8 7" fill="none" stroke="#1F6FEB" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M40 31H14" stroke="#F26B1D" stroke-width="4" stroke-linecap="round"/><path d="m20 24-8 7 8 7" fill="none" stroke="#F26B1D" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>`,
    emi:`<rect x="9" y="4" width="30" height="40" rx="5" fill="#5B6B85"/><rect x="13" y="8.5" width="22" height="10" rx="2.5" fill="#BFE7D2"/><circle cx="17" cy="26" r="2.6" fill="#fff"/><circle cx="24" cy="26" r="2.6" fill="#fff"/><circle cx="31" cy="26" r="2.6" fill="#F26B1D"/><circle cx="17" cy="33" r="2.6" fill="#fff"/><circle cx="24" cy="33" r="2.6" fill="#fff"/><circle cx="31" cy="33" r="2.6" fill="#F26B1D"/><circle cx="17" cy="39.5" r="2.2" fill="#fff"/><circle cx="24" cy="39.5" r="2.2" fill="#fff"/>`,
    menuBranches:`<path d="M24 45s-14-11.5-14-23a14 14 0 0 1 28 0c0 11.5-14 23-14 23z" fill="#E5484D"/><circle cx="24" cy="22" r="5.6" fill="#fff"/>`,
    menuDownloads:`<path d="M12 4h16l10 10v27a3 3 0 0 1-3 3H12a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3z" fill="#EEF2F7" stroke="#B8C3D1" stroke-width="1.5"/><path d="M28 4v8a2 2 0 0 0 2 2h8z" fill="#CBD5E1"/><rect x="14" y="20" width="12" height="2.5" rx="1.2" fill="#B8C3D1"/><rect x="14" y="26" width="8" height="2.5" rx="1.2" fill="#B8C3D1"/><circle cx="33" cy="35" r="9" fill="#2E9E6B"/><path d="M33 30v9" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/><path d="m29.5 35.5 3.5 3.5 3.5-3.5" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`
  };
  quick.forEach(q=>{ if(icons[q[1]]) q[0]=svg(icons[q[1]]); });
})();

/* Contact form: posts to CONTACT_ENDPOINT (for example a Formspree URL). If it is empty, opens the visitor's email app instead. */
(function(){
  const CONTACT_ENDPOINT='';
  const T={
    en:{sending:'Sending...',ok:'Thank you. Your message has been sent. We will contact you soon.',fail:'Sorry, your message could not be sent. Please try again or call the Bank.',mail:'Your email app should open. If it does not, please email us at '},
    ta:{sending:'அனுப்பப்படுகிறது...',ok:'நன்றி. உங்கள் செய்தி அனுப்பப்பட்டது. விரைவில் உங்களைத் தொடர்பு கொள்வோம்.',fail:'மன்னிக்கவும், செய்தியை அனுப்ப முடியவில்லை. மீண்டும் முயற்சிக்கவும் அல்லது வங்கியை அழைக்கவும்.',mail:'உங்கள் மின்னஞ்சல் செயலி திறக்கும். திறக்கவில்லை என்றால் இந்த முகவரிக்கு எழுதுங்கள்: '}
  };
  document.addEventListener('submit',async function(e){
    const form=e.target.closest&&e.target.closest('[data-contact-form]');
    if(!form)return;
    e.preventDefault();
    const t=T[form.dataset.lang]||T.en,status=form.querySelector('.form-status'),btn=form.querySelector('button[type="submit"]');
    if(form.elements._gotcha&&form.elements._gotcha.value)return;
    if(!form.checkValidity()){form.reportValidity();return}
    const data=Object.fromEntries(new FormData(form));delete data._gotcha;
    status.className='form-status';status.textContent='';
    if(CONTACT_ENDPOINT){
      const label=btn.textContent;btn.disabled=true;btn.textContent=t.sending;
      try{
        const r=await fetch(CONTACT_ENDPOINT,{method:'POST',headers:{'Accept':'application/json','Content-Type':'application/json'},body:JSON.stringify(data)});
        if(!r.ok)throw new Error('HTTP '+r.status);
        form.reset();status.classList.add('ok');status.textContent=t.ok;
      }catch(err){status.classList.add('error');status.textContent=t.fail}
      finally{btn.disabled=false;btn.textContent=label}
      return;
    }
    const to=form.dataset.mailto;
    if(!to){status.classList.add('error');status.textContent=t.fail;return}
    const body='Name: '+(data.name||'')+'\nMobile: '+(data.mobile||'')+'\nEmail: '+(data.email||'')+'\n\n'+(data.message||'');
    location.href='mailto:'+to+'?subject='+encodeURIComponent(data.subject||'Website enquiry')+'&body='+encodeURIComponent(body);
    status.classList.add('ok');status.textContent=t.mail+to;
  });
})();


/* ===== Bank name: forces Arcot CUB even if data/en.json or data/ta.json still say Banda ===== */
function applyBrandName(){const en='The Arcot Co-operative Urban Bank Limited',ta='ஆற்காடு கூட்டுறவு நகர்ப்புற வங்கி லிமிடெட்';state.data.en=state.data.en||{};state.data.ta=state.data.ta||{};state.data.en.bankName=en;state.data.ta.bankName=ta;const fix=o=>{Object.keys(o).forEach(k=>{if(typeof o[k]==='string')o[k]=o[k].replace(/Banda Urban Co-?operative Bank( Ltd\.?)?/gi,en).replace(/Banda UCB/gi,'Arcot UCB').replace(/பாண்டா/g,'ஆற்காடு')})};fix(state.data.en);fix(state.data.ta)}
/* ===== Site logo: tries other folders if logos/Logo.jpg is not found; also sets favicon ===== */
const BRAND_LOGO_PATHS=['logos/Logo.png'];
function brandLogoFallback(img){const n=(+img.dataset.try||0)+1;if(n<BRAND_LOGO_PATHS.length){img.dataset.try=n;img.src=BRAND_LOGO_PATHS[n]}else{img.onerror=null;console.warn('Logo.png not found in any logo folder')}}
(function(){if(document.querySelector('link[rel~="icon"]'))return;const l=document.createElement('link');l.rel='icon';l.href=BRAND_LOGO_PATHS[0];document.head.appendChild(l);const t=new Image();t.onerror=()=>{const alt=BRAND_LOGO_PATHS.slice(1);let i=0;const next=()=>{if(i>=alt.length)return;const im=new Image();im.onload=()=>{l.href=im.src};im.onerror=next;im.src=alt[i++]};next()};t.src=BRAND_LOGO_PATHS[0]})();

/* ===== PNG logos (edit LOGO_DIR if your logos folder is elsewhere) ===== */
const LOGO_DIRS=['logos/'];
function logoFallback(img){const n=(+img.dataset.try||0)+1;if(n<LOGO_DIRS.length){img.dataset.try=n;img.src=LOGO_DIRS[n]+img.dataset.file}else{img.onerror=null;console.warn('Logo not found:',img.dataset.file)}}
const logoImg=(file,cls)=>`<span class="${cls} icon-themed" role="img" aria-hidden="true" style="-webkit-mask-image:url('${LOGO_DIRS[0]}${file}');mask-image:url('${LOGO_DIRS[0]}${file}')"></span>`;
/* Top quick-services strip: key -> file */
(function(){
  const files={saving:'Savings.png',fixed:'FixedDposit.png',goldLoan:'goldLoan.png',atm:'ATM.png',transfer:'neft.png',emi:'Emi.png',menuBranches:'HeadOfficeLo.png',menuDownloads:'forms.png'};
  quick.forEach(q=>{ if(files[q[1]]) q[0]=logoImg(files[q[1]],'qi'); });
})();
/* "Explore our products & services" cards: deposits tab, in card order */
const productLogos={
  deposits:['SavingsAccount.png','CurrentAccount.png','FixedDposit.png','RecurringDeposit.png'],
  loans:['personalloan.png','goldLoan.png','Vehicleloan.png','Housingloan.png'],
  services:['ATM.png','neft.png','Mobilebanking.png','Smsalerts.png']
};
function productIcon(type,i,it){
  const f=(productLogos[type]||[])[i];
  return f?logoImg(f,'product-logo'):(it.icon||'\u25c8');
}

/* ===== UX polish for every page: scroll-reveal, page fade, button ripple, header shadow ===== */
(function(){
  if(matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  document.documentElement.classList.add('ux-ready');

  const SEL='.section-heading,.product-card,.info-card,.content-product,.detail-block,.rates-card,.notices-card,.calculator-shell,.trust-item,.branch-banner-inner,.why-stat,.goal-chips a,.notice-row,.coop-principles,.page-hero .container>*,.download-row,.value-chip,.quick-item';

  /* 1. Reveal on scroll, with a small stagger between siblings */
  const io='IntersectionObserver' in window
    ?new IntersectionObserver(entries=>entries.forEach(e=>{
        if(!e.isIntersecting) return;
        const el=e.target; io.unobserve(el); el.classList.add('ux-in');
        setTimeout(()=>el.classList.remove('ux-hide','ux-in'),1300); /* hand control back to normal hover styles */
      }),{threshold:.1,rootMargin:'0px 0px -6% 0px'})
    :null;
  function prep(el){
    if(!io||el.__ux||el.classList.contains('reveal')||el.closest('.hero,.theme-widget,.site-footer')) return;
    el.__ux=1;
    const sibs=Array.from(el.parentElement.children).filter(c=>c.matches(SEL));
    el.style.setProperty('--ux-d',Math.min(sibs.indexOf(el),6)*70+'ms');
    el.classList.add('ux-hide'); io.observe(el);
  }
  let queued=false;
  function scan(){queued=false;document.querySelectorAll(SEL).forEach(prep)}
  const queue=()=>{if(!queued){queued=true;requestAnimationFrame(scan)}};
  scan();
  new MutationObserver(queue).observe(document.body,{childList:true,subtree:true}); /* pages and tabs render later */

  /* 2. Soft fade when leaving to another page of the site */
  document.addEventListener('click',e=>{
    const a=e.target.closest&&e.target.closest('a[href]');
    if(!a||e.defaultPrevented||e.button||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey) return;
    if((a.target&&a.target!=='_self')||a.hasAttribute('download')) return;
    const u=new URL(a.href,location.href);
    if(u.origin!==location.origin||u.pathname===location.pathname||!/(\.html?|\/)$/.test(u.pathname)) return;
    e.preventDefault(); document.body.classList.add('ux-leaving');
    setTimeout(()=>{location.href=u.href},200);
  });
  addEventListener('pageshow',e=>{if(e.persisted) document.body.classList.remove('ux-leaving')});

  /* 3. Ripple on buttons */
  document.addEventListener('pointerdown',e=>{
    const b=e.target.closest&&e.target.closest('.button,.goal-chips a'); if(!b) return;
    const r=b.getBoundingClientRect(),s=Math.max(r.width,r.height)*2,el=document.createElement('span');
    el.className='ux-ripple';
    el.style.cssText='width:'+s+'px;height:'+s+'px;left:'+(e.clientX-r.left-s/2)+'px;top:'+(e.clientY-r.top-s/2)+'px';
    b.appendChild(el); setTimeout(()=>el.remove(),600);
  });

  /* 4. Header shadow once the page is scrolled */
  const onScroll=()=>document.body.classList.toggle('ux-scrolled',scrollY>8);
  addEventListener('scroll',onScroll,{passive:true}); onScroll();
})();

/* ===== Remove "Stay alert / never asks for OTP" ticker notice from home page ===== */
(function(){
  function clean(){
    var bar=document.querySelector('.notice-ticker');
    if(!bar)return;
    bar.querySelectorAll('[data-i18n="tickerAlert"],[data-i18n="fraudNotice"]').forEach(function(el){el.remove()});
    bar.querySelectorAll('.ticker-track span').forEach(function(s){
      if(/OTP|PIN|card details/i.test(s.textContent))s.remove();
    });
    if(!bar.querySelector('.ticker-track span'))bar.remove();
  }
  document.addEventListener('DOMContentLoaded',clean);
  new MutationObserver(clean).observe(document.documentElement,{childList:true,subtree:true});
})();


/* ===== Footer cleanup on every page: no fraud-alert box, no demo disclaimer ===== */
(function(){
  function cleanFooter(){
    document.querySelectorAll('.site-footer .footer-safety').forEach(function(el){el.remove()});
    document.querySelectorAll('.site-footer .footer-bottom p').forEach(function(el){
      if(/Demonstration website|placeholders until verified|never asks for your OTP/i.test(el.textContent)||el.matches('[data-i18n="demoDisclaimer"]'))el.remove();
    });
  }
  document.addEventListener('DOMContentLoaded',cleanFooter);
  new MutationObserver(cleanFooter).observe(document.documentElement,{childList:true,subtree:true});
})();


/* ===== Remove "Sample data" badge from every page hero ===== */
(function(){
  function rm(){document.querySelectorAll('.sample-data-badge').forEach(function(el){el.remove()})}
  document.addEventListener('DOMContentLoaded',rm);
  new MutationObserver(rm).observe(document.documentElement,{childList:true,subtree:true});
})();


/* ===== Internet Banking button: friendly "launching soon" pop-up ===== */
(function(){
  let box=null,lastFocus=null;
  const text=()=>state.lang==='ta'
    ?{badge:'விரைவில் வருகிறது',title:'இணைய வங்கிச் சேவை விரைவில் தொடங்குகிறது',msg:'உங்கள் வசதிக்காக பாதுகாப்பான, எளிமையான இணைய வங்கிச் சேவையை உருவாக்கி வருகிறோம். விரைவில் நல்ல செய்தியுடன் சந்திப்போம்!',chips:['24x7 வசதி','பாதுகாப்பானது','எளிமையானது'],note:'அதுவரை, உங்கள் அருகிலுள்ள கிளையை அணுகுங்கள் - எங்கள் குழு உதவ மகிழ்ச்சியடையும்.',contact:'தொடர்பு கொள்ள',close:'மூடு'}
    :{badge:'Coming Soon',title:'Internet Banking is launching soon',msg:'We are building a safe and simple internet banking service for your convenience. Something good is coming your way very soon!',chips:['Available 24x7','Safe and secure','Easy to use'],note:'Until then, visit your nearest branch - our team will be happy to help you.',contact:'Contact Us',close:'Close'};
  function build(){
    const t=text();
    if(box)box.remove();
    box=document.createElement('div');
    box.className='soon-modal';
    box.innerHTML=`<div class="soon-modal-card" role="dialog" aria-modal="true" aria-labelledby="soon-modal-title"><button type="button" class="soon-modal-x" aria-label="${t.close}">&times;</button><span class="coming-soon-badge"><i aria-hidden="true"></i>${t.badge}</span><h2 id="soon-modal-title">${t.title}</h2><p>${t.msg}</p><ul class="coming-soon-chips">${t.chips.map(c=>`<li>${c}</li>`).join('')}</ul><p class="coming-soon-note">${t.note}</p><div class="soon-modal-actions"><a class="button" href="contact.html">${t.contact}</a><button type="button" class="button button-outline soon-modal-close">${t.close}</button></div></div>`;
    document.body.appendChild(box);
  }
  function open(){
    lastFocus=document.activeElement;
    build();
    requestAnimationFrame(()=>{box.classList.add('open');const b=box.querySelector('.soon-modal-close');if(b)b.focus()});
  }
  function close(){
    if(!box)return;
    const b=box;box=null;b.classList.remove('open');
    setTimeout(()=>b.remove(),250);
    if(lastFocus&&lastFocus.focus)lastFocus.focus();
  }
  document.addEventListener('click',e=>{
    const link=e.target.closest('[data-i18n="internet"]');
    if(link){e.preventDefault();e.stopPropagation();open();return}
    if(!box)return;
    if(e.target===box||e.target.closest('.soon-modal-x,.soon-modal-close'))close();
  },true);
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&box)close()});
})();

/* ===== "Coming Soon" tag on top of the Internet Banking button ===== */
(function(){
  function tag(){
    const label=state.lang==='ta'?'விரைவில்':'Coming Soon';
    document.querySelectorAll('[data-i18n="internet"]').forEach(a=>{if(a.getAttribute('data-soon')!==label)a.setAttribute('data-soon',label)});
  }
  const prev=refresh;refresh=function(){prev();tag()};
  new MutationObserver(tag).observe(document.body,{childList:true,subtree:true});
  document.addEventListener('DOMContentLoaded',tag);
  tag();
})();

/* ===== History timeline: Bebas Neue font + scroll-driven line and row reveal ===== */
(function(){
  if(!document.querySelector('link[data-bebas]')){
    const l=document.createElement('link');
    l.rel='stylesheet';l.href='https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap';l.dataset.bebas='1';
    document.head.appendChild(l);
  }
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const lists=new Set();
  function update(){
    const line=innerHeight*0.6; // trigger point: lower number = later, higher = earlier
    lists.forEach(tl=>{
      if(!tl.isConnected){lists.delete(tl);return}
      const r=tl.getBoundingClientRect();
      tl.style.setProperty('--p',reduce?1:Math.max(0,Math.min(1,(line-r.top)/r.height)));
      tl.querySelectorAll(':scope>li').forEach(li=>li.classList.toggle('tl-in',reduce||li.getBoundingClientRect().top<line));
    });
  }
  function scan(){document.querySelectorAll('.history-timeline').forEach(tl=>lists.add(tl));update()}
  addEventListener('scroll',update,{passive:true});
  addEventListener('resize',update);
  new MutationObserver(scan).observe(document.body,{childList:true,subtree:true});
  scan();
})();


/* ===== KYC: fill the PDF form online (opens in a pop-up viewer) ===== */
(function(){
  let lastFocus=null;
  const TXT={
    en:{close:'Close',blank:'Download blank form',tab:'Open in new tab',hint:'Fill in the fields, then use the download / save icon in the PDF toolbar to save your completed form. Your details stay on your device and are not uploaded.'},
    ta:{close:'\u0bae\u0bc2\u0b9f\u0bc1',blank:'\u0b95\u0bbe\u0bb2\u0bbf\u0baa\u0bcd \u0baa\u0b9f\u0bbf\u0bb5\u0ba4\u0bcd\u0ba4\u0bc8\u0baa\u0bcd \u0baa\u0ba4\u0bbf\u0bb5\u0bbf\u0bb1\u0b95\u0bcd\u0b95\u0bc1',tab:'\u0baa\u0bc1\u0ba4\u0bbf\u0baf \u0ba4\u0bbe\u0bb5\u0bb2\u0bbf\u0bb2\u0bcd \u0ba4\u0bbf\u0bb1',hint:'\u0baa\u0bc1\u0bb2\u0b99\u0bcd\u0b95\u0bb3\u0bc8 \u0ba8\u0bbf\u0bb0\u0baa\u0bcd\u0baa\u0bbf\u0baf \u0baa\u0bbf\u0bb1\u0b95\u0bc1, PDF \u0b95\u0bb0\u0bc1\u0bb5\u0bbf\u0baa\u0bcd\u0baa\u0b9f\u0bcd\u0b9f\u0bc8\u0baf\u0bbf\u0bb2\u0bcd \u0b89\u0bb3\u0bcd\u0bb3 \u0baa\u0ba4\u0bbf\u0bb5\u0bbf\u0bb1\u0b95\u0bcd\u0b95\u0bae\u0bcd / \u0b9a\u0bc7\u0bae\u0bbf \u0b90\u0b95\u0bbe\u0ba9\u0bc8 \u0b85\u0bb4\u0bc1\u0ba4\u0bcd\u0ba4\u0bbf \u0ba8\u0bbf\u0bb0\u0baa\u0bcd\u0baa\u0bbf\u0baf \u0baa\u0b9f\u0bbf\u0bb5\u0ba4\u0bcd\u0ba4\u0bc8\u0b9a\u0bcd \u0b9a\u0bc7\u0bae\u0bbf\u0b95\u0bcd\u0b95\u0bb5\u0bc1\u0bae\u0bcd. \u0b89\u0b99\u0bcd\u0b95\u0bb3\u0bcd \u0ba4\u0b95\u0bb5\u0bb2\u0bcd \u0b89\u0b99\u0bcd\u0b95\u0bb3\u0bcd \u0b9a\u0bbe\u0ba4\u0ba9\u0ba4\u0bcd\u0ba4\u0bbf\u0bb2\u0bc7\u0baf\u0bc7 \u0b87\u0bb0\u0bc1\u0b95\u0bcd\u0b95\u0bc1\u0bae\u0bcd; \u0baa\u0ba4\u0bbf\u0bb5\u0bc7\u0bb1\u0bcd\u0bb1\u0baa\u0bcd\u0baa\u0b9f\u0bbe\u0ba4\u0bc1.'}
  };
  function close(){
    const m=document.querySelector('.fill-modal');
    if(!m)return;
    m.remove();
    document.body.classList.remove('fill-open');
    document.removeEventListener('keydown',onKey);
    if(lastFocus&&lastFocus.focus)lastFocus.focus();
  }
  function onKey(e){if(e.key==='Escape')close()}
  function open(url,title,trigger){
    /* Phones/tablets and browsers without a built-in PDF viewer: open the PDF in a new tab instead */
    if(navigator.pdfViewerEnabled===false||matchMedia('(pointer:coarse) and (max-width:900px)').matches){window.open(url,'_blank','noopener');return}
    close();
    lastFocus=trigger;
    const t=TXT[state.lang==='ta'?'ta':'en'];
    const m=document.createElement('div');
    m.className='fill-modal';
    m.setAttribute('role','dialog');
    m.setAttribute('aria-modal','true');
    m.setAttribute('aria-labelledby','fill-title');
    m.innerHTML='<div class="fill-card"><div class="fill-head"><h2 id="fill-title"></h2><div class="fill-actions"><a class="fill-link" data-fill-blank download></a><a class="fill-link" data-fill-tab target="_blank" rel="noopener"></a><button type="button" class="fill-close">&times;</button></div></div><p class="fill-hint"></p><iframe class="fill-frame"></iframe></div>';
    m.querySelector('#fill-title').textContent=title||'';
    m.querySelector('.fill-hint').textContent=t.hint;
    const blank=m.querySelector('[data-fill-blank]'),tab=m.querySelector('[data-fill-tab]'),x=m.querySelector('.fill-close'),f=m.querySelector('.fill-frame');
    blank.href=url;blank.textContent=t.blank;
    tab.href=url;tab.textContent=t.tab;
    x.setAttribute('aria-label',t.close);
    f.title=title||'PDF form';
    f.src=url+'#toolbar=1&navpanes=0&view=FitH';
    m.addEventListener('click',e=>{if(e.target===m||e.target.closest('.fill-close'))close()});
    document.addEventListener('keydown',onKey);
    document.body.appendChild(m);
    document.body.classList.add('fill-open');
    x.focus();
  }
  document.addEventListener('click',e=>{
    const b=e.target.closest('[data-fill-pdf]');
    if(!b)return;
    e.preventDefault();
    open(b.dataset.fillPdf,b.dataset.fillName,b);
  });
})();

/* Rates & Charges: loan rates from the central rates data */
(function(){
  function build(){
    if(document.body.dataset.page!=='rates')return;
    const top=$('.rates-page-top');
    if(!top||top.dataset.loanRatesBuilt)return;
    top.dataset.loanRatesBuilt='1';
    const loanBlock=$$('.rates-page-block',top)[1];
    if(!loanBlock)return;
    $$('.table-scroll,.loan-rates-note,.loan-rates-footnote',loanBlock).forEach(x=>x.remove());
    const loans=state.data.rates?.loans||[],ta=state.lang==='ta';
    const rows=loans.map(x=>`<tr><td>${localized(x.title)}</td><td>${Number(x.rate)}%${x.footnote?'*':''}</td></tr>`).join('');
    const hasFootnote=loans.some(x=>x.footnote);
    loanBlock.insertAdjacentHTML('beforeend',`<div class="table-scroll"><table class="data-table rates-page-table rates-page-loans"><thead><tr><th scope="col">${tr('loanTypeName')}</th><th scope="col">${tr('interestRateAnnual')}</th></tr></thead><tbody>${rows}</tbody></table></div>${hasFootnote?`<p class="fine-print loan-rates-footnote">${state.data.rates?.loanFootnote?.[state.lang]||''}</p>`:''}<p class="fine-print loan-rates-note">${state.data.rates?.savingsNote?.[state.lang]||''}</p>`);
  }
  const prev=refresh;refresh=function(){prev();build()};
})();


/* Rates & Charges: Loan rates + Service charges in the same one-by-one structure */
(function(){
  const T={
    en:{loanTitle:'Current Rates'},
    ta:{loanTitle:'தற்போதைய வட்டி விகிதங்கள்'}
  };
  function tidyRates(){
    if(document.body.dataset.page!=='rates')return;
    const t=T[state.lang==='ta'?'ta':'en'];

    /* Loan block: same heading + intro line as the Fixed deposit block */
    const loan=$('.rates-page-top > .rates-page-block');
    if(loan){
      const h=$('h2',loan);if(h)h.textContent=t.loanTitle;
      const slot=$('.rates-page-note-slot',loan);
      if(slot)slot.remove();
    }

    /* Service charges are already split evenly into separate tables at render time. */
  }
  const prevRefresh=refresh;refresh=function(){prevRefresh();tidyRates()};
  tidyRates();
})();

/* ===== NOTICE POP-UP: "Inoperative Account? Reactivate Now!" (home page) =====
   TO EDIT TEXT : change NOTICE_POPUP.text below (English + Tamil).
   TO TURN OFF  : set NOTICE_POPUP.enabled=false  (or delete this whole block).
   SHOWN        : on the home page, once per browser visit (set showOnce=false to show on every load). */
const NOTICE_POPUP={
  enabled:true,
  showOnce:true,
  delay:600,                        /* milliseconds after the page loads */
  key:'arcot-notice-reactivate-2026-09',
  branchLink:'branches.html',       /* "Find Branch" button */
  deafLink:'deaf-accounts.html',    /* small link to the DEAF accounts search page */
  pdfLink:'In-opp-Account-30-09-2026.pdf',   /* the list PDF: copy it into the same folder as your html pages (or change this path). Set to '' to hide the button */
  text:{
    en:{title:'Inoperative Account? Reactivate Now!',
        msg:'Visit your branch with your Re-KYC documents to make your account operative and enjoy uninterrupted banking benefits.',
        warn:'Balances unclaimed for 10 years are transferred to the RBI\u2019s DEAF. Act now to avoid this.',
        branch:'Find Branch',pdf:'View inoperative accounts list (PDF)',close:'Close',docs:'Documents required',deaf:'Check the DEAF accounts list',
        list:['Aadhaar or other Officially Valid Document (OVD)','PAN card or Form 60','Recent passport-size photograph','Latest address proof, if the address has changed','Mobile number and email ID for updates']},
    ta:{title:'செயலற்ற கணக்கா? இப்போதே மீண்டும் செயல்படுத்துங்கள்!',
        msg:'தடையற்ற வங்கிச் சேவைகளைத் தொடர, உங்கள் Re-KYC ஆவணங்களுடன் கிளைக்கு வந்து உங்கள் கணக்கைச் செயல்பாட்டில் கொண்டு வாருங்கள்.',
        warn:'10 ஆண்டுகள் உரிமை கோரப்படாத இருப்புத் தொகை இந்திய ரிசர்வ் வங்கியின் DEAF நிதிக்கு மாற்றப்படும். இதைத் தவிர்க்க உடனே நடவடிக்கை எடுங்கள்.',
        branch:'கிளையைக் கண்டறிய',pdf:'செயலற்ற கணக்குகள் பட்டியல் (PDF)',close:'மூடு',docs:'தேவையான ஆவணங்கள்',deaf:'DEAF கணக்குகள் பட்டியலைப் பார்க்க',
        list:['ஆதார் அல்லது அலுவல்ரீதியாகச் செல்லுபடியாகும் பிற ஆவணம் (OVD)','பான் அட்டை அல்லது படிவம் 60','சமீபத்திய பாஸ்போர்ட் அளவு புகைப்படம்','முகவரி மாறியிருந்தால் சமீபத்திய முகவரிச் சான்று','தகவல்களுக்கான மொபைல் எண் மற்றும் மின்னஞ்சல் முகவரி']}
  }
};
(function(){
  if(!NOTICE_POPUP.enabled)return;
  let box=null,lastFocus=null;
  const isHome=()=>!!document.querySelector('.hero')||/(^|\/)(index\.html)?$/.test(location.pathname);
  const seen=()=>{try{return sessionStorage.getItem(NOTICE_POPUP.key)==='1'}catch(e){return false}};
  const mark=()=>{try{sessionStorage.setItem(NOTICE_POPUP.key,'1')}catch(e){}};
  function build(){
    const t=NOTICE_POPUP.text[state.lang==='ta'?'ta':'en'];
    if(box)box.remove();
    box=document.createElement('div');
    box.className='soon-modal notice-pop';
    box.innerHTML=`<div class="soon-modal-card notice-pop-card" role="dialog" aria-modal="true" aria-labelledby="notice-pop-title"><button type="button" class="soon-modal-x" aria-label="${t.close}">&times;</button><h2 id="notice-pop-title">${t.title}</h2><p>${t.msg}</p><p class="notice-pop-warn">${t.warn}</p><div class="soon-modal-actions"><a class="button" href="${NOTICE_POPUP.branchLink}">${t.branch}</a>${NOTICE_POPUP.pdfLink?`<a class="button button-light notice-pop-pdf" href="${encodeURI(NOTICE_POPUP.pdfLink)}" target="_blank" rel="noopener">${t.pdf}</a>`:''}<button type="button" class="button button-outline soon-modal-close">${t.close}</button></div><details class="notice-pop-docs"><summary>${t.docs}</summary><ul>${t.list.map(x=>`<li>${x}</li>`).join('')}</ul></details><a class="notice-pop-deaf" href="${NOTICE_POPUP.deafLink}">${t.deaf}</a></div>`;
    document.body.appendChild(box);
  }
  function open(){
    if(box||!isHome()||(NOTICE_POPUP.showOnce&&seen()))return;
    mark();lastFocus=document.activeElement;build();
    requestAnimationFrame(()=>{box.classList.add('open');const b=box.querySelector('.soon-modal-close');if(b)b.focus()});
  }
  function close(){
    if(!box)return;
    const b=box;box=null;b.classList.remove('open');
    setTimeout(()=>b.remove(),250);
    if(lastFocus&&lastFocus.focus)lastFocus.focus();
  }
  document.addEventListener('click',e=>{
    if(!box)return;
    if(e.target===box||e.target.closest('.notice-pop .soon-modal-x,.notice-pop .soon-modal-close'))close();
  });
  document.addEventListener('keydown',e=>{
    if(!box)return;
    if(e.key==='Escape'){close();return}
    if(e.key==='Tab'){   /* keep keyboard focus inside the pop-up */
      const f=[...box.querySelectorAll('button,a[href],summary')];if(!f.length)return;
      const first=f[0],last=f[f.length-1];
      if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}
      else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}
    }
  });
  window.addEventListener('load',()=>setTimeout(open,NOTICE_POPUP.delay));
})();