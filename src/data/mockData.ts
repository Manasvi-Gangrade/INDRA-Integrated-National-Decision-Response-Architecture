// ===== WEATHER ALERTS =====
export interface WeatherAlert {
  id: string;
  state: string;
  type: 'cyclone' | 'flood' | 'heatwave' | 'drought' | 'earthquake' | 'landslide';
  severity: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  description: string;
  affectedDistricts: number;
  affectedPopulation: string;
  timestamp: string;
}

export const weatherAlerts: WeatherAlert[] = [
  { id: 'WA001', state: 'Odisha', type: 'cyclone', severity: 'critical', title: 'Cyclone DANA approaching coast', description: 'Category 4 cyclone expected to make landfall near Puri within 48 hours. Wind speeds up to 185 km/h.', affectedDistricts: 14, affectedPopulation: '8.2M', timestamp: '2026-03-09T06:30:00Z' },
  { id: 'WA002', state: 'Assam', type: 'flood', severity: 'high', title: 'Brahmaputra river above danger mark', description: 'Water level at Guwahati gauge at 49.68m against danger level of 49.30m.', affectedDistricts: 22, affectedPopulation: '5.1M', timestamp: '2026-03-09T04:15:00Z' },
  { id: 'WA003', state: 'Rajasthan', type: 'heatwave', severity: 'high', title: 'Severe heatwave in western districts', description: 'Maximum temperatures exceeding 48°C in Barmer, Jaisalmer, Jodhpur districts.', affectedDistricts: 8, affectedPopulation: '3.4M', timestamp: '2026-03-09T09:00:00Z' },
  { id: 'WA004', state: 'Kerala', type: 'landslide', severity: 'medium', title: 'Landslide warning in Wayanad', description: 'Heavy rainfall triggering soil saturation in hilly terrain. Multiple villages at risk.', affectedDistricts: 3, affectedPopulation: '0.8M', timestamp: '2026-03-09T07:45:00Z' },
  { id: 'WA005', state: 'Maharashtra', type: 'drought', severity: 'medium', title: 'Drought conditions in Marathwada', description: 'Rainfall deficit of 42% in kharif season. Reservoirs at 18% capacity.', affectedDistricts: 8, affectedPopulation: '4.6M', timestamp: '2026-03-08T18:00:00Z' },
  { id: 'WA006', state: 'Uttarakhand', type: 'earthquake', severity: 'low', title: 'Minor seismic activity near Chamoli', description: 'Magnitude 3.2 tremor detected. No damage reported. Monitoring ongoing.', affectedDistricts: 2, affectedPopulation: '0.3M', timestamp: '2026-03-09T02:12:00Z' },
];

// ===== ECONOMIC INDICATORS =====
export interface EconomicIndicator {
  name: string;
  value: string;
  change: number;
  trend: 'up' | 'down' | 'stable';
  period: string;
}

export const economicIndicators: EconomicIndicator[] = [
  { name: 'GDP Growth Rate', value: '7.2%', change: 0.3, trend: 'up', period: 'Q3 FY26' },
  { name: 'Inflation (CPI)', value: '4.8%', change: -0.2, trend: 'down', period: 'Feb 2026' },
  { name: 'Fiscal Deficit', value: '5.1% GDP', change: -0.4, trend: 'down', period: 'FY26 Est.' },
  { name: 'Forex Reserves', value: '$648.3B', change: 2.1, trend: 'up', period: 'Mar 2026' },
  { name: 'Industrial Production', value: '5.7%', change: 0.8, trend: 'up', period: 'Jan 2026' },
  { name: 'Unemployment Rate', value: '6.1%', change: -0.3, trend: 'down', period: 'Feb 2026' },
  { name: 'Rupee/USD', value: '₹83.42', change: -0.15, trend: 'down', period: 'Live' },
  { name: 'Sensex', value: '78,432', change: 1.2, trend: 'up', period: 'Live' },
];

// ===== CITIZEN GRIEVANCES =====
export interface GrievanceCategory {
  category: string;
  count: number;
  resolved: number;
  pending: number;
  avgResolutionDays: number;
}

