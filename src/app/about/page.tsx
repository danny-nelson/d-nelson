import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About — Danny Nelson",
  description: "Product Leader with 17 years of experience in digital transformation across 80 countries.",
};

const experience = [
  {
    title: "Senior Product Manager - Client & Contractor Experience",
    company: "Veriforce",
    years: "2025 to 2026",
    location: "London, England, United Kingdom",
    description:
      "Owned the product strategy, roadmap and delivery for CHAS's global B2B contractor and client portal, supporting more than 35,000 contractors and 2,500 client organisations. Managed and developed 2 Product Owners while providing strategic leadership to a cross-functional team of approximately 50 colleagues across product, engineering, operations and commercial functions.",
  },
  {
    title: "Head of Product - In Life, Transformation",
    company: "Hyperoptic",
    years: "2024 to 2025",
    location: "London, England, United Kingdom",
    description:
      "Led the post-sales, in-life digital product strategy, owning the vision and roadmap for customer service journeys while supporting the organisation's digital product and engineering transformation. Worked cross-functionally to align customer needs, business priorities and delivery capabilities during a period of significant organisational change.",
  },
  {
    title: "Head of Product - Buy & Manage Order",
    company: "BT Group",
    years: "2022 to 2023",
    location: "London, England, United Kingdom",
    description:
      "Owned the end-to-end strategy, roadmap and delivery of web and mobile products supporting BT and EE's marketplace and omni-channel ambitions. Held accountability for a £8m P&L while leading and growing a cross-functional organisation from 60 to 80 colleagues, including the direct leadership and development of 5 Product Managers.",
  },
  {
    title: "Head of Product - Service",
    company: "BT Group",
    years: "2020 to 2022",
    location: "London, England, United Kingdom",
    description:
      "Led a £5m budget and a 50-member team, overseeing digital product development for 4 million monthly customer visits. Directed cross-functional collaboration between Customer Service and Digital teams to achieve business-critical targets around customer satisfaction and service innovation.",
  },
  {
    title: "Product Manager - Global Features",
    company: "BT Group",
    years: "2018 to 2020",
    location: "London, England, United Kingdom",
    description:
      "Oversaw a £2m budget and led a team of 30 delivering global digital experiences and website enhancements. Established BT's first Agile product teams, creating a delivery model that became the blueprint for future digital initiatives across the business.",
  },
  {
    title: "Product Manager",
    company: "Unipro Ltd",
    years: "2016 to 2018",
    location: "London, England, United Kingdom",
    description:
      "Led the implementation of a £7m online appointment booking system for Specsavers across 11 global B2C markets, driving annual revenue to £12m. Mentored Specsavers' Product Owners and Business Analysts in roadmap development, story crafting, and stakeholder engagement.",
  },
  {
    title: "Global Product Owner",
    company: "Nissan Motor Co., Ltd.",
    years: "2015 to 2016",
    location: "London, England, United Kingdom",
    description:
      "Global Product Owner responsible for Nissan's £80m global digital transformation across 360 websites in 20 languages, securing stakeholder alignment across Japan, Europe and the USA.",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <div className="flex items-center gap-6">
        <Image
          src="/profile.jpg"
          alt="Danny Nelson"
          width={96}
          height={96}
          className="rounded-full"
        />
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            Danny Nelson
          </h1>
          <p className="mt-1 text-lg text-gray-600 dark:text-gray-400">
            Product Leader | Digital Transformation
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">United Kingdom</p>
        </div>
      </div>

      <div className="prose prose-gray dark:prose-invert mt-10 max-w-none prose-headings:font-semibold">
        <h2>About</h2>
        <p>
          Accomplished digital leader with 17 years of experience launching,
          scaling and transforming digital products across 80 countries in both
          B2C and B2B sectors. Skilled in cultivating high-trust, empowered
          teams, I excel in fast-paced, diverse environments where passion and
          empathy fuel success. Commercially minded and customer-focused, I have
          built and scaled customer-facing products while leading teams of up to
          80 people, managing multi-million-pound P&amp;Ls, and delivering revenue
          growth, operational efficiency and long-term business value. Equally
          adept at influencing executive stakeholders and partnering with teams
          to translate strategy into measurable outcomes.
        </p>

        <h2>Experience</h2>
        <div className="not-prose space-y-8">
          {experience.map((role) => (
            <div key={`${role.company}-${role.years}`} className="border-l-2 border-gray-200 pl-5 dark:border-gray-700">
              <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">
                {role.title}
              </h3>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {role.company} - {role.years}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {role.location}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                {role.description}
              </p>
            </div>
          ))}
        </div>

        <h2 className="mt-10">Education</h2>
        <div className="not-prose border-l-2 border-gray-200 pl-5 dark:border-gray-700">
          <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">
            Liverpool John Moores University
          </h3>
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Bachelor of Science (BSc), Information Systems
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">2005 – 2009 · Grade: 2:1</p>
          <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
            Modules: Business, IT and Law
            <br />
            Thesis: Outsourcing for SMEs in Difficult Financial Times
          </p>
        </div>

        <h2 className="mt-10">Get in Touch</h2>
        <p>
          Feel free to reach out via{" "}
          <a
            href="https://www.linkedin.com/in/danny-nelson86/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>{" "}
          or leave a comment on any of my blog posts.
        </p>
      </div>
    </div>
  );
}
