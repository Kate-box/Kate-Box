import React, { useState } from 'react';
import { BarChart3, PieChart, TrendingUp, Download, Share2 } from 'lucide-react';
import BookCallModal from './BookCallModal';
import { useCalculatorContext } from '../context/CalculatorContext';

const ResultsDashboard = () => {
  const { calculatorData } = useCalculatorContext();
  const [showBookCallModal, setShowBookCallModal] = useState(false);
  
  // Use real data from calculators or fallback to mock data
  const getCalculatorResult = (type, fallback) => {
    return calculatorData[type]?.result || fallback;
  };

  const results = {
    communication: getCalculatorResult('communication', 480000),
    engagement: getCalculatorResult('engagement', 670000),
    turnover: getCalculatorResult('turnover', 400000),
    absence: getCalculatorResult('absence', 92307),
    service: getCalculatorResult('service', 182500),
    profit: getCalculatorResult('profit', 20000)
  };

  const totalLoss = Object.values(results).reduce((sum, value) => sum + value, 0) - results.profit;

  const chartData = [
    { name: 'Communication Cost', value: results.communication, color: 'bg-blue-500', type: 'communication', action: 'Improve Communication', description: 'Implement clear communication standards and training' },
    { name: 'Engagement Loss', value: results.engagement, color: 'bg-green-500', type: 'engagement', action: 'Address Engagement Crisis', description: 'Start with pulse surveys and manager training' },
    { name: 'Turnover Cost', value: results.turnover, color: 'bg-red-500', type: 'turnover', action: 'Retention Strategy', description: 'Focus on career development and recognition programs' },
    { name: 'Absence Cost', value: results.absence, color: 'bg-purple-500', type: 'absence', action: 'Reduce Absenteeism', description: 'Implement wellness programs and flexible working' },
    { name: 'Service Loss', value: results.service, color: 'bg-pink-500', type: 'service', action: 'Quality Improvement', description: 'Enhance training and service standards' },
  ];

  // Sort by value to get top 3 costs
  const topThreeCosts = [...chartData].sort((a, b) => b.value - a.value).slice(0, 3);

  const maxValue = Math.max(...chartData.map(item => item.value));

  return (
    <section id="dashboard" className="py-20 bg-gradient-to-br from-gray-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
            Your People Strategy Impact Dashboard
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Visualize the financial impact across all areas of your people strategy
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Summary Cards */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl p-6 text-white shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <TrendingUp className="w-8 h-8" />
                <span className="text-sm opacity-90">Annual Impact</span>
              </div>
              <div className="text-3xl font-bold mb-2">£{totalLoss.toLocaleString()}</div>
              <div className="text-sm opacity-90">Total estimated loss per year</div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommended Next Steps</h3>
              <div className="space-y-3">
                {topThreeCosts.map((cost, index) => {
                  const bgColors = ['bg-red-50', 'bg-orange-50', 'bg-yellow-50'];
                  const textColors = ['text-red-900', 'text-orange-900', 'text-yellow-900'];
                  const badgeColors = ['bg-red-600', 'bg-orange-600', 'bg-yellow-600'];
                  const descColors = ['text-red-700', 'text-orange-700', 'text-yellow-700'];
                  
                  return (
                    <div key={cost.type} className={`flex items-start space-x-3 p-3 ${bgColors[index]} rounded-lg`}>
                      <div className={`w-6 h-6 ${badgeColors[index]} rounded-full flex items-center justify-center flex-shrink-0 mt-0.5`}>
                        <span className="text-white text-sm font-bold">{index + 1}</span>
                      </div>
                      <div className="flex-1">
                        <div className={`font-medium ${textColors[index]} flex items-center justify-between`}>
                          <span>{cost.action}</span>
                          <span className="text-sm font-semibold">£{cost.value.toLocaleString()}</span>
                        </div>
                        <div className={`text-sm ${descColors[index]}`}>{cost.description}</div>
                      </div>
                    </div>
                  );
                })}
                
                <button 
                  onClick={() => {
                    // Generate the visual HTML report like the original ReportDownload component
                    const generateReportHTML = () => {
                      return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HR Impact Plan</title>
    <style>
        body { 
            font-family: 'Arial', sans-serif; 
            line-height: 1.6; 
            color: #333; 
            max-width: 800px; 
            margin: 0 auto; 
            padding: 20px;
            background: #f8fafc;
        }
        .header { 
            background: linear-gradient(135deg, #087590, #0f766e); 
            color: white; 
            padding: 30px; 
            border-radius: 15px; 
            margin-bottom: 30px;
            text-align: center;
        }
        .header h1 { margin: 0; font-size: 2.5em; }
        .header p { margin: 10px 0 0 0; font-size: 1.2em; opacity: 0.9; }
        .section { 
            background: white; 
            padding: 30px; 
            margin-bottom: 25px; 
            border-radius: 12px; 
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        .section h2 { 
            color: #1e40af; 
            border-bottom: 3px solid #3b82f6; 
            padding-bottom: 10px; 
            margin-bottom: 20px;
        }
        .executive-summary { background: #eff6ff; border-left: 5px solid #3b82f6; }
        .key-stat { 
            display: inline-block; 
            background: #fee2e2; 
            padding: 15px; 
            margin: 10px; 
            border-radius: 8px; 
            text-align: center;
            min-width: 150px;
        }
        .key-stat .number { font-size: 2em; font-weight: bold; color: #dc2626; }
        .key-stat .label { font-size: 0.9em; color: #666; }
        .roi-highlight { 
            background: linear-gradient(135deg, #10b981, #059669); 
            color: white; 
            padding: 25px; 
            border-radius: 12px; 
            text-align: center; 
            margin: 20px 0;
        }
        .roi-highlight .roi-number { font-size: 3em; font-weight: bold; margin-bottom: 10px; }
        .case-study { 
            background: #f0fdf4; 
            padding: 20px; 
            border-left: 4px solid #10b981; 
            margin: 20px 0;
        }
        .case-study h4 { color: #065f46; margin-bottom: 10px; }
        .checklist { list-style: none; padding: 0; }
        .checklist li { padding: 8px 0; }
        .checklist li:before { content: "✓ "; color: #10b981; font-weight: bold; }
        .footer { 
            background: #1f2937; 
            color: white; 
            padding: 30px; 
            border-radius: 12px; 
            text-align: center; 
            margin-top: 30px;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>HR Impact Plan</h1>
        <p>Targeted Solutions for Your Biggest People Strategy Issues</p>
        <p>Generated by HR Impact Lab | ${new Date().toLocaleDateString()}</p>
    </div>

    <div class="section">
        <h2>📊 Your Dashboard Summary</h2>
        <p>Based on your calculator inputs, here's your current financial impact:</p>
        
        <div class="roi-highlight">
            <div class="roi-number">£${totalLoss.toLocaleString()}</div>
            <div>Total Annual Impact</div>
        </div>

        <h3>Cost Breakdown</h3>
        <div style="margin: 20px 0;">
            ${chartData.map(item => `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; padding: 10px; background: #f8fafc; border-radius: 8px;">
                <div style="display: flex; align-items: center;">
                    <div style="width: 20px; height: 20px; background: ${item.color}; border-radius: 4px; margin-right: 10px;"></div>
                    <span style="font-weight: 500;">${item.name}</span>
                </div>
                <span style="font-weight: bold; color: ${item.color};">£${item.value.toLocaleString()}</span>
            </div>
            <div style="margin-bottom: 15px;">
                <div style="width: 100%; background: #e5e7eb; height: 8px; border-radius: 4px;">
                    <div style="width: ${(item.value / maxValue) * 100}%; background: ${item.color}; height: 8px; border-radius: 4px;"></div>
                </div>
            </div>
            `).join('')}
        </div>

        <h3>Your Top 3 Priority Areas</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin: 20px 0;">
            ${topThreeCosts.map((cost, index) => `
            <div style="padding: 15px; background: #fef3c7; border-radius: 8px; text-align: center;">
                <div style="font-size: 1.5em; font-weight: bold; color: #92400e;">${index + 1}</div>
                <div style="font-weight: 500; margin: 5px 0;">${cost.name}</div>
                <div style="color: ${cost.color}; font-weight: bold;">£${cost.value.toLocaleString()}</div>
            </div>
            `).join('')}
        </div>
    </div>

    <div class="section executive-summary">
        <h2>🎯 Your Priority Action Areas</h2>
        <p>Based on your calculator results, these are the root causes driving your biggest costs.</p>
        
        <div style="text-align: center; margin: 20px 0;">
            <div class="key-stat">
                <div class="number">90%</div>
                <div class="label">Issues stem from<br>poor management</div>
            </div>
            <div class="key-stat">
                <div class="number">3x</div>
                <div class="label">Faster results with<br>root cause approach</div>
            </div>
            <div class="key-stat">
                <div class="number">70%</div>
                <div class="label">Cost reduction<br>achievable Year 1</div>
            </div>
        </div>
    </div>

    <div class="section">
        <h2>⚡ Quick Impact Actions</h2>
        
        <div class="case-study">
            <h4>Week 1-2: Manager Communication Toolkit</h4>
            <p><strong>Action:</strong> Train all managers on weekly 1-on-1 conversations and clear email communication.</p>
            <div class="roi-highlight">
                <div class="roi-number">30%</div>
                <div>Communication improvement in 30 days</div>
            </div>
        </div>

        <div class="case-study">
            <h4>Month 1: Recognition & Career Clarity</h4>
            <p><strong>Action:</strong> Create clear career progression maps and implement peer recognition system.</p>
            <div class="roi-highlight">
                <div class="roi-number">40%</div>
                <div>Engagement boost in 90 days</div>
            </div>
        </div>

        <div class="case-study">
            <h4>Month 2-3: Onboarding & Wellness</h4>
            <p><strong>Action:</strong> Implement 90-day onboarding checklist and flexible working policies.</p>
            <div class="roi-highlight">
                <div class="roi-number">50%</div>
                <div>Retention improvement in 6 months</div>
            </div>
        </div>
    </div>

    <div class="section">
        <h2>📋 90-Day Implementation Checklist</h2>
        
        <h3>Days 1-30: Foundation</h3>
        <ul class="checklist">
            <li>Train all managers on weekly 1-on-1 meetings</li>
            <li>Create communication standards document</li>
            <li>Map out career progression paths for key roles</li>
            <li>Set baseline metrics for tracking progress</li>
        </ul>

        <h3>Days 31-60: Systems</h3>
        <ul class="checklist">
            <li>Launch peer recognition program</li>
            <li>Implement 90-day onboarding checklist</li>
            <li>Introduce flexible working policies</li>
            <li>Start monthly engagement pulse surveys</li>
        </ul>

        <h3>Days 61-90: Optimization</h3>
        <ul class="checklist">
            <li>Review early results and adjust approach</li>
            <li>Scale successful interventions</li>
            <li>Plan next phase based on biggest remaining issues</li>
            <li>Present 90-day results to leadership</li>
        </ul>
    </div>

    <div class="footer">
        <h3>About HR Impact Lab</h3>
        <p>Founded by Kate Box, HR Impact Lab bridges the gap between people and profit through strategic HR leadership.</p>
        <p><strong>Contact:</strong> Visit www.hrimpactlab.com for consulting services, training programs, and ongoing support.</p>
        <p><em>"HR should drive business success, not just support it."</em> - Kate Box</p>
    </div>
</body>
</html>
                      `;
                    };

                    // Create and download the visual HTML report
                    const reportContent = generateReportHTML();
                    const blob = new Blob([reportContent], { type: 'text/html' });
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'HR-Impact-Action-Plan.html';
                    document.body.appendChild(a);
                    a.click();
                    window.URL.revokeObjectURL(url);
                    document.body.removeChild(a);

                    console.log('Visual action plan downloaded successfully!');
                    
                    // Show the book call modal after download
                    setTimeout(() => {
                      setShowBookCallModal(true);
                    }, 500);
                  }}
                  className="w-full flex items-center justify-center space-x-2 p-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg transition-colors mt-4"
                >
                  <Download className="w-4 h-4" />
                  <span className="font-medium">Download Full Action Plan</span>
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">ROI Potential</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">10% Improvement</span>
                  <span className="font-semibold text-green-600">£{(totalLoss * 0.1).toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">25% Improvement</span>
                  <span className="font-semibold text-green-600">£{(totalLoss * 0.25).toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">50% Improvement</span>
                  <span className="font-semibold text-green-600">£{(totalLoss * 0.5).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Cost Breakdown</h3>
                <PieChart className="w-6 h-6 text-gray-600" />
              </div>
              
              <div className="space-y-4">
                {chartData.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 font-medium">{item.name}</span>
                      <span className="text-gray-900 font-semibold">£{item.value.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full ${item.color} transition-all duration-1000`}
                        style={{ width: `${(item.value / maxValue) * 100}%` }}
                      ></div>
                    </div>
                    <div className="text-sm text-gray-500">
                      {((item.value / totalLoss) * 100).toFixed(1)}% of total impact
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Input Data Summary */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Your Input Data</h3>
                <BarChart3 className="w-6 h-6 text-gray-600" />
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(calculatorData).map(([key, data]) => (
                  data && (
                    <div key={key} className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-900 capitalize mb-2">{key} Calculator</h4>
                      <div className="text-2xl font-bold text-blue-600 mb-1">
                        £{data.result?.toLocaleString() || '0'}
                      </div>
                      <div className="text-xs text-gray-500">
                        {data.inputs?.totalEmployees && `${data.inputs.totalEmployees} employees`}
                        {data.timestamp && ` • Updated ${new Date(data.timestamp).toLocaleDateString()}`}
                      </div>
                    </div>
                  )
                ))}
              </div>
              
              {Object.keys(calculatorData).length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <p>No calculator data yet. Use the calculators above to see your personalized results here!</p>
                </div>
              )}
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Key Insights</h3>
                <BarChart3 className="w-6 h-6 text-gray-600" />
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                    <h4 className="font-semibold text-red-900 mb-2">Highest Impact Area</h4>
                    <p className="text-red-800 text-sm">
                      Employee engagement issues are costing £{results.engagement.toLocaleString()} annually - 
                      your biggest opportunity for improvement.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-900 mb-2">Communication Gap</h4>
                    <p className="text-blue-800 text-sm">
                      Poor communication is costing £{results.communication.toLocaleString()} - 
                      focus on clarity and alignment initiatives.
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <h4 className="font-semibold text-green-900 mb-2">Quick Win Opportunity</h4>
                    <p className="text-green-800 text-sm">
                      Reducing absence by just 1 day per employee could save 
                      £{(results.absence / 6).toLocaleString()} annually.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <h4 className="font-semibold text-purple-900 mb-2">ROI Potential</h4>
                    <p className="text-purple-800 text-sm">
                      A 25% improvement across all areas could save 
                      £{(totalLoss * 0.25).toLocaleString()} - excellent ROI for people strategy investment.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <BookCallModal 
        isOpen={showBookCallModal} 
        onClose={() => setShowBookCallModal(false)} 
      />
    </section>
  );
};

export default ResultsDashboard;