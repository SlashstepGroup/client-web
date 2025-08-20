import React, { useEffect } from "react";
import { options as optionsStyle, profileToolbar as profileToolbarStyle } from "./InstanceOverviewPage.module.css";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Instance } from "@waltzgroup/javascript-sdk";
import BreadcrumbList from "../../components/BreadcrumbList/BreadcrumbList";
import Spinner from "../../components/Spinner/Spinner";
import Tip from "../../components/Tip/Tip";

export type WorkspaceProperties = {
  name: string;
  displayName: string;
  description?: string;
}

function InstanceSetupPage({}: {}) {

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthenticating, setIsAuthenticating] = React.useState(false);

  const isEditing = searchParams.get("mode") === "edit";

  useEffect(() => {

    document.title = "Instance setup • Waltz";

  }, []);

  return (
    <section id="main-container">
      <main>
        <section>
          <h1>Welcome to Waltz</h1>
          <p>This tool will help you set up your instance. Here's what we'll do:</p>
          <ul>
            <li>Create a dedicated database, tables, and a user for Waltz Server to use.</li>
            <li>Create an Waltz admin account.</li>
          </ul>
          <section>
            <button className="primary-button" type="button">Continue</button>
          </section>
        </section>
        <section>
          <h1>Who are you?</h1>
          <p>Waltz Server needs to use your database admin credentials to create the database and tables that Waltz Server will use during normal operation. Make sure this account has <code>CREATE</code> privileges.</p>
          <p>For the console code, check the console of Waltz Server.</p>
          <Tip>
            You entered incorrect credentials too many times, so you've been blocked from accessing Waltz Server. Restart the server to try again.
          </Tip>
          <form>
            <section>
              <label htmlFor="username">Database admin username</label>
              <input name="username" type="text" required disabled={isAuthenticating} />
            </section>
            <section>
              <label htmlFor="password">Database admin password</label>
              <input name="password" type="password" required disabled={isAuthenticating} />
            </section>
            <section>
              <label htmlFor="console-code">Console code</label>
              <input name="console-code" type="text" required disabled={isAuthenticating} />
            </section>
            <section>
              <section>
                <button className="primary-button" onClick={() => setIsAuthenticating(true)} disabled={isAuthenticating}>
                  <span>Continue</span>
                  {
                    isAuthenticating ? <Spinner /> : null
                  }
                </button>
              </section>
              <Tip>
                For your security, Waltz Server will temporarily block the IP addresses of clients that enter incorrect credentials too many times.
              </Tip>
            </section>
          </form>
        </section>
        <section>
          <h1>Let's set up the database</h1>
          <p>Hi, <code>username</code>. Where should Waltz Server store its tables?</p>
          <form>
            <section>
              <label htmlFor="database-name">Database name</label>
              <input name="database-name" type="text" />
            </section>
            <section>
              <section>
                <button className="primary-button" onClick={() => setIsAuthenticating(true)} disabled={isAuthenticating}>
                  <span>Create database and tables</span>
                  {
                    isAuthenticating ? <Spinner /> : null
                  }
                </button>
              </section>
            </section>
          </form>
        </section>
        <section>
          <h1>Use a different database user while operating Waltz Server</h1>
          <p>Although you're using your admin credentials to set up Waltz Server, the Waltz Group recommends using a different database user with just the permissions it needs to operate normally. Would you like to create a database user for Waltz Server now?</p>
          <form>
            <section>
              <section>
                <input name="create-database-user" type="radio" />
                <label htmlFor="create-database-user">Create database user</label>
              </section>
              <section>
                <input name="create-database-user" type="radio" />
                <label htmlFor="create-database-user">Skip this process</label>
              </section>
            </section>
            <section>
              <label htmlFor="database-name">Waltz Server database username</label>
              <input name="database-name" type="text" />
            </section>
            <section>
              <label htmlFor="password">Waltz Server database password</label>
              <input name="password" type="password" required disabled={isAuthenticating} />
            </section>
            <section>
              <label htmlFor="password">Confirm Waltz Server database password</label>
              <input name="password" type="password" required disabled={isAuthenticating} />
            </section>
            <section>
              <section>
                <button className="primary-button" onClick={() => setIsAuthenticating(true)} disabled={isAuthenticating}>
                  <span>Create user</span>
                  {
                    isAuthenticating ? <Spinner /> : null
                  }
                </button>
              </section>
            </section>
          </form>
        </section>
        <section>
          <h1>Create an instance admin account</h1>
          <p>The last thing we have to do is create an admin account for you to start out with. By default, this account will have full access to most of the resources on your instance.</p>
          <form>
            <section>
              <section>
                <input name="create-database-user" type="radio" />
                <label htmlFor="create-database-user">Continue using existing user</label>
              </section>
              <section>
                <input name="create-database-user" type="radio" />
                <label htmlFor="create-database-user">Create a new admin account</label>
              </section>
            </section>
            <section>
              <label htmlFor="database-name">Instance admin username</label>
              <input name="database-name" type="text" />
            </section>
            <section>
              <label htmlFor="password">Instance admin password</label>
              <input name="password" type="password" required disabled={isAuthenticating} />
            </section>
            <section>
              <label htmlFor="password">Confirm instance admin password</label>
              <input name="password" type="password" required disabled={isAuthenticating} />
            </section>
            <section>
              <section>
                <button className="primary-button" onClick={() => setIsAuthenticating(true)} disabled={isAuthenticating}>
                  <span>Create user</span>
                  {
                    isAuthenticating ? <Spinner /> : null
                  }
                </button>
              </section>
            </section>
          </form>
        </section>
        <section>
          <h1>Almost there.</h1>
          <p>Configure the environment variables on your Waltz Server instance to use the new credentials that you created. Once you restart the server with the new environment variables, you should be all set. Thanks for using Waltz.</p>
          <Tip>
            You've been disconnected from the database.
          </Tip>
        </section>
      </main>
    </section>
  );

}

export default React.memo(InstanceSetupPage);