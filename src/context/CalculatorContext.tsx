import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CalculatorData {
  id: string;
  result: number;
  inputs: any;
  type: string;
  industry?: string;
  timestamp: Date;
}

interface SharedInputs {
  totalEmployees: number;
  avgSalary: number;
}

interface CalculatorContextType {
  calculatorData: Record<string, CalculatorData>;
  sharedInputs: SharedInputs;
  updateCalculatorData: (id: string, data: CalculatorData) => void;
  updateSharedInputs: (inputs: Partial<SharedInputs>) => void;
  getCalculatorData: (id: string) => CalculatorData | undefined;
  getAllCalculatorData: () => CalculatorData[];
  getFinancialSummary: () => {
    totalAnnualCost: number;
    totalEmployees: number;
    avgSalary: number;
    turnoverRate: number;
    engagementRate: number;
    productivityLoss: number;
  };
}

const CalculatorContext = createContext<CalculatorContextType | undefined>(undefined);

export const useCalculatorContext = () => {
  const context = useContext(CalculatorContext);
  if (!context) {
    throw new Error('useCalculatorContext must be used within a CalculatorProvider');
  }
  return context;
};

interface CalculatorProviderProps {
  children: ReactNode;
}

export const CalculatorProvider: React.FC<CalculatorProviderProps> = ({ children }) => {
  const [calculatorData, setCalculatorData] = useState<Record<string, CalculatorData>>({});
  const [sharedInputs, setSharedInputs] = useState<SharedInputs>({
    totalEmployees: 100,
    avgSalary: 40000
  });

  const updateCalculatorData = (id: string, data: CalculatorData) => {
    setCalculatorData(prev => ({
      ...prev,
      [id]: { ...data, timestamp: new Date() }
    }));
  };

  const updateSharedInputs = (inputs: Partial<SharedInputs>) => {
    setSharedInputs(prev => ({
      ...prev,
      ...inputs
    }));
  };

  const getCalculatorData = (id: string) => {
    return calculatorData[id];
  };

  const getAllCalculatorData = () => {
    return Object.values(calculatorData);
  };

  const getFinancialSummary = () => {
    const data = Object.values(calculatorData);
    
    // Calculate aggregated financial data
    const totalAnnualCost = data.reduce((sum, calc) => sum + (calc.result || 0), 0);
    
    // Get employee count (prioritize most recent or largest)
    const totalEmployees = data.find(d => d.inputs?.employees || d.inputs?.totalEmployees)?.inputs?.employees || 
                          data.find(d => d.inputs?.totalEmployees)?.inputs?.totalEmployees || 100;
    
    // Get average salary (use most recent or common value)
    const avgSalary = data.find(d => d.inputs?.avgSalary)?.inputs?.avgSalary || 40000;
    
    // Get turnover data
    const turnoverData = data.find(d => d.type === 'turnover');
    const turnoverRate = turnoverData ? 
      ((turnoverData.inputs?.leavers || 0) / (turnoverData.inputs?.employees || totalEmployees)) * 100 : 20;
    
    // Get engagement data  
    const engagementData = data.find(d => d.type === 'engagement');
    const engagementRate = engagementData?.inputs?.engagementRate || 33;
    
    // Calculate overall productivity loss as percentage
    const productivityLoss = totalEmployees > 0 ? (totalAnnualCost / (totalEmployees * avgSalary)) * 100 : 14;
    
    return {
      totalAnnualCost,
      totalEmployees,
      avgSalary,
      turnoverRate,
      engagementRate,
      productivityLoss: Math.min(productivityLoss, 30) // Cap at reasonable max
    };
  };

  const contextValue: CalculatorContextType = {
    calculatorData,
    sharedInputs,
    updateCalculatorData,
    updateSharedInputs,
    getCalculatorData,
    getAllCalculatorData,
    getFinancialSummary
  };

  return (
    <CalculatorContext.Provider value={contextValue}>
      {children}
    </CalculatorContext.Provider>
  );
};

export default CalculatorProvider;