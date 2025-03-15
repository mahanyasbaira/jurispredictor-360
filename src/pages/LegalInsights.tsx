
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, User, Clock, BookOpen } from "lucide-react";

const LegalInsights = () => {
  const articles = [
    {
      title: "Understanding the New Arbitration Amendment Act",
      category: "Legislative Updates",
      author: "Adv. Rajesh Sharma",
      date: "October 15, 2023",
      readTime: "8 min read",
      excerpt: "An analysis of the recent amendments to the Arbitration Act and how they impact dispute resolution in India.",
      image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=1200"
    },
    {
      title: "Precedent Analysis: Recent Supreme Court Decisions in Property Law",
      category: "Case Analysis",
      author: "Adv. Priya Mehta",
      date: "September 28, 2023",
      readTime: "12 min read",
      excerpt: "A deep dive into recent landmark judgments that have reshaped property law interpretation in India.",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1200"
    },
    {
      title: "The Impact of AI on Legal Practice in India",
      category: "Legal Tech",
      author: "Dr. Arun Jaitley",
      date: "October 5, 2023",
      readTime: "10 min read",
      excerpt: "How artificial intelligence is transforming legal research, case prediction, and practice management in Indian law firms.",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1200"
    },
    {
      title: "Mediation vs. Litigation: Which Path Should You Choose?",
      category: "Dispute Resolution",
      author: "Adv. Neha Singh",
      date: "September 12, 2023",
      readTime: "7 min read",
      excerpt: "A comparative analysis of the benefits and drawbacks of mediation versus traditional litigation in civil disputes.",
      image: "https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&q=80&w=1200"
    },
    {
      title: "Navigating Family Court Proceedings: A Practical Guide",
      category: "Family Law",
      author: "Adv. Vikram Desai",
      date: "October 20, 2023",
      readTime: "15 min read",
      excerpt: "Step-by-step guidance for individuals facing divorce, custody, or other family court proceedings in India.",
      image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=1200"
    },
    {
      title: "Digital Evidence in Indian Courts: Admissibility and Challenges",
      category: "Evidence Law",
      author: "Prof. Leila Mahmood",
      date: "September 5, 2023",
      readTime: "11 min read",
      excerpt: "An examination of how digital evidence is treated in Indian courts and the challenges in its authentication and admissibility.",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=1200"
    }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-[#f3f7ff] py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">Legal Insights</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Stay informed with the latest legal developments, case analyses, and expert opinions
              to help you navigate the complex Indian legal landscape.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="gap-2 bg-primary hover:bg-primary/90 w-full sm:w-auto">
                Subscribe to Updates
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="order-2 lg:order-1">
              <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm inline-block mb-4">
                Featured Article
              </div>
              <h2 className="text-3xl font-bold mb-4">The Evolving Landscape of Environmental Litigation in India</h2>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>Justice (Retd.) M.K. Sharma</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>October 22, 2023</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>20 min read</span>
                </div>
              </div>
              <p className="text-muted-foreground mb-6">
                A comprehensive analysis of how environmental litigation has evolved in India over the past decade,
                with a focus on landmark judgments that have shaped policy and corporate behavior. This article examines
                the increasing role of scientific evidence in environmental cases and the courts' proactive stance.
              </p>
              <Button className="gap-2">
                Read Full Article
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="order-1 lg:order-2">
              <img
                src="https://images.unsplash.com/photo-1577017040065-650ee4d43339?auto=format&fit=crop&q=80&w=1200"
                alt="Environmental Litigation"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">Latest Articles & Analyses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <Card key={index} className="overflow-hidden border-0 shadow-md h-full flex flex-col">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-primary/90 text-white px-3 py-1 rounded-full text-xs font-medium">
                    {article.category}
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl line-clamp-2">{article.title}</CardTitle>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mt-2">
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      <span>{article.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardDescription className="text-sm">{article.excerpt}</CardDescription>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full gap-2 text-primary border-primary hover:bg-primary/5">
                    Read Article
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button variant="outline" className="gap-2">
              View All Articles
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#f3f7ff]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Analyze Your Case?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Apply the insights from our articles to your specific legal situation with our AI-powered case prediction tool.
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

export default LegalInsights;
