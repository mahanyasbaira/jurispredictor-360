
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Scale, Brain, BarChart4 } from "lucide-react";

const HowItWorks = () => {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-[#f3f7ff] py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">How NyayaPredict Works</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Our AI-powered legal prediction platform analyzes decades of case law and judicial
              patterns to provide accurate insights and predictions for your legal matters.
            </p>
            <Link to="/analyze-case">
              <Button className="gap-2 bg-primary hover:bg-primary/90">
                Try It Now
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Process</h2>
            
            <div className="space-y-16">
              {/* Step 1 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="order-2 md:order-1">
                  <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <Scale className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-4">1. Case Details Input</h3>
                  <p className="text-muted-foreground mb-4">
                    Start by providing essential details about your legal case through our
                    user-friendly interface. The more information you provide, the more accurate
                    our predictions will be.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start gap-2">
                      <div className="h-6 w-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0 mt-0.5">✓</div>
                      <span>Case type and jurisdiction selection</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-6 w-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0 mt-0.5">✓</div>
                      <span>Key facts and details about your situation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-6 w-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0 mt-0.5">✓</div>
                      <span>Relevant documents upload</span>
                    </li>
                  </ul>
                </div>
                <div className="order-1 md:order-2">
                  <Card className="shadow-lg border-0">
                    <CardContent className="p-0">
                      <img 
                        src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200" 
                        alt="Person inputting case details" 
                        className="w-full h-auto rounded-lg"
                      />
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Step 2 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="order-1">
                  <Card className="shadow-lg border-0">
                    <CardContent className="p-0">
                      <img 
                        src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1200" 
                        alt="AI processing data" 
                        className="w-full h-auto rounded-lg"
                      />
                    </CardContent>
                  </Card>
                </div>
                <div className="order-2">
                  <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <Brain className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-4">2. AI Analysis</h3>
                  <p className="text-muted-foreground mb-4">
                    Our proprietary AI algorithms analyze your case information against our database
                    of thousands of past cases, precedents, and judgments from the Indian judicial system.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start gap-2">
                      <div className="h-6 w-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0 mt-0.5">✓</div>
                      <span>Pattern recognition from similar cases</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-6 w-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0 mt-0.5">✓</div>
                      <span>Judge behavior analysis and tendencies</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-6 w-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0 mt-0.5">✓</div>
                      <span>Jurisdiction-specific prediction models</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Step 3 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="order-2 md:order-1">
                  <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <BarChart4 className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-4">3. Results & Recommendations</h3>
                  <p className="text-muted-foreground mb-4">
                    Receive comprehensive insights about your case, including probability of success,
                    estimated duration, and strategic recommendations for proceeding.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start gap-2">
                      <div className="h-6 w-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0 mt-0.5">✓</div>
                      <span>Success probability assessment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-6 w-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0 mt-0.5">✓</div>
                      <span>Case timeline projections</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-6 w-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0 mt-0.5">✓</div>
                      <span>Alternative resolution suggestions</span>
                    </li>
                  </ul>
                </div>
                <div className="order-1 md:order-2">
                  <Card className="shadow-lg border-0">
                    <CardContent className="p-0">
                      <img 
                        src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=1200" 
                        alt="Data visualization" 
                        className="w-full h-auto rounded-lg"
                      />
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#f3f7ff]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Analyze Your Case?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Get started with NyayaPredict today and make informed decisions about your legal journey.
            </p>
            <Link to="/analyze-case">
              <Button size="lg" className="gap-2 bg-primary hover:bg-primary/90">
                Analyze Your Case Now
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;
