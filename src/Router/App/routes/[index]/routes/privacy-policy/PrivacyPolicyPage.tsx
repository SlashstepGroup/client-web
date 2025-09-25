import Breadcrumb from "#components/Breadcrumb/Breadcrumb";
import BreadcrumbList from "#components/BreadcrumbList/BreadcrumbList";
import CloudIcon from "#components/icons/CloudIcon";
import React, { useCallback, useEffect, useState } from "react";
import { Link, useBlocker, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Client } from "@slashstepgroup/javascript-sdk";
import MenuList from "#components/MenuList/MenuList";
import MenuListInstanceItem from "#components/menu-list-items/MenuListInstanceItem/MenuListInstanceItem";
import AddInstancePopup from "#routes/[index]/routes/instances/components/AddInstancePopup/AddInstancePopup";
import RemoveLocalInstancePopup from "#routes/[index]/routes/instances/components/RemoveLocalInstancePopup/RemoveLocalInstancePopup";
import Tip from "#components/Tip/Tip";
import ApprovalDelegationIcon from "#components/icons/ApprovalDelegationIcon";

function InstanceListPage({client, setHeaderTitle, setFallbackBackPathname}: {setHeaderTitle: (newHeaderTitle: string | null) => void, setFallbackBackPathname: (newPathname: string | null) => void, client: Client}) {

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const localAction = searchParams.get("local-action");
  const [instances, setInstances] = useState<any[]>([]);
  const [shouldOpenAddLocalInstancePopup, setShouldOpenAddLocalInstancePopup] = useState(false);
  const [shouldOpenRemoveLocalInstancePopup, setShouldOpenRemoveLocalInstancePopup] = useState(false);
  const [shouldMountAddLocalInstancePopup, setShouldMountAddLocalInstancePopup] = useState(false);
  const [shouldMountRemoveLocalInstancePopup, setShouldMountRemoveLocalInstancePopup] = useState(false);
  const [selectedInstanceHostnames, setSelectedInstanceHostnames] = useState<string[]>([]);
  const location = useLocation();
  const blocker = useBlocker(({nextLocation}) => {

    return (shouldMountAddLocalInstancePopup || shouldMountRemoveLocalInstancePopup) && nextLocation.pathname !== location.pathname;

  });

  useEffect(() => {

    document.title = "Privacy policy • Slashstep"

    setHeaderTitle("Privacy policy");
    setFallbackBackPathname("/");

  }, [setHeaderTitle, setFallbackBackPathname]);

  return (
    <section id="main-container">
      <BreadcrumbList>
        <Breadcrumb icon={<CloudIcon />} link={"/instances"}>Instances</Breadcrumb>
      </BreadcrumbList>
      <main>
        <h1>Privacy policy</h1>
        <Tip type="Warning">app.slashstep.com is not responsible for the behavior or privacy practices of the instances you add to this client, so please make sure to read the privacy policies of the instances that you add.</Tip>
        <p>This is the privacy policy for your local client (app.slashstep.com). Your local instance (public.slashstep.com) has its own <Link to="/instances/public.slashstep.com/privacy-policy">privacy policy</Link>.</p>
        <section>
          <h2>Information that this client collects and receives</h2>
          <Tip>The instances that you have add to this client may collect more information, as they are managed by their respective admins and have their own privacy policies.</Tip>
          <section>
            <h3>Information that you directly provide</h3>
            <section>
              <h4>Your instances and account information</h4>
              <p>When you register for or sign in to an instance, you provide the necessary account information like your email address, username, and password. You may also provide information like your name, location, and other details.</p>
            </section>
            <section>
              <h4>Your content</h4>
              <p>When you create content, this client collects information about it. For example, when you create a new project, this client collects information about the project, such as the name, description, and key.</p>
            </section>
          </section>
          <section>
            <h3>Information that this client automatically collects</h3>
            <section>
              <h4>Your usage activity</h4>
              <p>This client automatically collects information about how you use it, such as the version of the client, the operating system, and the browser you are using. Network information is also collected, such as your IP address and the URL of the page you are visiting.</p>
            </section>
          </section>
          <section>
            <h3>Information provided by third parties</h3>
            <p>Third parties — such as your instances or authorized apps — may share your information with this client. For example, when you open a project, your instance may provide details about the project to this client, including the associated workspace and items.</p>
          </section>
        </section>
        <section>
          <h2>How this client uses your information</h2>
          <Tip>Instances are not managed or operated by app.slashstep.com, so they may use your information for other purposes not listed here. Review the privacy policy of your instance to see how it uses your information.</Tip>
          <section>
            <h3>Your instances and account information</h3> 
            <p>This client uses your instances and account information in the following ways:</p> 
            <ul>
              <li>To personalize your experience. For example, the client can use your account information to display your name, profile photo, and other details, to you.</li> 
              <li>To share with your instances so that they can handle your requests. For example, your instance may need to know that you have specific permissions to access the instance's resources. This client only shares information that is necessary for a specific instance to function. Outside of your local instance, the client doesn't share information between instances. Review the privacy policy of your instance to see how it uses your information.</li>
            </ul>
          </section>
          <section>
            <h3>Your content</h3> 
            <p>This client uses your content in the following ways:</p>
            <ul>
              <li>To personalize your experience. For example, the client can notify you if someone comments on a work item that you're subscribed to.</li>
              <li>To improve app performance. For example, the client can locally cache work items that you view so that you can view them faster.</li>
              <li>To share with your instances so that they can handle your requests. For example, your instance admin may store your work in a database so that you can review it whenever you need to. This client only shares information that is necessary for a specific instance to function. Outside of your local instance, the client doesn't share information between instances. Review the privacy policy of your instance to see how it uses your information.</li>
            </ul>
          </section>
          <section>
            <h3>Your usage activity</h3> 
            <p>This client uses your usage activity in the following ways:</p>
            <ul>
              <li>To personalize your experience. For example, the client can show you content that is relevant to you based on your activity.</li>
              <li>To share with your instances so that they can handle your requests. For example, your instance admin may need to know that you have an authorized IP address before you can access the instance's resources. This client only shares information that is necessary for a specific instance to function. Outside of your local instance, the client doesn't share information between instances. Review the privacy policy of your instance to see how it uses your information.</li>
            </ul>
          </section>
        </section>
        <section>
          <h2>How long this client stores your information</h2>
          <Tip>Instances are not managed or operated by app.slashstep.com, so they may have a different data retention policy. Review the privacy policy of your instance to see how long it stores your information.</Tip>
          <p>This client stores your information for various periods of time.</p>
          <section>
            <h3>Information stored until you end your session</h3>
            <p>To improve app performance, this client locally stores certain information until you end your session, including:</p>
            <ul>
              <li>The content you view and interact with.</li>
            </ul>
          </section>
          <section>
            <h3>Information stored until you remove it</h3>
            <p>For your convenience, this client locally stores certain data until you remove it from the client, including:</p>
            <ul>
              <li>Instance information.</li>
              <li>Instance account information.</li>
              <li>Client settings.</li>
            </ul>
          </section>
        </section>
        <section>
          <h2>How this client secures your information</h2>
          <Tip>Instances are not operated by app.slashstep.com, so they may secure your information differently than this client. Review the privacy policy of your instance to see how it secures your information.</Tip>
          <p>Your account credentials for your local instance are stored in cookies with the <code>Secure</code>, <code>HttpOnly</code>, and <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Cookies#controlling_third-party_cookies_with_samesite"><code>SameSite</code></a> flags to mitigate cross-site scripting (XSS) attacks. In addition, some endpoints require a token to mitigate cross-site request forgery (CSRF) attacks.</p>
          <p>Your account credentials for other instances are also stored as cookies in your browser. Your local instance may act as a proxy for your other instances and send requests on your behalf. Review the privacy policy of your local instance to see how it stores and secures your information.</p>
          <p>Despite the safeguards that the client implements, it does not guarantee absolute privacy and security, and no system is 100% secure. Users should take precautions to protect their information.</p>
        </section>
        <section>
          <h2>How to delete your information from this client</h2>
          <Tip>Instances are not managed or operated by app.slashstep.com, so they may have a different data deletion policy. Review the privacy policy of your instance to see how to delete your information.</Tip>
          <p>You can delete your information from this client at any time by going to the <Link to="/settings">settings</Link> page and clicking the "Reset client" button.</p>
          <p>You can also delete your information from this client by clearing this site's data in your browser's settings. Review your browser's manual for instructions on how to do this.</p>
        </section>
      </main>
    </section>
  );

}

export default React.memo(InstanceListPage);