export const grievanceData: GrievanceCategory[] = [
  { category: 'Public Distribution System', count: 42350, resolved: 38120, pending: 4230, avgResolutionDays: 12 },
  { category: 'MGNREGA Payments', count: 38900, resolved: 31120, pending: 7780, avgResolutionDays: 18 },
  { category: 'PM-KISAN Disbursement', count: 28450, resolved: 25605, pending: 2845, avgResolutionDays: 8 },
  { category: 'Healthcare Access', count: 22100, resolved: 17680, pending: 4420, avgResolutionDays: 15 },
  { category: 'Road Infrastructure', count: 19800, resolved: 13860, pending: 5940, avgResolutionDays: 25 },
  { category: 'Water Supply', count: 17600, resolved: 14080, pending: 3520, avgResolutionDays: 14 },
  { category: 'Education Services', count: 15200, resolved: 12920, pending: 2280, avgResolutionDays: 10 },
  { category: 'Electricity Supply', count: 14100, resolved: 11280, pending: 2820, avgResolutionDays: 7 },
];

// ===== SCHEME ENROLLMENT =====
export interface SchemeMetric {
  schemeName: string;
  enrolled: string;
  target: string;
  percentage: number;
  budget: string;
  disbursed: string;
  states: number;
}

export const schemeMetrics: SchemeMetric[] = [
  { schemeName: 'PM-KISAN', enrolled: '11.8 Cr', target: '14.5 Cr', percentage: 81, budget: '₹75,000 Cr', disbursed: '₹62,400 Cr', states: 36 },
  { schemeName: 'Ayushman Bharat', enrolled: '23.4 Cr', target: '50 Cr', percentage: 47, budget: '₹7,200 Cr', disbursed: '₹5,100 Cr', states: 33 },
  { schemeName: 'PM Awas Yojana', enrolled: '2.95 Cr', target: '4 Cr', percentage: 74, budget: '₹79,000 Cr', disbursed: '₹58,200 Cr', states: 36 },
  { schemeName: 'Jal Jeevan Mission', enrolled: '12.3 Cr', target: '19.4 Cr', percentage: 63, budget: '₹60,000 Cr', disbursed: '₹41,800 Cr', states: 36 },
  { schemeName: 'MGNREGA', enrolled: '7.2 Cr', target: '8 Cr', percentage: 90, budget: '₹86,000 Cr', disbursed: '₹72,100 Cr', states: 34 },
  { schemeName: 'Ujjwala Yojana', enrolled: '9.8 Cr', target: '10 Cr', percentage: 98, budget: '₹12,800 Cr', disbursed: '₹12,200 Cr', states: 36 },
];

// ===== MONTHLY TREND DATA =====
export const monthlyTrendData = [
  { month: 'Oct', grievances: 18200, resolved: 15400, enrollment: 82, alerts: 12 },
  { month: 'Nov', grievances: 19800, resolved: 17100, enrollment: 84, alerts: 8 },
  { month: 'Dec', grievances: 21500, resolved: 18900, enrollment: 85, alerts: 15 },
  { month: 'Jan', grievances: 23100, resolved: 20400, enrollment: 87, alerts: 22 },
  { month: 'Feb', grievances: 24800, resolved: 22100, enrollment: 88, alerts: 18 },
  { month: 'Mar', grievances: 22400, resolved: 20800, enrollment: 89, alerts: 14 },
];

// ===== STATE RISK DATA FOR MAP =====
export interface StateRiskData {
  name: string;
  code: string;
  riskLevel: 'critical' | 'high' | 'medium' | 'low' | 'stable';
  alerts: number;
  grievances: number;
  schemeProgress: number;
  population: string;
  topIssue: string;
}

