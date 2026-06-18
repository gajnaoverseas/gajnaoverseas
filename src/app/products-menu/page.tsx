import Link from "next/link";
import Image from "next/image";

export const dynamic = "force-static";

// Fallback: generate a URL-friendly slug from a grade name so each item links to its page
const slugifyGrade = (name: string) =>
  name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9\s-]/g, "") // remove special chars
    .trim()
    .replace(/\s+/g, "-");

const slugMap: Record<string, string> = {
  "Plantation PB": "plantation-pb",
  "Plantation A": "plantation-a",
  "Plantation B": "plantation-b",
  "Plantation C": "plantation-c",
  "Monsooned Malabar Robusta Triage -  Unwashed": "monsooned-malabar-robusta-triage",
  "Liberia Bulk (Bulk Coffee from Liberia)": "liberia-bulk",
  "Excelsia Bulk (Bulk Coffee from Excelsia)": "excelsia-bulk",
  "Arabica Cherry Blacks/Browns": "arabica-cherry-blacks-browns",
  "Robusta Parchment Blacks/Browns": "robusta-parchment-blacks-browns",
  "Robusta Cherry Blacks/Browns": "robusta-cherry-blacks-browns",
  "Plantation AA": "plantation-aa",
  "Plantation PB Bold": "plantation-pb-bold",
  "Arabica Cherry AA": "arabica-cherry-aa",
  "Arabica Cherry A": "arabica-cherry-a",
  "Arabica Cherry PB Bold": "arabica-cherry-pb-bold",
  "Robusta Parchment A": "robusta-parchment-a",
  "Robusta Parchment PB Bold": "robusta-parchment-pb-bold",
  "Robusta Cherry AA": "robusta-cherry-aa",
  "Robusta Cherry A": "robusta-cherry-a",
  "Robusta Cherry PB Bold": "robusta-cherry-pb-bold",
  "Mysore Nuggets Extra bold- Washed": "mysore-nuggets-extra-bold",
  "Monsooned Malabar AAA -  Unwashed": "monsooned-malabar-aaa",
  "Monsooned Malabar AA -  unwashed": "monsooned-malabar-aa",
  "Monsooned Malabar arabica Triage -  Unwashed": "monsooned-malabar-arabica-triage",
  "Robusta Kaapi Royale- Washed Coffee": "robusta-kaapi-royale",
  "Monsooned Malabar Robusta PR -  Unwashed": "monsooned-malabar-robusta-pr",
};

type GradeGroup = {
  title: string; // Section, e.g., Commercial Grades
  blocks: Array<{
    heading: string; // Arabica | Robusta
    groups: Array<{
      subheading: string; // e.g., Washed Arabica Plantation
      variety: "Arabica" | "Robusta";
      items: string[];
    }>;
  }>;
};

