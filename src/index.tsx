// ═══════════════════════════════════════════════════════════════════════════════
// KASKI LOGGING — Complete Standalone Website
// Pacific Northwest Timber Harvesting — Amboy, WA
// 
// Deploy: Cloudflare Pages with Hono
// ═══════════════════════════════════════════════════════════════════════════════

import { Hono } from 'hono'
import { cors } from 'hono/cors'

type Bindings = {
  DB: D1Database;
}

const app = new Hono<{ Bindings: Bindings }>()

// Enable CORS for API routes
app.use('/api/*', cors())

function stars(n: number) { let s = ''; for (let i = 0; i < n; i++) s += '<i class="fas fa-star"></i>'; return s }

// ── Helper functions to generate dynamic HTML sections ──

function renderTrustBar(): string {
  return [
    { icon: 'fas fa-shield-alt', text: 'Licensed & Bonded' },
    { icon: 'fas fa-hard-hat', text: 'OSHA Compliant' },
    { icon: 'fas fa-leaf', text: 'Sustainable Practices' },
    { icon: 'fas fa-award', text: 'WA L&I Certified' },
    { icon: 'fas fa-truck', text: 'Full Fleet' },
    { icon: 'fas fa-handshake', text: 'DNR Approved' },
  ].map(b => `
    <div style="display:flex;align-items:center;gap:10px">
      <i class="${b.icon}" style="color:var(--timber);font-size:16px"></i>
      <span style="color:rgba(255,255,255,0.85);font-size:13px;font-weight:600">${b.text}</span>
    </div>
  `).join('')
}

function renderServices(): string {
  return [
    { icon: 'fas fa-tree', title: 'Selective Logging', desc: 'Precision tree removal that preserves surrounding forest health. We select and harvest target species while maintaining the ecological balance of the stand. Ideal for forest thinning and timber stand improvement.' },
    { icon: 'fas fa-mountain', title: 'Clear-Cut Harvesting', desc: 'Full-scale timber harvesting for commercial operations, land development, and forest regeneration. We handle everything from felling to processing, maximizing your board-foot yield.' },
    { icon: 'fas fa-road', title: 'Road Building', desc: 'Forest access road construction and maintenance. We build haul roads, skid trails, and landing pads that withstand heavy equipment while minimizing environmental impact.' },
    { icon: 'fas fa-link', title: 'Cable Yarding', desc: 'Specialized steep-slope logging using tower and cable systems. Our skilled rigging crews safely extract timber from terrain too steep for conventional ground-based equipment.' },
    { icon: 'fas fa-seedling', title: 'Land Clearing', desc: 'Complete lot and parcel clearing for construction, agriculture, and development. Stump removal, brush clearing, and grading — we leave your land ready for the next phase.' },
    { icon: 'fas fa-clipboard-check', title: 'Timber Cruising', desc: "Professional timber estimation and inventory services. We assess your stand's volume, species mix, and market value to help you make informed harvesting decisions." },
  ].map(s => `
    <div class="svc-card" data-aos>
      <div style="width:56px;height:56px;background:linear-gradient(135deg,rgba(27,58,26,0.1),rgba(26,71,42,0.05));border-radius:16px;display:flex;align-items:center;justify-content:center;margin-bottom:20px">
        <i class="${s.icon}" style="font-size:22px;color:var(--forest)"></i>
      </div>
      <h3 style="font-size:18px;font-weight:800;color:var(--charcoal);margin-bottom:10px">${s.title}</h3>
      <p style="font-size:14px;color:#666;line-height:1.7">${s.desc}</p>
    </div>
  `).join('')
}

function renderProjectsLarge(): string {
  return [
    { img: '/static/logging/real-cat-loader-mountain.jpg', title: 'McCannon Timber Sale', loc: 'Lewis County, WA', size: '111 acres • 6M board feet', desc: 'Large-scale harvest operation on steep terrain using cable yarding systems.' },
    { img: '/static/logging/real-log-yard.jpg', title: 'Cedar Creek Thinning', loc: 'Clark County, WA', size: '85 acres • Selective harvest', desc: 'Forest health thinning project to reduce fire risk and promote old-growth development.' },
  ].map(p => `
    <div class="proj-card" style="height:360px">
      <img src="${p.img}" alt="${p.title}">
      <div class="proj-overlay">
        <div>
          <span style="background:var(--timber);color:var(--dark);padding:4px 12px;border-radius:8px;font-size:11px;font-weight:700;display:inline-block;margin-bottom:8px">${p.size}</span>
          <h3 style="color:#fff;font-size:20px;font-weight:800;margin-bottom:4px">${p.title}</h3>
          <p style="color:rgba(255,255,255,0.6);font-size:13px"><i class="fas fa-map-marker-alt" style="margin-right:6px"></i>${p.loc}</p>
          <p style="color:rgba(255,255,255,0.5);font-size:12px;margin-top:6px">${p.desc}</p>
        </div>
      </div>
    </div>
  `).join('')
}

function renderProjectsSmall(): string {
  return [
    { img: '/static/logging/real-clearcut-hillside.jpg', title: 'Lookout Stewardship', loc: 'Okanogan NF', size: '200 acres' },
    { img: '/static/logging/real-loaded-truck.jpg', title: 'Yacolt Burn Recovery', loc: 'Skamania County', size: '150 acres' },
    { img: '/static/logging/real-cable-yarder.jpg', title: 'Gifford Pinchot Thin', loc: 'Cowlitz County', size: '120 acres' },
  ].map(p => `
    <div class="proj-card" style="height:280px">
      <img src="${p.img}" alt="${p.title}">
      <div class="proj-overlay">
        <div>
          <span style="background:var(--timber);color:var(--dark);padding:4px 10px;border-radius:8px;font-size:10px;font-weight:700;display:inline-block;margin-bottom:6px">${p.size}</span>
          <h3 style="color:#fff;font-size:16px;font-weight:800">${p.title}</h3>
          <p style="color:rgba(255,255,255,0.6);font-size:12px"><i class="fas fa-map-marker-alt" style="margin-right:6px"></i>${p.loc}</p>
        </div>
      </div>
    </div>
  `).join('')
}

