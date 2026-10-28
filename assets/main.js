'use strict';
const menu=document.querySelector('.menu');
const nav=document.querySelector('#navigation');
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open)});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu.getAttribute('aria-expanded')==='true'){menu.setAttribute('aria-expanded','false');nav.classList.remove('open');menu.focus()}});
document.querySelector('#year').textContent=new Date().getFullYear();
const filters=document.querySelectorAll('[data-filter]');
filters.forEach(button=>button.addEventListener('click',()=>{const category=button.dataset.filter;let count=0;filters.forEach(b=>{const active=b===button;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active))});document.querySelectorAll('[data-category]').forEach(card=>{card.hidden=category!=='all'&&card.dataset.category!==category;if(!card.hidden)count++});document.querySelector('#filter-status').textContent=`Showing ${count} ${count===1?'idea':'ideas'}.`;}));
// Direct links from Home reveal their matching card regardless of filter state.
window.addEventListener('hashchange',()=>{if(document.querySelector('[data-filter="all"]'))document.querySelector('[data-filter="all"]').click()});
