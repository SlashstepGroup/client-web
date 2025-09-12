import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function NotFoundPage({setHeaderTitle, setFallbackBackPathname}: {setHeaderTitle: (newHeaderTitle: string | null) => void, setFallbackBackPathname: (newPathname: string | null) => void}) {

  const navigate = useNavigate();

  useEffect(() => {

    setHeaderTitle("Not found");

  }, [setHeaderTitle]);

  useEffect(() => {

    setFallbackBackPathname("/");

  }, [setFallbackBackPathname]);

  useEffect(() => {

    document.title = "Not found • Slashstep";

  }, []);

  // const didChange = (newInstanceName && newInstanceName !== instance?.displayName) || (newDescription && newDescription !== instance?.description);

  return (
    <section id="main-container">
      <main>
        <h1>Not found</h1>
        <p>We couldn't find what you were looking for.</p>
        <section className="button-list">
          <button className="primary-button" onClick={() => navigate("/")}>Go back home</button>
        </section>
      </main>
    </section>
  );

}

export default React.memo(NotFoundPage);