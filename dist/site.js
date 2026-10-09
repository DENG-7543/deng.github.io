const toggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('#main-nav');
toggle?.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Close navigation':'Open navigation');nav.classList.toggle('is-open',open);});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&toggle?.getAttribute('aria-expanded')==='true'){toggle.click();toggle.focus();}});
const filters=[...document.querySelectorAll('[data-filter]')];
function filterProducts(value){if(!filters.length)return;const valid=filters.some(b=>b.dataset.filter===value)?value:'all';filters.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.filter===valid)));let count=0;document.querySelectorAll('[data-group]').forEach(card=>{card.hidden=valid!=='all'&&card.dataset.group!==valid;if(!card.hidden)count++;});document.querySelector('.result-count').textContent=`${count} product${count===1?'':'s'}`;document.querySelector('.empty-state').hidden=count>0;}
filters.forEach(button=>button.addEventListener('click',()=>{filterProducts(button.dataset.filter);const url=new URL(location.href);if(button.dataset.filter==='all')url.searchParams.delete('collection');else url.searchParams.set('collection',button.dataset.filter);history.replaceState(null,'',url);}));
filterProducts(new URLSearchParams(location.search).get('collection')||'all');
document.querySelectorAll('[data-image]').forEach(button=>button.addEventListener('click',()=>{const image=document.querySelector('#gallery-main');image.src=button.dataset.image;image.alt=button.dataset.alt;document.querySelectorAll('[data-image]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));}));
