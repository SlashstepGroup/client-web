import React, { useEffect } from "react";
import BreadcrumbList from "../../../../../../components/BreadcrumbList/BreadcrumbList";
import Breadcrumb from "../../../../../../components/Breadcrumb/Breadcrumb";
import WorldIcon from "../../../../../../icons/WorldIcon";
import ClipboardIcon from "../../../../../../icons/ClipboardIcon";
import ListIcon from "../../../../../../icons/ListIcon";
import { viewSettingsSection as viewSettingsSectionStyle, searchBar as searchBarStyle, main as mainStyle, selectAllButtonContainer as selectAllButtonContainerStyle, tableContainer as tableContainerStyle, itemGroup as itemGroupStyle, itemGroupContainer as itemGroupContainerStyle, addItemRow as addItemRowStyle } from "./ProjectBoardPage.module.css";
import TabList from "../../../../../../components/TabList/TabList";
import Tab from "../../../../../../components/Tab/Tab";
import Spinner from "../../../../../../components/Spinner/Spinner";

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
              <span>All items</span>
            </Tab>
            <Tab link="?action=views.create" isSelected={false}>
              <span>Create view</span>
            </Tab>
          </TabList>
          <input type="text" id={searchBarStyle} placeholder="No filter" />
        </section>
        <section id={itemGroupContainerStyle}>
          <section className={itemGroupStyle}>
            <section>
              <span>Field Group #1</span>
            </section>
            <section className={tableContainerStyle}>
              <table cellSpacing={0}>
                <colgroup />
                <colgroup />
                <colgroup />
                <colgroup />
                <thead>
                  <tr>
                    <th scope="col" id={selectAllButtonContainerStyle}>
                      <input type="checkbox" />
                    </th>
                    <th scope="col">Type</th>
                    <th scope="col">Summary</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td></td>
                    <td>
                      <a href="#">Test item 1</a>
                    </td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td></td>
                    <td>
                      <a href="#">Test item 2</a>
                    </td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td></td>
                    <td>
                      <a href="#">Test item 3</a>
                    </td>
                    <td></td>
                  </tr>
                  <tr className={addItemRowStyle}>
                    <td colSpan={4}>
                      <section>
                        <input type="text" placeholder="Add a new item" />
                        <button>
                          <span>Task</span>
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