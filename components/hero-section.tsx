import Image from "next/image"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-transparent">
      <div className="w-full">
        <Image
          src="/images/d8-aa-d9-86-d8-b2-d9-8a-d9-84.png"
          alt="Eng. Ahmed Shawky - Founder of Shawky Group"
          width={1920}
          height={600}
          className="w-full h-auto object-cover"
          priority
          quality={100}
        />
      </div>

      <div className="relative bg-background/80 backdrop-blur-sm py-8 sm:py-12 md:py-16 px-3 sm:px-4 md:px-6">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-48 sm:w-72 md:w-96 h-48 sm:h-72 md:h-96 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-48 sm:w-72 md:w-96 h-48 sm:h-72 md:h-96 bg-primary/20 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          {/* Welcome Message */}
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-4 sm:mb-6 leading-relaxed px-2">
            مرحبا بكم في اكبر عائلة في مصر... عائلة شوقي جروب
          </h1>

          <div className="space-y-3 sm:space-y-4 text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl mx-auto px-2">
            <p className="text-primary/90 font-semibold text-base sm:text-lg md:text-xl">
              هنا النجاح مش صدفة... النجاح نظام، والتزام، وروح شغل واحدة.
            </p>

            <p className="text-sm sm:text-base">المنصة دي اتعملت مخصوص علشانكم... علشان اي موظف جديد او قديم يلاقي كل اللي محتاجه في مكان واحد:</p>

            <p className="text-muted-foreground/80 text-sm sm:text-base">
              من اول القواعد العامة... للمواصفات الفنية... للجودة... لحد خطط التنفيذ المرحلية.
            </p>
          </div>

          {/* Features */}
          <div className="mt-6 sm:mt-8 md:mt-10 grid grid-cols-1 md:grid-cols-3 gap-4"></div>

          <p className="mt-6 sm:mt-8 md:mt-10 text-primary text-base sm:text-lg md:text-xl font-bold">يلا نشتغل... ونكبر سوا</p>
        </div>
      </div>
    </section>
  )
}
