import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <div className="relative bg-[#2D3034] text-white">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h1 className="text-6xl font-bold tracking-tight">
            QUALIFIED
            <br />
            <span className="text-red-600">TALENT</span>
          </h1>
          
          <p className="text-lg text-gray-300">
            The Qualified Staffing team is made up of local professionals who
            live and work in the communities they serve; staffing experts who
            love what they do and care about the people they do it for.
          </p>
          
          <p className="text-lg">
            We care about the communities we serve because they are{" "}
            <em className="font-semibold">our</em> communities.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button
              size="lg"
              className="bg-red-600 hover:bg-red-700 text-white px-8"
            >
              I&apos;M A JOB SEEKER
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-white border-white hover:bg-white/10"
            >
              I&apos;M AN EMPLOYER
            </Button>
          </div>
        </div>
      </div>
      
      {/* Curved divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 100H1440V0C1440 0 1320 60 720 60C120 60 0 0 0 0V100Z"
            fill="white"
          />
        </svg>
      </div>
    </div>
  )
}

