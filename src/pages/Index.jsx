import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useQuery } from "@tanstack/react-query";

const fetchArticles = async () => {
  const response = await fetch("https://api.example.com/articles");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const Index = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["articles"],
    queryFn: fetchArticles,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const featuredArticle = data[0];
  const otherArticles = data.slice(1);

  return (
    <div className="container mx-auto">
      <section className="mb-8">
        <Card>
          <AspectRatio ratio={16 / 9}>
            <img src={featuredArticle.image} alt={featuredArticle.title} className="object-cover w-full h-full" />
          </AspectRatio>
          <CardHeader>
            <CardTitle>{featuredArticle.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{featuredArticle.summary}</p>
          </CardContent>
        </Card>
      </section>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {otherArticles.map((article) => (
          <Card key={article.id}>
            <AspectRatio ratio={16 / 9}>
              <img src={article.image} alt={article.title} className="object-cover w-full h-full" />
            </AspectRatio>
            <CardHeader>
              <CardTitle>{article.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{article.summary}</p>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
};

export default Index;