function renderEquipment(): string {
  return [
    { icon: 'fas fa-tractor', title: 'Feller Bunchers', desc: 'CAT 563C and Tigercat 870C feller bunchers for high-volume mechanical harvesting.', count: '3' },
    { icon: 'fas fa-cog', title: 'Cable Yarders', desc: 'Madill 124 and Thunderbird TSY-255 towers for steep-slope logging operations.', count: '2' },
    { icon: 'fas fa-truck-loading', title: 'Log Loaders', desc: 'John Deere 437E and CAT 320 log loaders for efficient deck processing and truck loading.', count: '3' },
    { icon: 'fas fa-truck', title: 'Log Trucks/Lowboy', desc: 'Peterbilt and Kenworth log trucks and lowboy for timber and equipment transport.', count: '5' },
    { icon: 'fas fa-snowplow', title: 'Dozers', desc: 'Caterpillar dozers for ground-based yarding operations, road building, and land clearing capabilities.', count: '2' },
    { icon: 'fas fa-tools', title: 'Processors', desc: 'Waratah H415 and Pierce 3400 stroke delimbers for mechanical processing at the landing.', count: '2' },
  ].map(e => `
    <div class="equip-card" data-aos>
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">
        <div style="width:48px;height:48px;background:linear-gradient(135deg,rgba(27,58,26,0.1),rgba(26,71,42,0.05));border-radius:14px;display:flex;align-items:center;justify-content:center">
          <i class="${e.icon}" style="font-size:20px;color:var(--forest)"></i>
        </div>
        <span style="background:var(--forest);color:#fff;padding:4px 12px;border-radius:8px;font-size:12px;font-weight:800">${e.count} Units</span>
      </div>
      <h3 style="font-size:17px;font-weight:800;color:var(--charcoal);margin-bottom:8px">${e.title}</h3>
      <p style="font-size:13px;color:#666;line-height:1.6">${e.desc}</p>
    </div>
  `).join('')
}

function renderProcess(): string {
  return [
    { step: '1', title: 'Site Assessment', desc: 'We visit your property to evaluate terrain, timber species, volume, access, and environmental considerations. We provide a detailed estimate at no cost.' },
    { step: '2', title: 'Permitting & Planning', desc: "We handle all required permits — forest practices applications, road permits, SEPA compliance, and DNR notifications. Our team manages the paperwork so you don't have to." },
    { step: '3', title: 'Road Building & Access', desc: "If needed, we construct haul roads, landings, and skid trails. All roads are built to Washington State Forest Practices standards with proper drainage and erosion control." },
    { step: '4', title: 'Timber Harvesting', desc: 'Our experienced crews execute the harvest plan — whether ground-based with feller bunchers and skidders, or cable yarding on steep slopes. Safety is our #1 priority.' },
    { step: '5', title: 'Processing & Transport', desc: 'Logs are processed at the landing — delimbed, bucked to market specifications, sorted by grade, and loaded onto our trucks for delivery to the mill.' },
    { step: '6', title: 'Site Restoration', desc: 'We clean up slash, stabilize roads, install water bars, and ensure the site meets or exceeds all environmental requirements. We leave the land better than we found it.' },
  ].map(s => `
    <div class="process-step" data-step="${s.step}">
      <h3 style="font-size:18px;font-weight:800;color:var(--charcoal);margin-bottom:6px">${s.title}</h3>
      <p style="font-size:14px;color:#666;line-height:1.7">${s.desc}</p>
    </div>
  `).join('')
}

function renderTeam(): string {
  return [
    { img: '/static/logging/real-sunset-loaders.jpg', name: 'Leif Kaski', role: 'Owner & Operator', exp: '20+ years in timber', desc: 'Third-generation logger. Oversees all operations and client relationships.' },
  ].map(t => `
    <div class="team-card" data-aos>
      <img src="${t.img}" alt="${t.name}" style="width:100%;height:300px;object-fit:cover;margin-bottom:16px;border-radius:20px">
      <h3 style="font-size:18px;font-weight:800;color:var(--charcoal);margin-bottom:2px">${t.name}</h3>
      <p style="font-size:13px;color:var(--forest);font-weight:700;margin-bottom:4px">${t.role}</p>
      <p style="font-size:11px;color:var(--timber);font-weight:600;margin-bottom:8px"><i class="fas fa-star" style="font-size:10px"></i> ${t.exp}</p>
      <p style="font-size:13px;color:#666;line-height:1.6">${t.desc}</p>
    </div>
  `).join('')
}

function renderReviews(): string {
  const starsHtml = stars(5)
  return [
    { name: 'Robert Hanson', role: 'Timber Land Owner — Lewis County', text: "Kaski Logging handled our 100-acre harvest flawlessly. Their crew was professional, respectful of our property, and finished ahead of schedule. The road work was excellent and the cleanup was impeccable. We've already hired them for our next sale.", rating: 5 },
    { name: 'DNR Region Manager', role: 'WA Dept. of Natural Resources', text: "We've worked with Kaski Logging on multiple state timber sales. They consistently deliver quality work, meet environmental requirements, and maintain an excellent safety record. One of the best operators in Southwest Washington.", rating: 5 },
    { name: 'Sarah Mitchell', role: 'Ranch Owner — Clark County', text: 'We needed 15 acres cleared for pasture expansion and Kaski was the only company that could handle the steep terrain. They brought in cable equipment and had it done in two weeks. Very fair pricing and they replanted the edges beautifully.', rating: 5 },
    { name: 'Tom Eriksson', role: 'Commercial Developer — Vancouver, WA', text: 'Time is money in development and Kaski understands that. They cleared our 40-acre parcel, built the access road, and had the site graded and ready three days early. Their estimating was spot-on and there were zero surprises on the invoice.', rating: 5 },
    { name: 'Mike & Linda Pearson', role: 'Forest Land Trust — Cowlitz County', text: 'We hired Kaski for a selective thinning to improve our old-growth stand health. They were incredibly careful — not a single leave tree was damaged. Leif personally walked the site with us to make sure we were happy with the results.', rating: 5 },
    { name: 'Jim Blackwell', role: 'Cattleman — Skamania County', text: "After the windstorm took out half our timber, Kaski was out there within 48 hours to start salvage operations. They saved us tens of thousands of dollars by getting the logs to the mill before they degraded. Can't recommend them enough.", rating: 5 },
  ].map(r => `
    <div class="rev-card" data-aos>
      <div style="display:flex;gap:4px;color:var(--timber);font-size:14px;margin-bottom:12px">${starsHtml}</div>
      <p style="font-size:14px;color:#444;line-height:1.7;margin-bottom:16px;font-style:italic">"${r.text}"</p>
      <div style="border-top:1px solid #eee;padding-top:12px">
        <p style="font-weight:700;font-size:14px;color:var(--charcoal)">${r.name}</p>
        <p style="font-size:12px;color:#888">${r.role}</p>
      </div>
    </div>
  `).join('')
}

function renderServiceAreas(): string {
  return ['Clark County', 'Cowlitz County', 'Lewis County', 'Skamania County', 'Wahkiakum County', 'Pacific County', 'Thurston County', 'Pierce County', 'Okanogan County', 'Chelan County', 'Yakima County', 'Kittitas County'].map(area => `
    <span style="background:rgba(27,58,26,0.06);border:1px solid rgba(27,58,26,0.1);color:var(--forest);padding:10px 20px;border-radius:12px;font-size:13px;font-weight:600">${area}</span>
  `).join('')
}

