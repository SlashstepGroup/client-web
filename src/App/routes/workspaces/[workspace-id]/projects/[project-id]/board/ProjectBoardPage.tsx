import React, { useEffect } from "react";
import BreadcrumbList from "#components/BreadcrumbList/BreadcrumbList";
import Breadcrumb from "#components/Breadcrumb/Breadcrumb";
import WorldIcon from "#icons/WorldIcon";
import ClipboardIcon from "#icons/ClipboardIcon";
import ListIcon from "#icons/ListIcon";
import { viewSettingsSection as viewSettingsSectionStyle, searchBar as searchBarStyle, main as mainStyle, itemGroup as itemGroupStyle, itemGroupContainer as itemGroupContainerStyle, addItemRow as addItemRowStyle } from "./ProjectBoardPage.module.css";
import TabList from "#components/TabList/TabList";
import Tab from "#components/Tab/Tab";
import Spinner from "#components/Spinner/Spinner";
import AddIcon from "#icons/AddIcon";
import DropdownArrowIcon from "#icons/DropdownArrowIcon";
import MoreHorizontalIcon from "#icons/MoreHorizontalIcon";

function ProjectBoardPage() {

  useEffect(() => {

    document.title = "Project Board • Waltz";

  }, []);

  return (
    <section id="main-container">
      <BreadcrumbList>
        <Breadcrumb icon={<WorldIcon />} link="/workspaces/everyone-destroys-the-world">
          Everyone Destroys the World Group
        </Breadcrumb>
        <Breadcrumb icon={<ClipboardIcon />} link="/workspaces/everyone-destroys-the-world/projects/story">
          Story
        </Breadcrumb>
        <Breadcrumb icon={<ListIcon />} link="/workspaces/everyone-destroys-the-world/projects/story">
          Board
        </Breadcrumb>
      </BreadcrumbList>
      <main id={mainStyle}>
        <section id={viewSettingsSectionStyle}>
          <TabList>
            <Tab link="#" isSelected={true}>
              <ListIcon />
              <span>All items</span>
            </Tab>
            <Tab link="?action=views.create" isSelected={false}>
              <AddIcon />
              <span>Create view</span>
            </Tab>
          </TabList>
          <section className="horizontal-row">
            <button>
              <span>Group by: None</span>
              <DropdownArrowIcon />
            </button>
            <button>
              <MoreHorizontalIcon />
            </button>
          </section>
          <input type="text" id={searchBarStyle} placeholder="No filter" />
        </section>
        <section id={itemGroupContainerStyle}>
          <section className={itemGroupStyle}>
            <section>
              <span>Field Group #1</span>
            </section>
            <section className="table-container">
              <table cellSpacing={0}>
                <colgroup />
                <colgroup />
                <colgroup />
                <colgroup />
                <thead>
                  <tr>
                    <th scope="col">
                      <section>
                        <input type="checkbox" />
                      </section>
                    </th>
                    <th scope="col">
                      <span>Type</span>
                    </th>
                    <th scope="col">Summary</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <section>
                        <input type="checkbox" />
                      </section>
                    </td>
                    <td>
                      <button disabled>
                        <span>Task</span>
                      </button>
                    </td>
                    <td>
                      <a href="#">Test item 1</a>
                    </td>
                    <td>
                      <button disabled>
                        <span>Not started</span>
                      </button>
                    </td>
                  </tr>
                  <tr className={addItemRowStyle}>
                    <td colSpan={4}>
                      <section>
                        <input type="text" placeholder="Add a new item" />
                        <button>
                          <span>Task</span>
                          <DropdownArrowIcon />
                        </button>
                        <button className="primary-button" disabled>
                          <span>Create</span>
                          <Spinner />
                        </button>
                      </section>
                    </td>
                  </tr>
                </tbody>
              </table>
            </section>
          </section>
        </section>
      </main>
    </section>
  );

}

export default React.memo(ProjectBoardPage);