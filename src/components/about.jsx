import Navbar from "./navbar";
import Footer from "./footer";

const About = () => {
  return (
    
    <div className=" flex-col min-h-screen bg-grid-pattern grid text-gray-800">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-12">
 
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-600 mb-4">About Our Platform</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A modern platform built to simplify learning. Browse, enroll, and grow with top-quality courses across multiple disciplines — all in one place.
          </p>
        </section>


        <section className="grid md:grid-cols-2 gap-10 items-center mb-16">
          <div>
            <h2 className="text-2xl font-semibold mb-4">🎯 Our Mission</h2>
            <p className="text-gray-600">
              We aim to empower learners by providing access to a variety of high-quality, beginner-friendly, and professional-level courses — all under a clean and easy-to-navigate platform.
            </p>
          </div>
          <img
            src="laptopguy.jpg"
            alt="Our Mission"
            className="w-full rounded-lg shadow-md object-cover h-64"
          />
        </section>

        {/* What We Offer Section */}
        <section className="grid md:grid-cols-2 gap-10 items-center mb-16">
          <img
            src="whatweoffer.png"
            alt="What We Offer"
            className="w-full rounded-lg shadow-md object-cover h-64 order-2 md:order-1"
          />
          <div className="order-1 md:order-2">
            <h2 className="text-2xl font-semibold mb-4">💡 What We Offer</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Wide range of modern courses</li>
              <li>User-friendly and responsive interface</li>
              <li>Clean course presentation with images</li>
              <li>Easy registration and enrollment</li>
              <li>Self-paced learning options</li>
            </ul>
          </div>
        </section>

  
        <section className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl font-semibold mb-4">⚙️ Powered By Modern Technologies</h2>
            <p className="text-gray-600">
              Our platform is built using cutting-edge technologies to ensure fast performance, clean UI, and scalability — including React.js, Firebase, Tailwind CSS, and more.
            </p>
          </div>
          <img
            src="techstack.png"
            alt="Tech Stack"
            className="w-full rounded-lg shadow-md object-cover h-64"
          />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
