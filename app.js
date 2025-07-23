// PDF Report Generation Placeholder
document.addEventListener('DOMContentLoaded', function() {
  var pdfBtn = document.getElementById('generate-pdf');
  if (pdfBtn) {
    pdfBtn.addEventListener('click', function() {
      alert('PDF Report: हाईवे हाइब्रिड विंड-सोलर पावर सिस्टम की detailed report generate हो रही है। Production में यह feature jsPDF library के साथ implement होगा।');
    });
  }
});
// Responsive NavBar Hide/Show on Scroll (Mobile Only)
let lastScrollY = window.scrollY;
const navBar = document.querySelector('.nav-bar');
function handleNavBarScroll() {
  if (window.innerWidth > 768) {
    navBar.classList.remove('hide-on-scroll');
    return;
  }
  if (window.scrollY <= 0) {
    navBar.classList.remove('hide-on-scroll');
    lastScrollY = window.scrollY;
    return;
  }
  if (window.scrollY > lastScrollY) {
    navBar.classList.add('hide-on-scroll');
  } else {
    navBar.classList.remove('hide-on-scroll');
  }
  lastScrollY = window.scrollY;
}
window.addEventListener('scroll', handleNavBarScroll);
window.addEventListener('resize', handleNavBarScroll);
// Application data
const projectData = {
  project_overview: {
    title: "हाईवे हाइब्रिड विंड-सोलर पावर सिस्टम",
    concept: "Highway divider पर vertical axis wind turbines और solar panels का combination जो vehicles की wind energy और solar energy दोनों का उपयोग करता है",
    applications: ["Street lighting", "Village power supply", "Grid connection", "EV charging stations"],
    benefits: ["24/7 energy generation", "Carbon neutral", "Cost effective", "Scalable solution"]
  },
  components: {
    wind_turbines: {
      type: "Vertical Axis Wind Turbine (VAWT)",
      capacity: "0.5kW each",
      quantity: 4,
      max_rpm: 750,
      cut_in_speed: "3 m/s",
      rated_speed: "6 m/s",
      efficiency: "25-35%"
    },
    solar_panels: {
      type: "Monocrystalline Solar Panel",
      capacity: "400W each",
      quantity: 6,
      total_capacity: "2.4kW",
      efficiency: "20-22%",
      tilt_angle: "45 degrees"
    },
    battery_system: {
      type: "Lithium-ion Battery Bank",
      capacity: "500Ah @ 48V",
      total_energy: "24kWh",
      efficiency: "90-95%",
      backup_duration: "18 hours",
      charging_time: "6-8 hours"
    },
    led_lights: {
      type: "LED Street Lights",
      power: "50W each",
      quantity: 20,
      operation: "12 hours daily",
      total_consumption: "12kWh daily"
    }
  },
  performance_data: {
    daily_generation: "16.0 kWh",
    daily_consumption: "12.0 kWh", 
    excess_energy: "4.0 kWh",
    system_efficiency: "78-82%",
    capacity_factor: "39.8%",
    carbon_reduction: "8,484 kg CO2 annually",
    wind_contribution: {
      60: 31.4,
      80: 74.5,
      100: 145.5
    },
    solar_contribution: {
      morning: 80,
      noon: 400,
      evening: 240,
      daily_average: 224
    }
  },
  cost_analysis: {
    total_cost: 715000,
    breakdown: {
      "Wind Turbines": 200000,
      "Battery System": 150000,
      "Solar Panels": 120000,
      "Installation": 100000,
      "LED Lights": 60000,
      "Power Electronics": 45000,
      "Project Management": 40000
    }
  }
};

// Language toggle functionality
let currentLanguage = 'hi';
const translations = {
  hi: {
    home: "होम",
    overview: "सिस्टम ओवरव्यू",
    components: "कंपोनेंट्स",
    performance: "प्रदर्शन डेटा",
    energyFlow: "एनर्जी फ्लो",
    costAnalysis: "कॉस्ट एनालिसिस",
    implementation: "इम्प्लीमेंटेशन"
  },
  en: {
    home: "Home",
    overview: "System Overview",
    components: "Components",
    performance: "Performance Data",
    energyFlow: "Energy Flow",
    costAnalysis: "Cost Analysis",
    implementation: "Implementation"
  }
};

