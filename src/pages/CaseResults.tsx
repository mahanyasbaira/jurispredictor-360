
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  Clock,
  BarChart3,
  Check,
  X,
  ChevronRight,
  Download,
  Share2,
  ArrowRight,
  AlertTriangle,
  ArrowLeft,
  FileText,
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
  LineChart,
  Line,
  Legend
} from "recharts";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for simulating case analysis results
const getMockCaseAnalysis = (caseType: string) => {
  // Default analysis structure
  const analysis = {
    summary: {
      title: "Case Analysis Summary",
      recommendation: "Proceed with Court Case",
      confidence: 76,
      duration: Math.floor(Math.random() * 24) + 6, // 6-30 months
      outcomeDescription: "Based on your case details, AI predicts a favorable outcome with moderate confidence. Similar cases have succeeded when strong documentary evidence was presented."
    },
    outcomes: {
      win: Math.floor(Math.random() * 40) + 50, // 50-90%
      settlement: Math.floor(Math.random() * 30) + 10, // 10-40%
      loss: Math.floor(Math.random() * 20) + 5 // 5-25%
    },
    alternatives: [
      {
        method: "Mediation",
        description: "A neutral third party would help you and the opposing party reach a mutually acceptable agreement.",
        timeframe: "2-3 months",
        successRate: 65,
        recommended: true
      },
      {
        method: "Arbitration",
        description: "An arbitrator would review evidence and make a binding decision, similar to a judge but in a private setting.",
        timeframe: "3-5 months",
        successRate: 58,
        recommended: false
      },
      {
        method: "Lok Adalat",
        description: "These 'People's Courts' offer a forum where disputes can be settled amicably and informally.",
        timeframe: "1-2 months",
        successRate: 72,
        recommended: true
      }
    ],
    timeline: [
      { month: 1, phase: "Filing & Notices", description: "Case filing, notice to opposition" },
      { month: 2, phase: "Initial Hearing", description: "Preliminary arguments, case scheduling" },
      { month: Math.floor(Math.random() * 3) + 4, phase: "Evidence Submission", description: "Documentary evidence presented" },
      { month: Math.floor(Math.random() * 3) + 8, phase: "Witness Testimony", description: "Witness examination, cross-examination" },
      { month: Math.floor(Math.random() * 4) + 12, phase: "Final Arguments", description: "Closing arguments from both sides" },
      { month: Math.floor(Math.random() * 5) + 18, phase: "Judgment", description: "Final verdict delivered" },
    ],
    similarCases: [
      {
        title: "Singh vs. Property Developer Ltd.",
        outcome: "Won",
        duration: "18 months",
        description: "Land dispute with similar documentary evidence"
      },
      {
        title: "Patel vs. Regional Authority",
        outcome: "Settled",
        duration: "10 months",
        description: "Settled after strong initial arguments"
      },
      {
        title: "Mehta inheritance dispute",
        outcome: "Partial win",
        duration: "24 months",
        description: "Complex family property dispute"
      }
    ]
  };

  // Adjust analysis based on case type
  switch (caseType) {
    case "property":
      analysis.summary.duration = Math.floor(Math.random() * 20) + 16; // 16-36 months (longer)
      analysis.outcomes.win = Math.floor(Math.random() * 30) + 45; // 45-75%
      analysis.summary.outcomeDescription = "Property disputes tend to be lengthy in the Indian judicial system, but your documentary evidence strengthens your position.";
      break;
    case "family":
      analysis.summary.duration = Math.floor(Math.random() * 12) + 8; // 8-20 months
      analysis.alternatives[0].recommended = true; // Mediation highly recommended for family
      analysis.summary.outcomeDescription = "Family matters can be emotionally taxing. Courts often encourage mediation for faster resolution and preserving relationships.";
      break;
    case "business":
      analysis.summary.duration = Math.floor(Math.random() * 15) + 12; // 12-27 months
      analysis.outcomes.settlement = Math.floor(Math.random() * 40) + 30; // 30-70% (higher settlement chance)
      analysis.summary.outcomeDescription = "Contract disputes often hinge on documentation. Your case has merit, but consider arbitration for a quicker resolution while maintaining business relationships.";
      break;
    case "criminal":
      analysis.summary.duration = Math.floor(Math.random() * 30) + 24; // 24-54 months (longest)
      analysis.outcomes.win = Math.floor(Math.random() * 30) + 30; // 30-60% (lower win rate)
      analysis.summary.recommendation = "Seek Specialized Legal Counsel";
      analysis.summary.outcomeDescription = "Criminal cases require expert representation. The evidence supports your position, but specialized legal expertise is strongly recommended.";
      break;
    default:
      break;
  }

  return analysis;
};

