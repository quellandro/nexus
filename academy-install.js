/* PWA ACADEMY: portable registration based on this script's own URL. */
(()=>{
 const base=new URL('./',document.currentScript.src);
 let promptEvent=null;
 window.addEventListener('beforeinstallprompt',event=>{event.preventDefault();promptEvent=event});
 function start(){
 if('serviceWorker' in navigator&&window.isSecureContext)navigator.serviceWorker.register(new URL('academy-sw.js',base),{scope:base.href}).catch(error=>console.error('PWA setup failed:',error));
 if(window.matchMedia('(display-mode: standalone)').matches||navigator.standalone)return;
 const button=document.createElement('button');button.type='button';button.textContent='Install app';button.id='pwa-academy-install';button.setAttribute('aria-label','Install this website as an app');
 button.addEventListener('click',async()=>{if(promptEvent){await promptEvent.prompt();promptEvent=null;return}const dialog=document.createElement('dialog');dialog.className='pwa-academy-dialog';const h=document.createElement('h2');h.textContent='Install this app';const p=document.createElement('p');p.textContent=window.isSecureContext?'iPhone/iPad: open in Safari, tap Share, then Add to Home Screen. Android: use Chrome’s menu → Install app or Add to Home screen. Desktop: use Chrome or Edge’s address-bar install icon or app installation menu. Installation wording varies by browser.':'Publish this website over HTTPS first (GitHub Pages provides HTTPS). Service workers and app installation will not work from an ordinary HTTP or local-file address.';const close=document.createElement('button');close.type='button';close.textContent='Close';close.addEventListener('click',()=>{dialog.close();dialog.remove();button.focus()});dialog.append(h,p,close);document.body.append(dialog);dialog.addEventListener('click',e=>{if(e.target===dialog){dialog.close();dialog.remove()}});dialog.showModal();close.focus()});document.body.append(button);
 window.addEventListener('appinstalled',()=>button.remove());
 }
 if(document.readyState==='complete')start();else window.addEventListener('load',start,{once:true});
})();