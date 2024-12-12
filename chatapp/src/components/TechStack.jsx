export default function TecStack() {
    return (
      <div className="tecStack">
        <div className="bg-white py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-center text-lg/8 font-semibold text-gray-900">
              Technology Used to make it possible
            </h2>
            <div className="mx-auto mt-20 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-4">
              <img
                className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                src="/static/fastapi-1.svg"
                alt="Fast API"
                width="158"
                height="48"
              />
              <img
                className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                src="/static/react-2.svg"
                alt="React"
                width="158"
                height="48"
              />
              <img
                className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                src="/static/google-ai-1.svg"
                alt="Google AI"
                width="158"
                height="48"
              />
              <img
                className="col-span-2 max-h-12 w-full object-contain sm:col-start-1 lg:col-span-1"
                src="/static/mongodb-icon-2.svg"
                alt="Mongo DB"
                width="158"
                height="48"
              />
              {/* <img
                className="col-span-2 col-start-2 max-h-13 w-full object-contain sm:col-start-auto lg:col-span-1"
                src="https://tailwindui.com/plus/img/logos/158x48/statamic-logo-gray-900.svg"
                alt="Statamic"
                width="158"
                height="48"
              /> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
  