// Timeline chart data formatter
const formatTimelineData = (timeline: any[]) => {
  const sortedTimeline = [...timeline].sort((a, b) => a.month - b.month);
  
  return sortedTimeline.map((item, index) => ({
    name: `Month ${item.month}`,
    value: item.month,
    phase: item.phase,
    description: item.description
  }));
};

// Data for case statistics
const caseStatistics = [
  { name: 'Delhi HC', pendingCases: 56721, disposedLastYear: 34125 },
  { name: 'Mumbai HC', pendingCases: 64572, disposedLastYear: 41209 },
  { name: 'Chennai HC', pendingCases: 48362, disposedLastYear: 32641 },
  { name: 'Kolkata HC', pendingCases: 42981, disposedLastYear: 27356 }
];

const CaseResults = () => {
  const [caseAnalysis, setCaseAnalysis] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("summary");
  const navigate = useNavigate();
  
  useEffect(() => {
    // Retrieve saved case data from session storage
    const storedData = sessionStorage.getItem('caseData');
    
    if (!storedData) {
      toast.error("No case data found. Please submit your case details first.");
      navigate("/analyze-case");
      return;
    }
    
    try {
      const { formData } = JSON.parse(storedData);
      
      // Simulate API call with loading state
      setIsLoading(true);
      
      // Simulate delay for AI processing
      setTimeout(() => {
        const analysis = getMockCaseAnalysis(formData.caseType);
        setCaseAnalysis(analysis);
        setIsLoading(false);
      }, 1500);
      
    } catch (error) {
      console.error("Error parsing case data:", error);
      toast.error("Error processing your case data. Please try again.");
      navigate("/analyze-case");
    }
  }, [navigate]);

  // Generate colors based on values for the charts
  const getBarColor = (value: number) => {
    if (value >= 70) return "#4ade80"; // green for high values
    if (value >= 40) return "#facc15"; // yellow for medium values
    return "#f87171"; // red for low values
  };

  // Prepare chart data
  const outcomeData = caseAnalysis ? [
    { name: "Win", value: caseAnalysis.outcomes.win },
    { name: "Settlement", value: caseAnalysis.outcomes.settlement },
    { name: "Loss", value: caseAnalysis.outcomes.loss }
  ] : [];

  const timelineData = caseAnalysis ? formatTimelineData(caseAnalysis.timeline) : [];

  const COLORS = ['#4ade80', '#60a5fa', '#f87171'];

  // Handler for downloading results
  const handleDownload = () => {
    toast.success("Case analysis report is being prepared for download");
    // In a real app, this would generate and download a PDF or document
  };

  // Handler for sharing results
  const handleShare = () => {
    toast.success("Sharing options opened");
    // In a real app, this would open a sharing modal or options
  };

  if (isLoading) {
    return (
      <div className="pt-24 pb-16 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-6 max-w-md mx-auto px-4">
          <div className="relative w-20 h-20 mx-auto">
            <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-primary/20 animate-pulse"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <BarChart3 className="h-10 w-10 text-primary animate-pulse" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-legal-900">AI is analyzing your case</h2>
          <p className="text-legal-600">
            Our AI is processing your case details, comparing with similar cases, and generating insights...
          </p>
          <Progress value={65} className="w-full max-w-xs mx-auto" />
        </div>
      </div>
    );
  }

  if (!caseAnalysis) {
    return (
      <div className="pt-24 pb-16 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4 max-w-md mx-auto px-4">
          <AlertTriangle className="h-16 w-16 text-amber-500 mx-auto" />
          <h2 className="text-2xl font-bold text-legal-900">Analysis Error</h2>
          <p className="text-legal-600">
            We couldn't process your case details. Please try submitting your case again.
          </p>
          <Button 
            onClick={() => navigate("/analyze-case")}
            className="mt-4"
          >
            Return to Case Analysis
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 px-4 md:px-0">
      <div className="container mx-auto max-w-5xl">
        {/* Header with Results */}
        <div className="mb-12 space-y-4 animate-fade-in">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <Badge className="mb-2 px-3 py-1 bg-primary/10 text-primary border-none">
                AI Analysis Complete
              </Badge>
              <h1 className="text-3xl md:text-4xl font-bold text-legal-900 mb-2">
                Your Case Prediction Results
              </h1>
              <p className="text-legal-600">
                AI-powered analysis based on your case details and Indian judicial data
              </p>
            </div>
            <div className="flex space-x-3">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center"
                onClick={() => navigate("/analyze-case")}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Edit Case Details
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center"
                onClick={handleDownload}
              >
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center"
                onClick={handleShare}
              >
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
          </div>
        </div>

        {/* Summary Card - Always visible at top */}
        <Card className="mb-8 border bg-white shadow-sm animate-scale-in">
          <CardHeader className="pb-3">
            <CardTitle className="text-xl font-semibold">Case Analysis Summary</CardTitle>
            <CardDescription>
              Overall assessment based on your provided details
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Recommendation */}
              <div className="flex flex-col items-center justify-center text-center p-4 bg-primary/5 rounded-lg">
                <div className={`rounded-full p-3 ${caseAnalysis.summary.confidence > 60 ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'} mb-3`}>
                  {caseAnalysis.summary.confidence > 60 ? (
                    <Check className="h-6 w-6" />
                  ) : (
                    <AlertTriangle className="h-6 w-6" />
                  )}
                </div>
                <h3 className="font-semibold text-legal-900">AI Recommendation</h3>
                <p className="font-medium text-lg text-primary mt-1">
                  {caseAnalysis.summary.recommendation}
                </p>
                <p className="text-sm text-legal-600 mt-1">
                  Confidence: {caseAnalysis.summary.confidence}%
                </p>
              </div>
              
              {/* Duration */}
              <div className="flex flex-col items-center justify-center text-center p-4 bg-primary/5 rounded-lg">
                <div className="rounded-full p-3 bg-blue-100 text-blue-600 mb-3">
                  <Clock className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-legal-900">Estimated Duration</h3>
                <p className="font-medium text-lg text-primary mt-1">
                  {caseAnalysis.summary.duration} months
                </p>
                <p className="text-sm text-legal-600 mt-1">
                  Based on similar cases
                </p>
              </div>
              
              {/* Outcome */}
              <div className="flex flex-col items-center justify-center text-center p-4 bg-primary/5 rounded-lg">
                <div className="rounded-full p-3 bg-amber-100 text-amber-600 mb-3">
                  <BarChart3 className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-legal-900">Success Probability</h3>
                <div className="w-full mt-1">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Win</span>
                    <span className="font-medium">{caseAnalysis.outcomes.win}%</span>
                  </div>
                  <Progress value={caseAnalysis.outcomes.win} className="h-2 mb-2" />
                  
                  <div className="flex justify-between text-sm mb-1">
                    <span>Settlement</span>
                    <span className="font-medium">{caseAnalysis.outcomes.settlement}%</span>
                  </div>
                  <Progress value={caseAnalysis.outcomes.settlement} className="h-2" />
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-lg text-blue-800 text-sm border border-blue-100">
              <p>{caseAnalysis.summary.outcomeDescription}</p>
            </div>
          </CardContent>
        </Card>

        {/* Tabs for Detailed Analysis */}
        <Tabs defaultValue="timeline" className="w-full animate-fade-in">
          <TabsList className="grid grid-cols-1 md:grid-cols-4 mb-8">
            <TabsTrigger value="timeline">Case Timeline</TabsTrigger>
            <TabsTrigger value="alternatives">Alternatives</TabsTrigger>
            <TabsTrigger value="statistics">Case Statistics</TabsTrigger>
            <TabsTrigger value="similar">Similar Cases</TabsTrigger>
          </TabsList>
          
          {/* Timeline Tab */}
          <TabsContent value="timeline" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Projected Case Timeline</CardTitle>
                <CardDescription>
                  The expected progression of your case through the judicial system
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={timelineData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip 
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            const data = payload[0].payload;
                            return (
                              <div className="bg-white p-4 rounded-md shadow-lg border border-gray-100">
                                <p className="font-medium">{data.phase}</p>
                                <p className="text-sm text-gray-600">{data.name}</p>
                                <p className="text-sm mt-1">{data.description}</p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#3b82f6" 
                        strokeWidth={2}
                        dot={{ stroke: '#3b82f6', strokeWidth: 2, fill: '#fff', r: 4 }}
                        activeDot={{ stroke: '#1d4ed8', strokeWidth: 2, fill: '#3b82f6', r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="mt-8 space-y-4">
                  <h3 className="font-medium text-lg">Key Milestones</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {caseAnalysis.timeline.map((item: any, index: number) => (
                      <div 
                        key={index}
                        className="flex items-start p-4 bg-legal-50 rounded-lg"
                      >
                        <div className="flex items-center justify-center bg-white h-8 w-8 rounded-full mr-3 text-primary border border-primary/20 shrink-0">
                          {item.month}
                        </div>
                        <div>
                          <h4 className="font-medium text-legal-900">{item.phase}</h4>
                          <p className="text-sm text-legal-600 mt-1">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Alternatives Tab */}
          <TabsContent value="alternatives" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Alternative Resolution Methods</CardTitle>
                <CardDescription>
                  Faster and potentially more cost-effective alternatives to court proceedings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-6">
                  {caseAnalysis.alternatives.map((alt: any, index: number) => (
                    <div 
                      key={index}
                      className={`border rounded-lg p-6 transition-all duration-200 ${
                        alt.recommended 
                          ? 'border-green-200 bg-green-50' 
                          : 'border-gray-200'
                      }`}
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                        <div className="flex items-center">
                          <h3 className="text-xl font-semibold text-legal-900">{alt.method}</h3>
                          {alt.recommended && (
                            <Badge className="ml-3 bg-green-100 text-green-800 hover:bg-green-200 border-none">
                              Recommended
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center space-x-6">
                          <div className="text-center">
                            <p className="text-sm text-legal-600">Timeframe</p>
                            <p className="font-medium text-legal-900">{alt.timeframe}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-sm text-legal-600">Success Rate</p>
                            <p className="font-medium text-legal-900">{alt.successRate}%</p>
                          </div>
                        </div>
                      </div>
                      <p className="text-legal-600">{alt.description}</p>
                      
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Compared to Court Proceedings</span>
                          <span className="font-medium text-green-600">
                            {Math.round(caseAnalysis.summary.duration / parseInt(alt.timeframe.split('-')[1]))}x Faster
                          </span>
                        </div>
                        <Progress 
                          value={100 / (caseAnalysis.summary.duration / parseInt(alt.timeframe.split('-')[1]))} 
                          className="h-2" 
                          indicatorClassName="bg-green-500"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 bg-blue-50 rounded-lg p-4 text-blue-800 border border-blue-100">
                  <h4 className="font-medium mb-2">Why Consider Alternatives?</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Significantly shorter resolution time</li>
                    <li>Lower costs compared to full litigation</li>
                    <li>Less adversarial, potentially preserving relationships</li>
                    <li>More control over the outcome</li>
                    <li>Confidential proceedings, unlike public court cases</li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full mt-2" variant="outline">
                  Connect with Alternative Resolution Experts
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Statistics Tab */}
          <TabsContent value="statistics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Case Outcome Statistics</CardTitle>
                <CardDescription>
                  Breakdown of potential outcomes based on AI analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-medium text-lg mb-4 text-center">Outcome Probability</h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={outcomeData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                            label={({ name, value }) => `${name}: ${value}%`}
                            labelLine={false}
                          >
                            {outcomeData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index]} />
                            ))}
                          </Pie>
                          <Tooltip 
                            formatter={(value) => [`${value}%`, 'Probability']}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="flex justify-center space-x-6 mt-4">
                      {outcomeData.map((entry, index) => (
                        <div key={`legend-${index}`} className="flex items-center">
                          <div 
                            className="w-3 h-3 rounded-full mr-2" 
                            style={{ backgroundColor: COLORS[index] }}
                          />
                          <span className="text-sm text-legal-700">{entry.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-lg mb-4 text-center">High Court Case Load</h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={caseStatistics}
                          margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar 
                            name="Pending Cases" 
                            dataKey="pendingCases" 
                            fill="#3b82f6" 
                          />
                          <Bar 
                            name="Disposed Last Year" 
                            dataKey="disposedLastYear" 
                            fill="#10b981" 
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
                
                <Separator className="my-8" />
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="bg-legal-50 border-none">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Success Factors</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                          <span>Strong documentary evidence</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                          <span>Clear legal precedents</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                          <span>Consistent factual narrative</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-legal-50 border-none">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Challenges</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <X className="h-4 w-4 text-red-500 mr-2 mt-0.5" />
                          <span>Court backlog may delay proceedings</span>
                        </li>
                        <li className="flex items-start">
                          <X className="h-4 w-4 text-red-500 mr-2 mt-0.5" />
                          <span>Potential for multiple adjournments</span>
                        </li>
                        <li className="flex items-start">
                          <X className="h-4 w-4 text-red-500 mr-2 mt-0.5" />
                          <span>Procedural complexities</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-legal-50 border-none">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Key Metrics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        <li className="flex justify-between">
                          <span>Avg. similar case duration:</span>
                          <span className="font-medium">22 months</span>
                        </li>
                        <li className="flex justify-between">
                          <span>National success rate:</span>
                          <span className="font-medium">52%</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Settlement likelihood:</span>
                          <span className="font-medium">{caseAnalysis.outcomes.settlement}%</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Similar Cases Tab */}
          <TabsContent value="similar" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Similar Cases and Precedents</CardTitle>
                <CardDescription>
                  Analysis of cases with similar facts and circumstances
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {caseAnalysis.similarCases.map((sCase: any, index: number) => (
                    <div key={index} className="border rounded-lg p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-3">
                        <h3 className="font-semibold text-lg text-legal-900">{sCase.title}</h3>
                        <div className="flex space-x-3">
                          <Badge className={`
                            ${sCase.outcome === 'Won' ? 'bg-green-100 text-green-800' : 
                              sCase.outcome === 'Settled' ? 'bg-blue-100 text-blue-800' : 
                                'bg-amber-100 text-amber-800'} border-none
                          `}>
                            {sCase.outcome}
                          </Badge>
                          <Badge className="bg-legal-100 text-legal-800 border-none">
                            {sCase.duration}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-legal-600">{sCase.description}</p>
                      <div className="mt-4 flex justify-end">
                        <Button variant="ghost" size="sm" className="text-primary">
                          View Full Case Details <ChevronRight className="ml-1 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  
                  <div className="bg-legal-50 rounded-lg p-5 border border-legal-200">
                    <h3 className="font-medium text-lg mb-3">Key Legal Precedents</h3>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mr-3">
                          <FileText className="h-5 w-5 text-legal-500" />
                        </div>
                        <div>
                          <h4 className="font-medium text-legal-900">Supreme Court of India: Civil Appeal No. 3528 of 2020</h4>
                          <p className="text-sm text-legal-600 mt-1">
                            Established key principles regarding property documentation requirements 
                            and evidentiary standards in land dispute cases.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mr-3">
                          <FileText className="h-5 w-5 text-legal-500" />
                        </div>
                        <div>
                          <h4 className="font-medium text-legal-900">Delhi High Court: CS(OS) 1245/2018</h4>
                          <p className="text-sm text-legal-600 mt-1">
                            Relevant to your case for its ruling on specific performance of contracts 
                            and remedies available to aggrieved parties.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full mt-2" variant="outline">
                  Get Full Legal Research Report
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
        
        {/* CTA Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-primary text-white border-none shadow-lg animate-fade-in">
            <CardHeader>
              <CardTitle>Get Expert Legal Assistance</CardTitle>
              <CardDescription className="text-primary-foreground/80">
                Connect with verified legal experts specialized in your case type
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Our network of experienced lawyers can help navigate the complexities of your case
                and improve your chances of a favorable outcome.
              </p>
              <Button variant="secondary" className="w-full">
                Find a Lawyer
              </Button>
            </CardContent>
          </Card>
          
          <Card className="border bg-white shadow-sm animate-fade-in delay-100">
            <CardHeader>
              <CardTitle>Refine Your Analysis</CardTitle>
              <CardDescription>
                Add more details to improve prediction accuracy
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Provide additional information about your case to receive a more
                detailed analysis and tailored recommendations.
              </p>
              <Button variant="outline" className="w-full" onClick={() => navigate("/analyze-case")}>
                Update Case Details
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CaseResults;