// DOM Elements
let dailyChart, monthlyChart, costPieChart;
let isInitialized = false;

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM Content Loaded');
  initializeNavigation();
  initializeHamburgerMenu();
  initializeInteractivePoints();
  initializeSimulationControls();
  initializeCharts();
  initializeEnergyFlowScenarios();
  initializeReportGeneration();
  updatePerformanceData();
  isInitialized = true;
  console.log('Application initialized');
});

// Navigation functionality
function initializeNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.section');
  
  console.log('Found nav links:', navLinks.length);
  console.log('Found sections:', sections.length);
  
  navLinks.forEach((link, index) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('Nav link clicked:', link.getAttribute('data-section'));
      
      const targetSection = link.getAttribute('data-section');
      
      // Update active nav link
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      
      // Update active section
      sections.forEach(section => {
        section.classList.remove('active');
      });
      
      const targetSectionElement = document.getElementById(targetSection);
      if (targetSectionElement) {
        targetSectionElement.classList.add('active');
        console.log('Activated section:', targetSection);
        
        // Initialize charts if switching to performance section
        if (targetSection === 'performance' && isInitialized) {
          setTimeout(initializeCharts, 100);
        }
        
        // Initialize cost chart if switching to cost analysis
        if (targetSection === 'cost-analysis' && isInitialized) {
          setTimeout(initializeCostPieChart, 100);
        }
      } else {
        console.error('Target section not found:', targetSection);
      }
    });
  });

  // Language toggle
  const languageToggle = document.querySelector('.language-toggle');
  if (languageToggle) {
    languageToggle.addEventListener('click', toggleLanguage);
  }
  
  // Set first nav link as active by default
  if (navLinks.length > 0) {
    navLinks.forEach(l => l.classList.remove('active'));
    navLinks[0].classList.add('active');
  }
  // Set only the welcome section as active by default
  sections.forEach(section => {
    if (section.id === 'welcome') {
      section.classList.add('active');
    } else {
      section.classList.remove('active');
    }
  });
}

// Hamburger menu functionality
function initializeHamburgerMenu() {
  const navToggle = document.querySelector('.nav-toggle');
  const navLinksWrapper = document.querySelector('.nav-links-wrapper');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!navToggle || !navLinksWrapper) return;

  navToggle.addEventListener('click', function() {
    navToggle.classList.toggle('open');
    navLinksWrapper.classList.toggle('active');
  });

  // Close menu when a nav-link is clicked (on mobile)
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        navToggle.classList.remove('open');
        navLinksWrapper.classList.remove('active');
      }
    });
  });
}

// Interactive points functionality
function initializeInteractivePoints() {
  const points = document.querySelectorAll('.point');
  const componentInfo = document.getElementById('component-info');
  
  if (!componentInfo) {
    console.warn('Component info element not found');
    return;
  }
  
  const componentDetails = {
    turbine: {
      title: 'Vertical Axis Wind Turbine',
      description: 'वर्टिकल एक्सिस विंड टर्बाइन highway पर vehicles की wind energy को capture करती है। यह 0.5kW capacity की है और 750 RPM तक चल सकती है।',
      specs: ['Capacity: 0.5kW each', 'Quantity: 4 units', 'Max RPM: 750', 'Cut-in Speed: 3 m/s']
    },
    solar: {
      title: 'Solar Panel System',
      description: 'Monocrystalline solar panels जो sun energy को electrical energy में convert करते हैं। कुल 6 panels हैं जिनकी combined capacity 2.4kW है।',
      specs: ['Type: Monocrystalline', 'Capacity: 400W each', 'Quantity: 6 panels', 'Efficiency: 20-22%']
    },
    battery: {
      title: 'Battery Storage System',
      description: 'Lithium-ion battery bank जो generated energy को store करती है। यह 24kWh की total capacity रखती है और 18 hours का backup देती है।',
      specs: ['Type: Lithium-ion', 'Capacity: 500Ah @ 48V', 'Total Energy: 24kWh', 'Backup: 18 hours']
    },
    lights: {
      title: 'LED Street Lights',
      description: 'Energy efficient LED street lights जो highway को illuminate करती हैं। हर light 50W की है और daily 12 hours operate करती है।',
      specs: ['Power: 50W each', 'Quantity: 20 lights', 'Operation: 12 hours daily', 'Total Consumption: 12kWh daily']
    }
  };
  
  points.forEach(point => {
    point.addEventListener('click', (e) => {
      e.preventDefault();
      const component = point.getAttribute('data-component');
      const details = componentDetails[component];
      
      if (details) {
        componentInfo.innerHTML = `
          <h3>${details.title}</h3>
          <p>${details.description}</p>
          <ul>
            ${details.specs.map(spec => `<li>${spec}</li>`).join('')}
          </ul>
        `;
        console.log('Updated component info for:', component);
      }
    });
  });
}

