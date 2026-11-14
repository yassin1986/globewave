(() => {
  const strings = {
    en:{chooseNews:'Choose a live channel',openOfficial:'Official page ↗',newsNote:'Official YouTube embed. YouTube or the broadcaster may apply sign-in, territory, or availability limits.', ajeNote:'YouTube may ask you to sign in or verify before Al Jazeera plays; if blocked, use its official live page.', channelLabels:{f24en:'France 24 English',f24fr:'France 24 Français',f24ar:'France 24 العربية',bbc:'BBC News',aljazeera:'Al Jazeera English'},radioWaiting:'NOT READY',weatherLoading:'Loading current conditions…',weatherError:'Could not load weather for that place. Check the spelling and try another city.',weatherSearch:'Show weather',weatherCredit:'Weather data provided by',weatherTerms:'Free no-key service; attribution shown. Usage is subject to the provider’s fair-use limits and terms.',feels:'Feels like',humidity:'Humidity',wind:'Wind',updated:'Current conditions',conditions:{'Partially cloudy':'Partly cloudy','Overcast':'Overcast','Clear':'Clear','Rain, Overcast':'Rain','Rain, Partially cloudy':'Rain','Snow, Overcast':'Snow'}},
    fr:{chooseNews:'Choisir une chaîne en direct',openOfficial:'Page officielle ↗',newsNote:'Lecteur YouTube officiel intégré. YouTube ou le diffuseur peut imposer une connexion, une restriction géographique ou de disponibilité.', ajeNote:'YouTube peut demander une connexion ou une vérification avant de lire Al Jazeera ; si le lecteur bloque, utilisez sa page officielle.', channelLabels:{f24en:'France 24 English',f24fr:'France 24 Français',f24ar:'France 24 العربية',bbc:'BBC News',aljazeera:'Al Jazeera English'},radioWaiting:'PAS ENCORE',weatherLoading:'Chargement des conditions actuelles…',weatherError:'Impossible de charger la météo pour ce lieu. Vérifiez l’orthographe ou essayez une autre ville.',weatherSearch:'Afficher la météo',weatherCredit:'Données météo fournies par',weatherTerms:'Service gratuit sans clé ; attribution affichée. Usage soumis aux limites d’utilisation raisonnable et aux conditions du fournisseur.',feels:'Ressenti',humidity:'Humidité',wind:'Vent',updated:'Conditions actuelles',conditions:{'Partially cloudy':'Partiellement nuageux','Overcast':'Couvert','Clear':'Dégagé','Rain, Overcast':'Pluie','Rain, Partially cloudy':'Pluie','Snow, Overcast':'Neige'}},
    ar:{chooseNews:'اختار قناة مباشرة',openOfficial:'الصفحة الرسمية ↗',newsNote:'مشغّل YouTube الرسمي داخل الصفحة. يوتيوب أو القناة يقدرو يطلبو تسجيل الدخول أو يقيّدو البث حسب البلد والتوفّر.', ajeNote:'ممكن يوتيوب يطلب تسجيل الدخول ولا تحقق قبل ما يخدم بث الجزيرة؛ إلا توقف، استعمل الصفحة الرسمية ديالها.', channelLabels:{f24en:'France 24 English',f24fr:'France 24 Français',f24ar:'France 24 العربية',bbc:'BBC News',aljazeera:'Al Jazeera English'},radioWaiting:'مازال ما واجدش',weatherLoading:'كنحمّلو حالة الطقس دابا…',weatherError:'ما قدرناش نجيبو الطقس لهاد المكان. تأكد من كتابة المدينة وجرب مرة أخرى.',weatherSearch:'بيّن الطقس',weatherCredit:'بيانات الطقس من',weatherTerms:'الخدمة المجانية بلا مفتاح؛ المصدر مذكور. الاستعمال تابع لحدود الاستخدام المنصف وشروط المزوّد.',feels:'الإحساس بحال',humidity:'الرطوبة',wind:'الريح',updated:'حالة الطقس دابا',conditions:{'Partially cloudy':'غائم جزئياً','Overcast':'مغيم','Clear':'صافي','Rain, Overcast':'شتا ومغيم','Rain, Partially cloudy':'شتا وغيم متفرق','Snow, Overcast':'ثلج'}}
  };
  const lang=document.documentElement.lang||'en', t=strings[lang]||strings.en;
  const channels={
    f24en:{name:'France 24 English',id:'HvZt-nh9sGg',href:'https://www.france24.com/en/live'},
    f24fr:{name:'France 24 Français',id:'a47ckXKZjxI',href:'https://www.france24.com/fr/direct'},
    f24ar:{name:'France 24 العربية',id:'93g513Uth98',href:'https://www.france24.com/ar/live'},
    bbc:{name:'BBC News',id:'-NabWfv-VdA',href:'https://www.youtube.com/@BBCNews/live'},
    aljazeera:{name:'Al Jazeera English',id:'gCNeDWCI0vo',href:'https://www.aljazeera.com/video/live',note:t.ajeNote}
  };
  const select=document.querySelector('#news-channel'), frame=document.querySelector('#news-frame'), official=document.querySelector('#news-official-link');
  const note=document.querySelector('#news-channel-note');
  if(select&&frame&&official){
    select.setAttribute('aria-label',t.chooseNews); for(const option of select.options){if(t.channelLabels[option.value])option.textContent=t.channelLabels[option.value];}
    const setChannel=key=>{const c=channels[key]||channels.f24en;frame.src=`https://www.youtube-nocookie.com/embed/${c.id}?playsinline=1&rel=0`;frame.title=`${c.name} live news`;official.href=c.href;official.textContent=t.openOfficial;note.textContent=c.note||t.newsNote;};
    select.addEventListener('change',()=>setChannel(select.value)); setChannel(select.value);
    document.querySelectorAll('[data-copy]').forEach(el=>{const key=el.dataset.copy;if(t[key])el.textContent=t[key];});
  }
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