const gradesData: GradeGroup[] = [
  {
    title: " A) Commercial Grades",
    blocks: [
      {
        heading: "Arabica",
        groups: [
          {
            subheading: "Washed Arabica (Arabica Parchment)",
            variety: "Arabica",
            items: [
              "Plantation PB",
              "Plantation A",
              "Plantation B",
              "Plantation C",
              "Plantation Blacks",
              "Plantation Bits",
              "Plantation Bulk",
            ],
          },
          {
            subheading: "Unwashed Arabica (Arabica Cherry)",
            variety: "Arabica",
            items: [
              "Arabica Cherry PB",
              "Arabica Cherry AB",
              "Arabica Cherry C",
              "Arabica Cherry Blacks/Browns",
              "Arabica Cherry Bits",
              "Arabica Cherry Bulk",
            ],
          },
        ],
      },
      {
        heading: "Robusta",
        groups: [
          {
            subheading: "Washed Robusta (Robusta Parchment)",
            variety: "Robusta",
            items: [
              "Robusta Parchment PB",
              "Robusta Parchment AB",
              "Robusta Parchment C",
              "Robusta Parchment Blacks/Browns",
              "Robusta Parchment Bits",
              "Robusta Parchment Bulk",
            ],
          },
          {
            subheading: "Unwashed Robusta (Robusta Cherry)",
            variety: "Robusta",
            items: [
              "Robusta Cherry PB",
              "Robusta Cherry AB",
              "Robusta Cherry C",
              "Robusta Cherry Blacks/Browns",
              "Robusta Cherry Bits",
              "Robusta Cherry Bulk",
              "Robusta Cherry Clean/Bulk",
            ],
          },
        ],
      },
    ],
  },
  {
    title: "B) Premium Grades",
    blocks: [
      {
        heading: "Arabica",
        groups: [
          {
            subheading: "Washed Arabica Plantation",
            variety: "Arabica",
            items: ["Plantation AA", "Plantation PB Bold"],
          },
          {
            subheading: "Unwashed Arabica Cherry",
            variety: "Arabica",
            items: ["Arabica Cherry AA", "Arabica Cherry A", "Arabica Cherry PB Bold"],
          },
        ],
      },
      {
        heading: "Robusta",
        groups: [
          {
            subheading: "Washed Robusta Parchment",
            variety: "Robusta",
            items: ["Robusta Parchment A", "Robusta Parchment PB Bold"],
          },
          {
            subheading: "Unwashed Robusta Cherry",
            variety: "Robusta",
            items: ["Robusta Cherry AA", "Robusta Cherry A", "Robusta Cherry PB Bold"],
          },
        ],
      },
    ],
  },
  {
    title: "C) Specialty Grades",
    blocks: [
      {
        heading: "Arabica",
        groups: [
          {
            subheading: "Washed Arabica",
            variety: "Arabica",
            items: ["Mysore Nuggets Extra bold"],
          },
          {
            subheading: "Arabica Cherry",
            variety: "Arabica",
            items: [
              "Monsooned Malabar AAA",
              "Monsooned Malabar AA",
              "Monsooned Malabar A",
              "Monsooned Malabar arabica Triage",
            ],
          },
        ],
      },
      {
        heading: "Robusta",
        groups: [
          {
            subheading: "Robusta Parchment",
            variety: "Robusta",
            items: ["Robusta Kaapi Royale"],
          },
          {
            subheading: "Robusta Cherry",
            variety: "Robusta",
            items: [
              "Monsooned Malabar Robusta PR ",
              "Monsooned Malabar Robusta Triage ",
            ],
          },
        ],
      },
    ],
  },
  {
    title: "D) Miscellaneous Grades",
    blocks: [
      {
        heading: "",
        groups: [
          {
            subheading: "",
            variety: "Arabica",
            items: [
              "Liberia Bulk (Bulk Coffee from Liberia)",
              "Excelsia Bulk (Bulk Coffee from Excelsia)",
            ],
          },
        ],
      },
    ],
  },
];

export default function ProductsMenuPage() {
  return (
    <main className="min-h-screen bg-white pt-40 md:pt-48 lg:pt-56 pb-16">
      <div className="max-w-7xl mx-auto p-4 sm:p-8 font-semibold">
        {/* Header */}
        <div className="shadow-2xl text-coffee-brown p-4 mb-8 rounded-lg flex items-center border border-black w-[95%] md:w-[85%] mx-auto justify-center">
          <Image
            src="/logos/1.webp"
            alt="Logo of Coffee Board Of India"
            width={40}
            height={40}
            className="w-16 h-20 md:w-20 md:h-24 mr-3"
          />
          <h2 className="text-lg md:text-2xl font-bold text-center">
            Classification and Grading of Indian Coffees as per the Coffee Board of India
          </h2>
        </div>

        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12">
            {gradesData.map((section) => (
              <div key={section.title} className="mb-10">
                <h3 className="text-2xl font-serif text-red-700 mb-4 text-center">{section.title}</h3>
                {section.title === "Miscellaneous Grades" ? (
                  <div className="bg-white">
                    {(section.blocks[0]?.groups || []).map((g, i) => (
                      <div key={i} className="mb-4">
                        {g.subheading ? (
                          <p className="text-sm text-coffee-brown font-medium mb-1">{g.subheading}</p>
                        ) : null}
                        <ol className="list-decimal pl-5 space-y-1 text-sm text-coffee-brown">
                          {g.items.map((name) => {
                            const slug = slugMap[name];
                            const href = slug ? `/products/${slug}` : "/products";
                            return (
                              <li key={name}>
                                <Link href={href} className="hover:text-coffee-brown">
                                  {name}
                                </Link>
                              </li>
                            );
                          })}
                        </ol>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {section.blocks.map((block, idx) => (
                      <div key={idx} className="lg:col-span-2">
                        {block.heading ? (
                          <h4 className="font-semibold text-coffee-brown mb-1 text-wider text-center">{block.heading}</h4>
                        ) : null}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          {block.groups.map((g, gIdx) => (
                            <div key={gIdx}>
                              {g.subheading ? (
                                <p className="text-sm text-green-700 font-semibold mb-1 text-center">{g.subheading}</p>
                              ) : null}
                              <ol className="list-decimal pl-12 lg:pl-20 space-y-1 text-sm text-coffee-brown">
                                {g.items.map((name) => {
                                  const slug = slugMap[name] || slugifyGrade(name);
                                  const href = `/products/${slug}`;
                                  return (
                                    <li key={name}>
                                      <Link href={href} className="hover:text-coffee-brown text-xs">
                                        {name}
                                      </Link>
                                    </li>
                                  );
                                })}
                              </ol>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
