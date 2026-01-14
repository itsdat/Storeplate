"use client";
import BaseHeading from "@/components/common/heading/BaseHeading";
import ProductCardGrid from "@/components/feature/card/ProductCardGrid";
import { IProduct } from "@/interfaces/product/product.interface";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export const features: IProduct[] = [
  {
    id: "prod-1",
    name: "Nourison 23",
    slug: "nourison-23",
    tags: [
      { id: "tag-1", label: "Bedroom", value: "bedroom" },
      { id: "tag-2", label: "Shine", value: "shine" },
      { id: "tag-3", label: "Style", value: "style" },
    ],
    deliveryInfo: "Est. Delivery between 0 - 3 days",
    rating: 4.5,
    description:
      "The Nourison 23 is a luxurious and stylish addition to any home. With easy delivery and returns, it is a dependable choice for your space. Features include detailed product details and additional information to ensure a seamless purchase.",
    reviewCount: 10,
    moreInfo:
      "We want you to be happy with your purchase and we apologize if it is not. For whatever reason that you are not satisfied, we would be most happy to provide exchanges and returns for all items purchased from us if the following conditions are met.",
    variants: [
      {
        id: "var-1",
        price: 100,
        stock: 999,
        discount: 20,
        size: { id: "size-2", label: "Medium", value: "medium" },
        images: [
          { id: "image_1", image: "https://picsum.photos/id/1045/800/400" },
          { id: "image_2", image: "https://picsum.photos/id/1015/800/400" },
          { id: "image_3", image: "https://picsum.photos/id/1055/800/400" },
        ],
      },
      {
        id: "var-2",
        price: 55,
        stock: 299,
        discount: 15,
        size: { id: "size-1", label: "Small", value: "small" },
        images: [
          { id: "image_1", image: "https://picsum.photos/id/1065/800/400" },
          { id: "image_2", image: "https://picsum.photos/id/1025/800/400" },
          { id: "image_3", image: "https://picsum.photos/id/1035/800/400" },
        ],
      },
    ],
  },
  {
    id: "prod-2",
    name: "Modern Velvet Sofa",
    slug: "modern-velvet-sofa",
    tags: [
      { id: "tag-2", label: "Living Room", value: "living-room" },
      { id: "tag-3", label: "Furniture", value: "furniture" },
    ],
    deliveryInfo: "Est. Delivery between 5 - 7 days",
    rating: 4.8,
    description:
      "Experience ultimate comfort with our Modern Velvet Sofa. Crafted with premium velvet upholstery and solid wood frame, this sofa combines elegance with durability. Perfect for contemporary living spaces.",
    reviewCount: 45,
    moreInfo:
      "All furniture items come with a 2-year warranty covering manufacturing defects. Assembly instructions included. Professional assembly service available upon request at additional cost.",
    variants: [
      {
        id: "var-3",
        price: 899,
        stock: 15,
        discount: 10,
        size: { id: "size-3", label: "Large", value: "large" },
        images: [
          { id: "image_4", image: "https://picsum.photos/id/1070/800/400" },
          { id: "image_5", image: "https://picsum.photos/id/1074/800/400" },
          { id: "image_6", image: "https://picsum.photos/id/1076/800/400" },
        ],
      },
      {
        id: "var-4",
        price: 699,
        stock: 25,
        discount: 15,
        size: { id: "size-2", label: "Medium", value: "medium" },
        images: [
          { id: "image_7", image: "https://picsum.photos/id/1080/800/400" },
          { id: "image_8", image: "https://picsum.photos/id/1082/800/400" },
          { id: "image_9", image: "https://picsum.photos/id/1084/800/400" },
        ],
      },
    ],
  },
  {
    id: "prod-3",
    name: "Scandinavian Coffee Table",
    slug: "scandinavian-coffee-table",
    tags: [
      { id: "tag-2", label: "Living Room", value: "living-room" },
      { id: "tag-4", label: "Tables", value: "tables" },
    ],
    deliveryInfo: "Est. Delivery between 2 - 4 days",
    rating: 4.6,
    description:
      "Minimalist design meets functionality with our Scandinavian Coffee Table. Made from sustainable oak wood with a natural finish, this table features clean lines and ample storage space underneath.",
    reviewCount: 28,
    moreInfo:
      "Easy to clean and maintain. Wipe with a damp cloth. Avoid direct sunlight to preserve the natural wood finish. Some assembly required.",
    variants: [
      {
        id: "var-5",
        price: 249,
        stock: 0,
        discount: 5,
        size: { id: "size-2", label: "Medium", value: "medium" },
        images: [
          { id: "image_10", image: "https://picsum.photos/id/1060/800/400" },
          { id: "image_11", image: "https://picsum.photos/id/1062/800/400" },
          { id: "image_12", image: "https://picsum.photos/id/1064/800/400" },
        ],
      },
      {
        id: "var-6",
        price: 199,
        stock: 0,
        discount: 10,
        size: { id: "size-1", label: "Small", value: "small" },
        images: [
          { id: "image_13", image: "https://picsum.photos/id/1066/800/400" },
          { id: "image_14", image: "https://picsum.photos/id/1068/800/400" },
          { id: "image_15", image: "https://picsum.photos/id/1069/800/400" },
        ],
      },
    ],
  },
  {
    id: "prod-4",
    name: "Luxury King Bed Frame",
    slug: "luxury-king-bed-frame",
    tags: [
      { id: "tag-1", label: "Bedroom", value: "bedroom" },
      { id: "tag-3", label: "Furniture", value: "furniture" },
    ],
    deliveryInfo: "Est. Delivery between 7 - 10 days",
    rating: 4.9,
    description:
      "Transform your bedroom into a sanctuary with our Luxury King Bed Frame. Featuring a padded headboard, sturdy slat support, and elegant upholstery, this bed frame is designed for both comfort and style.",
    reviewCount: 67,
    moreInfo:
      "Mattress not included. Compatible with standard king-size mattresses. White glove delivery service available. Backed by our satisfaction guarantee.",
    variants: [
      {
        id: "var-7",
        price: 1299,
        stock: 8,
        discount: 20,
        size: { id: "size-4", label: "King", value: "king" },
        images: [
          { id: "image_16", image: "https://picsum.photos/id/1043/800/400" },
          { id: "image_17", image: "https://picsum.photos/id/1044/800/400" },
          { id: "image_18", image: "https://picsum.photos/id/1047/800/400" },
        ],
      },
      {
        id: "var-8",
        price: 999,
        stock: 12,
        discount: 15,
        size: { id: "size-5", label: "Queen", value: "queen" },
        images: [
          { id: "image_19", image: "https://picsum.photos/id/1048/800/400" },
          { id: "image_20", image: "https://picsum.photos/id/1049/800/400" },
          { id: "image_21", image: "https://picsum.photos/id/1050/800/400" },
        ],
      },
    ],
  },
  {
    id: "prod-5",
    name: "Industrial Dining Set",
    slug: "industrial-dining-set",
    tags: [
      { id: "tag-5", label: "Dining Room", value: "dining-room" },
      { id: "tag-3", label: "Furniture", value: "furniture" },
    ],
    deliveryInfo: "Est. Delivery between 5 - 8 days",
    rating: 4.7,
    description:
      "Bring industrial charm to your dining space with this complete dining set. Includes a solid wood table and four matching chairs with metal accents. Perfect for family gatherings and dinner parties.",
    reviewCount: 34,
    moreInfo:
      "Set includes one dining table and four chairs. Additional chairs sold separately. Table seats up to 6 people comfortably. Easy to assemble with included hardware.",
    variants: [
      {
        id: "var-9",
        price: 799,
        stock: 18,
        discount: 12,
        size: { id: "size-6", label: "6-Seater", value: "6-seater" },
        images: [
          { id: "image_22", image: "https://picsum.photos/id/1001/800/400" },
          { id: "image_23", image: "https://picsum.photos/id/1002/800/400" },
          { id: "image_24", image: "https://picsum.photos/id/1003/800/400" },
        ],
      },
      {
        id: "var-10",
        price: 599,
        stock: 30,
        discount: 18,
        size: { id: "size-7", label: "4-Seater", value: "4-seater" },
        images: [
          { id: "image_25", image: "https://picsum.photos/id/1004/800/400" },
          { id: "image_26", image: "https://picsum.photos/id/1005/800/400" },
          { id: "image_27", image: "https://picsum.photos/id/1006/800/400" },
        ],
      },
    ],
  },
  {
    id: "prod-6",
    name: "Ergonomic Office Chair",
    slug: "ergonomic-office-chair",
    tags: [
      { id: "tag-6", label: "Office", value: "office" },
      { id: "tag-7", label: "Seating", value: "seating" },
    ],
    deliveryInfo: "Est. Delivery between 1 - 2 days",
    rating: 4.4,
    description:
      "Work comfortably for hours with our Ergonomic Office Chair. Features adjustable lumbar support, breathable mesh back, and smooth-rolling casters. Designed to reduce back pain and improve posture.",
    reviewCount: 92,
    moreInfo:
      "Supports up to 300 lbs. Adjustable seat height and armrests. 360-degree swivel. Compatible with most desk heights. One year warranty on all mechanical parts.",
    variants: [
      {
        id: "var-11",
        price: 299,
        stock: 45,
        discount: 25,
        size: { id: "size-8", label: "Standard", value: "standard" },
        images: [
          { id: "image_28", image: "https://picsum.photos/id/1015/800/400" },
          { id: "image_29", image: "https://picsum.photos/id/1008/800/400" },
          { id: "image_30", image: "https://picsum.photos/id/1009/800/400" },
        ],
      },
      {
        id: "var-12",
        price: 399,
        stock: 22,
        discount: 20,
        size: { id: "size-9", label: "Executive", value: "executive" },
        images: [
          { id: "image_31", image: "https://picsum.photos/id/1010/800/400" },
          { id: "image_32", image: "https://picsum.photos/id/1011/800/400" },
          { id: "image_33", image: "https://picsum.photos/id/1012/800/400" },
        ],
      },
    ],
  },
  {
    id: "prod-7",
    name: "Vintage Bookshelf",
    slug: "vintage-bookshelf",
    tags: [
      { id: "tag-8", label: "Storage", value: "storage" },
      { id: "tag-2", label: "Living Room", value: "living-room" },
    ],
    deliveryInfo: "Est. Delivery between 3 - 5 days",
    rating: 4.3,
    description:
      "Add character to your space with our Vintage Bookshelf. Five spacious shelves provide ample storage for books, décor, and collectibles. Distressed finish gives it an authentic antique look.",
    reviewCount: 19,
    moreInfo:
      "Made from reclaimed wood. Each piece is unique with natural variations in color and texture. Wall anchors included for safety. Maximum weight capacity per shelf: 50 lbs.",
    variants: [
      {
        id: "var-13",
        price: 349,
        stock: 35,
        discount: 8,
        size: { id: "size-10", label: "5-Tier", value: "5-tier" },
        images: [
          { id: "image_34", image: "https://picsum.photos/id/1013/800/400" },
          { id: "image_35", image: "https://picsum.photos/id/1014/800/400" },
          { id: "image_36", image: "https://picsum.photos/id/1016/800/400" },
        ],
      },
      {
        id: "var-14",
        price: 249,
        stock: 55,
        discount: 12,
        size: { id: "size-11", label: "3-Tier", value: "3-tier" },
        images: [
          { id: "image_37", image: "https://picsum.photos/id/1018/800/400" },
          { id: "image_38", image: "https://picsum.photos/id/1019/800/400" },
          { id: "image_39", image: "https://picsum.photos/id/1020/800/400" },
        ],
      },
    ],
  },
  {
    id: "prod-8",
    name: "Contemporary Floor Lamp",
    slug: "contemporary-floor-lamp",
    tags: [
      { id: "tag-9", label: "Lighting", value: "lighting" },
      { id: "tag-2", label: "Living Room", value: "living-room" },
    ],
    deliveryInfo: "Est. Delivery between 1 - 3 days",
    rating: 4.6,
    description:
      "Illuminate your home with style using our Contemporary Floor Lamp. Features a sleek design with adjustable brightness settings and energy-efficient LED bulbs. Perfect for reading corners or ambient lighting.",
    reviewCount: 41,
    moreInfo:
      "LED bulb included. Energy Star certified. Foot switch for easy on/off control. Three brightness levels. Stable weighted base prevents tipping.",
    variants: [
      {
        id: "var-15",
        price: 159,
        stock: 65,
        discount: 15,
        size: { id: "size-12", label: "Tall", value: "tall" },
        images: [
          { id: "image_40", image: "https://picsum.photos/id/1021/800/400" },
          { id: "image_41", image: "https://picsum.photos/id/1022/800/400" },
          { id: "image_42", image: "https://picsum.photos/id/1023/800/400" },
        ],
      },
      {
        id: "var-16",
        price: 129,
        stock: 90,
        discount: 10,
        size: { id: "size-2", label: "Medium", value: "medium" },
        images: [
          { id: "image_43", image: "https://picsum.photos/id/1024/800/400" },
          { id: "image_44", image: "https://picsum.photos/id/1026/800/400" },
          { id: "image_45", image: "https://picsum.photos/id/1027/800/400" },
        ],
      },
    ],
  },
  {
    id: "prod-9",
    name: "Plush Area Rug",
    slug: "plush-area-rug",
    tags: [
      { id: "tag-10", label: "Décor", value: "decor" },
      { id: "tag-1", label: "Bedroom", value: "bedroom" },
    ],
    deliveryInfo: "Est. Delivery between 4 - 6 days",
    rating: 4.7,
    description:
      "Add warmth and comfort to any room with our Plush Area Rug. Made from soft, high-pile synthetic fibers that are stain-resistant and easy to clean. Available in multiple sizes and colors.",
    reviewCount: 56,
    moreInfo:
      "Vacuum regularly to maintain appearance. Spot clean with mild detergent. Professional cleaning recommended annually. Non-slip pad recommended for hardwood floors.",
    variants: [
      {
        id: "var-17",
        price: 199,
        stock: 40,
        discount: 20,
        size: { id: "size-13", label: "8x10 ft", value: "8x10" },
        images: [
          { id: "image_46", image: "https://picsum.photos/id/1028/800/400" },
          { id: "image_47", image: "https://picsum.photos/id/1029/800/400" },
          { id: "image_48", image: "https://picsum.photos/id/1030/800/400" },
        ],
      },
      {
        id: "var-18",
        price: 129,
        stock: 70,
        discount: 15,
        size: { id: "size-14", label: "5x7 ft", value: "5x7" },
        images: [
          { id: "image_49", image: "https://picsum.photos/id/1031/800/400" },
          { id: "image_50", image: "https://picsum.photos/id/1032/800/400" },
          { id: "image_51", image: "https://picsum.photos/id/1033/800/400" },
        ],
      },
    ],
  },
  {
    id: "prod-10",
    name: "Minimalist Wall Mirror",
    slug: "minimalist-wall-mirror",
    tags: [
      { id: "tag-10", label: "Décor", value: "decor" },
      { id: "tag-1", label: "Bedroom", value: "bedroom" },
    ],
    deliveryInfo: "Est. Delivery between 2 - 4 days",
    rating: 4.5,
    description:
      "Enhance your space with our Minimalist Wall Mirror. Features a thin metal frame and high-quality reflective glass. Perfect for entryways, bedrooms, or bathrooms. Creates the illusion of more space.",
    reviewCount: 38,
    moreInfo:
      "Hanging hardware included. Can be mounted horizontally or vertically. Tempered glass for safety. Wipe clean with glass cleaner. Handle with care during installation.",
    variants: [
      {
        id: "var-19",
        price: 179,
        stock: 48,
        discount: 10,
        size: { id: "size-15", label: "36x48 in", value: "36x48" },
        images: [
          { id: "image_52", image: "https://picsum.photos/id/1036/800/400" },
          { id: "image_53", image: "https://picsum.photos/id/1037/800/400" },
          { id: "image_54", image: "https://picsum.photos/id/1038/800/400" },
        ],
      },
      {
        id: "var-20",
        price: 119,
        stock: 85,
        discount: 15,
        size: { id: "size-16", label: "24x36 in", value: "24x36" },
        images: [
          { id: "image_55", image: "https://picsum.photos/id/1039/800/400" },
          { id: "image_56", image: "https://picsum.photos/id/1040/800/400" },
          { id: "image_57", image: "https://picsum.photos/id/1041/800/400" },
        ],
      },
    ],
  },
];

export default function FeatureSectionLayout() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center gap-10 py-20">
      <BaseHeading
        title="Featured Products"
        desc="Explore Today's Featured Picks!"
      />

      <div className="my-20 grid grid-cols-4 gap-x-5 gap-y-14">
        {features.slice(0, 8).map((item, index) => (
          <ProductCardGrid key={index} item={item} />
        ))}
      </div>

      <button
        onClick={() => router.push("/products")}
        className="w-60 rounded-sm cursor-pointer py-4 gap-1 text-xl font-medium flex items-center justify-center bg-(--color-btn) text-(--color-text-btn)"
      >
        <Plus size={16} strokeWidth={3} />
        See All Products
      </button>
    </div>
  );
}