function renderFaq(): string {
  return [
    { q: 'How much does logging cost?', a: 'Costs vary based on terrain, timber species, volume, and access. In many cases, the stumpage value of the timber exceeds the logging cost — meaning you get paid. We provide free, no-obligation estimates so you know exactly what to expect.' },
    { q: 'Do you handle the permits?', a: "Yes. We manage all permitting including Forest Practices Applications, road permits, SEPA compliance, and DNR notifications. We have decades of experience navigating Washington State's regulatory requirements." },
    { q: 'What about environmental requirements?', a: 'We strictly follow all Washington State Forest Practices rules including stream buffers, wildlife tree retention, slope stability requirements, and erosion control. We also voluntarily exceed minimum standards on many projects.' },
    { q: 'How long does a typical logging project take?', a: 'Timelines vary by project size and complexity. A typical 50-100 acre harvest takes 4-8 weeks. We provide a detailed schedule during the estimate phase and keep you updated throughout the project.' },
    { q: 'Do you replant after harvesting?', a: 'When required by law (which is most cases in Washington), we handle all reforestation. We plant native species appropriate for the site and follow up to ensure successful establishment. Many clients choose to replant even when not required.' },
    { q: 'Are you insured?', a: "Absolutely. We carry comprehensive general liability, workers' compensation, and equipment insurance. We are licensed, bonded, and insured through the State of Washington. We're happy to provide certificates of insurance to any client or landowner." },
    { q: 'Do you buy standing timber?', a: 'Yes. We purchase standing timber (stumpage) and can provide competitive bids on your timber sale. We work with timber cruisers to assess volume and value, and we pay fair market prices. Contact us for a free timber appraisal.' },
  ].map(f => `
    <div class="faq-item">
      <button class="faq-btn" onclick="toggleFaq(this)">${f.q}<span class="faq-icon" style="transition:transform 0.3s;font-size:18px;color:var(--forest)">+</span></button>
      <div class="faq-body"><p style="font-size:14px;color:#666;line-height:1.7">${f.a}</p></div>
    </div>
  `).join('')
}

// ── Main page HTML ──

