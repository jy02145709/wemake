import { type MetaFunction } from "react-router";
import { ProductCard } from "~/features/products/components/product-card";

export const meta: MetaFunction = () => {
  return [
    { title: "Products | wemake" },
    { name: "description", content: "Discover amazing products made by our community" },
  ];
};

export default function ProductsPage() {
  return (
    <div className="px-20 py-10">
      <div className="mb-8">
        <h1 className="text-5xl font-bold leading-tight tracking-tight mb-4">
          Products
        </h1>
        <p className="text-xl font-light text-foreground">
          Discover amazing products made by our community
        </p>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {Array.from({ length: 20 }).map((_, index) => (
          <ProductCard
            key={`product-${index}`}
            id={`productId-${index}`}
            name="Product Name"
            description="Product Description"
            commentsCount={12}
            viewsCount={12}
            votesCount={120}
          />
        ))}
      </div>
    </div>
  );
}

