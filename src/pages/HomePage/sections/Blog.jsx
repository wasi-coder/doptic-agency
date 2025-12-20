import React from "react";

const blogPosts = [
  {
    image: "/images/blogimage1.svg",
    category: "Design",
    readTime: "5 min read",
    title: "The psychology of color in 2026",
    description:
      "Discover how palette choices influence user trust and decision-making.",
  },
  {
    image: "/images/blogimage2.svg",
    category: "Tech",
    readTime: "5 min read",
    title: "Why minimalism is evolving fast",
    description:
      "Exploring the shift toward maximalism in modern interface design",
  },
];

export const BlogSection = () => {
  return (
    <section className="flex flex-col w-full items-start gap-16 px-[75px] py-[120px] bg-bg-light dark:bg-bg-dark transition-colors duration-300">

      <header className="flex items-center justify-between w-full">

        <div className="flex flex-col w-full items-center gap-3 translate-y-[-1rem] animate-fade-in opacity-1 [--animation-delay:200ms]">
          
          <h2 className="self-stretch font-normal text-transparent text-7xl leading-[72px]">
           
            <span
              className="font-medium text-text-dark dark:text-text-light tracking-[-2.07px] leading-[86.4px]"
              style={{
                fontFamily: 'Inter Variable, Inter, sans-serif',
                fontWeight: 500
              }}
            >
              Insights from the
              <br />
            </span>

            <span
              className="italic text-text-dark dark:text-text-light tracking-[-2.07px] leading-[86.4px]"
              style={{
                fontFamily: 'Libre Caslon Text, serif',
                fontWeight: 400,
                fontStyle: 'italic'
              }}
            >
              studio
            </span>

          </h2>

          <p
            className="self-stretch font-normal text-gray-700 dark:text-text-secondary text-lg tracking-[0] leading-[28.8px]"
            style={{
              fontFamily: 'Inter Variable, Inter, sans-serif',
              fontWeight: 400
            }}
          >
            We share what we learn. Read our latest thoughts on the future of
            digital design.
          </p>

        </div>

        <button
          className="h-auto inline-flex items-center justify-center gap-2 px-6 py-3 border border-solid bg-bg-light dark:bg-bg-dark hover:bg-[#0e0e0e0a] dark:hover:bg-[#e2e2e20a] transition-colors translate-y-[-1rem] animate-fade-in opacity-1 [--animation-delay:400ms] rounded-md"
          style={{
            borderColor: 'rgba(14, 14, 14, 0.4)'
          }}
        >

          <span
            className="font-medium text-text-dark dark:text-text-light text-xl tracking-[0] leading-[30px] whitespace-nowrap"
            style={{
              fontFamily: 'Inter Variable, Inter, sans-serif',
              fontWeight: 500
            }}
          >
            View All
          </span>
          
        </button>

      </header>

      <div className="grid grid-cols-2 gap-[30px] w-full">
        {blogPosts.map((post, index) => (
          <div
            key={index}
            className="flex flex-col items-start gap-[30px] bg-transparent translate-y-[-1rem] animate-fade-in opacity-1"
            style={{
              "--animation-delay": `${600 + index * 200}ms`
            }}
          >
            <div className="flex flex-col items-start gap-[30px] p-0 w-full">
              <img
                className="w-full  object-cover rounded-lg"
                alt="Placeholder image"
                src={post.image}
              />
              <div className="flex flex-col items-start gap-14 w-full">
                <div className="flex flex-col items-start gap-3 w-full">
                  <div className="flex items-center justify-between w-full">
                    <span
                      className="inline-flex items-start px-3 py-1 bg-[#ff49201a] rounded-[99px] border border-solid border-[#ff492033]"
                    >
                      <span
                        className="mt-[-1.00px] text-text-dark dark:text-text-light text-sm leading-[16.8px] whitespace-nowrap font-normal tracking-[0]"
                        style={{
                          fontFamily: 'Inter Variable, Inter, sans-serif',
                          fontWeight: 400
                        }}
                      >
                        {post.category}
                      </span>
                    </span>
                    <span
                      className="text-text-dark dark:text-text-light text-sm leading-[22.4px] whitespace-nowrap font-normal tracking-[0]"
                      style={{
                        fontFamily: 'Inter Variable, Inter, sans-serif',
                        fontWeight: 400
                      }}
                    >
                      {post.readTime}
                    </span>
                  </div>
                  <div className="flex flex-col items-start gap-3 w-full">
                    <h3
                      className="self-stretch font-medium text-text-dark dark:text-text-light text-[40px] tracking-[-1.60px] leading-[48.0px]"
                      style={{
                        fontFamily: 'Inter Variable, Inter, sans-serif',
                        fontWeight: 500
                      }}
                    >
                      {post.title}
                    </h3>
                    <p
                      className="self-stretch font-normal text-gray-700 dark:text-text-secondary text-lg tracking-[0] leading-[28.8px]"
                      style={{
                        fontFamily: 'Inter Variable, Inter, sans-serif',
                        fontWeight: 400
                      }}
                    >
                      {post.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BlogSection;
