import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="relative bg-blue-600 py-24 rounded-2xl overflow-hidden mt-10">

      {/* ------------------ CENTERED CONTENT ------------------ */}
      <div className="max-w-5xl mx-auto px-6 flex justify-center text-center">
        <div>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 uppercase
  bg-gradient-to-r from-[#C6FFDD] via-[#FBD786] to-[#f7797d]
  bg-clip-text text-transparent
">
            Explore, support, or simply say hello.
          </h3>


          {/* Button + Arc */}
          <div className="relative flex flex-col items-center">
            <Link
              to="/contact"
              className="text-lg sm:text-xl text-white px-6 py-3 rounded-full"
            >
              Let’s Talk
            </Link>

            {/* Arc underline (SVG) */}
            <svg
              width="120"
              height="18"
              viewBox="0 0 120 18"
              className="mx-auto absolute bottom-0 group-hover:scale-110 transition-transform duration-300"
            >
              <path
                d="M10 10 Q60 18 110 10"
                stroke="white"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      </div>


      {/* ------------------ FLOATING SVG SHAPES ------------------ */}

      {/* Shape 1 — Yellow Small Blob */}
      <div className="absolute top-12 left-16 w-10 animate-float-slow">
        <svg viewBox="0 0 60 30" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M5 12C18 -8 42 -4 55 14C38 32 14 30 5 12Z"
            fill="#FFCB42"
          />
        </svg>
      </div>

      {/* Shape 2 — Orange Blob */}
      <div className="absolute top-10 right-1/3 w-10 animate-float-medium">
        <svg viewBox="0 0 60 30" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M6 15C18 -10 44 -5 54 12C38 32 18 33 6 15Z"
            fill="#FF7B3F"
          />
        </svg>
      </div>

      {/* Shape 3 — Small Green Blob */}
      <div className="absolute bottom-24 left-1/3 w-8 animate-float-fast">
        <svg viewBox="0 0 55 25" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M4 10C16 -8 40 -5 50 12C34 28 12 28 4 10Z"
            fill="#28C76F"
          />
        </svg>
      </div>

      {/* Shape 4 — Green Half-Bubble */}
      {/* BIG GREEN BLOB */}
      <div className="absolute bottom-12 right-28 animate-float-slow">
        <svg
          viewBox="0 0 180 90"
          className="w-32 rotate-[3deg]"
        >
          <path
            d="M10 70 Q20 10 90 10 Q160 10 170 70 Q90 100 10 70 Z"
            fill="#28C76F"
          />
        </svg>
      </div>

      {/* BIG YELLOW BLOB */}
      <div className="absolute bottom-10 right-12 animate-float-medium">
        <svg
          viewBox="0 0 160 80"
          className="w-28 -rotate-[6deg]"
        >
          <path
            d="M8 60 Q25 5 80 5 Q135 5 152 60 Q80 90 8 60 Z"
            fill="#FFCB42"
          />
        </svg>
      </div>


    </section>
  );
};

export default CTA;