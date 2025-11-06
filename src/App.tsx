import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import CalculatorGrid from './components/CalculatorGrid';
import AdvancedHRTools from './components/AdvancedHRTools';
import ResultsDashboard from './components/ResultsDashboard';
import Mentoring from './components/Mentoring';
import Footer from './components/Footer';
import EmailCaptureModal from './components/EmailCaptureModal';
import { CalculatorProvider } from './context/CalculatorContext';

function App() {
  return (
    <CalculatorProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Header />
        <Hero />
        <CalculatorGrid />
        <AdvancedHRTools />
        <ResultsDashboard />
        <Mentoring />
        <Footer />
        <EmailCaptureModal />
      </div>
    </CalculatorProvider>
  );
}

export default App;