// Simulation controls functionality
function initializeSimulationControls() {
  const speedSlider = document.getElementById('speed-slider');
  const sunSlider = document.getElementById('sun-slider');
  const lightsSlider = document.getElementById('lights-slider');
  
  const speedValue = document.getElementById('speed-value');
  const sunValue = document.getElementById('sun-value');
  const lightsValue = document.getElementById('lights-value');
  
  if (speedSlider && speedValue) {
    speedSlider.addEventListener('input', (e) => {
      speedValue.textContent = e.target.value;
      updatePerformanceData();
    });
  }
  
  if (sunSlider && sunValue) {
    sunSlider.addEventListener('input', (e) => {
      sunValue.textContent = e.target.value;
      updatePerformanceData();
    });
  }
  
  if (lightsSlider && lightsValue) {
    lightsSlider.addEventListener('input', (e) => {
      lightsValue.textContent = e.target.value;
      updatePerformanceData();
    });
  }
}

// Update performance data based on slider values
function updatePerformanceData() {
  const speed = parseInt(document.getElementById('speed-slider')?.value || 80);
  const sunIntensity = parseInt(document.getElementById('sun-slider')?.value || 70);
  const activeLights = parseInt(document.getElementById('lights-slider')?.value || 20);
  
  // Calculate wind power based on speed
  let windPowerPerTurbine;
  if (speed <= 60) {
    windPowerPerTurbine = 31.4;
  } else if (speed <= 80) {
    windPowerPerTurbine = 74.5;
  } else {
    windPowerPerTurbine = 145.5;
  }
  
  const totalWindPower = windPowerPerTurbine * 4;
  
  // Calculate solar power based on sun intensity
  const maxSolarPower = 400 * 6; // 6 panels * 400W each
  const totalSolarPower = (maxSolarPower * sunIntensity) / 100;
  
  // Calculate total generation and consumption
  const totalGeneration = totalWindPower + totalSolarPower;
  const totalConsumption = activeLights * 50; // 50W per light
  
  // Update display
  const windPowerEl = document.getElementById('wind-power');
  const solarPowerEl = document.getElementById('solar-power');
  const totalPowerEl = document.getElementById('total-power');
  const consumptionEl = document.getElementById('consumption');
  
  if (windPowerEl) windPowerEl.textContent = Math.round(totalWindPower) + 'W';
  if (solarPowerEl) solarPowerEl.textContent = Math.round(totalSolarPower) + 'W';
  if (totalPowerEl) totalPowerEl.textContent = Math.round(totalGeneration) + 'W';
  if (consumptionEl) consumptionEl.textContent = Math.round(totalConsumption) + 'W';
  
  // Update battery status
  const netPower = totalGeneration - totalConsumption;
  const batteryPercentage = Math.max(20, Math.min(100, 85 + (netPower / 100)));
  const batteryStatus = netPower > 0 ? 'Charging' : netPower < 0 ? 'Discharging' : 'Stable';
  
  const batteryLevelEl = document.getElementById('battery-level');
  const batteryPercentageEl = document.getElementById('battery-percentage');
  const batteryStatusEl = document.getElementById('battery-status');
  
  if (batteryLevelEl) batteryLevelEl.style.height = batteryPercentage + '%';
  if (batteryPercentageEl) batteryPercentageEl.textContent = Math.round(batteryPercentage) + '%';
  if (batteryStatusEl) batteryStatusEl.textContent = batteryStatus;
  
  // Update energy flow values
  const windFlowEl = document.getElementById('wind-flow-value');
  const solarFlowEl = document.getElementById('solar-flow-value');
  const batteryFlowEl = document.getElementById('battery-flow-value');
  const excessFlowEl = document.getElementById('excess-flow-value');
  
  if (windFlowEl) windFlowEl.textContent = (totalWindPower / 1000).toFixed(1) + 'kW';
  if (solarFlowEl) solarFlowEl.textContent = (totalSolarPower / 1000).toFixed(1) + 'kW';
  if (batteryFlowEl) batteryFlowEl.textContent = (totalConsumption / 1000).toFixed(1) + 'kW';
  if (excessFlowEl) excessFlowEl.textContent = Math.max(0, netPower / 1000).toFixed(1) + 'kW';
}