export const stateRiskData: StateRiskData[] = [
  { name: 'Odisha', code: 'OD', riskLevel: 'critical', alerts: 5, grievances: 8420, schemeProgress: 72, population: '4.6 Cr', topIssue: 'Cyclone DANA' },
  { name: 'Assam', code: 'AS', riskLevel: 'critical', alerts: 4, grievances: 6200, schemeProgress: 65, population: '3.5 Cr', topIssue: 'Brahmaputra floods' },
  { name: 'Rajasthan', code: 'RJ', riskLevel: 'high', alerts: 3, grievances: 12400, schemeProgress: 78, population: '8.1 Cr', topIssue: 'Severe heatwave' },
  { name: 'Kerala', code: 'KL', riskLevel: 'high', alerts: 2, grievances: 4100, schemeProgress: 88, population: '3.5 Cr', topIssue: 'Landslide risk' },
  { name: 'Maharashtra', code: 'MH', riskLevel: 'medium', alerts: 2, grievances: 18900, schemeProgress: 82, population: '12.5 Cr', topIssue: 'Marathwada drought' },
  { name: 'Uttar Pradesh', code: 'UP', riskLevel: 'medium', alerts: 1, grievances: 28400, schemeProgress: 71, population: '23.1 Cr', topIssue: 'PDS distribution delays' },
  { name: 'Bihar', code: 'BR', riskLevel: 'medium', alerts: 1, grievances: 15200, schemeProgress: 68, population: '12.4 Cr', topIssue: 'MGNREGA delays' },
  { name: 'Tamil Nadu', code: 'TN', riskLevel: 'low', alerts: 1, grievances: 9800, schemeProgress: 91, population: '7.7 Cr', topIssue: 'Water supply in Chennai' },
  { name: 'Karnataka', code: 'KA', riskLevel: 'low', alerts: 0, grievances: 7600, schemeProgress: 86, population: '6.8 Cr', topIssue: 'Rural road connectivity' },
  { name: 'Gujarat', code: 'GJ', riskLevel: 'stable', alerts: 0, grievances: 6200, schemeProgress: 92, population: '7.0 Cr', topIssue: 'Industrial growth' },
  { name: 'Madhya Pradesh', code: 'MP', riskLevel: 'low', alerts: 1, grievances: 11200, schemeProgress: 76, population: '8.5 Cr', topIssue: 'PM-KISAN delays' },
  { name: 'West Bengal', code: 'WB', riskLevel: 'medium', alerts: 2, grievances: 14800, schemeProgress: 62, population: '10.1 Cr', topIssue: 'Scheme enrollment gaps' },
  { name: 'Andhra Pradesh', code: 'AP', riskLevel: 'low', alerts: 1, grievances: 7200, schemeProgress: 84, population: '5.3 Cr', topIssue: 'Cyclone preparedness' },
  { name: 'Telangana', code: 'TS', riskLevel: 'stable', alerts: 0, grievances: 5400, schemeProgress: 89, population: '3.9 Cr', topIssue: 'Healthcare access' },
  { name: 'Punjab', code: 'PB', riskLevel: 'stable', alerts: 0, grievances: 4800, schemeProgress: 88, population: '3.1 Cr', topIssue: 'Farm policy' },
  { name: 'Haryana', code: 'HR', riskLevel: 'low', alerts: 0, grievances: 5100, schemeProgress: 85, population: '2.9 Cr', topIssue: 'Air quality' },
  { name: 'Uttarakhand', code: 'UK', riskLevel: 'medium', alerts: 2, grievances: 3200, schemeProgress: 79, population: '1.1 Cr', topIssue: 'Seismic monitoring' },
  { name: 'Jharkhand', code: 'JH', riskLevel: 'medium', alerts: 1, grievances: 8900, schemeProgress: 64, population: '3.8 Cr', topIssue: 'Mining governance' },
  { name: 'Chhattisgarh', code: 'CG', riskLevel: 'low', alerts: 0, grievances: 5600, schemeProgress: 77, population: '2.9 Cr', topIssue: 'Tribal welfare' },
  { name: 'Himachal Pradesh', code: 'HP', riskLevel: 'low', alerts: 1, grievances: 2100, schemeProgress: 90, population: '0.7 Cr', topIssue: 'Tourism infrastructure' },
  { name: 'Jammu & Kashmir', code: 'JK', riskLevel: 'medium', alerts: 1, grievances: 3800, schemeProgress: 70, population: '1.4 Cr', topIssue: 'Security operations' },
  { name: 'Goa', code: 'GA', riskLevel: 'stable', alerts: 0, grievances: 800, schemeProgress: 94, population: '0.2 Cr', topIssue: 'Coastal management' },
  { name: 'Manipur', code: 'MN', riskLevel: 'high', alerts: 2, grievances: 2800, schemeProgress: 58, population: '0.3 Cr', topIssue: 'Civil unrest' },
  { name: 'Meghalaya', code: 'ML', riskLevel: 'low', alerts: 1, grievances: 1600, schemeProgress: 72, population: '0.3 Cr', topIssue: 'Border flooding' },
  { name: 'Tripura', code: 'TR', riskLevel: 'stable', alerts: 0, grievances: 1200, schemeProgress: 82, population: '0.4 Cr', topIssue: 'Connectivity' },
  { name: 'Nagaland', code: 'NL', riskLevel: 'low', alerts: 0, grievances: 900, schemeProgress: 68, population: '0.2 Cr', topIssue: 'Infrastructure' },
  { name: 'Mizoram', code: 'MZ', riskLevel: 'stable', alerts: 0, grievances: 600, schemeProgress: 80, population: '0.1 Cr', topIssue: 'Healthcare' },
  { name: 'Arunachal Pradesh', code: 'AR', riskLevel: 'low', alerts: 1, grievances: 700, schemeProgress: 62, population: '0.2 Cr', topIssue: 'Border infrastructure' },
  { name: 'Sikkim', code: 'SK', riskLevel: 'stable', alerts: 0, grievances: 400, schemeProgress: 91, population: '0.07 Cr', topIssue: 'Tourism' },
];

