
(function () {
  'use strict';
  if (typeof Chart === 'undefined') return;

  Chart.defaults.font.family = "IRANSans, Tahoma, Arial, sans-serif";
  Chart.defaults.color = '#697789';
  Chart.defaults.borderColor = 'rgba(17,29,47,.08)';
  Chart.defaults.plugins.legend.labels.usePointStyle = true;
  Chart.defaults.plugins.legend.labels.boxWidth = 8;
  Chart.defaults.plugins.legend.labels.padding = 18;

  var palette = {
    navy: '#111d2f', navy2: '#263950', navy3: '#42556d', navy4: '#66778a', accent: '#75405f', soft: '#aab5c1'
  };

  function baseOptions() {
    return {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      animation: { duration: 650 },
      plugins: { tooltip: { rtl: true, titleAlign: 'right', bodyAlign: 'right', padding: 12 } },
      scales: {
        x: { grid: { display: false }, ticks: { maxRotation: 0, autoSkip: true } },
        y: { beginAtZero: true, grid: { color: 'rgba(17,29,47,.06)' }, ticks: { precision: 0 } }
      }
    };
  }

  new Chart(document.getElementById('opportunityTrend'), {
    type: 'line',
    data: {
      labels: ['فروردین','اردیبهشت','خرداد','تیر','مرداد','شهریور'],
      datasets: [
        { label: 'فرصت‌های ورودی', data: [18,24,21,29,34,31], borderColor: palette.navy, backgroundColor: 'rgba(17,29,47,.08)', fill: true, tension: .35, pointRadius: 3, pointHoverRadius: 5 },
        { label: 'عبور از ارزیابی اولیه', data: [7,10,9,13,16,15], borderColor: palette.accent, backgroundColor: 'rgba(117,64,95,.06)', fill: false, tension: .35, pointRadius: 3, pointHoverRadius: 5 }
      ]
    },
    options: baseOptions()
  });

  new Chart(document.getElementById('industryMix'), {
    type: 'doughnut',
    data: {
      labels: ['فناوری','صنعت','انرژی','خدمات','سایر'],
      datasets: [{ data: [28,24,18,17,13], backgroundColor: [palette.navy,palette.navy2,palette.navy3,palette.navy4,palette.soft], borderWidth: 0, hoverOffset: 6 }]
    },
    options: { responsive: true, maintainAspectRatio: false, cutout: '67%', plugins: { legend: { position: 'bottom' }, tooltip: { rtl: true, callbacks: { label: function(c){ return c.label + ': ' + c.raw + '٪'; } } } } }
  });

  var funnelOptions = baseOptions();
  funnelOptions.indexAxis = 'y';
  funnelOptions.plugins.legend = { display: false };
  funnelOptions.scales.x.ticks = { precision: 0 };
  funnelOptions.scales.y.grid = { display: false };
  new Chart(document.getElementById('screeningFunnel'), {
    type: 'bar',
    data: { labels: ['دریافت','بررسی اولیه','تحلیل تکمیلی','معرفی','مذاکره'], datasets: [{ label: 'تعداد فرصت', data: [100,68,42,24,13], backgroundColor: [palette.navy,palette.navy2,palette.navy3,palette.navy4,palette.accent], borderRadius: 8, borderSkipped: false }] },
    options: funnelOptions
  });

  var scatterOptions = baseOptions();
  scatterOptions.interaction = { mode: 'nearest', intersect: true };
  scatterOptions.scales.x = { min: 0, max: 100, title: { display: true, text: 'امتیاز ریسک' }, grid: { color: 'rgba(17,29,47,.06)' } };
  scatterOptions.scales.y = { min: 0, max: 100, title: { display: true, text: 'امتیاز جذابیت' }, grid: { color: 'rgba(17,29,47,.06)' } };
  scatterOptions.plugins.legend = { display: false };
  new Chart(document.getElementById('riskReturn'), {
    type: 'scatter',
    data: { datasets: [{ label: 'فرصت‌ها', data: [{x:25,y:72},{x:42,y:84},{x:58,y:61},{x:67,y:76},{x:34,y:54},{x:76,y:43},{x:51,y:69}], backgroundColor: palette.accent, pointRadius: 6, pointHoverRadius: 8 }] },
    options: scatterOptions
  });
})();
