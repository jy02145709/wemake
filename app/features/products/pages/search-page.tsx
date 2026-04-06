import { Form } from "react-router";
import { ProductCard } from "~/features/products/components/product-card";
import { Button } from "~/common/components/ui/button";
import { Input } from "~/common/components/ui/input";
import type { Route } from "./+types/search-page";
import z from "zod";
import { Hero } from "~/common/components/hero";
import ProductPagination from "~/common/components/product-pagination";
import { getPagesBySearch, getProductsBySearch } from "../queries";
import { makeSSRClient } from "~/supa-client";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Search Products | wemake" },
    { name: "description", content: "Search for products" },
  ];
};

const searchParams = z.object({
  query: z.string().optional().default(""),
  page: z.coerce.number().optional().default(1),
});

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const { success, data: parsedData } = searchParams.safeParse(
    Object.fromEntries(url.searchParams));
  if (!success) {
    throw new Error("Invalid params");
  }
  if (parsedData.query === "") {
    return { products: [], totalPages: 1 };
  }
  const { client, headers } = makeSSRClient(request);
  const products = await getProductsBySearch(client, {
    query: parsedData.query,
    page: parsedData.page,
  });
  const totalPages = await getPagesBySearch(client, {
    query: parsedData.query,
  });
  return {
    products, totalPages,
  };
}


export default function SearchPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="space-y-10">
      <Hero title="Search Products" subtitle="Search for products by name or description" />
      <Form className="flex justify-center max-w-sm items-center mx-auto gap-2">
        <Input name="query" placeholder="Search products" className="text-lg" />
        <Button type="submit">Search</Button>
      </Form>
      <div className="space-y-5 w-full max-w-md mx-auto">
        {loaderData.products.map((product) => (
          <ProductCard
            key={product.product_id}
            id={product.product_id}
            name={product.name}
            description={product.tagline}
            reviewsCount={product.reviews}
            viewsCount={product.views}
            votesCount={product.upvotes}
          />
        ))}
      </div>
      <ProductPagination totalPages={loaderData.totalPages} />
    </div>
  )
}

