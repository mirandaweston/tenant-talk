import React from "react";
import { Disclosure } from "@headlessui/react";
import { MinusSmallIcon, PlusSmallIcon } from "@heroicons/react/24/outline";

const FaqPage = () => {
  const faqs = [
    {
      question: " 🧍 Landlord",
      answer:
        "This category is about your landlord’s responsiveness to your queries and concerns, as well as their efficiency in handling any repairs or maintenance issues. If your landlord was quick to respond to your messages and took immediate action to resolve any issues with the property, you may rate them a 5. If they were slow to respond and didn’t resolve issues promptly, you may rate them a 1. ",
      example3:
        "A rating of 3 could indicate that the landlord was generally responsive but didn’t always address concerns in a timely manner or took longer to resolve maintenance issues.",
    },
    {
      question: "🔧 Condition",
      answer:
        "This category is about the overall condition of the property you rented. This includes the building itself, any outdoor space such as a garden or balcony, as well as fixtures, fittings, and paint. If the property was well-maintained, clean and in good repair, you may rate it a 5. If it was poorly maintained, dirty or in disrepair, you may rate it a 1.",
      example3:
        "A rating of 3 could indicate that the property was generally in good condition, but there were some minor issues such as wear and tear or a few cosmetic problems",
    },
    {
      question: "👩‍👧‍👦 Neighbors",
      answer:
        "This category is about your experience with your neighbours. Were they friendly and respectful, or did they cause disturbances and noise? If you had no issues with your neighbours and found them to be friendly and respectful, you may rate this category a 5. If you had significant issues with noise or disturbances caused by neighbours, you may rate it a 1.",
      example3:
        "A rating of 3 could indicate that you had a mix of positive and negative experiences with your neighbours, and while there were some issues, they weren’t significant enough to warrant a low rating.",
    },
    {
      question: "📍 Area",
      answer:
        "This category is about the local area where the property is located. This includes factors such as safety, cleanliness, and overall vibe. If the area was quiet, safe, and well-maintained, you may rate it a 5. If there were issues with anti-social behaviour, crime, or the area was dirty and poorly maintained, you may rate it a 1.",
      example3:
        " A rating of 3 could indicate that the local area had both positive and negative aspects, such as a mix of safe and less safe areas or a combination of well-maintained and less well-maintained areas",
    },
    {
      question: "🌡️ Warmth",
      answer:
        "This category is about the warmth of the property, and how it affects things like heating bills. If the property was warm and well-insulated, you may rate it a 5. If it was consistently cold and required a lot of heating, resulting in high bills, you may rate it a 1.",
      example3:
        "A rating of 3 could indicate that the property was generally warm enough, but there were some occasional issues with maintaining a comfortable temperature.",
    },
    {
      question: "🚗 Parking",
      answer:
        "This category is about the availability of parking at the property, including instances where parking was technically available, but it was difficult to find a parking space. If there was ample parking available and you never had trouble finding a space, you may rate it a 5. If there were significant issues with parking, such as no designated parking or limited availability, resulting in difficulty finding a space, you may rate it a 1.",
      example3:
        " A rating of 3 could indicate that parking was generally available, but there were occasional difficulties finding a space or there were some restrictions or limitations on parking",
    },
    // More questions...
  ];

  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-lg">
      <div className="mx-auto max-w-7xl px-4 py-12 ">
        <div className="mx-auto max-w-4xl ">
          <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">
            Reviews and Ratings: How does it all work?
          </h2>
          <br />
          <p>
            {" "}
            We know writing reviews can be tough, and ratings can be even more
            confusing. We've written up some handy tips to help you with writing
            a review!{" "}
          </p>
          <br />
          <p>
            {" "}
            The most important tip we can give you: the more detailed
            information you can provide, the better. While each individual star
            rating is helpful, explain specifics of why you've given it that
            rating. In particular for our yes/no options of "Pets allowed" and
            "Parking" - explain any situation surrounding this.{" "}
          </p>

          <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
            <div className="text-lg font-semibold">
              <p> How do I rate...</p>
            </div>
            {faqs.map((faq) => (
              <Disclosure as="div" key={faq.question} className="pt-6">
                {({ open }) => (
                  <>
                    <dt>
                      <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
                        <span className="text-base font-semibold leading-7">
                          {faq.question}
                        </span>
                        <span className="ml-6 flex h-7 items-center">
                          {open ? (
                            <MinusSmallIcon
                              className="h-6 w-6"
                              aria-hidden="true"
                            />
                          ) : (
                            <PlusSmallIcon
                              className="h-6 w-6"
                              aria-hidden="true"
                            />
                          )}
                        </span>
                      </Disclosure.Button>
                    </dt>
                    <Disclosure.Panel as="dd" className="mt-2 pr-12">
                      <p className="text-base leading-7 text-gray-600">
                        {faq.answer} <br /> <br />
                        {faq.example3}
                      </p>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};
export default FaqPage;
