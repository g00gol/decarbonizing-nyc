import Head from "next/head";

export default function PrototypeAlpha() {
  return (
    <>
      <Head>
        <title>NYC Heat Recovery</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        <h1>Alpha Prototype</h1>

        <section className="section">
          <h3>
            This page shows the overview of the Alpha Prototype that was
            developed during Phase III of the project and was also updated in
            Phase IV. It also shows an animated simplistic model of the system.{" "}
          </h3>

          <div className="w-full">
            <p>Alpha prototype deliverables:</p>
            <ul>
              <li>Visuals</li>
              <ul>
                <li>Showing how the system operates</li>
                <li>Helps with communication and marketing</li>
              </ul>
            </ul>
          </div>
        </section>

        <section className="section">
          <h2>Schematic Animation: Visual of the system </h2>
          <p>
            In order to display the overall concept behind the design of the
            system, an animated schematic was constructed. This schematic is
            specific to the building and ancillary building used for this
            project, however would act as the “proof of concept” when pitching
            to other building owners outside the scope of this individual
            project.
          </p>
        </section>

        <section className="section">
          <figure>
            <img
              src="/images/alpha/heatFlowChart.png"
              alt="heat flow chart view 1"
            />
            <figcaption>Figure 1</figcaption>
          </figure>
        </section>

        <section className="section">
          <h2>Description</h2>
          <p>
            Figure 1 from the animation reveals an aerial view of the two
            buildings that are conjoined in this design process. As shown, the
            MTA ancillary building and 303 the East 83rd Street complex are
            directly across 2nd avenue from each other. This allowed for
            conceptually painless piping directly from the basement of the
            ancillary building to the apartment complex basement. However, this
            may be rather challenging after investigating the already existing
            piping under 2nd avenue. Nonetheless, the schematic demonstrates an
            ideal circumstance for running pipe to and from each basement. The
            red piping represents the “hot” water being received by the
            apartment complex, while the blue piping represents the cooler water
            traveling back to the MTA ancillary building.
          </p>
        </section>

        <section className="section">
          <figure>
            <img
              src="/images/alpha/heatFlowChart2.png"
              alt="heat flow chart view 2"
            />
            <figcaption>Figure 2</figcaption>
          </figure>
        </section>

        <section className="section">
          <h2>Description</h2>
          <p>
            Figure 2 provides a more detailed view of the system to be
            installed. Without revealing every small component and detail of the
            system, to keep the visual easily comprehensible, the major
            components of the system are identified. This visual acts as a cut
            section view of the two buildings and their respective basements.
          </p>
        </section>
      </main>
    </>
  );
}