// Initialize charts
function initializeCharts() {
  initializeDailyChart();
  initializeMonthlyChart();
  if (document.getElementById('cost-pie-chart')) {
    initializeCostPieChart();
  }
}

function initializeDailyChart() {
  const ctx = document.getElementById('daily-chart');
  if (!ctx) return;
  
  // Destroy existing chart if it exists
  if (dailyChart) {
    dailyChart.destroy();
  }
  
  const hours = Array.from({length: 24}, (_, i) => i + ':00');
  const solarData = [0, 0, 0, 0, 0, 0, 80, 160, 240, 320, 400, 380, 360, 340, 280, 220, 160, 80, 0, 0, 0, 0, 0, 0];
  const windData = Array.from({length: 24}, () => 60 + Math.random() * 40);
  
  dailyChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: hours,
      datasets: [{
        label: 'Solar Power (W)',
        data: solarData,
        borderColor: '#FFC185',
        backgroundColor: 'rgba(255, 193, 133, 0.1)',
        fill: true
      }, {
        label: 'Wind Power (W)',
        data: windData,
        borderColor: '#1FB8CD',
        backgroundColor: 'rgba(31, 184, 205, 0.1)',
        fill: true
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Power (W)'
          }
        },
        x: {
          title: {
            display: true,
            text: 'Time (Hours)'
          }
        }
      }
    }
  });
}

function initializeMonthlyChart() {
  const ctx = document.getElementById('monthly-chart');
  if (!ctx) return;
  
  // Destroy existing chart if it exists
  if (monthlyChart) {
    monthlyChart.destroy();
  }
  
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthlyData = [450, 480, 520, 580, 620, 580, 550, 560, 540, 510, 470, 440];
  
  monthlyChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: months,
      datasets: [{
        label: 'Monthly Energy (kWh)',
        data: monthlyData,
        backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F', '#DB4545', '#D2BA4C', '#964325', '#944454', '#13343B', '#1FB8CD', '#FFC185']
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Energy (kWh)'
          }
        }
      }
    }
  });
}

function initializeCostPieChart() {
  const ctx = document.getElementById('cost-pie-chart');
  if (!ctx) return;
  
  // Destroy existing chart if it exists
  if (costPieChart) {
    costPieChart.destroy();
  }
  
  const labels = Object.keys(projectData.cost_analysis.breakdown);
  const data = Object.values(projectData.cost_analysis.breakdown);
  const colors = ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F', '#DB4545', '#D2BA4C'];
  
  costPieChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: colors
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
        }
      }
    }
  });
}

// Energy flow scenarios
function initializeEnergyFlowScenarios() {
  const scenarioButtons = document.querySelectorAll('.scenario-btn');
  
  scenarioButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      scenarioButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      const scenario = button.getAttribute('data-scenario');
      updateEnergyFlowScenario(scenario);
    });
  });
}

