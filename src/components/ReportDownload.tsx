import React, { useState } from 'react';
import { Download, FileText, Mail, User, Building, Users, CheckCircle, X } from 'lucide-react';
import { useCalculatorContext } from '../context/CalculatorContext';

interface ReportDownloadProps {
  isOpen: boolean;
  onClose: () => void;
}

const ReportDownload: React.FC<ReportDownloadProps> = ({ isOpen, onClose }) => {
  const { calculatorData } = useCalculatorContext();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: '',
    employees: '',
    industry: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const industries = [
    'Technology', 'Healthcare', 'Financial Services', 'Manufacturing', 
    'Retail', 'Education', 'Professional Services', 'Government', 'Other'
  ];

  const employeeRanges = [
    '1-10', '11-50', '51-100', '101-500', '501-1000', '1000+'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      generateAndDownloadReport();
    }, 2000);
  };

  const generateAndDownloadReport = () => {
    // Generate comprehensive report content
    const reportContent = generateReportHTML();
    
    // Create and download the report
    const blob = new Blob([reportContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `HR_Impact_Plan_${formData.company || 'Report'}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const generateReportHTML = () => {
    // Generate dashboard data summary
    const results = {
      communication: calculatorData.communication?.result || 480000,
      engagement: calculatorData.engagement?.result || 670000,
      turnover: calculatorData.turnover?.result || 400000,
      absence: calculatorData.absence?.result || 92307,
      service: calculatorData.service?.result || 182500,
      profit: calculatorData.profit?.result || 20000
    };

    const totalLoss = Object.values(results).reduce((sum, value) => sum + value, 0) - results.profit;

    const chartData = [
      { name: 'Communication Cost', value: results.communication, color: '#3b82f6' },
      { name: 'Engagement Loss', value: results.engagement, color: '#10b981' },
      { name: 'Turnover Cost', value: results.turnover, color: '#ef4444' },
      { name: 'Absence Cost', value: results.absence, color: '#8b5cf6' },
      { name: 'Service Loss', value: results.service, color: '#ec4899' },
    ];

    // Sort by value to get top 3 costs
    const topThreeCosts = [...chartData].sort((a, b) => b.value - a.value).slice(0, 3);
    const maxValue = Math.max(...chartData.map(item => item.value));

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
        .calculator-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; }
        .calculator-card { 
            background: #f8fafc; 
            padding: 20px; 
            border-radius: 8px; 
            border: 2px solid #e2e8f0;
        }
        .calculator-card h4 { color: #1e40af; margin-bottom: 10px; }
        .benchmark-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        .benchmark-table th, .benchmark-table td { 
            padding: 12px; 
            text-align: left; 
            border-bottom: 1px solid #e2e8f0; 
        }
        .benchmark-table th { background: #f1f5f9; color: #1e40af; font-weight: bold; }
        .case-study { 
            background: #f0fdf4; 
            padding: 20px; 
            border-left: 4px solid #10b981; 
            margin: 20px 0;
        }
        .case-study h4 { color: #065f46; margin-bottom: 10px; }
        .roi-highlight { 
            background: linear-gradient(135deg, #10b981, #059669); 
            color: white; 
            padding: 25px; 
            border-radius: 12px; 
            text-align: center; 
            margin: 20px 0;
        }
        .roi-highlight .roi-number { font-size: 3em; font-weight: bold; margin-bottom: 10px; }
        .template-section { background: #fefce8; border: 2px dashed #eab308; }
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
        .company-info { 
            background: #e0f2fe; 
            padding: 20px; 
            border-radius: 8px; 
            margin-bottom: 20px;
        }
        @media print {
            body { background: white; }
            .section { box-shadow: none; border: 1px solid #ddd; }
        }
    </style>
</head>
<body>
    <div class="header">
        <div style="display: flex; align-items: center; justify-content: center; margin-bottom: 15px;">
            <img src="https://hrimpactlab.com/wp-content/uploads/2025/06/hril.png" alt="HR Impact Lab Logo" style="width: 50px; height: 50px; margin-right: 15px; border-radius: 8px; background: rgba(255,255,255,0.1); padding: 5px;" />
            <div>
                <h1 style="margin: 0; font-size: 2.5em;">HR Impact Plan</h1>
            </div>
        </div>
        <p>Targeted Solutions for Your Biggest People Strategy Issues</p>
        <p>Generated by HR Impact Lab | ${new Date().toLocaleDateString()}</p>
    </div>

    ${formData.company ? `
    <div class="company-info">
        <h3>Prepared for: ${formData.company}</h3>
        <p><strong>Contact:</strong> ${formData.name} (${formData.role})</p>
        <p><strong>Company Size:</strong> ${formData.employees} employees | <strong>Industry:</strong> ${formData.industry}</p>
    </div>
    ` : ''}

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
        
        <p><strong>Action Plan Focus:</strong> This report addresses your priority areas with targeted root-cause solutions.</p>
    </div>

    <div class="section executive-summary">
        <h2>🎯 Your Priority Action Areas</h2>
        <p>Based on your calculator results, these are the root causes driving your biggest costs. Address these systematically for maximum impact.</p>
        
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

        <p><strong>The Strategy:</strong> Focus on the fundamental drivers rather than symptoms. This plan targets the core issues creating your biggest financial losses.</p>
    </div>

    <div class="section">
        <h2>🔍 Common Causes</h2>
        <p>Most HR issues share common causes. Address these fundamentals to solve multiple problems simultaneously:</p>
        
        <div class="calculator-grid">
            <div class="calculator-card">
                <h4>Communication Issues</h4>
                <p><strong>Root Cause:</strong> Managers lack communication training and clear processes.</p>
                <p><strong>Fix:</strong> Train managers on clear communication standards, implement weekly 1-on-1s.</p>
                <p><strong>Impact:</strong> Reduces communication costs by 60-80%</p>
            </div>
            
            <div class="calculator-card">
                <h4>Low Engagement</h4>
                <p><strong>Root Cause:</strong> Employees don't understand their impact or see career progression.</p>
                <p><strong>Fix:</strong> Create clear career pathways and regular recognition systems.</p>
                <p><strong>Impact:</strong> Increases productivity 20-35%</p>
            </div>
            
            <div class="calculator-card">
                <h4>High Turnover</h4>
                <p><strong>Root Cause:</strong> Poor onboarding and lack of manager support.</p>
                <p><strong>Fix:</strong> 90-day structured onboarding with manager check-ins.</p>
                <p><strong>Impact:</strong> Reduces turnover by 40-60%</p>
            </div>
            
            <div class="calculator-card">
                <h4>Excessive Absence</h4>
                <p><strong>Root Cause:</strong> Work-life balance issues and unclear absence policies.</p>
                <p><strong>Fix:</strong> Flexible working options and wellness support.</p>
                <p><strong>Impact:</strong> Reduces unplanned absence 30-50%</p>
            </div>
            
            <div class="calculator-card">
                <h4>Service Quality Issues</h4>
                <p><strong>Root Cause:</strong> Insufficient training and unclear service standards.</p>
                <p><strong>Fix:</strong> Regular skills training and customer service protocols.</p>
                <p><strong>Impact:</strong> Improves service quality 40-70%</p>
            </div>
            
            <div class="calculator-card">
                <h4>Low Profitability per Employee</h4>
                <p><strong>Root Cause:</strong> Misaligned goals and inefficient processes.</p>
                <p><strong>Fix:</strong> Align individual goals with business outcomes.</p>
                <p><strong>Impact:</strong> Increases profit per employee 15-25%</p>
            </div>
        </div>
    </div>

    <div class="section">
        <h2>⚡ Quick Impact Actions</h2>
        <p>Start with these high-impact, low-cost interventions to see immediate results:</p>
        
        <div class="case-study">
            <h4>Week 1-2: Manager Communication Toolkit</h4>
            <p><strong>Action:</strong> Train all managers on weekly 1-on-1 conversations and clear email communication.</p>
            <p><strong>Cost:</strong> Internal time only</p>
            <div class="roi-highlight">
                <div class="roi-number">30%</div>
                <div>Communication improvement in 30 days</div>
            </div>
        </div>

        <div class="case-study">
            <h4>Month 1: Recognition & Career Clarity</h4>
            <p><strong>Action:</strong> Create clear career progression maps and implement peer recognition system.</p>
            <p><strong>Cost:</strong> £2,000-5,000</p>
            <div class="roi-highlight">
                <div class="roi-number">40%</div>
                <div>Engagement boost in 90 days</div>
            </div>
        </div>

        <div class="case-study">
            <h4>Month 2-3: Onboarding & Wellness</h4>
            <p><strong>Action:</strong> Implement 90-day onboarding checklist and flexible working policies.</p>
            <p><strong>Cost:</strong> £5,000-10,000</p>
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

    <div class="section">
        <h2>📊 Track Your Success</h2>
        <p>Measure these 5 key metrics monthly to prove ROI:</p>

        <ul class="checklist">
            <li><strong>Employee Net Promoter Score (eNPS)</strong> - Target: +20 or above</li>
            <li><strong>Voluntary Turnover Rate</strong> - Target: Reduce by 30% in 6 months</li>
            <li><strong>Time to Productivity (New Hires)</strong> - Target: Reduce by 25%</li>
            <li><strong>Manager 1-on-1 Completion Rate</strong> - Target: 95% weekly completion</li>
            <li><strong>Internal Promotion Fill Rate</strong> - Target: 60% of roles filled internally</li>
        </ul>
        
        <div class="roi-highlight">
            <div>Remember: Small improvements in these areas create massive financial returns</div>
        </div>
    </div>

    <div class="footer">
        <h3>About HR Impact Lab</h3>
        <p>Founded by Kate Box, HR Impact Lab bridges the gap between people and profit through strategic HR leadership. With a scientific approach rooted in biological principles, we help organizations understand that "people are the DNA of your business."</p>
        <p><strong>Contact:</strong> Visit www.hrimpactlab.com for consulting services, training programs, and ongoing support.</p>
        <p><em>"HR should drive business success, not just support it."</em> - Kate Box</p>
        
        <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #374151;">
            <p style="font-size: 0.9em; opacity: 0.8;">
                This report was generated using the People Strategy ROI Calculator Suite.<br>
                For the latest version and updates, visit our online calculator at your organization's portal.
            </p>
        </div>
    </div>
</body>
</html>
    `;
  };

  const resetAndClose = () => {
    setFormData({
      name: '',
      email: '',
      company: '',
      role: '',
      employees: '',
      industry: ''
    });
    setIsSuccess(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Download HR Impact Plan</h2>
              <p className="text-sm text-blue-100">Targeted Solutions for Your Biggest Issues</p>
            </div>
          </div>
          <button
            onClick={resetAndClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 120px)' }}>
          {!isSuccess ? (
            <>
              {/* Report Preview */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">What's Included in Your HR Impact Plan</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Root Cause Analysis</p>
                        <p className="text-gray-600">Why these issues happen and how to fix them</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Quick Impact Actions</p>
                        <p className="text-gray-600">High-impact, low-cost interventions</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">90-Day Implementation</p>
                        <p className="text-gray-600">Step-by-step checklist for quick wins</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Success Metrics</p>
                        <p className="text-gray-600">Key measures to track your ROI progress</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Cost-Effective Solutions</p>
                        <p className="text-gray-600">Low-cost, high-impact interventions</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Manager Training Tools</p>
                        <p className="text-gray-600">Practical resources for immediate use</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <User className="w-4 h-4 inline mr-1" />
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <Mail className="w-4 h-4 inline mr-1" />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <Building className="w-4 h-4 inline mr-1" />
                      Company Name
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Your organization"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Job Role
                    </label>
                    <input
                      type="text"
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Your position"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <Users className="w-4 h-4 inline mr-1" />
                      Company Size
                    </label>
                    <select
                      name="employees"
                      value={formData.employees}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select size</option>
                      {employeeRanges.map(range => (
                        <option key={range} value={range}>{range} employees</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Industry
                    </label>
                    <select
                      name="industry"
                      value={formData.industry}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select industry</option>
                      {industries.map(industry => (
                        <option key={industry} value={industry}>{industry}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Why we ask:</strong> Your company information helps us customize 
                    the report with relevant benchmarks and industry-specific insights.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-semibold flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                  ) : (
                    <>
                      <Download className="w-5 h-5" />
                      <span>Generate & Download HR Impact Plan</span>
                    </>
                  )}
                </button>
              </form>
            </>
          ) : (
            /* Success State */
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">HR Impact Plan Downloaded Successfully!</h3>
              <p className="text-gray-600 mb-6">
                Your personalized HR Impact Plan has been downloaded. 
                Check your downloads folder for the complete action plan.
              </p>
              <div className="bg-green-50 p-4 rounded-lg mb-6">
                <p className="text-sm text-green-800">
                  <strong>Next Steps:</strong> Review the methodology section first, then use our online calculators 
                  to input your specific data. The business case templates will help you present findings to leadership.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={resetAndClose}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-medium"
                >
                  Start Using Calculators
                </button>
                <a
                  href="https://www.hrimpactlab.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 border-blue-600 text-blue-600 px-6 py-2 rounded-lg hover:bg-blue-50 transition-all duration-200 font-medium"
                >
                  Contact Kate Box
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportDownload;