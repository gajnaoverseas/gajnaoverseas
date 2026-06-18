"use client";
import { useRouter } from "next/navigation";

export default function SearchByNameForm({ defaultValue = "" }: { defaultValue?: string }) {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const query = ((data.get("search") as string) || "").trim();
    // Client-side navigation (no full reload, so the preloader never re-triggers)
    router.push(query ? `/search?search=${encodeURIComponent(query)}` : "/search");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-stretch gap-3 w-full">
      <input
        type="text"
        name="search"
        placeholder="e.g. Plantation A..."
        defaultValue={defaultValue}
        className="relative z-10 flex-1 w-full min-w-0 px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-shadow"
      />
      <button
        type="submit"
        className="relative z-0 w-full sm:w-auto px-6 py-3 bg-coffee-brown text-white rounded-lg hover:bg-amber-800 transition-colors font-semibold shadow-sm hover:shadow-md"
      >
        Search
      </button>
    </form>
  );
}
