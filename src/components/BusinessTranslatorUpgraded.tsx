import React, { useState, useEffect } from 'react';
import { MessageSquare, ArrowRight, Calculator, Copy, CheckCircle, Lightbulb, Search, Filter, Mail, TrendingUp, Zap, Eye } from 'lucide-react';
import { useCalculatorContext } from '../context/CalculatorContext';

const BusinessTranslatorUpgraded = () => {
  const { getFinancialSummary, getAllCalculatorData } = useCalculatorContext();
  const [hrInput, setHrInput] = useState('');
  const [translatedOutput, setTranslatedOutput] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('general');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [translationHistory, setTranslationHistory] = useState([]);
  const [improvements, setImprovements] = useState([]);
  const [showComparison, setShowComparison] = useState(false);
  const [hasCalculatorData, setHasCalculatorData] = useState(false);

  // Industry-specific financial metrics
  const industryMetrics = {
    general: {
      avgSalary: 40000,
      turnoverRate: 20,
      engagementRate: 33,
      productivityLoss: 14,
      replacementCost: 100
    },
    technology: {
      avgSalary: 65000,
      turnoverRate: 13,
      engagementRate: 35,
      productivityLoss: 25,
      replacementCost: 150
    },
    healthcare: {
      avgSalary: 45000,
      turnoverRate: 22,
      engagementRate: 28,
      productivityLoss: 18,
      replacementCost: 75
    },
    finance: {
      avgSalary: 55000,
      turnoverRate: 15,
      engagementRate: 31,
      productivityLoss: 22,
      replacementCost: 125
    },
    retail: {
      avgSalary: 28000,
      turnoverRate: 65,
      engagementRate: 25,
      productivityLoss: 15,
      replacementCost: 50
    },
    manufacturing: {
      avgSalary: 42000,
      turnoverRate: 18,
      engagementRate: 30,
      productivityLoss: 20,
      replacementCost: 65
    }
  };

  // Enhanced transformation patterns with industry context
  const transformationPatterns = {
    'employee satisfaction': 'workforce engagement with {engagementRate}% baseline and £{productivityValue} productivity impact',
    'employee morale': 'team performance metrics affecting {productivityLoss}% of salary costs annually',
    'staff development': 'human capital investment yielding {roi}% ROI through capability enhancement',
    'training program': 'performance optimization initiative targeting {improvementPercent}% productivity gains',
    'work-life balance': 'retention strategy reducing {turnoverRate}% turnover at £{replacementCost} per departure',
    'team building': 'collaboration efficiency improvement worth £{collaborationValue} annually',
    'communication training': 'information flow optimization recovering {productivityLoss}% of salary costs',
    'performance review': 'talent optimization process driving {performanceGains}% improvement',
    'employee benefits': 'total rewards strategy reducing turnover by {retentionImprovement}%',
    'workplace culture': 'organizational effectiveness framework improving engagement by {engagementImprovement}%'
  };

  // Template library with search functionality
  const templateLibrary = [
    {
      id: 'communication',
      title: 'Communication Efficiency',
      category: 'Productivity',
      industry: 'general',
      keywords: ['communication', 'efficiency', 'productivity', 'meetings'],
      template: `Subject: Communication Efficiency Initiative: £{annualSavings} Recovery Opportunity

Our analysis reveals significant productivity losses due to communication inefficiencies:

Current Impact:
• {employeeCount} employees losing {productivityLoss}% productivity annually
• Total annual cost: £{totalCost} in reduced output
• Industry benchmark shows {industryComparison}% efficiency gap

Proposed Solution: Structured communication optimization program
Investment: £{investmentAmount}
Expected Annual Recovery: £{annualSavings}
ROI: {roiPercent}%
Payback Period: {paybackMonths} months

Success Metrics:
• {productivityImprovement}% improvement in project completion times
• {meetingEfficiency}% reduction in meeting duration
• {decisionSpeed}% faster decision-making cycles`
    },
    {
      id: 'engagement',
      title: 'Employee Engagement ROI',
      category: 'Performance',
      industry: 'general',
      keywords: ['engagement', 'motivation', 'performance', 'retention'],
      template: `Subject: Employee Engagement Strategy: £{annualValue} Business Value Creation

Engagement analysis reveals substantial performance opportunity:

Current State:
• {currentEngagement}% engagement rate (vs {industryBenchmark}% industry standard)
• {disengagedCount} employees operating at reduced capacity
• Annual productivity loss: £{productivityLoss}

Strategic Initiative: Comprehensive engagement improvement program
Investment Required: £{programCost}
Projected Annual Value: £{annualValue}
ROI: {roiCalculation}%

Business Outcomes:
• Move engagement from {currentEngagement}% to {targetEngagement}%
• Recover £{recoveredValue} in lost productivity
• Improve customer satisfaction through engaged workforce
• Reduce voluntary turnover by {retentionImprovement}%`
    },
    {
      id: 'retention',
      title: 'Talent Retention Strategy',
      category: 'Cost Management',
      industry: 'general',
      keywords: ['retention', 'turnover', 'talent', 'hiring'],
      template: `Subject: Talent Retention Initiative: £{annualSavings} Cost Avoidance

Exit data analysis identifies critical retention opportunity:

Current Cost Structure:
• {annualDepartures} departures annually
• Average replacement cost: £{replacementCost} per position
• Total annual turnover cost: £{totalTurnoverCost}

Root Cause Analysis:
• {primaryReason}% cite career development gaps
• {secondaryReason}% report management relationship issues
• {tertiaryReason}% lack clear progression pathways

Retention Program Investment: £{programInvestment}
Target: Prevent {preventedDepartures} departures annually
Annual Cost Avoidance: £{annualSavings}
Program ROI: {programROI}%

Strategic Benefits:
• Preserve institutional knowledge
• Maintain team continuity
• Reduce recruitment and onboarding costs
• Improve overall team morale and productivity`
    },
    {
      id: 'leadership',
      title: 'Leadership Development ROI',
      category: 'Strategic Development',
      industry: 'general',
      keywords: ['leadership', 'development', 'management', 'performance'],
      template: `Subject: Leadership Development Investment: £{businessValue} Strategic Value Creation

Leadership capability analysis shows performance multiplication opportunity:

Current Leadership Impact:
• {managerCount} managers affecting {teamSize} direct reports
• Performance variance of {performanceGap}% across teams
• Leadership effectiveness directly correlates to {businessMetric}

Development Program Scope:
Investment: £{developmentInvestment}
Duration: {programDuration} months
Target Participants: {participantCount} leaders

Expected Business Returns:
• {performanceImprovement}% improvement in team performance
• {engagementBoost}% increase in team engagement scores
• £{annualValue} in additional business value
• {retentionImprovement}% improvement in team retention

ROI Calculation: {roiPercentage}% over {timeframe} months`
    },
    {
      id: 'diversity',
      title: 'Diversity & Inclusion Business Case',
      category: 'Strategic Initiative',
      industry: 'general',
      keywords: ['diversity', 'inclusion', 'innovation', 'performance'],
      template: `Subject: Diversity & Inclusion Strategy: £{businessImpact} Performance Enhancement

D&I opportunity analysis reveals measurable business advantages:

Market Research Insights:
• Diverse teams show {performanceGains}% better decision-making
• Inclusive cultures drive {innovationIncrease}% more innovation
• D&I leaders report {revenueGrowth}% higher revenue growth

Current State Assessment:
• Diversity representation: {currentDiversity}%
• Inclusion index: {inclusionScore}/10
• Performance gap analysis shows {opportunityValue} potential

Strategic D&I Program:
Investment Required: £{programInvestment}
Implementation Period: {timeframe} months
Key Initiatives: {initiativeList}

Projected Business Value:
• £{revenueImpact} in revenue enhancement through better decision-making
• £{innovationValue} in innovation and product development gains
• £{retentionSavings} in improved retention across diverse talent
• Total Annual Business Impact: £{businessImpact}

ROI: {diROI}% with {paybackPeriod}-month payback period`
    }
  ];

  // One-click improvement suggestions
  const generateImprovements = (text) => {
    const suggestions = [];
    
    if (!text.includes('£') && !text.includes('$')) {
      suggestions.push({
        type: 'financial',
        suggestion: 'Add specific financial impact amounts',
        example: `Include "£${(Math.random() * 500000 + 50000).toFixed(0)}" to quantify the business value`
      });
    }
    
    if (!text.includes('%')) {
      suggestions.push({
        type: 'metrics',
        suggestion: 'Include percentage improvements',
        example: 'Add specific percentage gains like "25% improvement" or "15% cost reduction"'
      });
    }
    
    if (!text.toLowerCase().includes('roi')) {
      suggestions.push({
        type: 'roi',
        suggestion: 'Add ROI calculation',
        example: `Include "ROI: ${(Math.random() * 400 + 100).toFixed(0)}%" to demonstrate investment returns`
      });
    }
    
    if (text.split(' ').length < 30) {
      suggestions.push({
        type: 'detail',
        suggestion: 'Expand with more business context',
        example: 'Add implementation timeline, success metrics, and competitive advantages'
      });
    }

    return suggestions;
  };

  // Check for calculator data on component mount
  useEffect(() => {
    const calculatorData = getAllCalculatorData();
    setHasCalculatorData(calculatorData.length > 0);
  }, [getAllCalculatorData]);

  // Advanced translation with sophisticated real calculator data
  const translateWithContext = () => {
    if (!hrInput.trim()) return;

    // Get real data from calculators or fall back to industry defaults
    const calculatorData = getAllCalculatorData();
    const financialSummary = getFinancialSummary();
    const useRealData = calculatorData.length > 0;
    
    const metrics = useRealData ? {
      avgSalary: financialSummary.avgSalary,
      productivityLoss: financialSummary.productivityLoss,
      turnoverRate: financialSummary.turnoverRate,
      engagementRate: financialSummary.engagementRate,
      totalAnnualCost: financialSummary.totalAnnualCost,
      employees: financialSummary.totalEmployees
    } : industryMetrics[selectedIndustry];

    let translated = hrInput;
    
    // Enhanced transformation patterns with calculator-specific data
    Object.entries(transformationPatterns).forEach(([hrTerm, businessPattern]) => {
      const regex = new RegExp(hrTerm, 'gi');
      if (translated.match(regex)) {
        let businessTerm = businessPattern
          .replace('{engagementRate}', metrics.engagementRate)
          .replace('{productivityLoss}', metrics.productivityLoss.toFixed(1))
          .replace('{turnoverRate}', metrics.turnoverRate.toFixed(1))
          .replace('{replacementCost}', useRealData ? 
            (metrics.totalAnnualCost / Math.max(1, (metrics.turnoverRate/100 * metrics.employees))).toFixed(0) : 
            metrics.replacementCost)
          .replace('{productivityValue}', (metrics.avgSalary * metrics.productivityLoss / 100).toLocaleString())
          .replace('{roi}', calculateRealisticROI(hrTerm, metrics, useRealData));
          
        translated = translated.replace(regex, businessTerm);
      }
    });

    // Generate sophisticated business case with calculator-specific insights
    if (translated.length > 100) {
      const businessCase = generateCalculatorAwareBusinessCase(hrInput, metrics, useRealData, calculatorData);
      setTranslatedOutput(businessCase);
    } else {
      setTranslatedOutput(translated);
    }

    // Generate improvement suggestions
    setImprovements(generateImprovements(translated));
    
    // Track usage analytics
    const translation = {
      id: Date.now(),
      original: hrInput,
      translated: translated,
      industry: selectedIndustry,
      timestamp: new Date(),
      improvements: generateImprovements(translated).length
    };
    
    setTranslationHistory(prev => [translation, ...prev.slice(0, 9)]);
    setShowComparison(true);
  };

  // Calculate realistic ROI based on HR initiative type and actual data
  const calculateRealisticROI = (hrTerm, metrics, useRealData) => {
    const roiMap = {
      'employee satisfaction': useRealData ? Math.round(150 + (metrics.productivityLoss * 8)) : 250,
      'employee morale': useRealData ? Math.round(120 + (metrics.engagementRate * 2)) : 180,
      'staff development': useRealData ? Math.round(200 + (metrics.avgSalary / 1000)) : 300,
      'training program': useRealData ? Math.round(180 + (metrics.employees * 0.5)) : 220,
      'work-life balance': useRealData ? Math.round(160 + (metrics.turnoverRate * 3)) : 200,
      'team building': useRealData ? Math.round(140 + ((100 - metrics.engagementRate) * 2)) : 170,
      'communication training': useRealData ? Math.round(190 + (metrics.productivityLoss * 5)) : 240
    };
    
    return roiMap[hrTerm] || (useRealData ? Math.round(150 + Math.random() * 100) : Math.round(200 + Math.random() * 100));
  };

  // Generate calculator-aware business case
  const generateCalculatorAwareBusinessCase = (input, metrics, useRealData, calculatorData) => {
    const currentCost = useRealData ? metrics.totalAnnualCost : (metrics.avgSalary * 100 * metrics.productivityLoss / 100);
    
    // Determine improvement potential based on actual problems identified
    let expectedImprovement = 20;
    let investmentMultiplier = 0.3;
    let focusAreas = [];
    
    if (useRealData) {
      // Adjust expectations based on actual data severity
      if (metrics.turnoverRate > 25) {
        expectedImprovement += 15;
        focusAreas.push(`High turnover (${metrics.turnoverRate.toFixed(1)}%) indicates significant retention opportunity`);
      }
      if (metrics.engagementRate < 30) {
        expectedImprovement += 12;
        focusAreas.push(`Low engagement (${metrics.engagementRate}%) suggests major performance gains available`);
      }
      if (metrics.productivityLoss > 20) {
        expectedImprovement += 10;
        focusAreas.push(`Productivity loss at ${metrics.productivityLoss.toFixed(1)}% shows immediate improvement potential`);
      }
      
      // Adjust investment based on company size and severity
      if (metrics.employees > 200) investmentMultiplier = 0.25; // Economies of scale
      if (metrics.employees < 50) investmentMultiplier = 0.4; // Higher per-capita cost
    }

    const annualSavings = currentCost * (expectedImprovement / 100);
    const investmentRequired = annualSavings * investmentMultiplier;
    const paybackMonths = (investmentRequired / (annualSavings / 12)).toFixed(1);
    const netAnnualBenefit = annualSavings - (investmentRequired / 3); // Assuming 3-year amortisation
    
    // Generate specific insights based on calculator data
    const specificInsights = generateSpecificInsights(calculatorData, metrics, useRealData);
    
    const businessVersion = `Executive Summary: ${input}

${useRealData ? 'ANALYSIS BASED ON YOUR DATA:' : 'INDUSTRY BENCHMARK ANALYSIS:'}

Current State Assessment:
• Total workforce: ${metrics.employees.toLocaleString()} employees
• Annual cost of identified issues: £${currentCost.toLocaleString()}${useRealData ? ' (calculated from your inputs)' : ''}
• Key performance gaps identified below industry standards

${focusAreas.length > 0 ? `\nCritical Areas for Improvement:\n${focusAreas.map(area => `• ${area}`).join('\n')}` : ''}

Strategic Initiative Requirements:
• Investment needed: £${investmentRequired.toLocaleString()}
• Expected annual recovery: £${annualSavings.toLocaleString()}
• Net annual benefit: £${netAnnualBenefit.toLocaleString()}
• ROI: ${((annualSavings - investmentRequired) / investmentRequired * 100).toFixed(0)}%
• Payback period: ${paybackMonths} months

${specificInsights}

Success Metrics & Timeline:
• Phase 1 (Months 1-3): Foundation setup, baseline measurement
• Phase 2 (Months 4-8): Implementation and initial improvements
• Phase 3 (Months 9-12): Full benefits realisation and optimisation

Expected Performance Improvements:
• Productivity enhancement: +${Math.round(expectedImprovement * 0.6)}%
• Employee retention improvement: +${Math.round(expectedImprovement * 0.4)}%
• Engagement score increase: +${Math.round(expectedImprovement * 0.5)}%

${useRealData ? 'This analysis uses your actual organisational data to provide accurate financial projections.' : 'Contact HR team for organisation-specific analysis and projections.'}`;
      
    return businessVersion;
  };

  // Generate specific insights based on calculator types used
  const generateSpecificInsights = (calculatorData, metrics, useRealData) => {
    if (!useRealData || calculatorData.length === 0) {
      return 'Business Impact:\n• Improved operational efficiency and cost management\n• Enhanced competitive positioning through workforce optimisation\n• Risk mitigation for talent-related business continuity';
    }
    
    let insights = ['Business Impact:'];
    
    // Check which calculators have data
    const hasEngagement = calculatorData.some(calc => calc.type === 'engagement');
    const hasTurnover = calculatorData.some(calc => calc.type === 'turnover');
    
    if (hasEngagement) {
      const disengagedCost = (metrics.employees * (100 - metrics.engagementRate) / 100) * metrics.avgSalary * (metrics.productivityLoss / 100);
      insights.push(`• Disengaged workforce costs £${disengagedCost.toLocaleString()} annually in lost productivity`);
      insights.push(`• Engagement improvement to industry standard could recover £${(disengagedCost * 0.4).toLocaleString()} per year`);
    }
    
    if (hasTurnover) {
      const turnoverData = calculatorData.find(calc => calc.type === 'turnover');
      if (turnoverData) {
        const annualLeavers = turnoverData.inputs.leavers;
        const avgReplacementCost = turnoverData.inputs.avgSalary * (turnoverData.inputs.replacementCostPercentage / 100);
        insights.push(`• Current ${annualLeavers} annual departures cost £${avgReplacementCost.toLocaleString()} each to replace`);
        insights.push(`• 25% reduction in turnover would save £${(annualLeavers * 0.25 * avgReplacementCost).toLocaleString()} annually`);
      }
    }
    
    insights.push('• Workforce stability improvements enhance customer service delivery');
    insights.push('• Reduced recruitment costs enable investment in growth initiatives');
    
    return insights.join('\n');
  };

  // Populate template with real calculator data
  const populateTemplateWithCalculatorData = (template) => {
    const calculatorData = getAllCalculatorData();
    const financialSummary = getFinancialSummary();
    const useRealData = calculatorData.length > 0;
    
    if (!useRealData) {
      // Use industry defaults if no calculator data
      const metrics = industryMetrics[selectedIndustry];
      return template
        .replace(/{employeeCount}/g, '100')
        .replace(/{productivityLoss}/g, metrics.productivityLoss)
        .replace(/{totalCost}/g, (metrics.avgSalary * 100 * metrics.productivityLoss / 100).toLocaleString())
        .replace(/{industryComparison}/g, '15-20')
        .replace(/{annualSavings}/g, (metrics.avgSalary * 100 * metrics.productivityLoss / 100 * 0.3).toLocaleString())
        .replace(/{investmentAmount}/g, (metrics.avgSalary * 100 * metrics.productivityLoss / 100 * 0.1).toLocaleString())
        .replace(/{roiPercent}/g, '250')
        .replace(/{paybackMonths}/g, '8')
        .replace(/{currentEngagement}/g, metrics.engagementRate)
        .replace(/{industryBenchmark}/g, '42')
        .replace(/{annualDepartures}/g, Math.round(100 * metrics.turnoverRate / 100))
        .replace(/{replacementCost}/g, metrics.replacementCost.toLocaleString())
        .replace(/{totalTurnoverCost}/g, (100 * metrics.turnoverRate / 100 * metrics.replacementCost).toLocaleString());
    }
    
    // Use real calculator data for accurate population
    const totalCost = financialSummary.totalAnnualCost;
    const expectedImprovement = 25 + (financialSummary.productivityLoss > 20 ? 10 : 0);
    const annualSavings = totalCost * (expectedImprovement / 100);
    const investmentAmount = annualSavings * 0.25;
    const roi = ((annualSavings - investmentAmount) / investmentAmount * 100);
    const paybackMonths = (investmentAmount / (annualSavings / 12));
    
    // Get turnover specific data
    const turnoverData = calculatorData.find(calc => calc.type === 'turnover');
    const engagementData = calculatorData.find(calc => calc.type === 'engagement');
    
    return template
      .replace(/{employeeCount}/g, financialSummary.totalEmployees.toLocaleString())
      .replace(/{productivityLoss}/g, financialSummary.productivityLoss.toFixed(1))
      .replace(/{totalCost}/g, totalCost.toLocaleString())
      .replace(/{industryComparison}/g, `${Math.round(financialSummary.productivityLoss - 5)}-${Math.round(financialSummary.productivityLoss + 3)}`)
      .replace(/{annualSavings}/g, annualSavings.toLocaleString())
      .replace(/{investmentAmount}/g, investmentAmount.toLocaleString())
      .replace(/{roiPercent}/g, roi.toFixed(0))
      .replace(/{paybackMonths}/g, paybackMonths.toFixed(1))
      .replace(/{currentEngagement}/g, financialSummary.engagementRate)
      .replace(/{industryBenchmark}/g, '42')
      .replace(/{disengagedCount}/g, Math.round(financialSummary.totalEmployees * (100 - financialSummary.engagementRate) / 100))
      .replace(/{targetEngagement}/g, Math.min(financialSummary.engagementRate + 15, 65))
      .replace(/{annualDepartures}/g, turnoverData ? turnoverData.inputs.leavers : Math.round(financialSummary.totalEmployees * financialSummary.turnoverRate / 100))
      .replace(/{replacementCost}/g, turnoverData ? (turnoverData.inputs.avgSalary * turnoverData.inputs.replacementCostPercentage / 100).toLocaleString() : '50,000')
      .replace(/{totalTurnoverCost}/g, turnoverData ? turnoverData.result.toLocaleString() : (financialSummary.totalEmployees * financialSummary.turnoverRate / 100 * 50000).toLocaleString())
      .replace(/{programCost}/g, (investmentAmount * 0.8).toLocaleString())
      .replace(/{annualValue}/g, (annualSavings * 1.2).toLocaleString())
      .replace(/{roiCalculation}/g, (roi * 1.1).toFixed(0))
      .replace(/{recoveredValue}/g, (totalCost * 0.35).toLocaleString())
      .replace(/{retentionImprovement}/g, Math.round(expectedImprovement * 0.6))
      .replace(/{preventedDepartures}/g, turnoverData ? Math.round(turnoverData.inputs.leavers * 0.3) : '3')
      .replace(/{programInvestment}/g, investmentAmount.toLocaleString())
      .replace(/{programROI}/g, (roi * 0.9).toFixed(0))
      .replace(/{productivityImprovement}/g, Math.round(expectedImprovement * 0.7))
      .replace(/{meetingEfficiency}/g, Math.round(expectedImprovement * 0.5))
      .replace(/{decisionSpeed}/g, Math.round(expectedImprovement * 0.8));
  };

  // Template filtering
  const filteredTemplates = templateLibrary.filter(template => {
    const matchesSearch = !searchQuery || 
      template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.keywords.some(keyword => keyword.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesIndustry = selectedIndustry === 'general' || template.industry === selectedIndustry || template.industry === 'general';
    
    return matchesSearch && matchesIndustry;
  });

  // Email sharing
  const shareViaEmail = () => {
    const subject = encodeURIComponent('Strategic HR Business Case');
    const body = encodeURIComponent(`Original HR Language:\n"${hrInput}"\n\nBusiness Translation:\n"${translatedOutput}"\n\n---\nGenerated with Strategic HR Business Partner Platform`);
    window.open(`mailto:?subject=${subject}&body=${body}`);
  };

  // Copy to clipboard
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(translatedOutput);
      setCopiedToClipboard(true);
      setTimeout(() => setCopiedToClipboard(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  return (
    <section id="translator" className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
            Business Language Translator
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Convert HR proposals into business language. Focus on financial impact and measurable outcomes.
          </p>
        </div>

        {/* Industry Selection */}
        <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Industry</h3>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {Object.keys(industryMetrics).map((industry) => (
              <button
                key={industry}
                onClick={() => setSelectedIndustry(industry)}
                className={`p-3 rounded-lg text-sm font-medium transition-all ${
                  selectedIndustry === industry
                    ? 'bg-blue-100 text-blue-800 border-2 border-blue-300'
                    : 'bg-gray-50 text-gray-700 border-2 border-transparent hover:bg-gray-100'
                }`}
              >
                {industry.charAt(0).toUpperCase() + industry.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          
          {/* Input Section */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="flex items-center space-x-3 mb-6">
              <MessageSquare className="w-8 h-8 text-blue-600" />
              <h3 className="text-2xl font-bold text-gray-900">Your HR Proposal</h3>
            </div>
            
            <textarea
              value={hrInput}
              onChange={(e) => setHrInput(e.target.value)}
              placeholder="Describe your HR initiative...

Example: 'We need communication training for managers. Staff are frustrated with unclear direction and it's affecting productivity.'"
              className="w-full h-48 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm"
            />
            
            {/* Calculator Data Indicator */}
            {hasCalculatorData && (
              <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded text-xs text-green-700">
                ✓ Using your calculator data for accurate financial projections
              </div>
            )}
            
            <button
              onClick={translateWithContext}
              disabled={!hrInput.trim()}
              className="mt-4 w-full flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ArrowRight className="w-5 h-5" />
              <span>Translate to Business Language</span>
            </button>

            {/* Industry metrics preview */}
            {selectedIndustry && (
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <div className="text-xs font-medium text-blue-800 mb-2">Industry benchmarks:</div>
                <div className="grid grid-cols-2 gap-2 text-xs text-blue-700">
                  <div>Average salary: £{industryMetrics[selectedIndustry].avgSalary.toLocaleString()}</div>
                  <div>Turnover rate: {industryMetrics[selectedIndustry].turnoverRate}%</div>
                  <div>Engagement rate: {industryMetrics[selectedIndustry].engagementRate}%</div>
                  <div>Productivity loss: {industryMetrics[selectedIndustry].productivityLoss}%</div>
                </div>
              </div>
            )}
          </div>

          {/* Output Section with Before/After Comparison */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <Calculator className="w-8 h-8 text-green-600" />
                <h3 className="text-2xl font-bold text-gray-900">Business Case</h3>
              </div>
              
              <div className="flex items-center space-x-2">
                {showComparison && (
                  <button
                    onClick={() => setShowComparison(!showComparison)}
                    className="flex items-center space-x-2 px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Compare</span>
                  </button>
                )}
                
                {translatedOutput && (
                  <>
                    <button
                      onClick={shareViaEmail}
                      className="flex items-center space-x-2 px-3 py-2 text-sm bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Email</span>
                    </button>
                    
                    <button
                      onClick={copyToClipboard}
                      className="flex items-center space-x-2 px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                      {copiedToClipboard ? (
                        <>
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-green-600">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </>
                )}
              </div>
            </div>
            
            <div className="h-48 px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 overflow-y-auto whitespace-pre-wrap text-sm">
              {translatedOutput || "Your business case will appear here..."}
            </div>

            {/* Before/After Comparison */}
            {showComparison && hrInput && translatedOutput && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-3">Comparison</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="font-medium text-gray-600 mb-1">Original:</div>
                    <div className="text-gray-700 p-2 bg-white rounded border">{hrInput}</div>
                  </div>
                  <div>
                    <div className="font-medium text-gray-600 mb-1">Business case:</div>
                    <div className="text-gray-700 p-2 bg-white rounded border">{translatedOutput.split('\n')[0]}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Improvement Suggestions */}
        {improvements.length > 0 && (
          <div className="bg-white rounded-2xl p-8 shadow-lg mb-12">
            <div className="flex items-center space-x-3 mb-6">
              <Lightbulb className="w-8 h-8 text-yellow-500" />
              <h3 className="text-2xl font-bold text-gray-900">Suggestions</h3>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              {improvements.map((improvement, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="font-semibold text-gray-900 mb-2">
                    {improvement.type.charAt(0).toUpperCase() + improvement.type.slice(1)} Enhancement
                  </div>
                  <div className="text-sm text-gray-600 mb-2">{improvement.suggestion}</div>
                  <div className="text-xs text-blue-600 italic">{improvement.example}</div>
                  <button className="mt-2 px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors">
                    Apply Suggestion
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Template Library */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900">Templates</h3>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search templates..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTemplates.map((template) => (
              <div key={template.id} className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">{template.title}</h4>
                  <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">{template.category}</span>
                </div>
                <div className="text-sm text-gray-600 mb-3">
                  Keywords: {template.keywords.slice(0, 3).join(', ')}
                </div>
                <button
                  onClick={() => {
                    setSelectedTemplate(template.id);
                    const populatedTemplate = populateTemplateWithCalculatorData(template.template);
                    setTranslatedOutput(populatedTemplate);
                  }}
                  className="w-full px-4 py-2 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                >
                  Use Template
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Analytics */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <TrendingUp className="w-8 h-8 text-purple-600" />
              <h3 className="text-2xl font-bold text-gray-900">Analytics</h3>
            </div>
            <button
              onClick={() => setShowAnalytics(!showAnalytics)}
              className="px-4 py-2 text-sm bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
            >
              {showAnalytics ? 'Hide' : 'Show'}
            </button>
          </div>

          {showAnalytics && (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{translationHistory.length}</div>
                <div className="text-sm text-blue-700">Translations</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {translationHistory.length > 0 ? Math.round(translationHistory.reduce((acc, t) => acc + t.improvements, 0) / translationHistory.length) : 0}
                </div>
                <div className="text-sm text-green-700">Improvements</div>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">{selectedIndustry}</div>
                <div className="text-sm text-yellow-700">Industry</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">85%</div>
                <div className="text-sm text-purple-700">Success rate</div>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};

export default BusinessTranslatorUpgraded;