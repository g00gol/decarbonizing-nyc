import Head from "next/head";

const team = {
  "Erik Cederstav": {
    src: "/images/team/erikC.png",
    alt: "erik cederstav photo",
    title: "Mechanical Engineering",
  },
  "Anthony DiFiore": {
    src: "/images/team/anthonyD.png",
    alt: "anthony difiore photo",
    title: "Mechanical Engineering",
  },
  "Angelina Dresser": {
    src: "/images/team/angelinaD.png",
    alt: "angelina dresser photo",
    title: "Civil Engineering",
  },
  "Drew Maggio": {
    src: "/images/team/drewM.png",
    alt: "drew maggio photo",
    title: "Mechanical Engineering",
  },
  "Alysa Martinez": {
    src: "/images/team/alysaM.png",
    alt: "alysa martinez photo",
    title: "Engineering Management",
  },
  "Darlene Martinez": {
    src: "/images/team/darleneM.png",
    alt: "darlene martinez photo",
    title: "Mechanical Engineering",
  },
  "Scott Murdock": {
    src: "/images/team/scottM.png",
    alt: "scott murdock photo",
    title: "Mechanical Engineering",
  },
  "Colleen Shea": {
    src: "/images/team/colleenS.png",
    alt: "colleen shea photo",
    title: "Mechanical Engineering",
  },
  "Aaron Siegel": {
    src: "/images/team/aaronS.png",
    alt: "aaron siegel photo",
    title: "Mechanical Engineering",
  },
  "Kevin Connington": {
    src: "/images/team/kevinC.jpeg",
    alt: "kevin connington photo",
    title: "Faculty Advisor",
  },
};

export default function Team() {
  return (
    <>
      <Head>
        <title>NYC Heat Recovery</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main class="main">
        <h1>Meet the Team</h1>
        <section className="section">
          <p className="text-center">
            The team consists of 9 Stevens Institute of Technology Students and
            a Stevens Faculty Advisor.
          </p>
          {/* Map the images into rows of 3 images with their name and title */}
          <div className="w-full h-fit img-col-3">
            {Object.keys(team).map((name, index) => (
              <span key={index} className="flex flex-col text-center">
                <img src={team[name].src} alt={team[name].alt} />
                <div>
                  <h3>{name}</h3>
                  <p>{team[name].title}</p>
                </div>
              </span>
            ))}
          </div>
        </section>

        <figure className="w-1/2">
          <figcaption>Fig. 1 - The team</figcaption>
          <img src="/images/team/team.jpg" alt="team photo" />
        </figure>
      </main>
    </>
  );
}