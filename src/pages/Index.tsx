
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, BarChart } from "lucide-react";
import { cn } from "@/lib/utils";

const Index = () => {
  // Sample data for live case predictions
  const casePredictions = [
    {
      type: "Property Dispute",
      duration: "18-24 months",
      successRate: 75
    },
    {
      type: "Family Matter",
      duration: "12-15 months",
      successRate: 82
    },
    {
      type: "Civil Case",
      duration: "24-30 months",
      successRate: 68
    }
  ];

  return (
    <div className="w-full">
      {/* Hero Section with padding for the fixed navbar */}
      <section className="bg-[#f3f7ff] pt-24 pb-20 md:min-h-[85vh] flex flex-col justify-center">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Know Your Case Outcome{" "}
                <span className="text-primary block md:inline">
                  Before You Go to Court
                </span>
              </h1>
              <p className="text-lg text-foreground/80 max-w-xl">
                Leverage AI-powered insights to predict case duration and outcomes.
                Make informed decisions about your legal journey with data-driven
                analysis.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link to="/analyze-case">
                  <Button className="gap-2 bg-primary hover:bg-primary/90 px-6 py-6 h-auto text-base">
                    Analyze Your Case
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/how-it-works">
                  <Button
                    variant="outline"
                    className="gap-2 border-primary text-primary hover:bg-primary/5 px-6 py-6 h-auto text-base"
                  >
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>

            <div className="lg:pl-10">
              <Card className="bg-white/90 backdrop-blur-sm overflow-hidden border border-gray-100 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <BarChart className="h-5 w-5 text-primary" />
                    <h2 className="text-xl font-semibold">Live Case Predictions</h2>
                  </div>
                  <p className="text-sm text-muted-foreground mb-6">
                    Real-time analysis of similar cases
                  </p>

                  <div className="space-y-6">
                    {casePredictions.map((caseItem, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-medium text-foreground">
                              {caseItem.type}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              Est. Duration: {caseItem.duration}
                            </p>
                          </div>
                          <span 
                            className={cn(
                              "text-lg font-semibold",
                              caseItem.successRate > 80 ? "text-green-600" : 
                              caseItem.successRate > 70 ? "text-amber-600" : "text-orange-600"
                            )}
                          >
                            {caseItem.successRate}%
                          </span>
                        </div>
                        <Progress 
                          value={caseItem.successRate} 
                          className={cn(
                            "h-2",
                            caseItem.successRate > 80 ? "bg-green-100" : 
                            caseItem.successRate > 70 ? "bg-amber-100" : "bg-orange-100"
                          )}
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Additional sections can be added here */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">How NyayaPredict Works</h2>
            <p className="text-lg text-muted-foreground">
              Our AI-powered platform analyzes thousands of past cases to provide accurate predictions
              and insights for your legal matters.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Input Your Case Details",
                description:
                  "Provide information about your legal matter including case type, jurisdiction, and key facts.",
              },
              {
                step: "2",
                title: "AI Analysis",
                description:
                  "Our advanced algorithms analyze your case against thousands of similar past judgments.",
              },
              {
                step: "3",
                title: "Receive Predictions",
                description:
                  "Get detailed insights on possible outcomes, timeframes, and recommended actions.",
              },
            ].map((item, index) => (
              <Card key={index} className="relative border-none shadow-md overflow-hidden">
                <div className="absolute top-0 left-0 w-12 h-12 bg-primary text-white flex items-center justify-center text-xl font-bold rounded-br-lg">
                  {item.step}
                </div>
                <CardContent className="pt-12 p-6">
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/analyze-case">
              <Button className="gap-2 bg-primary hover:bg-primary/90">
                Start Your Case Analysis
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;

