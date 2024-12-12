export default function Teams() {
    return (
      <div className="team">
        <div className="bg-white py-24 sm:py-32">
          <div className="mx-auto grid max-w-7xl gap-20 px-6 lg:px-8 xl:grid-cols-2">
            <div className="max-w-xl">
              <h2 className="text-pretty text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
                Meet our Developers!
              </h2>
              <p className="mt-6 text-lg/8 text-gray-600">
                We're a team of four passionate individuals driven by creativity and dedication, working together to
                deliver exceptional results and make your vision a reality.
              </p>
            </div>
            <ul role="list" className="grid gap-x-9 gap-y-12 sm:grid-cols-4 sm:gap-y-16 xl:col-span-4">
              <li>
                <div className="flex items-center gap-x-6">
                  <img className="w-24 h-24 rounded-full" src="/static/vinay.png" alt="Vinay Tilada" />
                  <div>
                    <h3 className="text-2xl font-semibold tracking-tight text-gray-900">
                      <a href="https://www.linkedin.com/in/vinaytilada/">Vinay Tilada</a>
                    </h3>
                    <p className="text-sm font-semibold text-indigo-600">Backend / Deployment Developer</p>
                  </div>
                </div>
              </li>
              <li>
                <div className="flex items-center gap-x-6">
                  <img className="w-24 h-24 rounded-full" src="/static/manas.png" alt="Manas Kolaskar" />
                  <div>
                    <h3 className="text-2xl font-semibold tracking-tight text-gray-900">
                      <a href="https://www.linkedin.com/in/manaskolaskar/">Manas Kolaskar</a>
                    </h3>
                    <p className="text-sm font-semibold text-indigo-600">Front End Developer</p>
                  </div>
                </div>
              </li>
              <li>
                <div className="flex items-center gap-x-6">
                  <img className="w-24 h-24 rounded-full" src="/static/khushi.png" alt="Khushi Thakur" />
                  <div>
                    <h3 className="text-2xl font-semibold tracking-tight text-gray-900">
                      <a href="https://www.linkedin.com/in/khushi-thakur-259395300/">Khushi Thakur</a>
                    </h3>
                    <p className="text-sm font-semibold text-indigo-600">Front End Developer</p>
                  </div>
                </div>
              </li>
              <li>
                <div className="flex items-center gap-x-6">
                  <img className="w-24 h-24 rounded-full" src="/static/vansh.png" alt="Vansh Jain" />
                  <div>
                    <h3 className="text-2xl font-semibold tracking-tight text-gray-900">
                      <a href="https://www.linkedin.com/in/codewithvansh-jain/">Vansh Jain</a>
                    </h3>
                    <p className="text-sm font-semibold text-indigo-600">Full Stack Developer</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
  