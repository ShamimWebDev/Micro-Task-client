import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";
import { motion } from "framer-motion";
import { Quote, Star, CheckCircle2 } from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Marcus Aurelius",
      role: "Top Rated Worker",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=150&q=80",
      quote:
        "The platform's payment system is revolutionary. I get paid as soon as my work is verified. Truly best-in-class.",
      rating: 5,
    },
    {
      id: 2,
      name: "Elena Rodriguez",
      role: "Premium Buyer",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?fit=crop&w=150&q=80",
      quote:
        "Quality of work is consistently high. The vetted community of professionals here is unmatched in the industry.",
      rating: 5,
    },
    {
      id: 3,
      name: "Jean-Pierre",
      role: "Enterprise Client",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?fit=crop&w=150&q=80",
      quote:
        "I've scaled my data operations by 400% using MicroTask. The infrastructure is robust and reliable.",
      rating: 5,
    },
    {
      id: 4,
      name: "Aisha Khan",
      role: "Verified Worker",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?fit=crop&w=150&q=80",
      quote:
        "Finally a platform that respects the worker's time. Transparent rules and fair compensation for every task.",
      rating: 5,
    },
  ];

  return (
    <section className="py-16 relative overflow-hidden">
      {/* Background Section Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] bg-indigo-600/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 pb-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <div className="flex items-center gap-3 justify-center mb-4">
            <div className="w-12 h-px bg-indigo-500" />
            <span className="text-indigo-400 font-black uppercase tracking-[0.3em] text-[10px]">
              Voices of Trust
            </span>
            <div className="w-12 h-px bg-indigo-500" />
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-white tracking-tight">
            Trusted by <span className="text-gradient">visionaries</span>
          </h2>
          <p className="text-lg text-slate-500 mt-6 font-medium max-w-2xl mx-auto">
            Our platform powers thousands of careers and businesses. Here is
            what our most successful community members have to say.
          </p>
        </motion.div>

        <Swiper
          slidesPerView={1}
          spaceBetween={40}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          modules={[Pagination, Autoplay]}
          className="pb-20! testimonials-swiper"
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <motion.div className="group h-[420px] glass-card p-10 rounded-[3rem] relative flex flex-col justify-between overflow-hidden border-white/5 hover:border-white/20">
                {/* Accent Glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  <div className="flex items-center gap-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className="fill-yellow-500 text-yellow-500"
                      />
                    ))}
                  </div>

                  <Quote
                    size={40}
                    className="text-indigo-500/20 mb-6 group-hover:text-indigo-500/40 transition-colors"
                  />

                  <p className="text-lg text-slate-300 font-medium leading-[1.6] line-clamp-5">
                    "{testimonial.quote}"
                  </p>
                </div>

                <div className="relative z-10 flex items-center gap-4 border-t border-slate-800/50 pt-8">
                  <div className="relative w-14 h-14">
                    <div className="absolute inset-0 bg-indigo-500 rounded-2xl blur opacity-20 group-hover:opacity-40" />
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="relative w-full h-full rounded-2xl object-cover border border-white/10"
                    />
                  </div>
                  <div>
                    <h4 className="font-black text-white flex items-center gap-1.5">
                      {testimonial.name}
                      <CheckCircle2 size={14} className="text-indigo-400" />
                    </h4>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                      {testimonial.role}
                    </span>
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style>{`
        .testimonials-swiper .swiper-pagination-bullet {
          background: #4f46e5 !important;
          opacity: 0.2;
          width: 8px;
          height: 8px;
          transition: all 0.3s ease;
        }
        .testimonials-swiper .swiper-pagination-bullet-active {
          opacity: 1;
          width: 32px;
          border-radius: 4px;
        }
      `}</style>
    </section>
  );
};

export default Testimonials;