// ===== SIMULATION STEPS =====
export interface SimulationStep {
  module: 'INDRA CORE' | 'INDRA VOICE' | 'INDRA PILOT';
  title: string;
  description: string;
  details: string[];
  duration: number; // seconds for animation
}

export const simulationSteps: SimulationStep[] = [
  {
    module: 'INDRA CORE',
    title: 'Risk Signal Detection',
    description: 'INDRA CORE aggregates multi-source intelligence from IMD weather feeds, satellite imagery, social media sentiment, and IoT sensor networks.',
    details: [
      'IMD Alert: Cyclone DANA — Category 4, landfall in 48h near Puri coast',
      'Satellite: Unusual cloud formation detected over Bay of Bengal',
      'Social Media: 12,400 posts mentioning flooding fears in Odisha',
      'IoT Sensors: River gauge at Mahanadi showing 2.3m rise in 6 hours',
    ],
    duration: 4,
  },
  {
    module: 'INDRA CORE',
    title: 'Risk Assessment & Classification',
    description: 'AI models classify the threat level, estimate affected population, and calculate resource requirements.',
    details: [
      'Threat Level: CRITICAL — Probability of severe impact: 89%',
      'Affected Population: 8.2 million across 14 districts',
      'Estimated Evacuations Required: 1.2 million people',
      'Resource Gap: 340 relief camps needed, 280 currently available',
    ],
    duration: 3,
  },
  {
    module: 'INDRA VOICE',
    title: 'Citizen Communication Initiated',
    description: 'INDRA VOICE activates multilingual early warning systems via SMS, IVR calls, WhatsApp, and local PA systems.',
    details: [
      'SMS Blast: 4.2 million messages sent in Odia, Hindi, English',
      'IVR Calls: 180,000 automated calls to vulnerable households',
      'WhatsApp Alerts: 890,000 messages via government chatbot',
      'PA System: 2,400 village-level announcements triggered',
    ],
    duration: 4,
  },
  {
    module: 'INDRA VOICE',
    title: 'Citizen Feedback Loop',
    description: 'Real-time sentiment analysis from citizen responses to calibrate evacuation urgency and resource allocation.',
    details: [
      'Response Rate: 67% within first 2 hours',
      'Evacuation Willingness: 78% of at-risk families confirmed',
      'Resource Requests: 12,400 requests for medical assistance',
      'Sentiment: Fear index at 7.2/10, declining as info reaches communities',
    ],
    duration: 3,
  },
  {
    module: 'INDRA PILOT',
    title: 'Leadership Briefing Generated',
    description: 'INDRA PILOT compiles a real-time executive brief for PMO, NDMA, and state leadership with actionable recommendations.',
    details: [
      'Briefing Type: FLASH REPORT — Immediate Action Required',
      'Key Decision: Authorize NDRF deployment of 18 battalions',
      'Budget Impact: Emergency allocation of ₹2,400 Cr recommended',
      'Timeline: 36-hour window for pre-positioning relief materials',
    ],
    duration: 4,
  },
  {
    module: 'INDRA PILOT',
    title: 'Coordinated Response Dashboard',
    description: 'Live coordination dashboard tracking deployment, evacuation progress, and resource utilization across all agencies.',
    details: [
      'NDRF Teams: 14/18 battalions deployed, ETA 4-8 hours',
      'Evacuation Progress: 340,000 of 1.2M evacuated (28%)',
      'Relief Camps: 310 operational, food for 5 days secured',
      'Medical Teams: 42 mobile units deployed, 8 helicopters on standby',
    ],
    duration: 3,
  },
];

// ===== REGIONAL PERFORMANCE =====
export const regionalPerformance = [
  { region: 'North', enrollment: 84, grievanceResolution: 82, alertResponse: 91, budget: 88 },
  { region: 'South', enrollment: 91, grievanceResolution: 89, alertResponse: 94, budget: 92 },
  { region: 'East', enrollment: 72, grievanceResolution: 71, alertResponse: 78, budget: 74 },
  { region: 'West', enrollment: 88, grievanceResolution: 85, alertResponse: 90, budget: 89 },
  { region: 'Central', enrollment: 76, grievanceResolution: 74, alertResponse: 82, budget: 78 },
  { region: 'Northeast', enrollment: 68, grievanceResolution: 65, alertResponse: 72, budget: 66 },
];
