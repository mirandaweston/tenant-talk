import React, { useState } from "react";

const timeline = [
  {
    name: "Founded Project",
    description: "The day our team was formed and Tenant Talk was born!",
    date: "March 24th",
    dateTime: "2023-03",
  },
  {
    name: "Secured $0m in funding",
    description:
      "But who needs a budget when you've got five junior devs and a deadline? Wireframes, models, diagrams galore... day 1 of our final engineering project began.",
    date: "March 27th",
    dateTime: "2023-03",
  },
  {
    name: "Completed MVP",
    description:
      "Our MVP is now complete-ish. Given our limited time, we took extra care to ensure that the functionality we built was not just box-ticking, but clean, reusable, and scalable, allowing for quick implementation of additional functionality.",
    date: "March 31st",
    dateTime: "2023-03",
  },
  {
    name: "Global launch of product",
    description:
      "Demo Day. We're here. You're here. No one on the team has had a breakdown... yet. Success!",
    date: "April 6th",
    dateTime: "2023-04",
  },
];

const team = [
  {
    name: "Dora Gores",
    role: "Founder",
    imageUrl: "/assets/dora.jpg",
  },
  {
    name: "Abi Makovsky",
    role: "Project Momager",
    imageUrl: "/assets/abi.jpg",
  },
  {
    name: "Miranda Weston",
    role: "Top Tester",
    imageUrl: "/assets/miranda.jpg",
  },
  {
    name: "Joel Powell",
    role: "Senior Dev",
    imageUrl: "/assets/joel.jpg",
  },
  {
    name: "Hayley Dobbs",
    role: "Code Clown",
    imageUrl: "/assets/hayley.jpg",
  },
];

const values = [
  {
    name: "Problem we solved",
    description:
      "Renters can read sales pitches on a website all day long, but it's not until they move into a property (often on a 12 month term) that they really find out what they need to know.",
  },
  {
    name: "How did we solve it?",
    description:
      "By allowing renters to leave reviews of properties they have rented. Cold house that inflates the gas bill? Neighbours that party all weekend? You can find all this and more at Tenant Talk.",
  },
  {
    name: "User First",
    description:
      "A website like this doesn't exist without users. We put them at the forefront with sleek, intuitive design choices and functionality that matters, without overcomplicating the process.",
  },
  {
    name: "Supportive Team",
    description:
      "We're fortunate that our team had established close working relationships throughout the course. This allowed us to have a friendly, fun-filled working environment to help overcome the stress and challenges we faced.",
  },
  {
    name: "Balance",
    description:
      "Finding a balance of learning, whilst still producing great work on a deadline has been extremely tricky. We all agree that whilst we wish we could have spent more time learning, if we had, we probably wouldn't have the polished product you see today.",
  },
  {
    name: "Enjoy downtime",
    description:
      "The midnight oil, the candle at both ends, whatever it was, it was definitely on fire. Ensuring we respected eachother's downtime was key to getting through the project and being able to give it our all. Though we still don't think Joel has watched \"Love Is Blind\".",
  },
];

const footerNavigation = {
  main: [
    { name: "Home", href: "/" },
    { name: "Signup", href: "/signup" },
    { name: "Login", href: "/login" },
    { name: "Rating Guide", href: "/ratingguide" },
  ],
};

const AboutPage = () => {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow">
      <main className="isolate">
        {/* Hero section */}
        <div className="relative isolate -z-10 overflow-hidden bg-gradient-to-b from-orange-100/20 pt-14">
          <div
            className="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-white shadow-xl shadow-orange-600/10 ring-1 ring-orange-50 sm:-mr-80 lg:-mr-96"
            aria-hidden="true"
          />
          <div className="mx-auto max-w-7xl px-6 py-32 sm:py-40 lg:px-8">
            <div className="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-6 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8">
              <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:col-span-2 xl:col-auto">
                A bright and airy London studio apartment... that's actually a
                cupboard in Clapham? Don't worry, we've got your back.
              </h1>
              <div className="mt-6 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1">
                <p className="text-lg leading-8 text-gray-600">
                  We’re Tenant Talk and we're here to change the way you find
                  your next rental home. Find honest reviews covering landlords
                  to localilty, parking to pets and much more from folks who've
                  actually lived there.
                </p>
              </div>
              <img
                src="https://source.unsplash.com/alWN2IQIqYc"
                alt=""
                className="mt-10 aspect-[6/5] w-full max-w-lg rounded-2xl object-cover sm:mt-16 lg:mt-0 lg:max-w-none xl:row-span-2 xl:row-end-2 xl:mt-36"
              />
            </div>
          </div>
          <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-white sm:h-32" />
        </div>

        {/* Timeline section */}
        <div className="mx-auto -mt-8 max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 overflow-hidden lg:mx-0 lg:max-w-none lg:grid-cols-4">
            {timeline.map((item) => (
              <div key={item.name}>
                <time
                  dateTime={item.dateTime}
                  className="flex items-center text-sm font-semibold leading-6 text-orange-500"
                >
                  <svg
                    viewBox="0 0 4 4"
                    className="mr-4 h-1 w-1 flex-none"
                    aria-hidden="true"
                  >
                    <circle cx={2} cy={2} r={2} fill="currentColor" />
                  </svg>
                  {item.date}
                  <div
                    className="absolute -ml-2 h-px w-screen -translate-x-full bg-gray-900/10 sm:-ml-4 lg:static lg:-mr-6 lg:ml-8 lg:w-auto lg:flex-auto lg:translate-x-0"
                    aria-hidden="true"
                  />
                </time>
                <p className="mt-6 text-lg font-semibold leading-8 tracking-tight text-gray-900">
                  {item.name}
                </p>
                <p className="mt-1 text-base leading-7 text-gray-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Team section */}
        <div className="sm:mt-30 mx-auto mt-32 max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Our team
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              We're the team that Googles everything, even how to make toast.
              But somehow we manage to build software (most of the time).
            </p>
          </div>
          <ul
            role="list"
            className="mx-auto mt-20 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-16 text-center sm:grid-cols-3 md:grid-cols-4 lg:mx-0 lg:max-w-none lg:grid-cols-5 xl:grid-cols-6"
          >
            {team.map((person) => (
              <li key={person.name}>
                <img
                  className="mx-auto h-24 w-24 rounded-full"
                  src={person.imageUrl}
                  alt=""
                />
                <h3 className="mt-6 text-base font-semibold leading-7 tracking-tight text-gray-900">
                  {person.name}
                </h3>
                <p className="text-sm leading-6 text-gray-600">{person.role}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Approach and Values
            </h2>
          </div>
          <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 text-base leading-7 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {values.map((value) => (
              <div key={value.name}>
                <dt className="font-semibold text-gray-900">{value.name}</dt>
                <dd className="mt-1 text-gray-600">{value.description}</dd>
              </div>
            ))}
          </dl>
        </div>

        <footer className="mx-auto mt-40 max-w-7xl overflow-hidden px-6 pb-20 sm:mt-64 sm:pb-24 lg:px-8">
          <nav
            className="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12"
            aria-label="Footer"
          >
            {footerNavigation.main.map((item) => (
              <div key={item.name} className="pb-6">
                <a
                  href={item.href}
                  className="text-sm leading-6 text-gray-600 hover:text-gray-900"
                >
                  {item.name}
                </a>
              </div>
            ))}
          </nav>
          <p className="mt-10 text-center text-xs leading-5 text-gray-500">
            &copy; 2023 Tenant Talk. All rights reserved.
          </p>
        </footer>
      </main>
    </div>
  );
};

export default AboutPage;
