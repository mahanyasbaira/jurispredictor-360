
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Search } from "lucide-react";

const CaseStudies = () => {
  const caseStudies = [
    {
      title: "Property Dispute in Delhi High Court",
      category: "Property Law",
      description: "A 15-year property dispute resolved in 22 months with NyayaPredict's strategic insights.",
      outcome: "Favorable Settlement",
      accuracy: "94% accuracy in prediction",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1200"
    },
    {
      title: "Family Inheritance Case",
      category: "Family Law",
      description: "Complex inheritance dispute between siblings predicted with high accuracy.",
      outcome: "Court Judgment",
      accuracy: "87% accuracy in prediction",
      image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=1200"
    },
    {
      title: "Commercial Contract Dispute",
      category: "Business Law",
      description: "A business contract violation case predicted to be resolved via arbitration.",
      outcome: "Arbitration Success",
      accuracy: "91% accuracy in prediction",
      image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=1200"
    },
    {
      title: "Consumer Protection Matter",
      category: "Consumer Law",
      description: "Product liability case analysis provided alternative dispute resolution path.",
      outcome: "Consumer Forum Resolution",
      accuracy: "89% accuracy in prediction",
      image: "https://images.unsplash.com/photo-1556742031-c6961e8560b0?auto=format&fit=crop&q=80&w=1200"
    },
    {
      title: "Intellectual Property Right Infringement",
      category: "IP Law",
      description: "Copyright infringement case with predicted timeline and settlement prospects.",
      outcome: "Licensing Agreement",
      accuracy: "85% accuracy in prediction",
      image: "https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&q=80&w=1200"
    },
    {
      title: "Labour Dispute Resolution",
      category: "Labour Law",
      description: "Wrongful termination case with accurate prediction of compensation amount range.",
      outcome: "Settlement with Compensation",
      accuracy: "92% accuracy in prediction",
      image: "https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&q=80&w=1200"
    }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-[#f3f7ff] py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">Case Studies</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Explore real-world examples of how NyayaPredict has helped clients
              navigate complex legal situations with data-driven insights.
            </p>
            <Link to="/analyze-case">
              <Button className="gap-2 bg-primary hover:bg-primary/90">
                Analyze Your Case
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <Card key={index} className="overflow-hidden border-0 shadow-md transition-all duration-300 hover:shadow-lg">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={study.image}
                    alt={study.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-primary/90 text-white px-3 py-1 rounded-full text-xs font-medium">
                    {study.category}
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">{study.title}</CardTitle>
                  <CardDescription className="text-sm line-clamp-2">{study.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Outcome:</span>
                      <span className="text-sm text-green-600">{study.outcome}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Prediction:</span>
                      <span className="text-sm text-primary">{study.accuracy}</span>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full gap-2 text-primary border-primary hover:bg-primary/5">
                    Read Full Case Study
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#f3f7ff]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">See How NyayaPredict Can Help You</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Our AI-powered platform has helped thousands of clients make informed legal decisions.
              Let us help you understand your case better.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/analyze-case">
                <Button size="lg" className="gap-2 bg-primary hover:bg-primary/90 w-full sm:w-auto">
                  Analyze Your Case
                  <Search className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/how-it-works">
                <Button size="lg" variant="outline" className="gap-2 w-full sm:w-auto">
                  Learn How It Works
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CaseStudies;
