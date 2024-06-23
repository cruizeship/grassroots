import React, { useState } from "react";
import "./Article.css";
import axios from "axios";

function ArticleScreen() {
    const [prompt, setPrompt] = useState("");
    const [response, setResponse] = useState("");

    return (
        <div className="container">
        <header>
          <h1>Golden Gate Bridge to be shutdown for repairs, renovations</h1>
        </header>
        <div className="content">
          <div className="article">
            <div className="image-and-key-takeaways">
              <img src="path/to/your/image.png" alt="Golden Gate Bridge" />
              <section className="key-takeaways">
                <h2 className="key-takeaways-title">Key Takeaways</h2>
                <ul>
                  <li className="text">Mayor London Breed recently announced that the Golden Gate Bridge will be shutdown from June 31 to July 2nd for repairs and renovation.</li>
                  <li className="text">A citywide referendum will be held to decide the new color of the bridge, with two front-runners being green and blue.</li>
                </ul>
              </section>
            </div>
            <section className="local-perspectives">
              <h2>Local Perspectives</h2>
              <ul>
                <li className="text"><a href="#sf-republicans">The San Francisco County Republicans</a> lambasted this effort, deeming it a waste of taxpayer funds.</li>
                <li className="text"><a href="#local-democrats">Local Democrats</a> have voiced their support for this initiative, stating that it’s up for the people to decide.</li>
              </ul>
            </section>
          </div>
          <aside className="poll">
            <h2>Poll</h2>
            {/* Poll content goes here */}
          </aside>
        </div>
        <footer>
          <a href="#comments">Click to view comments</a>
        </footer>
      </div>
    );
}

export default ArticleScreen;
