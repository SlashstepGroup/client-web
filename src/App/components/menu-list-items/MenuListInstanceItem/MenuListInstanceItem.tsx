import React, { useEffect, useMemo, useState } from "react";
import MenuListLinkItem from "../MenuListLinkItem/MenuListLinkItem";
import { Client, Instance } from "@slashstepgroup/javascript-sdk";
import Spinner from "#components/Spinner/Spinner";
import CloudOffIcon from "#components/icons/CloudOffIcon";
import CloudIcon from "#components/icons/CloudIcon";

function MenuListInstanceItem({client, hostname}: {client: Client, hostname: string}) {

  const [instance, setInstance] = useState<Instance | null>(null);
  const [isSearching, setIsSearching] = useState(true);

  useEffect(() => {
    
    const abortController = new AbortController();

    (async () => {

      try {

        const actualHostname = await Instance.getHostnameFromAlias(hostname, abortController.signal) ?? hostname;
        const newInstance = await Instance.getFromHostname(`http://${actualHostname}`, client, abortController.signal);
        setInstance(newInstance);

      } catch (error) {

        if (abortController.signal.aborted) return;

        console.error(error);

      } finally {

        if (abortController.signal.aborted) return;
        
        setIsSearching(false);

      }

    })();

    return () => {

      abortController.abort();

    }

  }, [hostname]);

  const icon = useMemo(() => instance ? <CloudIcon /> : (isSearching ? <Spinner /> : <CloudOffIcon />), [instance, isSearching]);
  const description = useMemo(() => instance ? hostname : (isSearching ? "Connecting..." : "Couldn't connect"), [instance, hostname, isSearching]);

  return (
    <MenuListLinkItem icon={icon} label={instance ? instance.displayName : hostname} description={description} link={`/instances/${hostname}`} />
  )

}

export default React.memo(MenuListInstanceItem);