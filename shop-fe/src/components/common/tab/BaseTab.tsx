import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ReactNode } from "react";

interface BaseTabItemProps {
  label: string;
  value: string;
  content: ReactNode;
}

export default function BaseTab({ items }: { items: BaseTabItemProps[] }) {
  return (
    <Tabs defaultValue={items[0].value} className="w-full shadow-xs">
      <TabsList className="bg-transparent p-0 transition-all duration-300">
        {items.map((item) => (
          <TabsTrigger
            className="data-[state=active]:bg-(--color-foreground) transition-all duration-300 pb-7 pt-6 mb-2 text-lg font-normal px-10 text-(--color-text) data-[state=active]:shadow-none data-[state=active]:rounded-none"
            value={item.value}
            key={item.value}
          >
            {item.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {items.map((item) => (
        <TabsContent
          key={item.value}
          className="-mt-2 bg-(--color-foreground) px-5 py-5 transition-all duration-300"
          value={item.value}
        >
          {item.content}
        </TabsContent>
      ))}
    </Tabs>
  );
}
