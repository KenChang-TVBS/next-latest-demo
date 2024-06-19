import type { Metadata, ResolvingMetadata } from "next";

async function getModelResData(modelId: string[] | string) {
  const res = await fetch(`https://cars.tvbs.com.tw//api/model/${modelId}`, {
    next: { revalidate: 60 },
  });
  return res.json();
}

export default async function Page({ params }: { params: { id: string[] } }) {
  const { id } = params;

  return <div className="px-5 pt-5">Hello, {id}</div>;
}

export async function generateMetadata(
  { params }: any,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { id } = params;

  const modelData: any = await getModelResData(id);

  const trims =
    modelData.data.trims?.length > 0
      ? modelData.data.trims
          ?.slice(0, 3)
          ?.map((car: { name: string }) => car.name)
          .join("/")
      : "";
  const model_name = modelData.data.model_name;
  const articles_title =
    modelData.data.articles?.length > 0
      ? modelData.data.articles
          ?.slice(0, 2)
          ?.map((car: { title: string }) => car.title)
          .join(", ")
      : "";
  console.log("trims", trims);
  console.log("model_name", model_name);
  console.log("articles_title", articles_title);

  return {
    title: `${model_name} ${trims} 規格配備 | 地球黃金線`,
    description: `${model_name} ${trims}車款介紹、車款產地、價格，規格表資訊， ${model_name} ${articles_title}`,
    alternates: {
      canonical: `https://cars.tvbs.com.tw/spec/${id}`,
    },
    openGraph: {
      title: `${model_name} ${trims}`,
      description: `${model_name} ${trims}車款介紹、車款產地、價格，規格表資訊， ${model_name} ${articles_title}`,
      url: `https://cars.tvbs.com.tw/spec/${id}`,
      siteName: "TVBS地球黃金線",
    },
  };
}