function kaskiLogging(): string {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Kaski Logging | Timber Harvesting &amp; Forestry Services — Amboy, WA</title>
<meta name="description" content="Pacific Northwest timber harvesting experts since 2007. Selective logging, land clearing, cable yarding, road building. Licensed, bonded, insured. Amboy, Washington.">
<script src="https://cdn.tailwindcss.com"></script>
<link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
<style>
*{scroll-behavior:smooth;box-sizing:border-box;margin:0;padding:0}
body{overflow-x:hidden}
[data-aos]{opacity:0;transform:translateY(30px);transition:all 0.7s cubic-bezier(0.25,0.46,0.45,0.94)}
[data-aos].visible{opacity:1;transform:translateY(0)}
img{max-width:100%;display:block}
@media(max-width:768px){
  .hide-mobile{display:none!important}
  #mob-toggle{display:block!important}
  .mobile-col{flex-direction:column!important}
  .mobile-full{grid-template-columns:1fr!important}
  .mobile-text-center{text-align:center!important}
  .mobile-p16{padding:60px 16px!important}
  .hero-grid{grid-template-columns:1fr!important}
}
</style>
<script>
document.addEventListener('DOMContentLoaded',()=>{
  const o=new IntersectionObserver((e)=>{e.forEach(el=>{if(el.isIntersecting){el.target.classList.add('visible');o.unobserve(el.target)}})},{threshold:0.08});
  document.querySelectorAll('[data-aos]').forEach(el=>o.observe(el));
  const btn=document.getElementById('mob-toggle');
  const menu=document.getElementById('mob-menu');
  if(btn&&menu){btn.onclick=()=>{menu.style.display=menu.style.display==='flex'?'none':'flex'}}
});
</script>
<style>
  :root{--dark:#0c1a0a;--forest:#1b3a1a;--timber:#c8a45e;--timberlt:#d4b876;--bark:#3d2b1f;--pine:#1a472a;--smoke:#f5f2ed;--charcoal:#1a1a16}
  body{font-family:'Inter',sans-serif;background:var(--smoke);color:#1e1b16}
  .os{font-family:'Oswald',sans-serif;text-transform:uppercase;letter-spacing:1.5px}
  a{text-decoration:none;color:inherit}button{cursor:pointer;border:none}
  .svc-card{background:#fff;border:1px solid #ddd8cc;border-radius:20px;padding:40px 32px;transition:all 0.4s;position:relative;overflow:hidden}
  .svc-card::before{content:'';position:absolute;top:0;left:0;right:0;height:4px;background:linear-gradient(90deg,var(--forest),var(--timber));transform:scaleX(0);transition:transform 0.4s;transform-origin:left}
  .svc-card:hover{border-color:var(--timber);box-shadow:0 24px 64px rgba(27,58,26,0.08);transform:translateY(-6px)}
  .svc-card:hover::before{transform:scaleX(1)}
  .proj-card{border-radius:20px;overflow:hidden;position:relative;cursor:pointer}
  .proj-card img{width:100%;height:100%;object-fit:cover;transition:transform 0.6s}
  .proj-card:hover img{transform:scale(1.08)}
  .proj-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,0.85),transparent 50%);display:flex;align-items:flex-end;padding:24px;opacity:0;transition:opacity 0.4s}
  .proj-card:hover .proj-overlay{opacity:1}
  .rev-card{background:#fff;border:1px solid #ddd8cc;border-radius:20px;padding:32px;transition:all 0.3s}
  .rev-card:hover{box-shadow:0 16px 48px rgba(0,0,0,0.06)}
  .team-card{text-align:center;transition:all 0.4s}
  .team-card img{border-radius:20px;transition:transform 0.4s}
  .team-card:hover img{transform:scale(1.03)}
  .stat-card{text-align:center;padding:32px 20px}
  .process-step{position:relative;padding-left:48px}
  .process-step::before{content:attr(data-step);position:absolute;left:0;top:0;width:36px;height:36px;background:linear-gradient(135deg,var(--forest),var(--pine));color:#fff;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:800}
  .faq-item{border:1px solid #ddd8cc;border-radius:16px;overflow:hidden;transition:border-color 0.3s}
  .faq-item:hover{border-color:var(--timber)}
  .faq-btn{width:100%;text-align:left;background:none;padding:20px 24px;font-size:16px;font-weight:600;color:#1e1b16;display:flex;justify-content:space-between;align-items:center;cursor:pointer;border:none}
  .faq-body{max-height:0;overflow:hidden;transition:max-height 0.3s ease;padding:0 24px}
  .faq-body.open{max-height:300px;padding:0 24px 20px}
  .equip-card{background:#fff;border:1px solid #ddd8cc;border-radius:16px;padding:28px;transition:all 0.3s}
  .equip-card:hover{border-color:var(--forest);box-shadow:0 12px 40px rgba(27,58,26,0.06);transform:translateY(-4px)}
  .counter{font-family:'Oswald',sans-serif;font-size:56px;font-weight:700;line-height:1;background:linear-gradient(135deg,var(--forest),var(--timber));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
  @keyframes treeFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
</style>
<script>
  function toggleFaq(el){
    const body=el.nextElementSibling;
    const icon=el.querySelector('.faq-icon');
    body.classList.toggle('open');
    icon.style.transform=body.classList.contains('open')?'rotate(45deg)':'rotate(0)';
  }
</script>
</head><body>

<!-- NAV -->
<nav style="position:fixed;top:0;left:0;right:0;z-index:100;background:rgba(245,242,237,0.96);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border-bottom:1px solid #ddd8cc">
  <div style="max-width:1200px;margin:0 auto;padding:14px 24px;display:flex;align-items:center;justify-content:space-between">
    <a href="#" style="display:flex;align-items:center;gap:8px">
      <img src="/static/logging/logo-nav.png" alt="Kaski Logging Inc." style="height:40px;width:auto">
    </a>
    <div class="hide-mobile" style="display:flex;align-items:center;gap:24px">
      <a href="#services" style="color:#666;font-size:13px;font-weight:600">Services</a>
      <a href="#projects" style="color:#666;font-size:13px;font-weight:600">Projects</a>
      <a href="#equipment" style="color:#666;font-size:13px;font-weight:600">Equipment</a>
      <a href="#about" style="color:#666;font-size:13px;font-weight:600">About</a>
      <a href="#reviews" style="color:#666;font-size:13px;font-weight:600">Reviews</a>
      <a href="#faq" style="color:#666;font-size:13px;font-weight:600">FAQ</a>
      <a href="#contact" style="background:linear-gradient(135deg,#1b3a1a,#1a472a);color:#fff;padding:12px 28px;border-radius:12px;font-size:13px;font-weight:700;box-shadow:0 4px 16px rgba(27,58,26,0.2)">Free Estimate</a>
    </div>
    <button id="mob-toggle" style="display:none;background:none;border:none;font-size:22px;color:#1a1a16"><i class="fas fa-bars"></i></button>
  </div>
  <div id="mob-menu" style="display:none;flex-direction:column;padding:12px 24px 20px;gap:12px;border-top:1px solid #ddd8cc">
    <a href="#services" style="color:#666;font-size:14px;font-weight:600;padding:8px 0">Services</a>
    <a href="#projects" style="color:#666;font-size:14px;font-weight:600;padding:8px 0">Projects</a>
    <a href="#equipment" style="color:#666;font-size:14px;font-weight:600;padding:8px 0">Equipment</a>
    <a href="#about" style="color:#666;font-size:14px;font-weight:600;padding:8px 0">About</a>
    <a href="#reviews" style="color:#666;font-size:14px;font-weight:600;padding:8px 0">Reviews</a>
    <a href="#faq" style="color:#666;font-size:14px;font-weight:600;padding:8px 0">FAQ</a>
    <a href="#contact" style="background:linear-gradient(135deg,#1b3a1a,#1a472a);color:#fff;padding:14px;border-radius:12px;font-size:14px;font-weight:700;text-align:center">Free Estimate</a>
  </div>
</nav>

<!-- HERO -->
<section style="position:relative;min-height:100vh;display:flex;align-items:center;overflow:hidden;background:var(--dark)">
  <div style="position:absolute;inset:0;background:url('/static/logging/hero-fog-hills.jpg') center/cover no-repeat"></div>
  <div style="position:absolute;inset:0;background:linear-gradient(135deg,rgba(12,26,10,0.92) 0%,rgba(12,26,10,0.75) 40%,rgba(27,58,26,0.6) 100%)"></div>
  <div style="position:absolute;bottom:0;left:0;right:0;height:200px;background:linear-gradient(to top,var(--smoke),transparent)"></div>
  <div style="max-width:1200px;margin:0 auto;padding:140px 24px 100px;position:relative;z-index:2;display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center" class="hero-grid">
    <div>
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:20px" data-aos>
        <span style="display:inline-block;width:40px;height:2px;background:var(--timber)"></span>
        <span class="os" style="font-size:12px;color:var(--timber);letter-spacing:3px;font-weight:600">Pacific Northwest Timber Experts Since 2007</span>
      </div>
      <h1 class="os" style="font-size:clamp(2.5rem,5vw,4.2rem);line-height:1.05;color:#fff;margin-bottom:24px" data-aos>
        Harvesting Timber.<br><span style="color:var(--timber)">Preserving Forests.</span>
      </h1>
      <p style="font-size:18px;color:rgba(255,255,255,0.7);line-height:1.7;margin-bottom:36px;max-width:500px" data-aos>
        From selective logging to large-scale clear-cuts, Kaski Logging delivers professional timber harvesting with safety, precision, and environmental responsibility across Washington State and Oregon.
      </p>
      <div style="display:flex;flex-wrap:wrap;gap:12px" data-aos>
        <a href="#contact" style="background:linear-gradient(135deg,var(--timber),var(--timberlt));color:var(--dark);padding:16px 36px;border-radius:14px;font-size:15px;font-weight:800;box-shadow:0 8px 32px rgba(200,164,94,0.25);display:inline-flex;align-items:center;gap:8px;transition:transform 0.3s"><i class="fas fa-phone-alt"></i> Get a Free Estimate</a>
        <a href="#projects" style="background:rgba(255,255,255,0.08);color:#fff;padding:16px 32px;border-radius:14px;font-size:15px;font-weight:700;border:1px solid rgba(255,255,255,0.15);display:inline-flex;align-items:center;gap:8px;backdrop-filter:blur(12px)"><i class="fas fa-images"></i> View Our Work</a>
      </div>
    </div>
    <div class="hide-mobile" style="display:grid;grid-template-columns:1fr 1fr;gap:16px" data-aos>
      <div style="display:flex;flex-direction:column;gap:16px">
        <div style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:20px;padding:28px;backdrop-filter:blur(16px)">
          <div class="counter">20+</div>
          <p style="color:rgba(255,255,255,0.6);font-size:13px;font-weight:500;margin-top:4px">Years of Experience</p>
        </div>
        <div style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:20px;padding:28px;backdrop-filter:blur(16px)">
          <div class="counter">300+</div>
          <p style="color:rgba(255,255,255,0.6);font-size:13px;font-weight:500;margin-top:4px">Projects Completed</p>
        </div>
      </div>
      <div style="display:flex;flex-direction:column;gap:16px;margin-top:40px">
        <div style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:20px;padding:28px;backdrop-filter:blur(16px)">
          <div class="counter">24/7</div>
          <p style="color:rgba(255,255,255,0.6);font-size:13px;font-weight:500;margin-top:4px">Emergency Response</p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- TRUST BAR -->
<section style="background:var(--forest);padding:32px 24px">
  <div style="max-width:1100px;margin:0 auto;display:flex;flex-wrap:wrap;justify-content:center;gap:32px">
    ${renderTrustBar()}
  </div>
</section>

<!-- SERVICES -->
<section id="services" style="padding:100px 24px;background:var(--smoke)" class="mobile-p16">
  <div style="max-width:1200px;margin:0 auto">
    <div style="text-align:center;margin-bottom:60px" data-aos>
      <span class="os" style="font-size:12px;color:var(--forest);letter-spacing:4px;display:block;margin-bottom:8px">What We Do</span>
      <h2 class="os" style="font-size:clamp(2rem,4vw,3rem);color:var(--charcoal);margin-bottom:16px">Our Logging Services</h2>
      <p style="color:#666;max-width:600px;margin:0 auto;line-height:1.7">From residential lot clearing to large-scale commercial timber harvesting, we have the expertise and equipment to handle any project in the Pacific Northwest.</p>
    </div>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:24px" class="mobile-full" data-aos>
      ${renderServices()}
    </div>
  </div>
</section>

<!-- PROJECT GALLERY -->
<section id="projects" style="padding:100px 24px;background:#fff" class="mobile-p16">
  <div style="max-width:1200px;margin:0 auto">
    <div style="text-align:center;margin-bottom:60px" data-aos>
      <span class="os" style="font-size:12px;color:var(--forest);letter-spacing:4px;display:block;margin-bottom:8px">Our Work</span>
      <h2 class="os" style="font-size:clamp(2rem,4vw,3rem);color:var(--charcoal);margin-bottom:16px">Recent Projects</h2>
      <p style="color:#666;max-width:600px;margin:0 auto;line-height:1.7">Explore our recent timber harvesting operations across Washington State and Oregon. Every job is executed with precision, safety, and respect for the land.</p>
    </div>
    <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:20px;margin-bottom:20px" class="mobile-full" data-aos>
      ${renderProjectsLarge()}
    </div>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:20px" class="mobile-full" data-aos>
      ${renderProjectsSmall()}
    </div>
  </div>
</section>

<!-- EQUIPMENT -->
<section id="equipment" style="padding:100px 24px;background:var(--smoke)" class="mobile-p16">
  <div style="max-width:1200px;margin:0 auto">
    <div style="text-align:center;margin-bottom:60px" data-aos>
      <span class="os" style="font-size:12px;color:var(--forest);letter-spacing:4px;display:block;margin-bottom:8px">Our Fleet</span>
      <h2 class="os" style="font-size:clamp(2rem,4vw,3rem);color:var(--charcoal);margin-bottom:16px">Heavy Equipment</h2>
      <p style="color:#666;max-width:600px;margin:0 auto;line-height:1.7">We own and maintain a full fleet of heavy logging equipment. No rentals, no delays — just reliable iron ready to work.</p>
    </div>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:20px" class="mobile-full" data-aos>
      ${renderEquipment()}
    </div>
  </div>
</section>

<!-- PROCESS -->
<section style="padding:100px 24px;background:#fff" class="mobile-p16">
  <div style="max-width:900px;margin:0 auto">
    <div style="text-align:center;margin-bottom:60px" data-aos>
      <span class="os" style="font-size:12px;color:var(--forest);letter-spacing:4px;display:block;margin-bottom:8px">How It Works</span>
      <h2 class="os" style="font-size:clamp(2rem,4vw,3rem);color:var(--charcoal);margin-bottom:16px">Our Process</h2>
      <p style="color:#666;max-width:600px;margin:0 auto;line-height:1.7">From first contact to final cleanup, here's how we handle every logging project.</p>
    </div>
    <div style="display:flex;flex-direction:column;gap:40px" data-aos>
      ${renderProcess()}
    </div>
  </div>
</section>

<!-- ABOUT / TEAM -->
<section id="about" style="padding:100px 24px;background:var(--forest)" class="mobile-p16">
  <div style="max-width:1200px;margin:0 auto">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center" class="mobile-full" data-aos>
      <div>
        <span class="os" style="font-size:12px;color:var(--timber);letter-spacing:4px;display:block;margin-bottom:8px">Our Story</span>
        <h2 class="os" style="font-size:clamp(2rem,4vw,3rem);color:#fff;margin-bottom:20px">Three Generations of Timber</h2>
        <p style="color:rgba(255,255,255,0.7);line-height:1.8;margin-bottom:20px">Founded in 2007 in the shadow of Mount St. Helens, Kaski Logging has grown from a two-man crew into one of Southwest Washington's most respected timber harvesting companies.</p>
        <p style="color:rgba(255,255,255,0.7);line-height:1.8;margin-bottom:20px">Under the leadership of Leif Kaski, we've built our reputation on hard work, honest business practices, and a deep respect for the forests that sustain our livelihood. Our crew members average 15+ years of experience in the woods.</p>
        <p style="color:rgba(255,255,255,0.7);line-height:1.8;margin-bottom:28px">We're not just loggers — we're stewards of the land. Every harvest plan includes environmental protections, replanting commitments, and sustainable forestry practices that ensure these forests will be here for the next generation.</p>
        <div style="display:flex;gap:32px;flex-wrap:wrap">
          <div>
            <div class="os" style="font-size:36px;color:var(--timber);font-weight:700">20+</div>
            <p style="color:rgba(255,255,255,0.5);font-size:12px;margin-top:2px">Years in business</p>
          </div>
          <div>
            <div class="os" style="font-size:36px;color:var(--timber);font-weight:700">25+</div>
            <p style="color:rgba(255,255,255,0.5);font-size:12px;margin-top:2px">Crew members</p>
          </div>
          <div>
            <div class="os" style="font-size:36px;color:var(--timber);font-weight:700">300+</div>
            <p style="color:rgba(255,255,255,0.5);font-size:12px;margin-top:2px">Projects completed</p>
          </div>
        </div>
      </div>
      <div style="border-radius:24px;overflow:hidden;border:2px solid rgba(200,164,94,0.2)">
        <img src="/static/logging/real-cable-yarder.jpg" alt="Kaski Logging cable yarding operation" style="width:100%;height:420px;object-fit:cover;display:block">
      </div>
    </div>
  </div>
</section>

<!-- TEAM -->
<section style="padding:100px 24px;background:#fff" class="mobile-p16">
  <div style="max-width:1200px;margin:0 auto">
    <div style="text-align:center;margin-bottom:60px" data-aos>
      <span class="os" style="font-size:12px;color:var(--forest);letter-spacing:4px;display:block;margin-bottom:8px">Meet the Crew</span>
      <h2 class="os" style="font-size:clamp(2rem,4vw,3rem);color:var(--charcoal);margin-bottom:16px">Our Leadership Team</h2>
    </div>
    <div style="display:grid;grid-template-columns:1fr;gap:32px;max-width:400px;margin:0 auto" class="mobile-full" data-aos>
      ${renderTeam()}
    </div>
  </div>
</section>

<!-- REVIEWS -->
<section id="reviews" style="padding:100px 24px;background:var(--smoke)" class="mobile-p16">
  <div style="max-width:1200px;margin:0 auto">
    <div style="text-align:center;margin-bottom:60px" data-aos>
      <span class="os" style="font-size:12px;color:var(--forest);letter-spacing:4px;display:block;margin-bottom:8px">Client Feedback</span>
      <h2 class="os" style="font-size:clamp(2rem,4vw,3rem);color:var(--charcoal);margin-bottom:16px">What Landowners Say</h2>
    </div>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:24px" class="mobile-full" data-aos>
      ${renderReviews()}
    </div>
  </div>
</section>

<!-- SERVICE AREAS -->
<section style="padding:80px 24px;background:#fff" class="mobile-p16">
  <div style="max-width:1200px;margin:0 auto;text-align:center">
    <div data-aos>
      <span class="os" style="font-size:12px;color:var(--forest);letter-spacing:4px;display:block;margin-bottom:8px">Service Areas</span>
      <h2 class="os" style="font-size:clamp(1.8rem,3.5vw,2.5rem);color:var(--charcoal);margin-bottom:16px">Serving All of Washington State</h2>
      <p style="color:#666;max-width:600px;margin:0 auto 40px;line-height:1.7">Based in Amboy, WA, we operate across the entire state with a focus on Southwest Washington and the Gifford Pinchot National Forest region.</p>
    </div>
    <div style="display:flex;flex-wrap:wrap;justify-content:center;gap:12px" data-aos>
      ${renderServiceAreas()}
    </div>
  </div>
</section>

<!-- FAQ -->
<section id="faq" style="padding:100px 24px;background:var(--smoke)" class="mobile-p16">
  <div style="max-width:800px;margin:0 auto">
    <div style="text-align:center;margin-bottom:60px" data-aos>
      <span class="os" style="font-size:12px;color:var(--forest);letter-spacing:4px;display:block;margin-bottom:8px">Common Questions</span>
      <h2 class="os" style="font-size:clamp(2rem,4vw,3rem);color:var(--charcoal);margin-bottom:16px">Frequently Asked Questions</h2>
    </div>
    <div style="display:flex;flex-direction:column;gap:12px" data-aos>
      ${renderFaq()}
    </div>
  </div>
</section>

<!-- CTA -->
<section style="padding:100px 24px;background:var(--forest);text-align:center" class="mobile-p16">
  <div style="max-width:700px;margin:0 auto" data-aos>
    <img src="/static/logging/logo-white.png" alt="Kaski Logging" style="height:80px;width:auto;margin:0 auto 20px;display:block">
    <h2 class="os" style="font-size:clamp(2rem,4vw,2.8rem);color:#fff;margin-bottom:16px">Ready to Harvest Your Timber?</h2>
    <p style="color:rgba(255,255,255,0.6);line-height:1.7;margin-bottom:36px">Get a free, no-obligation estimate on your timber sale or land clearing project. We'll walk your property, assess the timber, and give you an honest evaluation.</p>
    <a href="#contact" style="background:linear-gradient(135deg,var(--timber),var(--timberlt));color:var(--dark);padding:18px 44px;border-radius:14px;font-size:17px;font-weight:800;box-shadow:0 8px 32px rgba(200,164,94,0.3);display:inline-flex;align-items:center;gap:10px"><i class="fas fa-phone-alt"></i> Call (360) 903-5144</a>
  </div>
</section>

<!-- CONTACT -->
<section id="contact" style="padding:100px 24px;background:var(--smoke)" class="mobile-p16">
  <div style="max-width:1200px;margin:0 auto">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:60px" class="mobile-full" data-aos>
      <div>
        <span class="os" style="font-size:12px;color:var(--forest);letter-spacing:4px;display:block;margin-bottom:8px">Contact Us</span>
        <h2 class="os" style="font-size:clamp(2rem,4vw,2.5rem);color:var(--charcoal);margin-bottom:20px">Get Your Free Estimate</h2>
        <p style="color:#666;line-height:1.7;margin-bottom:32px">Call us directly or fill out the form and we'll get back to you within 24 hours. We offer free site visits and estimates for all projects.</p>
        <div style="display:flex;flex-direction:column;gap:20px">
          <div style="display:flex;align-items:center;gap:16px">
            <div style="width:48px;height:48px;background:linear-gradient(135deg,rgba(27,58,26,0.1),rgba(26,71,42,0.05));border-radius:14px;display:flex;align-items:center;justify-content:center;flex-shrink:0"><i class="fas fa-phone-alt" style="color:var(--forest)"></i></div>
            <div><p style="font-size:12px;color:#888;margin-bottom:2px">Call Us</p><p style="font-weight:700;font-size:16px;color:var(--charcoal)">(360) 903-5144</p></div>
          </div>
          <div style="display:flex;align-items:center;gap:16px">
            <div style="width:48px;height:48px;background:linear-gradient(135deg,rgba(27,58,26,0.1),rgba(26,71,42,0.05));border-radius:14px;display:flex;align-items:center;justify-content:center;flex-shrink:0"><i class="fas fa-envelope" style="color:var(--forest)"></i></div>
            <div><p style="font-size:12px;color:#888;margin-bottom:2px">Email Us</p><p style="font-weight:700;font-size:16px;color:var(--charcoal)">info@kaskilogging.com</p></div>
          </div>
          <div style="display:flex;align-items:center;gap:16px">
            <div style="width:48px;height:48px;background:linear-gradient(135deg,rgba(27,58,26,0.1),rgba(26,71,42,0.05));border-radius:14px;display:flex;align-items:center;justify-content:center;flex-shrink:0"><i class="fas fa-map-marker-alt" style="color:var(--forest)"></i></div>
            <div><p style="font-size:12px;color:#888;margin-bottom:2px">Location</p><p style="font-weight:700;font-size:16px;color:var(--charcoal)">22411 NE Cedar Creek Rd, Amboy, WA 98601</p></div>
          </div>
          <div style="display:flex;align-items:center;gap:16px">
            <div style="width:48px;height:48px;background:linear-gradient(135deg,rgba(27,58,26,0.1),rgba(26,71,42,0.05));border-radius:14px;display:flex;align-items:center;justify-content:center;flex-shrink:0"><i class="fas fa-clock" style="color:var(--forest)"></i></div>
            <div><p style="font-size:12px;color:#888;margin-bottom:2px">Hours</p><p style="font-weight:700;font-size:16px;color:var(--charcoal)">Mon–Fri 6:00 AM – 6:00 PM</p></div>
          </div>
        </div>
      </div>
      <div>
        <form id="contactForm" style="background:#fff;border:1px solid #ddd8cc;border-radius:24px;padding:40px" onsubmit="return submitContactForm(event)">
          <div id="formMsg" style="display:none;padding:16px;border-radius:12px;margin-bottom:20px;font-size:14px;font-weight:600;text-align:center"></div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px">
            <div>
              <label style="font-size:12px;color:#888;display:block;margin-bottom:6px;font-weight:600">First Name *</label>
              <input type="text" id="cf_first" name="first_name" placeholder="John" required style="width:100%;padding:14px 16px;border:1px solid #ddd8cc;border-radius:12px;font-size:14px;background:var(--smoke);outline:none;box-sizing:border-box">
            </div>
            <div>
              <label style="font-size:12px;color:#888;display:block;margin-bottom:6px;font-weight:600">Last Name *</label>
              <input type="text" id="cf_last" name="last_name" placeholder="Smith" required style="width:100%;padding:14px 16px;border:1px solid #ddd8cc;border-radius:12px;font-size:14px;background:var(--smoke);outline:none;box-sizing:border-box">
            </div>
          </div>
          <div style="margin-bottom:16px">
            <label style="font-size:12px;color:#888;display:block;margin-bottom:6px;font-weight:600">Phone</label>
            <input type="tel" id="cf_phone" name="phone" placeholder="(360) 555-0000" style="width:100%;padding:14px 16px;border:1px solid #ddd8cc;border-radius:12px;font-size:14px;background:var(--smoke);outline:none;box-sizing:border-box">
          </div>
          <div style="margin-bottom:16px">
            <label style="font-size:12px;color:#888;display:block;margin-bottom:6px;font-weight:600">Email</label>
            <input type="email" id="cf_email" name="email" placeholder="john@example.com" style="width:100%;padding:14px 16px;border:1px solid #ddd8cc;border-radius:12px;font-size:14px;background:var(--smoke);outline:none;box-sizing:border-box">
          </div>
          <div style="margin-bottom:16px">
            <label style="font-size:12px;color:#888;display:block;margin-bottom:6px;font-weight:600">Service Needed</label>
            <select id="cf_service" name="service_needed" style="width:100%;padding:14px 16px;border:1px solid #ddd8cc;border-radius:12px;font-size:14px;background:var(--smoke);outline:none;box-sizing:border-box;color:#666">
              <option>Timber Harvesting</option>
              <option>Land Clearing</option>
              <option>Selective Logging</option>
              <option>Cable Yarding</option>
              <option>Road Building</option>
              <option>Timber Cruising / Appraisal</option>
              <option>Stumpage Purchase</option>
              <option>Other</option>
            </select>
          </div>
          <div style="margin-bottom:16px">
            <label style="font-size:12px;color:#888;display:block;margin-bottom:6px;font-weight:600">Approximate Acreage</label>
            <input type="text" id="cf_acreage" name="acreage" placeholder="e.g. 50 acres" style="width:100%;padding:14px 16px;border:1px solid #ddd8cc;border-radius:12px;font-size:14px;background:var(--smoke);outline:none;box-sizing:border-box">
          </div>
          <div style="margin-bottom:24px">
            <label style="font-size:12px;color:#888;display:block;margin-bottom:6px;font-weight:600">Project Details</label>
            <textarea id="cf_details" name="details" rows="4" placeholder="Tell us about your property and what you need..." style="width:100%;padding:14px 16px;border:1px solid #ddd8cc;border-radius:12px;font-size:14px;background:var(--smoke);outline:none;resize:vertical;box-sizing:border-box"></textarea>
          </div>
          <button type="submit" id="cf_submit" style="width:100%;background:linear-gradient(135deg,var(--forest),var(--pine));color:#fff;padding:16px;border-radius:14px;font-size:15px;font-weight:800;cursor:pointer;box-shadow:0 4px 16px rgba(27,58,26,0.2);display:flex;align-items:center;justify-content:center;gap:8px;border:none"><i class="fas fa-paper-plane"></i> Request Free Estimate</button>
        </form>
      </div>
    </div>
  </div>
</section>

<!-- FOOTER -->
<footer style="background:var(--dark);padding:60px 24px 32px">
  <div style="max-width:1200px;margin:0 auto;display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:40px" class="mobile-full">
    <div>
      <div style="margin-bottom:16px">
        <img src="/static/logging/logo-white.png" alt="Kaski Logging Inc." style="height:60px;width:auto">
      </div>
      <p style="color:#64705e;font-size:13px;line-height:1.7;max-width:280px">Pacific Northwest timber harvesting experts. Licensed, bonded, insured. Serving Washington State since 2007.</p>
      <div style="display:flex;gap:12px;margin-top:16px">
        <a href="#" style="width:36px;height:36px;background:rgba(200,164,94,0.1);border-radius:10px;display:flex;align-items:center;justify-content:center"><i class="fab fa-facebook-f" style="color:var(--timber);font-size:14px"></i></a>
        <a href="#" style="width:36px;height:36px;background:rgba(200,164,94,0.1);border-radius:10px;display:flex;align-items:center;justify-content:center"><i class="fab fa-instagram" style="color:var(--timber);font-size:14px"></i></a>
        <a href="#" style="width:36px;height:36px;background:rgba(200,164,94,0.1);border-radius:10px;display:flex;align-items:center;justify-content:center"><i class="fab fa-youtube" style="color:var(--timber);font-size:14px"></i></a>
      </div>
    </div>
    <div>
      <h4 style="color:#fff;font-weight:700;font-size:14px;margin-bottom:16px">Services</h4>
      <div style="display:flex;flex-direction:column;gap:10px">
        <a href="#services" style="color:#64705e;font-size:13px">Selective Logging</a>
        <a href="#services" style="color:#64705e;font-size:13px">Clear-Cut Harvesting</a>
        <a href="#services" style="color:#64705e;font-size:13px">Cable Yarding</a>
        <a href="#services" style="color:#64705e;font-size:13px">Land Clearing</a>
        <a href="#services" style="color:#64705e;font-size:13px">Road Building</a>
        <a href="#services" style="color:#64705e;font-size:13px">Timber Cruising</a>
      </div>
    </div>
    <div>
      <h4 style="color:#fff;font-weight:700;font-size:14px;margin-bottom:16px">Company</h4>
      <div style="display:flex;flex-direction:column;gap:10px">
        <a href="#about" style="color:#64705e;font-size:13px">About Us</a>
        <a href="#projects" style="color:#64705e;font-size:13px">Our Work</a>
        <a href="#equipment" style="color:#64705e;font-size:13px">Equipment</a>
        <a href="#reviews" style="color:#64705e;font-size:13px">Reviews</a>
        <a href="#faq" style="color:#64705e;font-size:13px">FAQ</a>
        <a href="#contact" style="color:#64705e;font-size:13px">Contact</a>
      </div>
    </div>
    <div>
      <h4 style="color:#fff;font-weight:700;font-size:14px;margin-bottom:16px">Contact</h4>
      <p style="color:#64705e;font-size:13px;line-height:2"><i class="fas fa-phone-alt" style="color:var(--timber);width:20px"></i> (360) 903-5144<br><i class="fas fa-envelope" style="color:var(--timber);width:20px"></i> info@kaskilogging.com<br><i class="fas fa-map-marker-alt" style="color:var(--timber);width:20px"></i> Amboy, WA 98601</p>
    </div>
  </div>
  <div style="max-width:1200px;margin:40px auto 0;border-top:1px solid #1a2a16;padding-top:24px;text-align:center">
    <p style="color:#3d4a36;font-size:12px">&copy; 2025 Kaski Logging, Inc. All rights reserved. WA Contractor License #KASKIL*835LJ | UBI 602-806-754</p>
    <p style="color:#3d4a36;font-size:11px;margin-top:10px">Built by <a href="https://www.simplebuildai.com" target="_blank" rel="noopener" style="color:var(--timber);text-decoration:none;font-weight:600">SimpleBuild AI</a></p>
  </div>
</footer>

<!-- Contact Form Submission & Analytics -->
<script>
async function submitContactForm(e) {
  e.preventDefault();
  var btn = document.getElementById('cf_submit');
  var msg = document.getElementById('formMsg');
  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  msg.style.display = 'none';
  try {
    var res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        first_name: document.getElementById('cf_first').value.trim(),
        last_name: document.getElementById('cf_last').value.trim(),
        phone: document.getElementById('cf_phone').value.trim(),
        email: document.getElementById('cf_email').value.trim(),
        service_needed: document.getElementById('cf_service').value,
        acreage: document.getElementById('cf_acreage').value.trim(),
        details: document.getElementById('cf_details').value.trim()
      })
    });
    var data = await res.json();
    if (data.success) {
      msg.style.background = 'rgba(27,58,26,0.08)';
      msg.style.color = '#1b3a1a';
      msg.style.border = '1px solid rgba(27,58,26,0.2)';
      msg.innerHTML = '<i class="fas fa-check-circle"></i> ' + data.message;
      msg.style.display = 'block';
      document.getElementById('contactForm').reset();
    } else {
      msg.style.background = 'rgba(220,38,38,0.08)';
      msg.style.color = '#dc2626';
      msg.style.border = '1px solid rgba(220,38,38,0.2)';
      msg.innerHTML = '<i class="fas fa-exclamation-circle"></i> ' + (data.error || 'Something went wrong.');
      msg.style.display = 'block';
    }
  } catch (err) {
    msg.style.background = 'rgba(220,38,38,0.08)';
    msg.style.color = '#dc2626';
    msg.style.border = '1px solid rgba(220,38,38,0.2)';
    msg.innerHTML = '<i class="fas fa-exclamation-circle"></i> Network error. Please call us at (360) 903-5144.';
    msg.style.display = 'block';
  }
  btn.disabled = false;
  btn.innerHTML = '<i class="fas fa-paper-plane"></i> Request Free Estimate';
  return false;
}
// Track page view
try { fetch('/api/pageview', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ path: location.pathname, referrer: document.referrer }) }); } catch(e){}
</script>
</body></html>`
}

// ── API Routes ──

// POST /api/contact — Save contact form submission to D1
app.post('/api/contact', async (c) => {
  try {
    const body = await c.req.json()
    const { first_name, last_name, phone, email, service_needed, acreage, details } = body

    if (!first_name || !last_name) {
      return c.json({ success: false, error: 'First name and last name are required.' }, 400)
    }

    const result = await c.env.DB.prepare(
      `INSERT INTO contact_submissions (first_name, last_name, phone, email, service_needed, acreage, details)
       VALUES (?, ?, ?, ?, ?, ?, ?)`
    ).bind(first_name, last_name, phone || null, email || null, service_needed || null, acreage || null, details || null).run()

    return c.json({ success: true, id: result.meta.last_row_id, message: 'Thank you! We will contact you within 24 hours.' })
  } catch (err: any) {
    return c.json({ success: false, error: 'Something went wrong. Please call us at (360) 903-5144.' }, 500)
  }
})

// GET /api/submissions — List all contact submissions (admin)
app.get('/api/submissions', async (c) => {
  try {
    const { results } = await c.env.DB.prepare(
      `SELECT * FROM contact_submissions ORDER BY created_at DESC LIMIT 100`
    ).all()
    return c.json({ success: true, submissions: results })
  } catch (err: any) {
    return c.json({ success: false, error: err.message }, 500)
  }
})

// GET /api/submissions/:id — Get single submission
app.get('/api/submissions/:id', async (c) => {
  try {
    const id = c.req.param('id')
    const submission = await c.env.DB.prepare(
      `SELECT * FROM contact_submissions WHERE id = ?`
    ).bind(id).first()
    if (!submission) return c.json({ success: false, error: 'Not found' }, 404)
    return c.json({ success: true, submission })
  } catch (err: any) {
    return c.json({ success: false, error: err.message }, 500)
  }
})

// PATCH /api/submissions/:id/status — Update submission status
app.patch('/api/submissions/:id/status', async (c) => {
  try {
    const id = c.req.param('id')
    const { status } = await c.req.json()
    if (!['new', 'contacted', 'scheduled', 'completed', 'archived'].includes(status)) {
      return c.json({ success: false, error: 'Invalid status' }, 400)
    }
    await c.env.DB.prepare(
      `UPDATE contact_submissions SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`
    ).bind(status, id).run()
    return c.json({ success: true })
  } catch (err: any) {
    return c.json({ success: false, error: err.message }, 500)
  }
})

// POST /api/submissions/:id/notes — Add a note to a submission
app.post('/api/submissions/:id/notes', async (c) => {
  try {
    const id = c.req.param('id')
    const { note } = await c.req.json()
    if (!note) return c.json({ success: false, error: 'Note text is required' }, 400)
    const result = await c.env.DB.prepare(
      `INSERT INTO submission_notes (submission_id, note) VALUES (?, ?)`
    ).bind(id, note).run()
    return c.json({ success: true, id: result.meta.last_row_id })
  } catch (err: any) {
    return c.json({ success: false, error: err.message }, 500)
  }
})

// GET /api/submissions/:id/notes — Get notes for a submission
app.get('/api/submissions/:id/notes', async (c) => {
  try {
    const id = c.req.param('id')
    const { results } = await c.env.DB.prepare(
      `SELECT * FROM submission_notes WHERE submission_id = ? ORDER BY created_at DESC`
    ).bind(id).all()
    return c.json({ success: true, notes: results })
  } catch (err: any) {
    return c.json({ success: false, error: err.message }, 500)
  }
})

// POST /api/pageview — Track a page view
app.post('/api/pageview', async (c) => {
  try {
    const { path, referrer } = await c.req.json()
    const ua = c.req.header('user-agent') || ''
    const ip = c.req.header('cf-connecting-ip') || c.req.header('x-forwarded-for') || ''
    // Simple hash to avoid storing raw IPs
    const ipHash = ip ? btoa(ip).slice(0, 12) : ''
    await c.env.DB.prepare(
      `INSERT INTO page_views (path, referrer, user_agent, ip_hash) VALUES (?, ?, ?, ?)`
    ).bind(path || '/', referrer || null, ua, ipHash).run()
    return c.json({ success: true })
  } catch {
    return c.json({ success: true }) // Don't fail the page for analytics
  }
})

// GET /api/stats — Basic analytics
app.get('/api/stats', async (c) => {
  try {
    const total = await c.env.DB.prepare(`SELECT COUNT(*) as count FROM page_views`).first()
    const today = await c.env.DB.prepare(
      `SELECT COUNT(*) as count FROM page_views WHERE date(created_at) = date('now')`
    ).first()
    const submissions = await c.env.DB.prepare(
      `SELECT status, COUNT(*) as count FROM contact_submissions GROUP BY status`
    ).all()
    return c.json({ success: true, stats: { total_views: total?.count, today_views: today?.count, submissions: submissions.results } })
  } catch (err: any) {
    return c.json({ success: false, error: err.message }, 500)
  }
})

// ── Page Routes ──
app.get('/', (c) => c.html(kaskiLogging()))
app.get('/index', (c) => c.html(kaskiLogging()))

export default app