function updateEnergyFlowScenario(scenario) {
  const scenarios = {
    day: {
      wind: 0.3,
      solar: 1.7,
      battery: 1.0,
      excess: 1.0
    },
    night: {
      wind: 0.4,
      solar: 0,
      battery: 1.0,
      excess: 0
    },
    cloudy: {
      wind: 0.5,
      solar: 0.4,
      battery: 0.9,
      excess: 0
    }
  };
  
  const values = scenarios[scenario];
  const windFlowEl = document.getElementById('wind-flow-value');
  const solarFlowEl = document.getElementById('solar-flow-value');
  const batteryFlowEl = document.getElementById('battery-flow-value');
  const excessFlowEl = document.getElementById('excess-flow-value');
  
  if (windFlowEl) windFlowEl.textContent = values.wind + 'kW';
  if (solarFlowEl) solarFlowEl.textContent = values.solar + 'kW';
  if (batteryFlowEl) batteryFlowEl.textContent = values.battery + 'kW';
  if (excessFlowEl) excessFlowEl.textContent = values.excess + 'kW';
}

// Report generation
function initializeReportGeneration() {
  const pdfBtn = document.getElementById('generate-pdf');
  const exportBtn = document.getElementById('export-data');
  const printBtn = document.getElementById('print-report');
  
  if (pdfBtn) pdfBtn.addEventListener('click', generatePDFReport);
  if (exportBtn) exportBtn.addEventListener('click', exportData);
  if (printBtn) printBtn.addEventListener('click', printReport);
}

function generatePDFReport() {
  // Simulate PDF generation
  alert('PDF Report: हाईवे हाइब्रिड विंड-सोलर पावर सिस्टम की detailed report generate हो रही है। Production में यह feature jsPDF library के साथ implement होगा।');
  
  // In a real implementation, you would:
  // 1. Collect all data from the application
  // 2. Create a formatted PDF using jsPDF or similar
  // 3. Include charts, tables, and analysis
  // 4. Download the generated PDF
}

function exportData() {
  // Create CSV data
  const csvData = [
    ['Component', 'Specification', 'Value'],
    ['Wind Turbines', 'Capacity', '0.5kW each'],
    ['Wind Turbines', 'Quantity', '4 units'],
    ['Solar Panels', 'Capacity', '400W each'],
    ['Solar Panels', 'Quantity', '6 panels'],
    ['Battery System', 'Capacity', '500Ah @ 48V'],
    ['Battery System', 'Total Energy', '24kWh'],
    ['LED Lights', 'Power', '50W each'],
    ['LED Lights', 'Quantity', '20 lights'],
    ['', '', ''],
    ['Cost Analysis', '', ''],
    ['Total Cost', '', '₹7,15,000'],
    ['Wind Turbines', '', '₹2,00,000'],
    ['Battery System', '', '₹1,50,000'],
    ['Solar Panels', '', '₹1,20,000'],
    ['Installation', '', '₹1,00,000'],
    ['LED Lights', '', '₹60,000'],
    ['Power Electronics', '', '₹45,000'],
    ['Project Management', '', '₹40,000'],
    ['', '', ''],
    ['Performance Data', '', ''],
    ['Daily Generation', '', '16.0 kWh'],
    ['Daily Consumption', '', '12.0 kWh'],
    ['Excess Energy', '', '4.0 kWh'],
    ['System Efficiency', '', '78-82%']
  ];
  
  const csvContent = csvData.map(row => row.join(',')).join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.setAttribute('hidden', '');
  a.setAttribute('href', url);
  a.setAttribute('download', 'highway-hybrid-power-system-data.csv');
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  
  alert('Data export complete! CSV file downloaded successfully.');
}

