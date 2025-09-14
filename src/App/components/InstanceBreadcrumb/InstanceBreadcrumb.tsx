import Breadcrumb from "#components/Breadcrumb/Breadcrumb";
import Skeleton from "#components/Skeleton/Skeleton";
import CloudIcon from "#icons/CloudIcon";
import QuestionMarkIcon from "#icons/QuestionMarkIcon";
import { Instance } from "@slashstepgroup/javascript-sdk";
import React from "react";

function InstanceBreadcrumb({instance, instanceID, isLoadingResources}: {instance: Instance | null, instanceID: string, isLoadingResources: boolean}) {

  return (
    <Breadcrumb icon={instance || isLoadingResources ? <CloudIcon /> : <QuestionMarkIcon />} link={`/instances/${instanceID}`}>
      {instance ? instance.displayName : (
        isLoadingResources ? <Skeleton width={100} height={20} /> : "Not found"
      )}
    </Breadcrumb>
  );

}

export default React.memo(InstanceBreadcrumb);