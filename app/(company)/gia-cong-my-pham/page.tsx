import React from "react";
import Image from "next/image";
import Link from "next/link";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Categories from "./category";
import { queryProduct } from "@/service/api/product";
import { getAllCategory } from "@/service/api/category";
import { Badge } from "@/components/ui/badge";
import PaginationH from "./pagination";

// export const dynamic = "force-dymanic";
// export const dymanicParams = true;
// export const revalidate = 0;

type ProductListPageProps = {
  searchParams: {
    tag?: string;
    page?: string;
  };
};

const ServicesPage = async ({ searchParams }: ProductListPageProps) => {
  const { products, metadata } = await queryProduct(searchParams);
  const categories = await getAllCategory();
  return (
    <div className="lg:mx-auto lg:max-w-screen-xl">
      <div className="mt-2 mx-auto">
        <h1 className="text-xl font-semibold text-center">
          Gia Công Mỹ Phẩm Trọn Gói
        </h1>
      </div>
      <div className="mb-10">
        <Categories categories={categories} />
        {products.length == 0 ? (
          <p className="text-center h-[300px]">
            Không tìm thấy sản phẩm nào khớp với lựa chọn của bạn.
          </p>
        ) : (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={`/gia-cong-my-pham/${product.slug}`}
                  className="rounded-lg overflow-hidden bg-accent"
                >
                  <div className="bg-muted">
                    <Image
                      priority
                      src={product.image}
                      alt="image"
                      height={600}
                      width={800}
                      className="rounded-md object-cover aspect-[4/3]"
                    />
                  </div>
                  <div className="flex flex-col gap-2 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <Badge>
                        <p className="line-clamp-1">{product.category.name}</p>
                      </Badge>
                      {/* <p className="text-sm line-clamp-1">
                    {format(new Date(product.publishAt), "PP", {
                      locale: vi,
                    })}
                  </p> */}
                    </div>
                    <h4 className="font-bold text-lg line-clamp-2 hover:text-primary">
                      {product.productName}
                    </h4>
                    <p className="line-clamp-2 text-sm">
                      {product.shortContent}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
            {metadata.totalPage > 1 && (
              <PaginationH
                {...searchParams}
                currentPage={parseInt(searchParams.page ?? "1")}
                hasPrevPage={parseInt(searchParams.page ?? "1") > 1}
                {...metadata}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};
export default ServicesPage;
