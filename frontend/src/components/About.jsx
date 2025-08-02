const About = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-12">
      <div className="max-w-4xl bg-white rounded-xl shadow-lg p-8 sm:p-12">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          About This Blog Platform
        </h2>

        {/* What it is */}
        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          This blog platform is an online space designed for people to share
          their ideas, stories, and knowledge through well-organized and
          easy-to-read blog posts. Whether you're a writer, reader, or both —
          this platform offers a clean and welcoming environment to explore
          content.
        </p>

        {/* Why to use it */}
        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          It's built to be simple, fast, and distraction-free — making it easy
          for anyone to publish and read blogs without technical barriers.
          Whether you're looking to grow your writing habit, document your
          thoughts, or connect with others through writing, this platform is
          here for you.
        </p>

        {/* Features */}
        <div className="text-gray-700 text-lg leading-relaxed mb-4">
          <span className="font-semibold">Key features include:</span>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Create and publish blog posts easily</li>
            <li>Edit or delete your own blogs anytime</li>
            <li>Browse and read blogs from others</li>
            <li>View posts in a clean, card-style layout</li>
            <li>Fully responsive design for all devices</li>
          </ul>
        </div>

        {/* Wrap-up */}
        <p className="text-gray-700 text-lg leading-relaxed">
          This platform is made for self-expression, knowledge sharing, and
          meaningful reading. Whether you're here to write or to explore —
          welcome to the community!
        </p>
      </div>
    </div>
  );
};

export default About;
