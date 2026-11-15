(() => {
  const strings = {
    en:{chooseNews:'Choose a live channel',openOfficial:'Open on YouTube ↗',newsNote:'The YouTube player controls playback. The broadcaster or YouTube may require sign-in or restrict availability by country.',moneyKicker:'EARNING FROM STREAMS',moneyTitle:'Free to watch isn’t free to monetize',moneyBody:'Google says ad revenue shown inside an embedded YouTube video goes to YouTube and the video owner—not the website hosting it.',rightsNote:'No site ads are active. Commercial use needs rights that cover this website, audience countries, and monetization; I haven’t found a free license for that yet.',radioKicker:'RADIO',radioBody:'Radio stays off until a station permits in-page playback.',channelLabels:{fox:'LiveNOW from FOX',abcau:'ABC News Australia',channels:'Channels Television',abc7la:'ABC7 Los Angeles',abc7ny:'ABC7 New York',tvc:'TVC News Nigeria',bloomberg:'Bloomberg News',wion:'WION',africanews:'Africanews English'},weatherLoading:'Loading current conditions…',weatherError:'Could not load weather for that place. Check the spelling and try another city.',weatherSearch:'Show weather',weatherCredit:'Weather data provided by',weatherTerms:'Free no-key service; attribution shown. Usage is subject to the provider’s fair-use limits and terms.',feels:'Feels like',humidity:'Humidity',wind:'Wind',updated:'Current conditions',conditions:{'Partially cloudy':'Partly cloudy','Overcast':'Overcast','Clear':'Clear','Rain, Overcast':'Rain','Rain, Partially cloudy':'Rain','Snow, Overcast':'Snow'}},
    fr:{chooseNews:'Choisir une chaîne en direct',openOfficial:'Ouvrir sur YouTube ↗',newsNote:'Le lecteur YouTube contrôle la lecture. Le diffuseur ou YouTube peut demander une connexion ou limiter le direct selon le pays.',moneyKicker:'REVENUS DES DIRECTS',moneyTitle:'Gratuit à regarder ne veut pas dire monétisable gratuitement',moneyBody:'Google indique que les revenus publicitaires dans un lecteur YouTube intégré reviennent à YouTube et au propriétaire de la vidéo, pas au site hôte.',rightsNote:'Aucune publicité n’est active sur le site. L’usage commercial exige des droits couvrant le site, les pays visés et la monétisation ; je n’ai pas encore trouvé de licence gratuite correspondante.',radioKicker:'RADIO',radioBody:'La radio reste désactivée tant qu’une station n’autorise pas la lecture intégrée.',channelLabels:{fox:'LiveNOW from FOX',abcau:'ABC News Australia',channels:'Channels Television',abc7la:'ABC7 Los Angeles',abc7ny:'ABC7 New York',tvc:'TVC News Nigeria',bloomberg:'Bloomberg News',wion:'WION',africanews:'Africanews English'},weatherLoading:'Chargement des conditions actuelles…',weatherError:'Impossible de charger la météo pour ce lieu. Vérifiez l’orthographe ou essayez une autre ville.',weatherSearch:'Afficher la météo',weatherCredit:'Données météo fournies par',weatherTerms:'Service gratuit sans clé ; attribution affichée. Usage soumis aux limites d’utilisation raisonnable et aux conditions du fournisseur.',feels:'Ressenti',humidity:'Humidité',wind:'Vent',updated:'Conditions actuelles',conditions:{'Partially cloudy':'Partiellement nuageux','Overcast':'Couvert','Clear':'Dégagé','Rain, Overcast':'Pluie','Rain, Partially cloudy':'Pluie','Snow, Overcast':'Neige'}},
    ar:{chooseNews:'اختار قناة مباشرة',openOfficial:'فتح فـ YouTube ↗',newsNote:'التحكم فالتشغيل من مشغّل YouTube. ممكن القناة أو YouTube يطلبو تسجيل الدخول أو يقيّدو البث حسب البلد.',moneyKicker:'الربح من البث',moneyTitle:'المشاهدة المجانية ما كتضمنش الربح',moneyBody:'Google كاتقول باللي مداخيل الإعلانات داخل مشغّل YouTube كتمشي لـ YouTube ومالك الفيديو، ماشي للموقع اللي ضامّنو.',rightsNote:'ما كايناش إعلانات فالموقع دابا. الاستعمال التجاري خاصو حقوق كتغطي الموقع والبلدان والربح؛ ما لقيتش ترخيص مجاني واضح لهاد الشي.',radioKicker:'الراديو',radioBody:'الراديو باقي مطفي حتى تسمح المحطة بالتشغيل داخل الموقع.',channelLabels:{fox:'LiveNOW from FOX',abcau:'ABC News Australia',channels:'Channels Television',abc7la:'ABC7 Los Angeles',abc7ny:'ABC7 New York',tvc:'TVC News Nigeria',bloomberg:'Bloomberg News',wion:'WION',africanews:'Africanews English'},weatherLoading:'كنحمّلو حالة الطقس دابا…',weatherError:'ما قدرناش نجيبو الطقس لهاد المكان. تأكد من كتابة المدينة وجرب مرة أخرى.',weatherSearch:'بيّن الطقس',weatherCredit:'بيانات الطقس من',weatherTerms:'الخدمة المجانية بلا مفتاح؛ المصدر مذكور. الاستعمال تابع لحدود الاستخدام المنصف وشروط المزوّد.',feels:'الإحساس بحال',humidity:'الرطوبة',wind:'الريح',updated:'حالة الطقس دابا',conditions:{'Partially cloudy':'غائم جزئياً','Overcast':'مغيم','Clear':'صافي','Rain, Overcast':'شتا ومغيم','Rain, Partially cloudy':'شتا وغيم متفرق','Snow, Overcast':'ثلج'}}
  };
  const lang=document.documentElement.lang||'en', t=strings[lang]||strings.en;
  const channels={
    fox:{name:'LiveNOW from FOX',id:'C96oohpWBGw'},
    abcau:{name:'ABC News Australia',id:'vOTiJkg1voo'},
    channels:{name:'Channels Television',id:'W8nThq62Vb4'},
    abc7la:{name:'ABC7 Los Angeles',id:'s3iVFJoxrYc'},
    abc7ny:{name:'ABC7 New York',id:'VrhYz4CL70I'},
    tvc:{name:'TVC News Nigeria',id:'b-Yzp0l8cAM'},
    bloomberg:{name:'Bloomberg News',id:'DxmDPrfinXY'},
    wion:{name:'WION',id:'vfszY1JYbMc'},
    africanews:{name:'Africanews English',id:'NQjabLGdP5g'}
  };
  const select=document.querySelector('#news-channel'), frame=document.querySelector('#news-frame'), official=document.querySelector('#news-official-link');
  const note=document.querySelector('#news-channel-note');
  if(select&&frame&&official){
    select.setAttribute('aria-label',t.chooseNews);
    for(const option of select.options){if(t.channelLabels[option.value])option.textContent=t.channelLabels[option.value];}
    const setChannel=key=>{const c=channels[key]||channels.fox;const url=`https://www.youtube-nocookie.com/embed/${c.id}?playsinline=1&rel=0`;if(frame.src!==url)frame.src=url;frame.title=`${c.name} live stream`;official.href=`https://www.youtube.com/watch?v=${c.id}`;official.textContent=t.openOfficial;note.textContent=t.newsNote;};
    select.addEventListener('change',()=>setChannel(select.value)); setChannel(select.value);
    document.querySelectorAll('[data-copy]').forEach(el=>{const key=el.dataset.copy;if(t[key])el.textContent=t[key];});
  }
  const guideSearch=document.querySelector('#guide-search');
  const guideCards=[...document.querySelectorAll('[data-channel-card]')];
  const guideFilters=[...document.querySelectorAll('[data-region-filter]')];
  const guideEmpty=document.querySelector('#guide-empty');
  let activeRegion='all';
  const filterGuide=()=>{
    const query=(guideSearch?.value||'').trim().toLocaleLowerCase();
    let visible=0;
    for(const card of guideCards){
      const matchesRegion=activeRegion==='all'||card.dataset.region===activeRegion;
      const matchesQuery=!query||card.textContent.toLocaleLowerCase().includes(query);
      card.hidden=!(matchesRegion&&matchesQuery);
      if(!card.hidden)visible++;
    }
    if(guideEmpty)guideEmpty.hidden=visible!==0;
  };
  guideSearch?.addEventListener('input',filterGuide);
  guideFilters.forEach(button=>button.addEventListener('click',()=>{
    activeRegion=button.dataset.regionFilter||'all';
    guideFilters.forEach(item=>{
      const active=item===button;
      item.classList.toggle('is-active',active);
      item.setAttribute('aria-pressed',String(active));
    });
    filterGuide();
  }));
  document.querySelectorAll('[data-watch-channel]').forEach(button=>button.addEventListener('click',()=>{
    const key=button.dataset.watchChannel;
    if(!select||!channels[key])return;
    select.value=key;
    select.dispatchEvent(new Event('change',{bubbles:true}));
    frame?.scrollIntoView({behavior:'smooth',block:'center'});
  }));
  const form=document.querySelector('#weather-form'), input=document.querySelector('#weather-city'), result=document.querySelector('#weather-result');
  if(!form||!input||!result)return;
  const text=(tag,cls,value)=>{const e=document.createElement(tag);if(cls)e.className=cls;e.textContent=value;return e;};
  const loadWeather=async city=>{
    result.replaceChildren(text('div','weather-loading',t.weatherLoading));
    const endpoint='https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/'+encodeURIComponent(city)+'?unitGroup=metric&include=current&contentType=json';
    try{
      const response=await fetch(endpoint,{headers:{Accept:'application/json'}});if(!response.ok)throw new Error('HTTP '+response.status);
      const data=await response.json(), c=data.currentConditions;if(!c||!Number.isFinite(c.temp))throw new Error('No current conditions');
      const box=document.createElement('div');box.className='weather-data';
      const place=document.createElement('div');place.append(text('div','weather-place',data.resolvedAddress||city));place.append(text('div','weather-summary',`${t.updated} · ${new Intl.DateTimeFormat(lang,{dateStyle:'medium',timeStyle:'short',timeZone:data.timezone}).format(new Date(c.datetimeEpoch*1000))}`));
      box.append(place);box.append(text('div','weather-temperature',`${Math.round(c.temp)}°C`));
      const feels=document.createElement('div');feels.className='weather-stat';feels.append(text('strong','',`${Math.round(c.feelslike)}°C`),text('span','',t.feels));box.append(feels);
      const humidity=document.createElement('div');humidity.className='weather-stat';humidity.append(text('strong','',`${Math.round(c.humidity)}%`),text('span','',t.humidity));box.append(humidity);
      const wind=document.createElement('div');wind.className='weather-stat';wind.append(text('strong','',`${Math.round(c.windspeed)} km/h`),text('span','',t.wind));box.append(wind);
      const condition=t.conditions[c.conditions]||c.conditions||'';if(condition)box.append(text('div','weather-summary',condition));
      result.replaceChildren(box);
    }catch(e){result.replaceChildren(text('div','weather-error',t.weatherError));}
  };
  form.addEventListener('submit',e=>{e.preventDefault();const city=input.value.trim();if(city)loadWeather(city);});
  loadWeather(input.value);
})();
