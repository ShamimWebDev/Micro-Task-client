import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import { FiQuote } from "react-icons/fi";

import "swiper/css";
import "swiper/css/pagination";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Emily R.",
      role: "Worker",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      quote:
        "I've been working here for 6 months and have earned enough to pay my tuition. The best micro-tasking platform!",
    },
    {
      id: 2,
      name: "Mark T.",
      role: "Buyer",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      quote:
        "Posting tasks is super easy and the quality of work I get is amazing. Highly recommended for business owners.",
    },
    {
      id: 3,
      name: "Sophia L.",
      role: "Worker",
      image:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      quote:
        "Quick payments and helpful support. I love the variety of tasks available every day.",
    },
    {
      id: 4,
      name: "David K.",
      role: "Buyer",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      quote:
        "This platform saved me so much time. I can outsource small tasks and focus on growing my business.",
    },
  ];

  return (
    <section className="py-20 bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
            What Our <span className="text-gradient">Users Say</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Don't just take our word for it. Read success stories from our
            community of workers and buyers.
          </p>
        </motion.div>

        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          modules={[Pagination, Autoplay]}
          className="pb-12"
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <motion.div
                whileHover={{ y: -5 }}
                className="glass-card p-8 rounded-2xl h-full flex flex-col relative"
              >
                <FiQuote className="absolute top-6 right-6 text-4xl text-slate-700/50" />

                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full border-2 border-indigo-500 object-cover"
                  />
                  <div>
                    <h4 className="text-lg font-bold text-white">
                      {testimonial.name}
                    </h4>
                    <span
                      className={`text-sm px-2 py-0.5 rounded-full ${
                        testimonial.role === "Worker"
                          ? "bg-indigo-500/20 text-indigo-300"
                          : "bg-pink-500/20 text-pink-300"
                      }`}
                    >
                      {testimonial.role}
                    </span>
                  </div>
                </div>

                <p className="text-slate-300 italic flex-grow">
                  "{testimonial.quote}"
                </p>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;