function printReport() {
  // Create a print-friendly version
  const printWindow = window.open('', '_blank');
  const printContent = generatePrintContent();
  
  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Highway Hybrid Wind-Solar Power System Report</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        h1, h2, h3 { color: #1FB8CD; }
        table { border-collapse: collapse; width: 100%; margin-bottom: 20px; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
        .section { page-break-before: always; }
        .no-break { page-break-inside: avoid; }
      </style>
    </head>
    <body>
      ${printContent}
    </body>
    </html>
  `);
  
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
}

function generatePrintContent() {
  return `
    <h1>हाईवे हाइब्रिड विंड-सोलर पावर सिस्टम</h1>
    <h2>Highway Hybrid Wind-Solar Power System</h2>
    
    <div class="section">
      <h2>Project Overview</h2>
      <p>This innovative renewable energy solution combines vertical axis wind turbines and solar panels on highway dividers, utilizing both wind energy from vehicles and solar energy.</p>
      
      <h3>Key Benefits</h3>
      <ul>
        <li>24/7 energy generation</li>
        <li>Carbon neutral solution</li>
        <li>Cost effective implementation</li>
        <li>Scalable design</li>
      </ul>
    </div>
    
    <div class="section">
      <h2>System Components</h2>
      <table>
        <tr><th>Component</th><th>Specification</th><th>Quantity</th><th>Capacity</th></tr>
        <tr><td>Vertical Axis Wind Turbines</td><td>VAWT</td><td>4 units</td><td>0.5kW each</td></tr>
        <tr><td>Solar Panels</td><td>Monocrystalline</td><td>6 panels</td><td>400W each</td></tr>
        <tr><td>Battery System</td><td>Lithium-ion</td><td>1 bank</td><td>500Ah @ 48V</td></tr>
        <tr><td>LED Street Lights</td><td>LED</td><td>20 lights</td><td>50W each</td></tr>
      </table>
    </div>
    
    <div class="section">
      <h2>Performance Data</h2>
      <table>
        <tr><th>Parameter</th><th>Value</th></tr>
        <tr><td>Daily Generation</td><td>16.0 kWh</td></tr>
        <tr><td>Daily Consumption</td><td>12.0 kWh</td></tr>
        <tr><td>Excess Energy</td><td>4.0 kWh</td></tr>
        <tr><td>System Efficiency</td><td>78-82%</td></tr>
        <tr><td>Carbon Reduction</td><td>8,484 kg CO₂ annually</td></tr>
      </table>
    </div>
    
    <div class="section">
      <h2>Cost Analysis</h2>
      <table>
        <tr><th>Component</th><th>Cost (₹)</th><th>Percentage</th></tr>
        <tr><td>Wind Turbines</td><td>2,00,000</td><td>28%</td></tr>
        <tr><td>Battery System</td><td>1,50,000</td><td>21%</td></tr>
        <tr><td>Solar Panels</td><td>1,20,000</td><td>17%</td></tr>
        <tr><td>Installation</td><td>1,00,000</td><td>14%</td></tr>
        <tr><td>LED Lights</td><td>60,000</td><td>8%</td></tr>
        <tr><td>Power Electronics</td><td>45,000</td><td>6%</td></tr>
        <tr><td>Project Management</td><td>40,000</td><td>6%</td></tr>
        <tr><th>Total Cost</th><th>7,15,000</th><th>100%</th></tr>
      </table>
      
      <h3>Financial Analysis</h3>
      <ul>
        <li>Annual Savings: ₹47,466</li>
        <li>Payback Period: 19.2 years</li>
        <li>ROI: 5.2% annually</li>
        <li>Government Subsidy: 30% (₹2,14,500)</li>
      </ul>
    </div>
  `;
}

// Language toggle function
function toggleLanguage() {
  currentLanguage = currentLanguage === 'hi' ? 'en' : 'hi';
  
  // Update navigation text
  document.querySelectorAll('.nav-link').forEach((link, index) => {
    const keys = Object.keys(translations.hi);
    if (keys[index]) {
      link.textContent = translations[currentLanguage][keys[index]];
    }
  });
  
  // Update language toggle button
  document.querySelector('.language-toggle').textContent = currentLanguage === 'hi' ? 'EN' : 'HI';
}

// Utility functions
function formatCurrency(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0
  }).format(amount);
}

function formatNumber(num) {
  return new Intl.NumberFormat('en-IN').format(num);
}